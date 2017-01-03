const shuffle = require("./shuffle.js");

let PedestrianSpriteSheet;
const positions = [];
let pedestrian;

function addPedestrians(stage, loader, count, first = true) {
  PedestrianSpriteSheet = new createjs.SpriteSheet({
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

  if (first) {
    _initializePedestrians(stage, loader, count);
  } else {
    _addNewPedestrians(stage, loader, count);
  }
}

function _addNewPedestrians(stage, loader, count){
  for (let i = 0; i < 4; ++i){
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
    let multiplier = Math.floor(Math.random() *2);
    if (multiplier === 0) multiplier = -1;
    pedestrian.prefersUp = (Math.floor(Math.random() *2) === 0);
    pedestrian.vel *= multiplier;
  }
}

function _initializePedestrians(stage, loader, count){
  for (let xPos = 0; xPos <= 780; xPos += 30){
    for(let yPos = 100; yPos < 280; yPos +=30 ){
      positions.push([xPos, yPos]);
    }
  }

  shuffle(positions);

  for (let i = 0; i < count.pedestrians; ++i){
    pedestrian = new createjs.Sprite(PedestrianSpriteSheet, "right");
    const pos = positions.pop();
    stage.addChild(pedestrian);
    pedestrian.x = pos[0];
    pedestrian.y = pos[1];
    pedestrian.regX = 13;
    pedestrian.width = 10;
    pedestrian.height = 10;
    pedestrian.vel = Math.floor(Math.random() * 3) + 1;
    let multiplier = Math.floor(Math.random() *2);
    if (multiplier === 0) multiplier = -1;
    pedestrian.prefersUp = (Math.floor(Math.random() *2) === 0);
    pedestrian.vel *= multiplier;
  }
}

module.exports = addPedestrians;
