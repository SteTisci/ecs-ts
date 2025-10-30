import { ComponentName } from './types/index.js';
import { ComponentMap } from './utils/ComponentMap.js';

// The EntityManager is responsible for creating and managing entities.
//
// Each entity is represented by a numeric ID (eid) that is incrementally assigned.
// Removed entities are recycled to avoid ID exhaustion.
//
// It also tracks which components each entity currently has using a bitMask.

export function EntityManager() {
  const bitMasks: number[] = [];
  const recycledEids: number[] = [];
  let nextEid = 0;

  function exists(eid: number): boolean {
    return eid >= 0 && eid < nextEid && bitMasks[eid] !== undefined;
  }

  function create(): number {
    const eid = recycledEids.length > 0 ? recycledEids.pop()! : nextEid++;

    bitMasks[eid] = 0;
    return eid;
  }

  function remove(eid: number) {
    if (!exists(eid)) {
      throw new Error(`Entity ${eid} does not exist`);
    }

    recycledEids.push(eid);
    delete bitMasks[eid];
  }

  function addComponent<T extends ComponentName>(eid: number, name: T) {
    if (!exists(eid)) {
      throw new Error(`Entity ${eid} does not exist`);
    }

    if (hasComponent(eid, name)) {
      throw new Error(`Entity ${eid} already has component ${name}`);
    }

    const cid = ComponentMap.getId(name);
    bitMasks[eid] |= 1 << cid;
  }

  function removeComponent<T extends ComponentName>(eid: number, name: T) {
    if (!exists(eid)) {
      throw new Error(`Entity ${eid} does not exist`);
    }

    const cid = ComponentMap.getId(name);
    bitMasks[eid] &= ~(1 << cid);
  }

  function hasComponent<T extends ComponentName>(eid: number, name: T) {
    const cid = ComponentMap.getId(name);
    return (bitMasks[eid] & (1 << cid)) !== 0;
  }

  return { create, remove, addComponent, removeComponent, exists, hasComponent, bitMasks };
}
