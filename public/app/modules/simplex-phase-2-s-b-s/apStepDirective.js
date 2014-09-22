angular.module('app').directive('displayStep', function($compile, $http, $templateCache){
    return {
        scope: {
            data: '=stepData',
            k: '=stepIteration'
        },
        link: function(scope, element, attrs) {
            scope.$watch(attrs.displayStep, function(value) {
                if (value !== null) {
                    var url = '/partials/modules/simplex-phase-2-s-b-s/steps/step-' + value;
                    loadTemplate(url);
                }
            });

            function loadTemplate(template) {
                $http.get(template, {cache: $templateCache})
                        .success(function(templateContent) {
                            element.replaceWith($compile(templateContent)(scope));
                        });
            }
        }
    };
});