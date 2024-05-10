// added class to the code base from 2DBGC

class MovingPlatform extends RockPlatform {
    // defining a start position (x coordinate)
    startPosition = {
        "x": 0
    }

    // defining an end position (x coordinate)
    endPosition = {
        "x": 0,
    }

    // set velocity for all moving Platforms to create an easier approach in the scrollerBorder class (onCollision function)
    velocityX = 2;

    constructor(name, x, y, width, height, xEnd, src) {
        super(name, x, y, width, height, src);
        // passing the x and xEnd value to the start and end position
        this.startPosition.x = x;
        this.endPosition.x = xEnd;

    }

    update() {
        // setup done carefully to have this condition be true
        if (this.startPosition.x < this.endPosition.x) {
            // movement from left to right in between start and end position by setting moveByNumber.right to negative/positive velocity
            if (this.position.x <= this.startPosition.x) {
                this.moveByNumber.right = this.velocityX;
            }
            if (this.position.x >= this.endPosition.x) {
                this.moveByNumber.right = this.velocityX * -1;
            }
            // increasing/decreasing x position dependent on moveByNumber.right
            this.position.x += gameManager.getTimeAdjustedValue(this.moveByNumber.right, 1000 / 60);
        } else {
            console.log("The starting and ending position have been falsely stated in the stage setup for the moving platform.")
        }

    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {
            // cases the player is moving horizontally and collides with a moving platform
            if ((this.moveByNumber.right > 0 && otherObject.moveByNumber.right > 0) ||
                (this.moveByNumber.right < 0 && otherObject.moveByNumber.right > 0) ||
                (this.moveByNumber.right > 0 && otherObject.moveByNumber.right < 0) ||
                (this.moveByNumber.right < 0 && otherObject.moveByNumber.right < 0)) {
                    // change in x position dependent on this.moveByNumber.right
                    // use of delta times
                otherObject.position.x = otherObject.previousPosition.x + gameManager.getTimeAdjustedValue(this.moveByNumber.right, 1000 / 60);
            }
            else {
                otherObject.position.x = otherObject.previousPosition.x + gameManager.getTimeAdjustedValue(this.moveByNumber.right, 1000 / 60);
            }
        }
    }

    // new function (called in gravityHelper when checking for grav. col.) changing the x postion of the player with the moving platform
    moveWithPlatform(otherObject) {
        if (otherObject.name == "player") {
            otherObject.position.x += gameManager.getTimeAdjustedValue(this.moveByNumber.right, 1000 / 60);
        }
    }


}
