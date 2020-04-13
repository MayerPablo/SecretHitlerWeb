var socket = io();
var player_name = '';
document.getElementById('play_button').onclick = function(){
    player_name = document.getElementById("input_name").value;
    if(player_name == ''){
        document.getElementById('display_name').style.color = 'rgb(139, 9, 9)'
        document.getElementById("display_name").innerHTML = 'Enter a name';
        document.getElementById('input_name').style.borderColor = 'rgb(139, 9, 9)'
    } else if(player_name == 'Ziddmaster'){   
        document.getElementById('display_name').style.color = 'rgb(139, 9, 9)'
        document.getElementById("display_name").innerHTML = "The name " + player_name + " is banned";
        document.getElementById('input_name').style.borderColor = 'rgb(139, 9, 9)'
    } else{
    document.getElementById('display_name').style.color = '#5A9BA6'
    document.getElementById('input_name').style.borderColor = '#5A9BA6'
    document.getElementById("display_name").innerHTML = player_name;
    localStorage.setItem("name", player_name);
    socket.emit(player_name);
    location.href='client/game.html'
    }
}
socket.on('eegg', function(data){
    console.log(data.msg);
});
