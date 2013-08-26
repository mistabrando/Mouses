var express = require('express'), 
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){

	socket.on('mymouseposition', function(data){
		console.log(data.x, data.y, data.id);
		socket.broadcast.emit('othermouseposition', {x : data.x, y : data.y, id: data.id});
	});
});
