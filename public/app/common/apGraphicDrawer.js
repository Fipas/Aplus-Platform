angular.module('app').factory('apGraphicDrawer', function(apProblemData, fracFilter, apFraction, apGraphicResolution, apGraphicLine) {
    return {
        ctx: null,
        heigth: 0,
        width: 0,
        colors: ["green", "orange"],
        generateGeneralxk: function(points) {
            var xk = new Array();
            for (var x = 0; x < points.length; x++) {
                xk[x] = new Array();
                xk[x][0] = points[x][0];
                xk[x][1] = points[x][1];
                for (var y = 0; y < apProblemData.lines; y++) {
                    xk[x][y + 2] = apProblemData.vectorB[y].subtract(points[x][0].multiply(apProblemData.matrixA[y][0])).subtract(points[x][1].multiply(apProblemData.matrixA[y][1]));
                }
            }
            return xk;
        },
        drawStar: function(length, x, y) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.translate(x, y);
            this.ctx.rotate((Math.PI * 1 / 10));
            for (var i = 5; i--; ) {
                this.ctx.lineTo(0, length);
                this.ctx.translate(0, length);
                this.ctx.rotate((Math.PI * 2 / 10));
                this.ctx.lineTo(0, -length);
                this.ctx.translate(0, -length);
                this.ctx.rotate(-(Math.PI * 6 / 10));
            }
            this.ctx.lineTo(0, length);
            this.ctx.closePath();
            this.ctx.restore();
            this.ctx.fill();
            this.ctx.stroke();
        },
        drawArea: function(points) {
            var xk = this.generateGeneralxk(points);
            var way = new Array();
            var current = 0, zeros, unlimited = false, next, hasNext;
            for (var x = 0; x < xk.length; x++) {
                zeros = 0;
                for (var y = 0; y < xk[x].length; y++) {
                    if (xk[x][y].isZero())
                        zeros++;
                }
                if (zeros == 1) {
                    current = x;
                    unlimited = true;
                    break;
                }
            }
            this.ctx.beginPath();
            way.push([xk[current][0], xk[current][1]]);
            for (var x = 0; x < xk.length - 1; x++) {
                for (var y = 0; y < xk[current].length; y++) {
                    hasNext = false;
                    if (xk[current][y].isZero()) {
                        for (var z = 0; z < xk.length; z++) {
                            if (xk[z] != null && current != z) {
                                if (xk[z][y].isZero()) {
                                    next = z;
                                    hasNext = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (hasNext) {
                        way.push([xk[next][0], xk[next][1]])
                        xk[current] = null;
                        current = next;
                        break;
                    }
                }
            }
            var begin = this.cartesianToPixel(way[0]);
            this.ctx.moveTo(begin[0], begin[1]);
            for (var run = 1; run < way.length; run++) {
                var next = this.cartesianToPixel(way[run]);
                this.ctx.lineTo(next[0], next[1]);
            }

            if (unlimited) {

            }
            else
                this.ctx.closePath();


            this.ctx.fill();
            this.ctx.stroke();

        },
        pointsDistance: function(ponto1, ponto2) {
            var distX = ponto1[0].value() - ponto2[0].value();
            if (distX < 0)
                distX = distX * -1;
            var distY = ponto1[1].value() - ponto2[1].value();
            if (distY < 0)
                distY = distY * -1;

            return Math.sqrt(distX * distX + distY * distY);

        },
        cartesianToPixel: function(coordenadas) {
            var newCoordenates = new Array();
            var interval = apGraphicResolution.getInterval();
            var limit = apGraphicResolution.getGraphicLimit().value() * 1.2 + interval * 2;
            var individual = (this.height) / (limit + interval);
            newCoordenates[0] = coordenadas[0].value() * individual + individual * interval;
            newCoordenates[1] = this.height - coordenadas[1].value() * individual - individual * interval;
            return newCoordenates;
        },
        drawAxes: function() {
            var limit = apGraphicResolution.getGraphicLimit().value();
            var interval = apGraphicResolution.getInterval();
            var final = limit / interval;
            var individual = (this.height) / (limit * 1.2 + interval * 3);
            var spaceNameRect = individual * interval - 15;

            //Eixo X
            var axisX = new apGraphicLine([0, this.height - individual * interval], [this.width, this.height - individual * interval])
            axisX.drawWithArrow(this.ctx);
            this.ctx.fillText("x1", this.width - 15, this.height - spaceNameRect);

            //Eixo Y
            var axisY = new apGraphicLine([individual * interval, this.height], [individual * interval, 0]);
            axisY.drawWithArrow(this.ctx);
            this.ctx.fillText("x2", spaceNameRect, 10);
            //Marcar Eixo X
            for (var x = 1; x <= final + 1; x++) {
                var posX = x * interval;
                var point = this.cartesianToPixel([new apFraction("" + posX), new apFraction("0")]);
                this.ctx.moveTo(point[0], point[1] - 3);
                this.ctx.lineTo(point[0], point[1] + 3);
                this.ctx.stroke();
            }

            //Marcar Eixo Y
            for (var y = 1; y <= final + 1; y++) {
                var posY = y * interval;
                var point = this.cartesianToPixel([new apFraction("0"), new apFraction("" + posY)]);
                this.ctx.moveTo(point[0] - 3, point[1]);
                this.ctx.lineTo(point[0] + 3, point[1]);
                this.ctx.stroke();
            }

            //Marcar Escala
            this.ctx.moveTo(this.width - 1, 0);
            this.ctx.lineTo(this.width - 1, 7);
            this.ctx.stroke();
            this.ctx.moveTo(this.width - individual * interval - 1, 0);
            this.ctx.lineTo(this.width - individual * interval - 1, 7);
            this.ctx.stroke();
            var scaleLine = new apGraphicLine([this.width - individual * interval - 1, 4], [this.width - 1, 4]);
            scaleLine.draw(this.ctx);
            this.ctx.fillText(interval, this.width - 1 - ((individual * interval) / 2), 15);
        },
        drawCanvas: function(step, checking, message, k, canvasID) {
            var canvas = document.getElementById(canvasID);
            this.ctx = canvas.getContext("2d");
            this.height = canvas.height;
            this.width = canvas.width;
            var interval = apGraphicResolution.getInterval();
            var individual = (this.height) / (apGraphicResolution.getGraphicLimit().value() * 1.2 + interval * 3);
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.ctx.strokeStyle = "black";
            this.ctx.fillStyle = "black";
            this.ctx.textAlign = 'center';
            this.ctx.lineWidth = 1;
            this.ctx.font = "14px Georgia";
            document.getElementById("canvas-subtitle").innerHTML = "";

            // Desenhar os eixos
            this.drawAxes();
            
            var rects = apGraphicResolution.getRectPoints();
            var extremePoints = new Array();
            
            
            // Desenhar as linhas das restrições
            for (var x = 0; x < apProblemData.lines; x++) {
                var start, end;
                if (rects[x][2] != 0) {
                    rects[x][0] = rects[x][0].multiply(new apFraction("2")).subtract(rects[x][2]);
                    rects[x][1] = rects[x][1].multiply(new apFraction("2")).subtract(rects[x][3]);
                    end = this.cartesianToPixel([rects[x][0], rects[x][1]]);
                    start = this.cartesianToPixel([rects[x][2], rects[x][3]]);
                }
                else {
                    rects[x][2] = rects[x][2].multiply(new apFraction("2")).subtract(rects[x][0]);
                    rects[x][3] = rects[x][3].multiply(new apFraction("2")).subtract(rects[x][1]);
                    start = this.cartesianToPixel([rects[x][0], rects[x][1]]);
                    end = this.cartesianToPixel([rects[x][2], rects[x][3]]);
                }
                var line = new apGraphicLine(start, end);
                line.drawRestrictionLine(this.ctx, 4, x, step, interval, individual);
                extremePoints.push([rects[x][0], rects[x][1]]);
                extremePoints.push([rects[x][2], rects[x][3]]);
            }
            

            var axisEnd = apGraphicResolution.getGraphicLimit().value() / interval;
            extremePoints.push([new apFraction("0"), new apFraction("" + axisEnd)], [new apFraction("" + axisEnd), new apFraction("0")]);

            var points = apGraphicResolution.restrictPoints(apGraphicResolution.getSystemPoints().concat(extremePoints));
            points = apGraphicResolution.removeDuplicatedPoints(points);
            this.ctx.strokeStyle = "black";
            this.ctx.fillStyle = "#0081c2";
            this.ctx.lineWidth = 2;

            // Desenhar a área viávelgerarxk
            this.drawArea(points);

            // Desenhar as direções dos passos e a legenda
            if ((step == 6 && message >= 2) || step > 6 || (step < 5 && k > 0)) {
                var kArrow = k;
                if ((step < 5 && k > 0))
                    kArrow--;
                var IN = apProblemData.getIN(kArrow);
                var cBNInverseB = apProblemData.getcBNInverseB(kArrow);
                var cN = apProblemData.getcN(kArrow);
                var choice = apGraphicResolution.generateStepChoice(kArrow);
                var xk = apProblemData.getxk(kArrow);
                if (step < 5) {
                    for (var x = 0; x < IN.length; x++) {
                        if (apProblemData.getJBaseEntry(kArrow) == IN[x]) {
                            this.ctx.strokeStyle = this.colors[x];
                            this.ctx.fillStyle = this.colors[x];
                            var line = new apGraphicLine(this.cartesianToPixel([xk[0], xk[1]]), this.cartesianToPixel(choice[x]));
                            line.drawStepDirection(this.ctx, 4, individual * interval * 0.5);
                        }
                    }
                }
                else if (step < 10) {
                    for (var x = 0; x < IN.length; x++) {
                        if (step < 10 || !checking) {
                            this.ctx.strokeStyle = this.colors[x];
                            this.ctx.fillStyle = this.colors[x];
                            var line = new apGraphicLine(this.cartesianToPixel([xk[0], xk[1]]), this.cartesianToPixel(choice[x]));
                            line.drawStepDirection(this.ctx, 4, individual * interval * 0.5);
                        }
                        if (step < 9 || (step == 9 && message < 2)) {
                            document.getElementById("canvas-subtitle").innerHTML += "<span style='color: " + this.colors[x] + ";'>Direção caso x<sub>" + IN[x] + "</sub> entre na base</span><br>";
                        }
                        else {
                            var conta = cN[0][x].subtract(cBNInverseB[0][x]);
                            var negativo = "";
                            if (!((conta.isNegative() && apProblemData.objective == "minimizar") || (!(conta.isNegative()) && apProblemData.objective == "maximizar"))) {
                                negativo = " não";
                            }
                            document.getElementById("canvas-subtitle").innerHTML += "<span style='color: " + this.colors[x] + ";'>Esta direção" + negativo + " melhora o valor da FO</span><br>";
                        }
                    }
                }
                else if (step < 11) {
                    for (var x = 0; x < IN.length; x++) {
                        if (apProblemData.getJBaseEntry(kArrow) == IN[x]) {
                            this.ctx.strokeStyle = this.colors[x];
                            this.ctx.fillStyle = this.colors[x];
                            var line = new apGraphicLine(this.cartesianToPixel([xk[0], xk[1]]), this.cartesianToPixel(choice[x]));
                            line.drawStepDirection(this.ctx, 4, individual * interval * 0.5);
                            document.getElementById("canvas-subtitle").innerHTML += "<span style='color: " + this.colors[x] + ";'>Direção escolhida pelo Simplex</span><br>";
                        }
                    }
                }
                else {
                    for (var x = 0; x < IN.length; x++) {
                        if (apProblemData.getJBaseEntry(kArrow) == IN[x] && !checking) {
                            this.ctx.strokeStyle = this.colors[x];
                            this.ctx.fillStyle = this.colors[x];
                            var line = new apGraphicLine(this.cartesianToPixel([xk[0], xk[1]]), this.cartesianToPixel(choice[x]));
                            line.drawStepDirection(this.ctx, 4, individual * interval * 0.5);
                        }
                    }
                    var tableHTML = "";
                    var IBs = apProblemData.getIB(kArrow);
                    var xihji = apProblemData.getxihji(kArrow);
                    var minxihji = apProblemData.getMinxihji(kArrow);
                    var jminxihji = apProblemData.getjMinxihji(kArrow);
                    tableHTML += "<table id='canvas-table'><tr><th id='step-size' colspan='" + (IBs.length + 1) + "'>Tamanho do passo</th></tr><tr><td class='td-label'>Variável básica</td>";
                    for (var x = 0; x < IBs.length; x++) {
                        var alert = "";
                        if (jminxihji.length !== -1) {
                            if (xihji[x].toString() === minxihji.toString())
                                alert = " class='alert-danger'";
                        }
                        tableHTML += "<td" + alert + ">x<sub>" + IBs[x] + "</sub></td>";
                    }
                    tableHTML += "</tr><tr><td class='td-label'>Limite para x<sub>" + apProblemData.getJBaseEntry(kArrow) + "</sub></td>";
                    for (var x = 0; x < IBs.length; x++) {
                        if (!xihji[x].isOneNegative()) {
                            var alert = "";
                            if (jminxihji.length !== -1) {
                                if (xihji[x].toString() === minxihji.toString())
                                    alert = " class='alert-danger'";
                            }
                            tableHTML += "<td" + alert + ">" + fracFilter(xihji[x].toString()) + "</td>";
                        }
                        else {
                            tableHTML += "<td>&infin;</td>";
                        }
                    }
                    tableHTML += "</tr></table>";
                    document.getElementById("canvas-subtitle").innerHTML = tableHTML;
                }
            }

            // Desenhar o vetor C
            this.ctx.fillStyle = "red";
            this.ctx.strokeStyle = "red";
            var commonDenominator, c1 = new apFraction(apProblemData.vectorC[0].toString()), c2 = new apFraction(apProblemData.vectorC[1].toString());
            if (c1.value() < 0)
                c1.numerator = c1.numerator * -1;

            if (c2.value() < 0)
                c2.numerator = c2.numerator * -1;

            if (c1.value() > c2.value())
                commonDenominator = c1;
            else
                commonDenominator = c2;

            var numeratorA = apProblemData.vectorC[0].multiply(new apFraction("" + interval));
            var numeratorB = apProblemData.vectorC[1].multiply(new apFraction("" + interval));
            var A = numeratorA.divide(commonDenominator);
            var B = numeratorB.divide(commonDenominator);

            var lineC = new apGraphicLine(this.cartesianToPixel([new apFraction("0"), new apFraction("0")]), this.cartesianToPixel([A, B]));
            lineC.drawWithArrow(this.ctx);

            // Desenhar os pontos
            if (step >= 5 || k > 0) {
                var pointK = k;
                if (step < 5)
                    pointK--;

                var repetition = new Array();
                var repeat = 1;
                for (var kVerify = pointK; kVerify >= 0; kVerify--) {
                    if (kVerify < pointK) {
                        var xk = apProblemData.getxk(kVerify);
                        var xkNext = apProblemData.getxk(kVerify + 1);
                        if (xk[0].value() == xkNext[0].value() && xk[1].value() == xkNext[1].value()) {
                            repeat++;
                        }
                        else
                            repeat = 1;
                    }
                    else
                        repeat = 1;

                    repetition[kVerify] = repeat;
                }
                var numberMax = 255;
                for (var kAtual = 0; kAtual <= pointK; kAtual++) {
                    var rad = 5;
                    var number = (numberMax / (pointK + 1)) * (kAtual + 1);
                    number = numberMax - number;
                    var hexString = number.toString(16);
                    if (hexString.indexOf(".") != -1)
                        hexString = hexString.substring(0, hexString.indexOf("."));
                    else if (hexString.length === 1)
                        hexString = hexString + hexString;

                    this.ctx.fillStyle = "#ff" + hexString + hexString;
                    this.ctx.strokeStyle = "black";
                    var xk = apProblemData.getxk(kAtual);
                    var pointSBV = this.cartesianToPixel([xk[0], xk[1]]);
                    this.ctx.beginPath();
                    if (kAtual < pointK || step != 10 || (step == 10 && !checking))
                        this.ctx.arc(pointSBV[0], pointSBV[1], rad * repetition[kAtual], 0, 2 * Math.PI);
                    else {
                        this.ctx.strokeStyle = "#ff" + hexString + hexString;
                        this.drawStar(6, pointSBV[0] - 3, pointSBV[1]);
                    }
                    this.ctx.fill();
                    this.ctx.stroke();
                    this.ctx.strokeStyle = "black";
                    // Desenhar seta entre pontos
                    if (kAtual > 0 && (step < 6 || (step == 6 && message < 2) || (step == 10 && checking))) {
                        var xkBefore = apProblemData.getxk(kAtual - 1);
                        if (!(xk[0].value() == xkBefore[0].value() && xk[1].value() == xkBefore[1].value())) {
                            var start = [xkBefore[0], xkBefore[1]];
                            var midPointX = xk[0].add(xkBefore[0]);
                            var midPointY = xk[1].add(xkBefore[1]);
                            var midPnt = [midPointX.divide(new apFraction("2")), midPointY.divide(new apFraction("2"))];
                            var line = new apGraphicLine(this.cartesianToPixel(start), this.cartesianToPixel(midPnt));
                            line.drawOnlyArrow(this.ctx);
                        }
                    }

                }

                // Reta Ilimitado
                if (step == 11 && checking) {
                    var xkBegin = apProblemData.getxk(pointK);
                    var xkGeneral = this.generateGeneralxk(points);
                    var xkEnd;
                    for (var x = 0; x < xkBegin.length; x++) {
                        if (xkBegin[x].isZero()) {
                            for (var y = 0; y < xkGeneral.length; y++) {
                                if (xkGeneral[y][x].isZero()) {
                                    var zeros = 0;
                                    for (var z = 0; z < xkGeneral[y].length; z++) {
                                        if (xkGeneral[y][z].isZero()) {
                                            zeros++;
                                        }
                                    }
                                    if (zeros == 1) {
                                        xkEnd = xkGeneral[y];
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    this.ctx.strokeStyle = "red";
                    var initialPoint = this.cartesianToPixel([xkBegin[0], xkBegin[1]]);
                    var midPntX = xkEnd[0].add(xkBegin[0]).divide(new apFraction("2"));
                    var midPntY = xkEnd[1].add(xkBegin[1]).divide(new apFraction("2"));
                    var midPnt = this.cartesianToPixel([midPntX, midPntY]);
                    var line = new apGraphicLine(initialPoint, midPnt);
                    line.drawDashedWithArrow(this.ctx, 4);
                }
            }
            this.ctx.save();
        },
        
        exportToImage: function(canvasID, imageID){
            var canvas = document.getElementById(canvasID);
            document.getElementById("image-box").innerHTML = "";;
            var image = new Image();
            image.id = imageID;
            image.src = canvas.toDataURL();
            image.className = "cloudzoom";
            image.setAttribute("data-cloudzoom", "zoomPosition: '12', zoomSizeMode: 'image'");
            document.getElementById("image-box").appendChild(image);
        }
    };
});