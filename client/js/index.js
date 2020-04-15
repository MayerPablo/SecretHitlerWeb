var socket = io();
var player_name = '';
var player_roles = ['liberal', 'fascist', 'hitler'];
document.getElementById('play_button').onclick = function() {
    player_name = document.getElementById("input_name").value;
    if(player_name == '') {
        document.getElementById('display_name').style.color = 'rgb(139, 9, 9)'
        document.getElementById("display_name").innerHTML = 'Enter a name';
        document.getElementById('input_name').style.borderColor = 'rgb(139, 9, 9)'
    } else if(player_name == 'Ziddmaster') {   
        document.getElementById('display_name').style.color = 'rgb(139, 9, 9)'
        document.getElementById("display_name").innerHTML = "The name " + player_name + " is banned";
        document.getElementById('input_name').style.borderColor = 'rgb(139, 9, 9)'
    } else {
    document.getElementById('display_name').style.color = '#5A9BA6'
    document.getElementById('input_name').style.borderColor = '#5A9BA6'
    localStorage.setItem("name", player_name);
    localStorage.setItem("role", player_roles[0]);
    socket.emit('player_data', {name:player_name, role:player_roles[0]});
    location.href='client/game.html'
    }
}

socket.on('definetlyNoEasteregg', function(data){
    console.log(data.msg);
});

socket.on('update', function(data){     
    console.log(data[0].id);
});
