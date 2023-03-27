const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const numCellsX = canvasWidth / cellSize;
const numCellsY = canvasHeight / cellSize;

const snake = [{ x: numCellsX / 2, y: numCellsY / 2 }];
let food = generateFood();

let direction = "right";
let gameLoop;

function generateFood() {
  const foodX = Math.floor(Math.random() * numCellsX);
  const foodY = Math.floor(Math.random() * numCellsY);
  return { x: foodX, y: foodY };
}

function drawSnake() {
  ctx.fillStyle = "#333";
  snake.forEach((cell) => {
    const x = cell.x * cellSize;
    const y = cell.y * cellSize;
    ctx.fillRect(x, y, cellSize, cellSize);
  });
}

function drawFood() {
  const x = food.x * cellSize;
  const y = food.y * cellSize;
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, cellSize, cellSize);
}

function moveSnake() {
  const head = snake[0];
  let newX, newY;
  switch (direction) {
    case "right":
      newX = head.x + 1;
      newY = head.y;
      break;
    case "left":
      newX = head.x - 1;
      newY = head.y;
      break;
    case "up":
      newX = head.x;
      newY = head.y - 1;
      break;
    case "down":
      newX = head.x;
      newY = head.y + 1;
      break;
  }
  const newHead = { x: newX, y: newY };
  snake.unshift(newHead);
  if (newX === food.x && newY === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= numCellsX || head.y < 0 || head.y >= numCellsY) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function gameLoopFunction() {
  moveSnake();
  if (checkCollision()) {
    clearInterval(gameLoop);
    alert("Game over!");
    return;
  }
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawSnake();
  drawFood();
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
});

gameLoop = setInterval(gameLoopFunction, 100);
