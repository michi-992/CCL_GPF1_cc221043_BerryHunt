// class GameObject taken from 2DBGC code base

class GameObject {
    name = "GameObject";
    isActive = true;
    useGravity = false;
    isFalling = false;
    isRigid = false;


    antiGravityForce = 0;
    currentGravityCollisionObject = null;

    mass = 1;

    // change in pixels for top/bottom and right/left
    moveByNumber = {
        "top": 0,
        "right": 0,
    };

    position = {
        "x": 0,
        "y": 0
    }

    previousPosition = {
        "x": 0,
        "y": 0,
    }

    dimensions = {
        "width": 0,
        "height": 0,
    }

    boundaryOffsets = {
        "left": 0,
        "right": 0,
        "top": 0,
        "bottom": 0,
    }

    boundaries = {
        "getLeftBoundary": () => {
            return this.position.x + this.boundaryOffsets.left;
        },
        "getRightBoundary": () => {
            return this.position.x + this.dimensions.width + this.boundaryOffsets.right;
        },
        "getTopBoundary": () => {
            return this.position.y + this.boundaryOffsets.top;
        },
        "getBottomBoundary": () => {
            return this.position.y + this.dimensions.height + this.boundaryOffsets.bottom;
        },
    }


    constructor(name, x, y, width, height) {
        this.name = name;
        this.position.x = x;
        this.position.y = y;
        this.dimensions.width = width;
        this.dimensions.height = height;

        gameManager.addGameObject(this);
    }

    draw() {

    }

    update() {

    }

    storeObjectPosition() {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    restoreObjectPosition() {
        this.position.x = this.previousPosition.x;
        this.position.y = this.previousPosition.y;
    }
    
    setObjectBoundaryOffsets(left, right, top, bottom) {
        this.boundaryOffsets.left = left;
        this.boundaryOffsets.right = right;
        this.boundaryOffsets.top = top;
        this.boundaryOffsets.bottom = bottom;
    }

    addAntiGravityForce(force) {
        this.antiGravityForce += force;
    }

    onCollision(otherObject) {

    }

    moveWithPlatform(otherObject) {

    }

}