function makeCounter() {
  let count = 0;
  function counter() {
    return count++;
  }

  counter.set = (value) => (count = value);
  counter.decrease = () => count - 1;

  return counter;
}

let counter = makeCounter();
counter.set(21);
counter.decrease();
counter();
counter();
