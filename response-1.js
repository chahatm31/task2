function findMaxSubarraySum(arr) {
    if (arr.length === 0) {
        // Handle edge case: empty array
        return { maxSum: 0, start: -1, end: -1 };
    }
    
    let maxSum = -Infinity;
    let currentSum = 0;
    let start = 0; 
    let maxStart = 0; 
    let maxEnd = 0;
    
    for (let i = 0; i < arr.length; i++) {
        currentSum += arr[i];
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxStart = start;
            maxEnd = i;
        }

        if (currentSum < 0) {
            currentSum = 0;
            start = i + 1;
        }
    }

    // Handle edge case where all numbers are negative
    if (maxSum < 0) {
        maxSum = Math.max(...arr);
        maxStart = arr.indexOf(maxSum);
        maxEnd = maxStart;
    }

    return { maxSum, start: maxStart, end: maxEnd };
}

module.exports = findMaxSubarraySum;