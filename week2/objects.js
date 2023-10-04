console.log("hello week 2!")

Dog.type = "dog";
Dog.create = function(type) {
    switch (type) {
        case "Dalmatian":
            return new Dalmatian();
        case "Mini Dalmatian":
            return new MiniDalmatian();
        case "Small Dog":
            return new SmallDog();
    }
    return new Dog();
}

function Dog() {
    var sound = "bark";
    var type = "dog";
    var legs = 4;
    var size = "medium";

    this.speak = function() { console.log(sound); };
    this.getSound = function() { return sound; };
    this.getType = function() { return type; };
    this.getLegs = function() { return legs; };
    this.setLegs = function(value) { 
        legs = value; 
        console.log("changing number of legs");
    };
    this.getSize = function() { return size; };
}

Dalmatian.prototype = new Dog();

function Dalmatian() {
    var color = "white with balck spots";
    var parent = new Dog();

    this.setLegs = function(value) { parent.setLegs(value); };
    this.getLegs = function() { return parent.getLegs(); };
    this.getColor = function() { return color; };
}

SmallDog.prototype = new Dog();

function SmallDog() {
    var size = "small";
    var parent = new Dog();

    this.setLegs = function(value) { parent.setLegs(value); };
    this.getLegs = function() { return parent.getLegs(); };
    this.getSize = function() { return size; };
}

MiniDalmatian.prototype = new Dalmatian();
SmallDog.call(MiniDalmatian.prototype);

function MiniDalmatian() {
    var parent = new Dalmatian();

    this.setLegs = function(value) { parent.setLegs(value); };
    this.getLegs = function() { return parent.getLegs(); };
}