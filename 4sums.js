/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const quadruplets = [];
  if (nums.length < 4) return quadruplets;

  const sortedNums = nums.sort((a, b) => {
    return a - b;
  });

  let i = 0;
  let j = 1;

  while (i <= nums.length - 4) {
    // if (sortedNums[i] === sortedNums[i - 1]) {
    //   i++;
    //   continue;
    // }

    j = i + 1;
    while (j <= nums.length - 3) {
      if (sortedNums[j] === sortedNums[j - 1] && j !== i + 1) {
        j++;
        continue;
      }
      let leftP = j + 1;
      let rightP = nums.length - 1;

      while (leftP < rightP) {
        let sum =
          sortedNums[i] +
          sortedNums[j] +
          sortedNums[leftP] +
          sortedNums[rightP];

        if (sum === target) {
          quadruplets.push([
            sortedNums[i],
            sortedNums[j],
            sortedNums[leftP],
            sortedNums[rightP],
          ]);

          leftP += 1;
          rightP -= 1;
          while (sortedNums[leftP - 1] === sortedNums[leftP]) {
            leftP += 1;
          }

          while (sortedNums[rightP + 1] === sortedNums[rightP]) {
            rightP -= 1;
          }
        } else if (sum > target) {
          rightP -= 1;
        } else {
          leftP += 1;
        }
      }
      j++;
    }
    i++;
  }

  return quadruplets;
};

console.log(JSON.stringify(fourSum([-3, -2, -1, 0, 0, 1, 2, 3], 0)));
