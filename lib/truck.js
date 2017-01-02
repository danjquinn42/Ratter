function addTrucksandCabs(stage, loader) {
  let truck;
  let positions = [];

  let truckPositions = [];

  for (let i = 0; i < 10; ++i) {
    truckPositions.push([i*100, 310]);
    truckPositions.push([i*100, 370]);
    truckPositions.push([i*100, 436]);
    truckPositions.push([i*100, 496]);
  }

  shuffle(truckPositions);

  for (let i = 0; i < 17; ++i) {
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
      truck.regX = truckImage.width / 2;
      truck.scaleX = -1;
      truck.velX = 2;
    }
    stage.addChild(truck);
  }
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

function addTruck(stage, loader) {
  let truck;

  const truckImage = randomVehicle(loader);
  truck = new createjs.Shape();
  truck.width = truckImage.width;
  truck.height = truckImage.height;
  truck.graphics.beginBitmapFill(truckImage).
  drawRect(0, 0, truck.width, truck.height);
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
