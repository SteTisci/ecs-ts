import { Sprites } from '../utils/spritesLoader.js';
import { Registry } from '../Registry.js';

export function createEnemy(registry: ReturnType<typeof Registry>, x: number, y: number): number {
  const eid = registry.createEntity();

  registry.addComponent(eid, 'Position', { x, y });
  registry.addComponent(eid, 'Velocity', { x: 0, y: 0 });
  registry.addComponent(eid, 'Size', { width: 52, height: 42 });
  registry.addComponent(eid, 'Health', { current: 1, max: 1 });
  registry.addComponent(eid, 'Weapon', { fireRate: 1, lastFired: 0 });
  registry.addComponent(eid, 'Sprite', { source: Sprites.enemyBlack3! });

  return eid;
}
