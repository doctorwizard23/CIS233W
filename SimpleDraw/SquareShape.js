SquareShape.prototype = new RectangleShape({});

function SquareShape(properties) {
    properties.width = properties.size;
    properties.height = properties.size;
    this.properties = properties;
}