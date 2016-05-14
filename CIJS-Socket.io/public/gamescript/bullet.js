/**
 * Created by hungtran on 5/8/16.
 */

class BulletPlayer{
    constructor(x, y, direction){
        this.x = x;
        this.y = y;
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
                this.speedX = -5;
                break;
            case 2:
                this.sprite = this.sprRight;
                this.speedX = 5;
                break;
            case 3:
                this.sprite = this.sprUp;
                this.speedY = -5;
                break;
            case 4:
                this.sprite = this.sprDown;
                this.speedY = 5;
                break;
        }
    }

    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }

    update(deltaTime){
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
