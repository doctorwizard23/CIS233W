if(CanvasRenderingContext2D.prototype.ellipse === undefined) {
    CanvasRenderingContext2D.prototype.ellipse = function(cx, cy, rx, ry, rotation, start, end, anticlockwise) {
        var cos = Math.cos(rotation),
            sin = Math.sin(rotation);
        this.transform(cos * rx, sin * rx, -sin * ry, cos * ry, cx, cy);
        this.arc(0, 0, 1, start, end, anticlockwise);
        this.transform(
            cos / rx, -sin / ry,
            sin / rx, cos / ry,
            -(cos * cx + sin * cy) / rx, (sin * cx - cos * cy) / ry);
    }
}

CircleShape.prototype = new Shape({});

function CircleShape(properties) {
    var mProperties = properties;
    var mSuper = new Shape(properties);

    this.draw = function(context, width, height) {
        mSuper.draw(context, width, height);

        var x = this.scale(mProperties.x, width);
        var y = this.scale(mProperties.y, height);
        var xr = this.scale(mProperties.radius, width);
        var yr = this.scale(mProperties.radius, height);

        context.beginPath();
        context.ellipse(x, y, xr, yr, 0, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();

        if(mProperties.outline !== undefined) {
            context.stroke();
        }
    }
}