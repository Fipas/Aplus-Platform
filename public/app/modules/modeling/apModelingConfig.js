angular.module('app').constant('apModelingConfig', {
    maxMainIndexLength: 1,
    maxSupSubIndexLength: 2,
    modelMinColumns: 2,
    errorAddVarRequiredInput: "É obrigatorio preencher o campo principal da variável e o campo da descrição!",
    errorAddVarAlreadyExists: "Uma variável de mesmo nome já existe!",
    errorDefaultDataInput: "Preencha corretamente os campos com números ou frações(Ex: 2, 4/5, 1/4)!",
    errorMinColumns: "É nescessário no mínimo 2 variáveis para esta operação!",
    errorSelectObjective: "Escolha o objetivo!",
    errorAddDomainSelectVar: "Escolha uma variável para a operação!",
    errorDeleteMinColumns: "Para deixar menos de duas variáveis é preciso deletar as restrições e a função objetivo!",
    errorIncompleteModel: "O modelo está incompleto!"
});