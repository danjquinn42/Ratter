function addScoreBoard(state) {
  let {stage, loader} = state;
  const ScoreSpriteSheet = new createjs.SpriteSheet({
    framerate: 20,
    "images": [loader.getResult("numbers")],
    "frames": {"regX": 0, "height": 33, "count": 10, "regY": 0, "width": 24},
    "animations": {
      "0": [0], "1": [1], "2": [2], "3": [3], "4": [4],
       "5": [5], "6": [6], "7": [7], "8": [8], "9": [9]
    }
  });

  state.scoreBoard = { ones: {}, tens: {}, hundreds: {}, thousands: {} };

  state.scoreBoard.ones = new createjs.Sprite(ScoreSpriteSheet);
  state.scoreBoard.ones.x = 572;
  state.scoreBoard.tens = new createjs.Sprite(ScoreSpriteSheet);
  state.scoreBoard.tens.x = 548;
  state.scoreBoard.hundreds = new createjs.Sprite(ScoreSpriteSheet);
  state.scoreBoard.hundreds.x = 524;
  state.scoreBoard.thousands = new createjs.Sprite(ScoreSpriteSheet);
  state.scoreBoard.thousands.x = 500;

  stage.addChild(state.scoreBoard.ones, state.scoreBoard.tens, state.scoreBoard.hundreds, state.scoreBoard.thousands);

}


module.exports = addScoreBoard;
