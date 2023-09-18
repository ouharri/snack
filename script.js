class Snack {
  constructor() {
    this.direction = 'RIGHT';
    this.speed = 100;
    this.posX = 0;
    this.posY = 0;
    this.score = 0;
    this.snackElement = document.getElementById("snack");
    this.scoreElement = document.getElementById("score");
    this.headElement = document.getElementById("head");
    this.tailElement = document.querySelector(".tail");
    this.tailPositions = [];
    this.bait = {
      element: document.getElementById("bait"),
      posX: this.getRandomPosition(),
      posY: this.getRandomPosition()
    };
    this.intervalId = null;
  }

  getRandomPosition() {
    return Math.floor(Math.random() * 20) * 30;
  }

  move() {
    switch (this.direction) {
      case 'RIGHT':
        this.posX = (this.posX + 30) % 600;
        break;
      case 'LEFT':
        this.posX = (this.posX - 30 + 600) % 600;
        break;
      case 'TOP':
        this.posY = (this.posY - 30 + 600) % 600;
        break;
      case 'BOTTOM':
        this.posY = (this.posY + 30) % 600;
        break;
    }

    this.headElement.style.left = this.posX + "px";
    this.headElement.style.top = this.posY + "px";

    if (this.isCollisionWithBait()) {
      this.score += 10;
      this.setBait();
      this.setTail();
      this.scoreElement.innerHTML = this.score;
    }
  }

  isCollisionWithBait() {
    return this.bait.posX === this.posX && this.bait.posY === this.posY;
  }

  setBait() {
    this.bait.posX = this.getRandomPosition();
    this.bait.posY = this.getRandomPosition();
    this.bait.element.style.left = this.bait.posX + "px";
    this.bait.element.style.top = this.bait.posY + "px";
  }

  setTail() {
    // const newTail = document.createElement("div");
    // newTail.className = "tail";
    // newTail.style.left = this.posX + "px";
    // newTail.style.top = this.posY + "px";
    // this.snackElement.appendChild(newTail);
    // this.tailPositions.push({ left: this.posX, top: this.posY });

    // if (this.tailPositions.length > this.score) {
    //   const removedTail = this.tailPositions.shift();
    //   const removedTailElement = this.tailElement.nextElementSibling;
    //   this.snackElement.removeChild(removedTailElement);
    // }

    // let tail = document.querySelectorAll(".tail");

    // Array.from(tail).forEach((item, index) => {
    //   item.style.left = (this.posX + 30 * index) + "px";
    //   item.style.top = (this.posY + 30 * index) + "px";
    // });
  }

  start() {
    this.setBait();
    this.intervalId = setInterval(() => this.move(), this.speed);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

const snack = new Snack();
snack.start();

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "ArrowDown":
      if (snack.direction !== 'TOP') snack.direction = 'BOTTOM';
      break;
    case "ArrowUp":
      if (snack.direction !== 'BOTTOM') snack.direction = 'TOP';
      break;
    case "ArrowLeft":
      if (snack.direction !== 'RIGHT') snack.direction = 'LEFT';
      break;
    case "ArrowRight":
      if (snack.direction !== 'LEFT') snack.direction = 'RIGHT';
      break;
    default:
      return;
  }
}, true);