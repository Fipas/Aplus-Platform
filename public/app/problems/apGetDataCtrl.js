angular.module('app').controller('apGetDataCtrl', function ($scope) {
    $scope.minLines = 1;
    $scope.minColumns = 2;
    $scope.lines = $scope.minLines;
    $scope.columns = $scope.minColumns;
    $scope.toggleHeader = 0;
    $scope.matrixA = [[new DataInput(), new DataInput()]];
    $scope.vectorB = [new DataInput()];
    $scope.vectorC = [new DataInput(), new DataInput()];
    $scope.restrictions = ["="];
    $scope.domains = ["-1", "-1"];
    $scope.objectives = [
        {value: "-1", name: "objetivo"},
        {value: "m", name: "minimizar"},
        {value: "M", name: "maximizar"}
    ];
    $scope.restrictionsSign = ["=", "<=", ">="];
    $scope.varsDomain = ["R>=0", "R<=0", "R", "Z>=0", "Z<=0", "Z", "bin"];
    
    $scope.restrictionToDelete = "-1";
    $scope.varToDelete = "-1";
    
    $scope.formatedSign = function(sign){
        var fmtSign = {
            "=": "=", 
            "<=": "&le;", 
            ">=": "&ge;", 
        };
        return fmtSign[sign] || "";
    };
    $scope.formatedDomain =  function(domain){
        var fmtDomain = {
            "R>=0": "&#8477;<sub>&ge;0</sub>",
            "R<=0": "&#8477;<sub>&le;0</sub>",
            "R": "&#8477;",
            "Z>=0": "&#8484;<sub>&ge;0</sub>",
            "Z<=0": "&#8484;<sub>&le;0</sub>",
            "Z": "&#8484;",
            "bin": "{0,1}"
        };
        return fmtDomain[domain] || "";
    };
    $scope.addRestriction = function(){
        var arr = new Array();
        for (var j = 0; j < $scope.columns; j++)
            arr.push(new DataInput());
        
        $scope.matrixA.push(arr);
        
        $scope.vectorB.push(new DataInput());
        $scope.restrictions.push("=");
        $scope.lines++;
    };
    $scope.addVar = function(){
        for (var i = 0; i < $scope.lines; i++)
            $scope.matrixA[i].push(new DataInput());
        
        $scope.vectorC.push(new DataInput());
        $scope.domains.push("R>=0");
        $scope.columns++;
    };
    $scope.removeRestriction = function(){
        if ($scope.restrictionToDelete === "-1" || $scope.lines <= $scope.minLines){
            $scope.restrictionToDelete = "-1";
            return;
        } 
        $scope.matrixA.splice($scope.restrictionToDelete, 1);
        $scope.vectorB.splice($scope.restrictionToDelete, 1);
        $scope.restrictions.splice($scope.restrictionToDelete, 1);
        $scope.restrictionToDelete = "-1";
        $scope.lines--;
    };
    $scope.removeVar = function(){
        if ($scope.varToDelete === "-1" || $scope.columns <= $scope.minColumns){
            $scope.varToDelete = "-1";
            return;
        } 
        for (var i = 0; i < $scope.lines; i++)
            $scope.matrixA[i].splice($scope.varToDelete, 1);
        
        $scope.vectorC.splice($scope.varToDelete, 1);
        $scope.domains.splice($scope.varToDelete, 1);
        $scope.varToDelete = "-1";
        $scope.columns--;
    };
    $scope.randomData = function(){
        for (var j = 0; j < $scope.columns; j++)
            $scope.vectorC[j].random();
        
        for (var i = 0; i < $scope.lines; i++){
            for (var j = 0; j < $scope.columns; j++)
                $scope.matrixA[i][j].random();
            
            $scope.vectorB[i].random();
        }
    };
});