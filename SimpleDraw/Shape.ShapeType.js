Shape.ShapeType = {
    RECTANGLE: RectangleShape,
    CIRCLE: CircleShape,
    TRIANGLE: TriangleShape,
    SQUARE: SquareShape
};


if(Object.freeze !== undefined)
    Object.freeze(Shape.ShapeType);