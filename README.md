# 2048JavaScriptProject

Welcome to my implementation of 2048! This program was created for a Full-Stack Development course at Drake University, and is modeled after the game 2048. 
2048 is a simple game of merging tiles to create bigger ones. Shifting the board using arrow keys or WASD will move tiles and cause tiles of the same value to merge.
Win the game by merging a tile to the value 2048! If you run out of tiles and possbile moves, the game is over.

In this project, something new I learned and experimented with was CSS hover styling and animations. I studied documentation to learn about the CSS transform and hover styles to make my buttons more responsive.
Using the animation property I made the transformations and hover styles happen smoothly to create a more professional appearance.

This project challenged me to combine my knowledge of JavaScript, HTML, and CSS. Creating the implementation of moving up and down was specifically challenging.
Because of the way I implemented the grid, moving tiles from columns instead of rows was challenging using the functions I had created for moving left and right.

I used ChatGPT to help give me a solution to moving up and down in the game. Generated code lines are present in lines 311-317 and 351-357 minus, my own comments explaining the code. It was helpful to be able get a solution to this issue that worked with my exisitng function already. It worked well to get me a solution that worked quickly but it took me some time to figure out how the code was working and how to implement it into my files. I made sure to have ChatGPT explain each step and why it worked, as well as do my own study of the functions used such as .foreach() and .cloneNode(). I was not sure how these functions worked or if cloning nodes were visible on the page, so I reasearch and learned how they worked before implementing them into my code. Overall, using AI was helpful to steer me in the correct direction given what I had, but I ensured that it worked well with my existing stucture and that I understood it if I needed to debug in the future.

Given more time to improve this game, I would focus on simplifying the code and creating a backend version of the grid to prevent inspecting and changing the values of the tiles manually to rig the game. I would also work to improve polish by adding animations to the moving tiles, and create a way for mobile users to interact and make moves. 
