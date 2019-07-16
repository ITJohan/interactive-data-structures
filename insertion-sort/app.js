const barWidth = 20;
let snapshotIndex = 0;
let snapshots = [];

function setup() {
  createCanvas(300, 200);
  let barHeights = [];
  for (let i = 0; i < width / barWidth; i++) {
    barHeights.push(Math.floor(Math.random() * (height - 60)));
  }
  insertionSort(barHeights);
  textSize(25);
  fill('white');
}

function draw() {
  // Fill background
  background(0);

  // Bottom background
  fill('rgba(255, 255, 255, 0.5)');
  rect(0, height - 50, width, 60);
  fill('white');

  // Draw graphs
  for (let i = 0; i < width / barWidth; i++) {
    if (i === snapshots[snapshotIndex].iIndex) text('i', barWidth * i + barWidth / 2, height - 27);
    if (i === snapshots[snapshotIndex].jIndex) text('j', barWidth * i + barWidth / 2, height - 6);
    rect(barWidth * i, (height - 50) - snapshots[snapshotIndex].arr[i], barWidth, snapshots[snapshotIndex].arr[i]);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (snapshotIndex > 0) snapshotIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (snapshotIndex < snapshots.length - 1) snapshotIndex++;
  }
}

function insertionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    saveSnapshot(arr, false, i, i + 1);
    for (let j = i + 1; j > 0; j--) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
        saveSnapshot(arr, true, i, j - 1);
      } else {
        saveSnapshot(arr, false, i, j);
        break;
      }
    }
  }
}

function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function saveSnapshot(arr, swap, iIndex, jIndex) {
  snapshots.push({arr: arr.slice(), swap, iIndex, jIndex});
}