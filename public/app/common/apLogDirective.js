angular.module('app').directive('displayLog', function(apProblemData, apCalculator){
    return {
        scope: {
            log: "=displayLog",
            removeIB: "=enableRemove"
        },
        link: function(scope, element, attrs) {
            scope.data = apProblemData;
            scope.removeCalc = apCalculator.removeCalc;
        },
        templateUrl: '/partials/common/display-log'
    };
});