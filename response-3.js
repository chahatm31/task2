function findMaxSubarraySum(arr) {
    if (arr.length === 0) return { maxSum: 0, start: -1, end: -1 }; // Handle empty array

    let maxSum = arr[0];
    let currentSum = arr[0];
    let start = 0;
    let currentStart = 0;
    let end = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > currentSum + arr[i]) {
            currentSum = arr[i];
            currentStart = i;
        } else {
            currentSum += arr[i];
        }

        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = currentStart;
            end = i;
        }
    }

    return {
        maxSum: maxSum,
        start: start,
        end: end
    };
}

module.exports = findMaxSubarraySum;