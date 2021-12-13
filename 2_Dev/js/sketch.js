let canvas;

function setup() {
    canvas = createCanvas(600, 400);
    canvas.parent('sketch-XXX');
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
          });
    } else {
    console.log('Géolocalisation on disponible');
    }
}

function draw() {
    background(0);
}