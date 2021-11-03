//---------------
// SPACE INVADERS --
const eC = {version: 'r00'};

let lignes = [];
let inv_s;
let bunkers;
let canon;
let elements = [];
let level = -1;
let count=0;
let soucoupe = null;

function windowsResized(){
	resizeCanvas(600,400);
	// resizeCanvas(windowWidth,windowHeight);
	inv_s = width/16;
}
function new_level(){
	let l=1;
	lignes = Array(5).fill().map(p => new Ligne(l++,inv_s));
	l = 1;
	bunkers = Array(4).fill().map(p => new Bunker(createVector(width/9*(-1+2*l++),height*0.7)))
	ligne = 0;
	count = 8 * 5;
	level++;
}

function setup() {
	// createCanvas(windowWidth,windowHeight);
	createCanvas(600,400);
	console.log("%c (ツ) # eCoucou "+eC.version+" # ","background: #f00; color: #fff");
	colorMode(HSB);
	windowsResized();
	pixelDensity(1);
	canon = new Canon();
	// frameRate(5);
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		canon.move(-1);
	} else if ( keyCode === RIGHT_ARROW) {
		canon.move(+1);
	} else if (key === ' ') {
		canon.tir();
	}
}

function keyReleased() {
	canon.move(0);
}

function draw() {
	background(0);
	if (count===0) new_level();
	let max = lignes.reduce( (acc, v) => { let m = v.getMax(); return m > acc ? m : acc; } , 0);
	let min = lignes.reduce( (acc, v) => { let m = v.getMin(); return m < acc ? m : acc; } , Infinity);
	lignes.forEach(  l => { 
		l.setMax(max);
		l.setMin(min);
		l.update();
		l.show();
	});

	// les bunkers;
	bunkers.forEach(b => b.show());

	// le canon;
	canon.update();
	canon.show();

	// la soucoupe
	if (soucoupe === null) {
		if  (random()>0.998) {
			soucoupe = new Soucoupe(inv_s);
		}
	} else {
		soucoupe.update();
		soucoupe.show();
		if ( soucoupe.isEdges() ) soucoupe =null;
	}
	
	// le Tir
	if (canon.isTir && canon.laser.pos.y > height*0.7) {

		console.log('bunker');
		loadPixels();
		let x=canon.laser.pos.x;
		let y = canon.laser.pos.y+ canon.laser.vel.y;
		let id = (x + y * width )*4;
		if (pixels[id] == 255) {
			canon.isTir = false;
			canon.laser = [];
			for (let i=0;i<100;i++) {
				let a = random(-5,5);
				let b = random(-15,15);
				stroke(0);
				id = (x+a + (y+b)*width)*4;
				// point(x+a,y+b);
				pixels[id++] = 96;
				pixels[id++] = 0;
				pixels[id++] = 0;
				pixels[id++] = 266;
			}
		}
		updatePixels();
	}

	if ( soucoupe !== null && canon.isTir) {
		if( soucoupe.isTouche(canon.laser.pos) ) soucoupe = null;
	}
	if (canon.isTir) {
		lignes[ligne].invaders.forEach(i => {
			if (!canon.laser.out) {
				(i.isTouche(canon.laser.pos)) ;
			}
		});
		lignes[ligne].invaders = lignes[ligne].invaders.filter(i => !i.touche );
	}

	// les explosions
	if (elements.length >0) {
		// console.log(elements);
		elements.forEach( e => {
			e.update();
			e.isAlive();
			e.show();
		});
		elements = elements.filter(e => e.alive===true);
	}

	ligne = (ligne + 1) % 5;
}
