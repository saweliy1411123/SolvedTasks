let user = {
  name: "John",
  years: 30,
};

let { name, years: age, isAdmin = false } = user;
console.log(name);
console.log(age);
console.log(isAdmin);

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

function topSalary(obj) {
  let m = 0;
  let v = "";
  let s = Object.entries(obj);
  for (let [name, number] of s) {
    if (m < number) {
      m = number;
      v = name;
    }
  }
  return v;
}

console.log(topSalary(salaries));
