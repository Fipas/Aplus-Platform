angular.module('app').controller('apSimplexPhase2CalcCtrl', function ($scope, apSimplexPhase2CalcConfig, apNotifier, apProblemData, apCalculator) {
    
    $scope.info = apProblemData;
    apProblemData.loadTestData();
    $scope.data = {};
    $scope.data.IBIndex = -1;
    $scope.data.selectIB = [];
    for (var i = 0; i < $scope.info.lines; i++)
        $scope.data.selectIB.push(-1);
    
    $scope.data.zjJ = -1;
    $scope.data.hjJ = -1;
    $scope.data.zjcjJ = -1;
    $scope.data.yiI = -1;
    $scope.data.cjzjyikJ = -1;
    $scope.data.cjzjyikI = -1;
    $scope.data.cjzjyikK = -1;
    $scope.data.xbihjiJ = -1;
    $scope.data.xbihjiI = -1;
    $scope.data.cjzjSwitch = 0;
    
    $scope.data.log = apCalculator.log;

    $scope.createIB = function(){
        if(apCalculator.createIB($scope.data.selectIB))
            $scope.data.IBIndex++;
    };
    
    $scope.removeIB = function(k){
        if (apCalculator.removeIB(k))
            $scope.data.IBIndex;
    };
    
    $scope.calculate = function(operation){
        var param = {};
        if (operation === "zj"){
            param.j = $scope.data.zjJ;
            if (param.j === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredJ);
                return;
            }
        }
        else if (operation === "hj"){
            param.j = $scope.data.hjJ;
            if (param.j === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredJ);
                return;
            }
        }
        else if (operation === "cjzj" || operation === "zjcj"){
            param.j = $scope.data.zjcjJ;
            if (param.j === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredJ);
                return;
            }
        }
        else if (operation === "yi"){
            param.i = $scope.data.yiI;
            if (param.i === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredI);
                return;
            }
        }
        else if (operation === "cjzjyik" || operation === "zjcjyik"){
            param.j = $scope.data.cjzjyikJ;
            param.i = $scope.data.cjzjyikI;
            param.k = $scope.data.cjzjyikK;
            if (param.j === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredJ);
                return;
            }
            else if (param.i === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredI);
                return;
            }
            else if (param.k === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredK);
                return;
            }
        }
        else if (operation === "xbihji"){
            param.j = $scope.data.xbihjiJ;
            param.i = $scope.data.xbihjiI;
            if (param.j === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredJ);
                return;
            }
            else if (param.i === -1){
                apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredI);
                return;
            }
        }
        apCalculator.calculate(operation, param);
    };
});