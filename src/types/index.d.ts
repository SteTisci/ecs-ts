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
  position: Position;
  size: Size;
  velocity: Velocity;
  sprite: Sprite;
  health: Health;
  damage: Damage;
  lifetime: LifeTime;
  weapon: Weapon;
  input: Input;
  hierarchy: Hierarchy;
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
