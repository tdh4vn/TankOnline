/**
 * Created by hungtran on 5/8/16.
 */

class WallBrick{
    constructor(posX, posY){
        this.x = posX * 16;
        this.y = posY * 16;
        this.sprite = new Image();
        this.sprite.src = "images/wall_brick.png";
    }

    draw(context){
        context.drawImage(this.sprite, this.x - view_xview, this.y - view_yview);
    }

    update(deltaTime){

    }
}

class WallSteel{
    constructor(posX, posY){
        this.x = posX * 16;
        this.y = posY * 16;
        this.sprite = new Image();
        this.sprite.src = "images/wall_steel.png";
    }

    draw(context){
        context.drawImage(this.sprite, this.x - view_xview, this.y - view_yview);
    }
    update(deltaTime){

    }
}
