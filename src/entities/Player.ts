import { Sprites } from '../utils/spritesLoader.js';
import { Registry } from '../Registry.js';

export function createPlayer(registry: ReturnType<typeof Registry>, x: number, y: number): number {
  const eid = registry.createEntity();

  registry.addComponent(eid, 'position', { x, y });
  registry.addComponent(eid, 'velocity', { x: 0, y: 0 });
  registry.addComponent(eid, 'size', { width: 99, height: 75 });
  registry.addComponent(eid, 'health', { current: 3, max: 3 });
  registry.addComponent(eid, 'damage', { value: 1 });
  registry.addComponent(eid, 'input', { keys: new Set([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']) });
  registry.addComponent(eid, 'weapon', { fireRate: 0.2, lastFired: 0 });
  registry.addComponent(eid, 'sprite', { source: Sprites.player! });

  return eid;
}
