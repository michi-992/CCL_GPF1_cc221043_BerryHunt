// class ImageObject taken from 2DBGC code base

class ImageObject extends GameObject {
    image;
    animations = {};
    isLoaded = false;

    columns = 0;
    rows = 0;
    currentSourceX = 0;
    currentSourceY = 0;
    currentStartFrame = 0;
    currentEndFrame = 0;
    displayedAnimationFrame = 0;
    animationDurationPerFrame = 5;
    displayedAnimationFrameDuration = 0;

    // add canvasID
    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height);
        this.image = new Image();
        this.image.src = src;

        // does calculations for animation relevant variables only after the image is loaded
        this.image.addEventListener("load", () => {
            this.isLoaded = true;
            this.columns = this.image.naturalWidth / this.dimensions.width;
            this.rows = this.image.naturalHeight / this.dimensions.height;
        })
    }

    draw() {
        // only draws if image is loaded
        if (this.isLoaded) {
            this.changeFrameOfCurrentAnimation();
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(this.image, this.currentSourceX, this.currentSourceY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            gameManager.canvas.drawLayer.closePath();
        }
    }


    // increases the animation frame by one if the duration was reached
    changeFrameOfCurrentAnimation() {
        this.displayedAnimationFrameDuration++;
        if (this.displayedAnimationFrameDuration < this.animationDurationPerFrame) {
            return;
        }
        this.displayedAnimationFrameDuration = 0;

        if (this.displayedAnimationFrame > this.currentEndFrame) {
            this.displayedAnimationFrame = this.currentStartFrame;
        }

        let currentRow = Math.floor(this.displayedAnimationFrame / this.columns);
        let currentColumn = this.displayedAnimationFrame % this.columns;
        this.currentSourceY = currentRow * this.dimensions.height;
        this.currentSourceX = currentColumn * this.dimensions.width;


        this.displayedAnimationFrame++;
    }
    

    // adds objects to animations = {}
    addAnimationObjects(name, startFrame, endFrame) {
        let animationObject = {
            "startFrame": startFrame,
            "endFrame": endFrame
        }
    
        this.animations[name] = animationObject;
    }
    
    // refers to animation objects by their name and determines start and endframe from object properties
    setAnimationByName(name) {
        this.currentStartFrame = this.animations[name].startFrame;
        this.currentEndFrame = this.animations[name].endFrame;
        this.displayedAnimationFrame = this.animations[name].startFrame;
    }
}