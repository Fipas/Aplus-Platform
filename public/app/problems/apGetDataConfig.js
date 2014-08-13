angular.module('app').constant('apGetDataConfig', {
    minimunLines: 1,
    minimunColumns: 2,
    restrictionsSentences: ["=", "<=", ">="],
    variablesDomains: ["R>=0", "R<=0", "R", "Z>=0", "Z<=0", "Z", "bin"],
    objectives: ["minimizar", "maximizar"]
});