let score = 0;
let glitchLeft = window.innerWidth;
let gameStarted = false;
let animationFrameId;
let countdownInProgress = false;

let glitchSpeed = 3;
const maxSpeed = 12;
const speedIncrease = 0.3;

const cube = document.getElementById("cube");
const glitch = document.getElementById("glitch");
const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById("start-screen");
const restartButton = document.getElementById("restart");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScoreText = document.getElementById("final-score-text");

// Countdown overlay
const countdownOverlay = document.createElement("div");
countdownOverlay.id = "countdown-overlay";
countdownOverlay.style.position = "absolute";
countdownOverlay.style.top = "50%";
countdownOverlay.style.left = "50%";
countdownOverlay.style.transform = "translate(-50%, -50%)";
countdownOverlay.style.fontSize = "8vw";
countdownOverlay.style.color = "#0ff";
countdownOverlay.style.zIndex = "15";
countdownOverlay.style.display = "none";
countdownOverlay.style.fontFamily = "monospace";
countdownOverlay.style.fontWeight = "bold";
countdownOverlay.style.textShadow = "0 0 10px #0ff";
countdownOverlay.style.animation = "pulse 1s infinite";
document.body.appendChild(countdownOverlay);

const pulseStyle = document.createElement("style");
pulseStyle.innerHTML = `
@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}`;
document.head.appendChild(pulseStyle);

function showCountdown(callback) {
  if (countdownInProgress) return;
  countdownInProgress = true;

  const countdownTexts = ["Linking...", "Connecting...", "Synced!"];
  let count = 0;
  countdownOverlay.textContent = countdownTexts[count];
  countdownOverlay.style.display = "block";

  const countdownInterval = setInterval(() => {
    count++;
    if (count === countdownTexts.length) {
      clearInterval(countdownInterval);
      countdownOverlay.style.display = "none";
      countdownInProgress = false;
      callback();
    } else {
      countdownOverlay.textContent = countdownTexts[count];
    }
  }, 1000);
}

function jump() {
  if (!cube.classList.contains("jump")) {
    cube.classList.add("jump");
    setTimeout(() => cube.classList.remove("jump"), 800);
  }
}

function startGame() {
  cancelAnimationFrame(animationFrameId);
  gameStarted = true;
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  score = 0;
  glitchSpeed = 3;
  glitchLeft = window.innerWidth;
  scoreDisplay.textContent = "Nexus Points: 0";
  cube.style.bottom = "50px"; // стартова позиція куба
  requestAnimationFrame(moveGlitch);
}

restartButton.addEventListener("click", () => {
  cancelAnimationFrame(animationFrameId);
  showCountdown(startGame);
});

document.addEventListener("keydown", (e) => {
  if (!gameStarted && e.code === "Space") {
    showCountdown(startGame);
  } else if (gameStarted && e.code === "Space") {
    jump();
  }
});

document.addEventListener("mousedown", (e) => {
  if (e.target.closest("footer")) return;
  if (!gameStarted) {
    showCountdown(startGame);
  } else {
    jump();
  }
});

document.body.addEventListener("touchstart", (e) => {
  if (e.target.closest("footer")) return;
  if (!gameStarted) {
    showCountdown(startGame);
  } else {
    jump();
  }
});

function moveGlitch() {
  if (!gameStarted) return;

  glitchLeft -= glitchSpeed;
  glitch.style.left = `${glitchLeft}px`;

  if (glitchLeft < -50) {
    glitchLeft = window.innerWidth + Math.random() * 300;
    score++;
    scoreDisplay.textContent = `Nexus Points: ${score}`;
    glitchSpeed = Math.min(glitchSpeed + speedIncrease, maxSpeed);
  }

  const cubeBottom = parseInt(window.getComputedStyle(cube).getPropertyValue("bottom"));
  if (glitchLeft < 100 && glitchLeft > 50 && cubeBottom < 80) {
    gameOver();
    return;
  }

  animationFrameId = requestAnimationFrame(moveGlitch);
}

function gameOver() {
  gameStarted = false;
  finalScoreText.textContent = `☠️ Game Over! Final Score: ${score}`;
  gameOverScreen.style.display = "flex";
}
