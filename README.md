# How to deal with animation

1. in-line style? (chosen: move.js based on css transformation)
2. re-render or not? (proposal: after transformation finishes)
3. drag and drop

## solution:
1. move.js
2. two phrases for tile movement (1.animation, 2.react setState)

# problems not yet solved
- [x] check finished before the view is rendered (wrong); work-around: check after animation
- [] generate puzzles that are guranteed to be solvable (4 * 4)
- [] animation bug: fast move on mobile, response slowly after some games
- [] 15-puzzle in mobile size: bad layout; slow
- [] Enzyme full rendering tests failed: need move.js dependencies in tile (css-emitter)

# tasks
- [x] Type move.js
- [] Test GameComponent
- [] migration to Typescript 3.0 (tentative)
- [x] deploy on Heroku

# decisions
## move work flow
1. click on tile trigger model change in `Tile` object
  (1.5) animation happends
2. response callbacks are invoked in `BoardComponent` and `GameComponent`
3. in `GameComponent`, setState() is invoked to refresh the game board

### alternative method
1. click -> click event
2. `BoardComponent` catches the event and figure out the target
3. `BoardComponent` modifies its model `BoardModel`

## Data race issues
modify data model first or start animation first?

## possible consequences
- if modify first (current impl), 
- otherwise, conflicts: two tiles can move to the empty tile (ex., 1 -> 2 <- 3) data race?
