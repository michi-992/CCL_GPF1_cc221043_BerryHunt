// class corresponds to YummyDots in 2DBGC codebase with additional code in onCollision

class OrangeBerry extends ImageObject {

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);
        this.useGravity = true;

        // animation object added and immediately set in the constructor to avoid repetition in setup
        this.addAnimationObjects("orangeBerry", 0, 2);
        this.setAnimationByName("orangeBerry");
    }


    onCollision(otherObject) {
        if (otherObject.name == "player") {
            this.isActive = false;

            // added manipulation to gravity calculator resulting in a decreased jump ability for 6 seconds until resetted
            window.gravityHelper.manipulation = 10;
            setTimeout(() => {
                window.gravityHelper.manipulation = 0;
            }, 6000);
        }
    }

}