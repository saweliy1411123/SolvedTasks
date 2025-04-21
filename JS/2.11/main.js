let age = 15;
if (age >= 14 || age <= 90) {
  console.log(true);
} else {
  console.log(false);
}

let ages = 15;
if (ages < 14 || ages > 90) {
  console.log(true);
} else {
  console.log(false);
}

let admin = prompt("Ваш Логин?");
if (admin == "Админ") {
  let s = prompt("Пароль?");
  if (s == "Я главный") {
    console.log("Привет");
  } else if (s === "" || s === null) {
    console.log("У нас отмена");
  } else {
    console.log("Неверно");
  }
} else if (admin === "" || admin === null) {
  console.log("ЭЭЭ");
} else {
  console.log("Отмена");
}
