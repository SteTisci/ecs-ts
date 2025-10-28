type Position = { x: number; y: number };
type Size = { width: number; height: number };
type Velocity = { vx: number; vy: number };
type Sprite = { src: HTMLImageElement };

export interface EntityComponents {
  position: Position;
  size: Size;
  velocity: Velocity;
  sprite: Sprite;
}

export type ComponentName = keyof EntityComponents;

type ComponentStores = {
  position: ReturnType<typeof ComponentStore<Position>>;
  velocity: ReturnType<typeof ComponentStore<Velocity>>;
  size: ReturnType<typeof ComponentStore<Size>>;
  sprite: ReturnType<typeof ComponentStore<Sprite>>;
};
