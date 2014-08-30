angular.module('app').constant('apSimplexPhase2SBSConfig', {
    infoMessages: [
        [["Para começar devemos inserir variáveis de folga colocando o PPL no formato Ax = b."]], 
        [["Observe que este PPL é equivalente ao PPL original"]], 
        [["Extraindo os dados do PPL na forma padrão"]],
        [["Vamos então para a kª-ésima iteração do Simplex"]],
        [["A primeira base é composta pelas variáveis de folga."], ["A kª base é definida por I<sub>B</sub> = {}"]],
        [["A solução básica associada a I<sub>B</sub> é dada por<br>xk = [].<br>Observe que xk é viável para o PPL."]],
        [["O valor da função objetivo para xk é c<sup>T</sup>xk = q", "<br><span class='alert-danger'>A sbv xk é uma solução ótima para o problema?</span>", "<br>Para responder esta pergunta, devemos verificar se o valor da função objetivo pode melhorar caso aumentemos o valor de alguma variável não básica (vnb),<br>definidas por I<sub>N</sub> e que são coordenadas nulas de xk"]],
        [["Para fazer esta verificação devemos, primeiramente, escrever as variáveis básicas em função das não básicas."]],
        [["De modo geral, temos as seguintes equivalências:<br><span class='alert-danger'>Ax = b ⇔</span> Bx<sub>B</sub> + Nx<sub>N</sub> = b  ⇔ Bx<sub>B</sub> = b - Nx<sub>N</sub> ⇔ <span class='alert-danger'>x<sub>B</sub> = B<sup>-1</sup>b - B<sup>-1</sup>Nx<sub>N</sub>.</span><br>Para o PPL e base atual temos o que é mostrado acima."]],
        [["Seguindo o passo anterior, para a função objetivo temos:<br><span class='alert-danger'>c<sup>T</sup>x =</span> c<sub>B</sub>x<sub>B</sub> + c<sub>N</sub>x<sub>N</sub> = c<sub>B</sub>(B<sup>-1</sup>b - B<sup>-1</sup>Nx<sub>N</sub>) + c<sub>N</sub>x<sub>N</sub> = <span class='alert-danger'>c<sub>B</sub>B<sup>-1</sup>b + (c<sub>N</sub> - c<sub>B</sub>B<sup>-1</sup>N)x<sub>N</sub></span>.", "<br>Logo, se o objetivo é minimizar c<sup>T</sup>x e (c<sub>N</sub> - c<sub>B</sub>B<sup>-1</sup>N) &ge; 0, ou maximizar c<sup>T</sup>x<br>e (c<sub>N</sub> - c<sub>B</sub>B<sup>-1</sup>N) &le; 0, então, a sbv xk, que tem x<sub>N</sub> = 0, é uma solução ótima.", "<br><span class='alert-danger'>Portanto, pelas contas acima, condicional que xk é ótimo para o PPL</span>", "<br>Denominamos (c<sub>N</sub> - c<sub>B</sub>B<sup>-1</sup>N) de vetor custo reduzido associado a base B,<br>e (c<sub>j</sub> - z<sub>j</sub>) é o custo reduzido da vnb x<sub>j</sub>."]],
        [["Como neste PPL o objetivo é objective c<sup>T</sup>x e os custos reduzidos<br>das variáveis não básicas são todos não MPositivo/mNegativo, então a sbv <br><span class='alert-danger'>xk = []</span> com <span class='alert-danger'>c<sup>T</sup>xk = q</span><br> é uma solução ótima para o problema."], ["Como o custo reduzido (cj - zj) = yy é MPositivo/mNegativo e estamos maximizando/minimizando, vamos então colocar xj na base. Com isso, o valor de xj vai deixar de ser zero para ser positivo. As demais variáveis não básicas serão mantidas iguais a zero."]], 
        [["Aumentando xj temos que c<sup>T</sup>x melhora cada vez mais e xj pode ir para infinito sem que nenhuma outra variável se torne negativa (observe acima que o vetor direção simplex hj = B<sup>-1</sup>aj &le; 0). Portanto este PPL é ilimitado."], ["Aumentando xj temos que c<sup>T</sup>x melhora cada vez mais, então queremos atribuir o maior valor possível para xj sem que nenhuma outra variável fique negativa. Neste caso as variáveis que limitam xj estão destacadas acima. Veja que qualquer valor maior do que yy para xj faz com que xi fique negativo e fazendo xj = yy temos xi = 0 e todas as demais variáveis não negativas. Então xi sai da base para a entrada de xj."]]
    ],
    infoTitles: [
        ["Inicialização"], 
        ["Forma padrão"], 
        ["Dados"],
        ["Iteração"],
        ["Base Inicial", "Base Atual"],
        ["Solução Básica Viável"],
        ["Valor Objetivo"],
        ["x<sub>B</sub> em função de x<sub>N</sub>"],
        ["x<sub>B</sub> em função de x<sub>N</sub>"],
        ["Verificando se xk é ótima"],
        ["Solução Ótima", "Entrada na Base"],
        ["PPL Ilimitado", "Saída da Base"]
    ],
    notIterativeSteps: 3,
    getInfoTitle: function(step, stepWay){
        return this.infoTitles[step][stepWay];
    },
    getInfoMessage: function(step, stepWay, message){
        return this.infoMessages[step][stepWay][message];
    },
    getMessagesCount: function(step, stepWay){
        return this.infoMessages[step][stepWay].length;
    },
    getTotalSteps: function(){
        return this.infoTitles.length;
    }
});