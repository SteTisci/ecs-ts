import { Registry } from '../Registry.js';

export function MovementSystem(registry: ReturnType<typeof Registry>) {
  return {
    update() {
      const { eids, data, idx } = registry.view('Position', 'Velocity');

      for (let i = 0; i < eids.length; i++) {
        data.Position.x[idx.Position[i]] += data.Velocity.x[idx.Velocity[i]];
        data.Position.y[idx.Position[i]] += data.Velocity.y[idx.Velocity[i]];
      }
    },
  };
}
