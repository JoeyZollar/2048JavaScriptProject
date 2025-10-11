// ===== GAME STATE VARIABLES =====
const TARGETVALUE = 2048; // If a tile is merged with this number the user wins!
let GAMEOVER = false; // Is the game finished?

// DOM element references
let gameBoard, rows, tiles;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  gameBoard = document.querySelector('.game-board');
  rows = document.querySelectorAll('.row');
  tiles = document.querySelectorAll('.tile');
  addTile();
  addTile();
});

// Keyboard event listener
document.addEventListener("keydown", (event) => {
    // Check if the game is over
    if (!GAMEOVER) {
        let response = event.key;
        // Checking if the input is wasd
        if (response === "w") {
            makeShift("up");
            return
          } else if (response === "a") {
            makeShift("left");
            return
          } else if (response === "s") {
            makeShift("down");
            return
          } else if (response === "d") {
            makeShift("right");
            return
          }

        // Checking if the input is an arrow key
        if (response === "ArrowUp") {
            makeShift("up");
            return
          } else if (response === "ArrowDown") {
            makeShift("down");
          } else if (response === "ArrowLeft") {
            makeShift("left");
            return
          } else if (response === "ArrowRight") {
            makeShift("right");
          }
    }
});

// Function for checking if the game is over
function checkGameOver() {
  console.log('checking for game over...')
  // Iterate through each row
  for (let i = 0; i < 4; i++) {
    // Get all the tile elements from the row
    let rowTiles = rows[i].querySelectorAll('.tile');

    // Iterate through each tile/column
    for (let j = 0; j < 4; j++) {
      let currentValue = rowTiles[j].textContent;

      // In case the tile is empty, then the game is not over
      if (currentValue === '') {
        console.log('empty tile detected, game not over');
        return false;
      }

      // Check right neighbor in the same row
      if (j < 3) { // If we are not on the fourth column
        let rightValue = rowTiles[j + 1].textContent; // Get the value of the neighbor tile to the right
        if (currentValue === rightValue) { // If the values are equal, then there is a merge possibiltiy
          console.log('merge possible on right');
          return false;
        }
      }

      // Check below neighbor in the same column
      if (i < 3) { // If we are not on the fourth row
        let nextRowTiles = rows[i + 1].querySelectorAll('.tile'); // Get the tiles of the next row
        let downValue = nextRowTiles[j].textContent; // Get the value of the neighbor tile on the bottom
        if (currentValue === downValue && currentValue !== '') { // If the values are equal, then there is a merge possibiltiy
          console.log('merge possible below');
          return false;
        }
      }
    }
  }

  // If there are no possible moves, the game is over and return true
  console.log('Game over returning true.')
  return true;
}

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
      // Check if there are any more available moves
      // If there are no available moves, game is over
      if (checkGameOver()) {
        GAMEOVER = true;
        setTimeout(() => alert("Game over! No more available moves!"), 500);
      };
    }
}

function compressRow(row, direction) {
  let currenRowTiles = row.querySelectorAll('.tile');
  let moveMade = false;

  if (direction == 'left') {
    for (i=0; i < 4; i++) {
      let currentTile = currenRowTiles[i];
  
      if (currentTile.textContent == '') {
        row.append(currentTile);
      }
    }
  } else if (direction == 'right') {
    for (i=0; i < 4; i++) {
      let currentTile = currenRowTiles[i];
  
      if (currentTile.textContent != '') {
        row.append(currentTile);
      }
    }
  }

  // Get the updated array of elements
  let newRowTiles = row.querySelectorAll('.tile');

  // Compare the array of divs before the move and after to see if there were any changes
  for (i=0; i < 4; i++) {
    if (currenRowTiles[i] != newRowTiles[i]) {
      moveMade = true;
    }
  }

  return moveMade;
}

function mergeRow(row, direction) {
  // Gwt all the tiles in the row and place them into an array
  let currenRowTiles = row.querySelectorAll('.tile');
  let moveMade = false;

  // Iterate through each tile
  for (i=0; i < 3; i++) {
    let currentTile, currentValue, nextTile;

    if (direction == 'right') {
      currentTile = currenRowTiles[currenRowTiles.length - (i+1)]; // Current tile element
      currentValue = currentTile.textContent; // Current tile text content
      nextTile = currenRowTiles[currenRowTiles.length - (i+2)]; //   
    } else if (direction == 'left') {
      currentTile = currenRowTiles[i]; // Current tile element
      currentValue = currentTile.textContent; // Current tile text content
      nextTile = currenRowTiles[i+1]; //   
    }

    // If the tile has value in it
    if (currentValue != '') {
      // If the tile has the same value as the tile next to it
      if (currentTile.textContent == nextTile.textContent) {
        // Update the target tile's value and classes
        currentTile.textContent = currentValue * 2;
        currentTile.classList.add(`value${currentValue * 2}`);
        currentTile.classList.remove(`value${currentValue}`)
        // Update the adjacent tile's value and classes
        nextTile.textContent = '';
        nextTile.classList.remove(`value${currentValue}`)

        // Check for win state
        if (currentTile.textContent == TARGETVALUE) {
          setTimeout(() => alert("You won!"), 500);
        }

        // Change moveMade since two tiles were merged
        moveMade = true;
      }
    }
  }
  return moveMade;
}

// Function to get a column in an array of tiles 
function getColumn(colIndex) {
  let column = [];

  // Iterate through each row
  for (let r = 0; r < 4; r++) {
    // Get the tile elements from each row
    const rowTiles = rows[r].querySelectorAll('.tile');
    // Push the tile of the desired index to the column array
    column.push(rowTiles[colIndex]);
  }

  return column;
}

