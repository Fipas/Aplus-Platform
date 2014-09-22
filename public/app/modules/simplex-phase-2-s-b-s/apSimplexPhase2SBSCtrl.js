angular.module('app').controller('apSimplexPhase2SBSCtrl', function ($scope, fracFilter, apSimplexPhase2SBSConfig, apProblemData, apGraphicDrawer) {
    
    angular.element.fn.scrollTo = function(elem) { 
        $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top); 
        return this; 
    };
    $scope.getInfoMessage = function(message){
        var stepWay = 0;
        if (($scope.step === 4 && $scope.iteration > 0) || 
            ($scope.step === 10 && $scope.data.getJBaseEntry($scope.iteration) !== -1) || 
            ($scope.step === 11 && $scope.data.getjMinxihji($scope.iteration) !== -1)
           ){
            stepWay = 1;
        }
        var infoMessage = apSimplexPhase2SBSConfig.getInfoMessage($scope.step, stepWay, message);
        if ($scope.step === 3){
            infoMessage = infoMessage.replace("kª", ($scope.iteration + 1) + "ª");
        }
        else if ($scope.step === 4 && stepWay === 1){
            infoMessage = infoMessage.replace("kª", ($scope.iteration + 1) + "ª");
            var IB = $scope.data.getIB($scope.iteration);
            var IBString = "";
            for (var ij = 0; ij < IB.length; ij++){
                IBString += IB[ij];
                if (ij < IB.length - 1)
                    IBString += " ";
            }
            infoMessage = infoMessage.replace("{}", "{" + IBString + "}");
        }
        else if ($scope.step === 5){
            infoMessage = infoMessage.replace(/xk/g, "x<sup>" + ($scope.iteration + 1) + "</sup>");
            var xk = $scope.data.getxk($scope.iteration);
            var xkString = "";
            for (var ij = 0; ij < xk.length; ij++){
                xkString += fracFilter(xk[ij].toString());
                if (ij < xk.length - 1)
                    xkString += " ";
            }
            infoMessage = infoMessage.replace("[]", "[" + xkString + "]");
        }
        else if ($scope.step === 6){
            infoMessage = infoMessage.replace(/xk/g, "x<sup>" + ($scope.iteration + 1) + "</sup>");
            infoMessage = infoMessage.replace("= q", "= " + fracFilter($scope.data.getctxk($scope.iteration).toString()));
        }
        else if ($scope.step === 9){
            if (message === 1){
                infoMessage = infoMessage.replace(/xk/g, "x<sup>" + ($scope.iteration + 1) + "</sup>");
            }
            else if (message === 2){
                if ($scope.data.getJBaseEntry($scope.iteration) !== -1){
                    infoMessage = infoMessage.replace("condicional", "não podemos afirmar");
                }
                else{
                    infoMessage = infoMessage.replace("condicional", "temos");
                }
            }
        }
        else if ($scope.step === 10){
            if (stepWay === 0){
                infoMessage = infoMessage.replace(/xk/g, "x<sup>" + ($scope.iteration + 1) + "</sup>");
                var xk = $scope.data.getxk($scope.iteration);
                var xkString = "";
                for (var ij = 0; ij < xk.length; ij++){
                    xkString += fracFilter(xk[ij].toString());
                    if (ij < xk.length - 1)
                        xkString += " ";
                }
                infoMessage = infoMessage.replace("[]", "[" + xkString + "]");
                infoMessage = infoMessage.replace("= q", "= " + fracFilter($scope.data.getctxk($scope.iteration).toString()));
                infoMessage = infoMessage.replace("MPositivo/mNegativo", $scope.data.objective === "minimizar" ? "negativo" : "positivo");
            }
            else if (stepWay === 1){
                infoMessage = infoMessage.replace("MPositivo/mNegativo", $scope.data.objective === "minimizar" ? "negativo" : "positivo");
                infoMessage = infoMessage.replace("maximizando/minimizando", $scope.data.objective === "minimizar" ? "minimizando" : "maximizando");
                infoMessage = infoMessage.replace(/xj/g, "x<sub>" + $scope.data.getJBaseEntry($scope.iteration) + "</sub>");
                infoMessage = infoMessage.replace(/cj/g, "c<sub>" + $scope.data.getJBaseEntry($scope.iteration) + "</sub>");
                infoMessage = infoMessage.replace(/zj/g, "z<sub>" + $scope.data.getJBaseEntry($scope.iteration) + "</sub>");
                infoMessage = infoMessage.replace("yy", fracFilter($scope.data.getcjzj($scope.iteration).toString()));
            }
        }
        else if ($scope.step === 11){
            if (stepWay === 0){
                infoMessage = infoMessage.replace(/xj/g, "x<sub>" + $scope.data.getJBaseEntry($scope.iteration) + "</sub>");
                infoMessage = infoMessage.replace(/hj/g, "h<sub>" + $scope.data.getJBaseEntry($scope.iteration) + "</sub>");
                infoMessage = infoMessage.replace(/aj/g, "a<sub>" + $scope.data.getJBaseEntry($scope.iteration) + "</sub>");
            }
            else if (stepWay === 1){
                infoMessage = infoMessage.replace(/xj/g, "x<sub>" + $scope.data.getJBaseEntry($scope.iteration) + "</sub>");
                infoMessage = infoMessage.replace(/xi/g, "x<sub>" + $scope.data.getjMinxihji($scope.iteration) + "</sub>");
                infoMessage = infoMessage.replace(/yy/g, fracFilter($scope.data.getMinxihji($scope.iteration).toString()));
            }
        }
        return infoMessage;
    };
    $scope.getInfoTitle = function(){
        var stepWay = 0;
        if (($scope.step === 4 && $scope.iteration > 0) || 
            ($scope.step === 10 && $scope.data.getJBaseEntry($scope.iteration) !== -1) || 
            ($scope.step === 11 && $scope.data.getjMinxihji($scope.iteration) !== -1)
           ){
            stepWay = 1;
        }
        var infoTitle = apSimplexPhase2SBSConfig.getInfoTitle($scope.step, stepWay);
        if ($scope.step === 3){
            infoTitle = ($scope.iteration + 1) + "ª " + infoTitle;
        }
        else if ($scope.step === 9){
            infoTitle = infoTitle.replace(/xk/g, "x<sup>" + ($scope.iteration + 1) + "</sup>");
        }
        return infoTitle;
    };
    $scope.next = function(){
        exitStep();
        if (apSimplexPhase2SBSConfig.getMessagesCount($scope.step, $scope.stepWay) - 1 === $scope.stepMessage){
            $scope.stepMessage = 0;
            $scope.step++;
            if ($scope.step > $scope.lastStep)
                $scope.lastStep++;
            
            if ($scope.step === apSimplexPhase2SBSConfig.getTotalSteps()){
                $scope.step = $scope.notIterativeSteps;
                $scope.iteration++;
            }
            
            if ($scope.step === 10 && $scope.data.getJBaseEntry($scope.iteration) === -1){
                $scope.blockContinue = true;
            }
            
            if ($scope.step === 11 && $scope.data.getjMinxihji($scope.iteration) === -1){
                $scope.blockContinue = true;
            }
            
            if ($scope.iteration > $scope.lastIteration){
                $scope.lastIteration++;
                $scope.lastStep = $scope.notIterativeSteps;
                $scope.data.addIB($scope.data.getNextIB($scope.lastIteration - 1));
            }
           
        }
        else{
            $scope.stepMessage++;
        }
        scrollToStep();
    };
    $scope.prev = function(){
        exitStep();
        $scope.blockContinue = false;
        if ($scope.stepMessage === 0){
            if ($scope.step === $scope.notIterativeSteps){
                    if ($scope.iteration > 0){
                        $scope.step = apSimplexPhase2SBSConfig.getTotalSteps() - 1;
                        $scope.iteration--;
                    }
                    else{
                        $scope.step--;
                    }
            }
            else{
                $scope.step--;
            }
            $scope.stepMessage = apSimplexPhase2SBSConfig.getMessagesCount($scope.step, $scope.stepWay) - 1;
        }
        else{
            $scope.stepMessage--;
        }
        scrollToStep();
    };
    $scope.step = 0;
    $scope.stepMessage = 0;
    $scope.stepWay = 0;
    $scope.lastStep = 0;
    $scope.iteration = 0;
    $scope.lastIteration = 0;
    $scope.blockContinue = false;
    $scope.data = apProblemData;
    $scope.data.loadTestData(); 
    $scope.data.prepareData();
    $scope.totalSteps = apSimplexPhase2SBSConfig.getTotalSteps();
    $scope.notIterativeSteps = apSimplexPhase2SBSConfig.notIterativeSteps;
    
    scrollToStep = function(){
        var step = "#step" + $scope.step + "-k" + $scope.iteration;
        var checkExist = setInterval(function() {
            if (angular.element(step).length) {
                angular.element(step).toggleClass("alert alert-warning");
                angular.element(".big-operations-container").scrollTo(step);
                clearInterval(checkExist);
            }
        }, 100);
        if (apProblemData.columns === 2)
            drawGraphic();
    };
    
    drawGraphic = function(){
        var canvas = "graphic-canvas";
        var checking = false;
        if (($scope.step === 10 && apProblemData.getJBaseEntry($scope.iteration) === -1) ||
            ($scope.step === 11 && apProblemData.getjMinxihji($scope.iteration) === -1)){
            checking = true;
        }
        var checkExist = setInterval(function() {
            if (angular.element("#" + canvas).length) {
                apGraphicDrawer.drawCanvas($scope.step, checking, $scope.stepMessage, $scope.iteration, canvas);
                apGraphicDrawer.exportToImage(canvas, "canvas-image");
                CloudZoom.quickStart();
                clearInterval(checkExist);
            }
        }, 100);
    };
    
    exitStep = function(){
        var step = "#step" + $scope.step + "-k" + $scope.iteration;
        angular.element(step).toggleClass("alert alert-warning");
    };
    
    scrollToStep();
});