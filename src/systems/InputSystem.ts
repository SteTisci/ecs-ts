import { createLaser } from '../entities/Laser.js';
import { Registry } from '../Registry.js';

export function InputSystem(registry: ReturnType<typeof Registry>) {
  const globalKeys = new Set<string>();
  const V = 3;
  const offsetX = 20;
  const offsetY = 55;

  // Event listeners to register pressed keys
  document.addEventListener('keydown', e => globalKeys.add(e.key));
  document.addEventListener('keyup', e => globalKeys.delete(e.key));

  return {
    update(deltaTime: number) {
      const { eids, data, idx } = registry.view('Position', 'Velocity', 'Input', 'Weapon');

      for (let i = 0; i < eids.length; i++) {
        let entityKeys = data.Input.keys[idx.Input[i]];

        // Assign key pressed to entity Input component
        entityKeys.clear();
        entityKeys = globalKeys;

        // Movement reset
        data.Velocity.x[idx.Velocity[i]] = 0;
        data.Velocity.y[idx.Velocity[i]] = 0;

        // Directional movement
        if (entityKeys.has('ArrowUp')) data.Velocity.y[idx.Velocity[i]] = -V;
        if (entityKeys.has('ArrowDown')) data.Velocity.y[idx.Velocity[i]] = V;
        if (entityKeys.has('ArrowLeft')) data.Velocity.x[idx.Velocity[i]] = -V;
        if (entityKeys.has('ArrowRight')) data.Velocity.x[idx.Velocity[i]] = V;

        // Fire rate
        data.Weapon.lastFired[idx.Weapon[i]] += deltaTime;

        // Create laser if spacebar is pressed
        // Lasers are created based on the entity position and offsets
        if (entityKeys.has(' ') && data.Weapon.lastFired[idx.Weapon[i]] >= data.Weapon.fireRate[idx.Weapon[i]]) {
          createLaser(registry, data.Position.x[idx.Position[i]] + offsetX, data.Position.y[idx.Position[i]] - offsetY);
          data.Weapon.lastFired[idx.Weapon[i]] = 0;
        }
      }
    },
  };
}
