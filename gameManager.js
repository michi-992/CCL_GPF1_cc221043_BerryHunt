// class GameManager taken from 2DBGC code base

class GameManager {
    gameObjects = [];
    canvas = null;

    // variable to determine if gameLoop should be stopped/executed
    gameEnded = true;

    // use of delta times
    previousTimeStamp = 0;
    currentDeltaTime = 0;

    constructor() {
        window.gameManager = this;
        window.gravityHelper = new GravityHelper();
    }


    gameLoop() {
        // no execution of gameLoop if game ended is true
        if (gameManager.gameEnded) {
            return;
        }
        else {
            // use of delta times
            let currentTimeStamp = performance.now();
            gameManager.currentDeltaTime = currentTimeStamp - gameManager.previousTimeStamp;
            gameManager.previousTimeStamp = currentTimeStamp;


            canvas.drawLayer.clearRect(0, 0, canvas.canvasHTMLElement.width, canvas.canvasHTMLElement.height);

            for (let gameLoopState = 0; gameLoopState < 5; gameLoopState++) {
                gameManager.gameObjects.forEach((gameObject) => {
                    if (gameObject.isActive) {
                        if (gameLoopState == 0) {
                            gameObject.storeObjectPosition();
                            gameObject.update();
                        }
                        if (gameLoopState == 1) {
                            gameObject.currentGravityCollisionObject = null;
                            gameManager.checkObjectsForCollisions(gameObject);
                        }
                        if (gameLoopState == 2 && gameObject.useGravity) {
                            gravityHelper.applyGravityForces(gameObject, false);
                        }
                        if (gameLoopState == 3) {
                            gameManager.checkObjectsForGravityCollisions(gameObject);
                        }
                        if (gameLoopState == 4) {
                            if (gameObject.useGravity) {
                                if (gameObject.currentGravityCollisionObject != null) {
                                    gravityHelper.applyGravityForces(gameObject, true);
                                    gravityHelper.applyGameObjectToHitPlatform(gameObject);
                                }
                                else {
                                    gameObject.isFalling = true;
                                }
                            }
                            gameObject.draw();
                        }
                    }
                });
            }
            requestAnimationFrame(gameManager.gameLoop);
        }
    }

    // if there has been a collision with an active object, the corresponding onCollision function will be executed
    checkObjectsForCollisions(object1) {
        for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
            let object2 = gameManager.gameObjects[i];
            if (object2.isActive) {
                let collisionDetected = this.detectCollision(object1, object2);
                if (collisionDetected) {
                    object1.onCollision(object2);
                    object2.onCollision(object1);
                }
            }
        }
    }

    // checks whether ther was a gravity collision
    checkObjectsForGravityCollisions(object1) {
        for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
            let object2 = gameManager.gameObjects[i];
            if (object2.isActive && object2.isRigid && object1.useGravity) {
                gravityHelper.checkForGravityCollision(object1, object2);
            }
            if (object2.isActive && object1.isRigid && object2.useGravity) {
                gravityHelper.checkForGravityCollision(object2, object1);
            }
        }
    }

    // determines whether ther is a collision between two objects
    detectCollision(object1, object2) {
        if (object1.boundaries.getLeftBoundary() <= object2.boundaries.getRightBoundary() &&
            object1.boundaries.getRightBoundary() >= object2.boundaries.getLeftBoundary()) {
            if (object1.boundaries.getTopBoundary() <= object2.boundaries.getBottomBoundary() &&
                object1.boundaries.getBottomBoundary() >= object2.boundaries.getTopBoundary()) {
                return true;
            }
        }
    }

    addGameObject(object) {
        this.gameObjects.push(object);
        object.gameObjectIndex = this.gameObjects.length - 1;;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    // use of delta times
    getTimeAdjustedValue(value, perXMilliseconds) {
        return (value / perXMilliseconds) * this.currentDeltaTime;
    }
}