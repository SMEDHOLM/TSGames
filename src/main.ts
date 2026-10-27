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
// Игровой цикл (100мс = 10 кадров в секунду)
setInterval(() => {
  game.update();
  game.draw();
}, 100);