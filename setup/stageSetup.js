let gameManager = new GameManager();

new GameManager();


let canvas = new Canvas("main");

// variables that are called somewhere be global
let farthestBackground;
let middleBackground;
let nearestBackground;

let movingPlatform;
let creature;

let moveLeft;
let moveRight;
let moveUp;
let moveDown;

// having an array for purple berries for dynamic display of how many need to be collected
let purpleBerries = [];
let berryShrub;
let berryScore = 0;


// references to DOM elements
const screens = document.getElementById("screens");
const controlBtns = document.getElementById("btns");
const startBtn = document.getElementById("startBtn");
const tutorialBtn = document.getElementById("tutorialBtn")

const gameContainer = document.getElementById("gameContainer");
const canvasHTML = document.getElementById("main");

const scoreDisplay = document.getElementById("score");
const berryScoreText = document.getElementById("berryScore");
const levelNumber = document.getElementById("levelNumber");


// tied to startBtn
// all game object setup here
function startGame() {
    // change of displayed DOM elements
    screens.style.display = "none";
    gameContainer.style.display = "block";
    scoreDisplay.style.display = "block";
    levelNumber.style.display = "block";

    // emptying all arrays with (new) game start
    gameManager.gameObjects = [];
    purpleBerries = [];
    berryScore = 0;

    // background images
    farthestBackground = new ImageObject("farthestBackground", 0, -1000, 2800, 1600, "images/farthestBackground.png");
    middleBackground = new ImageObject("middleBackground", 0, -1000, 3600, 1600, "images/middleBackground.png");
    nearestBackground = new ImageObject("nearestBackground", 0, -1000, 5200, 1600, "images/nearestBackground.png");

    // ground
    new RockPlatform("ground", 0, 500, 2000, 100, "images/groundLong.png");
    new RockPlatform("ground", 3000, 500, 1500, 100, "images/groundShort.png");

    // moving platforms
    movingPlatform = new MovingPlatform("movingPlatform", 900, 100, 200, 100, 1150, "images/rockPlatform.png");
    new MovingPlatform("movingPlatform", 1000, -680, 200, 100, 1400, "images/rockPlatform.png");
    new MovingPlatform("movingPlatform", 640, -400, 200, 100, 1200, "images/rockPlatform.png");
    new MovingPlatform("movingPlatform", 2100, -800, 200, 100, 2700, "images/rockPlatform.png");
    new MovingPlatform("movingPlatform", 2150, 300, 200, 100, 2600, "images/rockPlatform.png");
    new MovingPlatform("movingPlatform", 3500, -30, 200, 100, 3800, "images/rockPlatform.png");
    new MovingPlatform("movingPlatform", 3600, -800, 200, 100, 3900, "images/rockPlatform.png");
    new MovingPlatform("movingPlatform", 4000, -200, 200, 100, 4500, "images/rockPlatform.png");

    // normal rock platforms
    new RockPlatform("rockPlatform", 300, -550, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 600, 300, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 150, -250, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 400, 0, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 550, -810, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 1320, -120, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 1370, 350, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 1680, 70, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 1690, -850, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 1650, -320, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 1950, -550, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 2100, -250, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 2380, 30, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 2600, -520, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 2780, -150, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 3100, -730, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 3180, -330, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 3270, 250, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 3570, -530, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 4200, 250, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 4270, -700, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 4500, -550, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 4870, 450, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 4600, 80, 200, 100, "images/rockPlatform.png");
    new RockPlatform("rockPlatform", 4800, -310, 200, 100, "images/rockPlatform.png");

    // player with adjusted boundaries and added animation objects
    creature = new PlayerFigure("player", 310, 350, 160, 110, "images/playerSpriteSheet.png");
    creature.setObjectBoundaryOffsets(20, -20, 10, -15);
    creature.addAnimationObjects("runRight", 6, 11);
    creature.addAnimationObjects("runLeft", 12, 17);
    creature.addAnimationObjects("idleRight", 0, 0);
    creature.addAnimationObjects("idleLeft", 1, 1);
    creature.addAnimationObjects("jumpUpRight", 2, 2);
    creature.addAnimationObjects("fallDownRight", 4, 4);
    creature.addAnimationObjects("jumpUpLeft", 3, 3);
    creature.addAnimationObjects("fallDownLeft", 5, 5);

    // scroller borders
    moveLeft = new ScrollerBorder("moveLeft", 300, -1100, 0.1, 1700);
    moveRight = new ScrollerBorder("moveRight", 900, -1100, 0.1, 1700);
    moveUp = new ScrollerBorder("moveUp", 0, 100, 5200, 0.1);
    moveDown = new ScrollerBorder("moveDown", 0, 510, 5200, 0.1);

    // orange berries
    new OrangeBerry("orangeBerry", 1850, 380, 60, 60, "images/orangeBerryAnimation.png");
    new OrangeBerry("orangeBerry", 220, -400, 60, 60, "images/orangeBerryAnimation.png");
    new OrangeBerry("orangeBerry", 1760, -980, 60, 60, "images/orangeBerryAnimation.png");
    new OrangeBerry("orangeBerry", 3160, -870, 60, 60, "images/orangeBerryAnimation.png");
    new OrangeBerry("orangeBerry", 1390, -210, 60, 60, "images/orangeBerryAnimation.png");
    new OrangeBerry("orangeBerry", 2450, -150, 60, 60, "images/orangeBerryAnimation.png");
    new OrangeBerry("orangeBerry", 4670, -160, 60, 60, "images/orangeBerryAnimation.png");
    new OrangeBerry("orangeBerry", 3720, 340, 60, 60, "images/orangeBerryAnimation.png");

    // purple berries
    new PurpleBerry("purpleBerry", 670, 150, 60, 60, "images/purpleBerryAnimation.png");
    new PurpleBerry("purpleBerry", 2840, -290, 60, 60, "images/purpleBerryAnimation.png");
    new PurpleBerry("purpleBerry", 370, -700, 60, 60, "images/purpleBerryAnimation.png");
    new PurpleBerry("purpleBerry", 2020, -800, 60, 60, "images/purpleBerryAnimation.png");
    new PurpleBerry("purpleBerry", 4330, -840, 60, 60, "images/purpleBerryAnimation.png");
    new PurpleBerry("purpleBerry", 4940, 230, 60, 60, "images/purpleBerryAnimation.png");
    new PurpleBerry("purpleBerry", 1750, -50, 60, 60, "images/purpleBerryAnimation.png");
    new PurpleBerry("purpleBerry", 3340, 080, 60, 60, "images/purpleBerryAnimation.png");

    // score display showing how many are collected and how many there are
    berryScoreText.innerHTML = `${berryScore} / ${purpleBerries.length}`;

    // inactive berryshrub so it still works with the panning movement but is not drawn
    berryShrub = new BerryShrub("berryShrub", 4820, -640, 140, 175, "images/berryShrub.png");
    berryShrub.isActive = false;
    berryShrub.setObjectBoundaryOffsets(20, -20, 0, -10);

    // gameLoop can start
    gameManager.gameEnded = false;
    berryScore = 0;
    requestAnimationFrame(gameManager.gameLoop);
}

function displayTutorial() {
    // change of diplayed DOM elements
    gameContainer.style.display = "none";
    scoreDisplay.style.display = "none";
    levelNumber.style.display = "none";
    tutorialBtn.style.display = "none";

    // new background image
    screens.style.display = "flex";
    screens.style.backgroundImage = "url(images/tutorialScreen.png)"
}

function displayWinningScreen() {
    // change of diplayed DOM elements
    gameContainer.style.display = "none";
    score.style.display = "none";
    levelNumber.style.display = "none";

    // new background image
    screens.style.display = "flex";
    screens.style.backgroundImage = "url(images/winScreenAnimation.gif)";

    // all buttons visible
    tutorialBtn.style.display = "inline";
    startBtn.style.display = "inline";
}

function displayGameOverScreen() {
    // change of diplayed DOM elements
    gameContainer.style.display = "none";
    score.style.display = "none";
    levelNumber.style.display = "none";

    // new background image
    screens.style.display = "flex";
    screens.style.backgroundImage = "url(images/gameOverScreenAnimation.gif)"

    // all buttons visible
    tutorialBtn.style.display = "inline";
    startBtn.style.display = "inline";
}
