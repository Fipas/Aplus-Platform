angular.module('app').factory('apDataModeling', function (apDataInput, apVarModeling, apModelingConfig, apNotifier) {
    return {
        lines: 0,
        columns: 0,
        modelData: {
            objective: "",
            matrixA: new Array(),
            vectorB: new Array(),
            vectorC: new Array(),
            restrictions: new Array(),
            domains: new Array(),
            varDescr: new Array()
        },
        addData: {
            varToAdd: new apVarModeling(),
            objectiveToAdd: "-1",
            restrToAdd: new Array(),
            sentenceToAdd: "=",
            restrbToAdd: new apDataInput(),
            objectiveFuncToAdd: new Array(),
            addVarIndex: "-1",
            addRestrIndex: "-1",
            addVarDomain: "0",
            addDomain: "-1",
            editDisable: "-1",
            disableException: {
                editVar: "0",
                editObjFunction: "1",
                editRestriction: "2",
            }
        },
        addVar: function(){
            if (this.addData.varToAdd.mainIndex === "" || this.addData.varToAdd.info === ""){
                apNotifier.error(apModelingConfig.errorAddVarRequiredInput);
                return;
            }
            if (this.addData.addVarIndex === "-1"){
                for (var j = 0; j < this.columns; j++){
                    if (this.addData.varToAdd.htmlIndex() === this.modelData.varDescr[j].htmlIndex()){
                        apNotifier.error(apModelingConfig.errorAddVarAlreadyExists);
                        return;
                    }
                }
                this.modelData.varDescr.push(this.addData.varToAdd);
                for (var i = 0; i < this.lines; i++)
                    this.modelData.matrixA[i].push(new apDataInput("0"));
                
                this.modelData.domains.push("-1");
                if (this.modelData.vectorC.length > 0)
                    this.modelData.vectorC.push(new apDataInput("0"));
                
                this.addData.restrToAdd.push(new apDataInput());
                this.addData.objectiveFuncToAdd.push(new apDataInput());
                this.columns++;
            }
            else{
                this.modelData.varDescr[this.addData.addVarIndex] = this.addData.varToAdd;
                this.addData.addVarIndex = "-1";
                this.addData.editDisable = "-1";
            }
            this.addData.varToAdd = new apVarModeling();
        },
        addRestriction: function(){
            if (this.columns < apModelingConfig.modelMinColumns){
                apNotifier.error(apModelingConfig.errorMinColumns);
                return;
            }
            for (var j = 0; j < this.columns; j++){
                if (!this.addData.restrToAdd[j].validate()){
                    apNotifier.error(apModelingConfig.errorDefaultDataInput);
                    return;
                }
            }
            if (!this.addData.restrbToAdd.validate()){
                apNotifier.error(apModelingConfig.errorDefaultDataInput);
                return;
            }
            if (this.addData.addRestrIndex === "-1"){
                this.modelData.matrixA.push(this.addData.restrToAdd);
                this.modelData.restrictions.push(this.addData.sentenceToAdd);
                this.modelData.vectorB.push(this.addData.restrbToAdd);
                this.lines++;
            }
            else{
                this.modelData.matrixA[this.addData.addRestrIndex] = this.addData.restrToAdd;
                this.modelData.restrictions[this.addData.addRestrIndex] = this.addData.sentenceToAdd;
                this.modelData.vectorB[this.addData.addRestrIndex] = this.addData.restrbToAdd;
                this.addData.addRestrIndex = "-1";
                this.addData.editDisable = "-1";
            }
            this.addData.restrbToAdd = new apDataInput();
            this.addData.restrToAdd = new Array();
            for (var i = 0; i < this.columns; i++)
                this.addData.restrToAdd[i] = new apDataInput();
        },
        addObjFunction: function(){
            if (this.addData.objectiveToAdd === "-1"){
                apNotifier.error(apModelingConfig.errorSelectObjective);
                return;
            }
            for (var j = 0; j < this.columns; j++){
                if (!this.addData.objectiveFuncToAdd[j].validate()){
                    apNotifier.error(apModelingConfig.errorDefaultDataInput);
                    return;
                }
            }
            if (this.columns < apModelingConfig.modelMinColumns){
                apNotifier.error(apModelingConfig.errorMinColumns);
                return;
            }
            this.modelData.vectorC = this.addData.objectiveFuncToAdd;
            this.modelData.objective = this.addData.objectiveToAdd;
            this.addData.objectiveToAdd = "-1";
            this.addData.editDisable = "-1";
            this.addData.objectiveFuncToAdd = new Array();
            for (var i = 0; i < this.columns; i++)
                this.addData.objectiveFuncToAdd[i] = new apDataInput();
        },
        addDomain: function(){
            if (this.addData.addDomain === "-1"){
                apNotifier.error(apModelingConfig.errorAddDomainSelectVar);
                return;
            }
            this.modelData.domains[this.addData.addVarDomain] = this.addData.addDomain;
        },
        editVar: function(index){
            this.addData.addVarIndex = index;
            this.addData.varToAdd = this.modelData.varDescr[index];
            this.addData.editDisable = this.addData.disableException.editVar;
        },
        editRestriction: function(index){
            this.addData.addRestrIndex = index;
            this.addData.restrToAdd = this.modelData.matrixA[index];
            this.addData.sentenceToAdd = this.modelData.restrictions[index];
            this.addData.restrbToAdd = this.modelData.vectorB[index];
            this.addData.editDisable = this.addData.disableException.editRestriction;
        },
        editObjFunction: function(){
            this.addData.objectiveFuncToAdd = this.modelData.vectorC;
            this.addData.objectiveToAdd = this.modelData.objective;
            this.addData.editDisable = this.addData.disableException.editObjFunction;
        },
        removeVar: function(index){
            if (this.columns <= apModelingConfig.modelMinColumns && (this.modelData.vectorC.length > 0 || this.modelData.matrixA.length > 0)){
               apNotifier.error(apModelingConfig.errorDeleteMinColumns); 
               return;
            }
            this.modelData.varDescr.splice(index, 1);
            for (var i = 0; i < this.lines; i++)
                this.modelData.matrixA[i].splice(index, 1);
            this.modelData.domains.splice(index, 1);
            if (this.modelData.vectorC.length > 0)
                this.modelData.vectorC.splice(index, 1);
            this.addData.restrToAdd.splice(index, 1);
            this.addData.objectiveFuncToAdd.splice(index, 1);
            this.columns--;
        },
        removeRestriction: function(index){
            this.modelData.matrixA.splice(index, 1);
            this.modelData.restrictions.splice(index, 1);
            this.modelData.vectorB.splice(index, 1);
            this.lines--;
        },
        removeObjFunction: function(){
            this.modelData.vectorC = new Array();
            this.modelData.objective = "-1";
        },
        resetModel: function(){
            this.modelData = {
                objective: "",
                matrixA: new Array(),
                vectorB: new Array(),
                vectorC: new Array(),
                restrictions: new Array(),
                domains: new Array(),
                varDescr: new Array()
            };
            this.addData = {
                varToAdd: new apVarModeling(),
                objectiveToAdd: "-1",
                restrToAdd: new Array(),
                sentenceToAdd: "=",
                restrbToAdd: new apDataInput(),
                objectiveFuncToAdd: new Array(),
                addVarIndex: "-1",
                addRestrIndex: "-1",
                addVarDomain: "0",
                addDomain: "-1"
            };
            this.lines = 0;
            this.columns = 0;
        }
    };
});