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
