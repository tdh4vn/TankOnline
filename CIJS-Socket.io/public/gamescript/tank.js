/**
 * Created by hungtran on 5/7/16.
 */

class Player{
    constructor(x, y, id, name){
        this.id = id;
        this.tankUp = new Image();
        this.tankUp.src = "images/tank_player1_up_c0_t1.png";
        this.tankLeft = new Image();
        this.tankLeft.src = "images/tank_player1_left_c0_t1.png";
        this.tankDown = new Image();
        this.tankDown.src = "images/tank_player1_down_c0_t1.png";
        this.tankRight = new Image();
        this.tankRight.src = "images/tank_player1_right_c0_t1.png";
        this.drirection = 3;
        this.listBullet = new Array();
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.sprite = this.tankUp;
        this.name = name;
    }
    draw(context){
        context.font = "10px Arial";
        context.fillStyle = "yellow";
        context.textAlign = "start";
        context.fillText(this.name, this.x - view_xview, this.y - view_yview + 36);
        context.fillStyle = "black";
        context.drawImage(this.sprite, this.x - view_xview, this.y - view_yview);
        for (var i = 0; i < this.listBullet.length; i++){
            this.listBullet[i].draw(context);
        }
    }

    update(deltaTime){
        if(this.checkCollistionWithBullet()){
            isLive = false;
            console.log(isLive);
            socket.emit('die',{idTank:this.id, name : this.name});
            replay();
        }
        if(!this.checkCollistionWithBrick()){
            this.x += this.speedX;
            this.y += this.speedY;
        }
        for (var i = 0; i < this.listBullet.length; i++){
            this.listBullet[i].update(deltaTime);
        }
    }

    checkCollistionTwoBox(rect1, rect2){
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            return true;
        }
        return false;
    }

    checkCollistionWithBrick(){
        var rect1 = {x : this.x + this.speedX, y : this.y + this.speedY, width: 32, height : 32};
        for(var i = 0; i < arrayWallBrick.length; i+=1){
            var rect2 = {x : arrayWallBrick[i].x, y : arrayWallBrick[i].y, width: 16, height:16};
            if(this.checkCollistionTwoBox(rect1, rect2)){
                return true;
            }
        }
        for(var i = 0; i < arrayWallSteel.length; i+=1){
            var rect2 = {x : arrayWallSteel[i].x, y : arrayWallSteel[i].y, width: 16, height:16};
            if(this.checkCollistionTwoBox(rect1, rect2)){
                return true;
            }
        }
        return false;
    }
    checkCollistionWithBullet() {
        var rect1 = {x: this.x, y: this.y, width: 32, height: 32};
        for (var i = 0; i < players.length; i += 1) {
            for (var j = 0; j < players[i].listBullet.length; j += 1){
                var rect2 = {x : players[i].listBullet[j].x, y : players[i].listBullet[j].y, width: 8, height: 8};
                if(this.checkCollistionTwoBox(rect1, rect2)){
                    return true;
                }
            }
        }
        return false;
    }

    move(direction){
        switch (direction){
            case 0:
                this.speedX = 0;
                this.speedY = 0;
                break;
            case 1:
                this.sprite = this.tankLeft;
                this.speedX = -5;
                this.drirection = 1;
                break;
            case 2:
                this.sprite = this.tankRight;
                this.speedX = 5;
                this.drirection = 2;
                break;
            case 3:
                this.sprite = this.tankUp;
                this.speedY = -5;
                this.drirection = 3;
                break;
            case 4:
                this.sprite = this.tankDown;
                this.speedY = 5;
                this.drirection = 4;
                break;
        }
    }
    shot(myBullet){
        var bullet = new BulletPlayer(this.x + 14, this.y + 14, this.drirection, myBullet);
        this.listBullet.push(bullet);
    }

}

/**
 * Created by hungtran on 5/7/16.
 */

class EnemyTank{
    constructor(x, y, id, name){
        this.id = id;
        this.tankUp = new Image();
        this.tankUp.src = "images/tank_player1_up_c0_t1.png";
        this.tankLeft = new Image();
        this.tankLeft.src = "images/tank_player1_left_c0_t1.png";
        this.tankDown = new Image();
        this.tankDown.src = "images/tank_player1_down_c0_t1.png";
        this.tankRight = new Image();
        this.tankRight.src = "images/tank_player1_right_c0_t1.png";
        this.drirection = 3;
        this.listBullet = new Array();
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.sprite = this.tankUp;
        this.name = name;
    }
    draw(context){
        context.font = "10px Arial";
        context.fillStyle = "yellow";
        context.textAlign = "start";
        context.fillText(this.name, this.x - view_xview, this.y - view_yview + 36);
        context.fillStyle = "black";
        context.drawImage(this.sprite, this.x - view_xview, this.y - view_yview);
        for (var i = 0; i < this.listBullet.length; i++){
            this.listBullet[i].draw(context);
        }
    }

    update(deltaTime){
        this.x += this.speedX;
        this.y += this.speedY;
        for (var i = 0; i < this.listBullet.length; i++){
            this.listBullet[i].update(deltaTime);
        }
    }


    shot(){
        var bullet = new BulletPlayer(this.x + 14, this.y + 14, this.drirection);
        this.listBullet.push(bullet);
    }

}

