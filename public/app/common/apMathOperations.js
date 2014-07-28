angular.module('app').factory('apMathOperations', function () {
    function MathOperations(){
        this.sign = "+";
        this.value = "";
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
    
    return (MathOperations);
});