angular.module('app').filter('frac',function($sce){
    return function(input){
        if (input.indexOf('/') === -1){
            return input;
        }
        else if (input.substring(input.indexOf('/') + 1) === "1" || input.substring(0, input.indexOf("/")) === "0"){
            return input.substring(0, input.indexOf("/"));
        }
        else{
            var pattern = new RegExp(/^(\-)?[0-9]+(\/[0-9]+)?$/);
            if (!pattern.test(input))
                return input;
            var sup = "<sup>" + input.substring(0, input.indexOf("/")) + "</sup>";
            var sub = "<sub>" + input.substring(input.indexOf("/") + 1) + "</sub>";
            return sup + "/" + sub;
        }
    };
});