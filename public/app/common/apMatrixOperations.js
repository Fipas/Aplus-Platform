angular.module('app').factory('apMatrixOperations', function (apFraction) {
    function MatrixOperations(){
    }

    MatrixOperations.multiplyMatrices = function(matrixA, matrixB){
        var matrixR = new Array();
        var multi, res;
        for (var i = 0; i < matrixA.length; i++){
            matrixR[i] = new Array();
            for (var j = 0; j < matrixB[0].length; j++){
                matrixR[i][j] = new apFraction("0");
                for (var k = 0; k < matrixB.length; k++){
                    multi = matrixA[i][k].multiply(matrixB[k][j]);
                    res = multi.add(matrixR[i][j]);
                    matrixR[i][j] = res;
                }
            }
        }
        return matrixR;
    };
    
    MatrixOperations.multiplyMatrixVector = function(matrix, vector){
        var matrixR = new Array();
        var multi, res;
        for (var i = 0; i < matrix.length; i++){
            matrixR[i] = new Array();
            for (var j = 0; j < 1; j++){
                matrixR[i][j] = new apFraction("0");
                for (var k = 0; k < vector.length; k++){
                    multi = matrix[i][k].multiply(vector[k]);
                    res = multi.add(matrixR[i][j]);
                    matrixR[i][j] = res;
                }
            }
        }
        return matrixR;
    };
    
    MatrixOperations.inverseMatrix = function(matrix) {
        var extendedMatrix = new Array();
        for (var i = 0; i < matrix.length; i++) {
            extendedMatrix[i] = new Array();
        }

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                extendedMatrix[i][j] = matrix[i][j];
                if (i === j)
                    extendedMatrix[i][j + matrix.length] = new apFraction("1");
                else
                    extendedMatrix[i][j + matrix.length] = new apFraction("0");
            }
        }

        for (var i = 0; i < extendedMatrix.length; i++) {
            if (extendedMatrix[i][i].isZero()) {
                var isReversible = false;
                for (var j = i; j < extendedMatrix.length; j++) {
                    if (!extendedMatrix[j][i].isZero()) {
                        for (var k = 0; k < extendedMatrix[i].length; k++) {
                            var aux = extendedMatrix[i][k];
                            extendedMatrix[i][k] = extendedMatrix[j][k];
                            extendedMatrix[j][k] = aux;
                        }
                        isReversible = true;
                        break;
                    }
                }
                if (!isReversible) {
                    return;
                }
            }
            
            if (!extendedMatrix[i][i].isOne()) {
                var divisor = extendedMatrix[i][i];
                for (var j = 0; j < extendedMatrix[i].length; j++)
                    extendedMatrix[i][j] = extendedMatrix[i][j].divide(divisor);
            }

            for (var j = 0; j < extendedMatrix.length; j++) {
                if (j === i)
                    continue;
                
                var coefficient = extendedMatrix[i][i].multiply(extendedMatrix[j][i]);
                for (var k = 0; k < extendedMatrix[i].length; k++) {
                    extendedMatrix[j][k] = extendedMatrix[j][k].subtract(extendedMatrix[i][k].multiply(coefficient));
                }
            }
        }
        var inverseMatrix = new Array();
        for (i = 0; i < matrix.length; i++) {
            inverseMatrix[i] = new Array();
            for (j = 0; j < matrix.length; j++) {
                inverseMatrix[i][j] = extendedMatrix[i][j + matrix.length];
            }
        }
        return inverseMatrix;
    };
    
    return (MatrixOperations);
});