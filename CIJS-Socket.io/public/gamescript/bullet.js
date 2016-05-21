/**
 * Created by hungtran on 5/8/16.
 */

class Bullet{
    constructor(x, y, direction, myBullet){
        this.myBullet = myBullet;
        this.x = x;
        this.y = y;
        this.ofPlayer = false;
        this.speedX = 0;
        this.speedY = 0;
        this.sprUp = new Image();
        this.sprUp.src = "images/bullet_up.png";
        this.sprDown = new Image();
        this.sprDown.src = "images/bullet_down.png";
        this.sprLeft = new Image();
        this.sprLeft.src = "images/bullet_left.png";
        this.sprRight = new Image();
        this.sprRight.src = "images/bullet_right.png";
        this.sprite = this.sprUp;
        switch (direction){
            case 1:
                this.sprite = this.sprLeft;
                this.speedX = -10;
                break;
            case 2:
                this.sprite = this.sprRight;
                this.speedX = 10;
                break;
            case 3:
                this.sprite = this.sprUp;
                this.speedY = -10;
                break;
            case 4:
                this.sprite = this.sprDown;
                this.speedY = 10;
                break;
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

    draw(context){
        context.drawImage(this.sprite, this.x - view_xview, this.y - view_yview);
    }

    update(deltaTime){
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
