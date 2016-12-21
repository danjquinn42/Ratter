## Ratter
A  New York twist on the arcade classic Frogger

### Background

Frogger is a classic arcade game in which one plays as a frog attempting to cross a street and a river to reach his home on the other side.

Ratter is very similar. You play as a rat starting your journey in central park and trying to reach the cozy sanctuary of a dumpster.


### Functionality & MVP

In Ratter the user will be able to

- [ ] Scurry Forward
- [ ] Scurry Left
- [ ] Scurry Right
- [ ] Scurry Backward

These actions will help the user achieve the primary objectives of the game:

- [ ] Avoid cars and trucks
- [ ] Avoid angry New Yorkers
- [ ] Collect Pizza
- [ ] Reach the glorious dumpster


### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, the following files will be involved in the project:

`sprites.png`: the sprite file will include pixle art of the street, the sidewalk, dumpsters, the rat facing four directions, angry New Yorkers with multiple frames for walking, busses, and cars.

`street.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`obstical.js`: obstacle objects will include both pedestrians and vehicles.

`reward.js`: the rewards class will include all items which result in bonus points for the rat.

`rat.js` : the rat object will listen for key events and control the players avatar on screen.

`ratter.js`: this script will handle the logic behind the scenes.  A ratter object will hold a street, a rat, and many vehicle and pedestrian objects.

`cell.js`: this lightweight script will house the constructor and update functions for the `Cell` objects.  Each `Cell` will contain a `type` (hexagon, triangle, or square) and an `aliveState` (`true` or `false`).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`. Create Sprites. Goals for the day:

- Get a green bundle with `webpack`
- Complete pixel artwork and learn how to sample sprites from a single file.
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Rat` object to connect to the `Street` object.  Then, use `street.js` to create and render at least a blank street map with the rat scurrying according to input from the user.

- Complete the `rat.js` module (constructor, update functions)
- Render the street to the `Canvas` using `Easel.js`
- Make the rat responsive to keyboard input, scurrying regular distances up, down, left, and right.

**Day 3**: Create Obstacle class in the `obstacle.js` file and add hit-detection in the `street.js` file. Render the obstacles moving on the street. Make sure the game ends when the rat hits an obstacle. Add walking animation to pedestrians if time permits.


**Day 4**: Add dumpsters and score counter. Add game over screen when the rat hits an obstacle. Add rewards appearing randomly for 5-10 seconds at a time on the street.

- Assign point values to the dumpsters and to pizza slices
- Update the point counter when a collision is detected with Reward objects.
- Create a new Rat object whenever the players rat reaches a dumpster.


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add multiple levels
- [ ] Add high score list
