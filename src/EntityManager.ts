import { ComponentName } from './types/index.js';

export function EntityManager() {
  const entities = new Map<number, Set<ComponentName>>();
  const recicledEids: number[] = [];
  let nextEid = 0;

  function exists(eid: number): boolean {
    return entities.has(eid);
  }

  function hasComponent<T extends ComponentName>(eid: number, name: T): Boolean {
    return entities.get(eid)?.has(name) ?? false;
  }

  function create(): number {
    const eid = recicledEids.length > 0 ? recicledEids.pop()! : nextEid++;

    entities.set(eid, new Set());
    return eid;
  }

  function remove(eid: number) {
    if (!exists(eid)) return;

    entities.delete(eid);
    recicledEids.push(eid);
  }

  function addComponent<T extends ComponentName>(eid: number, name: T) {
    if (exists(eid)) {
      if (hasComponent(eid, name)) {
        throw new Error(`Entity ${eid} already has component ${name}`);
      }

      entities.get(eid)?.add(name);
    }
  }

  function removeComponent<T extends ComponentName>(eid: number, name: T) {
    if (exists(eid)) {
      if (!hasComponent(eid, name)) {
        throw new Error(`Entity ${eid} does not have component ${name}`);
      }

      entities.get(eid)?.delete(name);
    }
  }

  function getComponents(eid: number): Set<ComponentName> | undefined {
    return entities.get(eid);
  }

  function getAll(): MapIterator<[number, Set<ComponentName>]> {
    return entities.entries();
  }

  return { create, remove, addComponent, removeComponent, getComponents, getAll };
}
