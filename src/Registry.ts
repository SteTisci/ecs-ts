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
  ViewResult,
} from './types/index.js';

// Registry is responsible for orchestrate Entities and components opearations.
// Every store manage a specific component using a SparseSet under the hood and SoA structure to handle the data.

export function Registry() {
  const Entities = EntityManager();

  const Stores: StoreMap = {
    Position: ComponentStore<Position>(),
    Velocity: ComponentStore<Velocity>(),
    Size: ComponentStore<Size>(),
    Sprite: ComponentStore<Sprite>(),
    Health: ComponentStore<Health>(),
    Damage: ComponentStore<Damage>(),
    Lifetime: ComponentStore<LifeTime>(),
    Weapon: ComponentStore<Weapon>(),
    Input: ComponentStore<Input>(),
    Hierarchy: ComponentStore<Hierarchy>(),
  };

  function createEntity(): number {
    return Entities.create();
  }

  function destroyEntity(eid: number) {
    const mask = Entities.getMask(eid);

    for (let cid = 0; cid < 32; cid++) {
      if ((mask & (1 << cid)) !== 0) {
        const name = ComponentMap.getName(cid);
        Stores[name].remove(eid);
      }
    }

    Entities.remove(eid);
  }

  function addComponent<T extends ComponentName>(eid: number, name: T, data: EntityComponents[T]) {
    Entities.addComponent(eid, name);
    Stores[name].add(eid, data);
  }

  function removeComponent<T extends ComponentName>(eid: number, name: T) {
    Entities.removeComponent(eid, name);
    Stores[name].remove(eid);
  }

  function query<T extends ComponentName[]>(...components: T): number[] {
    if (components.length === 0) return [];

    // Find smallest store for efficiency
    let smallestStore = Stores[components[0]];
    let smallestSize = smallestStore.getSize();

    for (let i = 1; i < components.length; i++) {
      const size = Stores[components[i]].getSize();

      if (size < smallestSize) {
        smallestStore = Stores[components[i]];
        smallestSize = size;
      }
    }

    // Filter using bitmask comparison
    const result: number[] = [];
    const dense = smallestStore.getRawData().dense;
    let targetMask = 0;

    // Calculate target bitmask
    for (const name of components) {
      const cid = ComponentMap.getId(name);
      targetMask |= 1 << cid;
    }

    for (const eid of dense) {
      const mask = Entities.getMask(eid);

      // Single bitwise AND operation checks all components
      if ((mask & targetMask) === targetMask) {
        result.push(eid);
      }
    }

    return result;
  }

  function view<T extends ComponentName[]>(...components: T): ViewResult<T> {
    if (components.length === 0) {
      return { ids: [], data: {}, idx: {} } as unknown as ViewResult<T>;
    }

    const eids = query(...components);
    const data: any = {};
    const idx: any = {};

    for (const name of components) {
      data[name] = Stores[name].getRawData().data;
      idx[name] = [];
    }

    for (const eid of eids) {
      for (const name of components) {
        const id = Stores[name].getIndex(eid);
        idx[name].push(id);
      }
    }

    return { eids, data, idx };
  }

  return { createEntity, destroyEntity, addComponent, removeComponent, query, view };
}
