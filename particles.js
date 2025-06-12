const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "#0ff";
    ctx.fill();
  };

  this.update = function () {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  };
}

function init() {
  particlesArray = [];
  const numberOfParticles = (canvas.width * canvas.height) / 9000;

  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const directionX = (Math.random() - 0.5) * 0.8;
    const directionY = (Math.random() - 0.5) * 0.8;
    particlesArray.push(new Particle(x, y, directionX, directionY, size));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

init();
animate();
