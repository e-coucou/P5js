let ship;
let asteroides = [];
let lasers = [];
let score=0;
let scoreA;
let life = 100;

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		ship.setRotation(-0.05);
	} else if (keyCode === RIGHT_ARROW) {
		ship.setRotation(0.05);
	} else if (keyCode === UP_ARROW) {
		ship.setBoost(true);
	} else if (keyCode === DOWN_ARROW) {
		ship.setBoost(false);
	} else if (key == ' ') {
		lasers.push(new Laser(ship.pos,ship.direction));
	}
}

function keyReleased() {
	ship.setRotation(0);
	ship.setBoost(false);
}

function setup() {
	createCanvas(800,600);
	ship = new Ship();
	for (let i = 0; i< 5; i++) {
		asteroides.push(new Asteroide());
	}
	scoreA = new Afficheur(width-55,20,14,4);
}

function draw() {
	background(0);

	// update lasrs
	for (let i=lasers.length-1;i>=0;i--) {
		lasers[i].update();
		lasers[i].show();
		if (lasers[i].isEdges()) {
			lasers.splice(i,1);
		} else {
			for(let j=asteroides.length-1;j>=0;j--) {
				if (lasers[i].isHit(asteroides[j])) {
					lasers.splice(i,1);
					if (asteroides[j].rI > 10) {
						let newA = asteroides[j].breakUP();
						asteroides = asteroides.concat(newA);
					}
					score += 35-floor(asteroides[j].rI);
					asteroides.splice(j,1);
					break;
				}
			}
		}
	}
	// update Ship
	ship.show();
	ship.edges();
	ship.update();
	ship.turn();
	for (let i=0;i<asteroides.length;i++) {
		if (ship.isHit(asteroides[i])) {
			console.log(ship.life);
		}
	}
	//update asteroides
	for (a of asteroides) {
		a.show();
		a.update();
		a.edges(); 
	}
	scoreA.affiche(score);
	if (asteroides.length === 0 && lasers.length === 0) {
		console.log('WINNNNNNNNNNER');
		noLoop();
	}
}