# Secrets of the JavaScript Ninja 

---

Chapter 3
==

## 3.1

Object in JS posn.1040 - 1047:
> - Can be created via literals
- Can be assigned to variables, array entries and properties of other objects
- Can be passed as aarguments to functions
- Can be returned as values from functions
- Can possess properties that can be dynamically created and assigned

Function possess all the capabilities of objects(*first-class objects*). Functions are objects that is invokable

**Callback function**: this term stems from the fact that we're establishing a function that other code will later "call back" at an appropriate point of execution.

A use of callback in [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?v=control):

```JS
var values = [0,3,2,7,8,4,1];

values.sort(function(value1, value2) {
    return value1 - value2;
});
```

## 3.2

Add id field to function to check for duplicates posn.1156
Add cache field to function to store prior results.

## 3.3

Ways to define functions:
> - Function declaration: function foo(args) {} -- **Function name is mandatory**
- Function expression: var foo = function(args) {} **Function name is optional**
- Arrow function: var foo = (args) => {}
- Function constructor: new Function(args, 'function body')
- Generator function: function* foo() {yield 1;}

**Immediate Function**: (function(args) {})(args); Immediately Invoked Function Expression(IIFE)

Adding unary operators can also signal to the JavaScriopt engine that it is dealing with expressions instead of statements.
> - +function(){}();
- -function(){}();
- !function(){}();
- ~function(){}();

**Arror function** can be defined in two ways:
> - (param...) => expression. This will return the expression
- (param...) => { statement }. This will return undefined if no return statment is provided.

## 3.4
> - **Parameter** is a variable that we list as part of a function definition
- **Argument** is a value that is passed to the function when invoked

No error will be raised for different number of parameters and arguments in JS

**Rest parameters** posn.1374: prefixing the **last-named** argument of a functions with an ellipsis, containing all the remaining passed arguments

Chapter 4
==

## 4.1

**The arguments parameter** posn.1520: a collection of all arguments passed to a function
> - *arguments.length*(indicate the exact number of arguments). e.g., for a *function foo(a,b,c)*, a call of *foo(1,2,3,4,5)* will have *arguments.length === 5*
- *arguments[i]*(get the ith argument)
- *arguments* object is NOT JavaScript Array

arguments object can access arguments regardless of function parameter

```JS
function sum() {
  var sum = 0;

  for(let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }

  return sum;
}

console.log('arguments sum: ', sum(1,2,3,4,5)); // arguments sum: 15
```

arguments boject is an alias to function parameters:
```JS
function test(args1) {
  
  console.log(args1); // first
  console.log(arguments[0]); // first
  
  arguments[0] = 'second';
  
  console.log(args1); // second
  console.log(arguments[0]); // second
  
}

test('first')
```

However in strict mode, the value of the argument cannot be changed

```JS
function test(args1) {
  
  console.log(args1); // first
  console.log(arguments[0]); // first
  
  arguments[0] = 'second';
  
  console.log(args1); // **first**
  console.log(arguments[0]); // second
  
}

test('first')
```

## 4.2

Ways to invoke a function:
> - As a function: foo()
- As a method: obj.foo()
- As a constructor: new Obj()
- Via the function's apply or call methods: foo.call(obj) or foo.apply(obj)

### When invoke as a function, the function context can be:
> - In non-strict mode: global context(*window* object)
- In strict mode: *undefined*

### When invoke as a method:
```JS
function test() {
  return this;
}

console.log('function\'s this: ', test()); // undefined

let test2 = test;

console.log('function reference\'s this: ', test2()); // undefined

let objTest = {
  test2: test
};

console.log('method\'s this: ', objTest.test2()); // objTest

let objTest2 = {
  test2: test
}

console.log('another method\'s this: ', objTest2.test2()); // objTest2
```

### When invoke as a constructor:
> Calling a function with the keyword *new* triggers the following steps:

> - A new empty object is created
- This object is passed to the constructor as the *this* parameter, and thus becomes the constructor's function context.
- The newly constructed object is returned as the new operator's value

If consturctors return primitive values, it's omitted:
```JS
function Obj() {
    this.test = function() {
        return true;
    }
    
    return 1;
}

console.log(Obj()); // 1

var obj = new Obj();
console.log(typeof obj === "object"); // true
```

