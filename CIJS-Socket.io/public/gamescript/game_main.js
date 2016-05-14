/**
 * Created by hungtran on 5/6/16.
 */

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
context.fillStyle = "#ffffff";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//50 * 37
document.body.appendChild(canvas);

var players = new Array();
var myPlayer;
var isOnline = false;;
var isLive = false;

var socket = io.connect();
socket.on('other_player_connected', function (data) {
    if(isLive) {
        if (isOnline) {
            players.push(new EnemyTank(data.x, data.y, data.idTank, data.name));
        }
        socket.emit('update_tanker', {idTank: myPlayer.id, x: myPlayer.x, y: myPlayer.y, name:myPlayer.name});
    }
});
socket.on('player_connected', function (data) {
    myPlayer = new Player(data.x, data.y, data.idTank, data.name);
    isOnline = true;
    isLive = true;
});
socket.on('update_tanker_delete_server', function (data) {
    if(isLive){
        for(var i = 0; i < players.length; i++){
            if (data.idTank == players[i].id){
                players.splice(i);
            }
        }
    }
});

socket.on('die_server', function (data) {
    if(isLive){
        for(var i = 0; i < players.length; i++){
            if (data.idTank == players[i].id){
                players.splice(i);
            }
        }
    }
});

socket.on('update_tanker_shot_server', function (data) {
    if(isLive) {
        var check = false;
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == data.idTank) {
                players[i].shot();
                check = true;
                break;
            }
        }
        if (check == false && isOnline) {
            players.push(new Player(data.x, data.y, data.idTank));
        }
    }
});
socket.on('update_tanker_server', function (data) {
    if(isLive) {
        var check = false;
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == data.idTank) {
                if (players[i].x > data.x) {
                    players[i].sprite = players[i].tankLeft;
                    players[i].drirection = 1;
                }
                if (players[i].x < data.x) {
                    players[i].sprite = players[i].tankRight;
                    players[i].drirection = 2;
                }
                if (players[i].y > data.y) {
                    players[i].sprite = players[i].tankUp;
                    players[i].drirection = 3;
                }
                if (players[i].y < data.y) {
                    players[i].sprite = players[i].tankDown;
                    players[i].drirection = 4;
                }
                players[i].x = data.x;
                players[i].y = data.y;
                check = true;
                break;
            }
        }
        if (check == false && isOnline) {
            players.push(new Player(data.x, data.y, data.idTank, data.name));
        }
    }
});

setInterval(()=>{
    gameUpdate(17);
    gameDraw(context);
}, 17);
var mapWidth = 216;
var mapHeight = 72;
/* Viewport x position */   view_xview = 0;
/* Viewport y position */   view_yview = 0;
/* Viewport width */        view_wview = canvas.width;
/* Viewport height */       view_hview = canvas.height;
/* Sector width */          room_width = mapWidth * 16;
/* Sector height */         room_height = mapHeight * 16;


var arrayWallBrick = new Array();
var arrayWallSteel = new Array();

for (var i = 0; i < mapHeight; i++){
    for(var j = 0; j < mapWidth; j++){
        if (map[i * mapWidth + j] === 1){
            var wallBrick = new WallBrick(j, i);
            arrayWallBrick.push(wallBrick);
        } else if (map[i * mapWidth + j] === 2){
            var wallSteel = new WallSteel(j, i);
            arrayWallSteel.push(wallSteel);
        }
    }
}



function gameUpdate(deltaTime) {
    for (var i = 0; i < players.length; i++){
        players[i].update(deltaTime);
    }
    for(var i = 0; i < arrayWallBrick.length; i++){
        arrayWallBrick[i].update(deltaTime);
    }
    for(var i = 0; i < arrayWallSteel.length; i++){
        arrayWallSteel[i].update(deltaTime);
    }
    if(isOnline){
        if (isLive){
            myPlayer.update(deltaTime);
        }

        if(myPlayer.speedX != 0 || myPlayer.speedY != 0){
            socket.emit('update_tanker',{idTank: myPlayer.id,x: myPlayer.x, y : myPlayer.y});
        }
        for (var i = 0; i < players.length; i++){
            players[i].update(deltaTime);
        }
    }
}
function gameDraw (ctx) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < arrayWallBrick.length; i++){
        arrayWallBrick[i].draw(ctx);
    }
    for(var i = 0; i < arrayWallSteel.length; i++){
        arrayWallSteel[i].draw(ctx);
    }

    if(isOnline){
        if(myPlayer.x > view_wview / 2){
            view_xview = myPlayer.x - view_wview / 2;
        }
        if(myPlayer.y > view_hview / 2){
            view_yview = myPlayer.y - view_hview / 2;
        }
        if (isLive) {
            myPlayer.draw(ctx);
        }
        for (var i = 0; i < players.length; i++){
            players[i].draw(ctx);
        }
    }
}

function login() {
    var txtName = document.getElementById('txt_name');
    socket.emit('login',{name: txtName.value});
}

window.onkeydown = function (e) {
    switch (e.keyCode){
        case 37:
            myPlayer.move(1);
            break;
        case 38:
            myPlayer.move(3);
            break;
        case 39:
            myPlayer.move(2);
            break;
        case 40:
            myPlayer.move(4);
            break;
        case 32:
            myPlayer.shot();
            socket.emit('update_tanker_shot', {idTank : myPlayer.id});
            break;
    }
};

window.onkeyup = function (e) {
    if(isLive){
        myPlayer.move(0);
    }
};
window.onbeforeunload = function (e) {
    socket.emit('close',{idTank: myPlayer.id, x: myPlayer.x, y : myPlayer.y});
};
window.onunload = function (e) {
    socket.emit('close',{idTank: myPlayer.id, x: myPlayer.x, y : myPlayer.y});
};