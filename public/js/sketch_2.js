//-------------------------------
// Bataille Navale ...
//
const eC = {version: 'r02'};
var socket;

let myGrid = [];
let oGrid = [];
let ships = [];
let dim = 10; let w, offset=30;
let active = false;
let rdId = Math.floor(Math.random()*100000), oId;
let score = {m:0, o:0}, scoreP;
let etape = 0; // 0 cree , 1 joue, 2 terminé
let nb = 14;
let url;
let cell =0;
let current;
let config = [4,3,2,2,1,1,1], confId = 0;
let img = [4];
let xOff = 0, yOff=0;

function preload() {
	img[3] = loadImage('ship_4.png');
	img[2] = loadImage('ship_3.png');
	img[1] = loadImage('ship_2.png');
	img[0] = loadImage('ship_1.png');
}

function windowResized(){
	let ww,wh;
	if (windowWidth<1.4*windowHeight) {
		ww = windowWidth;
		wh = 1/2*ww;
		offset = floor(0.15*wh);
	} else {
		offset = floor(0.15*windowHeight);
		wh = floor(0.7*windowHeight);
		ww=2*wh;
	}
	resizeCanvas(ww,windowHeight); //wh + offset*2);
	w = floor(wh/dim);

	scoreP.style('font-size',offset/2+'px');
	scoreP.position(10,-offset/3);

	resizeGrid();
}
function iD(a,b) {
	return a+b*dim;
}

function resizeGrid() {
	for (let i=0;i<dim;i++) {
		for (let j=0;j<dim;j++) {
			myGrid[iD(i,j)].pos = createVector(i*w,j*w+offset);
			oGrid[iD(i,j)].pos = createVector(i*w+width/2,j*w+offset);
		}
	}

}
function setup() {
	// createCanvas(windowWidth,windowHeight);
	console.log("%c (ツ) # eCoucou "+eC.version+" # ","background: #f00; color: #fff");
	for (let i=0;i<dim;i++) {
		for (let j=0;j<dim;j++) {
			myGrid[iD(i,j)] = new Case(0,0,true);
			oGrid[iD(i,j)] = new Case(0,0,false);
		}
	}
	colorMode(HSB);
	scoreP = createP('Bataille Navale -> Score:');
	scoreP.style('color','white');

	windowResized();

	console.log('#',rdId);
	url = getURL();
	socket = io.connect(url);
	socket.on('question',questR);
	socket.on('reponse',responseR);

	socket.emit('question',{rId: rdId, cde: 'C', ack: false});

	current = new Ship(config[confId]);

}

function responseR(data) {
	if (!oGrid[data.id].open) {
		oGrid[data.id].open = true;
		oGrid[data.id].ship = data.a;
		if (data.a) score.m += 15;
		data = {id: rdId, cde:'I', score: score.m};
		socket.emit('question',data);
	}
}

function questR(data) {
	// console.log(data);
	switch (data.cde) {
		case 'I' :
			score.o = data.score; 
			break;
		case 'Q' :
			myGrid[data.id].open = true;
			let rep = {id: data.id, a: myGrid[data.id].ship, cde: 'R'};
			socket.emit('reponse',rep);
			active=true;
			break;
		case 'C' :
			if (!data.ack) {
				if( data.rId === oId) {
					socket.emit('question',{rId: rdId, cde: 'C', ack: true});
					if (data.rId < rdId) { active=true; } else { active = false;}
				} else {
					console.log('not good id');
					socket.emit('question',{rId: rdId, cde: 'C', ack: false});
				}
			} else {
				if( data.rId === oId) {
					console.log('all good');
					// socket.emit('question',{rId: rdId, cde: 'C', ack: true});
					if (data.rId < rdId) { active=true; } else { active = false;}
				} else {
					console.log('ack ok but not good Id');
					socket.emit('question',{rId: rdId, cde: 'C', ack: false});
				}
			}
			oId = data.rId;
			break;
		}
}
function mouseMoved() {
	if (mouseX<w*dim && etape ===0 && mouseY>offset && mouseY< offset+dim*w) {
		let i = floor((mouseX) / w);
		let j = floor((mouseY-offset) /w );
		current.update(i,j);
		current.show();
	}
}

