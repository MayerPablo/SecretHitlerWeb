const {Random} = require("random-js");
var express = require('express');
    session = require('express-session');
    app = express();
    server = require('http').Server(app);
    path = require('path')
    sha256 = require('js-sha256');
    io = require('socket.io')(server, {});
    random = new Random(); 
    SOCKET_LIST = {};
    PLAYER_LIST = {};
    ROLE_LIST = {};
    remaining_roles = [];
    player_roles_5 = ['Liberal', 'Liberal', 'Liberal', 'Fascist', 'Hitler'];
    player_roles_6 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Hitler'];
    player_roles_7 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Fascist', 'Hitler'];
    player_roles_8 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Fascist', 'Hitler'];
    player_roles_9 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Fascist', 'Fascist', 'Hitler'];
    player_roles_10 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Fascist', 'Fascist', 'Hitler'];
    game_types = [[],[], player_roles_5, player_roles_6, player_roles_7, player_roles_8, player_roles_9, player_roles_10];
    roles = [];

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/game.html', function(req, res) {  
    res.sendFile(__dirname + '/client/game.html');
});

app.use('/client', express.static(__dirname + '/client'));
app.use(express.static(path.join(__dirname, 'public')));

server.listen(8080, '0.0.0.0');
prnt('Server started.');

io.sockets.on('connection', function(socket) {
    socket.id = sha256(random.integer(1, 1000).toString());
    SOCKET_LIST[socket.id] = socket;

    roles = game_types[Object.keys(SOCKET_LIST).length];
    prnt('New socket connection; socket ID: ' + socket.id);
    // Easter-Egg, Was a tool to test wheter the client and server can recieve/send messages from/to each other
    socket.emit('definetlyNoEasteregg', {msg:'You found the Easteregg!'});

    // Pairs Socket-ID's with player names
    socket.on('player_name', function(data){
        prnt(data.name);
        PLAYER_LIST[socket.id] = data.name
    });

    // Sends the players from the lobby to game.html
    socket.on('s_g', function() {
        for (var key in SOCKET_LIST) {
            var socket = SOCKET_LIST[key];
            setTimeout(doNothing, 100);
            socket.emit('start_game');
        }
    });

    // Role Logic
    socket.on('role_logic', function(data) {
        prnt(data.r);
        //roles = JSON.parse(data.r);
        // Get nativeMath random integer
        var random_value = random.integer(0, roles.length-1);
            player_role = roles[random_value];
        ROLE_LIST[socket.id] = player_role;
        const index = roles.indexOf(player_role);
        if (index > -1) {
            roles.splice(index, 1);
            remaining_roles = roles;
        }
        socket.emit("own_role", {pr:player_role});
        socket.emit("remaining_roles", {rr:stringify(remaining_roles)})
    });

    // Shows on console when Player disconnects and deletes the data associated with the Player
    socket.on('disconnect', function() {
        prnt('Old socket closed connection; socket ID:', socket.id);
        remaining_roles.push(ROLE_LIST[socket.id]);
        delete SOCKET_LIST[socket.id];
        for(var key in SOCKET_LIST) {
            var usocket = SOCKET_LIST[key];
            usocket.emit("remaining_roles", {rr:stringify(remaining_roles)});
        }
        delete ROLE_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });
});


// Updates Things every Second
setInterval(function() {
    // Defining the packet which gets send to the client
    var packet = [];
    count =  Object.keys(SOCKET_LIST).length;
    for(var key in SOCKET_LIST) {
        var socket = SOCKET_LIST[key];
        // Add all the relevant information into the packet
        packet.push({id:socket.id, count:count, players:PLAYER_LIST});
        // Printing out the packet and other info for debug (commented because it clutters the console)
        // prnt(packet);
        prnt(remaining_roles) 
        // Sending the packet
        socket.emit('update', packet);
    }
}, 1000);

// Encode Array to JSON formatted String
function stringify(array) {
    return JSON.stringify(array);
}

// Faster console output for debugging
function prnt(str) {
    console.log(str);
}

function doNothing() {
    nothing = 23297392*0.232323;
    prnt(nothing);
}
// (node:18884) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 hure listeners added to [Socket]. Use emitter.setMaxListeners() to increase limit
        //socket.on('role', function(data) {
        //    console.log(data.name);
        //})
//process.setMaxListeners(11);

        /*var issaarray = Array.isArray(remaining_roles);
        prnt(issaarray);*/