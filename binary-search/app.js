const boxSize = 30;
let boxes = [];
let snapshotIndex = 0;
let snapshots = [];
let input, button;

function setup() {
  createCanvas(600, boxSize);
  for (let i = 0; i < width / boxSize; i++) {
    boxes.push({ x: i * boxSize, value: Math.floor(Math.random() * 100) });
  }
  boxes.sort((a, b) => a.value - b.value);

  input = createInput();
  input.position(8, height + 8);

  button = createButton('search');
  button.position(input.x + input.width, height + 8);
  button.mousePressed(binarySearch(boxes, input.value()));

  textSize(15);
  textAlign(CENTER);
  fill('white');
}

function draw() {
  // Fill background
  background(0);

  // Draw boxes
  for (let i = 0; i < boxes.length; i++) {
    fill('white');
    rect(boxes[i].x, 0, boxSize, boxSize);
    fill('black');
    text(boxes[i].value, boxes[i].x + boxSize / 2, boxSize / 2)
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (snapshotIndex > 0) snapshotIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (snapshotIndex < snapshots.length - 1) snapshotIndex++;
  }
}

function binarySearch(arr, num) {

}

function saveSnapshot(arr, iIndex, jIndex, minIndex) {
  snapshots.push({arr: arr.slice(), iIndex, jIndex, minIndex});
}