angular.module('app').factory('apCalculator', function (apProblemData, apSimplexPhase2CalcConfig, apNotifier) {
    return {
        log: [],
        IBIndex: -1,
        createIB: function(selectIB){
            var newIB = [];
            for (var i = 0; i < selectIB.length; i++){
                if (selectIB[i] === -1 || selectIB[i] === null){
                    apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.requiredCols);
                    return false;
                }
                if (newIB.indexOf(selectIB[i]) !== -1){
                    apNotifier.error(apSimplexPhase2CalcConfig.standardErrors.sameCols);
                    return false;
                }
                newIB.push(parseInt(selectIB[i]));
            }
            apProblemData.addIB(newIB);
            var json = {IB: newIB, calcs: []};
            this.log.push(json);
            this.IBIndex++;
            return true;
        },
        calculate: function(operation, param){
            if (this.IBIndex > -1){
                var req = apSimplexPhase2CalcConfig.requirements;
                if (req[operation] != null){
                    var validate = true;
                    var calc = req[operation];
                    var calcs = this.log[this.IBIndex].calcs;
                    for (var i = 0; i < calc.required.length; i++){
                        var rawRequired = calc.required[i];
                        var required = apSimplexPhase2CalcConfig.modifyCalc(rawRequired, param);
                        if (calcs.indexOf(required) === -1){
                            validate = false;
                            apNotifier.error(apSimplexPhase2CalcConfig.getError(rawRequired, param));
                            break;
                        }
                    }
                    if (validate){
                        this.log[this.IBIndex].calcs.push(apSimplexPhase2CalcConfig.modifyCalc(operation, param));
                    }
                }
            }
        },
        removeIB: function(k){
            if (this.log.length > k){
                this.log.splice(k, 1);
                this.IBIndex--;
                apProblemData.removeIB(k);
                return true;
            }
            return false;
        },
        removeCalc: function(k, c){
            if (this.log.length > k){
                if (this.log[k].calcs.length > c){
                    this.log[k].calcs.splice(c, 1);
                    return true;
                }
            }
            return false;
        }
    };
});