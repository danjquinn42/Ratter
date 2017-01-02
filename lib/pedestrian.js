function addPedestrians(stage, loader) {
  let pedestrian;

  const PedestrianSpriteSheet = new createjs.SpriteSheet({
    framerate: 20,
    "images": [loader.getResult("pedestrian")],
    "frames": {"regX": 0, "height": 27, "count": 32, "regY": 0, "width": 27},
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
