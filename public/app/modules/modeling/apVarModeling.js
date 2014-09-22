angular.module('app').factory('apVarModeling', function (apMathOperations) {
    
    var maxSupSubIndexes = 3;
    
    function VarModeling(){
        this.mainIndex = "";
        this.supIndexes = "";
        this.subIndexes = "";
        this.info = "";
    };
    
    VarModeling.prototype.htmlIndex = function(){
        var html = this.mainIndex;
        if (this.supIndexes.length > 0){
            html += "<sup>" + this.supIndexes + "</sup>";
        }
        if (this.subIndexes.length > 0){
            html += "<sub>" + this.subIndexes + "</sub>";
        }
        return html;
    };
    
    VarModeling.prototype.getInfo = function(){
        return this.info;
    };
    
    VarModeling.prototype.reset = function(){
        this.mainIndex = "";
        if (this.supIndexes.length > 0){
            for (var i = 0; i < this.supIndexes.length; i++)
                this.supIndexes[i] = "";
        }
        if (this.subIndexes.length > 0){
            for (var i = 0; i < this.subIndexes.length; i++)
                this.subIndexes[i] =- "";
        }
        this.info = "";
    };
    
    return (VarModeling);
});