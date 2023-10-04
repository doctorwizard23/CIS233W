SquareShape.prototype = new RectangleShape({});

function SquareShape(properties) {
    properties.width = properties.size;
    properties.height = properties.size;
    mSuper = new RectangleShape(properties);

    this.draw = function(context, width, height) {
        mSuper.draw(context, width, height);
    }
}