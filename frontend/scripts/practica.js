import {
  initGameObjects,
  paddle,
  wall,
  ball,
  drawRect,
  drawBall,
} from "./gameObjects.js";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const pauseBtn = document.getElementById("pauseBtn");
const pauseMenu = document.getElementById("pauseMenu");
const endMenu = document.getElementById("endMenu");
const reboteCounter = document.getElementById("reboteCounter");
const velocidadMensaje = document.getElementById("velocidadMensaje");
let paused = false;
let rebotes = 0;
let velocidad = 4;
let showVelocidadMensaje = false;
initGameObjects(canvas, velocidad);
// Eventos de teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "w" || e.key === "W")
    paddle.dy = -paddle.speed;
  else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S")
    paddle.dy = paddle.speed;
});
document.addEventListener("keyup", (e) => {
  if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "w" ||
    e.key === "W" ||
    e.key === "s" ||
    e.key === "S"
  ) {
    paddle.dy = 0;
  }
});
pauseBtn.addEventListener("click", () => {
  paused = true;
  pauseMenu.classList.remove("hidden");
});
function showEndMenu() {
  paused = true;
  endMenu.classList.remove("hidden");
}
function restartGame() {
  rebotes = 0;
  velocidad = 4;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = velocidad;
  ball.dy = velocidad;
  paddle.y = canvas.height / 2 - paddle.height / 2;
  paddle.dy = 0;
  reboteCounter.textContent = `Rebotes: ${rebotes}`;
  velocidadMensaje.classList.add("hidden");
  endMenu.classList.add("hidden");
  paused = false;
  requestAnimationFrame(gameLoop);
}
function saveScore() {
  alert(`Guardando puntuación: ${rebotes} rebotes`);
}
function exitGame() {
  window.location.href = "practicar.html";
}
function resumeGame() {
  paused = false;
  pauseMenu.classList.add("hidden");
  requestAnimationFrame(gameLoop);
}
function update() {
  paddle.y += paddle.dy;
  if (paddle.y < 0) paddle.y = 0;
  if (paddle.y + paddle.height > canvas.height)
    paddle.y = canvas.height - paddle.height;
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.x + ball.radius < 0) {
    showEndMenu();
    return;
  }
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy *= -1;
  }
  const colisionaConPaleta =
    ball.dx < 0 &&
    ball.x - ball.radius <= paddle.x + paddle.width &&
    ball.x > paddle.x &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height;
  if (colisionaConPaleta) {
    ball.dx *= -1;
    rebotes++;
    reboteCounter.textContent = `Rebotes: ${rebotes}`;
    if (rebotes % 5 === 4) {
      showVelocidadMensaje = true;
      velocidadMensaje.classList.remove("hidden");
    } else {
      velocidadMensaje.classList.add("hidden");
    }
    if (rebotes % 5 === 0) {
      velocidad += 1;
      ball.dx = Math.sign(ball.dx) * velocidad;
      ball.dy = Math.sign(ball.dy) * velocidad;
    }
  }
  if (ball.x + ball.radius > wall.x) {
    ball.dx *= -1;
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(ctx, paddle.x, paddle.y, paddle.width, paddle.height);
  drawRect(ctx, wall.x, wall.y, wall.width, wall.height);
  drawBall(ctx);
}
function gameLoop() {
  if (!paused) {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }
}
window.resumeGame = resumeGame;
window.restartGame = restartGame;
window.saveScore = saveScore;
window.exitGame = exitGame;
requestAnimationFrame(gameLoop);
