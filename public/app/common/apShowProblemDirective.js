angular.module('app').directive('showProblem', function(){
    return {
        scope: {
            problem: '=showProblem',
            stdForm: '=stdForm'
        },
        templateUrl: '/partials/common/show-problem'
    };
}).
directive('showProblemTd', function(){
    return {
        scope: {
            td: '=showProblemTd',
            index: '=tdIndex'
        },
        templateUrl: '/partials/common/show-problem-td'
    };
});