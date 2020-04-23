var socket = io();
    PLAYER_NAMES = {};
    p_c = 0;
    player_name = '';
    player_roles_5 = ['Liberal', 'Liberal', 'Liberal', 'Fascist', 'Hitler'];
    player_roles_6 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Hitler'];
    player_roles_7 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Fascist', 'Hitler'];
    player_roles_8 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Fascist', 'Hitler'];
    player_roles_9 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Fascist', 'Fascist', 'Hitler'];
    player_roles_10 = ['Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Fascist', 'Fascist', 'Hitler'];
document.getElementById('name_button').onclick = function() {
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
        socket.emit('player_name', {name:player_name});
        document.getElementById('display_name').style.color = '#5A9BA6';
        document.getElementById('input_name').style.borderColor = '#5A9BA6';
        localStorage.setItem("name", player_name);
        document.getElementById('waiting_players').innerHTML = "Currently Waiting: ";
    }
}

document.getElementById('play_button').onclick = function() {
    if(p_c >= 1){
        socket.emit('s_g');
    }
}

socket.on('start_game', function(){
    location.href='/game.html';
});

socket.on('definetlyNoEasteregg', function(data){
    console.log(data.msg);
});

socket.on('update', function(data){     
    console.log(data[0].count);
    PLAYER_NAMES = data[0].players;
    p_c = Object.keys(PLAYER_NAMES).length
    id = data[0].id
    document.getElementById('waiting_players').innerHTML = "Currently Waiting: ";
    document.getElementById("display_name").innerHTML = "Your Name is: " + player_name + " Waiting for at least " + (5-p_c).toString() + " other Players!";
    if (5-p_c <= 0) {
        document.getElementById("display_name").innerHTML = "Your Name is: " + player_name + " | Waiting for no other players!";
    }
    for (var item in PLAYER_NAMES) {
        document.getElementById('waiting_players').style.display = "block";
        document.getElementById('waiting_players').innerHTML = document.getElementById('waiting_players').innerHTML + " | " + PLAYER_NAMES[item]
    }
    switch (p_c) {
        case 2:
            document.getElementById('play_button').style.display = "block";
            document.getElementById('play_button').innerHTML = "Play with 5";
            localStorage.setItem("roles", stringify(player_roles_5));
            break;
        case 6:
            document.getElementById('play_button').innerHTML = "Play with 6";
            localStorage.setItem("roles", stringify(player_roles_6));
            break;
        case 7:
            document.getElementById('play_button').innerHTML = "Play with 7";
            localStorage.setItem("roles", stringify(player_roles_7));
            break;
        case 8:
            document.getElementById('play_button').innerHTML = "Play with 8";
            localStorage.setItem("roles", stringify(player_roles_8));
            break;
        case 9:
            document.getElementById('play_button').innerHTML = "Play with 9";
            localStorage.setItem("roles", stringify(player_roles_9));
            break;
        case 10:
            document.getElementById('play_button').innerHTML = "Play with 10";
            localStorage.setItem("roles", stringify(player_roles_10));
            break;
        default:
            document.getElementById('play_button').innerHTML = "Playercount not supported";
            //document.getElementById('play_button').style.display = "none";
            break;
    }
});

function stringify(array) {
    return JSON.stringify(array);
}

function prnt(str) {
    console.log(str);
}