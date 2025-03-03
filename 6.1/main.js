// function sumTo(n){
//   let s = 0;
//   let v = 0;
//   for (let i = 0; i<=n; i++){
//       s += v;
//       v += 1;
//   }
//   return s;
// }

function sumTo(n) {
  // if (n==1){
  //   return n;
  // }else{
  //   return n + sumTo(n-1)
  // }

  //   return n == 1 ? n : n + sumTo(n - 1);

  return (n * (n + 1)) / 2;
}

console.log(sumTo(4));

function factorial(n) {
  // if (n==1){
  //   return n;
  // } else{
  //   return n*=factorial(n-1);
  // }
  return n == 1 ? n : (n *= factorial(n - 1));
}

console.log(factorial(5));

function fib(n) {
  // return (n<=1)? n: fib(n-1) + fib(n-2)
  if (n <= 1) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}
console.log(fib(3));

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printlist(list) {
  // console.log(value);
  // if (list.next) {
  //   printlist(list.next);
  // }
  while (list) {
    console.log(list.value);
    list = list.next;
  }
}

printlist(list);

function printlist(list) {
  // console.log(value);
  // if (list.next) {
  //   printlist(list.next);
  // }

  let s = [];
  while (list) {
    s.push(list.value);
    list = list.next;
  }
  s = s.reverse();
  for (let j of s) {
    console.log(j);
  }
}

printlist(list);
