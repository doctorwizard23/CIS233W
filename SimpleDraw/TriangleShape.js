TriangleShape.prototype = new Shape({});
TriangleShape.prototype.draw = function(context, width, height) {
    Shape.prototype.draw.call(this, context, width, height);

    var topx = this.scale(this.properties.x, width);
    var topy = this.scale(this.properties.y - this.properties.height / 2, height);
    var secondx = this.scale(this.properties.x + this.properties.width / 2, width);
    var secondy = this.scale(this.properties.y + this.properties.height / 2, height);
    var thirdx = this.scale(this.properties.x - this.properties.width / 2, width);
    var thirdy = secondy;

    context.beginPath();
    context.moveTo(topx, topy);
    context.lineTo(secondx, secondy);
    context.lineTo(thirdx, thirdy);
    context.closePath;

    context.fill();

    if(this.properties.outline !== undefined) {
        context.stroke();
    }
}

function TriangleShape(properties) {
    this.properties = properties;
}