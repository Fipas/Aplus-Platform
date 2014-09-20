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

    MathOperations.solveEquationSystem = function(a, b, c, d, e, f) {
       
        var ae = a.multiply(e);
        var bd = b.multiply(d);
        var denominadorComum = ae.subtract(bd);
        var ce = c.multiply(e);
        var bf = b.multiply(f);
        var numeradorX = ce.subtract(bf);
        var af = a.multiply(f);
        var cd = c.multiply(d);
        var numeradorY = af.subtract(cd);
        var x = numeradorX.divide(denominadorComum);
        var y = numeradorY.divide(denominadorComum);
        
        return [x, y];
    };

    return (MathOperations);
});