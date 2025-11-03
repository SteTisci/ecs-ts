import { Registry } from '../Registry.js';

export function RenderSystem(registry: ReturnType<typeof Registry>) {
  return {
    update(ctx: CanvasRenderingContext2D) {
      const { eids, data, idx } = registry.view('Position', 'Size', 'Sprite');

      for (let i = 0; i < eids.length; i++) {
        const src = data.Sprite.source[idx.Sprite[i]];

        ctx.drawImage(
          src,
          data.Position.x[idx.Position[i]],
          data.Position.y[idx.Position[i]],
          data.Size.width[idx.Size[i]],
          data.Size.height[idx.Size[i]],
        );
      }
    },
  };
}
