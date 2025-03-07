function spy(argum) {
  let calls = [];
  function f(a, b) {
    calls.push([a, b]);
    argum(a, b);
  }
  f.calls = calls;
  return f;
}

function work(a, b) {
  console.log(a + b); // произвольная функция или метод
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  console.log("call:" + args.join()); // "call:1,2", "call:4,5"
}

function f(x) {
  alert(x);
}

function delay(f, arg) {
  return function () {
    setTimeout(() => f.apply(this, arguments), arg);
  };
}

// создаём обёртки
let f1000 = delay(alert, 1000);
let f1500 = delay(alert, 1500);

f1000("test"); // показывает "test" после 1000 мс
f1500("test"); // показывает "test" после 1500 мс

let f = debounce(console.log, 1000);

f("a");
setTimeout(() => f("b"), 200);
setTimeout(() => f("c"), 500);

function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
