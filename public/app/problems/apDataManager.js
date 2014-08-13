angular.module('app').factory('apDataManager', function (apGetDataConfig, apDataInput) {
    var matrixA = new Array();
    var vectorB = new Array();
    var vectorC = new Array();
    var restrictions = new Array();
    var domains = new Array();
    for (var i = 0; i < apGetDataConfig.minimunLines; i++){
        matrixA[i] = new Array();
        for (var j = 0; j < apGetDataConfig.minimunColumns; j++)
            matrixA[i][j] = new apDataInput();
        
        vectorB[i] = new apDataInput();
        restrictions[i] = apGetDataConfig.restrictionsSentences[0];
    }
    for (var j = 0; j < apGetDataConfig.minimunColumns; j++){
        vectorC[j] = new apDataInput();
        domains[j] = "-1";
    }
    return {
        lines: apGetDataConfig.minimunLines,
        columns: apGetDataConfig.minimunColumns,
        objective: "-1",
        matrixA: matrixA,
        vectorB: vectorB,
        vectorC: vectorC,
        restrictions: restrictions,
        domains: domains,
        addEmptyRestriction: function(){
            var arr = new Array();
            for (var j = 0; j < this.columns; j++)
                arr.push(new apDataInput());

            this.matrixA.push(arr);

            this.vectorB.push(new apDataInput());
            this.restrictions.push(apGetDataConfig.restrictionsSentences[0]);
            this.lines++;
        },
        addEmptyVar: function(){
            for (var i = 0; i < this.lines; i++)
                this.matrixA[i].push(new apDataInput());

            this.vectorC.push(new apDataInput());
            this.domains.push("-1");
            this.columns++;
        },
        removeRestriction: function(restrictionToDelete){
            if (restrictionToDelete === "-1" || this.lines <= apGetDataConfig.minimunLines){
                return;
            } 
            this.matrixA.splice(restrictionToDelete, 1);
            this.vectorB.splice(restrictionToDelete, 1);
            this.restrictions.splice(restrictionToDelete, 1);
            this.lines--;
        },
        removeVar: function(varToDelete){
            if (varToDelete === "-1" || this.columns <= apGetDataConfig.minimunColumns){
                return;
            } 
            for (var i = 0; i < this.lines; i++)
                this.matrixA[i].splice(varToDelete, 1);

            this.vectorC.splice(varToDelete, 1);
            this.domains.splice(varToDelete, 1);
            this.columns--;
        },
        
        generateRandomData: function(){
            for (var j = 0; j < this.columns; j++)
                this.vectorC[j].random();

            for (var i = 0; i < this.lines; i++){
                for (var j = 0; j < this.columns; j++)
                    this.matrixA[i][j].random();

                this.vectorB[i].random();
            }
        }
    };
});