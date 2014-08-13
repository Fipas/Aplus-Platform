angular.module('app').filter('mathSymbol', function() {
    return function(input) {
        var formatedInput = {
            "<=": "&le;", 
            ">=": "&ge;", 
            "elementof": "&#8712;",
            "R>=0": "&#8477;<sub>&ge;0</sub>",
            "R<=0": "&#8477;<sub>&le;0</sub>",
            "R": "&#8477;",
            "Z>=0": "&#8484;<sub>&ge;0</sub>",
            "Z<=0": "&#8484;<sub>&le;0</sub>",
            "Z": "&#8484;",
            "bin": "{0,1}"
        };
        return formatedInput[input] || input;
    };
});