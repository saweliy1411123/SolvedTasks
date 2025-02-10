let user = {
  name: "John",
  surname: "Smith",
};
user.name = "Pete";
delete user.name;

let schedule = {};

function isEmpty(shedule) {
  for (shed in shedule) {
    return false;
  }
  return true;
}

alert(isEmpty(schedule)); // true

schedule["8:30"] = "get up";

alert(isEmpty(schedule)); // false

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};

let result = 0;
for (let sal in salaries) {
  result += salaries[sal];
}

let menu = {
  width: 200,
  height: 300,
  title: "My menu",
};

function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] == "number") {
      obj[key] *= 2;
    }
  }
}
