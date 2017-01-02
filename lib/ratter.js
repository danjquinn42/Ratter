document.addEventListener('DOMContentLoaded', init);
const addTrucksandCabs = require("./truck.js");
const addPedestrians = require("./pedestrian.js");

let stage, width, height, loader;
let rat, background, cab, gameover;
let score, alive;
let truckCount, pedestrianCount, firstChildren;

const handleComplete = () => {
  // rat = new createjs.Shape();
  // rat.graphics.beginBitmapFill(loader.getResult("rat")).drawRect(0, 0, 60, 60);
  width = 780;
  height = 600;
  background = new createjs.Shape();
  background.graphics.beginBitmapFill(loader.
    getResult("background")).
    drawRect(0, 0, width, height);

  // road.y = 260;


  const RatSpriteSheet = new createjs.SpriteSheet({
    framerate: 20,
    "images": [loader.getResult("rat")],
    "frames": {"regX": 0, "height": 60, "count": 16, "regY": 0, "width": 60},
    "animations": {
      "down": [0, 3, "standdown"],
      "left": [4, 7, "standup"],
      "up": [8, 11, "standup"],
      "right": [12, 15, "standup"],
      "standup": {frames: [8, 11], speed: 0.2},
      "standdown": {frames: [0, 3], speed: 0.2},
    }
  });

  rat = new createjs.Sprite(RatSpriteSheet, "up");
  rat.x = 300;
  rat.y = 540;

  stage.addChild(background, rat);
  firstChildren = 2;
  addTrucksandCabs(stage, loader, truckCount);
  addPedestrians(stage, loader, pedestrianCount);
  // gameOverText(loader);

  window.addEventListener("keydown", scurry);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);

};

function gameOverText(loader) {
  gameover = new createjs.Shape();
  gameover.graphics.beginBitmapFill(loader.
    getResult("gameover")).
    drawRect(0, 0, 200, 120);
    gameover.x = 350;
    gameover.y = 250;
    gameover.alpha = 0;
    stage.addChild(gameover);

}

function scurry() {
  event.preventDefault();
  switch (event.key) {
  case "ArrowUp":
    rat.gotoAndPlay("up");
    if(rat.y > 0) rat.y -= 60;
    score += 20;
    return;
  case "ArrowRight":
    rat.gotoAndPlay("right");
    if(rat.x < width - 60) rat.x += 60;
    score -= 2;
    return;
  case "ArrowDown":
    rat.gotoAndPlay("down");
    if(rat.y < height - 60) rat.y += 60;
    score -= 5;
    return;
  case "ArrowLeft":
    rat.gotoAndPlay("left");
    if(rat.x >= 60) rat.x -= 60;
    score -= 2;
    return;
  case "Enter":
    if (pedestrianCount < 30){
      addPedestrians(stage, loader, pedestrianCount, false);
      pedestrianCount += 4;
    }
    return;
  }
}


function tick(event) {
  if (alive) {
    stage.update(event);
    movePedestrians();
    moveTrucks();
  }
}

function movePedestrians() {
  for (let i = truckCount + firstChildren; i < stage.getNumChildren(); ++i){
    let pedestrian = stage.getChildAt(i);
    checkRatCollision(pedestrian);
    if (pathBlocked(pedestrian)) {
      stepAside(pedestrian);
    } else {
      pedestrian.x += pedestrian.vel;
      if (pedestrian.vel > 0) {
        pedestrian.direction = "right";
      } else {
        pedestrian.direction = "left";
      }
    }
    choosePedestrianAnimation(pedestrian);
    if (pedestrian.x < -30) {
      pedestrian.x = 810;
    } else if (pedestrian.x > 810) {
      pedestrian.x = -30;
    }
  }
}

function choosePedestrianAnimation(pedestrian) {
  if (pedestrian.currentAnimation !== pedestrian.direction) {
    pedestrian.gotoAndPlay(pedestrian.direction);
  }
}

function chooseAnimation(pedestrian) {
  if (pedestrian.vel > 0 && pedestrian.currentAnimation !== "right") {
    pedestrian.gotoAndPlay("right");
  } else if (pedestrian.vel < 0 &&
    pedestrian.currentAnimation !== "left") {
    pedestrian.gotoAndPlay("left");
  }
}

function stepAside(pedestrian) {
  if (pedestrian.y >= 280) {
    pedestrian.direction = "up";
    pedestrian.y -= Math.abs(pedestrian.vel);
    pedestrian.prefersUp = true;
  } else if (pedestrian.y <= 100) {
    pedestrian.direction = "down";
    pedestrian.y += Math.abs(pedestrian.vel);
    pedestrian.prefersUp = false;
  } else {
    if (pedestrian.prefersUp){
      pedestrian.direction = "up";
      pedestrian.y -= Math.abs(pedestrian.vel);
    } else {
      pedestrian.direction = "down";
      pedestrian.y += Math.abs(pedestrian.vel);
    }
  }
}

function pathBlocked(pedestrian){
  let blocked = false;
  for (let i = truckCount + firstChildren;
     i < truckCount + pedestrianCount + firstChildren;
      ++i){
    let obstical = stage.getChildAt(i);
    const offset = (pedestrian.vel > 0) ? 30 : -30;
    const pedestrianLeft = pedestrian.x + offset;
    const pedestrianRight = pedestrian.x + 27 + offset;
    const pedestrianTop = pedestrian.y;
    const pedestrianBottom = pedestrian.y + 27;
    const obsticalLeft = obstical.x;
    const obsticalRight = obstical.x + 27;
    const obsticalTop = obstical.y;
    const obsticalBottom = obstical.y + 27;
    if (pedestrianLeft < obsticalRight &&
        pedestrianRight > obsticalLeft &&
        pedestrianTop < obsticalBottom &&
        pedestrianBottom > obsticalTop &&
        pedestrian.vel > obstical.vel){
        blocked = true;
    }
  }
  return blocked;
}

function moveTrucks() {
  for (let i = 2; i < truckCount + firstChildren; ++i) {
		let truck = stage.getChildAt(i);
		truck.x = (truck.x + truck.velX);
    const adjustment = (truck.vel < 0 ? truck.width : 0);
    (checkRatCollision(truck, adjustment));
    if (truck.x > 880 ) truck.x = -100;
    if (truck.x < -100) truck.x = 880;
	}
}

function checkRatCollision(obstical, adjustment = 0) {
  const ratLeft = rat.x + 15;
  const ratRight = rat.x + 45;
  const ratTop = rat.y;
  const ratBottom = rat.y + 60;
  const obsticalLeft = obstical.x - adjustment;
  const obsticalRight = obstical.x + obstical.width - adjustment;
  const obsticalTop = obstical.y;
  const obsticalBottom = obstical.y + obstical.height;
  if (ratLeft < obsticalRight && ratRight > obsticalLeft &&
      ratTop < obsticalBottom && ratBottom > obsticalTop){
    alive = false;
    return true;
  } else {
    return false;
  }
}

function init() {
  const canvas = document.getElementById("ratterCanvas");
  stage = new createjs.Stage(canvas);
  score = 0;
  alive = true;
  truckCount = 15;
  pedestrianCount = 15;

  width = stage.canvas.width;
  height = stage.canvas.height;

  const manifest = [ {src: "rat.png", id: "rat"},
    {src: "background.png", id: "background"},
    {src: "truck.png", id: "truck"},
    {src: "gameover.png", id: "gameover"},
    {src: "cab.png", id: "cab"},
    {src: "pedestrian.png", id: "pedestrian"}
  ];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "./app/assets/images/");


  stage.update();
}
