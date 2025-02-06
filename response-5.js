function findMaxSubarraySum(arr) {
  if (!arr || arr.length === 0) {
    return { maxSum: 0, start: -1, end: -1 };
  }

  if (arr.length === 1) {
    return { maxSum: arr[0], start: 0, end: 0 };
  }

  let maxSum = arr[0];
  let currentSum = arr[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;

  for (let i = 1; i < arr.length; i++) {
    if (currentSum < 0) {
      currentSum = arr[i];
      tempStart = i;
    } else {
      currentSum += arr[i];
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
    }
  }

  return { maxSum: maxSum, start: start, end: end };
}

module.exports = findMaxSubarraySum;