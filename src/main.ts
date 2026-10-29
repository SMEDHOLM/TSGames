import { SnakeGame } from './SnakeGame';

// Безопасное получение canvas с проверкой типов (type assertion)
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement | null;

if (!canvas) {
  throw new Error('Canvas element with id "gameCanvas" not found.');
}

const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error('Failed to acquire 2D rendering context.');
}

// Инициализация игры
const game = new SnakeGame(ctx);

const directionButtons = document.querySelectorAll<HTMLButtonElement>('[data-direction]');
for (const button of directionButtons) {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction;
    if (direction === 'UP' || direction === 'DOWN' || direction === 'LEFT' || direction === 'RIGHT') {
      game.changeDirection(direction);
    }
  });
}

const reloadButton = document.getElementById('reloadButton');
if (!reloadButton) {
  throw new Error('Reload button with id "reloadButton" not found.');
}
reloadButton.addEventListener('click', () => game.reset());

// Игровой цикл (100мс = 10 кадров в секунду)
setInterval(() => {
  game.update();
  game.draw();
}, 600);