function keyPressed() {
	if (key === ' ') {
		current.unShow();
		if (current.dir == 'V') {
			current.dir = 'H'; 
		} else {
			current.dir = 'V';
		}
	}
}
function mousePressed() {
	if (mouseX>width/2 && active && etape===1 && mouseY>offset && mouseY< height-offset) {
		let i = floor((mouseX - width/2) / w);
		let j = floor((mouseY-offset) /w );
		let data = { id: iD(i,j), cde: 'Q' };
		socket.emit('question',data);
		active=false;
	}
	if (mouseX<w*dim && etape ===0 && mouseY>offset && mouseY< offset+dim*w) {
		current.unShow();
		if (current.cells.length === 1) current.dir = 'H';
		for (let i=0; i<current.cells.length;i++) {
			let c = current.cells[i];
			myGrid[c].ship = true;
			myGrid[c].n_Img = current.cells.length-1;
			myGrid[c].idx = i;
			myGrid[c].dir = current.dir;
		}
		current.cells= [];
		confId++;
		current.size = config[confId];
		if (confId>=config.length) etape = 1;
	}
	if (etape === 0 && mouseY>height-offset) {
		console.log('ici');
	}
}

function draw() {
	background(0);
	for (let c of myGrid) {
		c.updtState();
		c.show();
	}
	for (let c of oGrid) {
		c.updtState();
		c.show();
	}
	// ligne séparatrice au milieu
	stroke(340,255,255);strokeWeight(3);
	line(w*dim+1,offset,w*dim+1,offset+dim*w);
	// a qui de jouer ?
	noStroke();
	fill((active && etape===1)?150:355,255,255);
	circle(width*11/12,offset/2,offset/3);
	// affiche le score
	scoreP.html('Bataille Navale -> Score: <b>'+score.m+'</b>    vs  <i>'+score.o+'</i>');
	xOff += 0.001;
}

//--------------
class Case {
	constructor(x_,y_,me_) {
		this.pos = createVector(x_,y_);
		this.state = 0;
		this.me = me_;
		this.open = false;
		this.ship = false; //this.me?(random()>0.9):false;
		this.select = false;
		this.n_Img = 0;
		this.idx = 0;
		this.dir = '';
 
		this.updtState();
	}

	updtState() {
		this.state = 0;
		if (this.me) this.state+= 0x010;
		if (this.open) this.state += 0x001;

	}

	show() {
		noStroke();
		switch (this.state) {
			case 0x10:fill(200);break;
			case 0 : fill(91); break; // caché- other
			case 0x11: fill(180,120,120); break;
			case 1 : fill(60,255,255); break; // open vide - other
			case 0x12: fill(0,0,0); break;
			case 2 : fill(0,255,255); break; // open ship - other
		}
		if (this.select) fill(330,255,255);
		square(this.pos.x,this.pos.y,w-1);
		if (this.ship) {
			imageMode(CENTER);
			push();
			translate(this.pos.x+w/2,this.pos.y+w/2);
			if (this.dir === 'V') {
				rotate(PI/2);
			}
			if (this.open) { fill(0,255,255);
			} else {
				fill(200+40*noise(xOff,yOff),30*noise(xOff)+20,255,2);
			}
			circle(0,0,w); //*(0.3+noise(xOff)));
			image(img[this.n_Img],0, 0, w, w, this.idx*50, 0 ,50,50); //, [sWidth], [sHeight])
			// circle(this.pos.x+w/2,this.pos.y+w/2,2*w/3);
			pop();
			yOff += 0.001;
		}
	}
}


//--------------
class Ship {
	constructor(s_) {
		this.active = false;
		this.size = s_;
		this.dir = 'H';

		this.cell = iD(0,0);
		this.cells = [this.size];
	}

	update(c_,l_) {
		let newCell = iD(c_,l_);
		if (newCell != this.cell) {
			this.unShow();
			this.cell = newCell;
		}
		if (this.dir == 'H') {
			if (c_ > dim-this.size) {
				c_ = dim-this.size;
			}
			for(let i=0; i<this.size;i++) {
				this.cells[i]=iD(c_+i,l_);
			}
		} else if (this.dir == 'V') {
			if (l_ > dim-this.size) {
				l_ = dim-this.size;
			}
			for(let i=0; i<this.size;i++) {
				this.cells[i]=iD(c_,l_+i);
			}
		}
	}

	show() {
		for (let c of this.cells) {
			myGrid[c].select = true;
		}
	}
	unShow() {
		for (let c of this.cells) {
			myGrid[c].select = false;
		}
	}
}