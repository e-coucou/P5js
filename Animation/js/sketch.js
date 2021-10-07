const size=5;
let rotX = 1/3;
let nb;
let carres = [], notFall = [];
let nbTrame = 170;
let time , inc;
let offsetY = 300;
let offsetX ;
let byLigne = 30;
let timeB;


function setup() {
	createCanvas(400,400);
	offsetX = width/2;
	time = -PI/2;
	timeB = time;
	inc = HALF_PI/nbTrame;
	let l1 = width*1.3;
	for(let j = 0; j<byLigne;j++) {
		let l2 = l1 -size*1.1;
		for (let i =0;i<byLigne;i++) {
			let x=[];
			x[0] = i*(l1/byLigne)+offsetX-l1/2+3;
			x[1] = (i+1)*(l1/byLigne)+offsetX-l1/2;
			x[3] = i*(l2/byLigne)+offsetX-l2/2+3;
			x[2] = (i+1)*(l2/byLigne)+offsetX-l2/2;
			let carre = new Carre(x,PI/24,size,width/3-(j*size));
			carres.push(carre);
			notFall[i+j*byLigne] = i+j*byLigne;
		}
		l1 = l2;
	}
}


function draw() {
	// frameRate(40);
	background(0);
	time += inc;
	if (frameCount>40) {
		timeB += inc/2;
		for ( let k=0;k<5;k++) {
			if( notFall.length>0) {
				l = floor(random(notFall.length));
				// if (carres[notFall[l]].fall) console.log('erreur');
				carres[notFall[l]].toFall();
				notFall.splice(l,1);
			}
		}
	}
	// console.log(notFall.length);
	for( let i = 0; i< carres.length;i++) {
		carres[i].update();
		carres[i].show();
	}
	// if (time > 0 || time < -HALF_PI) noLoop(); //inc = -inc;
	if (frameCount === nbTrame) {noLoop();}
	// console.log(frameCount);
}



class Carre {
	constructor(x,x2,s,r) {
		this.x = x; // angle
		this.x2 = x2;
		this.s = s; // taille de l'élément
		this.r = r; // rayon initial 
		this.fall = false;
		this.time = 0;
		this.inc = inc;
	}

	toFall() {
		this.fall = true;
		let c = abs((-HALF_PI - time) / (nbTrame - frameCount));
		this.inc = random(c,c*5);

	}

	update() {
		if (this.fall) {
			if (this.time > timeB) {
				this.time = (this.time) - (this.inc);
			} else {
				this.time = timeB;
				// console.log('on fige',this.time);
			}
		} else {
			this.time = time;
		}
	}

	show() {
		let y1 = 10+(offsetY + this.r) * sin(-this.time );
		let y2 = 6+(offsetY + this.r+ this.s) * sin(-this.time);
		push();
		fill(255);
		noStroke();
		beginShape();
		vertex(this.x[3],y1);
		vertex(this.x[2],y1);
		vertex(this.x[1],y2);
		vertex(this.x[0],y2);
		endShape(CLOSE);
		pop();
	}
}