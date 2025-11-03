import { Sprites } from '../utils/spritesLoader.js';
import { Registry } from '../Registry.js';

export function createPlayer(registry: ReturnType<typeof Registry>, x: number, y: number): number {
  const eid = registry.createEntity();

  registry.addComponent(eid, 'Position', { x, y });
  registry.addComponent(eid, 'Velocity', { x: 0, y: 0 });
  registry.addComponent(eid, 'Size', { width: 50, height: 38 });
  registry.addComponent(eid, 'Health', { current: 3, max: 3 });
  registry.addComponent(eid, 'Damage', { value: 1 });
  registry.addComponent(eid, 'Input', { keys: new Set() });
  registry.addComponent(eid, 'Weapon', { fireRate: 0.5, lastFired: 0 });
  registry.addComponent(eid, 'Sprite', { source: Sprites.player! });

  return eid;
}
