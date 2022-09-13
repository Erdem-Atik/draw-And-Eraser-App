const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ctx = canvas.getContext("2d");
const eraser = document.getElementById("eraser");
const draw = document.getElementById("draw");
const toolbox = document.querySelector(".toolbox");
const state = document.querySelector(".state");
//test
//test

let size = 30;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;
let drOREr = true;

const mouseDown = function (e) {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
};

canvas.addEventListener("mousedown", mouseDown);

const mouseUp = function (e) {
  isPressed = false;
  x = undefined;
  y = undefined;
};

canvas.addEventListener("mouseup", mouseUp);

const mouseMove = function (e) {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
};

canvas.addEventListener("mousemove", mouseMove);

// eraser function. Firstly clear the drawing feature then apply erase function
eraser.addEventListener("click", function (e) {
  drOREr = false;
  canvas.removeEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousemove", eraseDraw);
  stateInd();
});
// draw function
draw.addEventListener("click", function (e) {
  drOREr = true;
  canvas.removeEventListener("mousemove", eraseDraw);
  canvas.addEventListener("mousemove", mouseMove);
  stateInd();
});

const eraseDraw = function (e) {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    ctx.clearRect(x2, y2, size, size);
  }
};

const drawCircle = function (x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

const drawLine = function (x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
};
//indicate whether drawing or erasing
const stateInd = function () {
  let exp;
  drOREr ? (exp = "Drawing") : (exp = "Erasing");
  console.log(exp);
  state.innerHTML = exp;
};

stateInd();

colorEl.addEventListener("change", (e) => {
  color = e.target.value;
});

increaseBtn.addEventListener("click", () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}