If constructors explicitly return object values, it replaces the newly constructed object passed as *this* to the constructor:
```JS
let puppet = {
  rules: false
}

function Emperor() {
  this.rules = true;

  return puppet;
}


let emperor = new Emperor();

console.assert(emperor === puppet, 'Puppet it is :('); // assertion passed
console.assert(emperor.rules === false, 'No idea how to rule :('); // assertion passed
```

### When invoke with the apply and call methods
```HTML
<body>
	<button id="test">Click!</button>
</body>
```
```JS
window.onload = function() {
  function Button(){
    this.clicked = false;
    this.click = function(){
      console.log('inside this', this); // <button> element
      this.clicked = true;
      console.log('button clicked: ', button.clicked); // false
    };
  }
  var button = new Button();

  var button = new Button();
  var elem = document.getElementById("test");
  elem.addEventListener("click", button.click);
}
```

Using function's built-in method *apply* and *call* to explicitly specify the function context:
> - apply(context, [args])
- call(context, arg1, arg2...)

```JS
function juggle() {
  var result = 0;
  for (var n = 0; n < arguments.length; n++) {
    result += arguments[n];
  }
  this.result = result;
}

var ninja1 = {};
var ninja2 = {};
juggle.apply(ninja1,[1,2,3,4]);
juggle.call(ninja2, 5,6,7,8);

console.assert(ninja1.result === 10, "juggled via apply"); // assertion passed
console.assert(ninja2.result === 26, "juggled via call"); // assertion passed
```

A simple implementation of forEach using call:
```JS
function forEach(list, callback) {
    for(let i = 0; i < list.length; i++) {
        callback.call(list[i], i);
    }
}
```


## 4.3

Arrow functions don't have *this* value and instead remember the value of the *this* parameter at the time of their definition.

However consider the following code:
```JS
var button = {
  clicked: false,
  click: () => {
    this.clicked = true;
    console.assert(button.clicked,"The button has been clicked"); // assertion fail
}; }
```
In this case, the arrow function is created as a property value on an object literal which is created in the global code. So the *this* value of the arrow function will be *window*

**The bind method** creates and returns a new function that's bound to the passed-in object. It will not change the original function
```JS
var boundFunction = button.click.bind(button);
```


Chapter 5
==

## 5.1
A **closure** allows a function to access and manipulate variables that are external to that function.

```JS
var outerValue = "samurai";
var later;

function outerFunction(){
    var innerValue = "ninja";
    function innerFunction(){
      console.assert(outerValue === "samurai", "I can see the samurai."); // assertion passed
      console.assert(innerValue === "ninja", "I can see the ninja.") // assertion passed
    }
    
    later = innerFunction;
}

outerFunction();
later();
```

In the code above, although later() is executed after outerFunction(), the assertion still passed. This is because when innerFunction is declared, a closure is created as well to encompass the function definition as well as **all variables** in the scope (including those are used inside the function but declared outside like outerValue and innerValue) **at the point of function definition**.


## 5.2
> - Implementing private field inside object(use *var* inside object)
- Use in callbacks

## 5.3
> - global execution context: only one exists posn.2124
- function execution context: a new one is created on each function invocation

**Execution context stack or call stack** posn.2135

## 5.4

**Lexical environment** posn.2180: colloquially as *scopes*

**Identifier resolution** posn.2239

## 5.5

An initialization has to be provided when **const** is declared posn.2261.

*const* variables cannot be assigned a new value but can be modified posn.2286.
```JS
const testArr = [];

testArr.push('modified');
console.log('const array', testArr); // ['modified']
```

*var* defines the variable in the closest function or global lexical environment. The blocks are ignored!
*let* and *const* define variable in the closest lexical environment including blocks.

Execution of JS code occurs in two phases:
> - The first phase is activated whenever a new lexical environment is created. JS engine visits and registers all declared variables and functions within the current lexical environment.
- The second phase starts after the first is completed:
1. Function environment: *arguments* identifier is created
2. Global or function environment: current code is scanned without going into the body of other functions. Find function declarations(not function expressions or arrow functions) and if name already exists, **overwrite existing function**. Notice that the overwrite only works with function delaration, not function expression or arrow function.
3. Scan for variable declaration: **Block environment**: register *let* and *const* variables; **Non-block**: register all *var* variables outside functions and *let* and *const* variables outside blocks. **This is how variable hoisting appeared**.

