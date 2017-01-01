// function addTrucksandCabs(stage, loader) {
//   let truck;
//   let positions = [];
//
//   for (let i = 0; i < 17; ++i) {
//     const truckImage = randomVehicle(loader);
//     truck = new createjs.Shape();
//     truck.width = truckImage.width;
//     truck.height = truckImage.height;
//     truck.graphics.beginBitmapFill(truckImage).
//     drawRect(0, 0, truck.width, truck.height);
//
//
//     if (coinToss() === 0) {
//       truck.y = 310;
//       truck.velX = -2;
//     } else {
//       truck.scaleX = -1;
//       truck.y = 436;
//       truck.velX = 2;
//     }
//     truck.x = randomX();
//     truck.y = randomLane(truck);
//
//     while (positions.includes([truck.x, truck.y])) {
//       truck.x = randomX();
//       truck.y = randomLane(truck);
//     }
//
//     positions.push([truck.x, truck.y]);
//     stage.addChild(truck);
//     // debugger
//   }
// }
//
function randomLane(truck){
  return coinToss() === 0 ? truck.y : truck.y + 60;
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

function addTruck(stage, loader) {
  let truck;

  const truckImage = randomVehicle(loader);
  truck = new createjs.Shape();
  truck.width = truckImage.width;
  truck.height = truckImage.height;
  truck.graphics.beginBitmapFill(truckImage).
  drawRect(0, 0, truck.width, truck.height);
}

module.exports = addTruck;
