import { Registry } from '../Registry.js';

export function MovementSystem(registry: ReturnType<typeof Registry>) {
  return {
    update() {
      const { ids, data, indices } = registry.view('position', 'velocity');
      const { position, velocity } = data;
      const { position: pIdx, velocity: vIdx } = indices;

      for (let i = 0; i < ids.length; i++) {
        position.x[pIdx[i]] += velocity.x[vIdx[i]];
        position.y[pIdx[i]] += velocity.y[vIdx[i]];
      }
    },
  };
}
