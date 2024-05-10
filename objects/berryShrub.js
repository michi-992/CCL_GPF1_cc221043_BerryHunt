// added class to the code base from 2DBGC

class BerryShrub extends ImageObject {

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height,src);
        this.useGravity = true;
        this.mass = .6;
    }
    
    onCollision(otherObject) {
        if(otherObject.name == "player") {
            // gameEnded variable determines if the gameLoop runs
            gameManager.gameEnded = true;
            // function in stageSetup
            displayWinningScreen();
        }
    }
}