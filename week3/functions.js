console.log("Hello functions!")

function namedFunction(param1, param2, param3) {
    param1 = param1 || "some default for param1";
    param2 = param2 || "a default for param2";
    param3 = param3 || "another default for param3";

    console.log(param1, param2, param3);
}

function makeArray() {
    var a = [].slice.call(arguments);

    console.log(a);
    return a;
}

function takesAnObject(obj) {
    var sound = obj.sound || "bark";
    var color = obj.color || "brown";
    var type = obj.type || "dog";
    var legs = obj.legs || 4;

    console.log("A " + color + " " + type + ", with " + legs + " legs, makes a " + sound + " sound.");
}
//
// takesAnObject({ sound: "meow"}) 
// -- A brown dog, with 4 legs, and makes a meow sound.
//

function plus2(number) {
    number = (number === undefined) ? 0 : number;

    return number + 2;
}

function returnMultiple(param1, param2) {
    return {
        param1: param1,
        param2: param2
    };
}

function makeAFunction(param) {
    return function() {
        console.log(param);
    };
}

function makeACounter() {
    var counter = 0;

    return function() {
        counter = counter + 1;

        return counter;
    }
}
/*
var counter1 = makeACounter();
undefined
counter1
ƒ () {
        counter = counter + 1;

        return counter;
    }
counter1()
1
counter1()
2
counter1()
3
counter1()
4
*/


console.log([1,2,3,4,5,6,7,8].map(function(item) { return (item % 2) ? "odd" : "even"}))

function isEven(number) { return (number % 2) ? "odd" : "even"}





//
//
// IMAGE CYCLER


function makeACounter(callback) {
    var counter = 0;

    function dec() {
        counter = counter - 1;

        update();
    }

    function inc() {
        counter = counter + 1;

        update();
    }

    function update() {
        callback(counter);
    }

    return {
        inc: inc,
        dec: dec,
        update: update
    };
}

function imageCycler(images, img, incClickable, decClickable) {

    var counter = makeACounter(function(count) {
        var index = count % images.length;

        if (index < 0)
            index += images.length;

        img.src = images[index];
    })

    counter.update();

    incClickable.addEventListener("click", counter.inc);
    decClickable.addEventListener("click", counter.dec);
}


var imageCyclerMountains = imageCycler.bind(null, [
    "images/chile.png",
    "images/iceland.jpg",
    "images/tahiti.png",
    "images/malaysia.png"
]);

var imageCyclerCities = imageCycler.bind(null, [
    "images/nyc.png",
    "images/budapest.png",
    "images/cinqueterre.png"
]);

var mountainCyclerFunction = (function(cycler) { 
    cycler( 
        document.getElementById('mountain'), 
        document.getElementById('inc'), 
        document.getElementById('dec')
    );
}).bind(null, imageCyclerMountains);

var citiesCyclerFunction = (function(cycler) { 
    cycler( 
        document.getElementById('mountain'), 
        document.getElementById('inc'), 
        document.getElementById('dec')
    );
}).bind(null, imageCyclerCities);

window.addEventListener("load", citiesCyclerFunction);

console.log(anUndefinedFunction);

function anUndefinedFunction() {
    console.log(undefined)
}
