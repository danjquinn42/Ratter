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
	const addPedestrians = __webpack_require__(2);
	
	let stage, width, height, loader;
	let rat, background, truck, cab, pedestrian, gameover;
	
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
	  gameover.graphics.beginBitmapFill(loader.getResult("gameover")).drawRect(0, 0, 200, 120);
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
	      if (rat.y > 0) rat.y -= 60;
	      return;
	    case "ArrowRight":
	      rat.gotoAndPlay("right");
	      if (rat.x < width - 60) rat.x += 60;
	      return;
	    case "ArrowDown":
	      rat.gotoAndPlay("down");
	      if (rat.y < height - 60) rat.y += 60;
	      return;
	    case "ArrowLeft":
	      rat.gotoAndPlay("left");
	      if (rat.x >= 60) rat.x -= 60;
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
	    truck.x = truck.x + truck.velX;
	    // let point = truck.localToLocal(0, 0, rat);
	    if (checkRatCollision(truck)) {
	      console.log("hit by truck");
	    }
	    if (truck.x > 880) truck.x = -100;
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
	  if (ratLeft < obsticalRight && ratRight > obsticalLeft && ratTop < obsticalBottom && ratBottom > obsticalTop) {
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
	
	  const manifest = [{ src: "rat.png", id: "rat" }, { src: "background.png", id: "background" }, { src: "truck.png", id: "truck" }, { src: "gameover.png", id: "gameover" }, { src: "cab.png", id: "cab" }, { src: "pedestrian.png", id: "pedestrian" }];
	
	  loader = new createjs.LoadQueue(false);
	  loader.addEventListener("complete", handleComplete);
	  loader.loadManifest(manifest, true, "./app/assets/images/");
	
	  stage.update();
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	function addTrucksandCabs(stage, loader) {
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
	
	  for (let i = 0; i < 17; ++i) {
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
	      truck.regX = truckImage.width / 2;
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
	
	function shuffle(arr) {
	  let j, x, i;
	  for (i = arr.length; i; i--) {
	    j = Math.floor(Math.random() * i);
	    x = arr[i - 1];
	    arr[i - 1] = arr[j];
	    arr[j] = x;
	  }
	}
	
	module.exports = addTrucksandCabs;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function addPedestrians(stage, loader) {
	  let pedestrian;
	
	  const PedestrianSpriteSheet = new createjs.SpriteSheet({
	    framerate: 20,
	    "images": [loader.getResult("pedestrian")],
	    "frames": { "regX": 0, "height": 27, "count": 32, "regY": 0, "width": 27 },
	    "animations": {
	      "left": [0, 7],
	      "right": [8, 15],
	      "down": [16, 23],
	      "up": [24, 31]
	    }
	  });
	
	  pedestrian = new createjs.Sprite(PedestrianSpriteSheet, "right");
	
	  stage.addChild(pedestrian);
	  pedestrian.x = 300;
	  pedestrian.y = 180;
	
	  return pedestrian;
	}
	
	module.exports = addPedestrians;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map