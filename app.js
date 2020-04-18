const {Random} = require("random-js");
var express = require('express');
    app = express();
    server = require('http').Server(app);
    path = require('path')
    sha256 = require('js-sha256');
    io = require('socket.io')(server, {});
    random = new Random(); 
    SOCKET_LIST = {};
    PLAYER_LIST = {};

process.setMaxListeners(11);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/game.html', function(req, res) {  
    res.sendFile(__dirname + '/client/game.html');
});

app.use('/client', express.static(__dirname + '/client'));
app.use(express.static(path.join(__dirname, 'public')));

server.listen(8080, '0.0.0.0');
console.log('Server started.');

io.sockets.on('connection', function(socket) {
    socket.id = sha256(random.integer(1, 1000).toString());
    SOCKET_LIST[socket.id] = socket;

    console.log('New socket connection; socket ID:', socket.id);
    // Easter-Egg, Was a tool to test wheter the client and server can recieve/send messages from/to each other
    socket.emit('definetlyNoEasteregg', {msg:'You found the Easteregg!'});

    socket.on('player_name', function(data){
        console.log(data.name);
        PLAYER_LIST[socket.id] = data.name
    });

    socket.on('s_g', function() {
        for (var item in SOCKET_LIST) {
            var socket = SOCKET_LIST[item];
            socket.emit('start_game');
        }
    });

    socket.on('role', function() {
        console.log('HUREHUREHUREHURE');
    });

    // Shows on console when Player disconnects and deletes the data associated with the Player
    socket.on('disconnect', function(){
        console.log('Old socket closed connection; socket ID:', socket.id)
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });
});


// Updates Things every Second
setInterval(function(){
    // Get nativeMath random integer from random.org
    value = random.integer(1, 10);
    console.log(value);
    // Defining the packet which gets send to the client
    var packet = [];
        count =  Object.keys(SOCKET_LIST).length;
    for(var item in SOCKET_LIST) {
        var socket = SOCKET_LIST[item];
        // Add all the relevant information into the packet
        packet.push({id:socket.id, count:count, players:PLAYER_LIST});
        // Printing out the packet for debug
        console.log(packet);
        // Sending the packet
        socket.emit('update', packet);
        //socket.on('role', function(data) {
        //    console.log(data.name);
        //})
    }
}, 1000);

// (node:18884) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 hure listeners added to [Socket]. Use emitter.setMaxListeners() to increase limit
