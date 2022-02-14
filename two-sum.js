// ################################################
// ################## TWO SUM #####################
// ################################################

// The TWO SUM problem states that given an array of integers,
// return indices of the two numbers such that they add up to a specific target. We can’t use the same element twice.

// Example:
// nums = [2, 7, 11, 15], target = 9,

// because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1]

// 1. BRUTE FORCE

// we iterate through the array of nums in two loops and when the num[i] + num[j] matches target then we return the target

function twoSumByBruteForce(nums, target) {
  for (
    let i = 0;
    i < nums.length - 1;
    i++ // n
  )
    for (
      let j = i + 1;
      j < nums.length;
      j++ // n
    )
      if (nums[i] + nums[j] === target) return [i, j];

  return [];
}
// TIME COMPLEXITY -- since we are using two loops, therefore the time complexity is quadtatic .
// SPACE COMPLEXITY -- ! TODO

console.log(twoSumByBruteForce, twoSumByBruteForce([2, 7, 11, 15], 9)); // [ 0, 1 ]
console.log(twoSumByBruteForce, twoSumByBruteForce([2, 7, 11, 15], 12)); // []

// 2.1 BRUTE FORCE USING MEMOISATION

// will will check if the difference of target - nums[indice] exists in an obj then return the indices
// we know that there are no duplicate values in nums therefore it is possible to use a obj to memoise ..

function twoSumByBruteForceWithMemoisation(nums, target) {
  let memory = {};
  // {2:0, 7:1, 11:2, 15:3}
  for (
    let i = 0;
    i < nums.length;
    i++ // n
  ) {
    // for in loop returns the indices of the element
    if (target - nums[i] in memory) return [i, memory[target - nums[i]]];
    else memory[nums[i]] = i;
  }

  return [];
}

console.log(
  twoSumByBruteForceWithMemoisation,
  twoSumByBruteForceWithMemoisation([2, 7, 11, 15], 9)
); // [ 0, 1 ]
console.log(
  twoSumByBruteForceWithMemoisation,
  twoSumByBruteForceWithMemoisation([2, 7, 11, 15], 12)
); // []

// 2.2 BRUTE FORCE WITH MAP

function twoSumByBruteForceWithMap(nums, target) {
  const memory = new Map();
  for (let i = 0; i < nums.length; i++)
    if (memory.has(target - nums[i])) return [i, memory.get(target - nums[i])];
    else memory.set(nums[i], i);

  return [];
}

console.log(
  twoSumByBruteForceWithMap,
  twoSumByBruteForceWithMap([2, 7, 11, 15], 9)
); // [ 0, 1 ]
console.log(
  twoSumByBruteForceWithMap,
  twoSumByBruteForceWithMap([2, 7, 11, 15], 12)
); // []

// TIME COMPLEXITY -- since we are using one loop, therefore the time complexity is linear .
// SPACE COMPLEXITY -- ! TODO

// 3.1 TWO POINTER METHOD

// we will sort the array first then take two pointer, one at START and on at END ... then we will add
// if nums[START] + nums[END] > target then we move END to END - 1
// if nums[START] + nums[END] > target then we move START to START + 1
// if nums[START] + nums[END] === target, return indices

function twoSumByTwoPointer(nums, target) {
  const numsClone = [...nums];

  nums.sort((a, b) => a - b);

  let start = 0,
    end = nums.length - 1;

  while (start !== end) {
    if (nums[start] + nums[end] > target) end--;
    else if (nums[start] + nums[end] < target) start++;
    else return [numsClone.indexOf(nums[start]), numsClone.indexOf(nums[end])];
  }
  return [];
}

console.log(twoSumByTwoPointer, twoSumByTwoPointer([2, 7, 11, 15], 9)); // [ 0, 1 ]
console.log(twoSumByTwoPointer, twoSumByTwoPointer([2, 7, 11, 15], 12)); // []

// 3.2 TWO POINTER METHOD (OPTIMISED)

// we will sort the array first then take two pointer, one at START and on at END ... then we will add
// if nums[START] + nums[END] > target then we move END to END - 1
// if nums[START] + nums[END] > target then we move START to START + 1
// if nums[START] + nums[END] === target, return indices

// now if the array has duplicates, say [2, 2, 3, 6] and target is 4 then for START = 0 and END = 1 the values are 2 and 2 ..
// but numsClone.indexOf(numsSorted(0)) and numsClone.indexOf(numsSorted(1)) will both return 0

// so if nums[START] + nums[END] === target, return indices --- if nums[START] === nums[END] use indexOf with second paramenter

function twoSumByTwoPointerOptimised(nums, target) {
  const numsClone = [...nums];

  nums.sort((a, b) => a - b); // INSERTION SORT for arr.length < 10 and QUICK SORT for arr.length >= 10
  // INSERTION SORT -- n^2
  // QUICK SORT -- nlogn

  let start = 0,
    end = nums.length - 1;

  while (start < end) {
    if (nums[start] + nums[end] > target) end--;
    else if (nums[start] + nums[end] < target) start++;
    else {
      if (nums[start] === nums[end])
        return [
          numsClone.indexOf(nums[start]),
          numsClone.indexOf(nums[end], numsClone.indexOf(nums[start]) + 1),
        ];
      else
        return [numsClone.indexOf(nums[start]), numsClone.indexOf(nums[end])];
    }
  }
  return [];
}

console.log(
  twoSumByTwoPointerOptimised,
  twoSumByTwoPointerOptimised([2, 7, 11, 15], 9)
); // [ 0, 1 ]
console.log(
  twoSumByTwoPointerOptimised,
  twoSumByTwoPointerOptimised([2, 7, 2, 15], 4)
); // []
console.log(
  twoSumByTwoPointerOptimised,
  twoSumByTwoPointerOptimised([2, 7, 11, 15], 12)
); // []

// TIME COMPLEXITY -- if the array length is more than 10 then the sorting has time complexity nlogn + the while loop as order n + Cn for one use of indexOf()
// so the time complexity of of order nlogn
// SPACE COMPLEXITY -- ! TODO
