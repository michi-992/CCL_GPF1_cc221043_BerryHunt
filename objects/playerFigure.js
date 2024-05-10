// class rewritten/added onto from code base from 2DBGC

class PlayerFigure extends ImageObject {
    moveByNumber = {
        "right": 0,
        "top": 0,
    }

    velocity = 7;
    startJump = false;
    playerOnMovingPlatform = false;
    playerAirborne = false;
    playerMovingRight = true;
    playerMovingUp = false;

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);

        this.useGravity = true;
        this.mass = 0.8;
    }


    update() {
        // use of delta times
        this.position.x += gameManager.getTimeAdjustedValue(this.moveByNumber.right, 1000 / 60);
        this.position.y += gameManager.getTimeAdjustedValue(this.moveByNumber.top, 1000 / 60);

        this.checkWorldPosition();

        if (this.startJump) {
            this.addAntiGravityForce(300);
            this.startJump = false;
        }


        // all player animations set here
        // case player is jumping up while facing right
        if (this.playerAirborne && this.playerMovingRight && this.playerMovingUp) {
            this.setAnimationByName("jumpUpRight");
        }
        // case player is falling down while facing right
        else if (this.playerAirborne && this.playerMovingRight && !this.playerMovingUp) {
            this.setAnimationByName("fallDownRight");
        }


        // case player is jumping up while facing left
        if (this.playerAirborne && !this.playerMovingRight && this.playerMovingUp) {
            this.setAnimationByName("jumpUpLeft");
        }
        // case player is jumping up while facing left
        else if (this.playerAirborne && !this.playerMovingRight && !this.playerMovingUp) {
            this.setAnimationByName("fallDownLeft");
        }


        // player is not moving and facing right
        if (!this.playerAirborne && this.playerMovingRight && this.moveByNumber.right == 0) {
            this.setAnimationByName("idleRight");
        }
        // player is not moving and facing right
        else if (!this.playerAirborne && !this.playerMovingRight && this.moveByNumber.right == 0) {
            this.setAnimationByName("idleLeft");
        }


        // player moving right while on rigid object
        if (!this.playerAirborne && this.playerMovingRight && this.moveByNumber.right > 0) {
            // check to only set the animation once
            if (this.displayedAnimationFrame < 11 && this.displayedAnimationFrame > 5) {
                return;
            } else {
                this.setAnimationByName("runRight");
            }
        }
        // player moving left while on rigid object
        if (!this.playerAirborne && !this.playerMovingRight && this.moveByNumber.right < 0) {
            // check to only set the animation once
            if (this.displayedAnimationFrame < 18 && this.displayedAnimationFrame > 11) {
                return;
            } else {
                this.setAnimationByName("runLeft");
            }
        }


    }

    // changed function from code base
    checkWorldPosition() {
        if (this.boundaries.getTopBoundary() >= gameManager.canvas.canvasBoundaries.bottom) {
            // stops gameLoop when player falls through
            gameManager.gameEnded = true;
            displayGameOverScreen();
        }

        // cannot go outside canvas on right/left side
        else if (this.boundaries.getLeftBoundary() <= gameManager.canvas.canvasBoundaries.left) {
            this.restoreObjectPosition();
        }
        else if (this.boundaries.getRightBoundary() >= gameManager.canvas.canvasBoundaries.right) {
            this.restoreObjectPosition();
        }
    }

}