TriangleShape.prototype = new Shape({});

function TriangleShape(properties) {
    var mProperties = properties;
    var mSuper = new Shape(properties);

    this.draw = function(context, width, height) {
        mSuper.draw(context, width, height);

        var topx = this.scale(mProperties.x, width);
        var topy = this.scale(mProperties.y - mProperties.height / 2, height);
        var secondx = this.scale(mProperties.x + mProperties.width / 2, width);
        var secondy = this.scale(mProperties.y + mProperties.height / 2, height);
        var thirdx = this.scale(mProperties.x - mProperties.width / 2, width);
        var thirdy = secondy;
    
        context.beginPath();
        context.moveTo(topx, topy);
        context.lineTo(secondx, secondy);
        context.lineTo(thirdx, thirdy);
        context.closePath;

        context.fill();

        if(mProperties.outline !== undefined) {
            context.stroke();
        }
    }
}