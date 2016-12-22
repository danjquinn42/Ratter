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
	const addTrucksandCabs = __webpack_require__(2);
	
	let stage, width, height, loader;
	let rat, background, truck, cab;
	
	const handleComplete = () => {
	  // rat = new createjs.Shape();
	  // rat.graphics.beginBitmapFill(loader.getResult("rat")).drawRect(0, 0, 60, 60);
	  background = new createjs.Shape();
	  background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0, 0, 720, 600);
	
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
	  rat.x = 250;
	  rat.y = 540;
	
	  stage.addChild(background, rat);
	  addTrucksandCabs(stage, loader);
	
	  window.addEventListener("keydown", scurry);
	
	  createjs.Ticker.timingMode = createjs.Ticker.RAF;
	  createjs.Ticker.addEventListener("tick", tick);
	};
	
	function scurry() {
	  event.preventDefault();
	  switch (event.key) {
	    case "ArrowUp":
	      rat.gotoAndPlay("up");
	      if (rat.y > 60) rat.y -= 60;
	      return;
	    case "ArrowRight":
	      rat.gotoAndPlay("right");
	      if (rat.x <= 700) rat.x += 60;
	      return;
	    case "ArrowDown":
	      rat.gotoAndPlay("down");
	      if (rat.y <= 500) rat.y += 60;
	      return;
	    case "ArrowLeft":
	      rat.gotoAndPlay("left");
	      if (rat.x >= 60) rat.x -= 60;
	      return;
	  }
	}
	
	function tick(event) {
	
	  stage.update(event);
	
	  let l = stage.getNumChildren();
	
	  // iterate through all the children and move them according to their velocity:
	  for (var i = 2; i < l; i++) {
	    truck = stage.getChildAt(i);
	    truck.x = truck.x + truck.velX;
	    if (truck.x > 880) truck.x = -100;
	    if (truck.x < -100) truck.x = 880;
	    if (truck.hitTest(rat.x, rat.y)) {
	      console.log("You Lose!");
	    }
	  }
	}
	
	function init() {
	  const canvas = document.getElementById("ratterCanvas");
	  stage = new createjs.Stage(canvas);
	
	  width = stage.canvas.width;
	  height = stage.canvas.height;
	
	  const manifest = [{ src: "rat.png", id: "rat" }, { src: "background.png", id: "background" }, { src: "truck.png", id: "truck" }, { src: "cab.png", id: "cab" }];
	
	  loader = new createjs.LoadQueue(false);
	  loader.addEventListener("complete", handleComplete);
	  loader.loadManifest(manifest, true, "./app/assets/images/");
	
	  // const ratData = {
	  //   images: ["./app/assets/images/rat.png"],
	  //   frames: {width:500, height:700},
	  //   // animations: {
	  //   //   stand:0,
	  //   //   run:[1,5],
	  //   //   jump:[6,8,"run"]
	  //   // }
	  // };
	  // const ratSprite = new createjs.Sprite(ratData, 0);
	
	
	  // let circle = new createjs.Shape();
	  // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	  // circle.x = 100;
	  // circle.y = 100;
	  // stage.addChild(circle);
	  stage.update();
	}

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	function addTrucksandCabs(stage, loader) {
	  let truck;
	  let positions = [];
	
	  for (let i = 0; i < 17; ++i) {
	    const truckImage = randomVehicle(loader);
	    truck = new createjs.Shape();
	    truck.graphics.beginBitmapFill(truckImage).drawRect(0, 0, truckImage.width, truckImage.height);
	
	    if (coinToss() === 0) {
	      truck.y = 310;
	      truck.velX = -2;
	    } else {
	      truck.scaleX = -1;
	      truck.y = 436;
	      truck.velX = 2;
	    }
	    truck.x = randomX();
	    truck.y = randomLane(truck);
	
	    while (positions.includes([truck.x, truck.y])) {
	      truck.x = randomX();
	      truck.y = randomLane(truck);
	    }
	
	    positions.push([truck.x, truck.y]);
	
	    stage.addChild(truck);
	  }
	}
	
	function randomLane(truck) {
	  return coinToss() === 0 ? truck.y : truck.y + 60;
	}
	
	function randomX() {
	  return Math.floor(Math.random() * 8) * 100;
	}
	
	function randomVehicle(loader) {
	  return coinToss() === 0 ? loader.getResult("truck") : loader.getResult("cab");
	}
	
	function coinToss() {
	  return Math.floor(Math.random() * 2);
	}
	
	module.exports = addTrucksandCabs;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map