import { Sprites } from '../utils/spritesLoader.js';
import { Registry } from '../Registry.js';

export function createLaser(registry: ReturnType<typeof Registry>, x: number, y: number): number {
  const eid = registry.createEntity();

  registry.addComponent(eid, 'Position', { x, y });
  registry.addComponent(eid, 'Velocity', { x: 0, y: -5 });
  registry.addComponent(eid, 'Size', { width: 9, height: 54 });
  registry.addComponent(eid, 'Damage', { value: 1 });
  registry.addComponent(eid, 'Sprite', { source: Sprites.laserBlue! });

  return eid;
}
