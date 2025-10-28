import { ComponentName } from './types/index.js';

// The EntityManager is responsible for creating and managing entities.
//
// Each entity is represented by a numeric ID (eid) that is incrementally assigned.
// Removed entities are recycled to avoid ID exhaustion.
//
// The manager also tracks which components each entity currently has using a Map structure.

export function EntityManager() {
  const entities = new Map<number, Set<ComponentName>>();
  const recycledEids: number[] = [];
  let nextEid = 0;

  function exists(eid: number): boolean {
    return entities.has(eid);
  }

  function hasComponent<T extends ComponentName>(eid: number, name: T): boolean {
    return entities.get(eid)?.has(name) ?? false;
  }

  function create(): number {
    const eid = recycledEids.length > 0 ? recycledEids.pop()! : nextEid++;

    entities.set(eid, new Set());
    return eid;
  }

  function remove(eid: number) {
    if (!exists(eid)) {
      throw new Error(`Entity ${eid} does not exist`);
    }

    entities.delete(eid);
    recycledEids.push(eid);
  }

  function addComponent<T extends ComponentName>(eid: number, name: T) {
    if (!exists(eid)) {
      throw new Error(`Entity ${eid} does not exist`);
    }

    if (hasComponent(eid, name)) {
      throw new Error(`Entity ${eid} already has component ${name}`);
    }

    entities.get(eid)!.add(name);
  }

  function removeComponent<T extends ComponentName>(eid: number, name: T) {
    if (!exists(eid)) {
      throw new Error(`Entity ${eid} does not exist`);
    }

    const components = entities.get(eid);

    if (!components?.has(name)) {
      throw new Error(`Entity ${eid} does not have component ${name}`);
    }

    components.delete(name);
  }

  function getComponents(eid: number): Set<ComponentName> | undefined {
    return entities.get(eid);
  }

  function getAll(): MapIterator<[number, Set<ComponentName>]> {
    return entities.entries();
  }

  return { create, remove, addComponent, removeComponent, getComponents, getAll, exists, hasComponent };
}
