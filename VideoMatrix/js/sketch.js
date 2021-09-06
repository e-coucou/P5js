p5.disableFriendlyErrors = true;

let video;
let pScale = 1;

function setup () {
	createCanvas(600,600);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(width/pScale, height/pScale);
//	video.hide();
}

function draw() {
	background(0,230);
	video.loadPixels();
//	image(video,0,0,width,height);
 
  const stepSize = round(constrain(mouseX / 8, 2, 32));
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - video.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }


//	video.updatePixels();
}