const road = document.getElementById('road');
const car = document.getElementById('car');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('gameOver');

let position = 125;
let gameRunning = true;
let score = 0;

// Move car
document.addEventListener('keydown', (e) => {
  if (!gameRunning) return;
  if (e.key === 'ArrowLeft' && position > 0) {
    position -= 25;
    car.style.left = position + 'px';
  }
  if (e.key === 'ArrowRight' && position < 250) {
    position += 25;
    car.style.left = position + 'px';
  }
});

// Create obstacles
function createObstacle() {
  if (!gameRunning) return;
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  const lane = Math.floor(Math.random() * 3) * 100 + 25; // 3 lanes
  obstacle.style.left = lane + 'px';
  road.appendChild(obstacle);

  let topPos = -100;
  const speed = 4;

  const fall = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fall);
      return;
    }
    topPos += speed;
    obstacle.style.top = topPos + 'px';

    // Collision detection
    const carRect = car.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
      carRect.left < obsRect.left + obsRect.width &&
      carRect.left + carRect.width > obsRect.left &&
      carRect.top < obsRect.top + obsRect.height &&
      carRect.height + carRect.top > obsRect.top
    ) {
      endGame();
      clearInterval(fall);
    }

    // Remove off-screen
    if (topPos > 500) {
      obstacle.remove();
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      clearInterval(fall);
    }
  }, 20);
}

// Generate obstacles every 1.5 sec
const obstacleTimer = setInterval(() => {
  if (gameRunning) createObstacle();
}, 1500);

// End Game
function endGame() {
  gameRunning = false;
  gameOverText.style.display = 'block';
  road.style.animation = 'none';
  scoreDisplay.textContent += ' | Press F5 to restart';
}