see figure 5.14 posn.2386


```JS
console.assert(typeof fun === "function", "We access the function"); // assertion passed
var fun = 3;
console.assert(typeof fun === "number", "Now we access the number"); // assertion passed
function fun(){}
console.assert(typeof fun === "number", "Still a number"); // assertion passed
```
1. First assertion: the first pass of the code only evaluate function declaration
2. Second assertion: override
3. Third assertion: during the actual program execution, function declarations are **skipped**.

```JS
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
console.log('fake private: ', imposter.getFeints()); // 1
```
From the above code, the 'private' variable in JS is actually fake(can be accessed by any object). 


Chapter 6
==

## 6.2

```JS
function* GeneratorTest() {
  yield "test1";
  console.log('Generator Restart');
  yield "test2"
}

const genIter = GeneratorTest();

console.log('gen 1: ', genIter.next()); // {value: test1, done: false}
console.log('gen 2: ', genIter.next()); // {value: test2, done: false}
console.log('gen 3: ', genIter.next()); // {value: undefined, done: true}
```

Generator functions can also receive data:
> - Before execution by passing argument to generator function 
- During execution by passing value to *next()*:

```JS
function* GeneratorPassVal(val) {
  const passedval = yield ("test1 " + val);
  console.log('Generator Restart');
  const passedval2 = yield "test2 " + passedval;
  console.log('last val: ', passedval2)
}

const genIter2 = GeneratorPassVal('start!');

console.log('gen 1: ', genIter2.next()); // {value: test1, done: false}, the first value passed into next() will be ignored!
console.log('gen 2: ', genIter2.next('passed!')); // {value: test2 passed!, done: false}

// last val: passed again!

console.log('gen 3: ', genIter2.next('passed again!')) // {value: undefined, done: true};
```

Generator works like a state machine:
> - Suspended start: when generator is created, before any code is executed.
- Executing: when *next()* is called and there exists code to be executed.
- Suspended yield: when yield is reached. It creates a new object carrying the return value yields it and suspends its execution.
- Completed: when generator either runs into a return or runs out of code execute.

When the execution of Generator function is paused, it is popped from the stack but IS NOT DISCARDED, the iterator keeps a reference to it(analogy of closure). When *next()* is executed, it is pushed to the stack again.

**Promise** is a placeholder for a value that we don't have now but will have later.

Promise constructor takes a function as argument(**excutor function**). The function has two parameters: **resolve** and **reject**

try-catch cannot be used with callbacks:
```JS
// Will not work
try {
    getJSON("data/ninjas.json", function() {
        //Handle results
    });
} catch(e) {/*Handle errors*/}
```

## 6.3

States of promise:
> - Pending(unresolved state): starting state 
- Fulfilled state: successfully obtained promised value
- Rejected state: reject function called or unhandled exception occurs

fulfilled state and rejected state cannot switch. Once a state is reached promise will always stay in the state. We say that a promise is **resolved**.
```JS
const promise = new Promise((resolve, reject) => {
  resolve("Hattori");
  setTimeout(()=> reject("Yoshi"), 500);
});
promise.then(val => alert("Success: " + val))
       .catch(e => alert("Error: " + e)); // the error handler will
```

```JS
const immediatePromise = new Promise((resolve, reject) => {
  console.log('Promise start');
  resolve('resolved');
});

immediatePromise.then(val => console.log(val));

console.log('code end');

// output:
// 'Promise start'
// 'code end'
// 'resolved'
```

Two ways of explicit reject:
> - pass reject function as the second argument of *then()*
- use *catch()*

```JS
// Use only then()
const promise = new Promise((resolve, reject) => {
  reject("Explicitly reject a promise!");
});
promise.then(
  () => fail("Happy path, won't be called!"),
  error => pass("A promise was explicitly rejected!")
);


// Use catch()
var promise = new Promise((resolve, reject) => {
  reject("Explicitly reject a promise!");
});
promise.then(() => fail("Happy path, won't be called!")) .catch(() => pass("Promise was also rejected"));
```

