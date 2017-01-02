const shuffle = require("./shuffle.js");

function addPedestrians(stage, loader) {
  let pedestrian;

  const PedestrianSpriteSheet = new createjs.SpriteSheet({
    framerate: 20,
    "images": [loader.getResult("pedestrian")],
    "frames": {"regX": 0,
     "height": 27,
      "count": 32,
       "regY": 0,
       "width": 27},
    "animations": {
      "left": [0, 7, "left"],
      "right": [8, 15],
      "down": [16, 23],
      "up": [24, 31]
    }
  });

  let positions = [];
  for (let xPos = 0; xPos <= 780; xPos += 30){
    for(let yPos = 100; yPos < 280; yPos +=30 ){
      positions.push([xPos, yPos]);
    }
  }

  shuffle(positions);

  for (let i = 0; i < 20; ++i){
    pedestrian = new createjs.Sprite(PedestrianSpriteSheet, "right");
    const pos = positions.pop();
    stage.addChild(pedestrian);
    pedestrian.x = pos[0];
    pedestrian.y = pos[1];
    pedestrian.width = 27;
    pedestrian.vel = Math.floor(Math.random() * 3) + 1;
    let multiplier = Math.floor(Math.random() *2);
    if (multiplier === 0) multiplier = -1;
    pedestrian.prefersUp = (Math.floor(Math.random() *2) === 0);
    pedestrian.vel *= multiplier;
  }


  return pedestrian;
}


module.exports = addPedestrians;
