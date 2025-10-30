import { ComponentStore } from '../ComponentStore.js';

type Position = { x: number; y: number };
type Size = { width: number; height: number };
type Velocity = { vx: number; vy: number };
type Sprite = { source: HTMLImageElement };

export interface EntityComponents {
  position: Position;
  size: Size;
  velocity: Velocity;
  sprite: Sprite;
}

export type ComponentName = keyof EntityComponents;

export type StoreMap = {
  [K in ComponentName]: ReturnType<typeof ComponentStore<EntityComponents[K]>>;
};

export type ViewResult<T extends ComponentName[]> = {
  entities: number[];
  data: {
    [K in T[number]]: ReturnType<(typeof stores)[K]['getRawData']>['data'];
  };
};
