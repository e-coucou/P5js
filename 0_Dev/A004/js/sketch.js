let particules = [];

function setup() {
	createCanvas(400,400);
}

function mousePressed() {
	particules.push(new Particule(mouseX,mouseY));
}

function draw() {
	// background(255,20,147,1);
	background(0);

	for (let p of particules) {
		p.edge();
		p.update();
		p.show();
	}

}



class Particule {
	constructor(x,y) {
		this.pos = createVector(x,y);
		this.vel = createVector(random(-3,3),random(-3,3));
		this.history= [];
	}

	update() {
		this.pos.add(this.vel);
		this.history.push(this.pos);
		if (this.history.length > 200) this.history.splice(0,1);
	}

	edge() {
		if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
		if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;
	}

	show() {
		stroke(255);
		strokeWeight(3);
		point(this.pos.x,this.pos.y);
		stroke(200);
		for (let p of this.history) {
			point(p.x,p.y);
		}
	}
}