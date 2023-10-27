console.log("Hello DOM!")

// console.dir(document.getElementById('results'))

function mouseEnter() {
    console.log("Entered!")
}

function mouseOut() {
    console.log("Exit!")
}

function init() {
    document.getElementById('results').addEventListener("mouseover", mouseEnter);
    document.getElementById('results').addEventListener("mouseout", mouseOut);
}

window.addEventListener('load', init);