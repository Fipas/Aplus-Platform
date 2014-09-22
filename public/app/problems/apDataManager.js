angular.module('app').factory('apDataManager', function (apGetDataConfig, apDataInput) {
    var matrixA = new Array();
    var vectorB = new Array();
    var vectorC = new Array();
    var restrictions = new Array();
    var domains = new Array();
    for (var i = 0; i < apGetDataConfig.minimunLines; i++){
        matrixA.push(new Array());
        for (var j = 0; j < apGetDataConfig.minimunColumns; j++)
            matrixA[i].push(new apDataInput());
        
        vectorB.push(new apDataInput());
        restrictions.push(apGetDataConfig.restrictionsSentences[0]);
    }
    for (var j = 0; j < apGetDataConfig.minimunColumns; j++){
        vectorC.push(new apDataInput());
        domains.push("-1");
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
        exportData: function(){
            return {
                lines: this.vectorB.length,
                columns: this.vectorC.length,
                matrixA: this.matrixA,
                vectorB: this.vectorB,
                vectorC: this.vectorC,
                restrictions: this.restrictions,
                domains: this.domains
            };
        },
        loadModel: function(model, lines, columns){
            this.lines = lines;
            this.columns = columns;
            this.objective = model.objective;
            this.matrixA = model.matrixA;
            this.vectorB = model.vectorB;
            this.vectorC = model.vectorC;
            this.restrictions = model.restrictions;
            this.domains = model.domains;
        },
        addEmptyRestriction: function(){
            var arr = new Array();
            for (var j = 0; j < this.columns; j++)
                arr.push(new apDataInput());

            this.matrixA.push(arr);

            this.vectorB.push(new apDataInput());
            this.restrictions.push(apGetDataConfig.restrictionsSentences[1]);
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