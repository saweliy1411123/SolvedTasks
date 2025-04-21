let styles = ["Джаз", "Блюз"];
styles.push("Рок-н-ролл");
styles[Math.floor(styles.length / 2)] = "Классика";
styles.shift();
console.log(styles);
styles.unshift("Рэп", "Рэгги");
console.log(styles);

function sumInput() {
  let s = [];
  let v;
  let k = 0;
  while (true) {
    v = prompt();
    s.push(v);
    if (v == "" || v == null || !isFinite(v)) break;
  }
  for (let i = 0; i <= s.length - 1; i++) {
    k += +s[i];
  }
  return k;
}
console.log(sumInput());

function getMaxSubSum(arr) {
  let maxSum = 0;

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}
