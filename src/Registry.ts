import { EntityManager } from './EntityManager.js';
import { ComponentStore } from './ComponentStore.js';
import { ComponentName, ComponentStores, EntityComponents, Position, Size, Sprite, Velocity } from './types/index.js';

export function Registry() {
  const entityManager = EntityManager();

  const stores: ComponentStores = {
    position: ComponentStore<Position>(),
    velocity: ComponentStore<Velocity>(),
    size: ComponentStore<Size>(),
    sprite: ComponentStore<Sprite>(),
  };

  function createEntity(): number {
    return entityManager.create();
  }

  function destroyEntity(eid: number) {
    for (const name of entityManager.getComponents(eid)!) {
      stores[name].remove(eid);
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

  return { createEntity, destroyEntity, addComponent, removeComponent, stores };
}
