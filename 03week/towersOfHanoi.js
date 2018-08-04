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


function movePiece(startStack, endStack) {
  stacks[endStack].push(stacks[startStack].pop());
  checkForWin(startStack, endStack);
}


function isLegal(startStack, endStack) {
  if((startStack === "a" || startStack === "b" || startStack === "c")
    && (endStack === "a" || endStack === "b" || endStack === "c")){
    let startLast = stacks[startStack][stacks[startStack].length-1];
    let endLast = stacks[endStack][stacks[endStack].length-1];
    console.log(startLast, endLast);
    if(stacks[startStack].length > 0){
      if(endLast > startLast || !endLast){
        movePiece(startStack, endStack);
        return true;
      }
      else{
      console.log("you can't put a larger number on a smaller number")
      return false
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


function checkForWin() {
  if(stacks.b.toString()==="4,3,2,1"){
    console.log("You win!")
    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: [],
    };
    return true
  }
  else{
    printStacks();
    return false
  }
}


function towersOfHanoi(startStack, endStack) {
  isLegal(startStack, endStack);
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