Implicit reject -- exception
```JS
const promise = new Promise((resolve, reject) => {
  undeclaredVariable++;
});
promise.then(() => fail("Happy path, won't be called!"))
       .catch(error => pass("Third promise was also rejected"));
```

Implement getJSON() using promise:
```JS
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
```

Every *then()* returns a promise, so promise can be chained:
```JS
getJSON("data/ninjas.json")
 .then(ninjas => getJSON(ninjas[0].missionsUrl))
 .then(missions => getJSON(missions[0].detailsUrl))
 .then(mission => assert(mission !== null, "Ninja mission obtained!"))
 .catch(error => fail("An error has occurred")); // catch() can catch error in every then()
```

Promise.all(): takes an array of promises and creates a new promise that successfully resolves when all passed-in promises resolve, and rejects if one of the promises fails.
```JS
Promise.all([getJSON("data/ninjas.json"), getJSON("data/mapInfo.json"),
             getJSON("data/plan.json")]).then(results => {
  const ninjas = results[0], mapInfo = results[1], plan = results[2];
  }
```
Promise.race(): takes an array of promises and return a new promise that resolves or rejects as soon as the first of the promises resolves or rejects.
```JS
Promise.race([getJSON("data/yoshi.json"), getJSON("data/hattori.json"),
              getJSON("data/hanzo.json")])
       .then(ninja => {
         assert(ninja !== null, ninja.name + " responded first");
        }).catch(error => fail("Failure!"));
```

## 6.4
Implementation of async function
```JS
async(function*(){
    try {
      const ninjas = yield getJSON("data/ninjas.json");
      const missions = yield getJSON(ninjas[0].missionsUrl);
      const missionDescription = yield getJSON(missions[0].detailsUrl);
      //Study the mission details
    }
    catch(e) {
        //Oh no, we weren't able to get the mission details
    }
});

function async(generator) {
    var iterator = generator();
  
    function handle(iteratorResult) {
        if(iteratorResult.done) { return; }
        
        const iteratorValue = iteratorResult.value;
        
        if(iteratorValue instanceof Promise) {
            iteratorValue.then(res => handle(iterator.next(res)))
                         .catch(err => iterator.throw(err));
        }
    }

    try {
      handle(iterator.next());
    }
    catch (e) { iterator.throw(e); }
}
```

for-of loop can also be used with generators
```JS
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
  if (n >= 1000) {
    break;
  }
}

```


Chapter 7
==

## 7.1

**Prototype chain**

## 7.2

```JS
function Ninja(){}
Ninja.prototype.swingSword = function(){
  return true;
};
const ninja1 = Ninja(); // nothing happens, ninja1 === undefined

const ninja2 = new Ninja(); // instance of Ninja created
```
> - Function Ninja's prototype object has a *constructor* property that reference back to the function.
- ninja2 has its prototype property set to Ninja's prototype.
- swingSword method is a property of the Ninja's Prototype, not a property of ninja instance.

Instance members will hide properties of the same name defined in the prototype:
```JS
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
console.log('swung: ', ninja.swingSword()); // true; this.swingSword() ran
```
In the above code, prototype chain is not traversed when the swingSword() function is called.
However this will cause every instance of MethodTest to have its own copy of the method. This costs memory, thus object methods should be on the function's prototype.

Prototype object can also be completely replaced:
```JS
function Ninja(){
  this.swung = true;
}
const ninja1 = new Ninja();

Ninja.prototype.swingSword = function(){
  return this.swung;
};

Ninja.prototype = {
 pierce: function() {
   return true;
 }
}

const ninja2 = new Ninja();
```
In the above code, ninja 1 will preserve the old protype with swingSword() since its prototype object is pointing to the old prototype, and the old prototype's contructor still points to the Ninja function. The old prototype object will be kept alive as long as there is still object pointing to it.

```JS
function Ninja(){}
const ninja = new Ninja();
const ninja2 = new ninja.constructor(); // the constructor method is directly available to all objects even when the original function(Ninja()) is out of scope
```

## 7.3

```JS
SubClass.prototype = new SuperClass();
```

*instanceof* can determine whether the function inherits the functionality of any object in its prototype chain.

When searching for a method in SuperClass, JS engine will first search SubClass instance, then SuperClass instance created by new(which is the prototype of SubClass), and last the SuperClass prototype.

