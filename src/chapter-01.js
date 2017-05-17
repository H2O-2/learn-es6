for (let i = 0; i < 10; i++) {
	//console.log(i);
}

//console.log(i); This will result in an error because of keyword let, useful in for loops





for (let i = 0; i < 5; i++) {
	//let i = i; ERROR: i was used before declared
}





// No variable hoisting in ES6

// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
// console.log(bar); // 报错ReferenceError
// let bar = 2;





// TDZ(Temporary Dead Zone, 暂时性死区)

/*
if (true) {
  // TDZ开始, 
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError
  typeof temp; // typeof will also result in error!
  typeof randomvar // but a variable that doesn't exist will not result in error

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
*/

//let x = x; // another TDZ error






