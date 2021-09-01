var streams = [];
let symbolSize = 10;


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);

	let x=0, y=0;
	for(let i=0; i<= width/symbolSize;i++) {
		let stream =new Stream();
		stream.genCar(x,random(-1000,0));
		streams.push(stream);
		x += symbolSize;
	}
	textSize(symbolSize);
}


function draw() {
	background(0,150);
	streams.forEach(function(stream) {
		stream.render();
	});
}


function Car(x,y,speed,first) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.value;
	this.first = first;
	this.change = round(random(2,20));

	this.setCar = function() {
		if(frameCount % this.change == 0) {
			this.value = String.fromCharCode(0x30A0 + round(random(0,96)));
		}
	}

	this.rain = function() {
		this.y = this.y >= height ? 0 :  this.y+this.speed;
	}
}



function Stream() {
	this.symbols = [];
	this.nbsymbols = round(random(5,50));
	this.speed = random(1,10);

	this.genCar = function(x,y) {
		let first = (round(random(0,4)) == 1);
		for(let i=0;i<this.nbsymbols;i++){
			symbol=new Car(x,y,this.speed,first);
			symbol.setCar();
			this.symbols.push(symbol);
			y -= symbolSize;
			first=false;
		}
	}

	this.render = function() {
		this.symbols.forEach(function(symbol) {
			if (symbol.first) {
				fill(180,255,180);
			} else {
				fill(0,255,70,random(50,200));
			}
			text(symbol.value,symbol.x,symbol.y);
			symbol.rain();
			symbol.setCar();
		} );
	}
}