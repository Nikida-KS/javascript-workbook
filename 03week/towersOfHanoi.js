'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

/*Code Plan
1. Write checkForWin function to check if all of the numbers are in the b row in order
    *I started with stacks.b.toString() = "4,3,2,1"
     but then I wrote the reset function to add another level
    *If stacks.a and stacks.c are empty (and the isLegal function works)
     then the all of the numbers used must be in order in stacks.b
2. Write isLegal function to check:
    1. Did the user enter a, b, or c?
    2. Did the user pick from a row that has a number?
    3. Did the user choose a smaller number to go on a bigger number?
3. Write movePiece function to append the last number in startStack to endStack
    *Push the pop of start stack to the end stack
4. Figure out what ACA means by reset function and write it
Bonus. Add more levels!!!
*/

//detaches the last number in the array of the start stack
//and appends it to the end stack AT THE SAME TIME
function movePiece(startStack, endStack) {
  stacks[endStack].push(stacks[startStack].pop());
}

//resets the stack to the starting position
function resetGame() {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
}

//The isLegal function first checks if the player wanted to reset the game, if not
//then it makes sure the player chose actual stacks, that have something in them
//then it makes sure the player puts the chosen number on top of a number that isn't itself or smaller
function isLegal(startStack, endStack) {
  if(startStack === "reset" || endStack === "reset"){
    resetGame();
  }
  else if((startStack === "a" || startStack === "b" || startStack === "c")
    && (endStack === "a" || endStack === "b" || endStack === "c")){
    const startLast = stacks[startStack][stacks[startStack].length-1];
    const endLast = stacks[endStack][stacks[endStack].length-1];
    if(stacks[startStack].length > 0){
      if(endLast !== startLast){
        if(endLast > startLast || !endLast){
          return true;
        }
        else{
          console.log("you can't put a larger number on a smaller number")
          return false
        }
      }
      else{
        console.log("you can't put a number on itself")
      }
    }
    else{
      console.log("you can't move a number that isn't there")
      return false
    }
  }
  else{
    console.log("you have to use a, b, or c")
    return false
  }
}

/*
This adds more levels once the game is won by unshifting the biggest number plus one
in front of the biggest number (which will be in position zero of the array since the function
is called once the game is won)
*/

function nextLevel(){
  if(stacks.b[0] < 9){
    stacks.b.unshift(stacks.b[0]+1);
    const reset = stacks.b.slice(0, stacks.b.length);
    stacks.a.push(reset);
    //can't slice an array into emptiness
    stacks.b.length=0;
  }
  else{
    console.log("You are now the King of Hanoi!!!!");
    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: []
    };
  }
}

/*This checks for a win because the game only allows legal moves
so if there are no numbers left in a or c then all of them are correctly ordered in b*/
function checkForWin() {
  if(stacks.a.length == 0 && stacks.c.length == 0){
    console.log("GREAT JOB!!!!!");
    console.log("Welcome to the next level");
    return true
  }
  else{
    return false
  }
}

function towersOfHanoi(startStack, endStack) {
  if(isLegal(startStack, endStack)){
    movePiece(startStack, endStack);
    if(checkForWin()){
      nextLevel();
    }
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
