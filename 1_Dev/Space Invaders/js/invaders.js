class Invader {
	constructor(pos_,s_) {
		this.s = s_;
		this.pos = pos_;
		this.touche = false;
	}

	isTouche(pos_) {
		let d = p5.Vector.dist(pos_,this.pos);
		if (d<=this.s) {
			this.touche= true;
			canon.laser.out = true;
		}
		return this.touche;
	}

	update(vel_) {
		this.pos.add(vel_);
	}

	show() {
		fill(200);
		if (this.touche) fill(255,0,0);
		square(this.pos.x,this.pos.y,this.s);
	}
}


//-----------

class Ligne {
	constructor(l_,s_) {
		this.s = s_;
		this.x = 2;
		this.y = l_*this.s;
		this.vel = 5;
		this.invaders;
		this.maxX=0;
		this.minX=this.x ;
		
		let l=0;
		this.invaders = Array(8).fill().map(p => new Invader(createVector(this.x+l++*s_,this.y),floor(this.s*0.8)));

	}

	update() {
		this.maxX = this.invaders.reduce((acc,i)=> i.pos.x > acc ? i.pos.x:acc , 0) + this.s;
		this.minX = this.invaders.reduce((acc,i)=> i.pos.x < acc ? i.pos.x:acc , 10000);
		if (this.maxX<width && this.minX >= 1) {
			this.invaders.forEach(a => a.update(createVector(this.vel,0)));
		} else {
			this.vel *= -1;
			this.y += 3;
			this.invaders.forEach(a => a.update(createVector(this.vel,3)));
		}
	}

	show() {
		fill(200);
		stroke(255);
		this.invaders.forEach(a => a.show());
		// this.invaders.forEach(a => a.update());
	}
}