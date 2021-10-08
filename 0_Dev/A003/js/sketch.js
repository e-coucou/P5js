const DEV = true;
const w = 600;
const h = 600;

let buffer, result;

function ease(p, g) {
  if (p < 0.5) 
    return 0.5 * pow(2*p, g);
  else
    return 1 - 0.5 * pow(2*(1 - p), g);
}

function draw() {
  if (DEV) {
    // t = mouseX*1.0/width;
    // c = mouseY*1.0/height;
    // if (mouseIsPressed)
      // println(c);
    draw_();
  } else {
    for (let i=0; i<result.length; i++)
        result[i] = 0;
 
    c = 0;
    for (let sa=0; sa<samplesPerFrame; sa++) {
	    t = map(frameCpt-1 + sa*shutterAngle/samplesPerFrame, 0, numFrames, 0, 1);
     	draw_();
     	buffer.loadPixels();
      for (let i=0; i<buffer.pixels.length; i++) {
      	// let id = i*3;
        result[i] += buffer.pixels[i] >> 16 & 0xff;
        result[i] += buffer.pixels[i] >> 8 & 0xff;
        result[i] += buffer.pixels[i] & 0xff;
      }
    }
 
    buffer.loadPixels();
    for (let i=0; i<buffer.pixels.length; i++) {
  		// let id = i *3;
	      buffer.pixels[i] = 0xff << 24 | 
    	    (result[i]*1.0/samplesPerFrame) << 16 | 
    	    (result[i]*1.0/samplesPerFrame) << 8 | 
    	    (result[i]*1.0/samplesPerFrame);
    	}
    buffer.updatePixels();
 
    // saveFrame("fr#");
    frameCpt++;
    if (frameCpt==numFrames) {
    	console.log('exit');
    	noLoop();
  	}
  }
  image(buffer,0,0);
}



//----------------------------------------------------------------
let objets = [];


function initObjets() {

}


function setup() {
	createCanvas(w, h);
	buffer = createGraphics(w,h);
	result = createGraphics(w,h);
}


function draw_(){
  background(0);
	for ( let i =0; i< objets.length; i++ ) {
		objets[i].show();
	}
}

//--------
// 
class Objet {

	constructor() {

	}

	show() {


	}

	update() {


	}
}


