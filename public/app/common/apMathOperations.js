angular.module('app').factory('apMathOperations', function () {
    function MathOperations(){
    }

    MathOperations.mdc = function(a, b) {
        var returnVal = 1;
        while (b !== 0) {
            var z = a % b;
            a = b;
            b = z;
            returnVal = a;
        }
        return returnVal;
    };
    
    MathOperations.mmc = function(a, b) {
        return (a / this.mdc(a, b)) * b;
    };

    return (MathOperations);
});