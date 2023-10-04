function View() {
    var mScene = new Scene();

    
    this.createScene = function(picture) {
        for(var i = 0; i < picture.length; i++) {
            mScene.add(Shape.create(picture[i]));
        }
    }

    this.redraw = function() {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        
        mScene.draw(context, canvas.width, canvas.height);
    }
    
    this.resize = function() {
        var canvas = document.getElementById("canvas");
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.redraw();
    }
}



