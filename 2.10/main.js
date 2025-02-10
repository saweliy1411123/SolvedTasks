let a = prompt("Какой оф название JS?");
if (a == "ECMAScript") {
  console.log("Хорош");
} else {
  console.log("Нет");
}

let s = +prompt();
let v;
let m = s > 0 ? (v = 1) : s < 0 ? (v = -1) : (v = 0);
console.log(v);

let c = 1;
let b = 2;
let result = c + b < 4 ? "мало" : "много";

let login = "Директор";
let message =
  login == "Сотрудник"
    ? "Привет"
    : login == "Директор"
    ? "Здравствуйте"
    : (login = "")
    ? "Нет логина"
    : "";
console.log(message);
