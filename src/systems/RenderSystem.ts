import { Registry } from '../Registry.js';

export function RenderSystem(registry: ReturnType<typeof Registry>, ctx: CanvasRenderingContext2D) {
  return {
    update() {
      const { entities, data } = registry.view('position', 'size', 'sprite');

      for (let i = 0; i < entities.length; i++) {
        const sprite = data.sprite.source[i];
        const x = data.position.x[i];
        const y = data.position.y[i];
        const w = data.size.width[i];
        const h = data.size.height[i];

        ctx.drawImage(sprite, x - w / 2, y - h / 2, w, h);
      }
    },
  };
}
