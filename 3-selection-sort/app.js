const barWidth = 30;
let snapshotIndex = 0;
let snapshots = [];

function setup() {
  createCanvas(300, 230);
  let barHeights = [];
  for (let i = 0; i < width / barWidth; i++) {
    barHeights.push(Math.floor(Math.random() * (height - 90)));
  }
  selectionSort(barHeights);
  textSize(25);
  textAlign(CENTER);
  fill('white');
}

function draw() {
  // Fill background
  background(0);

  // Draw graphs
  for (let i = 0; i < width / barWidth; i++) {
    if (i === snapshots[snapshotIndex].iIndex) text('i', barWidth * i + barWidth / 2, height - 57);
    if (i === snapshots[snapshotIndex].jIndex) text('j', barWidth * i + barWidth / 2, height - 36);
    if (i === snapshots[snapshotIndex].minIndex) text('m', barWidth * i + barWidth / 2, height - 6);
    rect(barWidth * i, (height - 80) - snapshots[snapshotIndex].arr[i], barWidth, snapshots[snapshotIndex].arr[i]);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (snapshotIndex > 0) snapshotIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (snapshotIndex < snapshots.length - 1) snapshotIndex++;
  }
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    saveSnapshot(arr, i, i + 1, min);
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
        saveSnapshot(arr, i, j, min);
      } else saveSnapshot(arr, i, j, min);
    }
    swap(arr, i, min);
  }
  saveSnapshot(arr, arr.length - 1, arr.length - 1, arr.length - 1);
}

function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function saveSnapshot(arr, iIndex, jIndex, minIndex) {
  snapshots.push({arr: arr.slice(), iIndex, jIndex, minIndex});
}