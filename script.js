// Constants for grid size and cell size
const GRID_SIZE = 20;
const CELL_SIZE = 30;

// Create the grid
const contentElement = document.getElementById("content");
const grid = [];

for (let i = 0; i < GRID_SIZE; i++) {
  const line = document.createElement("div");
  line.classList.add("line");
  const row = [];

  for (let j = 0; j < GRID_SIZE; j++) {
    const square = document.createElement("div");
    square.id = j + "-" + i;
    square.classList.add("square");
    square.style.left = j * CELL_SIZE + "px";
    square.style.top = i * CELL_SIZE + "px";
    line.appendChild(square);
    row.push(square);
  }

  contentElement.appendChild(line);
  grid.push(row);
}

// Function to turn square to light color
function activateSquare(i, j) {
  grid[j][i].style.background = "#fff";
}

// Function to reset square color
function shutdownSquare(i, j) {
  try {
    grid[j][i].style.background = "#05204A";
  } catch (e) {
    console.log(e);
  }
}

class Snake {
  constructor() {
    this.direction = "right";
    this.speed = 5;
    this.size = 2;
    this.x = 4;
    this.y = 9;
    this.prevX = this.x;
    this.prevY = this.y;
    this.scoreElement = document.getElementById("score");
    this.bait = {
      posX: this.getRandomPosition(),
      posY: this.getRandomPosition(),
    };
    this.score = 0;

    // Initialize the bait position
    let square = document.getElementById(this.bait.posX + "-" + this.bait.posY);
    square.style.background = "#8734f2";

    // Start the game loop
    this.move();
  }

  setDirection(direction) {
    this.direction = direction;
  }

  move(x = this.x, y = this.y) {
    setTimeout(() => {
      activateSquare(x, y);

      // Turn off the previous square
      let prevX = this.x;
      let prevY = this.y;

      setTimeout(() => {
        shutdownSquare(prevX, prevY);
      }, (this.size - 1) * (400 / this.speed));

      switch (this.direction) {
        case "right":
          x = (x + 1) % GRID_SIZE;
          break;
        case "left":
          x = (x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case "up":
          y = (y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case "down":
          y = (y + 1) % GRID_SIZE;
          break;
      }

      if (this.isCollisionWithBait(x, y)) {
        this.score += 10;
        this.size++;
        this.setBait();
        this.scoreElement.innerHTML = this.score;
      }

      this.x = x;
      this.y = y;

      this.move(this.x, this.y);
    }, 400 / this.speed);
  }

  setBait() {
    this.bait.posX = this.getRandomPosition();
    this.bait.posY = this.getRandomPosition();
    let square = document.getElementById(this.bait.posX + "-" + this.bait.posY);
    square.style.background = "#8734f2";
  }

  getRandomPosition() {
    return (Math.floor(Math.random() * GRID_SIZE));
  }

  isCollisionWithBait(x, y) {
    return this.bait.posX === x && this.bait.posY === y;
  }
}

const snack = new Snake();

// Event listener for arrow key presses to change direction
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "ArrowDown":
      if (snack.direction !== 'TOP') snack.setDirection("down");
      break;
    case "ArrowUp":
      if (snack.direction !== 'BOTTOM') snack.setDirection("up");
      break;
    case "ArrowLeft":
      if (snack.direction !== 'RIGHT') snack.setDirection("left");
      break;
    case "ArrowRight":
      if (snack.direction !== 'LEFT') snack.setDirection("right");
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);
