document.getElementById('player_name').innerHTML = localStorage.name;
var role = localStorage.role;
var lib_art = ['lib_policy_one', 'lib_policy_two', 'lib_policy_three', 'lib_policy_four', 'lib_policy_five'];
var fas_art = ['fas_policy_one', 'fas_policy_two', 'fas_policy_three', 'fas_policy_four', 'fas_policy_five'];

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
    document.getElementById('lib_policy_one').style.width = "11vw";
}

var pos_x = ((document.getElementById('lpf').offsetLeft + (document.getElementById('lpf').clientWidth / 100)*9.8)).toString() + "px"; //4h
var pos_y = ((document.getElementById('lpf').offsetTop + (document.getElementById('lpf').clientHeight / 100)*27.65)).toString() + "px"; //4h

window.onload = function() {
    document.getElementById(lib_art[0]).style.transform = "translate( " + pos_x + ", " + pos_y +")";
}

window.onclick = function() {
    document.getElementById(lib_art[0]).style.display = "block";
    document.getElementById(lib_art[0]).style.transitionDuration = "1000ms";
    document.getElementById(lib_art[0]).style.opacity = 1;
};

window.onresize = function(){
    var pos_x = ((document.getElementById('lpf').offsetLeft + (document.getElementById('lpf').clientWidth / 100)*9.8)).toString() + "px"; //4h
    var pos_y = ((document.getElementById('lpf').offsetTop + (document.getElementById('lpf').clientHeight / 100)*27.65)).toString() + "px"; //4h
    document.getElementById(lib_art[0]).style.transform = "translate( " + pos_x + ", 0)";
    document.getElementById(lib_art[0]).style.transform = "translate( " + pos_x + ", " + pos_y +")";
}

//((document.getElementById('lpf').style.width.replace("vw", "")) / parseFloat(document.getElementById('lpf').style.width.replace("vw", "")))*8