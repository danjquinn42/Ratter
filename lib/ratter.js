document.addEventListener('DOMContentLoaded', init);
const addTrucksandCabs = require("./truck.js");
const addPedestrians = require("./pedestrian.js");
const addTrashCans = require("./trashCans.js");

let stage, width, height, loader;
let rat, background, trashCans, trucks;
let score, alive;
let count = { trucks: 0, pedestrians: 0, firstChildren: 0 };
let scoreBoard = {};

const handleComplete = () => {

width = 780;
height = 600;
background = new createjs.Shape();
background.graphics.beginBitmapFill(loader.
  getResult("background")).
  drawRect(0, 0, width, height);


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

  const ScoreSpriteSheet = new createjs.SpriteSheet({
    framerate: 20,
    "images": [loader.getResult("numbers")],
    "frames": {"regX": 0, "height": 33, "count": 10, "regY": 0, "width": 24},
    "animations": {
      "0": [0], "1": [1], "2": [2], "3": [3], "4": [4],
       "5": [5], "6": [6], "7": [7], "8": [8], "9": [9]
    }
  });

  scoreBoard = { ones: {}, tens: {}, hundreds: {}, thousands: {} };

  scoreBoard.ones = new createjs.Sprite(ScoreSpriteSheet);
  scoreBoard.ones.x = 572;
  scoreBoard.tens = new createjs.Sprite(ScoreSpriteSheet);
  scoreBoard.tens.x = 548;
  scoreBoard.hundreds = new createjs.Sprite(ScoreSpriteSheet);
  scoreBoard.hundreds.x = 524;
  scoreBoard.thousands = new createjs.Sprite(ScoreSpriteSheet);
  scoreBoard.thousands.x = 500;

  stage.addChild(background, rat);
  count.firstChildren = 2;
  trucks = addTrucksandCabs(stage, loader, count.trucks);
  addPedestrians(stage, loader, count);
  trashCans = addTrashCans(stage, loader);
  stage.addChild(scoreBoard.ones, scoreBoard.tens, scoreBoard.hundreds, scoreBoard.thousands);


  window.addEventListener("keydown", scurry);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);

};

function scurry() {
  event.preventDefault();
  switch (event.key) {
  case "ArrowUp":
    rat.gotoAndPlay("up");
    if(rat.y > 60) {
      rat.y -= 60;
      score += 50;
    }
    return;
  case "ArrowRight":
    rat.gotoAndPlay("right");
    if(rat.x < width - 60) rat.x += 60;
    return;
  case "ArrowDown":
    rat.gotoAndPlay("down");
    if(rat.y < height - 60) {
      rat.y += 60;
      score -= 50;
    }
    return;
  case "ArrowLeft":
    rat.gotoAndPlay("left");
    if(rat.x >= 60) rat.x -= 60;
    return;
  }
}

function sort(a, b) {
  if (a > b) return 1;
  if (a === b) return 0;
  if (a < b) return -1;
}


function tick(event) {
  if (alive) {
    stage.update(event);
    movePedestrians();
    moveTrucks();
    if (ratIsSafe()){
      score += 600;
      addPedestrians(stage, loader, count, false);
      count.pedestrians += 3;
      trucks.forEach((truck) => {
        truck.velX *= 1.1;
      });
      rat.x = 300;
      rat.y = 540;
    }
    adjustScore();
  } else {
    stage.clear();
    init();
  }
}

function ratIsSafe(){
  let safe = false;
  trashCans.forEach((trash) => {
    if (checkRatCollision(trash)) {
      if (trash.currentAnimation === "empty"){
        trash.gotoAndStop("full");
        safe = true;
      }
    }
  });
  return safe;
}

function adjustScore() {
  let scoreDigits = score.toString().split('').map(Number);
  while (scoreDigits.length < 4){
    scoreDigits.unshift(0);
  }
  scoreBoard.ones.gotoAndStop(scoreDigits[3]);
  scoreBoard.tens.gotoAndStop(scoreDigits[2]);
  scoreBoard.hundreds.gotoAndStop(scoreDigits[1]);
  scoreBoard.thousands.gotoAndStop(scoreDigits[0]);
}

function movePedestrians() {
  for (let i = count.trucks + count.firstChildren;
    i < count.trucks + count.pedestrians + count.firstChildren;
    ++i){
    let pedestrian = stage.getChildAt(i);
    if (checkRatCollision(pedestrian)){
      alive = false;
    }
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
  for (let i = count.trucks + count.firstChildren;
     i < count.trucks + count.pedestrians + count.firstChildren;
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
  for (let i = count.firstChildren; i < count.trucks + count.firstChildren; ++i) {
		let truck = stage.getChildAt(i);
		truck.x = (truck.x + truck.velX);
    const adjustment = (truck.vel < 0 ? truck.width : 0);
    if (checkRatCollision(truck, adjustment)){
      alive = false;
    }
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
  count.trucks = 10;
  count.pedestrians = 5;

  width = stage.canvas.width;
  height = stage.canvas.height;

  const manifest = [ {src: "rat.png", id: "rat"},
    {src: "background.png", id: "background"},
    {src: "truck.png", id: "truck"},
    {src: "cab.png", id: "cab"},
    {src: "pedestrian.png", id: "pedestrian"},
    {src: "numbers.png", id: "numbers"},
    {src: "trash.png", id: "trash"}
  ];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "./app/assets/images/");


  stage.update();
}
