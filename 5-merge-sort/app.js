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
  mergeSort(yValues, 0, yValues.length - 1);
  saveSnapshot(yValues, 0, Math.floor(yValues.length / 2) - 1, yValues.length - 1, false);

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
    if (i === snapshots[snapshotIndex].mid) text('M', xValues[i] + boxSize / 2, 160);
    if (i === snapshots[snapshotIndex].right) text('R', xValues[i] + boxSize / 2, 175);
    if (snapshots[snapshotIndex].merge) text('MERGE', width / 2, 195);
    else text('SPLIT', width / 2, 195);
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

function mergeSort(arr, left, right) {
  let mid = Math.floor((left + right) / 2);
  saveSnapshot(arr, left, mid, right, false);
  
  if (right > left) {
    mergeSort(arr, left, mid);
    saveSnapshot(arr, left, mid, right, false);
    mergeSort(arr, mid + 1, right);
    saveSnapshot(arr, left, mid, right, true);
    merge(arr, left, mid, right);
  }
}

function merge(arr, left, mid, right) {
  let newArr = [];
  let i = left, j = mid + 1;
  while (i <= mid && j <= right) {
    if (arr[i] < arr[j]) newArr.push(arr[i++]);
    else newArr.push(arr[j++]);
  }
  
  while (i <= mid) newArr.push(arr[i++]);
  while (j <= right) newArr.push(arr[j++]);
  
  for (let i = left; i <= right; i++) {
    arr[i] = newArr[i - left];
  }
}

function saveSnapshot(arr, left, mid, right, merge) {
  snapshots.push({arr: arr.slice(), left, mid, right, merge});
}