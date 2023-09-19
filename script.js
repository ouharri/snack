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
    square.id = `${j}-${i}`; // Utilisation de l'interpolation de chaîne pour plus de clarté
    square.classList.add("square");
    square.style.left = `${j * CELL_SIZE}px`; // Utilisation de l'interpolation de chaîne
    square.style.top = `${i * CELL_SIZE}px`; // Utilisation de l'interpolation de chaîne
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
    this.speed = 3;
    this.size = 1;
    this.x = 4;
    this.y = 9;
    this.scoreElement = document.getElementById("score");
    this.tail = [];
    this.bait = {
      posX: this.getRandomPosition(),
      posY: this.getRandomPosition(),
    };
    this.score = 0;

    // Initialize the bait position
    this.setBait();

    // Start the game loop
    this.move();
  }

  setDirection(direction) {
    this.direction = direction;
  }

  move(x = this.x, y = this.y) {
    setTimeout(() => {
      activateSquare(x, y);

      // Check for collision with tail
      if (this.isCollisionWithTail(x, y)) {
        this.gameOver();
        return;
      }

      // Store the current position in the tail
      this.tail.unshift({ x: x, y: y });

      // Turn off the previous square (tail segment)
      if (this.tail.length > this.size) {
        const tailSegment = this.tail.pop();
        shutdownSquare(tailSegment.x, tailSegment.y);
      }

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

      // Update the current and previous positions
      this.prevX = this.x;
      this.prevY = this.y;
      this.x = x;
      this.y = y;

      // Continue the game loop
      this.move(this.x, this.y);
    }, 400 / this.speed);
  }

  setBait() {
    this.bait.posX = this.getRandomPosition();
    this.bait.posY = this.getRandomPosition();

    while (this.isCollisionWithTail(this.bait.posX, this.bait.posY)) {
      this.bait.posX = this.getRandomPosition();
      this.bait.posY = this.getRandomPosition();
    }

    document.getElementById(`${this.bait.posX}-${this.bait.posY}`).style.background = "#8734f2"; // Utilisation de l'interpolation de chaîne
  }

  getRandomPosition() {
    return Math.floor(Math.random() * GRID_SIZE);
  }

  isCollisionWithBait(x, y) {
    return this.bait.posX === x && this.bait.posY === y;
  }

  isCollisionWithTail(x, y) {
    for (let i = 0; i < this.tail.length; i++) {
      const segment = this.tail[i];
      if (segment.x === x && segment.y === y) {
        return true;
      }
    }
    return false;
  }

  gameOver() {
    alert("Game Over! You lost.");
    // Perform any additional actions needed when the game is over
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
      if (snack.direction !== 'up') snack.setDirection("down");
      break;
    case "ArrowUp":
      if (snack.direction !== 'down') snack.setDirection("up");
      break;
    case "ArrowLeft":
      if (snack.direction !== 'right') snack.setDirection("left");
      break;
    case "ArrowRight":
      if (snack.direction !== 'left') snack.setDirection("right");
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);