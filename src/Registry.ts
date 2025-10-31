import { EntityManager } from './EntityManager.js';
import { ComponentStore } from './ComponentStore.js';
import { ComponentMap } from './utils/ComponentMap.js';
import {
  ComponentName,
  StoreMap,
  EntityComponents,
  Position,
  Size,
  Sprite,
  Velocity,
  Health,
  Damage,
  LifeTime,
  Weapon,
  Input,
  Hierarchy,
} from './types/index.js';

// Registry is responsible for orchestrate Entities and components opearations.
// Every store manage a specific component using a SparseSet under the hood and SoA structure to handle the data.

export function Registry() {
  const entityManager = EntityManager();

  const stores: StoreMap = {
    position: ComponentStore<Position>(),
    velocity: ComponentStore<Velocity>(),
    size: ComponentStore<Size>(),
    sprite: ComponentStore<Sprite>(),
    health: ComponentStore<Health>(),
    damage: ComponentStore<Damage>(),
    lifetime: ComponentStore<LifeTime>(),
    weapon: ComponentStore<Weapon>(),
    input: ComponentStore<Input>(),
    hierarchy: ComponentStore<Hierarchy>(),
  };

  function createEntity(): number {
    return entityManager.create();
  }

  function destroyEntity(eid: number) {
    const mask = entityManager.getMask(eid);

    // Direct bit manipulation instead of getComponentNames
    for (let cid = 0; cid < 32; cid++) {
      if ((mask & (1 << cid)) !== 0) {
        const name = ComponentMap.getName(cid);
        stores[name].remove(eid);
      }
    }

    entityManager.remove(eid);
  }

  function addComponent<T extends ComponentName>(eid: number, name: T, data: EntityComponents[T]) {
    entityManager.addComponent(eid, name);
    stores[name].add(eid, data);
  }

  function removeComponent<T extends ComponentName>(eid: number, name: T) {
    entityManager.removeComponent(eid, name);
    stores[name].remove(eid);
  }

  function query<T extends ComponentName[]>(...components: T): number[] {
    if (components.length === 0) return [];

    let targetMask = 0;

    // Calculate target bitmask
    for (const comp of components) {
      const cid = ComponentMap.getId(comp);
      targetMask |= 1 << cid;
    }

    // Find smallest store for efficiency
    let smallestStore = stores[components[0]];
    let smallestSize = smallestStore.getSize();

    for (let i = 1; i < components.length; i++) {
      const size = stores[components[i]].getSize();

      if (size < smallestSize) {
        smallestStore = stores[components[i]];
        smallestSize = size;
      }
    }

    // Filter using bitmask comparison
    const result: number[] = [];
    const dense = smallestStore.getRawData().dense;

    for (const eid of dense) {
      // Single bitwise AND operation checks all components at once
      if ((entityManager.getMask(eid) & targetMask) === targetMask) {
        result.push(eid);
      }
    }

    return result;
  }

  function view<T extends ComponentName[]>(
    ...components: T
  ): {
    ids: number[];
    data: { [K in T[number]]: ReturnType<(typeof stores)[K]['getRawData']>['data'] };
    indices: { [K in T[number]]: number[] };
  } {
    if (components.length === 0) return { ids: [], data: {}, indices: {} } as any;

    const ids = query(...components);
    const data: any = {};
    const indices: any = {};

    // Prepare direct access to raw data
    for (const comp of components) {
      data[comp] = stores[comp].getRawData().data;
      indices[comp] = [];
    }

    // Construct the indices table for every component
    for (const eid of ids) {
      for (const comp of components) {
        const idx = stores[comp].getIndex(eid);
        indices[comp].push(idx);
      }
    }

    return { ids, data, indices };
  }

  return { createEntity, destroyEntity, addComponent, removeComponent, stores, query, view };
}
