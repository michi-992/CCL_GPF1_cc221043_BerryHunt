// class GameObject taken from 2DBGC code base - additions exlplained in comments

class GravityHelper {
    gravityFactor = 9.81;
    // manipulation value for onCollision between player and orange Berry
    manipulation = 0;

    // called in gameLoop, checks if there is a collision with a rigid object
    checkForGravityCollision(object1, object2) {
        let moveDown = object1.antiGravityForce <= 0;
        if (gameManager.detectCollision(object1, object2)) {
            if (object1.currentGravityCollisionObject == null)
                object1.currentGravityCollisionObject = object2;
            else if (moveDown && object2.boundaries.getTopBoundary() < object1.currentGravityCollisionObject.boundaries.getTopBoundary())
                object1.currentGravityCollisionObject = object2;
            else if (!moveDown && object2.boundaries.getBottomBoundary() > object1.currentGravityCollisionObject.boundaries.getBottomBoundary())
                object1.currentGravityCollisionObject = object2;

            
            if (object1.name == "player" && object2.name == "movingPlatform") {
                // if the player is on a moving platform they move along
                object2.moveWithPlatform(object1);
                // a check for the onCollision function in the scrollerBorder class
                object1.playerOnMovingPlatform = true;
                // a check if the character is currently in the air (animation relevant - see playerFigure)
                object1.playerAirborne = false;

            }
            // check if character is on platform that is not moving
            else if (object1.name == "player" && object2.name !== "movingPlatform") {
                object1.playerOnMovingPlatform = false;
                object1.playerAirborne = false;
                
            }
        }
        // check if object is in the currently in the air
        if (object1.name == "player" && object1.currentGravityCollisionObject == null) {
            object1.playerOnMovingPlatform = false;
            object1.playerAirborne = true;
        }
    }

    // constantly applied gravity force
    applyGravityForces(object, undoPrevious) {
        if (!object.useGravity) {
            return;
        }

        let moveDown = true;
        let multiplier = 1;
        // reset variable to false after last gameLoop iteration
        object.playerMovingUp = false;


        if (object.antiGravityForce > 0) {
            moveDown = false;
        }

        if (undoPrevious) {
            multiplier = -1;
        }

        if (moveDown) {
            object.position.y += this.gravityFactor * multiplier * object.mass;

        }
        else {
            object.antiGravityForce -= this.gravityFactor * multiplier * object.mass + this.manipulation;
            object.position.y -= this.gravityFactor * multiplier * object.mass;
            // check if the player's y coordinates are increasing (animation relevant - see playerFigure)
            object.playerMovingUp = true;
        }

    }


    // assigning y coordinates for the object that uses gravity on collision with a rigid object
    applyGameObjectToHitPlatform(object) {
        let moveDown = object.antiGravityForce <= 0;
        if (moveDown) {
            object.position.y = object.currentGravityCollisionObject.boundaries.getTopBoundary() - object.dimensions.height - object.boundaryOffsets.bottom - 1;
            object.isFalling = false;
        }
        else {
            object.position.y = object.currentGravityCollisionObject.boundaries.getBottomBoundary() - object.boundaryOffsets.top;
            object.antiGravityForce = 0;
            object.isFalling = true;
        }
    }
}