/**
 * Created by hungtran on 5/7/16.
 */

class Player{
    constructor(x, y, id){
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
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
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

    checkCollistionTwoBox(rect1, rect2){
        console.log("Coll");
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
    shot(){
        var bullet = new BulletPlayer(this.x, this.y, this.drirection);
        this.listBullet.push(bullet);
    }

}
