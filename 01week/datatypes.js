'use strict'

//Write a JavaScript program to display the current day and time.

const dateAndTime = () => {
  return "It's " + new Date().getMonth() + "/" + new Date().getDate() + "/"
  + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes()
}

console.log(dateAndTime());


//Write a JavaScript program to convert a number to a string.

const stringMe = (pickANumber) => {
  return pickANumber.toString();
}

console.log(typeof stringMe(15));

//Write a JavaScript program to convert a string to the number.

const numMe = (stringynum) => {
   return parseInt(stringynum, 10);
}

console.log(typeof numMe('15'));

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
