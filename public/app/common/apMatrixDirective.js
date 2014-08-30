angular.module('app').directive('displayMatrix', function(){
    return {
        scope: {
            matrix: '=displayMatrix',
            labels: '=columnLabels'
        },
        templateUrl: '/partials/common/display-matrix'
    };
}).
directive('displayVerticalVector', function(){
    return {
        scope: {
            vector: '=displayVerticalVector'
        },
        templateUrl: '/partials/common/display-vertical-vector'
    };
}).
directive('displayHorizontalVector', function(){
    return {
        scope: {
            vector: '=displayHorizontalVector',
            labels: '=columnLabels'
        },
        templateUrl: '/partials/common/display-horizontal-vector'
    };
}).
directive('displayIndexVector', function(){
    return {
        scope: {
            vector: '=displayIndexVector'
        },
        templateUrl: '/partials/common/display-index-vector'
    };
});