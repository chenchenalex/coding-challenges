function maxValue(n, rounds) {
  // Write your code here
  // init investment portfolio;
  const investments = [];
  let max = 0;

  // sort rounds
  const sortedRounds = rounds.sort((prev, next) => {
    return next[2] - prev[2];
  });

  // only calculate largest half of contributions
  for (let j = 0; j < Math.floor(sortedRounds.length / 2); j++) {
    const [start, end, contribution] = sortedRounds[j];
    for (let i = start - 1; i < end; i++) {
      investments[i] = investments[i] || 0;
      investments[i] += contribution;
      if (investments[i] > max) max = investments[i];
    }
  }

  return max;
}

console.log(
  maxValue(5, [
    [1, 2, 200],
    [2, 5, 300],
    [3, 4, 100],
  ]),
);
