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
	const pedestrianAdder = __webpack_require__(3);
	const addTrashCans = __webpack_require__(4);
	const addRat = __webpack_require__(5);
	const addScoreBoard = __webpack_require__(6);
	
	let stage, loader;
	let addPedestrians;
	let state;
	
	function scurry() {
	  switch (event.key) {
	    case "ArrowUp":
	      event.preventDefault();
	      state.rat.gotoAndPlay("up");
	      if (state.rat.y > 60) {
	        state.rat.y -= 60;
	        state.score += 50;
	      }
	      return;
	    case "ArrowRight":
	      event.preventDefault();
	      state.rat.gotoAndPlay("right");
	      if (state.rat.x < stage.canvas.width - 60) state.rat.x += 60;
	      return;
	    case "ArrowDown":
	      event.preventDefault();
	      state.rat.gotoAndPlay("down");
	      if (state.rat.y < stage.canvas.height - 60) {
	        state.rat.y += 60;
	        state.score -= 50;
	      }
	      return;
	    case "ArrowLeft":
	      event.preventDefault();
	      state.rat.gotoAndPlay("left");
	      if (state.rat.x >= 60) state.rat.x -= 60;
	      return;
	  }
	}
	
	function tick(event) {
	  if (state.alive) {
	    stage.update(event);
	    movePedestrians();
	    moveTrucks();
	    if (ratIsSafe()) {
	      state.score += 600;
	      addPedestrians(3);
	      state.trucks.forEach(truck => {
	        truck.velX *= 1.1;
	      });
	      state.rat.x = 300;
	      state.rat.y = 540;
	    }
	    adjustScore();
	  } else {
	    state.trucks = [];
	    stage.removeAllChildren();
	    stage.clear();
	    init();
	  }
	}
	
	function ratIsSafe() {
	  let safe = false;
	  state.trashCans.forEach(trash => {
	    if (checkRatCollision(trash)) {
	      if (trash.currentAnimation === "empty") {
	        trash.gotoAndStop("full");
	        safe = true;
	      }
	    }
	  });
	  return safe;
	}
	
	function adjustScore() {
	  let scoreDigits = state.score.toString().split('').map(Number);
	  while (scoreDigits.length < 4) {
	    scoreDigits.unshift(0);
	  }
	  state.scoreBoard.ones.gotoAndStop(scoreDigits[3]);
	  state.scoreBoard.tens.gotoAndStop(scoreDigits[2]);
	  state.scoreBoard.hundreds.gotoAndStop(scoreDigits[1]);
	  state.scoreBoard.thousands.gotoAndStop(scoreDigits[0]);
	}
	
	function movePedestrians() {
	  state.pedestrians.forEach(pedestrian => {
	    if (checkRatCollision(pedestrian)) {
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
	  state.pedestrians.forEach(obstical => {
	    const pedestrianLeft = pedestrian.x;
	    const pedestrianRight = pedestrian.x + 27;
	    const pedestrianTop = pedestrian.y;
	    const pedestrianBottom = pedestrian.y + 27;
	    const obsticalLeft = obstical.x;
	    const obsticalRight = obstical.x + 27;
	    const obsticalTop = obstical.y;
	    const obsticalBottom = obstical.y + 27;
	    if (pedestrianLeft < obsticalRight && pedestrianRight > obsticalLeft && pedestrianTop < obsticalBottom && pedestrianBottom > obsticalTop && pedestrian.vel > obstical.vel) {
	      blocked = true;
	    }
	  });
	  return blocked;
	}
	
	function moveTrucks() {
	  state.trucks.forEach(truck => {
	    truck.x = truck.x + truck.velX;
	    const adjustment = truck.vel < 0 ? truck.width : 0;
	    if (checkRatCollision(truck, adjustment)) {
	      state.alive = false;
	    }
	    if (truck.x > 880) truck.x = -100;
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
	  if (ratLeft < obsticalRight && ratRight > obsticalLeft && ratTop < obsticalBottom && ratBottom > obsticalTop) {
	
	    return true;
	  } else {
	    return false;
	  }
	}
	
	function startGame() {
	  state.score = 0;
	  state.alive = true;
	
	  addRat(state);
	  addScoreBoard(state);
	  addTrucksandCabs(state, 10);
	  addPedestrians = pedestrianAdder(state);
	  addPedestrians(5);
	  addTrashCans(state);
	
	  window.addEventListener("keydown", scurry);
	
	  createjs.Ticker.timingMode = createjs.Ticker.RAF;
	  createjs.Ticker.addEventListener("tick", tick);
	}
	
	const handleComplete = () => {
	  let width = stage.canvas.width;
	  let height = stage.canvas.height;
	  let background = new createjs.Shape();
	  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0, 0, width, height);
	
	  let title = new createjs.Text("RATTER", "80px 'VT323', monospace", "#bb3333");
	  // let title = new createjs.Shape();
	  // let titleImage = loader.getResult("title");
	  // title.graphics.beginBitmapFill(titleImage).
	  //   drawRect(0, 0, titleImage.width, titleImage.height);
	  title.regX = title.width / 2;
	  title.x = 200;
	  title.y = 200;
	
	  // let startButton = new createjs.Shape();
	  // let startButtonImage = loader.getResult("startbutton");
	  // startButton.graphics.beginBitmapFill(startButtonImage).
	  //   drawRect(0, 0, startButtonImage.width, startButtonImage.height);
	  // startButton.regX = startButtonImage.width / 2;
	  // startButton.x = 390;
	  // startButton.y = 400;
	
	  stage.addChild(background, title);
	  stage.update();
	};
	
	function init() {
	  const canvas = document.getElementById("ratterCanvas");
	  stage = new createjs.Stage(canvas);
	
	  const manifest = [{ src: "rat.png", id: "rat" }, { src: "background.png", id: "background" }, { src: "truck.png", id: "truck" }, { src: "cab.png", id: "cab" }, { src: "pedestrian.png", id: "pedestrian" }, { src: "numbers.png", id: "numbers" }, { src: "trash.png", id: "trash" }, { src: "title.png", id: "title" }, { src: "startbutton.png", id: "startbutton" }];
	
	  loader = new createjs.LoadQueue(false);
	  loader.addEventListener("complete", handleComplete);
	  loader.loadManifest(manifest, true, "./app/assets/images/");
	
	  state = { stage: stage, loader: loader };
	  stage.update();
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const shuffle = __webpack_require__(2);
	
	function addTrucksandCabs(state, count) {
	  let { stage, loader } = state;
	  let truck;
	  state.trucks = [];
	  let positions = [];
	
	  let truckPositions = [];
	
	  for (let i = 0; i < 8; ++i) {
	    truckPositions.push([i * 110, 310]);
	    truckPositions.push([i * 110, 370]);
	    truckPositions.push([i * 110, 436]);
	    truckPositions.push([i * 110, 496]);
	  }
	
	  shuffle(truckPositions);
	
	  for (let i = 0; i < count; ++i) {
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
	      truck.velX = 1.5;
	    }
	    stage.addChild(truck);
	    state.trucks.push(truck);
	  }
	  // return trucks;
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
	// let pedestrians = [];
	let pedestrian;
	
	function pedestrianAdder(state) {
	  let { stage, loader } = state;
	  state.pedestrians = [];
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
	
	  for (let xPos = 0; xPos <= 780; xPos += 30) {
	    for (let yPos = 100; yPos < 280; yPos += 30) {
	      positions.push([xPos, yPos]);
	    }
	  }
	
	  shuffle(positions);
	
	  return count => {
	    addPedestrians(state, count);
	  };
	}
	
	function addPedestrians(state, count) {
	  let { stage, loader } = state;
	  for (let i = 0; i < count; ++i) {
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
	    state.pedestrians.push(pedestrian);
	  }
	}
	
	module.exports = pedestrianAdder;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function addTrashCans(state) {
	  let { stage, loader } = state;
	  state.trashCans = [];
	  for (let i = 0; i < 6; ++i) {
	    const TrashSpriteSheet = new createjs.SpriteSheet({
	      framerate: 20,
	      "images": [loader.getResult("trash")],
	      frames: { "redX": 0,
	        "height": 60,
	        "count": 2,
	        "regY": 27,
	        "width": 54
	      },
	      "animations": {
	        "full": [0],
	        "empty": [1]
	      }
	    });
	
	    let trash = new createjs.Sprite(TrashSpriteSheet, "empty");
	    trash.width = 54;
	    trash.height = 60;
	    trash.x = 120 * i + 64;
	    trash.y = 60;
	    stage.addChild(trash);
	
	    state.trashCans.push(trash);
	  }
	  // return trashCans;
	}
	
	module.exports = addTrashCans;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function addRat(state) {
	  let { stage, loader } = state;
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
	
	  state.rat = new createjs.Sprite(RatSpriteSheet, "up");
	  state.rat.x = 300;
	  state.rat.y = 540;
	
	  stage.addChild(state.rat);
	}
	
	module.exports = addRat;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function addScoreBoard(state) {
	  let { stage, loader } = state;
	  const ScoreSpriteSheet = new createjs.SpriteSheet({
	    framerate: 20,
	    "images": [loader.getResult("numbers")],
	    "frames": { "regX": 0, "height": 33, "count": 10, "regY": 0, "width": 24 },
	    "animations": {
	      "0": [0], "1": [1], "2": [2], "3": [3], "4": [4],
	      "5": [5], "6": [6], "7": [7], "8": [8], "9": [9]
	    }
	  });
	
	  state.scoreBoard = { ones: {}, tens: {}, hundreds: {}, thousands: {} };
	
	  state.scoreBoard.ones = new createjs.Sprite(ScoreSpriteSheet);
	  state.scoreBoard.ones.x = 572;
	  state.scoreBoard.tens = new createjs.Sprite(ScoreSpriteSheet);
	  state.scoreBoard.tens.x = 548;
	  state.scoreBoard.hundreds = new createjs.Sprite(ScoreSpriteSheet);
	  state.scoreBoard.hundreds.x = 524;
	  state.scoreBoard.thousands = new createjs.Sprite(ScoreSpriteSheet);
	  state.scoreBoard.thousands.x = 500;
	  // debugger;
	  stage.addChild(state.scoreBoard.ones, state.scoreBoard.tens, state.scoreBoard.hundreds, state.scoreBoard.thousands);
	
	  // return scoreBoard;
	}
	
	module.exports = addScoreBoard;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map