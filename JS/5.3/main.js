function ucFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}
console.log(ucFirst("вася"));

function checkSpam(str) {
  str = str.toLowerCase();
  return str.includes("xxx") || str.includes("viagra");
}

console.log(checkSpam("123xxX2123"));

function truncate(str, maxlength) {
  let s = str.length;
  if (s <= maxlength) {
    return str;
  } else {
    return str.slice(0, maxlength - 3) + "...";
  }
}

console.log(truncate("Всем прив123eqwfsfhnsrет!", 20));

function extractCurrencyValue(value) {
  return +value.slice(1);
}

console.log(extractCurrencyValue("$120"));
