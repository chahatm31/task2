function findMaxSubarraySum(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { maxSum: 0, startIndex: -1, endIndex: -1 };
  }

  let maxSum = arr[0];
  let currentSum = arr[0];
  let start = 0,
    end = 0,
    tempStart = 0;

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

  return { maxSum, startIndex: start, endIndex: end };
}

describe("findMaxSubarraySum", () => {
  test("should return correct max sum and indices for a mixed array", () => {
    expect(findMaxSubarraySum([1, -2, 3, 4, -1, 2, 1, -5, 4])).toEqual({
      maxSum: 9,
      startIndex: 2,
      endIndex: 6,
    });
  });

  test("should return correct max sum and indices for all positive numbers", () => {
    expect(findMaxSubarraySum([2, 3, 4, 5, 6])).toEqual({
      maxSum: 20,
      startIndex: 0,
      endIndex: 4,
    });
  });

  test("should return correct max sum and indices for all negative numbers", () => {
    expect(findMaxSubarraySum([-3, -1, -2, -4])).toEqual({
      maxSum: -1,
      startIndex: 1,
      endIndex: 1,
    });
  });

  test("should return 0 and -1 indices for an empty array", () => {
    expect(findMaxSubarraySum([])).toEqual({
      maxSum: 0,
      startIndex: -1,
      endIndex: -1,
    });
  });

  test("should handle a single-element array (positive number)", () => {
    expect(findMaxSubarraySum([5])).toEqual({
      maxSum: 5,
      startIndex: 0,
      endIndex: 0,
    });
  });

  test("should handle a single-element array (negative number)", () => {
    expect(findMaxSubarraySum([-7])).toEqual({
      maxSum: -7,
      startIndex: 0,
      endIndex: 0,
    });
  });

  test("should handle an array where max sum is at the beginning", () => {
    expect(findMaxSubarraySum([4, 3, -2, -1, -5, -4])).toEqual({
      maxSum: 7,
      startIndex: 0,
      endIndex: 1,
    });
  });

  test("should handle an array where max sum is at the end", () => {
    expect(findMaxSubarraySum([-5, -4, 1, 2, 3, 4])).toEqual({
      maxSum: 10,
      startIndex: 2,
      endIndex: 5,
    });
  });

  test("should handle an array where max sum is in the middle", () => {
    expect(findMaxSubarraySum([-2, -3, 4, 5, -1, 2, -6, -1])).toEqual({
      maxSum: 10,
      startIndex: 2,
      endIndex: 5,
    });
  });

  test("should return first occurring subarray when multiple have the same max sum", () => {
    expect(findMaxSubarraySum([1, 2, -1, 3, -2, 3])).toEqual({
      maxSum: 6,
      startIndex: 0,
      endIndex: 5,
    });
  });

  test("should handle an array with all zeros", () => {
    expect(findMaxSubarraySum([0, 0, 0, 0])).toEqual({
      maxSum: 0,
      startIndex: 0,
      endIndex: 0,
    });
  });

  test("should handle an array with alternating large positive and negative numbers", () => {
    expect(findMaxSubarraySum([10, -20, 30, -10, 50, -40, 60])).toEqual({
      maxSum: 90,
      startIndex: 2,
      endIndex: 6,
    });
  });
});
