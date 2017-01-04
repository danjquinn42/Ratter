function addRat(state) {
  let {stage, loader} = state;
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


  state.rat = new createjs.Sprite(RatSpriteSheet, "up");
  state.rat.x = 300;
  state.rat.y = 540;

  stage.addChild(state.rat);
}


module.exports = addRat;
