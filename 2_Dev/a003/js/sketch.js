 let canvas;

let gravity;
let points = [];
let inter = 20;

function setup() {
    canvas = createCanvas(600, 800);
    canvas.parent('sketch-XXX');
    gravity = createVector(0,0.05);
    colorMode(HSB);
    for (let i=0; i<10 ; i ++) {
        points.push(new Particule(300, inter*i));
    }
}

function draw() {
    background(0);

    if (mouseIsPressed) {
        points[points.length-1].pos.set(mouseX,mouseY);
        points[points.length-1].vel.set(0,0);
    }

    for (p of points) {
        p.applyForce(gravity);
        p.update();
        p.show();
    }
}