for (let i = 0; i <= 10; i++) {
  if (i % 2 == 0) {
    console.log(i);
  } else {
    continue;
  }
}

let i = 0;
while (i <= 10) {
  if (i % 2 == 0) {
    console.log(i);
  }
  i++;
}

let num;
do {
  num = +prompt();
} while (num <= 100);

next: for (let i = 2; i <= a; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j == 0) continue next;
  }
  console.log(i);
}
