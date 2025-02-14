s = +prompt();
v = +prompt();
alert(s + v);

function readNumber() {
  let s;
  do {
    s = +prompt("", 0);
  } while (!isFinite(s));
  if (s === "null" || s === "") {
    return null;
  }
  return +s;
}

alert("readNumber()");

function random(min, max) {
  return min + Math.random() * (max - min);
}
alert(random(1, 5));

function randomInteger(min, max) {
  return Math.round(Math.random() * (max + 1 - min));
}

alert(randomInteger(1, 5));
