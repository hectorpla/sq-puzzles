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
- [] 15-puzzle in mobile size: bad layout; slow

# tasks
- [x] Type move.js
- [] Test GameComponent
- [] migration to Typescript 3.0 (tentative)
- [] deploy on Heroku
