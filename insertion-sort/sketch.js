const barWidth = 5;
let barHeights = [];
let index = 0;
let numOfSorted = 0;

function setup() {
  createCanvas(500, 200);
  // frameRate(2);
  generateBars();
}

function draw() {
  drawGraph();
  if (barHeights[index] > barHeights[index + 1]) swap(barHeights, index, index + 1);
  else index++;
  if (index == barHeights.length - numOfSorted - 1) {
    numOfSorted++;
    index = 0;
  }
}

function generateBars() {
  for (let i = 0; i < width / barWidth; i++) {
    let barHeight = Math.floor(Math.random() * Math.floor(height));
    barHeights.push(barHeight);
  }
}

function drawGraph() {
  background(0);
  for (let i = 0; i < barHeights.length; i++) {
    if (i === index || i === index + 1) fill('red');
    else fill('white');
    rect(barWidth * i, height - barHeights[i], barWidth, barHeights[i]);
  }
}

function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}