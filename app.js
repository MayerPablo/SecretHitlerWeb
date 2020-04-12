var express = require('express');
    app = express();
    serv = require('http').Server(app);
    path = require('path')

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
app.use(express.static(path.join(__dirname, 'public')));

serv.listen(2000);
console.log('Server started.');

var SOCKET_LIST = {};
    io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    console.log('socket connection', socket.id);

    socket.on('button', function(){
        console.log('Button');
    });

    socket.emit('eegg', {msg:'You found the Easteregg!'});
});

