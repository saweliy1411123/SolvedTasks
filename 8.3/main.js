function f() {
  alert("Hello!");
}

Function.prototype.defer = function (ms) {
  setTimeout(f, ms);
};

f.defer(1000);

function f(a, b) {
  alert(a + b);
}

Function.prototype.defer = function (ms) {
  let f = this;
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
};

f.defer(1000)(1, 2);
