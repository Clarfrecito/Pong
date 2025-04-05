// gameObjects.js (formato ES module)
export let paddle, wall, ball;
export function initGameObjects(canvas, velocidad = 4) {
  paddle = {
    x: 10,
    y: canvas.height / 2 - 40,
    width: 10,
    height: 80,
    speed: 6,
    dy: 0,
  };
  wall = {
    x: canvas.width - 10,
    y: 0,
    width: 10,
    height: canvas.height,
  };
  ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    dx: velocidad,
    dy: velocidad,
  };
}
export function drawRect(ctx, x, y, w, h) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, w, h);
}
export function drawBall(ctx) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