If inheritance is done like:
```JS
SubClass.prototype = SuperClass.prototype;
```
then any changes to the SubClass prototype will also change SuperClass, which is not desired.

**Property descriptor**(属性描述符): every object property is described with a property descriptor through which we can configure the following keys:
> - configurable: if true, the property's descriptor can be changed and property can be deleted.
- enumerable: if true, the property shows up during a for-in loop over the object's properties.
- value: specifies the value of the property. Default to undefined.
- writable: if true, the property value can be cahnged by using an assignemnt.
- get: defines the getter function. Can't be defined with value and writable.
- set: ...setter...

```JS
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
    // only output name and wepon since sneaky's enumerable is set to false
    console.log(prop !== undefined, "An enumerated property: " + prop);
}
```

**instanceof** operator works by checking whether the current prototype of the Ninja function is in the prototype chain of the ninja instance.

```JS
function Person(){}
function Ninja(){}

Ninja.prototype = new Person();

const ninja = new Ninja(); // ninja instance of Person === true, ninja instanceof Ninja === true
```

However if prototype is changed after assignment, instanceof will be false:
```JS
function Ninja(){}

const ninja = new Ninja();

Ninja.prototype = {}; // ninja instanceof Ninja == false
```
ninja's prototype points to the original Ninja prototype, which replaced and now not the prototype object of Ninja.


Chapter 8
==

## 8.1

Use keyword get and set for getter and setter:
```JS
const ninjaCollection = {
  ninjas: ["Yoshi", "Kuma", "Hattori"],
  get firstNinja(){
    console.log("Getting firstNinja");
    return this.ninjas[0];
  },
  set firstNinja(value){
    console.log("Setting firstNinja");
    this.ninjas[0] = value;
  }
}

console.log('test getter', ninjaCollection.firstNinja);

ninjaCollection.firstNinja = "Hachi";
console.log('test setter', ninjaCollection.firstNinja);
```
the process getter method is same as a standard function(getter method pushed to stack).

If the class has no setter for a certain property and user tries to set value:
> - In non-strict mode, JavaScript engine will ignore the request.
- In strict mode, JavaScript engine will throw a type error, indicating that we're trying to assign a value to a property that has a getter but no setter.

The mimic of private property using closure has some restrictions:
```JS
function PrivateTest() {
  let privateVar = 'private';

  this.PrivateObject = {
    accessPrivate: function() {
      console.log('privateVar: ', privateVar);
    }
  }
}

PrivateTest.PrivateObject.accessPrivate(); // Uncaught TypeError: Cannot read property 'accessPrivate' of undefined
```
From the above code we know that prototype object face the same problem, which: a prototype function of a class cannot access its private properties.


## 8.2

**Proxy** is a surrogate through which we control access to another object.

```JS
const proxyTest = { name: "Komei" };
const representative = new Proxy(proxyTest, {
  get: (target, key) => {
    console.log("Reading " + key + " through a proxy");
    return key in target ? target[key] : "Don't bother the emperor!";
  },
  set: (target, key, value) => {
    console.log("Writing " + key + " through a proxy");
    target[key] = value;
    return true;
  }
});

console.log('Through proxy', representative.name);
representative.name = 'Tenno';
```
Through the Proxy constructor we create a proxy object that controls access to the target object by activating certain traps. Several traps are available:
> - get
- set
- apply
- has
- construct
- enumerate
- getPrototypeOf / setPrototypeOf
- ..., see http://es6.ruanyifeng.com/#docs/proxy


Chapter 9
==

## 9.1

Two ways to create new arrays:
> - Using the built-in Array constructor.
- using array literals.

Array in JavaScript is an Object.

Simple methods for add and remove:
> - push. Returns the length of the new array.
- unshift: add item to the beginning of the array. Returns the length of the new array.
- pop. Returns the removed element.
- shift: remove an item from the beginning of the array. Returns the removed element.

push and pop are significantly faster than shift and unshift.

splice method:
```JS
arr.splice(index, numOfElements); // return an array of items that has been removed.
```

Iteration: 
> forEach(), return *undefined*.

Mapping: 
> map(), return a new Array.

Testing: 
> - every(callback), return *true* if all callbacks return true.
- some(callback), return *true* if one callback returns true.

