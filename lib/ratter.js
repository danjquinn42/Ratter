document.addEventListener('DOMContentLoaded', init);

let stage, width, height, loader;
let rat;

const handleComplete = () => {
  // rat = new createjs.Shape();
  // rat.graphics.beginBitmapFill(loader.getResult("rat")).drawRect(0, 0, 60, 60);

  const SpriteSheet = new createjs.SpriteSheet({
    framerate: 20,
    "images": [loader.getResult("rat")],
    "frames": {"regX": 0, "height": 60, "count": 16, "regY": 0, "width": 60},
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

  const manifest = [ {src: "rat.png", id: "rat"} ];

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
