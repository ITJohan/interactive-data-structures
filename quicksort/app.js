const boxSize = 30;
let yValues = [];
let xValues = [];
let snapshotIndex = 0;
let snapshots = [];
let input, button;

function setup() {
  let canvas = createCanvas(600, 200);
  canvas.parent('canvas');
  
  yValues = generateYValues();
  xValues = generateXValues();
  quicksort(yValues, 0, yValues.length - 1);
  saveSnapshot(yValues, 0, Math.floor(yValues.length / 2) - 1, yValues.length - 1, 'After quicksort in setup');

  textSize(15);
  textAlign(CENTER);
  fill('white');
}

function draw() {
  // Fill background
  background('grey');

  // Draw boxes
  for (let i = 0; i < yValues.length; i++) {
    fill('white');
    rect(xValues[i], 130, boxSize, -snapshots[snapshotIndex].arr[i]);
    fill('black');
    text(snapshots[snapshotIndex].arr[i], xValues[i] + boxSize / 2, 128);
    if (i === snapshots[snapshotIndex].left) text('L', xValues[i] + boxSize / 2, 145);
    if (i === snapshots[snapshotIndex].mid) text('P', xValues[i] + boxSize / 2, 160);
    if (i === snapshots[snapshotIndex].right) text('H', xValues[i] + boxSize / 2, 175);
    text(snapshots[snapshotIndex].method, width / 2, 195);
  }
}

function generateYValues() {
  let values = []
  for (let i = 0; i < width / boxSize; i++) {
    values.push(Math.floor(Math.random() * 130))
  }
  return values;
}

function generateXValues() {
  let xValues = [];
  for (let i = 0; i < width / boxSize; i++) {
    xValues.push(i * boxSize);
  }
  return xValues;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (snapshotIndex > 0) snapshotIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (snapshotIndex < snapshots.length - 1) snapshotIndex++;
  }
}

/**
 * Finds and returns the middle index of the array or -1 if all values are equal
 * @param {array} arr Array to find pivot in
 * @param {number} low Lowest index of array
 * @param {number} high Highest index of array
 * @return {number} The array index
 */
function findPivot(arr, low, high) {
  for (let i = low; i < high; i++) {
    if (arr[i] != arr[i + 1]) return Math.floor((low + high) / 2);
  }
  return -1;
}

/**
 * Divides array so that keys < arr[pivot] are to the left and keys >= arr[pivot] are to the right
 * @param {array} arr Array of numbers
 * @param {number} low Lowest array index
 * @param {number} high Highest array index
 * @param {number} pivot Array pivot
 * @returns {number} Beginning index of group to right
 */
function partition(arr, low, high, pivot) {
  while (low < high) {
    while (low < high && arr[low] < arr[pivot]) {
      low++;
      saveSnapshot(arr, low, pivot, high, 'After low++ in partition');
    }
    while (low < high && arr[high] >= arr[pivot]) {
      high--;
      saveSnapshot(arr, low, pivot, high, 'After high-- in partition');
    }
    if (low < high) {
      swap(arr, low, high);
      saveSnapshot(arr, low, pivot, high, 'After swap in partition');
    }
  }
  return low;
}

/**
 * Swaps place of two values in an array
 * @param {array} arr Array of numbers
 * @param {number} a Index of first number
 * @param {number} b Index of second number
 */
function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

/**
 * Performs recursive quicksort
 * @param {array} arr Array of number
 * @param {number} low Lowest index of array
 * @param {number} high Highest index of array
 */
function quicksort(arr, low, high) {
  let pivot = findPivot(arr, low, high);
  saveSnapshot(arr, low, pivot, high, 'After findPivot in quicksort');
  if (pivot != -1) {
    // So we know where the pivot value is
    swap(arr, pivot, high);
    pivot = high;
    saveSnapshot(arr, low, pivot, high, 'After pivot swap in quicksort');
    // Move pivot value to between the array parts
    let middle = partition(arr, low, high - 1, pivot);
    swap(arr, middle, pivot);
    saveSnapshot(arr, low, pivot, high, 'After middle swap in quicksort');
    quicksort(arr, low, middle);
    saveSnapshot(arr, low, pivot, high, 'After left recursion in quicksort');
    quicksort(arr, middle + 1, high);
    saveSnapshot(arr, low, pivot, high, 'After right recursion in quicksort');
  }
}

function saveSnapshot(arr, left, mid, right, method) {
  snapshots.push({arr: arr.slice(), left, mid, right, method});
}