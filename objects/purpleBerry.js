// class corresponds to YummyDots in 2DBGC codebase with additional code in onCollision

class PurpleBerry extends ImageObject {

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.useGravity = true;
        purpleBerries.push(this);
        this.addAnimationObjects("purpleBerry", 0, 2);
        this.setAnimationByName("purpleBerry");
    }


    onCollision(otherObject) {
        if (otherObject.name == "player") {
            this.isActive = false;
            // increasing of the counter and displaying it in the DOM
            berryScore++;
            berryScoreText.innerHTML = `${berryScore} / ${purpleBerries.length}`;

            // berryshrub will be drawn when all purple berries are collected
            if (berryScore == purpleBerries.length) {
                berryShrub.isActive = true;
            }
        }
    }
}