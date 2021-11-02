class Canon {
	constructor() {
		this.x = width/2;
		this.y = height * 0.9;
		this.r = 10;
		this.acc= 5;
		this.vel = 0;
		this.isTir = false;
		this.laser;
	}

	move(dir_) {
		this.vel = dir_ * this.acc;
	}

	update() {
		this.x += this.vel;
		if (this.x > width - this.r ) this.x = width - this.r;
		if (this.x < this.r ) this.x = this.r;
		if (this.isTir) {
			this.laser.update();
			if (this.laser.edges() || this.laser.out) {
				this.laser = [];
				this.isTir = false;
			}
		}
	}

	tir() {
		if (!this.isTir) {
			this.isTir = true;
			this.laser = new Laser(createVector(this.x,this.y-20));
		}
	}

	show() {
		stroke(255)
		beginShape();
		vertex(this.x,this.y);
		vertex(this.x+this.r,this.y+20);
		vertex(this.x-this.r,this.y+20);
		endShape(CLOSE);
		if (this.isTir) this.laser.show();
	}
}

//---------
class Laser {
	constructor(pos_) {
		this.pos = pos_;
		this.vel = createVector(0,-5);
		this.out = false;
	}

	update() {
		this.pos.add(this.vel);
	}

	edges() {
		return (this.pos.y < 0);
	}

	show() {
		stroke(255,0,0);
		strokeWeight(3);
		line(this.pos.x,this.pos.y,this.pos.x,this.pos.y-5);
	}
}




//---------

class Bunker {
	constructor(pos_) {
		this.pos = pos_;
		this.w = width /9;
	}

	show() {
		fill(255);
		rect(this.pos.x, this.pos.y,this.w,this.w);
	}
}