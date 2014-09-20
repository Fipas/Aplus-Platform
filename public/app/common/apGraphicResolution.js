angular.module('app').factory('apGraphicResolution', function (apProblemData, apMathOperations, apFraction) {
    return {
        getGraphicLimit: function(){
            var limit = new apFraction("0"), current;
            if (apProblemData.columns === 2){
                for (var x = 0; x < apProblemData.lines; x++){
                    if (!(apProblemData.matrixA[x][0].isZero()) && !(apProblemData.matrixA[x][1].isZero())){
                        if (!((apProblemData.matrixA[x][0].isNegative() && !(apProblemData.matrixA[x][1].isNegative())) || (!(apProblemData.matrixA[x][0].isNegative()) && apProblemData.matrixA[x][1].isNegative()))){
                            current = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][0]);
                            if (apFraction.isLesser(limit, current))
                                limit = current;

                            current = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][1]);
                            if (apFraction.isLesser(limit, current))
                                limit = current;
                        }
                        else{
                            if (!(apProblemData.matrixA[x][0].isNegative()) && apProblemData.matrixA[x][1].isNegative()){
                                var coeficiente = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][0]);
                                var maxX2 = apProblemData.matrixA[x][1].multiply(coeficiente);
                                current = apProblemData.vectorB[x].subtract(maxX2).divide(apProblemData.matrixA[x][0]);
                            }
                            else{
                                current = apProblemData.vectorB[x].add(new apFraction("1"));
                            }
                            if (apFraction.isLesser(limit, current))
                                limit = current;
                        }
                    }
                    else{
                        if (apProblemData.matrixA[x][0].isZero()){
                            current = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][1]);
                            if (apFraction.isLesser(limit, current))
                                limit = current;
                        }
                        else{
                            current = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][0]);
                            if (apFraction.isLesser(limit, current))
                                limit = current;
                        }
                    }
                }
                return limit;
            }
            else{
                return -1;
            }
        },
        getInterval: function(){
            var limit = this.getGraphicLimit().value();
            if (limit > 10){
                for (var x = 0; x <= 2; x++){
                    for (var y = 1; y <= 5; y++){
                        var interval = y * (Math.pow(10, x));
                        if (limit / interval >= 5 && limit / interval <= 10)
                            return interval;
                    }
                }
            }
            else{
                return 1;
            }
        },
        getRectPoints: function(){
            var limit = this.getGraphicLimit();
            var rects = new Array();
            if (apProblemData.columns === 2){
                for (var x = 0; x < apProblemData.lines; x++){
                    rects[x] = new Array();
                    if (!(apProblemData.matrixA[x][0].isZero()) && !(apProblemData.matrixA[x][1].isZero())){
                        if (!((apProblemData.matrixA[x][0].isNegative() && !(apProblemData.matrixA[x][1].isNegative())) || (!(apProblemData.matrixA[x][0].isNegative()) && apProblemData.matrixA[x][1].isNegative()))){
                            if (apProblemData.vectorB[x].isZero()){
                                rects[x][0] = new apFraction("" + (-1 * this.getInterval()));
                                var numerador = apProblemData.vectorB[x].subtract(new apFraction("" + (-1 * this.getInterval())).multiply(apProblemData.matrixA[x][0]));
                                rects[x][1] = numerador.divide(apProblemData.matrixA[x][1]);
                                var numerador = apProblemData.vectorB[x].subtract(new apFraction("" + (-1 * this.getInterval())).multiply(apProblemData.matrixA[x][1]));
                                rects[x][2] = numerador.divide(apProblemData.matrixA[x][0]);
                                rects[x][3] = new apFraction("" + (-1 * this.getInterval()));
                            }
                            else{
                                rects[x][0] = limit;
                                var numerador = apProblemData.vectorB[x].subtract(limit.multiply(apProblemData.matrixA[x][0]));
                                rects[x][1] = numerador.divide(apProblemData.matrixA[x][1]);
                                var numerador = apProblemData.vectorB[x].subtract(limit.multiply(apProblemData.matrixA[x][1]));
                                rects[x][2] = numerador.divide(apProblemData.matrixA[x][0]);
                                rects[x][3] = limit;
                                if (rects[x][2].isNegative()){
                                    rects[x][2] = new apFraction("0");
                                    rects[x][3] = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][1]);
                                }
                                if (rects[x][1].isNegative()){
                                    rects[x][0] = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][0]);
                                    rects[x][1] = new apFraction("0");
                                }
                            }
                        }
                        else{
                            if (!(apProblemData.matrixA[x][0].isNegative())){
                                rects[x][0] = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][0]);
                                rects[x][1] = new apFraction("0");
                                rects[x][2] = limit;
                                var numerador = apProblemData.vectorB[x].subtract(limit.multiply(apProblemData.matrixA[x][0]));
                                rects[x][3] = numerador.divide(apProblemData.matrixA[x][1]);
                                if (rects[x][3].value() > limit.value()){
                                    var numerador = apProblemData.vectorB[x].subtract(limit.multiply(apProblemData.matrixA[x][1]));
                                    rects[x][2] = numerador.divide(apProblemData.matrixA[x][0]);
                                    rects[x][3] = limit;
                                }
                            }
                            else if (!(apProblemData.matrixA[x][1].isNegative())){
                                rects[x][0] = new apFraction("0"); 
                                rects[x][1] = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][1]);
                                var numerador = apProblemData.vectorB[x].subtract(limit.multiply(apProblemData.matrixA[x][1]));
                                rects[x][2] = numerador.divide(apProblemData.matrixA[x][0]);
                                rects[x][3] = limit;
                                if (rects[x][2].value() > limit.value()){
                                    rects[x][2] = limit;
                                    var numerador = apProblemData.vectorB[x].subtract(limit.multiply(apProblemData.matrixA[x][0]));
                                    rects[x][3] = numerador.divide(apProblemData.matrixA[x][1]);
                                }
                            }
                        }
                    }
                    else{
                        if (apProblemData.matrixA[x][0].isZero()){
                            rects[x][0] = new apFraction("0");
                            rects[x][1] = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][1]);
                            rects[x][2] = limit;
                            rects[x][3] = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][1]);
                        }
                        else{
                            rects[x][0] = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][0]);
                            rects[x][1] = new apFraction("0");
                            rects[x][2] = apProblemData.vectorB[x].divide(apProblemData.matrixA[x][0]);
                            rects[x][3] = limit;
                        }
                    }
                }
                return rects;
            }
            else{
                return -1;
            }
        },
        getSystemPoints: function(){
            var points = [[new apFraction("0"), new apFraction("0")]];
            for (var x = 0; x < apProblemData.lines; x++){
                if (!(apProblemData.matrixA[x][0].isZero())){
                    var axisXPoint = apMathOperations.solveEquationSystem(apProblemData.matrixA[x][0], apProblemData.matrixA[x][1], apProblemData.vectorB[x], new apFraction("0"), new apFraction("1"), new apFraction("0"));
                    if (points.indexOf(axisXPoint) === -1)
                        points.push(axisXPoint);
                }
                if (!(apProblemData.matrixA[x][1].isZero())){
                    var axisYPoint = apMathOperations.solveEquationSystem(apProblemData.matrixA[x][0], apProblemData.matrixA[x][1], apProblemData.vectorB[x], new apFraction("1"), new apFraction("0"), new apFraction("0"));
                    if (points.indexOf(axisYPoint === -1))
                        points.push(axisYPoint);
                }
                for (var y = x + 1; y < apProblemData.lines; y++){
                    var meetingPoint = apMathOperations.solveEquationSystem(apProblemData.matrixA[x][0], apProblemData.matrixA[x][1], apProblemData.vectorB[x], apProblemData.matrixA[y][0], apProblemData.matrixA[y][1], apProblemData.vectorB[y]);
                    if (points.indexOf(meetingPoint === -1))
                        points.push(meetingPoint);
                }
            }
            return points;
        },
        restrictPoints: function(points){
            var restrictedPoints = new Array();
            for (var element = 0; element < points.length; element++){
                var point = points[element];
                var restrictPoint = true;
                if (point[0].value() >= 0 && point[1].value() >= 0 && isFinite(point[0].value()) && isFinite(point[1].value())){
                    for (var x = 0; x < apProblemData.lines; x++){
                        var ab = point[0].multiply(apProblemData.matrixA[x][0]);
                        var bc = point[1].multiply(apProblemData.matrixA[x][1]);
                        var equacao = ab.add(bc);
                        if (equacao.value() > apProblemData.vectorB[x].value())
                            restrictPoint = false;
                    }
                    if (restrictPoint){
                        restrictedPoints.push(point);
                    }
                }
            }
            return restrictedPoints;
        },
        generateStepChoice: function(k){
            var size = this.getInterval();
            var IN = apProblemData.getIN(k);
            var redirect = [1, 0];
            var zeroPos = [IN[0] - 1, IN[1] - 1];
            var stepPos = new Array();
            for (var x = 0; x <= 1; x ++){
                var stepxk = new Array();
                stepxk[zeroPos[redirect[x]]] = new apFraction("0");
                stepxk[zeroPos[x]] = new apFraction(size + "");
                while (stepxk[0] == null || stepxk[1] == null){
                    for (var y = 2; y < apProblemData.getxk(k).length; y++){
                        if (stepxk[0] != null && stepxk[1] != null)
                            break;
                        
                        if (apProblemData.matrixA[y - 2][0].isZero() && stepxk[y] != null){
                            stepxk[1] = apProblemData.vectorB[y - 2].subtract(stepxk[y]).divide(apProblemData.matrixA[y - 2][1]);
                        }
                        else if (apProblemData.matrixA[y - 2][1].isZero() && stepxk[y] != null){
                            stepxk[0] = apProblemData.vectorB[y - 2].subtract(stepxk[y]).divide(apProblemData.matrixA[y - 2][0]);
                        }
                        else if (stepxk[y] != null){
                            if (stepxk[0] != null){
                                stepxk[1] = apProblemData.vectorB[y - 2].subtract(stepxk[y]).subtract(stepxk[0].multiply(apProblemData.matrixA[y - 2][0])).divide(apProblemData.matrixA[y - 2][1]);
                            }
                            else if (stepxk[1] != null){
                                stepxk[0] = apProblemData.vectorB[y - 2].subtract(stepxk[y]).subtract(stepxk[1].multiply(apProblemData.matrixA[y - 2][1])).divide(apProblemData.matrixA[y - 2][0]);
                            }
                            else{
                                for (var z = 2; z < apProblemData.getxk(k).length; z++){
                                    if (!(apProblemData.matrixA[z - 2][0].isZero()) && !(apProblemData.matrixA[z - 2][1].isZero()) && stepxk[z] != null && z != y){
                                        var returnValue = apMathOperations.solveEquationSystem(apProblemData.matrixA[y - 2][0], apProblemData.matrixA[y - 2][1], apProblemData.vectorB[y - 2].subtract(stepxk[y]), apProblemData.matrixA[z - 2][0], apProblemData.matrixA[z - 2][1], apProblemData.vectorB[z - 2].subtract(stepxk[z]));
                                        var eq = [apProblemData.matrixA[y - 2][0], apProblemData.matrixA[y - 2][1], apProblemData.vectorB[y - 2].subtract(stepxk[y]), apProblemData.matrixA[z - 2][0], apProblemData.matrixA[z - 2][1], apProblemData.vectorB[z - 2].subtract(stepxk[z])];
                                        stepxk[0] = returnValue[0];
                                        stepxk[1] = returnValue[1];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                stepPos[x] = [stepxk[0], stepxk[1]];
            }
            return stepPos;
        },
        
        removeDuplicatedPoints: function(points){
            var newArray = new Array();
            var max = points.length;
            for (var x = 0; x < max; x++){
                if (points[x] != null){
                    newArray.push(points[x]);
                    for (var y = 0; y < max; y++){
                        if (points[y] != points && x != y){
                            if (points[y][0].value() == points[x][0].value() && points[y][1].value() == points[x][1].value())
                                points[y] = null;
                        }
                    }
                }
            }
            return newArray;
        }
    };
});