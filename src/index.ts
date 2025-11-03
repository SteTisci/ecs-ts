import { Registry } from './Registry.js';
import { RenderSystem } from './systems/RenderSystem.js';
import { loadSprites } from './utils/spritesLoader.js';
import { createPlayer } from './entities/Player.js';
import { InputSystem } from './systems/InputSystem.js';
import { MovementSystem } from './systems/MovementSystem.js';
import { createBackground } from './entities/Background.js';
import { createEnemy } from './entities/Enemy.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// Width and height of the canvas are relative to the window dimension
const canvasWidth = (canvas.width = window.innerWidth);
const canvasHeight = (canvas.height = window.innerHeight);

// Wait for sprite loading before game start
await loadSprites();

const registry = Registry();
const Render = RenderSystem(registry);
const Movement = MovementSystem(registry);
const Input = InputSystem(registry);

// Player start position offsets relative to the canvas
const pOffsetX = 25;
const pOffsetY = 100;

const BackgroundId = createBackground(registry, canvasWidth, canvasHeight);
const EnemyId = createEnemy(registry, canvasWidth / 2 - pOffsetX, pOffsetY);
const PlayerId = createPlayer(registry, canvasWidth / 2 - pOffsetX, canvasHeight - pOffsetY);

let lastTime = performance.now();

function gameLoop() {
  const now = performance.now();
  const deltaTime = (now - lastTime) / 1000; // Time passed
  lastTime = now;

  if (ctx) {
    // Canvas reset
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    Input.update(deltaTime);
    Movement.update();
    Render.update(ctx);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
