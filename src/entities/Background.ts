import { Sprites } from '../utils/spritesLoader.js';
import { Registry } from '../Registry.js';

export function createBackground(registry: ReturnType<typeof Registry>, width: number, height: number): number {
  const eid = registry.createEntity();

  registry.addComponent(eid, 'Position', { x: 0, y: 0 });
  registry.addComponent(eid, 'Size', { width, height });
  registry.addComponent(eid, 'Sprite', { source: Sprites.blackSky! });

  return eid;
}
