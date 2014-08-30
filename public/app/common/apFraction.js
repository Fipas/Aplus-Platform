angular.module('app').factory('apFraction', function (apMathOperations) {
    
    function Fraction(passValue){
        if (passValue.indexOf('/') !== -1){
            this.numerator = parseInt(passValue.substring(0, passValue.indexOf("/")));
            this.denominator = parseInt(passValue.substring(passValue.indexOf("/") + 1));
        }
        else{
            this.numerator = parseInt(passValue);
            this.denominator = 1;
        }
    }

    Fraction.prototype.simplify = function(){
        if (this.denominator !== "1"){
            var number = this.numerator;
            var division = this.denominator;
            var mdcNum = apMathOperations.mdc(number, division);
            if ((mdcNum + "").substring(0, 1) === "-")
                mdcNum = parseInt((mdcNum + "").substring(1));
            number = number / mdcNum;
            division = division / mdcNum;
            this.numerator = number + "";
            this.denominator = division + "";
        }
    };
    
    Fraction.prototype.isZero = function(){
        if (this.numerator === 0)
            return true;
            
        return false;
    };
    
    Fraction.prototype.isOne = function(){
        if (this.denominator === this.numerator)
            return true;
        
        return false;
    };
    
    Fraction.prototype.isOneNegative = function(){       
        if (this.denominator === this.numerator * -1)
            return true;
        
        return false;
    };
    
    Fraction.prototype.isNegative = function(){
        if (this.numerator >= 0 && this.denominator >= 0)
            return false;
        
        if (this.numerator < 0 && this.denominator < 0)
            return false;
        
        return true;
    };
    
    Fraction.prototype.value = function(){
        return this.numerator / this.denominator;
    };
    
    Fraction.prototype.toString = function(){
        return this.numerator + "/" + this.denominator;
    };
    
    Fraction.prototype.sign = function(){
        if (this.isNegative())
            return "-";
        
        return "+";
    };
    
    Fraction.prototype.toPositiveString = function(){
        if (this.isNegative())
            return (this.numerator * -1) + "/" + this.denominator;
        
        return this.toString();
    };
    
    Fraction.prototype.add = function(element){
        var mmcNum = apMathOperations.mmc(this.denominator, element.denominator);
        var numerator = ((mmcNum / this.denominator) * this.numerator) + ((mmcNum / element.denominator) * element.numerator);
        var denominator = mmcNum;
        var result = new Fraction(numerator + "/" + denominator);
        result.simplify();
        return result;
    };
    
    Fraction.prototype.subtract = function(element){
        var mmcNum = apMathOperations.mmc(this.denominator, element.denominator);
        var numerator = ((mmcNum / this.denominator) * this.numerator) - ((mmcNum / element.denominator) * element.numerator);
        var denominator = mmcNum;
        var result = new Fraction(numerator + "/" + denominator);
        result.simplify();
        return result;
    };
    
    Fraction.prototype.divide = function(element){
        var numerator = this.numerator * element.denominator;
        var denominator = this.denominator * element.numerator;
        var result = new Fraction(numerator + "/" + denominator);
        return result;
    };
    
    Fraction.prototype.multiply = function(element){
        var numerator = this.numerator * element.numerator;
        var denominator = this.denominator * element.denominator;
        var result = new Fraction(numerator + "/" + denominator);
        return result;
    };
    
    Fraction.prototype.isEqual = function(element){
        return this.value() === element.value();
    };
    
    return (Fraction);
});