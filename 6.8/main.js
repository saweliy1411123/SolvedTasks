function printNumbers(from, to) {
  let s = setInterval(function () {
    console.log(from);
    if (from == to) {
      clearInterval(s);
    }
    from++;
  }, 1000);
}

printNumbers(5, 10);

function printNumbers(from, to) {
  setTimeout(function m() {
    console.log(from);
    if (from < to) {
      setTimeout(m, 1000);
    }
    from++;
  }, 1000);
}

printNumbers(5, 10);
