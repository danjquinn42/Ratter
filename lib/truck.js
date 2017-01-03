const shuffle = require("./shuffle.js");

function addTrucksandCabs(stage, loader, truckCount) {
  let truck;
  let trucks = [];
  let positions = [];

  let truckPositions = [];

  for (let i = 0; i < 8; ++i) {
    truckPositions.push([i*110, 310]);
    truckPositions.push([i*110, 370]);
    truckPositions.push([i*110, 436]);
    truckPositions.push([i*110, 496]);
  }

  shuffle(truckPositions);

  for (let i = 0; i < truckCount; ++i) {
    const truckPos = truckPositions.pop();
    const truckImage = randomVehicle(loader);
    truck = new createjs.Shape();
    truck.width = truckImage.width;
    truck.height = truckImage.height;
    truck.graphics.beginBitmapFill(truckImage).
      drawRect(0, 0, truck.width, truck.height);

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
    trucks.push(truck);
  }
  return trucks;
}


/////
function randomLane(truck){
  return coinToss() === 0 ? truck.y : truck.y + 60;
}

function randomX(){
  return Math.floor(Math.random() * 8) * 100;

}

function randomVehicle(loader) {
  return (coinToss() === 0) ?
    loader.getResult("cab") :
    loader.getResult("truck"); //TODO make truck
}

function coinToss() {
  return Math.floor(Math.random() * 2);
}


module.exports = addTrucksandCabs;
