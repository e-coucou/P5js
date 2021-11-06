const eC = {version: 'r01'};

let img;
let d;
let errR,errV,errB;

function windowResized(){
	// resizeCanvas(windowWidth,windowHeight);
}

function preload() {
	img = loadImage('photos/P1001095.png');
}

function getID(x,y,i,j) {
	// return (x*d +i +(y* d +j)*width*d)*4;
	return (x + y*img.width)*4;
}
function pColor(id,r,v,b) {
	img.pixels[id] = r;
	img.pixels[id+1] = v;
	img.pixels[id+2] = b;
	// img.pixels[id+3] = (r+v+b)/3;
}
function uColor(id,k) {
	let r = img.pixels[id]; //red(pict);
	let v = img.pixels[id+1]; //green(pict);
	let b = img.pixels[id+2]; //blue(pict);
	img.pixels[id] = r + errR*k;
	img.pixels[id+1] = v +errV * k;
	img.pixels[id+2] = b + errB * k;
}
function setup() {
	// createCanvas(windowWidth,windowHeight);
	createCanvas(640,240);
	console.log("%c (ツ) # eCoucou "+eC.version+" # ","background: #f00; color: #fff");
	// pixelDensity(1);
	// background(0);
	colorMode(RGB);
	stroke(255);
	d = pixelDensity(1);
	img.filter(GRAY);
	image(img,0,0);
}

function draw() {
	img.loadPixels();
	for (let y =0; y< img.height-1; y++) {
		for (let x = 1; x<img.width-1;x++) {
			let id = getID(x,y,0,0);
			let pict = img.pixels[id];
			r = img.pixels[id]; //red(pict);
			v = img.pixels[id+1]; //green(pict);
			b = img.pixels[id+2]; //blue(pict);
			let br = (r+v+b)/3;
			let f = 4;
			let nr = round(f*r/255)*255/f;
			let nv = round(f*v/255)*255/f;
			let nb = round(f*b/255)*255/f;

			pColor(id,nr,nv,nb);

			errR = r - nr;
			errV = v - nv;
			errB = b - nb;


			uColor(getID(x+1,y  ),7/16);
			uColor(getID(x-1,y+1),3/16);
			uColor(getID(x  ,y+1),5/16);
			uColor(getID(x+1,y+1),1/16);

			// img.pixels[id] = color(nr,nv,nb,br); //color(r,v,b);
		}
	}
	img.updatePixels();
	image(img,320,0);
}