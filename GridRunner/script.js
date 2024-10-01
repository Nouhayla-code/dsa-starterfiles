"use strict";

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

function start() {
  console.log(`Javascript kører`);

  window.addEventListener("keydown", keyDown);
  // start ticking
  tick();
}

function keyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;
    case "ArrowUp":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
      break;
  }
}

function tick() {
  // setup next tick
  setTimeout(tick, 500);

  writeToCell(player.row, player.col, 0);

  switch (direction) {
    case "left":
      player.col--;
      if (player.col < 0) {
        player.col = 9;
      }
      break;
    case "right":
      player.col++;
      if (player.col > 9) {
        player.col = 0;
      }
      break;
    case "down":
      player.row++;
      if (player.row > 9) {
        player.row = 0;
      }
      break;
    case "up":
      player.row--;
      if (player.row < 0) {
        player.row = 9;
      }
  }

  // TODO: Do stuff
  writeToCell(player.row, player.col, 1);

  // display the model in full
  displayBoard();
}

// #endregion controller

// ****** MODEL ******
// #region model

let direction = "left";
const player = {
  row: 5,
  col: 5,
};
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// #endregion model

// ****** VIEW ******
// #region view

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

// #endregion view
