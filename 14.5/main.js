function isInteger(a) {
  //   if (Math.floor(a) == a) {
  //     return true;
  //   }
  //   return false;
  return (a ^ 0) === a;
}

console.log(isInteger(1)); // true
console.log(isInteger(1.5)); // false
console.log(isInteger(-0.5)); // false