Find:
> - find(callback), return the first element found.
- filter(callback), return a new array containing all the items that is found.
- indexOf(element), return first index of the found element, -1 if not found.
- lastIndexOf(element), return last index of the found element, -1 if not found.
- findIndex(callback), return first index of the element that pass the callback test, -1 if not found.

Aggregate:
> reduce(callback(accumulator, curVal, curIndex)), return the value of reduction.


## 9.2

Associate array can only take number and string as key:
```JS
const firstElement = document.getElementById("firstElement");

map[firstElement] = { data: "firstElement"}; // the key is actually ""[object HTMLDivElement]"
```


## 9.3

**Spread Operator**(扩展语句): 
```JS
function addAllArgs(a, b, c) {
  return a + b + c;
}

const allArgs = [1, 2, 3];

console.log('Spread Operator Test:', addAllArgs(...allArgs)); // 6; '...' operator spreads the array.
```

**Union using Set**:
```JS
const ninjas = ["Kuma", "Hattori", "Yagyu"];
const samurai = ["Hattori", "Oda", "Tomoe"];

const warriors = new Set([...ninjas, ...samurai]);
console.log('warriors:', warriors); // a Set of "Kuma", "Hattori", "Yagyu", "Oda", "Tomoe"
```

**Intersection using Set**:
```JS
const ninjasSet = new Set(ninjas);
const samuraiSet = new Set(samurai);

const ninjaSamrai = new Set([...ninjasSet].filter(ninja => samuraiSet.has(ninja)));
console.log('ninjaSamrai:', ninjaSamrai); // a Set of only "Hattori"
```

**Difference using Set**:
```JS
const ninjasSet = new Set(ninjas);
const samuraiSet = new Set(samurai);

const pureNinjas = new Set([...ninjasSet].filter(ninja => !samuraiSet.has(ninja)));
```


## 10.2
Two ways to create a regular expression:
> - Regular expression literal (preferred)
- Constructing an instance of a RegExp object

Five flags that can be associated with regex:
> - i: makes the regex case-insensitive
- g: matches all instances of the pattern(*global*) instead of the default of *local*
- m: allows matches across multiple lines
- y: enables sticky matching
- u: enables the use of Unicode point escapes(\u{...})


Chapter 10
==

## 10.3

Two phases of processing:
> - Compilation: occurs when the regex is created. During compilation, the expression is parsed by the JS engine and converted into its internal representation.
- Execution: occurs when we use the compiled regex to match patterns in a string.

Regex is an object. Thus create by expression literal cannot be dynamic: 
```JS
const regex = /test/ + /test/ // Will not work
```
use new RegExp() instead.


## 10.4

String.prototype.match(regex) returns an array containing the entire match result and any parentheses-captured matched results; null if there were no matches.

```JS
const html = "<div class='test'><b>Hello</b> <i>world!</i></div>"
const localReg = /<(\/?)(\w+)([^>]*?)>/
const localMatch = html.match(localReg) 
// localMatch[0] === "<div class='test'>", The entire match
// localMatch[1] === "", The slash match in first capture, (\/?)
// localmatch[2] === "div", The tag match, (\w+)
// localmatch[3] === " class='test'", ([^>]*?)

const globalReg = /<(\/?)(\w+)([^>]*?)>/g
const globalMatch = html.match(globalMatch)
// globalMatch[0] === "<div class='test'>", first match
// globalMatch[1] === "<b>"
// globalMatch[2] === "</b>"
// globalMatch[3] === "<i>"
// globalMatch[4] === "</i>"
// globalMatch[5] === "</div>"
```
Note that the captures within each match are not returned for global match.

To get the captures under global, exec() can be used:
```JS
const html = "<div class='test'><b>Hello</b> <i>world!</i></div>";
const tag = /<(\/?)(\w+)([^>]*?)>/g;
let match, num = 0;
while ((match = tag.exec(html)) !== null) {
  console.log('match:', match);
  // first round: <div class='test'> and its captures("", "div", " class='test'")
  // second round: <b> and its captures
  // third round: </b> and its captures
  // ...
  num++;
}
```

Refering to captures:
> - within the match itself
- within a replacement string

```JS
console.log('replacement test:', "fontFamily".replace(/([A-Z])/g, "-$1").toLowerCase()); // font-family
```

replacement string: use $n to reference capture

