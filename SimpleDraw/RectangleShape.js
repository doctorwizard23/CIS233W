RectangleShape.prototype = new Shape({});

function RectangleShape(properties) {
    var mProperties = properties;
    var mSuper = new Shape(properties);

    this.draw = function(context, width, height) {
        mSuper.draw(context, width, height);

        var x = this.scale(mProperties.x - mProperties.width / 2, width);
        var y = this.scale(mProperties.y - mProperties.height / 2, height);
        var width = this.scale(mProperties.width, width);
        var height = this.scale(mProperties.height, height);

        context.fillRect(x, y, width, height);

        if(mProperties.outline !== undefined) {
            context.strokeRect(x, y, width, height);
        }
    }
}