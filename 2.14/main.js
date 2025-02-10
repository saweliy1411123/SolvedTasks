let browser = prompt();
if (browser === "Edge") {
  console.log("Edge браузер");
} else if (browser === "Firefox" || browser === "Chrome") {
  console.log("support browser");
} else {
  console.log("надеюсь страничка выглядит нормально");
}

const number = +prompt("Введите число между 0 и 3", "");
switch (number) {
  case 0:
    console.log("Вы ввели 0");
    break;
  case 1:
    console.log("Вы ввели 1");
    break;
  case 2:
  case 3:
    console.log("2 или 3");
    break;
}
