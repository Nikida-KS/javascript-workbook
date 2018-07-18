'use strict'

//Write a JavaScript program to display the current day and time.
const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();
const hour = new Date().getHours();
const minute = new Date().getMinutes();

console.log(`The day of our lord: ${month}/${day}/${year}`)
console.log(`The time of our life: ${hour}:${minute}`)

//this is called template literal using backticks

console.log("It's " + new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear());

//Write a JavaScript program to convert a number to a string.

const stringMe = 15;
const strung = stringMe.toString();
console.log(strung + ' is a ' + typeof strung);

//Write a JavaScript program to convert a string to the number.

const numMe = 25;
const numbed = parseInt(numMe, 10);
console.log(numbed + ' is a ' + typeof numbed);

/*Write a JavaScript program that takes in different datatypes and prints out whether they are a:
Boolean
Null
Undefined
Number
NaN
String*/

 const typer = (typeMe) => {
   return typeof typeMe
 }

 console.log(typer('three'));

//Write a JavaScript program that adds 2 numbers together.

const sum =(num1, num2)=>{
  if(typeof num1 === "number" && typeof num2 === "number"){
    return num1 + num2;
  }
}
console.log(sum(5, 10));

//Write a JavaScript program that runs when 1 of 2 things are true.

const truthy =(input1, input2)=>{
  if(input1 || input2){
    return "there is some truth to this"
  }
}
console.log(truthy(null, 3));

//Write a JavaScript program that runs when both things are not true.

const falsey =(input1, input2)=>{
  if(!input1 && !input2){
    return "fake news"
  }
  else{
    return " "
  }
}
console.log(falsey(null, NaN));
