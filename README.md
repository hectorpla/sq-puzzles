# problems not yet solved
- [x] check finished before the view is rendered (wrong); work-around: check after animation
- [] generate puzzles that are guranteed to be solvable (4 * 4)
- [x] animation bug: fast move on mobile (solved by freeze + anime.js)
- [x] 15-puzzle in mobile size: bad layout; slow
- [] slow response after changing size of the game

# tasks
- [x] type move.js (deprecated in this project)
- [] test GameComponent
- [] migration to Typescript 3.0 (tentative)
- [x] deploy on Heroku
- [] timer and animation

## some peripheral goals
- [x] animation for new game
- [] drag and drop

# decisions
## move work flow
1. `Tile` move() method called, which is delagated to `BoardModel`, which control the tiles
2. click on tile trigger animation of a specific tile
3. on animation completion, response callbacks are invoked in `GameComponent`
4. in `GameComponent`, setState() is invoked to refresh the game board

### alternative method
1. click -> click event
2. `BoardComponent` catches the event and figure out the target
3. `BoardComponent` modifies its model `BoardModel`

## Data race issues
modify data model first or start animation first?

## possible consequences
- if modify first (current impl), 
- otherwise, conflicts: two tiles can move to the empty tile (ex., 1 -> 2 <- 3) data race?
