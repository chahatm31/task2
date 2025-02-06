function findMaxSubarraySum(arr) {
    if (arr.length === 0) {
        return { maxSum: 0, startIdx: -1, endIdx: -1 };
    }
    
    let maxSum = arr[0];
    let currentSum = arr[0];
    let startIdx = 0;
    let endIdx = 0;
    let tempStartIdx = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (currentSum < 0) {
            currentSum = arr[i];
            tempStartIdx = i;
        } else {
            currentSum += arr[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            startIdx = tempStartIdx;
            endIdx = i;
        }
    }
    
    return { maxSum, startIdx, endIdx };
}

module.exports = findMaxSubarraySum;