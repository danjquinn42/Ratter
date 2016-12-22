function addTrucksandCabs(stage, loader) {
  let truck;
  let positions = [];

  for (let i = 0; i < 17; ++i) {
    const truckImage = randomVehicle(loader);
    truck = new createjs.Shape();
    truck.graphics.beginBitmapFill(truckImage).
    drawRect(0, 0, truckImage.width, truckImage.height);

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

function randomLane(truck){
  return coinToss() === 0 ? truck.y : truck.y + 60
}

function randomX(){
  return Math.floor(Math.random() * 8) * 100;
}

function randomVehicle(loader) {
  return (coinToss() === 0) ?
    loader.getResult("truck") :
    loader.getResult("cab");
}

function coinToss() {
  return Math.floor(Math.random() * 2);
}

module.exports = addTrucksandCabs;
