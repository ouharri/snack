class Snack {
  constructor() {
    this.direction = 'RIGHT';
    this.speed = 100;
    this.posX = 0;
    this.posY = 0;
    this.score = 0;
    this.scoreElement = document.getElementById("score");
    this.headElement = document.getElementById("head");
    this.bait = {
      element : document.getElementById("bait"),
      posX : parseInt(this.randomIntFromInterval(0,19)) * 30,
      posY : parseInt(this.randomIntFromInterval(0,19)) * 30
    }
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  move() {
    switch (this.direction) {
      case 'RIGHT':
        if (this.posX > 600) this.posX = 0;
        this.posX += 30;
        this.headElement.style.left = this.posX + "px";

        if(this.bait.posX == this.posX && this.bait.posY == this.posY) {
          this.score++;
          this.setBait();
          console.log(this.score);
        }


        break;
      case 'LEFT':
        if (this.posX <= 0) this.posX = 600;
        this.posX -= 30;
        this.headElement.style.left = this.posX + "px";
        if(this.bait.posX == this.posX && this.bait.posY == this.posY) {
          this.score++;
          this.setBait();
          console.log(this.score);
        }
        break;
      case 'TOP':
        if (this.posY <= 0) this.posY = 600;
        this.posY -= 30;
        this.headElement.style.top = this.posY + "px";
        if(this.bait.posX == this.posX && this.bait.posY == this.posY) {
          this.score++;
          this.setBait();
          console.log(this.score);
        }
        break;
      case 'BOTTOM':
        if (this.posY > 600) this.posY = 0;
        this.posY += 30;
        this.headElement.style.top = this.posY + "px";
        if(this.bait.posX == this.posX && this.bait.posY == this.posY) {
          this.score++;
          this.setBait();
          console.log(this.score);
        }
        break;
    }
  }

  setBait() {
    this.bait.posX = parseInt(Math.random() * 20) * 30;
    this.bait.posY = parseInt(Math.random() * 20) * 30;

    this.bait.element.style.left = this.bait.posX + "px";
    this.bait.element.style.top = this.bait.posY + "px";

    this.scoreElement.innerHTML = this.score;
  }

  start() {

    this.bait.element.style.left = this.bait.posX + "px";
    this.bait.element.style.top = this.bait.posY + "px";

    this.intervalId = setInterval(() => {
      this.move();
    }, this.speed);
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
      if(snack.direction != 'TOP') snack.direction = 'BOTTOM';
      break;
    case "ArrowUp":
      if(snack.direction != 'BOTTOM') snack.direction = 'TOP';
      break;
    case "ArrowLeft":
      if(snack.direction != 'RIGHT') snack.direction = 'LEFT';
      break;
    case "ArrowRight":
      if(snack.direction != 'LEFT') snack.direction = 'RIGHT';
      break;
    default:
      return;
  }
}, true);
