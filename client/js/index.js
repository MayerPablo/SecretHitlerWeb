var socket = io();
    PLAYER_NAMES = {};
    p_c = 0;
    player_name = '';
    player_roles = ['liberal', 'fascist', 'hitler'];
document.getElementById('play_button').onclick = function() {
    player_name = document.getElementById("input_name").value;
    if(player_name == '') {
        document.getElementById('display_name').style.color = 'rgb(139, 9, 9)';
        document.getElementById("display_name").innerHTML = 'Enter a name';
        document.getElementById('input_name').style.borderColor = 'rgb(139, 9, 9)';
    } else if(player_name == 'Ziddmaster') {   
        document.getElementById('display_name').style.color = 'rgb(139, 9, 9)';
        document.getElementById("display_name").innerHTML = "The name " + player_name + " is banned";
        document.getElementById('input_name').style.borderColor = 'rgb(139, 9, 9)';
    } else {
        socket.emit('player_data', {name:player_name, role:player_roles[0]});
        document.getElementById("display_name").innerHTML = "Your Name is: " + player_name + " Waiting for " + (5-p_c).toString() + " other Players!";
        document.getElementById('display_name').style.color = '#5A9BA6';
        document.getElementById('input_name').style.borderColor = '#5A9BA6';
        //PLAYER_NAMES[p_c] = player_name;
        localStorage.setItem("name", player_name);
        localStorage.setItem("role", player_roles[0]);
        document.getElementById('waiting_players').innerHTML = "Currently Waiting: ";
        for (var item in PLAYER_NAMES) {
            document.getElementById('waiting_players').style.display = "block";
            document.getElementById('waiting_players').innerHTML = document.getElementById('waiting_players').innerHTML + " " + PLAYER_NAMES[item]
        }
        if(p_c >= 5){
            location.href='/game.html';
        }
    }
}

socket.on('definetlyNoEasteregg', function(data){
    console.log(data.msg);
});

socket.on('update', function(data){     
    console.log(data[0].count);
    PLAYER_NAMES = data[0].players;
    p_c = data[0].count;
    id = data[0].id
});
