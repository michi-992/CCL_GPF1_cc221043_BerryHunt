function keyDown(eventInformation) {

	switch (eventInformation.key) {
		case "w":
			if (creature.isFalling || creature.antiGravityForce > 0)
				return;
			creature.startJump = true;
			break;

		case "a":
			if (creature.moveByNumber.right != 0 || creature.moveByNumber.top != 0) {
				return;
			}
			// setting variable to false meaning player is facing left
			creature.playerMovingRight = false;
			// player moves left
			creature.moveByNumber.right = -creature.velocity;
			break;

		case "d":
			if (creature.moveByNumber.right != 0 || creature.moveByNumber.top != 0) {
				return;
			}

			// setting variable to true meaning player is facing right
			creature.playerMovingRight = true;
			// player moves right
			creature.moveByNumber.right = creature.velocity;
			break;
	}
}

window.addEventListener("keydown", keyDown);


function keyUp(eventInformation) {
	switch (eventInformation.key) {
		case "w":
			break;

		case "a":
			// not moving horizontally
			creature.moveByNumber.right = 0;
			break;

		case "d":
			// not moving horizontally
			creature.moveByNumber.right = 0;
			break;
	}
}

window.addEventListener("keyup", keyUp);
