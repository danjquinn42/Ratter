function addTrashCans(state) {
  let {stage, loader} = state;
  state.trashCans =[];
  for (let i = 0; i < 6; ++i) {
    const TrashSpriteSheet = new createjs.SpriteSheet({
      framerate: 20,
      "images": [loader.getResult("trash")],
      frames: {"redX": 0,
        "height": 60,
        "count": 2,
        "regY": 27,
        "width": 54
      },
      "animations": {
        "full": [0],
        "empty": [1]
      }
    });

    let trash = new createjs.Sprite(TrashSpriteSheet, "empty");
    trash.width = 54;
    trash.height = 60;
    trash.x = 120 * i + 64;
    trash.y = 60;
    stage.addChild(trash);

    state.trashCans.push(trash);
  }
  // return trashCans;
}


module.exports = addTrashCans;
