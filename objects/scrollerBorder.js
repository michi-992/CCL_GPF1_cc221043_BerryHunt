// added class to the code base from 2DBGC

class ScrollerBorder extends GameObject {
    // getting a reference to the differnce in the player y coordinate when jumping
    playerFallingSpeed = window.gravityHelper.gravityFactor * creature.mass;

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);

    }

    onCollision(otherObject) {
        // same structure as next (same level) if statement
        // player collides with right border; additional condition to stop further moving of game objects when backgrounds are at limit
        if (this.name == "moveRight" && otherObject.name == "player" && nearestBackground.position.x >= -4000) {
            // case player moving right and is not on moving platform - changes in x position are adjusted according to the player velocity
            if (otherObject.moveByNumber.right > 0 && !otherObject.playerOnMovingPlatform) {
                // looping through all game Objects and adjusting their x coordinates
                gameManager.gameObjects.forEach((gameObject) => {
                    // player individually for better readability/understandability
                    if (gameObject.name == "player") {
                        gameObject.position.x -= gameManager.getTimeAdjustedValue(gameObject.moveByNumber.right, 1000 / 60);
                    }
                    // borders are always in the same position on th canvas
                    else if (gameObject.name == "moveRight" || gameObject.name == "moveLeft") {
                        return;
                    }
                    // moving platform start/end position get adjusted; platform still moves (adjusted)
                    else if (gameObject.name == "movingPlatform") {
                        gameObject.position.x = gameObject.previousPosition.x + (gameManager.getTimeAdjustedValue(gameObject.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60));
                        gameObject.startPosition.x -= gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60);
                        gameObject.endPosition.x -= gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60);
                    }
                    // farthestBackground moves the least at 0.4 times
                    else if (gameObject.name == "farthestBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) * 0.4;
                    }
                    // middleBackground moves at 0.6 times of all other things
                    else if (gameObject.name == "middleBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) * 0.6;
                    }
                    // adjustments for all other objects
                    else {
                        gameObject.position.x -= gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60);
                    }
                });
            }
            // case player moves right and is on platform - the changes in x position are adjusted according to moving platform velocity and player velocity
            else if (otherObject.moveByNumber.right > 0 && otherObject.playerOnMovingPlatform) {
                gameManager.gameObjects.forEach((gameObject) => {
                    if (gameObject.name == "player") {
                        gameObject.position.x -= (gameManager.getTimeAdjustedValue(gameObject.moveByNumber.right, 1000 / 60) + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                    }
                    else if (gameObject.name == "moveRight" || gameObject.name == "moveLeft") {
                        return;
                    }
                    else if (gameObject.name == "movingPlatform") {
                        gameObject.position.x = gameObject.previousPosition.x - (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                        gameObject.startPosition.x -= (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                        gameObject.endPosition.x -= (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                    }
                    else if (gameObject.name == "farthestBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60)) * 0.4;
                    }
                    else if (gameObject.name == "middleBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60)) * 0.6;
                    }
                    else {
                        gameObject.position.x -= (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                    }
                });
            }
            // case player does not move and is on moving platform - changes in x position are adjusted according to the moving platform velocity
            else if (otherObject.moveByNumber.right == 0 && otherObject.playerOnMovingPlatform) {
                gameManager.gameObjects.forEach((gameObject) => {
                    if (gameObject.name == "player") {
                        gameObject.position.x -= gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60);
                    }
                    else if (gameObject.name == "moveRight" || gameObject.name == "moveLeft") {
                        return;
                    }
                    else if (gameObject.name == "movingPlatform") {
                        gameObject.position.x = gameObject.previousPosition.x;
                        gameObject.startPosition.x -= gameManager.getTimeAdjustedValue(gameObject.velocityX, 1000 / 60);
                        gameObject.endPosition.x -= gameManager.getTimeAdjustedValue(gameObject.velocityX, 1000 / 60);
                    }
                    else if (gameObject.name == "farthestBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60) * 0.4;
                    }
                    else if (gameObject.name == "middleBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60) * 0.6;
                    }
                    else {
                        gameObject.position.x -= gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60);
                    }
                });

            }
        }

        if (this.name == "moveLeft" && otherObject.name == "player" && nearestBackground.position.x <= 0) {
            if (otherObject.moveByNumber.right < 0 && !otherObject.playerOnMovingPlatform) {
                gameManager.gameObjects.forEach((gameObject) => {
                    if (gameObject.name == "player") {
                        gameObject.position.x -= gameManager.getTimeAdjustedValue(gameObject.moveByNumber.right, 1000 / 60);
                    }
                    else if (gameObject.name == "moveRight" || gameObject.name == "moveLeft") {
                        return;
                    }
                    else if (gameObject.name == "movingPlatform") {
                        gameObject.position.x = gameObject.previousPosition.x + (gameManager.getTimeAdjustedValue(gameObject.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60));
                        gameObject.startPosition.x -= gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60);
                        gameObject.endPosition.x -= gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60);
                    }
                    else if (gameObject.name == "farthestBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) * 0.4;
                    }
                    else if (gameObject.name == "middleBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) * 0.6;
                    }
                    else {
                        gameObject.position.x -= gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60);
                    }
                });
            }
            else if (otherObject.moveByNumber.right < 0 && otherObject.playerOnMovingPlatform) {
                gameManager.gameObjects.forEach((gameObject) => {
                    if (gameObject.name == "player") {
                        gameObject.position.x -= (gameManager.getTimeAdjustedValue(gameObject.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                    }
                    else if (gameObject.name == "moveRight" || gameObject.name == "moveLeft") {
                        return;
                    }
                    else if (gameObject.name == "movingPlatform") {
                        gameObject.position.x = gameObject.previousPosition.x - (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                        gameObject.startPosition.x -= (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                        gameObject.endPosition.x -= (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                    }
                    else if (gameObject.name == "farthestBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60)) * 0.4;
                    }
                    else if (gameObject.name == "middleBackground") {
                        gameObject.position.x = gameObject.previousPosition.x - (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60)) * 0.6;
                    }
                    else {
                        gameObject.position.x -= (gameManager.getTimeAdjustedValue(creature.moveByNumber.right, 1000 / 60) - gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60));
                    }
                });
            }
            else if (otherObject.moveByNumber.right == 0 && otherObject.playerOnMovingPlatform) {
                gameManager.gameObjects.forEach((gameObject) => {
                    if (gameObject.name == "player") {
                        gameObject.position.x += gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60);
                    }
                    else if (gameObject.name == "moveRight" || gameObject.name == "moveLeft") {
                        return;
                    }
                    else if (gameObject.name == "movingPlatform") {
                        gameObject.position.x = gameObject.previousPosition.x;
                        gameObject.startPosition.x += gameManager.getTimeAdjustedValue(gameObject.velocityX, 1000 / 60);
                        gameObject.endPosition.x += gameManager.getTimeAdjustedValue(gameObject.velocityX, 1000 / 60);
                    }
                    else if (gameObject.name == "farthestBackground") {
                        gameObject.position.x = gameObject.previousPosition.x + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60) * 0.4;
                    }
                    else if (gameObject.name == "middleBackground") {
                        gameObject.position.x = gameObject.previousPosition.x + gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60) * 0.6;
                    }
                    else {
                        gameObject.position.x += gameManager.getTimeAdjustedValue(movingPlatform.velocityX, 1000 / 60);
                    }
                });
            }
        }

        // player collides while jumping up; additional condition to stop further moving of game objects when backgrounds are at limits
        if (this.name == "moveUp" && otherObject.name == "player" && nearestBackground.position.y >= -1000 && nearestBackground.position.y <= 0) {
            gameManager.gameObjects.forEach((gameObject) => {
                // borders do not move
                if (gameObject.name == "moveUp" || gameObject.name == "moveDown") {
                    return;
                }
                // adjusted y position for all game objects
                else {
                    gameObject.position.y += this.playerFallingSpeed;
                }
            });
        }

        else if (this.name == "moveDown" && otherObject.name == "player" && nearestBackground.position.y >= -1000) {
            gameManager.gameObjects.forEach((gameObject) => {
                if (gameObject.name == "moveUp" || gameObject.name == "moveDown") {
                    return;
                }
                else {
                    gameObject.position.y -= this.playerFallingSpeed;
                }
            });
        }
    }
}