function checkAge(age) {
  return age > 18 ? true : confirm("Родители разрешили?");
  return age > 18 || confirm("dasdasd");
}

function min(a, b) {
  return a > b ? b : a;
}
console.log(min(2, 5));

function pow(a, b) {
  for (let i = 1; i < b; i++) {
    a *= a;
  }
  return a;
}
console.log(pow(3, 2));
