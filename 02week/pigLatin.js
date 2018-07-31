'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
pig latin code plan

0. Write a function to check for valid input
  1. Check that input is a string
  2. Check for other things such as

isValidWord= (word) =>{

}

1. Write a function that takes in the word and returns the word as a lower case, whitespace-trimmed word

caseSpace= (word) => {
  word = word.toLowerCase().trim();
}

2. Write a function that checks for a vowel


3. Write a function that attaches "yay" to the end of a string


4. Write a function that:
 1. splits the string at the first vowel
 2. stores the first item and deletes it from the array
 3. pops that item to the end
 4. pops "ay" to the end
 5. joins the array as a string
 6. returns the string

5. Write the parent code to organize pure codes
*/


const vowelStartYayEnd = (word) => {
  //checks if anything in the array (vowels) is in the first position (first letter) of the word. This method returns -1 if it doesn't match anything in the array
  if (["a", "e", "i", "o", "u"].indexOf(word[0]) > -1) {
    return word = word + "yay"
  } else {
    return consonantStartAyEnd(word);
  }
}

const consonantStartAyEnd = (word) => {
  //for loop finds the location of the first vowel
  for (var i = 0; i < word.length; i++) {
    if (["a", "e", "i", "o", "u"].indexOf(word[i]) > -1) {
      //moveConsonants saves the string from position 0 to the position of the first vowel
      let moveConsonants = word.slice(0, i);
      //chunk saves the string from the position of the first vowel to the end of the string
      let chunk = word.slice(i, word.length);
      //puts all of the pieces together
      word = chunk + moveConsonants + "ay";
      return word;
    }
  }
}

const isValid = (word) => {
  //lowercases all of the letters and trims whitespace from the front or the back
  word = word.toLowerCase().trim();
  //checks if string includes a space, hyphen or underscore
  if (word.includes(" ") || word.includes("-") || word.includes("_")) {
    return "This pig only latins one word at a time today"
  } else {
    //makes sure the word only has letters
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let letterChecker = 0
    for (var i = 0; i < word.length; i++) {
      if (letters.indexOf(word[i]) > -1) {
        letterChecker = letterChecker + 1
      }
    }
    if (letterChecker == word.length) {
      return vowelStartYayEnd(word);
    } else {
      return "Silly rabbit, pig latin is for letters!"
    }
  }
}


function pigLatin(word) {
  return isValid(word)
}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log(pigLatin(answer));
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
