var express = require('express');
    app = express();
    server = require('http').Server(app);
    path = require('path')
    sha256 = require('js-sha256');
    io = require('socket.io')(server, {});
    SOCKET_LIST = {};

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));
app.use(express.static(path.join(__dirname, 'public')));

server.listen(2000);
console.log('Server started.');

io.sockets.on('connection', function(socket) {
    socket.id = sha256(Math.random().toString());
    SOCKET_LIST[socket.id] = socket;

    console.log('New socket connection; socket ID:', socket.id);
    // Easter-Egg, Was a tool to test wheter the client and server can recieve/send messages from/to each other
    socket.emit('definetlyNoEasteregg', {msg:'You found the Easteregg!'});

    socket.on('player_name', function(data){
        console.log(data.name);
        socket.name = data.name;
    });

    // Shows on console when Player disconnects and deletes the data associated with the Player
    socket.on('disconnect', function(){
        console.log('Old socket closed connection; socket ID:', socket.id)
        delete SOCKET_LIST[socket.id];
    });
});

// Updates Things
setInterval(function(){
    var packet = [];
    for(var item in SOCKET_LIST) {
        var socket = SOCKET_LIST[item];
        packet.push({id:socket.id});
    }
    for (var item in SOCKET_LIST) {
        var socket = SOCKET_LIST[item];
        socket.emit('update', packet);
    }
}, 1000);
