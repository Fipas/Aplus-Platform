angular.module('app').directive('standardInput', function(){
    return {
        scope: {
            input: '=standardInput',
            index: '=stdInVar',
            model: '=stdVarModel'
        },
        templateUrl: '/partials/problems/standard-input'
    };
}).
directive('standardVarDomain', function(apGetDataConfig){
    return {
        scope: {
            input: '=standardVarDomain',
            index: '=stdInVar',
            model: '=stdVarModel'
        },
        link: function (scope) {
            scope.variablesDomains = apGetDataConfig.variablesDomains;
        },
        templateUrl: '/partials/problems/standard-var-domain'
    };
}).
directive('standardRestrSentence', function(apGetDataConfig){
    return {
        scope: {
            input: '=standardRestrSentence'
        },
        link: function (scope) {
            scope.restrictionsSentences = apGetDataConfig.restrictionsSentences;
        },
        templateUrl: '/partials/problems/standard-restr-sentence'
    };
}).
directive('standardObjectiveSelect', function(apGetDataConfig){
    return {
        scope: {
            input: '=standardObjectiveSelect'
        },
        link: function (scope) {
            scope.objectives = apGetDataConfig.objectives;
        },
        templateUrl: '/partials/problems/standard-objective-select'
    };
});