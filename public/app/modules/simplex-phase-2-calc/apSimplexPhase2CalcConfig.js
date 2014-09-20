angular.module('app').constant('apSimplexPhase2CalcConfig', {
    requirements: {
        xB: {
            required: [], 
            error: "O valor do vetor x<sub>B</sub> ainda não foi calculado."
        },
        uT: {
            required: [],
            error: "O valor do vetor u ainda não foi calculado."
        },
        cTx: {
            required: ["xB"],
            error: "O valor de c<sup>T</sup>x ainda não foi calculado."
        },
        bTu: {
            required: ["uT"],
            error: "O valor de b<sup>T</sup>t ainda não foi calculado."
        },
        zj: {
            required: ["uT"],
            error: "O valor de zj ainda não foi calculado."
        },
        hj: {
            required: [],
            error: "O valor de hj ainda não foi calculado."
        },
        cjzj: {
            required: ["zj"],
            error: "O valor de cj - zj ainda não foi calculado."
        },
        zjcj: {
            required: ["zj"],
            error: "O valor de zj - cj ainda não foi calculado."
        },
        yi: {
            required: [],
            error: "O valor de yi ainda não foi calculado."
        },
        cjzjyik: {
            required: ["cjzj", "yi"],
            error: "O valor de (cj - zj) / yik ainda não foi calculado."
        },
        zjcjyik: {
            required: ["zjcj", "yi"],
            error: "O valor de (zj - cj) / yik ainda não foi calculado."
        },
        xbihji: {
            required: ["xB", "hj"],
            error: "O valor de xbi / hji ainda não foi calculado."
        }
    },
    standardErrors: {
        requiredJ: "Selecione um valor para j antes de continuar.",
        requiredI: "Selecione um valor para i antes de continuar.",
        requiredK: "Selecione um valor para k antes de continuar.",
        requiredCols: "Selecione todas as colunas antes de continuar.",
        sameCols: "Não é permitido selecionar a mesma coluna mais de uma vez."
    },
    modifyCalc: function(calc, param){
        if (calc === "zj" || calc === "hj" || calc === "cjzj" || calc === "zjcj"){
            calc = calc + " - j" + param.j;
        }
        else if (calc === "yi"){
            calc = calc + " - i" + param.i;
        }
        else if (calc === "cjzjyik" || calc === "zjcjyik"){
            calc = calc + " - j" + param.j + "/i" + param.i + "/k" + param.k;
        }
        else if (calc === "xbihji"){
            calc = calc + " - j" + param.j + "/i" + param.i;
        }
        return calc;
    },
    getError: function(calc, param){
        var error = this.requirements[calc].error;
        if (error != null){
            if (calc === "zj"){
                error = error.replace("zj", "z<sub>" + param.j + "</sub>");
            }
            else if (calc === "hj"){
                error = error.replace("hj", "h<sub>" + param.j + "</sub>");
            }
            else if (calc === "cjzj" || calc === "zjcj"){
                error = error.replace("zj", "z<sub>" + param.j + "</sub>");
                error = error.replace("cj", "c<sub>" + param.j + "</sub>");
            }
            else if (calc === "yi"){
                error = error.replace("yi", "y<sup>" + param.i + "</sup>");
            }
            else if (calc === "cjzjyik" || calc === "zjcjyik"){
                error = error.replace("zj", "z<sub>" + param.j + "</sub>");
                error = error.replace("cj", "c<sub>" + param.j + "</sub>");
                error = error.replace("yik", "y<sup>" + param.i + "</sup><sub>" + param.k + "</sub>");
            }
            else if (calc === "xbihji"){
                error = error.replace("xbi", "x<sub>B" + param.i + "</sub>");
                error = error.replace("hji", "h<sup>" + param.j + "</sup></sub>" + param.i + "</sub>");
            }
            return error;
        }
    }
});