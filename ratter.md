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

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, the following scripts will be involved in the project:

`sprites.png`: the sprite file will include pixle art of the street, the sidewalk, dumpsters, the rat facing four directions, angry New Yorkers with multiple frames for walking, busses, and cars. 

`street.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`obstical.js`: obstacle objects will include both pedestrians and vehicles.

`reward.js`: the rewards class will include all items which result in bonus points for the rat.

`rat.js` : the rat object will listen for key events and control the players avatar on screen.

`ratter.js`: this script will handle the logic behind the scenes.  A ratter object will hold a street, a rat, and many vehicle and pedestrian objects.

`cell.js`: this lightweight script will house the constructor and update functions for the `Cell` objects.  Each `Cell` will contain a `type` (hexagon, triangle, or square) and an `aliveState` (`true` or `false`).

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Cell` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the square grid, ideally all 3 grid types.  Build in the ability to toggle the live/dead states on click for each cell.  Goals for the day:

- Complete the `cell.js` module (constructor, update functions)
- Render a square grid to the `Canvas` using `Easel.js`
- Make each cell in the grid clickable, toggling the state of the square on click
- Do the same for triangular and hexagonal grids

**Day 3**: Create the automata logic backend.  Build out modular functions for handling the different grid types along with their unique neighbor checks and rule sets.  Incorporate the automata logic into the `Board.js` rendering.  Goals for the day:

- Export an `Automata` object with correct type and handling logic
- Have a functional grid on the `Canvas` frontend that correctly handles iterations from one generation of the game to the next


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add options for different rule sets
- [ ] Add multiple choices for starting states that are interesting
- [ ] Explore multi-state versions of the game, such as the ones outlined [here](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html)
