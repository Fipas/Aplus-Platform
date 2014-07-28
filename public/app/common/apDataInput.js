angular.module('app').factory('apDataInput', function (apMathOperations) {
    
    var minRandomBound = -10;
    var maxRandomBound = 10;
    var glyphClasses = {"-": "glyphicon-minus", "+": "glyphicon-plus"};
    
    function DataInput(){
        this.sign = "+";
        this.value = "";
    }

    DataInput.prototype.swapSign = function(){
        this.sign = (this.sign === "+" ? "-" : "+");
    };

    DataInput.prototype.glyphiconSign = function(){
        return glyphClasses[this.sign] || "";
    };
    
    DataInput.prototype.setData = function(data){
        if (data.substring(0, 1) === "-"){
            this.sign = "-";
            data = data.substring(1);
        }
        this.value = data;
    };
    
    DataInput.prototype.toString = function(){
        if (this.sign === "-")
            return this.sign + this.value;
        
        return this.value;
    };

    DataInput.prototype.random = function(){
        var rand = generateRandom();
        this.setData(rand);
    };


    var simplifyFraction = function(fraction){
        var number = parseInt(fraction.substring(0, fraction.indexOf("/")));
        var division = parseInt(fraction.substring(fraction.indexOf("/") + 1));
        var mdcNum = apMathOperations.mdc(number, division);
        if ((mdcNum + "").substring(0, 1) === "-")
            mdcNum = parseInt((mdcNum + "").substring(1));
        number = number / mdcNum;
        division = division / mdcNum;
        return number + "/" + division;
    };

    var generateRandom = function(){
        var number = Math.floor(Math.random() * (maxRandomBound - minRandomBound + 1) +minRandomBound);
        if (number !== 0){
            var division = Math.floor((Math.random() * maxRandomBound) + 1);
            var fraction = simplifyFraction(number + "/" + division);

            if (fraction.substring(fraction.indexOf("/") + 1) === "1")
                return fraction.substring(0, fraction.indexOf("/"));

            return fraction;
        }
        return "0";
    };
    
    return (DataInput);
});