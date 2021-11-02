//---------------
// SPACE INVADERS --
const eC = {version: 'r00'};

let lignes;
let inv_s;
let bunkers;
let canon;

function windowsResized(){
	resizeCanvas(600,400);
	// resizeCanvas(windowWidth,windowHeight);
	inv_s = width/16;
}
function setup() {
	// createCanvas(windowWidth,windowHeight);
	createCanvas(600,400);
	console.log("%c (ツ) # eCoucou "+eC.version+" # ","background: #f00; color: #fff");
	windowsResized();
	let l=1;
	lignes = Array(5).fill().map(p => new Ligne(l++,inv_s));

	l = 1;
	bunkers = Array(4).fill().map(p => new Bunker(createVector(width/9*(-1+2*l++),height*0.7)))

	canon = new Canon();

	ligne = 0;
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
	background(51);
	lignes.forEach(l => l.show());
	lignes.forEach(l => l.update());

	// les bunkers;
	bunkers.forEach(b => b.show());

	// le canon;
	canon.update();
	canon.show();

	// le Tir
	if (canon.isTir) {
		// console.log(canon.laser.pos);
		lignes[ligne].invaders.forEach(i => {
			if (!canon.laser.out) {
				(i.isTouche(canon.laser.pos)) ;
			}
		});
		lignes[ligne].invaders = lignes[ligne].invaders.filter(i => !i.touche );
	}
	ligne = (ligne + 1) % 5;
}
