document.addEventListener('DOMContentLoaded', init);
const addTrucksandCabs = require("./truck.js");
const addPedestrians = require("./pedestrian.js");

let stage, width, height, loader;
let rat, background, truck, cab, pedestrian, gameover;

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

  stage.addChild(background, rat, pedestrian);
  addPedestrians(stage, loader);
  addTrucksandCabs(stage, loader);
  gameOverText(loader);

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
    return;
  case "ArrowRight":
    rat.gotoAndPlay("right");
    if(rat.x < width - 60) rat.x += 60;
    return;
  case "ArrowDown":
    rat.gotoAndPlay("down");
    if(rat.y < height - 60) rat.y += 60;
    return;
  case "ArrowLeft":
    rat.gotoAndPlay("left");
    if(rat.x >= 60) rat.x -= 60;
    return;
  }
}


function tick(event) {

  stage.update(event);
  // debugger
  pedestrian = stage.getChildAt(2);
  if (pedestrian.x > 800) {
    pedestrian.x = -50;
  }
  pedestrian.x += 6;

  moveTrucks();

}

function moveTrucks() {
  let l = stage.getNumChildren();
  for (var i = 3; i < l; i++) {
		truck = stage.getChildAt(i);
		truck.x = (truck.x + truck.velX);
    // let point = truck.localToLocal(0, 0, rat);
    if (checkRatCollision(truck)) {
      console.log("hit by truck");
    }
    if (truck.x > 880 ) truck.x = -100;
    if (truck.x < -100) truck.x = 880;
	}
}

function checkRatCollision(obstical) {
  const ratLeft = rat.x + 15;
  const ratRight = rat.x + 45;
  const ratTop = rat.y;
  const ratBottom = rat.y + 60;
  const obsticalLeft = obstical.x;
  const obsticalRight = obstical.x + obstical.width;
  const obsticalTop = obstical.y;
  const obsticalBottom = obstical.y + obstical.height;
  if (ratLeft < obsticalRight && ratRight > obsticalLeft &&
      ratTop < obsticalBottom && ratBottom > obsticalTop){
    return true;
  } else {
    return false;
  }
}

function init() {
  const canvas = document.getElementById("ratterCanvas");
  stage = new createjs.Stage(canvas);

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
