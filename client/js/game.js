document.getElementById('player_name').innerHTML = localStorage.name;
var role = localStorage.role;
if(role == 'liberal') {
    document.getElementById('player_role').innerHTML = "Liberal";
} else if(role == 'fascist') {
    document.getElementById('player_role').innerHTML = "Fascist";
} else {
    document.getElementById('player_role').innerHTML = "Hitler";
}

if(window.screen.width <= 1300) {
    console.log(window.screen.width);
    document.getElementById('lpf').style.width = "95%";
    document.getElementById('fpf').style.width = "95%";
    document.getElementById('lib_policy_one').style.width= "11vw";
}

window.onclick = function() {
    document.getElementById('lib_policy_one').style.display = "block";
    document.getElementById('lib_policy_one').style.transitionDuration = "400ms";
    console.log(document.getElementById('lpf').offsetLeft);
    var pos_x = document.getElementById('lpf').offsetLeft.toString() + "px";
    var pos_y = parseFloat(document.getElementById('lpf').style.width.replace("%", "")/(25/3.5)).toString() + "em";
    console.log("translate( " + pos_x + ", " + pos_y + ")");
    document.getElementById('lib_policy_one').style.transform = "translate( " + pos_x + ", " + pos_y + ")";
    document.getElementById('lib_policy_one').style.opacity = 1;

};
