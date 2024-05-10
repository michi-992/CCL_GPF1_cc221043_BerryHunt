// class Canvas taken from 2DBGC code base

class Canvas {
    
    canvasHTMLElement = null;
    drawLayer = null;
    canvasBoundaries = null;

    constructor(canvasId) {
        this.canvasHTMLElement = document.getElementById(canvasId);
        this.drawLayer = this.canvasHTMLElement.getContext("2d");
        this.canvasBoundaries = {
            bottom: this.canvasHTMLElement.height,
            right: this.canvasHTMLElement.width,
            left: 0,
            top: 0
        };
        this.addCanvasToGameManager();
    }

    addCanvasToGameManager() {
        gameManager.setCanvas(this);
    }

    addGameObjectToCanvas(gameObject) {
        this.gameObjectsOnCanvas.push(gameObject);
    }
}