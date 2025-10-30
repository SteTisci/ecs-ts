import { Registry } from './Registry.js';
import { RenderSystem } from './systems/RenderSystem.js';
import { loadSprites } from './assets/sprites.js';
import { createPlayer } from './entities/Player.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

await loadSprites();

const registry = Registry();
const Render = RenderSystem(registry, ctx!);

const PlayerId = createPlayer(registry, 275, 525);

function gameLoop() {
  if (ctx) {
    ctx.clearRect(0, 0, 600, 600);

    Render.update();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
