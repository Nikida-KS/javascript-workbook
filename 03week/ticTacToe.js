'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


/*
Code Plan
1. Make sure the play is valid
  -Check that the player used 0, 1, or 2
  -Check that there is a " " in that spot
2. Use splice to place mark on the board
3. Check for win
  -horizontal win
  -vertical win
  -diagonal win
  -if a win is detected - clear the board (else switch players)
4. Change playerTurn
  -if (playerTurn === 'X') {
      playerTurn = 'O';
    } else {
      playerTurn = 'X';
*/


let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function onTheBoard(row, column) {
  if((row == 0 || row == 1 || row == 2) && (column == 0 || column == 1 || column == 2)){
    isItBlank(row, column);
  }
  else{
    console.log("That location is not on this board!")
  }
}

function isItBlank(row, column){
  if(board[row][column] === " "){
    makeYourMark(row, column);
  }
  else{
    console.log('There is already a play there- try again')
  }
}

function makeYourMark(row, column){
  board[row].splice([column], 1, playerTurn);
  checkForWin();
}

function switchPlayers(){
  if (playerTurn === 'X') {
    playerTurn = 'O';
  }
  else {
    playerTurn = 'X';
  }
}

function horizontalWin() {
  let threeInARow = 0
  for(var j = 0; j < 3; j++){
    threeInARow = 0;
    for(var i = 0; i < 3; i++){
      if([playerTurn].indexOf(board[j][i]) > -1){
        threeInARow = threeInARow + 1
      }
    }
    if(threeInARow === 3){
      return true
    }
  }
}

function verticalWin() {
  let threeInAColumn = 0
  for(var i = 0; i < 3; i++){
    threeInAColumn = 0;
    for(var j = 0; j < 3; j++){
      if([playerTurn].indexOf(board[j][i]) > -1){
        threeInAColumn = threeInAColumn + 1
      }
    }
    if(threeInAColumn === 3){
      return true
    }
  }
}

function diagonalWin() {
  let threeAcross = 0
  for(var i = 0; i < 3; i++){
    if([playerTurn].indexOf(board[i][i]) > -1){
      threeAcross = threeAcross + 1
    }
  }
  if(threeAcross === 3){
    return true
  }
  if(([playerTurn].indexOf(board[0][2]) > -1)
    &&([playerTurn].indexOf(board[1][1]) > -1)
    &&([playerTurn].indexOf(board[2][0]) > -1)){
    return true
  }
}

function checkForWin(){
  if(diagonalWin() || verticalWin()|| horizontalWin()){
    console.log(playerTurn + "wins!");
    return true;
    board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
    ];
  }
  else{
    switchPlayers();
  }
}

function ticTacToe(row, column) {
  onTheBoard(row, column);
}



function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
