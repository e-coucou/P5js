//--------
// Classement des voitures de MiniP
//
const eC = {version: 'r01'};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwsXvdYCtmwqHCdd0MQkFky1w53M_SKns",
  authDomain: "rky-001.firebaseapp.com",
  databaseURL: "https://rky-001.firebaseio.com",
  projectId: "rky-001",
  storageBucket: "rky-001.appspot.com",
  messagingSenderId: "719166388179",
  appId: "1:719166388179:web:37a35693f330b7a31fe126"
};
const app = firebase.initializeApp(firebaseConfig);

// var database;
var dbVoitures;
let img = [37];
let sel = [];
let w,r;
let voitures = [];
let v_sorted = [];
let g,d;
let btnElo, btnComp;
let y0,y1;
let mouseVisible = false;
let btnVisible = 0;

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
	w = width/2;
	r = 1024/768;
	// r = img[0].width / img[0].height;
}

function preload() {
  // DataBase
  let database = firebase.database();
  dbVoitures  = database.ref('voitures');
 //  //Creation
	// for (let i=1;i<38;i++) {
	// 	let fichier = "../images/0"+((i>9)?'':'0')+i+".jpeg";
	// 	voitures[i-1] = new Voiture(i-1,fichier);
	// 	dbVoitures.push(voitures[i-1]);
	// 	img[i-1] = loadImage(fichier);
	// }
  //Lecture
  	dbVoitures.once('value').then ( (db) => {
  		let data = db.val();
  		let keys = Object.keys(data);

  		keys.forEach( k => {
  			// console.log(data[k]);
  			let fichier = data[k].fichier;
			voitures.push( new Voiture(data[k].idx,fichier,data[k].elo,data[k].comp,data[k].K, k) );
			img[data[k].idx] = loadImage(fichier);
  		})
	challenge();
	sort_elo(true);
	windowResized();
	frameRate(30);
	console.log('Chargement terminé ...');
  });
	// for (let i=1;i<38;i++) {
	// 	let fichier = "../images/0"+((i>9)?'':'0')+i+".jpeg";
	// 	voitures[i-1] = new Voiture(i-1,fichier);
	// 	img[i-1] = loadImage(fichier);
	// }
}

function init_sel() {
	for (let i =0; i< img.length;i++) {
		sel[i]=i;
	}
}
function setup() {
	createCanvas(windowWidth,windowHeight);
	// createCanvas(800,800);
	console.log("%c (ツ) # eCoucou "+eC.version+" # ","background: #f00; color: #fff");

	btnComp = createButton('Comp.',sort_comp);
	btnElo = createButton('Elo',sort_elo);

	frameRate(1);
}

function challenge() {
	init_sel();
	sort_comp(false); 
	v_sorted = v_sorted.slice(0,10);
	g = random(v_sorted).idx;
	// g = random(sel);
	sel.splice(g,1);
	d = random(sel);
}

function sort_elo(up = true) {
	v_sorted = voitures.slice();
	if (up) {
		v_sorted = v_sorted.sort( (a,b) => { return a.elo < b.elo; });
	} else {
		v_sorted = v_sorted.sort( (a,b) => { return a.elo > b.elo; });
	}
}

function sort_comp(up = true) {
	v_sorted = voitures.slice();
	if (up) {
		v_sorted = v_sorted.sort( (a,b) => { return a.comp < b.comp; });
	} else {
		v_sorted = v_sorted.sort( (a,b) => { return a.comp > b.comp; });
	}
}

