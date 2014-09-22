angular.module('app').controller('apModelingCtrl', function ($scope, apDataModeling, apModelingConfig, apDataManager, apNotifier, $location) {
    $scope.columns = apDataModeling.columns;
    $scope.lines = apDataModeling.lines;
    $scope.addData = apDataModeling.addData;
    $scope.modelData = apDataModeling.modelData;
    $scope.addVar = apDataModeling.addVar;
    $scope.addRestriction = apDataModeling.addRestriction;
    $scope.addObjFunction = apDataModeling.addObjFunction;
    $scope.addDomain = apDataModeling.addDomain;
    $scope.editVar = apDataModeling.editVar;
    $scope.editRestriction = apDataModeling.editRestriction;
    $scope.editObjFunction = apDataModeling.editObjFunction;
    $scope.removeVar = function(index){
        $scope.removeVariable(index);
    };
    $scope.removeVariable = apDataModeling.removeVar;
    $scope.removeRestriction = function(index){
        $scope.removeRestr(index);
    };
    $scope.removeRestr = apDataModeling.removeRestriction;
    $scope.removeObjFunction = apDataModeling.removeObjFunction;
    $scope.resetModel = apDataModeling.resetModel;
    $scope.modelingConfig = apModelingConfig;
    
    $scope.editAlertClass = 'custom-alert-warning';
    
    $scope.loadModel = function(){
        if ($scope.lines < 1 || $scope.columns < 2 || $scope.modelData.vectorC.length <= 0){
            apNotifier.error(apModelingConfig.errorIncompleteModel);
            return;
        }
        for (var j = 0; j < $scope.columns; j++){
            if ($scope.modelData.domains[j] === "-1"){
                apNotifier.error(apModelingConfig.errorIncompleteModel);
                return; 
            }
        }
        apDataManager.loadModel(apDataModeling.modelData, $scope.lines, $scope.columns);
        $location.path("/problems");
    };
});