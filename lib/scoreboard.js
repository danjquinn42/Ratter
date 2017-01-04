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

  let scoreBoard = { ones: {}, tens: {}, hundreds: {}, thousands: {} };

  scoreBoard.ones = new createjs.Sprite(ScoreSpriteSheet);
  scoreBoard.ones.x = 572;
  scoreBoard.tens = new createjs.Sprite(ScoreSpriteSheet);
  scoreBoard.tens.x = 548;
  scoreBoard.hundreds = new createjs.Sprite(ScoreSpriteSheet);
  scoreBoard.hundreds.x = 524;
  scoreBoard.thousands = new createjs.Sprite(ScoreSpriteSheet);
  scoreBoard.thousands.x = 500;
  // debugger;
  stage.addChild(scoreBoard.ones, scoreBoard.tens, scoreBoard.hundreds, scoreBoard.thousands);

  return scoreBoard;
}


module.exports = addScoreBoard;
