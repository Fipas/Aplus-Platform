angular.module('app').factory('apGraphicLine', function() {

    function Line(start, end) {
        this.x1 = start[0];
        this.y1 = start[1];
        this.x2 = end[0];
        this.y2 = end[1];
    }

    Line.prototype.draw = function(ctx) {
        // draw the line
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }

    Line.prototype.drawDashed = function(ctx, dashLen) {
        if (dashLen == undefined)
            dashLen = 2;
        var x1 = this.x1, x2 = this.x2, y1 = this.y1, y2 = this.y2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        var dX = x2 - x1;
        var dY = y2 - y1;
        var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
        var dashX = dX / dashes;
        var dashY = dY / dashes;
        var q = 0;
        while (q++ < dashes) {
            x1 += dashX;
            y1 += dashY;
            ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
        }
        ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
        ctx.stroke();
    };

    Line.prototype.drawRestrictionLine = function(ctx, dashLen, x, passo, intervalo, individual) {
        if (dashLen == undefined)
            dashLen = 2;
        var x1 = this.x1, x2 = this.x2, y1 = this.y1, y2 = this.y2;
        var radians = Math.atan((y2 - y1) / (x2 - x1));
        radians += ((x2 > x1) ? 90 : -90) * Math.PI / 180;
        if (radians != 0)
            radians += Math.PI / 2;
        else
            radians -= Math.PI / 2;
        ctx.moveTo(x1, y1);
        var dXO = x2 - x1;
        var dYO = y2 - y1;
        var dReta = Math.sqrt(dXO * dXO + dYO * dYO);
        ctx.save();
        ctx.beginPath();
        ctx.translate(x2, y2);
        ctx.rotate(radians);
        x1 = 0;
        x2 = dReta + ((individual * intervalo) / 2);
        y1 = 0;
        y2 = 0;
        var dX = x2 - x1;
        var dY = y2 - y1;
        var dashes = Math.floor(dReta / dashLen);
        var dashX = dX / dashes;
        var dashY = dY / dashes;
        var q = 0;
        while (q++ < dashes) {
            x1 += dashX;
            y1 += dashY;
            ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
        }
        ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
        ctx.textAlign = 'left';
        ;
        if (passo > 0) {
            ctx.fillText("x" + (x + 3) + " = 0", x2, 0);
        }
        ctx.restore();
        ctx.stroke();
    };

    Line.prototype.drawStepDirection = function(ctx, dashLen, tamanho) {
        if (dashLen == undefined)
            dashLen = 2;
        var x1 = this.x1, x2 = this.x2, y1 = this.y1, y2 = this.y2;
        var radians = Math.atan((y2 - y1) / (x2 - x1));
        radians += ((x2 > x1) ? 90 : -90) * Math.PI / 180;
        if (radians != 0 && radians != -Math.PI)
            radians += Math.PI / 2;
        else
            radians -= Math.PI / 2;
        ctx.moveTo(x1, y1);
        ctx.save();
        ctx.beginPath();
        ctx.translate(x1, y1);
        ctx.rotate(radians);
        x1 = -tamanho;
        x2 = 0;
        y1 = 0;
        y2 = 0;
        var dX = x2 - x1;
        var dY = y2 - y1;
        var dashes = Math.floor(tamanho / dashLen);
        var dashX = dX / dashes;
        var dashY = dY / dashes;
        var q = 0;
        while (q++ < dashes) {
            x1 += dashX;
            y1 += dashY;
            ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
        }
        ctx[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
        x1 = -tamanho;
        x2 = 0;
        y1 = 0;
        y2 = 0;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + 10, y1 + 5);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + 10, y1 - 5);
        ctx.restore();
        ctx.stroke();
    };

    Line.prototype.drawWithArrow = function(ctx) {

        this.draw(ctx);

        var endRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
        endRadians += ((this.x2 > this.x1) ? 90 : -90) * Math.PI / 180;
        this.drawArrow(ctx, this.x2, this.y2, endRadians);

    }

    Line.prototype.drawDashedWithArrow = function(ctx, dashLen) {
        this.drawDashed(ctx, dashLen);
        this.drawOnlyArrow(ctx);
    }

    Line.prototype.drawOnlyArrow = function(ctx) {
        var radians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
        radians += ((this.x2 > this.x1) ? 90 : -90) * Math.PI / 180;
        if (radians == 0 || radians == (Math.PI * -1))
            radians += Math.PI;
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x2, this.y2);
        ctx.rotate(radians);
        ctx.moveTo(0, 0);
        ctx.lineTo(5, 10);
        ctx.moveTo(0, 0);
        ctx.lineTo(-5, 10);
        ctx.restore();
        ctx.stroke();
    }

    Line.prototype.drawArrow = function(ctx, x, y, radians) {
        if (radians == 0 || radians == (Math.PI * -1))
            radians += Math.PI;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(radians);
        ctx.moveTo(0, 0);
        ctx.lineTo(5, 20);
        ctx.lineTo(-5, 20);
        ctx.closePath();
        ctx.restore();
        ctx.fill();
        ctx.stroke();
    }

    return (Line);
});