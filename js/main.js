var applis = [];
var img = [];
var jsonApp;

function preload() {
  jsonApp = loadJSON('./data/app.json');
  img.push(loadImage('./img/2048.png'));
}

function setup() {
  // createCanvas(400, 400);
  noCanvas;
  for (i in jsonApp) {
    applis.push(jsonApp[i]);
  }
  for (a of applis) {
    p = createP(a.name);
  }

}

// function draw() {
//   background(0);
// }