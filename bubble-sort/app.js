const barWidth = 5;
let index = 0;
let barHeights = [];
let sortedCount = 0;

function setup() {
  createCanvas(300, 150);
  // frameRate(3);
  for (let i = 0; i < width / barWidth; i++) {
    barHeights.push(Math.floor(Math.random() * height));
  }
}

function draw() {
  // Fill background
  background(0);

  // Draw graphs
  for (let i = 0; i < barHeights.length; i++) {
    if (i >= barHeights.length - sortedCount || sortedCount === barHeights.length - 1) fill('green');
    else if (i === index || i === index + 1) fill('red');
    else fill ('white');
    rect(barWidth * i, height - barHeights[i], barWidth, barHeights[i]);
  }

  // Compare sizes
  if (barHeights[index] > barHeights[index + 1]) swap(index, index + 1);
  if (index === barHeights.length - sortedCount - 2) {
   index = 0;
   sortedCount++;
  } else index++;

  if (sortedCount === barHeights.length) {
    noLoop();
  }
}

function swap(a, b) {
  let tmp = barHeights[a];
  barHeights[a] = barHeights[b];
  barHeights[b] = tmp;
}