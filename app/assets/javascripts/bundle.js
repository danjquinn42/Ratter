/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	document.addEventListener('DOMContentLoaded', init);
	const addTrucksandCabs = __webpack_require__(1);
	const addPedestrians = __webpack_require__(3);
	
	let stage, width, height, loader;
	let rat, background, cab;
	let score, alive;
	let count = { trucks: 0, pedestrians: 0, firstChildren: 0 };
	let scoreBoard = {};
	
	const handleComplete = () => {
	  // rat = new createjs.Shape();
	  // rat.graphics.beginBitmapFill(loader.getResult("rat")).drawRect(0, 0, 60, 60);
	  width = 780;
	  height = 600;
	  background = new createjs.Shape();
	  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0, 0, width, height);
	
	  // road.y = 260;
	
	
	  const RatSpriteSheet = new createjs.SpriteSheet({
	    framerate: 20,
	    "images": [loader.getResult("rat")],
	    "frames": { "regX": 0, "height": 60, "count": 16, "regY": 0, "width": 60 },
	    "animations": {
	      "down": [0, 3, "standdown"],
	      "left": [4, 7, "standup"],
	      "up": [8, 11, "standup"],
	      "right": [12, 15, "standup"],
	      "standup": { frames: [8, 11], speed: 0.2 },
	      "standdown": { frames: [0, 3], speed: 0.2 }
	    }
	  });
	
	  rat = new createjs.Sprite(RatSpriteSheet, "up");
	  rat.x = 300;
	  rat.y = 540;
	
	  const ScoreSpriteSheet = new createjs.SpriteSheet({
	    framerate: 20,
	    "images": [loader.getResult("numbers")],
	    "frames": { "regX": 0, "height": 33, "count": 10, "regY": 0, "width": 24 },
	    "animations": {
	      "0": [0], "1": [1], "2": [2], "3": [3], "4": [4],
	      "5": [5], "6": [6], "seven": [7], "8": [8], "9": [9]
	    }
	  });
	
	  scoreBoard = { ones: {}, tens: {}, hundreds: {}, thousands: {} };
	
	  scoreBoard.ones = new createjs.Sprite(ScoreSpriteSheet);
	  scoreBoard.ones.x = 472;
	  scoreBoard.tens = new createjs.Sprite(ScoreSpriteSheet);
	  scoreBoard.tens.x = 448;
	  scoreBoard.hundreds = new createjs.Sprite(ScoreSpriteSheet);
	  scoreBoard.hundreds.x = 424;
	  scoreBoard.thousands = new createjs.Sprite(ScoreSpriteSheet);
	  scoreBoard.thousands.x = 400;
	
	  stage.addChild(background, rat);
	  count.firstChildren = 2;
	  addTrucksandCabs(stage, loader, count.trucks);
	  addPedestrians(stage, loader, count);
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
	      if (rat.y > 0) rat.y -= 60;
	      score += 2;
	      return;
	    case "ArrowRight":
	      rat.gotoAndPlay("right");
	      if (rat.x < width - 60) rat.x += 60;
	      return;
	    case "ArrowDown":
	      rat.gotoAndPlay("down");
	      if (rat.y < height - 60) rat.y += 60;
	      score -= 3;
	      return;
	    case "ArrowLeft":
	      rat.gotoAndPlay("left");
	      if (rat.x >= 60) rat.x -= 60;
	      return;
	    case "Enter":
	      if (count.pedestrians < 30) {
	        addPedestrians(stage, loader, count.pedestrians, false);
	        count.pedestrians += 4;
	        return;
	      }
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
	    adjustScore();
	  }
	}
	
	function adjustScore() {
	  if (score < 0) score = 0;
	  let scoreDigits = score.toString().split('').map(Number);
	  // let scoreDigits = score.toString().split("");
	  while (scoreDigits.length < 4) {
	    scoreDigits.unshift(0);
	  }
	  scoreBoard.ones.gotoAndStop(scoreDigits[3]);
	  scoreBoard.tens.gotoAndStop(scoreDigits[2]);
	  scoreBoard.hundreds.gotoAndStop(scoreDigits[1]);
	}
	
	function movePedestrians() {
	  for (let i = count.trucks + count.firstChildren; i < count.trucks + count.pedestrians + count.firstChildren; ++i) {
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
	    if (pedestrian.prefersUp) {
	      pedestrian.direction = "up";
	      pedestrian.y -= Math.abs(pedestrian.vel);
	    } else {
	      pedestrian.direction = "down";
	      pedestrian.y += Math.abs(pedestrian.vel);
	    }
	  }
	}
	
	function pathBlocked(pedestrian) {
	  let blocked = false;
	  for (let i = count.trucks + count.firstChildren; i < count.trucks + count.pedestrians + count.firstChildren; ++i) {
	    let obstical = stage.getChildAt(i);
	    const offset = pedestrian.vel > 0 ? 30 : -30;
	    const pedestrianLeft = pedestrian.x + offset;
	    const pedestrianRight = pedestrian.x + 27 + offset;
	    const pedestrianTop = pedestrian.y;
	    const pedestrianBottom = pedestrian.y + 27;
	    const obsticalLeft = obstical.x;
	    const obsticalRight = obstical.x + 27;
	    const obsticalTop = obstical.y;
	    const obsticalBottom = obstical.y + 27;
	    if (pedestrianLeft < obsticalRight && pedestrianRight > obsticalLeft && pedestrianTop < obsticalBottom && pedestrianBottom > obsticalTop && pedestrian.vel > obstical.vel) {
	      blocked = true;
	    }
	  }
	  return blocked;
	}
	
	function moveTrucks() {
	  for (let i = count.firstChildren; i < count.trucks + count.firstChildren; ++i) {
	    let truck = stage.getChildAt(i);
	    truck.x = truck.x + truck.velX;
	    const adjustment = truck.vel < 0 ? truck.width : 0;
	    checkRatCollision(truck, adjustment);
	    if (truck.x > 880) truck.x = -100;
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
	  if (ratLeft < obsticalRight && ratRight > obsticalLeft && ratTop < obsticalBottom && ratBottom > obsticalTop) {
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
	  count.trucks = 15;
	  count.pedestrians = 15;
	
	  width = stage.canvas.width;
	  height = stage.canvas.height;
	
	  const manifest = [{ src: "rat.png", id: "rat" }, { src: "background.png", id: "background" }, { src: "truck.png", id: "truck" }, { src: "cab.png", id: "cab" }, { src: "pedestrian.png", id: "pedestrian" }, { src: "numbers.png", id: "numbers" }];
	
	  loader = new createjs.LoadQueue(false);
	  loader.addEventListener("complete", handleComplete);
	  loader.loadManifest(manifest, true, "./app/assets/images/");
	
	  stage.update();
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const shuffle = __webpack_require__(2);
	
	function addTrucksandCabs(stage, loader, truckCount) {
	  let truck;
	  let positions = [];
	
	  let truckPositions = [];
	
	  for (let i = 0; i < 8; ++i) {
	    truckPositions.push([i * 110, 310]);
	    truckPositions.push([i * 110, 370]);
	    truckPositions.push([i * 110, 436]);
	    truckPositions.push([i * 110, 496]);
	  }
	
	  shuffle(truckPositions);
	
	  for (let i = 0; i < truckCount; ++i) {
	    const truckPos = truckPositions.pop();
	    const truckImage = randomVehicle(loader);
	    truck = new createjs.Shape();
	    truck.width = truckImage.width;
	    truck.height = truckImage.height;
	    truck.graphics.beginBitmapFill(truckImage).drawRect(0, 0, truck.width, truck.height);
	
	    truck.x = truckPos[0];
	    truck.y = truckPos[1];
	    if (truck.y < 400) {
	      truck.velX = -2;
	    } else {
	      truck.regX = truckImage.width;
	      truck.scaleX = -1;
	      truck.velX = 2;
	    }
	    stage.addChild(truck);
	  }
	}
	
	/////
	function randomLane(truck) {
	  return coinToss() === 0 ? truck.y : truck.y + 60;
	}
	
	function randomX() {
	  return Math.floor(Math.random() * 8) * 100;
	}
	
	function randomVehicle(loader) {
	  return coinToss() === 0 ? loader.getResult("cab") : loader.getResult("truck"); //TODO make truck
	}
	
	function coinToss() {
	  return Math.floor(Math.random() * 2);
	}
	
	function addTruck(stage, loader) {
	  let truck;
	
	  const truckImage = randomVehicle(loader);
	  truck = new createjs.Shape();
	  truck.width = truckImage.width;
	  truck.height = truckImage.height;
	  truck.graphics.beginBitmapFill(truckImage).drawRect(0, 0, truck.width, truck.height);
	}
	
	module.exports = addTrucksandCabs;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function shuffle(arr) {
	    let j, x, i;
	    for (i = arr.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = arr[i - 1];
	        arr[i - 1] = arr[j];
	        arr[j] = x;
	    }
	}
	
	module.exports = shuffle;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const shuffle = __webpack_require__(2);
	
	let PedestrianSpriteSheet;
	const positions = [];
	let pedestrian;
	
	function addPedestrians(stage, loader, count, first = true) {
	  PedestrianSpriteSheet = new createjs.SpriteSheet({
	    framerate: 20,
	    "images": [loader.getResult("pedestrian")],
	    "frames": { "regX": 0,
	      "height": 27,
	      "count": 32,
	      "regY": 0,
	      "width": 27 },
	    "animations": {
	      "left": [0, 7, "left"],
	      "right": [8, 15],
	      "down": [16, 23],
	      "up": [24, 31]
	    }
	  });
	
	  if (first) {
	    _initializePedestrians(stage, loader, count);
	  } else {
	    _addNewPedestrians(stage, loader, count);
	  }
	}
	
	function _addNewPedestrians(stage, loader, count) {
	  for (let i = 0; i < 4; ++i) {
	    pedestrian = new createjs.Sprite(PedestrianSpriteSheet, "right");
	    const pos = positions.pop();
	    stage.addChild(pedestrian);
	    const idx = count.firstChildren + count.trucks + count.pedestrians + i;
	    stage.setChildIndex(pedestrian, idx);
	    pedestrian.x = pos[0];
	    pedestrian.y = pos[1];
	    pedestrian.regX = 13;
	    pedestrian.width = 10;
	    pedestrian.height = 10;
	    pedestrian.vel = Math.floor(Math.random() * 3) + 1;
	    let multiplier = Math.floor(Math.random() * 2);
	    if (multiplier === 0) multiplier = -1;
	    pedestrian.prefersUp = Math.floor(Math.random() * 2) === 0;
	    pedestrian.vel *= multiplier;
	  }
	}
	
	function _initializePedestrians(stage, loader, count) {
	  for (let xPos = 0; xPos <= 780; xPos += 30) {
	    for (let yPos = 100; yPos < 280; yPos += 30) {
	      positions.push([xPos, yPos]);
	    }
	  }
	
	  shuffle(positions);
	
	  for (let i = 0; i < count.pedestrians; ++i) {
	    pedestrian = new createjs.Sprite(PedestrianSpriteSheet, "right");
	    const pos = positions.pop();
	    stage.addChild(pedestrian);
	    pedestrian.x = pos[0];
	    pedestrian.y = pos[1];
	    pedestrian.regX = 13;
	    pedestrian.width = 10;
	    pedestrian.height = 10;
	    pedestrian.vel = Math.floor(Math.random() * 3) + 1;
	    let multiplier = Math.floor(Math.random() * 2);
	    if (multiplier === 0) multiplier = -1;
	    pedestrian.prefersUp = Math.floor(Math.random() * 2) === 0;
	    pedestrian.vel *= multiplier;
	  }
	}
	
	module.exports = addPedestrians;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map