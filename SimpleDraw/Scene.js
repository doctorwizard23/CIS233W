function Scene() {
    var mShapes = [];

    this.draw = function(context, width, height) {
        for(var i = 0; i < mShapes.length; i++) {
            mShapes[i].draw(context, width, height);
        }
    }

    this.add = function(shape) {
        mShapes.push(shape);
    }
}