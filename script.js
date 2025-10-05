// ===== GAME STATE VARIABLES =====
let currentLargestTile = 2;     // If this is 2048 then user wins!
let gameOver = false;         // Is the game finished?

// DOM element references
let gameBoard, rows, tiles;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    tiles = document.querySelectorAll('.tile');
    console.log("Yeah youre good");
    addTile();
    addTile();
});

// Keyboard event listener
document.addEventListener("keydown", (event) => {
    // Check if the game is over
    if (!gameOver) {
        let response = event.key;
        // Checking if the input is wasd
        if (response === "w") {
            console.log("w key pressed!");
            makeShift("up");
            addTile();
            return
          } else if (response === "a") {
            console.log("a key pressed!");
            makeShifts("left");
            addTile();
            return
          } else if (response === "s") {
            console.log("s key pressed!");
            makeShift("down");
            addTile();
            return
          } else if (response === "d") {
            console.log("d key pressed!");
            makeShift("right");
            addTile();
            return
          }

        // Checking if the input is an arrow key
        if (response === "ArrowUp") {
            console.log("Up arrow key pressed!");
            makeShift("up");
            addTile();
            return
          } else if (response === "ArrowDown") {
            console.log("Down arrow key pressed!");
            makeShift("down");
            addTile();
          } else if (response === "ArrowLeft") {
            console.log("Left arrow key pressed!");
            makeShift("left");
            addTile();
            return
          } else if (response === "ArrowRight") {
            console.log("Right arrow key pressed!");
            makeShift("right");
            addTile();
          }
    }
});

// Function for generating a random square on the grid
function addTile() {
    console.log("Adding tile to random spot.");

    // Create array of available tiles
    const openTiles = [];

    // Check the state of the game-board tiles
    for (i=0; i < tiles.length; i++) { // Iterate through each tile div
      if (tiles[i].textContent  == '') { // If the tile is empty, add it to the openTiles array
        openTiles.push(tiles[i]);
      }
    }

    // Choose random tile from available tiles
    if (openTiles.length > 0) { // Check to see if openTiles array is has any elements in it
      let randomNumber = Math.floor(Math.random() * openTiles.length); // Generate random number in array
      let randomValue = Math.floor(Math.random() * 2); // Generate random number from 0-1
      openTiles[randomNumber].textContent = (randomValue + 1) * 2; // Set the tile's value to 2 or 4

      // Add background color to tile through classes
      if (randomValue == 0) {
        openTiles[randomNumber].classList.add('value2');
      } else if (randomValue == 1) {
        openTiles[randomNumber].classList.add('value4');
      }
    } else {
      console.log("No available tiles");
      gameOver = true; // Game is over
    }
}

// Function for making move on the game board
function makeShift(direction) {
    if (direction == "left") {
        console.log("Shifting board left.");
        // Code for left move
    } else if (direction == "right") {
        console.log("Shifting board right.");
        // Code for right move
    } else if (direction == "up") {
        console.log("Shifting board up.");
        // Code for up move
    } else if (direction == "down") {
        console.log("Shifting board down.");
        // Code for down move
    } 
}