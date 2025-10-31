import { Sprites } from '../utils/spritesLoader.js';
import { Registry } from '../Registry.js';

export function createBackground(registry: ReturnType<typeof Registry>, width: number, height: number): number {
  const eid = registry.createEntity();

  registry.addComponent(eid, 'position', { x: 0, y: 0 });
  registry.addComponent(eid, 'size', { width: 600, height: 600 });
  registry.addComponent(eid, 'sprite', { source: Sprites.blackSky! });

  return eid;
}
