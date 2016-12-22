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
/***/ function(module, exports) {

	document.addEventListener('DOMContentLoaded', init);
	
	let stage, width, height, loader;
	let rat;
	
	const handleComplete = () => {
	  // rat = new createjs.Shape();
	  // rat.graphics.beginBitmapFill(loader.getResult("rat")).drawRect(0, 0, 60, 60);
	
	  const SpriteSheet = new createjs.SpriteSheet({
	    framerate: 20,
	    "images": [loader.getResult("rat")],
	    "frames": { "regX": 0, "height": 60, "count": 16, "regY": 0, "width": 60 },
	    "animations": {
	      "down": [0, 3],
	      "left": [4, 7],
	      "up": [8, 11],
	      "right": [12, 15]
	    }
	  });
	
	  rat = new createjs.Sprite(SpriteSheet, "up");
	  rat.x = 250;
	  rat.y = 500;
	
	  stage.addChild(rat);
	
	  stage.addEventListener("keydown", scurry);
	
	  createjs.Ticker.timingMode = createjs.Ticker.RAF;
	  createjs.Ticker.addEventListener("tick", tick);
	
	  // stage.update();
	};
	
	function scurry() {
	  console.log(event.target.value);
	}
	
	function tick(event) {
	  stage.update(event);
	}
	
	function init() {
	  const canvas = document.getElementById("ratterCanvas");
	  stage = new createjs.Stage(canvas);
	
	  width = stage.canvas.width;
	  height = stage.canvas.height;
	
	  const manifest = [{ src: "rat.png", id: "rat" }];
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map