// Function to update columns 
function setColumn(colIndex, newColumnTiles) {
  // Iterate through each row
  for (let r = 0; r < 4; r++) {
    const rowTiles = rows[r].querySelectorAll('.tile'); // Get all the row tile elements
    rowTiles[colIndex].textContent = newColumnTiles[r].textContent; // Change the current column tile to the new tile value
    
    // Reset all value classes
    rowTiles[colIndex].className = 'tile';
    if (newColumnTiles[r].textContent !== '') {
      rowTiles[colIndex].classList.add(`value${newColumnTiles[r].textContent}`);
    }
  }
}

// Function for making move on the game board
function makeShift(direction) {
    let tilesChanged = false;

    if (direction == "left") {
      console.log("Shifting board left.");
      // Iterate through each row
      for (r=0; r < 4; r++) {
        // Compress the row first, removing all blank tiles
        let tilesMoved = compressRow(rows[r], 'left');
        // Merge tiles of the same value that are next to each other
        let tilesMerged = mergeRow(rows[r], 'left');
        // Compress again to remove any tiles made blank
        compressRow(rows[r], 'left');

        console.log(`functions returned moved ${tilesMoved} and merged ${tilesMerged}`)
        if (tilesMoved || tilesMerged == true) {
          tilesChanged = true;
        }
      }
      // Add a new tile after a delay
      if (tilesChanged == true) {
        setTimeout(addTile, 150);
      } else { // If there was an input made but not any merges or moves, check for game over
        // Check if there are any more available moves
        if (checkGameOver()) {
          GAMEOVER = true;
          setTimeout(() => alert("Game over! No more available moves!"), 500);
        };
      }

    } else if (direction == "right") {
        console.log("Shifting board right.");

        // Iterate through each row
        for (r=0; r < 4; r++) {
          // Compress the row first, removing all blank tiles
          let tilesMoved = compressRow(rows[r], 'right');
          // Merge tiles of the same value that are next to each other
          let tilesMerged = mergeRow(rows[r], 'right');
          // Compress again to remove any tiles made blank
          compressRow(rows[r], 'right');
  
          console.log(`functions returned moved ${tilesMoved} and merged ${tilesMerged}`)
          if (tilesMoved || tilesMerged == true) {
            tilesChanged = true;
          }
        }
        // Add a new tile after a delay
        if (tilesChanged == true) {
          setTimeout(addTile, 150);
        } else { // If there was an input made but not any merges or moves, check for game over
          // Check if there are any more available moves
          if (checkGameOver()) {
            GAMEOVER = true;
            setTimeout(() => alert("Game over! No more available moves!"), 500);
          };
        }
    
    } else if (direction == "up") {
      console.log("Shifting board up.");
      let tilesChanged = false;
    
      // Iterate through each column
      for (let i = 0; i < 4; i++) {
        // Get column array from function
        let column = getColumn(i);
    
        // Create a temporary row in memory using a div 
        let tempRow = document.createElement('div');
        // Add row class to div
        tempRow.classList.add('row');

        // Create a deep clone and append each tile in the column to a fake temporary row
        // Compress and merge functions sort a div element so making a temporary div makes it easier to work with columns
        column.forEach(tile => tempRow.appendChild(tile.cloneNode(true)));
    
        // Apply compress and merge functions using left direction
        let moved = compressRow(tempRow, 'left');
        let merged = mergeRow(tempRow, 'left');
        compressRow(tempRow, 'left');
    
        if (moved || merged) tilesChanged = true;
    
        // Update the actual column
        let newTiles = tempRow.querySelectorAll('.tile'); // Select a tiles from temp row
        setColumn(i, newTiles); // Update DOM tiles with calculated values
      }
    
      if (tilesChanged == true) {
        setTimeout(addTile, 150);
      } else { // If there was an input made but not any merges or moves, check for game over
        // Check if there are any more available moves
        if (checkGameOver()) {
          GAMEOVER = true;
          setTimeout(() => alert("Game over! No more available moves!"), 500);
        };
      }
    
    } else if (direction == "down") {
      console.log("Shifting board down.");
      let tilesChanged = false;

      // Iterate through each column
      for (let c = 0; c < 4; c++) {
        // Get column array from function
        let column = getColumn(c);

        // Create a temporary row in memory using a div 
        let tempRow = document.createElement('div');
        // Add row class to div
        tempRow.classList.add('row');

        // Create a deep clone and append each tile in the column to a fake temporary row
        // Compress and merge functions sort a div element so making a temporary div makes it easier to work with columns
        column.forEach(tile => tempRow.appendChild(tile.cloneNode(true)));

        // Apply compress and merge functions using right direction
        let moved = compressRow(tempRow, 'right');
        let merged = mergeRow(tempRow, 'right');
        compressRow(tempRow, 'right');

        if (moved || merged) tilesChanged = true;

        // Update the actual column
        let newTiles = tempRow.querySelectorAll('.tile');  // Select a tiles from temp row
        setColumn(c, newTiles); // Update DOM tiles with calculated values
      }

      if (tilesChanged) {
        setTimeout(addTile, 150);
      } else { // If there was an input made but not any merges or moves, check for game over
        // Check if there are any more available moves
        if (checkGameOver()) {
          GAMEOVER = true;
          setTimeout(() => alert("Game over! No more available moves!"), 500);
        };
      }
    }
  }