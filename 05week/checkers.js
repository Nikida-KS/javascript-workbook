'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//MVP

//Check for legal move
  //whichPiece must have something to move
  //toWhere must be >=0 && toWhere <8 so it stays on the board
  //toWhere must be null

  //X can only
    //kill
    //or move up one row and left/right one column ([r+1]&&[c-1] || [c+1])

  //Y can only
    //kill
    //or move down one row and left/right one column ([r-1]&&[c-1] || [c+1])

//Move the piece
  //Replace whichPiece with a null and toWhere with current turn

//Kill
  //X can kill a Y that is one row and left/right one column ([r+1]&&[c-1] || [c+1])
  //Y can kill an X that is down one row and left/right one column ([r-1]&&[c-1] || [c+1])
  //Replace 'jumped' piece with a null

//Switch players




function Checkers() {
  // Your code here
}


//Creates checkers that assign a symbol to a player
class Checker {
  constructor(player, symbol){
    this.player = player
    this.symbol = symbol;
    if (player === 'playerX') {
      this.symbol = "X";
    }
    else {
      this.symbol = "Y";
    }
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // Put X's on 01, 03, 05, 07, 10, 12, 14, 16, 21, 23, 25, 27
  // Put Y's on 50, 52, 54, 56, 61, 63, 65, 67, 70, 72, 74, 76
  createCheckers(){
    let xPositions = [[0, 1], [0, 3], [0, 5], [0, 7],
                      [1, 0], [1, 2], [1, 4], [1, 6],
                      [2, 1], [2, 3], [2, 5], [2, 7]];
    let oPositions = [[5, 0], [5, 2], [5, 4], [5, 6],
                      [6, 1], [6, 3], [6, 5], [6, 7],
                      [7, 0], [7, 2], [7, 4], [7, 6]];
  // Loops through the Positions arrays to push a new Checker at each coordinate
    for (let i = 0; i <= 11; i++) {
      let xChecker = new Checker('playerX');
      this.checkers.push("xChecker");
      let coordinate = xPositions[i];
      this.grid[coordinate[0]][coordinate[1]] = xChecker;

      let oChecker = new Checker('playerO');
      this.checkers.push(oChecker);
      let coordinate2 = oPositions[i];
      this.grid[coordinate2[0]][coordinate2[1]] = oChecker;
    }
  }

  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }

  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }
}

class Game {
  constructor() {
    this.board = new Board()
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
