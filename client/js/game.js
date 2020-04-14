document.getElementById('player_name').innerHTML = localStorage.name;
var role = localStorage.role;

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

window.onclick = function() {
    document.getElementById('lib_policy_one').style.display = "block";
    document.getElementById('lib_policy_one').style.transitionDuration = "400ms";
    console.log(document.getElementById('lpf').clientWidth);
    var pos_x = ((document.getElementById('lpf').offsetLeft + (document.getElementById('lpf').clientWidth / 100)*9.8)).toString() + "px"; //4h
    var pos_y = ((document.getElementById('lpf').offsetTop + (document.getElementById('lpf').clientHeight / 100)*27.6)).toString() + "px"; //4h
    console.log("translate( " + pos_x + ", " + pos_y + ")");
    document.getElementById('lib_policy_one').style.transform = "translate( " + pos_x + ", " + pos_y + ")";
    document.getElementById('lib_policy_one').style.opacity = 1;

};

//((document.getElementById('lpf').style.width.replace("vw", "")) / parseFloat(document.getElementById('lpf').style.width.replace("vw", "")))*8