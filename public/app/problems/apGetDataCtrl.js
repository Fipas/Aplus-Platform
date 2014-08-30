angular.module('app').controller('apGetDataCtrl', function ($scope, apDataManager, apGetDataConfig, $location, apProblemData, apNotifier) {
    $scope.lines = apDataManager.lines;
    $scope.columns = apDataManager.columns;
    $scope.objective = apDataManager.objective;
    $scope.matrixA = apDataManager.matrixA;
    $scope.vectorB = apDataManager.vectorB;
    $scope.vectorC = apDataManager.vectorC;
    $scope.restrictions = apDataManager.restrictions;
    $scope.domains = apDataManager.domains;
    $scope.addRestriction = apDataManager.addEmptyRestriction;
    $scope.addVar = apDataManager.addEmptyVar;
    $scope.removeRestriction = apDataManager.removeRestriction;
    $scope.removeVar = apDataManager.removeVar;
    $scope.randomData = apDataManager.generateRandomData;
    
    $scope.restrictionToDelete = "-1";
    $scope.varToDelete = "-1";
    $scope.toggleHeader = 0;
    
    $scope.deleteAlertClass = 'alert alert-info';
    
    $scope.dataConfig = apGetDataConfig;
    
    $scope.applicationsConfig = [];
    
    $scope.selectApp = "-1";
    
    $scope.sendToApp = function(){
        if ($scope.selectApp !== "-1"){
            apProblemData.loadProblem($scope.objective, apDataManager.exportData());
            $location.path($scope.selectApp);
        }
        else{
            apNotifier.error("Escolha um aplicativo antes de prosseguir!");
        }
    };
});