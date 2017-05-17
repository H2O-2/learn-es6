"use strict";

for (var i = 0; i < 10; i++) {}
//console.log(i);


//console.log(i); This will result in an error because of keyword let, useful in for loops


for (var _i = 0; _i < 5; _i++) {}
//let i = i; ERROR: i was used before declared


// No variable hoisting in ES6
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
// console.log(bar); // 报错ReferenceError
// let bar = 2;