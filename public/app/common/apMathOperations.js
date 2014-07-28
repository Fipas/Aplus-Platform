function DataInput(){
    this.sign = "+";
    this.value = "";
}

DataInput.prototype.swapSign = function(){
    this.sign = (this.sign === "+" ? "-" : "+");
};

DataInput.prototype.glyphiconSign = function(){
    var glyphClasses = {"-": "glyphicon-minus", "+": "glyphicon-plus"};
    return glyphClasses[this.sign] || "";
};

DataInput.prototype.random = function(){
    var rand = generateRandom();
    this.sign = "+";
    if (rand.substring(0, 1) === "-"){
        this.sign = "-";
        rand = rand.substring(1);
    }
    this.value = rand;
};

function mdc(a, b) {
    var returnVal = 1;
    while (b !== 0) {
        var z = a % b;
        a = b;
        b = z;
        returnVal = a;
    }
    return returnVal;
}

var simplifyFraction = function(fraction){
    var number = parseInt(fraction.substring(0, fraction.indexOf("/")));
    var division = parseInt(fraction.substring(fraction.indexOf("/") + 1));
    var mdcNum = mdc(number, division);
    if ((mdcNum + "").substring(0, 1) === "-")
        mdcNum = parseInt((mdcNum + "").substring(1));
    number = number / mdcNum;
    division = division / mdcNum;
    return number + "/" + division;
};

var generateRandom = function(){
    var minBound = -10, maxBound = 10;
    var number = Math.floor(Math.random() * (maxBound - minBound + 1) + minBound);
    if (number !== 0){
        var division = Math.floor((Math.random() * maxBound) + 1);
        var fraction = simplifyFraction(number + "/" + division);
        
        if (fraction.substring(fraction.indexOf("/") + 1) === "1")
            return fraction.substring(0, fraction.indexOf("/"));
        
        return fraction;
    }
    return "0";
};