**Passive subexpression**(非捕获): put notation ?: immediately after the opening parenthesis to indicate that the group is NOT a capture.
```JS
const nonCapture = /((?:ninja-)+)sword/;
console.log('non captures:', "ninja-ninja-sword".match(nonCapture)); // [ninja-ninja-sword, ninja-ninja], without ninja-
```

String.prototype.replace(regex|subStr, newSubStr|function)
return a new string where the specified value(s) has been replaced by the new value.

the function that replace() take in will be invoked and perform replace for every full matches.

Matching the newline character:
> /[\S\s]*/

\S: Match a single character other than white space.
\s:  a single white space character, including space, tab, form feed, line feed. 


Chapter 11
==

##11.1

Module system should be able to:
> - Define an interface
- Hide module internals

Use immediate function to hide internals:
```JS
const MouseCounterModule = function() {
    let numClicks = 0;
    const handleClick = () => {
        alert(++numClicks);
    };

    return {
        countClicks: () => {
            document.addEventListener("click", handleClick);
        }
    };
}();

MouseCounterModule.countClicks();
```
numClicks and handleClick are all hidden from outside scope but is kept alive by countClicks's closure.

##11.2

rename export:
```JS
export {sayHi as sayHello};
```
or 
```JS
import {greet as sayHello} from "Hello.js"
```


Chapter 12
==

## 12.1

**DOM fragments**

## 12.2

Some element attributes are also represented by element properties.
```JS
document.addEventListener('DOMContentLoaded', () => {
  const testDiv = document.querySelector('div');

  testDiv.setAttribute('id', 'test');
  console.log('Added div id:', testDiv.id); // Added div id: test
});
```
However, custom attributes for HTML elements are NOT represented by correspoding property.
> It is good convention to add 'data-' prefix for all custom attributes.

## 12.3

```HTML
<style>
    div {
		font-size: 5em;
		border: 1px solid black;
	}
</style>


<div style="color: white">TEST</div>
```
```JS
testDiv.style.background = "white";
console.log(testDiv.style); // CSSStyleDeclaration Object, have color: white and background: white but font-size and border are not defined.
```
Inline and assigned styles are recorded, but inherited styles aren't.

Any values in an elemnt's style property take precedence over anything inherited by a style sheet even with !important.

```JS
const computedStyle = getComputedStyle(testDiv);
console.log('computedStyle:', computedStyle); // a CSSStyleDeclartion Object
console.log('getPropertyValue:', computedStyle.getPropertyValue('font-size')); // font size in px
```

CSSStyleDeclaration Object's getPropertyValue() function takes the original name of CSS properties instead of camel case.

element.offsetWidth/offsetHeight can get the height and width of an element(default is auto). However when display:none, both are 0

To get the width and height of such elements:
> 1. Change display to block.
2. Set visibility to hidden.
3. Set position to absolute.
4. Get values.
5. Restore.

## 12.4

