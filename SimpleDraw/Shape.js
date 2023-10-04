Shape.create = function(properties) {
    return new properties.type(properties)
}

Shape.prototype.scale = function(value, range) {
    return value * range;
}

Shape.prototype.draw = function(context, width, height) {
    context.fillStyle = this.properties.color;
    context.strokeStyle = this.properties.outline;
}

function Shape(properties) {
    this.properties = properties;
};
