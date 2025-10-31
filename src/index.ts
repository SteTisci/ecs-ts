import { Registry } from './Registry.js';
import { RenderSystem } from './systems/RenderSystem.js';
import { loadSprites } from './utils/spritesLoader.js';
import { createPlayer } from './entities/Player.js';
import { InputSystem } from './systems/InputSystem.js';
import { MovementSystem } from './systems/MovementSystem.js';
import { createBackground } from './entities/Background.js';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

await loadSprites();

const registry = Registry();
const Render = RenderSystem(registry, ctx!);
const Movement = MovementSystem(registry);
const Input = InputSystem(registry);

const BackgroundId = createBackground(registry, 600, 600);
const PlayerId = createPlayer(registry, 275, 525);

document.addEventListener('keydown', event => Input.update(event.key, true));
document.addEventListener('keyup', event => Input.update(event.key, false));

const { ids, data, indices } = registry.view('position', 'size', 'sprite');
console.log(ids, data, indices);

function gameLoop() {
  if (ctx) {
    ctx.clearRect(0, 0, 600, 600);

    Movement.update();
    Render.update();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
