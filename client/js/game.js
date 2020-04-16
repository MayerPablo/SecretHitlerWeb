var socket = io();

name = localStorage.name
document.getElementById('player_name').innerHTML = name;
//socket.emit('role', name)

var role = localStorage.role;
    lib_art = ['lib_policy_one', 'lib_policy_two', 'lib_policy_three']; //, 'lib_policy_two', 'lib_policy_three', 'lib_policy_four', 'lib_policy_five';
    fas_art = ['fas_policy_one']; //, 'fas_policy_two', 'fas_policy_three', 'fas_policy_four', 'fas_policy_five'

if(role == 'liberal') {
    document.getElementById('player_role').innerHTML = "Liberal";
} else if(role == 'fascist') {
    document.getElementById('player_role').innerHTML = "Fascist";
} else {
    document.getElementById('player_role').innerHTML = "Hitler";
}

document.getElementById('lpf').style.width = "50vw";
document.getElementById('fpf').style.width = "50vw"; 

if(window.screen.width <= 1300) {
    console.log(window.screen.width);
    document.getElementById('lpf').style.width = "95vw";
    document.getElementById('fpf').style.width = "95vw";
    document.getElementsByClassName('lib_policies').style.width = "11vw";
}

var pos_x = (document.getElementById('lpf').offsetLeft + (document.getElementById('lpf').clientWidth / 100)*9.8); //4h
var pos_y = (document.getElementById('lpf').offsetTop + (document.getElementById('lpf').clientHeight / 100)*27.65); //4h

window.onload = function() {
    for (var index = 0; index < lib_art.length; index++) {
    document.getElementById(lib_art[index]).style.transform = "translate( " + (pos_x + document.getElementById('lpf').clientWidth*index/7.3).toString() + "px" + ", " + (pos_y).toString() + "px" +")";
    }
}

window.onclick = function() {
    for (var index = 0; index < lib_art.length; index++) {
    document.getElementById(lib_art[index]).style.display = "block";
    document.getElementById(lib_art[index]).style.transitionDuration = "1000ms";
    document.getElementById(lib_art[index]).style.opacity = 1;
    }
};

window.onresize = function(){
    var pos_x = (document.getElementById('lpf').offsetLeft + (document.getElementById('lpf').clientWidth / 100)*9.8); //4h
    var pos_y = (document.getElementById('lpf').offsetTop + (document.getElementById('lpf').clientHeight / 100)*27.65); //4h
    //document.getElementById(lib_art[0]).style.transform = "translate( " + pos_x + ", 0)";
    //document.getElementById(lib_art[0]).style.transform = "translate( " + pos_x + ", " + pos_y +")";
    for (var index = 0; index < lib_art.length; index++) {
        document.getElementById(lib_art[index]).style.transitionDuration = "0ms";
        document.getElementById(lib_art[index]).style.transform = "translate( " + (pos_x + document.getElementById('lpf').clientWidth*index/7.3).toString() + "px" + ", 0)";
        document.getElementById(lib_art[index]).style.transform = "translate( " + (pos_x + document.getElementById('lpf').clientWidth*index/7.3).toString() + "px" + ", " + (pos_y).toString() + "px" +")";
    }
}


//((document.getElementById('lpf').style.width.replace("vw", "")) / parseFloat(document.getElementById('lpf').style.width.replace("vw", "")))*8
//process.setMaxListeners(0);
//socket.emit('role', name)