// class correspondends to obstacle in 2DBGC code base

class RockPlatform extends ImageObject {
    moveByNumber = {
        "right": 0,
        "top": 0
    }

    // add CanvasID
    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.isRigid = true;
    }

    onCollision(otherObject) {
        if (otherObject.name == "player") {
            otherObject.restoreObjectPosition();
        }
    }
}
