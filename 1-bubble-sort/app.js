const barWidth = 20;
let stateIndex = 0;
let barHeights = [];
let states = [];

function setup() {
  createCanvas(300, 150);
  for (let i = 0; i < width / barWidth; i++) {
    barHeights.push(Math.floor(Math.random() * height));
  }
  bubbleSort(barHeights);
}

function draw() {
  // Fill background
  background(0);

  // Draw graphs
  for (let i = 0; i < width / barWidth; i++) {
    if (i >= states[stateIndex].arr.length - states[stateIndex].sorted) fill('green');
    else if (i === states[stateIndex].redIndex || i === states[stateIndex].redIndex + 1) fill('red');
    else fill('white');
    rect(barWidth * i, height - states[stateIndex].arr[i], barWidth, states[stateIndex].arr[i]);
  }
}

// function mouseClicked() {
//   if (stateIndex < states.length) stateIndex++;
//   console.log(states[stateIndex].redIndex);
// }

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (stateIndex > 0) stateIndex--;
  } else if (keyCode === RIGHT_ARROW) {
    if (stateIndex < states.length - 1) stateIndex++;
  }
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    saveToJSON(arr, false, i, 0);
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        saveToJSON(arr, true, i, j + 1);
      } else saveToJSON(arr, false, i, j + 1);
    }
  }
}

function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function saveToJSON(arr, swap, sorted, redIndex) {
  states.push({arr: arr.slice(), swap, sorted, redIndex});
}