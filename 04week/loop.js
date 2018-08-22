//for loop: Use a for loop to console.log each item in the array carsInReverse.

const carsInReverse = ["Tesla", "Prius", "BMW", "Audi"]
for(var i = 0; i < carsInReverse.length; i++){
  console.log(carsInReverse[i]);
}

/*
for...in loop
Create an object (an array with keys and values) called persons with the following data:
firstName: "Jane"
lastName: "Doe"
birthDate: "Jan 5, 1925"
gender: "female"
Use a for...in loop to console.log each key.
Then use a for...in loop and if state to console.log the value associated with the key birthDate.
*/

const persons = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female",
};


for (const keys in persons) {
  console.log(persons[keys]);
}

for (const birthKey in persons) {
  if(birthKey == "birthDate"){
    console.log(persons.birthDate)
  }
}

//while loop: Use a for loop to console.log the numbers 1 to 1000.

let whileNumber = 0;
while (whileNumber < 1000){
  whileNumber += 1;
  console.log(whileNumber);
}

//do...while loop: Use a do...while loop to console.log the numbers from 1 to 1000.

let number = 0;
do {
  number += 1;
  console.log(number);
}
while (number < 1000);

/*
When is a for loop better than a while loop? A for loop is better than a while loop
when you want something done a certain number of times, not just as long as the condition is true.

How is the readability of the code affected? The readability of the code is affected because
the while loop is more simple and the for loop is more detailed.

What is the difference between a for loop and a for...in loop? For loops iterate through
a condition, while for...in loops iterate through the keys of an object.

What is the difference between a while loop and a do...while loop?

while loops run through a block of code while a specified condition is true, but do..while loops
run through a block of code once, and then repeats the loop while a specified condition is true
*/
