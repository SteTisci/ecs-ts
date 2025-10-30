import { Sprites } from '../assets/sprites.js';

export function createLaser(registry: any, x: number, y: number) {
  const eid = registry.createEntity();

  registry.addComponent(eid, 'position', { x, y });
  registry.addComponent(eid, 'velocity', { x: 0, y: -150 });
  registry.addComponent(eid, 'size', { width: 9, height: 54 });
  registry.addComponent(eid, 'lifetime', { remaining: 3 });
  registry.addComponent(eid, 'damage', { value: 1 });
  registry.addComponent(eid, 'sprite', { source: Sprites.laserBlue! });

  return eid;
}
