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



//const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动
const constTest = {};
constTest.field1 = 1; // this works
//constTest = {}; This does not work



// var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
var globalTest = 1;
console.log(window.globalTest); // 1
let globalTest2 = 1;
console.log(window.globalTest2); // undefined








// 二进制和八进制
(function(){
  console.log(0b111110111 === 503);
})(); // true
(function(){
  console.log(0o767 === 503);
})(); // true






// 模板字符串, 用反引号（`）标识

// 普通字符串
console.log(`In JavaScript '\n' is a line-feed.`);

// 多行字符串
console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
console.log(`Hello ${name}, how are you ${time}?`);

// 所有模板字符串的空格和换行，都是被保留的, 可以使用trim方法消除

$(document).ready(function() {
  $('.testDiv').html(`
    <ul>
      <li>first</li>
      <li>second</li>
    </ul>`.trim());
});




// Number对象新提供了方法逐步减少全局性方法，使得语言逐步模块化
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false


Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN('15'); // false
Number.isNaN(true); // false
Number.isNaN(9/NaN); // true
Number.isNaN('true'/0); // true
Number.isNaN('true'/'true'); // true

// 传统方法先调用Number()将非数值的值转为数值，再进行判断
isFinite(25); // true
isFinite("25"); // true
Number.isFinite(25); // true
Number.isFinite("25"); // false

isNaN(NaN); // true
isNaN("NaN"); // true
Number.isNaN(NaN); // true
Number.isNaN("NaN"); // false
Number.isNaN(1); // false


// parseInt()和parseFloat行为完全保持不变
Number.parseInt('12.34'); // 12
Number.parseFloat('123.45#'); // 123.45


// Number.isInteger()用来判断一个值是否为整数
Number.isInteger(25);
Number.isInteger(25.0);
Number.isInteger(25.1);


//新增一个极小的常量Number.EPSILON, 如果误差能够小于Number.EPSILON，我们就可以认为得到了正确结果


//引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量(-2^53 ~ 2^53), Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
Number.isSafeInteger('a'); // false
Number.isSafeInteger(null); // false
Number.isSafeInteger(NaN); // false
Number.isSafeInteger(Infinity); // false
Number.isSafeInteger(-Infinity); // false

Number.isSafeInteger(3); // true
Number.isSafeInteger(1.2); // false
Number.isSafeInteger(9007199254740990); // true
Number.isSafeInteger(9007199254740992); // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER); // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false



// Math.trunc方法用于去除一个数的小数部分，返回整数部分
Math.trunc(4.1); // 4
Math.trunc(4.9); // 4
Math.trunc(-4.1); // -4
Math.trunc(-4.9); // -4
Math.trunc(-0.1234); // -0

// 新增了指数运算符
console.log(2 ** 2);
let powTest = 4;
powTest **= 3;
console.log(powTest);




// ES6 允许为函数的参数设置默认值
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

var p = new Point();
console.log(p); // { x: 0, y: 0 }

function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello'); // Hello World
log('Hello', 'China'); // Hello China
log('Hello', ''); // Hello

let defaultVar = 99;
var foo = function(p = defaultVar + 1) {
  console.log(p);
};

foo(); // 100

defaultVar = 100;
foo(); // 101

function throwIfMissing() {
  throw new Error('Missing parameter');
}

function mightThrow(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

mightThrow('deleteToThrow');
// Error: Missing parameter




//rest 参数(...变量名)
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

console.log(add(2, 5, 3)); // 10

// 扩展运算符, 将一个数组转为用逗号分隔的参数序列
console.log(...[1, 2, 3]);
// 1 2 3

console.log(1, ...[2, 3, 4], 5);
// 1 2 3 4 5




// 箭头函数

var f = () => 5; // without parameter
// is equal to
var f = function(v) {
  return v;
};


var f = v => v;
// is equal to 
var f = function () { return 5; };



// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
var getTempItem = id => ({ id: id, name: "Temp" });





for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log("testing: ", i);
  }, 5000*i);
}

