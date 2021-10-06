const size=60;
let rotX = 1/3;
let nb;
let carres = [];
let time = 0, inc=0.01;
function setup() {
	createCanvas(400,400);
	nb = floor(width/size);
	rotX *= PI;
	let carre = new Carre(width/2,height/2,size,rotX);
	carres.push(carre);
}


function draw() {
	background(0);
	time += inc;
	for( let i = 0; i< carres.length;i++) {
		carres[i].r = time;
		carres[i].show();
	}
	if (time > HALF_PI || time < 0) inc = -inc;
}



class Carre {
	constructor(x,y,s,r) {
		this.x = x;
		this.y = y;
		this.s = s; // taille de l'élément
		this.r = r; // rotation initiale 
	}


	show() {
		push();
		fill(255);
		noStroke();
		beginShape();
		vertex(this.x, this.y);
		vertex(this.x+this.s, this.y);
		vertex(this.x+(1+cos(this.r))*this.s, this.y-this.s);
		vertex(this.x-cos(this.r)*this.s, this.y-this.s);
		endShape(CLOSE);
		pop();
	}
}