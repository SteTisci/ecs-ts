import { EntityManager } from './EntityManager.js';
import { ComponentStore } from './ComponentStore.js';
import { ComponentMap } from './utils/ComponentMap.js';
import { ComponentName, StoreMap, EntityComponents, Position, Size, Sprite, Velocity, ViewResult } from './types/index.js';

// Registry is responsible for orchestrate Entities and components opearations.
// Every store manage a specific component using a SparseSet under the hood and SoA structure to handle the data.

export function Registry() {
  const entityManager = EntityManager();

  const stores: StoreMap = {
    position: ComponentStore<Position>(),
    velocity: ComponentStore<Velocity>(),
    size: ComponentStore<Size>(),
    sprite: ComponentStore<Sprite>(),
  };

  function createEntity(): number {
    return entityManager.create();
  }

  function destroyEntity(eid: number) {
    const mask = entityManager.bitMasks[eid];

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

    // Start with the smallest set for efficiency
    let smallestStore = stores[components[0]];
    let smallestSize = smallestStore.getSize();

    for (let i = 1; i < components.length; i++) {
      const size = stores[components[i]].getSize();

      if (size < smallestSize) {
        smallestStore = stores[components[i]];
        smallestSize = size;
      }
    }

    // Filter entities that have all required components
    const result: number[] = [];
    const dense = smallestStore.getRawData().dense;

    for (const eid of dense) {
      let hasAll = true;

      for (const component of components) {
        if (!stores[component].has(eid)) {
          hasAll = false;

          break;
        }
      }

      if (hasAll) {
        result.push(eid);
      }
    }

    return result;
  }

  function view<T extends ComponentName[]>(...components: T): ViewResult<T> {
    const entities = query(...components);

    const data = {} as ViewResult<T>['data'];

    for (const name of components) {
      const store = stores[name as keyof typeof stores];
      data[name as keyof typeof data] = store.getRawData().data;
    }

    return { entities, data };
  }

  return { createEntity, destroyEntity, addComponent, removeComponent, stores, query, view };
}
