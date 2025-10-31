import { Sprites } from '../utils/spritesLoader.js';
import { Registry } from '../Registry.js';

export function createLaser(registry: ReturnType<typeof Registry>, x: number, y: number): number {
  const eid = registry.createEntity();

  registry.addComponent(eid, 'position', { x, y });
  registry.addComponent(eid, 'velocity', { x: 0, y: -10 });
  registry.addComponent(eid, 'size', { width: 9, height: 54 });
  registry.addComponent(eid, 'damage', { value: 1 });
  registry.addComponent(eid, 'sprite', { source: Sprites.laserBlue! });

  return eid;
}
