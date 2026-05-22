

## 1️⃣ What is the difference between var, let, and const?

- **var** → Function-scoped variable. Can be re-declared and updated. Not recommended in modern JavaScript.
- **let** → Block-scoped variable. Can be updated but cannot be re-declared in the same scope.
- **const** → Block-scoped variable. Cannot be updated or re-declared.

👉 Summary:
- var = old & unsafe  
- let = changeable  
- const = fixed value  

---

## 2️⃣ What is the spread operator (...)?  

The spread operator (`...`) is used to expand elements of an array or object.

✔ Example:
```js
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];

console.log(arr2);
## 3️⃣ Difference between map(), filter(), and forEach()

- **map()** → Creates a new array by modifying each element
- **filter()** → Returns a new array based on a condition
- **forEach()** → Loops through elements but does not return a new array

✔ Example:
```js
[1,2,3].map(x => x * 2);      // [2,4,6]
[1,2,3].filter(x => x > 1);   // [2,3]
[1,2,3].forEach(x => console.log(x));
## 4️⃣ What is an arrow function?

An arrow function is a shorter and modern way to write functions in JavaScript.

✔ Example:
```js
const add = (a, b) => a + b;
## 5️⃣ What are template literals?

Template literals are a modern way to write strings in JavaScript using backticks (`` ` ``) instead of quotes.

✔ Example:
```js
let name = "John";
console.log(`Hello ${name}`);