function draw() {
	//image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
	background(0);

	//le images ...
	image(img[g],0,0,w,w/r-2,250,180,1024/2,768/2);
	image(img[d],w,0,w,w/r-2,250,180,1024/2,768/2);

	if (btnVisible === 1 || btnVisible === 2) {
		stroke(255);
		noFill();
		rect(btnVisible===1?0:w,0,w,w/r);
		stroke(0);
		fill(0,180);
		rect(btnVisible===1?w:0,0,w,w/r);
	}
	// les boutons de choix
	noStroke();
	y0=w/r+10;
	textAlign(CENTER);
	textSize(min(height,width)/20);
	fill(51, btnVisible==1 ? 255 : 100);
	rect(0,y0,width/3,width*0.1);
	fill(0,255,120,	btnVisible==1 ? 255 : 100);
	text('GAGNANT',width/6,y0+width*0.07);
	fill(51, btnVisible==2 ? 255 : 100);
	rect(2*width/3,y0,width/3,width*0.1);
	fill(0,255,120,	btnVisible==2 ? 255 : 100);
	text('GAGNANT',width*5/6,y0+width*0.07);
	fill(51, btnVisible==3 ? 255 : 100);
	rect(width/3,y0,width/3,width*0.1);
	fill(120,255,255, btnVisible==3 ? 255 : 100);
	text('EX EQUO',width/2,y0+width*0.07);
	// text(voitures[g].elo+' '+voitures[g].comp,10,w+20);
	// text(voitures[d].elo+' '+voitures[d].comp,4*w/3+10,w+20);
	y1 = y0 + width*0.1+10;
	for (let i=0; i<voitures.length;i++) {
		let y = floor(i/10);
		let x = i%10;
		image(img[v_sorted[i].idx],x*width/10,y1+y*width/r/10,width/10,width/r/10,250,180,1024/2,768/2);
	}
	if (mouseVisible) {
		fill(255);
		circle(mouseX,mouseY,20);
	}

}


function mousePressed() {
	let ok = false;
	if (mouseX<width/3 && mouseY > y0 && mouseY < y1) {
		let e = voitures[g].elo;
		voitures[g].update(1,voitures[d].elo);
		voitures[d].update(0,e);
		ok = true;
	} else if (mouseX>width*2/3 && mouseY > y0 && mouseY < y1) {
		let e = voitures[g].elo;
		voitures[g].update(0,voitures[d].elo);
		voitures[d].update(1,e);
		ok = true;
	} else if ( mouseX<width*2/3 && mouseX>width/3 && mouseY > y0 && mouseY < y1) {
		let e = voitures[g].elo;
		voitures[g].update(0.5,voitures[d].elo);
		voitures[d].update(0.5,e);
		ok = true;
	}
	if (ok) {
		let updates = {};
		updates['/'+voitures[g].key] = voitures[g];
		updates['/'+voitures[d].key] = voitures[d];
		dbVoitures.update(updates);
		challenge();
		sort_elo(true);
	}
}

function mouseMoved() {
	mouseVisible = false;
	btnVisible = 0;
	if (mouseX<width/3 && mouseY > y0 && mouseY < y1) {
		mouseVisible = true;
		btnVisible = 1;
	} else if (mouseX>width*2/3 && mouseY > y0 && mouseY < y1) {
		mouseVisible = true;
		btnVisible = 2;
	} else if ( mouseX<width*2/3 && mouseX>width/3 && mouseY > y0 && mouseY < y1) {
		mouseVisible = true;
		btnVisible = 3;
	}
}

function resetVoiture() {
	let updates = {};
	for (let i=0; i<voitures.length;i++) {
		voitures[i].elo = 1800;
		voitures[i].comp = 0;
		voitures[i].K = 40;
		updates['/'+voitures[i].key] = voitures[i];
	}
	dbVoitures.update(updates);
}
//------------------
class Voiture {
	constructor(i_,file_,elo_,comp_,K_,key_) {
		this.idx = i_;
		this.elo = elo_;
		this.comp = comp_;
		this. K = K_;
		this.fichier = file_;
		this.key = key_;
	}

	update(w_,e_) {
		//w = 0 perdu, 0.5 null, 1 gagné
		// e1 = e0 +  k x (W - p(D))
		// K = 40 ( moins de 30 challenges)
		// K = 20 sir e < 2400
		// K = 10 si e > 2400
		// D différence de e (e(m) - e(o))
		this.comp++;
		if (this.comp > 30 && this.K != 10) this.K = 20;
		let D = this.elo - e_;
		let pD = 1 / (1 + pow(10,-D/400));
		this.elo += this.K *(w_ - pD);
	}
}