**Layout thrashing**: occurs when we perform a series of consecutive reads and writes to DOM. Recalculating layout is expensive so browser tries to delay it, however consider the following code:
```JS
const div1 = document.getElementById('id1');
const div2 = document.getElementById('id2');
const div3 = document.getElementById('id3');

const width1 = div1.clientWidth;
div1.style.width = width1 / 2 + "px"

const width2 = div2.clientWidth;
div2.style.width = width2 / 2 + "px"

const width3 = div3.clientWidth;
div3.style.width = width3 / 2 + "px"
```
In this situation the browser has to recalculate layout every time we change the width and then try to get the width again. If instead:
```JS
const div1 = document.getElementById('id1');
const div2 = document.getElementById('id2');
const div3 = document.getElementById('id3');

const width1 = div1.clientWidth;
const width2 = div2.clientWidth;
const width3 = div3.clientWidth;

div1.style.width = width1 / 2 + "px"
div2.style.width = width2 / 2 + "px"
div3.style.width = width3 / 2 + "px"
```
then the browser can first get the width and then calculate,.
see the layout [thrashing cheatsheet](http://ricostacruz.com/cheatsheets/layout-thrashing.html)

React uses **virtual DOM**, which lets user to write to a JS object mimicing the DOM first, and at last React will write the changes itself, increasing performance.


Chapter 13
==

## 13.1

> - Macrotask(or just task): one discrete, self-contained unit of work. After running a task, the browser can continue with other assignments such as re-rendering the UI of the page or perform garbage collection. E.g. creating main document object, parsing HTML, changing URL, timer events.
- Microtask: smaller tasks that update the application state and should be executed before the browser continues with other assignments such as re-rendering the UI. E.g. promise callbacks and DOM mutation changes

Event loop should use at least one queue for macrotasks and one queue for microtasks.

Event loop is based on two principles:
> - Tasks are handled one at a time.
- A task runs to completion and can't be interrupted by another task.

See image on posn.5853
> 1. Check the macrotask queue and run one macrotask if there is any.
2. Check the mircrotask queue and run all microtasks.
3. Check if UI needs re-render and render if needed.
4. Go back to 1

Some details:
> - Both task queues are placed outside the event loop, so adding tasks to the queues outside the event loop
- Both types of tasks are executed one at a time.
- All microtask should be executed before the next rendering.
- The browser usually tries to render the page 60 times per second (60 fps), which means the browser tries to render a frame every 16 ms.

Three situations that can occur:
> - The event loop reaches the decision of whether to render or not before 16 ms elapsed: if there isn't an explicit need to render the page, the browser may choose no to update.
- The event loop reaches the decision of whether to render or not around 16 ms: the browser updates the UI.
- The task and microtasks takes much more than 16 ms: the browser won't be able to update UI at the target frame rate, and the UI won't be updated. If a task takes more than a couple of seconds, the browser would show the "Unresponsive script" message.

Take a look at the following code (Referenced from [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)):
```JS
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```
The output is:
```
script start
script end
promise1
promise2
setTimeout
```
First mainline JavaScript is run so 'script start' and 'script end' are displayed. setTimeout is a macrotask so it is put after the solved Promise, which is microtask. Thus 'promise1' and 'promise2' are displayed and lastly 'setTimeout' is displayed.


## 13.2

The browser won't queue up more than one instance of a specific interval handler.

The delay of setTimeOut and setInterval don't necessarily mean processing the function after execution, it is the delay of adding the task to the queue. Thus for setInterval, it could have an interval of larger or smaller than 10ms

The following code is DIFFERENT from setInterval:
```JS
setTimeout(function repeatMe(){
  /* Some long block of code... */
  setTimeout(repeatMe, 10);
}, 10);
```
here the callback will never execute with an interval smaller than 10ms

Use the timers to break up long-running tasks:
```JS
setTimeout(function fn() {
    // do part of the job
    
    if (!done) {
        setTimeout(fn, 0);
    }
}, 0);
```
This allows the browser to complete the microtasks and re-render UI during the whole process of the long-running task.


## 13.3

Order which events are registered
> - Netscape: starts with the top element. document -> outer -> inner. **Event capturing**
- Microsoft: starts with the bottom element. **Event bubbling**

The useCapture parameter of addEventListener() method determines which one to use, default is false, which is event bubbling.

The keyword *this* and event.target is not always the same:
```JS
innerContainer.addEventListener("click", function(event){
    console.log(this === innerContainer, "This referes to the innerContainer");
    console.log(event.target === innerContainer, "event.target refers to the innerContainer");
});
outerContainer.addEventListener("click", function(event){
  report("innerContainer handler");
  console.log(this === outerContainer, "This refers to the outerContainer");
  console.log(event.target === innerContainer, "event.target refers to the innerContainer");
});
```
In the above code, *this* always points to the element that called addEventListener, event.target points to the element on which the event has actually occured.

**Custom Event**: use new CustomEvent(eventType, { detail: {...} }).


Chapter 14
==

## 14.2

**DOM clobbering**: the browser added properties to the form element for each of the input elements within the form that reference the element, property names are taken from name or id. Thus when id and attribute name duplicates, the attribute is overriden.
```HTML
<form id="form" action="/">
		<input type="text" id="action" />
</form>
```
```JS
window.onload = function() {
  console.log('get action:', document.getElementById('form').action); // got the input element instead of action attribute
}
```

## 14.3

**Feature detection**: check if certain object or object property exists:
```JS
if (!Array.prototype.find) { ... }
```
**Polyfill**: a browser fallback.


Appendix
==

**Template literal**: can contain placeholder and support multiline.

