document.addEventListener('DOMContentLoaded', init);
const addTrucksandCabs = require("./truck.js");
const pedestrianAdder = require("./pedestrian.js");
const addTrashCans = require("./trashCans.js");
const addRat = require("./rat.js");
const addScoreBoard = require("./scoreboard.js");

let stage, loader;
let addPedestrians;
let state;

function scurry() {
  switch (event.key) {
  case "ArrowUp":
    event.preventDefault();
    state.rat.gotoAndPlay("up");
    if(state.rat.y > 60) {
      state.rat.y -= 60;
      state.score += 50;
    }
    return;
  case "ArrowRight":
    event.preventDefault();
    state.rat.gotoAndPlay("right");
    if(state.rat.x < stage.canvas.width - 60) state.rat.x += 60;
    return;
  case "ArrowDown":
    event.preventDefault();
    state.rat.gotoAndPlay("down");
    if(state.rat.y < stage.canvas.height - 60) {
      state.rat.y += 60;
      state.score -= 50;
    }
    return;
  case "ArrowLeft":
    event.preventDefault();
    state.rat.gotoAndPlay("left");
    if(state.rat.x >= 60) state.rat.x -= 60;
    return;
  case "Space":
    startGame();
  }
}

function tick(event) {
  if (state.alive) {
    stage.update(event);
    movePedestrians();
    moveTrucks();
    if (ratIsSafe()){
      state.score += 600;
      addPedestrians(3);
      state.trucks.forEach((truck) => {
        truck.velX *= 1.1;
      });
      state.rat.x = 300;
      state.rat.y = 540;
    }
    adjustScore();
  } else {
    stage.removeAllChildren();
    stage.clear();
    state = {stage: stage, loader: loader};
    startGame();
  }
}

function ratIsSafe(){
  let safe = false;
  state.trashCans.forEach((trash) => {
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
  let scoreDigits = state.score.toString().split('').map(Number);
  while (scoreDigits.length < 4){
    scoreDigits.unshift(0);
  }
  state.scoreBoard.ones.gotoAndStop(scoreDigits[3]);
  state.scoreBoard.tens.gotoAndStop(scoreDigits[2]);
  state.scoreBoard.hundreds.gotoAndStop(scoreDigits[1]);
  state.scoreBoard.thousands.gotoAndStop(scoreDigits[0]);
}

function movePedestrians() {
  state.pedestrians.forEach((pedestrian) => {
    if (checkRatCollision(pedestrian)){
      state.alive = false;
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
  });
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
  state.pedestrians.forEach((obstical) => {
    const pedestrianLeft = pedestrian.x;
    const pedestrianRight = pedestrian.x + 27;
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
    });
  return blocked;
}

function moveTrucks() {
  state.trucks.forEach((truck) => {
		truck.x = (truck.x + truck.velX);
    const adjustment = (truck.vel < 0 ? truck.width : 0);
    if (checkRatCollision(truck, adjustment)){
      state.alive = false;
    }
    if (truck.x > 880 ) truck.x = -100;
    if (truck.x < -100) truck.x = 880;
  });
}

function checkRatCollision(obstical, adjustment = 0) {
  const ratLeft = state.rat.x + 15;
  const ratRight = state.rat.x + 45;
  const ratTop = state.rat.y;
  const ratBottom = state.rat.y + 60;

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

function startGame() {
  stage.removeAllChildren();

  let title = new createjs.Text("RATTER", "40px 'VT323', monospace", "#d33");
  title.regX = title.width / 2;
  title.x = 10;
  title.y = -5;

  let width = stage.canvas.width;
  let height = stage.canvas.height;
  let background = new createjs.Shape();
  background.graphics.beginBitmapFill(loader.
    getResult("background")).
    drawRect(0, 0, width, height);

  stage.addChild(background, title);

  state.score = 0;
  state.alive = true;

  addRat(state);
  addScoreBoard(state);
  addTrucksandCabs(state, 14);
  addPedestrians = pedestrianAdder(state);
  addPedestrians(5);
  addTrashCans(state);

  window.addEventListener("keydown", scurry);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
}

const handleComplete = () => {

  let title = new createjs.Text("RATTER", "80px 'VT323', monospace", "#d33");
  title.regX = title.width / 2;
  title.x = 290;
  title.y = 200;
  var graphics = new createjs.Graphics().beginFill("#333").drawRect(0, 0, 306, 65);
  let startButton = new createjs.Shape(graphics)
  // startButton.drawRect(0, 0, 400, 100);
  let start = new createjs.Text("Click To Start", "40px 'VT323', monospace", "#999");
  start.regX = start.width / 2;
  start.x = 260;
  start.y = 300;
  startButton.x = 240;
  startButton.y = 290;

  stage.addChild(title, startButton, start);
  stage.update();
  stage.addEventListener("click", startGame);
};

function init() {
  const canvas = document.getElementById("ratterCanvas");
  stage = new createjs.Stage(canvas);

  const manifest = [ {src: "rat.png", id: "rat"},
    {src: "background.png", id: "background"},
    {src: "truck.png", id: "truck"},
    {src: "cab.png", id: "cab"},
    {src: "pedestrian.png", id: "pedestrian"},
    {src: "numbers.png", id: "numbers"},
    {src: "trash.png", id: "trash"},
    {src: "title.png", id: "title"},
    {src: "startbutton.png", id: "startbutton"}
  ];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "./app/assets/images/");

  state = {stage: stage, loader: loader};
  stage.update();
}
