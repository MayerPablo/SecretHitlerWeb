document.getElementById('player_name').innerHTML = localStorage.name;
if(localStorage.role == 0) {
    document.getElementById('player_role').innerHTML = "Liberal";
} else if(localStorage.role == 'fascist') {
    document.getElementById('player_role').innerHTML = "Fascist";
} else {
    document.getElementById('player_role').innerHTML = "Hitler";
}
window.onclick = function() {
    document.getElementById('lib_policy_one').style.display = "block";
    document.getElementById('lib_policy_one').style.transitionDuration = "400ms";
    document.getElementById('lib_policy_one').style.transform = "translate(0vw, 12.6vw)";
    document.getElementById('lib_policy_one').style.opacity = 1;

};
