import { Registry } from '../Registry.js';

export function RenderSystem(registry: ReturnType<typeof Registry>, ctx: CanvasRenderingContext2D) {
  return {
    update() {
      const { ids, data, indices } = registry.view('position', 'size', 'sprite');
      const { position, size, sprite } = data;
      const { position: pIdx, size: sIdx, sprite: spIdx } = indices;

      for (let i = 0; i < ids.length; i++) {
        if (sprite.source[spIdx[i]] && sprite.source[spIdx[i]].complete) {
          ctx.drawImage(
            sprite.source[spIdx[i]],
            position.x[pIdx[i]] - size.width[sIdx[i]] / 2,
            position.y[pIdx[i]] - size.height[spIdx[i]] / 2,
            size.width[spIdx[i]],
            size.height[spIdx[i]],
          );
        }
      }
    },
  };
}
