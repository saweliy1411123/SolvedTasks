function a(str) {
  let b = str.split("");
  for (let i = 1; i <= b.length; i++) {
    if (b[i] == "-") {
      b[i + 1] = b[i + 1].toUpperCase();
    }
  }
  b = b.join("");
  b = b.split("-");
  b = b.join("");
  return console.log(b);
}

a("background-color");

function filterRange(arr, a, b) {
  let s = [];
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] >= a && arr[i] <= b) {
      s.push(arr[i]);
    }
  }
  return s;
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);
console.log(filtered);

function filterRange(arr, a, b) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] < a || arr[i] > b) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);
console.log(filtered);

let arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b - a);

console.log(arr);

let arr = ["HTML", "JavaScript", "CSS"];
function copySorted(arr) {
  let s = arr.concat();
  return s.sort((a, b) => a.localeCompare(b));
}

console.log(copySorted(arr));
console.log(arr);

function Calculator() {
  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b,
  };
  this.calculate = function (str) {
    let s = str.split(" "),
      a = +s[0],
      oper = s[1],
      b = +s[2];
    return this.methods[oper](a, b);
  };
  this.addMethod = function (name, func) {
    this.methods[name] = func;
  };
}
let powerCalc = new Calculator();
powerCalc.addMethod("*", (a, b) => a * b);
let result = powerCalc.calculate("2 * 3");
console.log(result);

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [vasya, petya, masha];

let names = users.map((item) => item.name);
console.log(names);

let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
let petya = { name: "Петя", surname: "Иванов", id: 2 };
let masha = { name: "Маша", surname: "Петрова", id: 3 };

let users = [vasya, petya, masha];
let usersMapped = users.map((user) => ({
  fullname: `${user.name} ${user.surname}`,
  id: user.id,
}));
console.log(usersMapped[0].id);

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let arr = [vasya, petya, masha];

function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
}

sortByAge(arr);
console.log(arr[2]);

function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
}

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 29 };

let arr = [vasya, petya, masha];

function getAverageAge(users) {
  // let k = 0;
  // let s = arr.map((a)=> k += a.age)
  // return k / arr.length;
  return users.reduce((a, b) => a + b.age, 0) / users.length;
}
console.log(getAverageAge(arr));

let strings = [
  "кришна",
  "кришна",
  "харе",
  "харе",
  "харе",
  "харе",
  "кришна",
  "кришна",
  ":-O",
];

function unique(arr) {
  let s = [];
  for (let arrs of arr) {
    if (!s.includes(arrs)) {
      s.push(arrs);
    }
  }
  return s;
}

console.log(unique(strings));

let users = [
  { id: "john", name: "John Smith", age: 20 },
  { id: "ann", name: "Ann Smith", age: 24 },
  { id: "pete", name: "Pete Peterson", age: 31 },
];

let usersById = groupById(users);
function groupById(array) {
  return array.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {});
}
