import { ComponentStore } from '../ComponentStore.js';

type Position = { x: number; y: number };
type Size = { width: number; height: number };
type Velocity = { x: number; y: number };
type Sprite = { source: HTMLImageElement };
type Health = { current: number; max: number };
type Damage = { value: number };
type LifeTime = { remaining: number };
type Weapon = { fireRate: number; lastFired: number };
type Input = { keys: Set<string> };
type Hierarchy = { parent: number };

export interface EntityComponents {
  Position: Position;
  Size: Size;
  Velocity: Velocity;
  Sprite: Sprite;
  Health: Health;
  Damage: Damage;
  Lifetime: LifeTime;
  Weapon: Weapon;
  Input: Input;
  Hierarchy: Hierarchy;
}

export type ComponentName = keyof EntityComponents;

export type StoreMap = {
  [K in ComponentName]: ReturnType<typeof ComponentStore<EntityComponents[K]>>;
};

export type ComponentDataArrays<T> = {
  [K in keyof T]: T[K][];
};

export interface ViewResult<T extends ComponentName[]> {
  eids: number[];
  data: {
    [K in T[number]]: ReturnType<StoreMap[K]['getRawData']>['data'];
  };
  idx: {
    [K in T[number]]: number[];
  };
}
