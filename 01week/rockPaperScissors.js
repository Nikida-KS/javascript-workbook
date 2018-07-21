'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*Code Plan
1. plan for ties if hand1 === hand2
2. plan for hand1 wins
3. write if statement for all hand1 wins with a ||
4. repeat steps 2 and 3 for hand2
5. trim whitespace (at the top of the function)
6. make lowercase (at the top of the function)
7. make a switch(hands) for misspellings
8. make an output for invalid plays
*/

function rockPaperScissors(hand1, hand2) {
  hand1 = hand1.trim();
  hand2 = hand2.trim();
  hand1 = hand1.toLowerCase();
  hand2 = hand2.toLowerCase();

  switch (hand1) {
    case 'rock':
    case 'rocks':
    case "rak":
    case 'roc':
    case 'racks':
    case 'rack':
    case 'rac':
    case 'rocs':
    case "racs":
      hand1 = "rock"
      break;

    case 'scissors':
    case 'sissors':
    case 'scissor':
    case 'scissers':
    case 'sissers':
    case 'scisser':
    case 'sissers':
    case 'cissors':
    case 'scisors':
    case 'cissor':
    case 'sisors':
    case 'scisor':
    case 'scisers':
      hand1 = 'scissors'
      break;

    case 'paper':
    case 'papers':
    case 'payper':
    case 'papr':
      hand1 = 'paper'
      break;
  }

  switch (hand2) {

    case 'rock':
    case 'rocks':
    case 'rak':
    case 'roc':
    case 'racks':
    case 'rack':
    case 'rac':
    case 'rocs':
    case "racs":
      hand2 = "rock"
      break;

    case 'scissors':
    case 'sissors':
    case 'scissor':
    case 'scissers':
    case 'sissers':
    case 'scisser':
    case 'sissers':
    case 'cissors':
    case 'scisors':
    case 'cissor':
    case 'sisors':
    case 'scisor':
    case 'scisers':
      hand2 = 'scissors'
      break;

    case 'paper':
    case 'papers':
    case 'payper':
    case 'papr':
      hand2 = 'paper'
      break;

    default:
      return "Invalid play: Either you can't spell or you think you're funny"
  }

  if (hand1 === hand2) {
    return "It's a tie!"
  }
  if ((hand1 === "rock" && hand2 === "scissors") ||
    (hand1 === "scissors" && hand2 === "paper") ||
    (hand1 === "paper" && hand2 === "rock")) {
    return "Hand one wins!"
  }
  if ((hand2 === "rock" && hand1 === "scissors") ||
    (hand2 === "scissors" && hand1 === "paper") ||
    (hand2 === "paper" && hand1 === "rock")) {
    return "Hand two wins!"
  }
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log(rockPaperScissors(answer1, answer2));
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
