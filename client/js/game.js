var socket = io();
    name = localStorage.name;
    //roles = localStorage.roles;
    own_role = "DEFAULT";
    lib_art = ['lib_policy_one', 'lib_policy_two', 'lib_policy_three', 'lib_policy_four', 'lib_policy_five']; 
    fas_art = ['fas_policy_one', 'fas_policy_two', 'fas_policy_three', 'fas_policy_four', 'fas_policy_five', 'fas_policy_six'];

document.getElementById('player_name').innerHTML = name;
console.log(localStorage.roles);

socket.emit('role', {r:localStorage.roles});
socket.on('own_role', function(data) {
    own_role = data.pr;
    localStorage.roles = data.rr;
    prnt(localStorage.roles);
    if(own_role == 'Liberal') {
        document.getElementById('player_role').innerHTML = "Liberal";
    } else if(own_role == 'Fascist') {
        document.getElementById('player_role').innerHTML = "Fascist";
    } else if(own_role == 'Hitler'){
        document.getElementById('player_role').innerHTML = "Hitler";
    } else {
        document.getElementById('player_role').innerHTML = "ERROR";
    }
});

socket.on("reset_roles", function(){
    localStorage.roles.push(own_role);
});

document.getElementById('lpf').style.width = "50vw";
document.getElementById('fpf').style.width = "50vw"; 


window.onload = function() {
    // Responsiveness on load
    var lib_pos_x = (document.getElementById('lpf').offsetLeft + (document.getElementById('lpf').clientWidth / 100)*15.25); //4h
        lib_pos_y = (document.getElementById('lpf').offsetTop + (document.getElementById('lpf').clientHeight / 100)*23.4); //4h
        fas_pos_x = (document.getElementById('fpf').offsetLeft + (document.getElementById('fpf').clientWidth / 100)*8.3); //4h
        fas_pos_y = (document.getElementById('fpf').offsetTop + (document.getElementById('fpf').clientHeight / 100)*25.1); //4h
    for (var index = 0; index < lib_art.length; index++) {
        document.getElementById(lib_art[index]).style.transform = "translate( " + (lib_pos_x + document.getElementById('lpf').clientWidth*index/6.95).toString() + "px" + ", " + (lib_pos_y).toString() + "px" +")";
    }
    for (var index = 0; index < fas_art.length; index++) {
        document.getElementById(fas_art[index]).style.transform = "translate( " + (fas_pos_x + document.getElementById('lpf').clientWidth*index/6.98).toString() + "px" + ", " + (fas_pos_y).toString() + "px" +")";
    }
}

window.onclick = function() {
    for (var index = 0; index < lib_art.length; index++) {
        document.getElementById(lib_art[index]).style.display = "block";
        document.getElementById(lib_art[index]).style.transitionDuration = "1000ms";
        document.getElementById(lib_art[index]).style.opacity = 1;
    }

    for (var index = 0; index < fas_art.length; index++) {
        document.getElementById(fas_art[index]).style.display = "block";
        document.getElementById(fas_art[index]).style.transitionDuration = "1000ms";
        document.getElementById(fas_art[index]).style.opacity = 1;
    }
};

// Responsiveness on resize
window.onresize = function(){
    var lib_pos_x = (document.getElementById('lpf').offsetLeft + (document.getElementById('lpf').clientWidth / 100)*15.25); //4h
        lib_pos_y = (document.getElementById('lpf').offsetTop + (document.getElementById('lpf').clientHeight / 100)*23.4); //4h
        fas_pos_x = (document.getElementById('fpf').offsetLeft + (document.getElementById('fpf').clientWidth / 100)*8.3); //4h
        fas_pos_y = (document.getElementById('fpf').offsetTop + (document.getElementById('fpf').clientHeight / 100)*25.2); //4h
    for (var index = 0; index < lib_art.length; index++) {
        document.getElementById(lib_art[index]).style.transitionDuration = "0ms";
        document.getElementById(lib_art[index]).style.transform = "translate( " + (lib_pos_x + document.getElementById('lpf').clientWidth*index/6.95).toString() + "px" + ", 0)";
        document.getElementById(lib_art[index]).style.transform = "translate( " + (lib_pos_x + document.getElementById('lpf').clientWidth*index/6.95).toString() + "px" + ", " + (lib_pos_y).toString() + "px" +")";
    }
    for (var index = 0; index < fas_art.length; index++) {
        document.getElementById(fas_art[index]).style.transitionDuration = "0ms";
        document.getElementById(fas_art[index]).style.transform = "translate( " + (fas_pos_x + document.getElementById('fpf').clientWidth*index/6.98).toString() + "px" + ", 0)";
        document.getElementById(fas_art[index]).style.transform = "translate( " + (fas_pos_x + document.getElementById('fpf').clientWidth*index/6.98).toString() + "px" + ", " + (fas_pos_y).toString() + "px" +")";
    }
}

function prnt(str) {
    console.log(str);
}
//old stuff


//document.getElementById(lib_art[0]).style.transform = "translate( " + pos_x + ", 0)";
//document.getElementById(lib_art[0]).style.transform = "translate( " + pos_x + ", " + pos_y +")";

//((document.getElementById('lpf').style.width.replace("vw", "")) / parseFloat(document.getElementById('lpf').style.width.replace("vw", "")))*8
//process.setMaxListeners(0);
//socket.emit('role', name)

//fpf x, y = 9.8, 27.65; delta x = 7.3;

/*    // Responsiveness for smaller screens
if(window.screen.width <= 1300) {
    console.log(window.screen.width);
    document.getElementById('lpf').style.width = "95vw";
    document.getElementById('fpf').style.width = "95vw";
    document.getElementsByClassName('lib_policies').style.width = "12vw";
    document.getElementsByClassName('fas_policies').style.width = "12vw";
}*/