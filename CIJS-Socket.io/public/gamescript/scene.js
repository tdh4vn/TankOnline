/**
 * Created by hungtran on 5/6/16.
 */
class Scene{
    constructor(ctx){
        this.ctx = ctx;
        this.isRunning = true;
        this.player = new Player(100, 100);
    }

    startGame(){
        this.interval =  setInterval(()=>{
            this.update(30);
            this.draw(this.ctx);
        }, 30);
    }

    pauseGame(){
        this.isRunning = false;
    }
    resumeGame(){
        this.isRunning = true;
    }

    onKeyDown(e) {
        switch (e.keyCode){
            case 37:
                alert('left');
                break;
            case 38:
                alert('up');
                break;
            case 39:
                alert('right');
                break;
            case 40:
                alert('down');
                break;
            case ' ':
                
                break;
        }
    }

    update(deltaTime){

    }
    draw(context){
        this.player.draw(context);
    }
}
