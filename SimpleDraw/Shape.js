Shape.create = function(properties) {
    return new properties.type(properties)
}

function Shape(properties) {
    var mProperties = properties;

    this.scale = function(value, range) {
        return value * range;
    }

    this.draw = function(context, width, height) {
        context.fillStyle = mProperties.color;
        context.strokeStyle = mProperties.outline;
    }
};



if(Object.freeze !== undefined)
    Object.freeze(Shape.ShapeType);