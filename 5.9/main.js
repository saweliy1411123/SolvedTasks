let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

function sumSalaries(salaries) {
  let s = 0;
  for (let value of Object.values(salaries)) {
    s += value;
  }
  return s;
}

console.log(sumSalaries(salaries));

let user = {
  name: "John",
  age: 30,
};

function count(obj) {
  let s = 0;
  for (let values of Object.values(obj)) {
    s += 1;
  }
  return s;
  // return Object.values(obj).length;
}

console.log(count(user)); // 2
