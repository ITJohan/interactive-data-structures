const boxSize = 30;
let boxes = [];
let snapshotIndex = 0;
let snapshots = [];
let input, button;

function setup() {
  let canvas = createCanvas(600, boxSize * 3);
  canvas.parent('canvas');
  document.getElementById('search').addEventListener('click', () => {
    let num = document.getElementById('value').value;
    snapshotIndex = 0;
    snapshots = [];
    binarySearch(boxes, Number(num));
  });
  
  boxes = generateBoxes(generateValues());
  saveSnapshot(boxes, 0, Math.floor((boxes.length - 1) / 2), boxes.length - 1);

  textSize(15);
  textAlign(CENTER);
  fill('white');
}

function draw() {
  // Fill background
  background(0);

  // Draw boxes
  for (let i = 0; i < boxes.length; i++) {
    if (snapshots[snapshotIndex].found === 1 && i === snapshots[snapshotIndex].midIndex) fill('green')
    else if (snapshots[snapshotIndex].found === -1) fill ('red');
    else fill('white');
    rect(snapshots[snapshotIndex].arr[i].x, 0, boxSize, boxSize);
    fill('grey');
    text(snapshots[snapshotIndex].arr[i].value, snapshots[snapshotIndex].arr[i].x + boxSize / 2, boxSize / 2);
    if (i === snapshots[snapshotIndex].minIndex) text('min', snapshots[snapshotIndex].arr[i].x + boxSize / 2, 3 * boxSize / 2);
    if (i === snapshots[snapshotIndex].midIndex) text('mid', snapshots[snapshotIndex].arr[i].x + boxSize / 2, 4 * boxSize / 2);
    if (i === snapshots[snapshotIndex].maxIndex) text('max', snapshots[snapshotIndex].arr[i].x + boxSize / 2, 5 * boxSize / 2);
  }
}

function generateValues() {
  let values = []
  for (let i = 0; i < width / boxSize; i++) {
    values.push(Math.floor(Math.random() * 100))
  }
  values.sort((a, b) => a - b);
  return values;
}

function generateBoxes(values) {
  let boxes = [];
  for (let i = 0; i < width / boxSize; i++) {
    boxes.push({ x: i * boxSize, value: values[i] });
  }
  return boxes;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (snapshotIndex > 0) snapshotIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (snapshotIndex < snapshots.length - 1) snapshotIndex++;
  }
}

function binarySearch(arr, num) {
  let min = 0, mid = 0, max = arr.length - 1;
  while (min <= max) {
    mid = Math.floor(min + (max - min) / 2);
    saveSnapshot(arr, min, mid, max, 0);
    if (num === arr[mid].value) {
      saveSnapshot(arr, min, mid, max, 1);
      return mid;
    } else if (num > arr[mid].value) {
      min = mid + 1;
      saveSnapshot(arr, min, mid, max, 0);
    } else if (num < arr[mid].value) {
      max = mid - 1;
      saveSnapshot(arr, min, mid, max, 0);
    }
  }
  saveSnapshot(arr, min, mid, max, -1);
  return -1;
}



function saveSnapshot(arr, minIndex, midIndex, maxIndex, found) {
  snapshots.push({arr: arr.slice(), minIndex, midIndex, maxIndex, found});
}