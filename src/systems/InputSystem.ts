import { createLaser } from '../entities/Laser.js';
import { Registry } from '../Registry.js';

export function InputSystem(registry: ReturnType<typeof Registry>) {
  return {
    update(key: string, isKeyDown: boolean) {
      const { ids, data, indices } = registry.view('position', 'velocity', 'input');
      const { position, velocity, input } = data;
      const { position: pIdx, velocity: vIdx, input: iIdx } = indices;

      for (let i = 0; i < ids.length; i++) {
        const keys = input.keys[iIdx[i]];

        if (!keys) continue;
        if (!keys.has(key)) continue;

        switch (key) {
          case ' ':
            if (isKeyDown) createLaser(registry, position.x[pIdx[i]], position.y[pIdx[i]] - 55);
            break;
          case 'ArrowUp':
            velocity.y[vIdx[i]] = isKeyDown ? -5 : 0;
            break;
          case 'ArrowDown':
            velocity.y[vIdx[i]] = isKeyDown ? 5 : 0;
            break;
          case 'ArrowLeft':
            velocity.x[vIdx[i]] = isKeyDown ? -5 : 0;
            break;
          case 'ArrowRight':
            velocity.x[vIdx[i]] = isKeyDown ? 5 : 0;
            break;
        }
      }
    },
  };
}
