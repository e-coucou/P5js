var express = require('express');

var app = express();
var cors = require('cors');

var server = app.listen(3000);

app.use(express.static('public'));
app.use(cors({origin: '*'}));

console.log('Mon serveur est en marche ...');

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection',newConnexion);

function newConnexion(socket) {
	console.log('Connexion : '+socket.id);

	socket.on('question', mouseMSG);
	socket.on('reponse', responseMSG);
	socket.on('mouse', drawMSG);

	function mouseMSG (data) {
		// body...
		// console.log(data);
		socket.broadcast.emit('question',data);
	}
	function drawMSG (data) {
		// body...
		socket.broadcast.emit('mouse',data);
	}
	function responseMSG (data) {
		// body...
		// console.log(data);
		socket.broadcast.emit('reponse',data);
	}
}