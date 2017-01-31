#Ratter
A NYC themed homage to my favorite arcade game: frogger.
[Follow this link to play the game](https://danjquinn42.github.io/Ratter/)

##How to Play
Use the arrow keys to move. Your goal is to get one rat in each Trash Can at the top of the screen.
![mid game view](/app/assets/images/screenshot_midgame1.JPG)

If you it a trash can or a pedestrian you lose the game and a new game will start.
![mid game view](/app/assets/images/screenshot_bonus1.JPG)

Hover over the question mark in the top right corner to see instructions.
![play instructions](/app/assets/images/screenshot_instructions.JPG)

Every time you reach a trash can the number of pedestrians and the speed of traffic will increase. You will get a 200 point bonus.

##Technologies Used
The game is written using:
- Vanilla JavaScript in ES5 style for overall structure and game logic
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering
- Webpack to bundle and serve up the various scripts

In addition to the webpack entry file the game relies on a small library of sprites and other graphics.
![rat sprite sheet](/app/assets/images/rat.png "Rat Sprite Sheet")

##Coming Features
1) Game win screen
2) Replay screen (as opposed to automatically restarting)
3) pizzas! Pizza slices will be placed on the sidewalk and in the street which the player can grab for extra points
4) Sound effects