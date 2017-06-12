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



// Class不存在变量提升（hoist），这一点与ES5完全不同。
//new Foo(); // ReferenceError
class Foo {}


// super表示父类，子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，
// 而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}



// export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。函数与类同理

// 报错
//export 1;

// 报错
/*
var m = 1;
export m;
*/

// 正确写法：
/*
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};





//import命令具有提升效果，会提升到整个模块的头部，首先执行。因为import命令是编译阶段执行的，在代码运行之前。不能使用表达式和变量
foo();

import { foo } from 'my_module'; // foo()正确执行



// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}



//除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// main.js

import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));

//整体加载的对象不允许运行时改变
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};



*/


























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

/*

// Class不存在变量提升（hoist），这一点与ES5完全不同。
//new Foo(); // ReferenceError
class Foo {}


// super表示父类，子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，
// 而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
*/


// export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。函数与类同理

// 报错
//export 1;

// 报错
/*
var m = 1;
export m;
*/

// 正确写法：
/*
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};



//import命令具有提升效果，会提升到整个模块的头部，首先执行。因为import命令是编译阶段执行的，在代码运行之前。不能使用表达式和变量
foo();

import { foo } from 'my_module'; // foo()正确执行



// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;
>>>>>>> home

for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log("testing: ", i);
  }, 5000*i);
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// main.js

import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));

//整体加载的对象不允许运行时改变
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};

*/

function test() {
  return this;
}

console.log('function\'s this: ', test());

let test2 = test;

console.log('function reference\'s this: ', test2());

let objTest = {
  test2: test
};

console.log('method\'s this: ', objTest.test2());

let objTest2 = {
  test2: test
}

console.log('another method\'s this: ', objTest2.test2());


let puppet = {
  rules: false
}

function Emperor() {
  this.rules = true;

  return puppet;
}


let emperor = new Emperor();

console.assert(emperor === puppet, 'Puppet it is :(');
console.assert(emperor.rules === false, 'No idea how to rule :(');



window.onload = function() {
  function Button(){
    this.clicked = false;
    this.click = function(){
      console.log('inside this', this);
      this.clicked = true;
      console.log('button clicked: ', button.clicked);
    };
  }
  var button = new Button();

  var button = new Button();
  var elem = document.getElementById("test");
  elem.addEventListener("click", button.click);
}


var outerValue = "samurai";
var later;

function outerFunction(){
    var innerValue = "ninja";
    function innerFunction(){
      console.assert(outerValue === "samurai", "I can see the samurai.");
      console.assert(innerValue === "ninja", "I can see the ninja.")
    }
    
    later = innerFunction;
}

outerFunction();
later();


const testArr = [];

testArr.push('modified');
console.log('const array', testArr);


function testOverwrite() {
  return 0;
}

function testOverwrite() {
  return 100;
}

console.log('testOverwrite: ', testOverwrite());

console.assert(typeof fun === "function", "We access the function");
var fun = 3;
console.assert(typeof fun === "number", "Now we access the number");
function fun(){}
console.assert(typeof fun === "number", "Still a number");



function Ninja() {
  var feints = 0;
  this.getFeints = function(){
    return feints;
  };
  this.feint = function(){
    feints++;
  };
}

var ninja1 = new Ninja();
ninja1.feint();
var imposter = {};
imposter.getFeints = ninja1.getFeints;
console.log('fake private: ', imposter.getFeints());



function* GeneratorTest() {
  yield "test1";
  console.log('Generator Restart');
  yield "test2";
}

const genIter = GeneratorTest();

console.log('gen 1: ', genIter.next());
console.log('gen 2: ', genIter.next());
console.log('gen 3: ', genIter.next());

function* GeneratorPassVal(val) {
  const passedval = yield ("test1 " + val);
  console.log('Generator Restart');
  const passedval2 = yield "test2 " + passedval;
  console.log('last val: ', passedval2)
}

const genIter2 = GeneratorPassVal('start!');

console.log('gen 1: ', genIter2.next());
console.log('gen 2: ', genIter2.next('passed!'));
console.log('gen 3: ', genIter2.next('passed again!'));








const immediatePromise = new Promise((resolve, reject) => {
  console.log('Promise start');
  resolve('resolved');
});

immediatePromise.then(val => console.log(val));

console.log('code end');


function getJSON(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open("GET", url);

    request.onload = function() {
      try {
        if (this.status === 200) {
          resolve(JSON.parse(this.response));
        } else {
          reject(this.status + ' ' + this.statusText);
        }
      } catch(e) {
        reject(e.message);
      }
    }

    request.onerror = function() {
      reject(this.status + ' ' + this.statusText);
    }

    request.send();
  });
}

getJSON('../package.json').then(res => console.log(res)).catch(e => console.log('ERROR: ' + e));


function* fibonacci() { // a generator function
  let [prev, curr] = [1, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  console.log(n);
  // truncate the sequence at 1000
  if (n >= 10) {
    break;
  }
}



const obj1 = { test: 1 };
console.log("test" in obj1);

function MethodTest(){
  this.swung = false;
  this.swingSword = function(){
   return !this.swung;
  };
}
Ninja.prototype.swingSword = function(){
  return this.swung;
};

const ninja = new MethodTest();
console.log('swung: ', ninja.swingSword());




let pd = {};
pd.name = "Yoshi";
pd.weapon = "kusarigama";

Object.defineProperty(pd, "sneaky", {
  configurable: false,
  enumerable: false,
  value: true,
  writable: true
});

for(let prop in pd){
  console.log(prop !== undefined, "An enumerated property: " + prop);
 }
