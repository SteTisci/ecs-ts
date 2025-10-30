import { ComponentName } from '../types/index.js';

function ComponentRegistry() {
  const nameToId = new Map();
  const idToName = new Map();
  let nextId = 0;

  function register(name: ComponentName) {
    if (nameToId.has(name)) return;

    const id = nextId++;

    nameToId.set(name, id);
    idToName.set(id, name);
  }

  function getId(name: ComponentName): number {
    return nameToId.get(name);
  }

  function getName(id: number): ComponentName {
    return idToName.get(id);
  }

  return { register, getId, getName };
}

// Map every component to a number (max components = 32)

export const ComponentMap = ComponentRegistry();

ComponentMap.register('position');
ComponentMap.register('size');
ComponentMap.register('velocity');
ComponentMap.register('sprite');
ComponentMap.register('health');
ComponentMap.register('damage');
ComponentMap.register('lifetime');
ComponentMap.register('weapon');
ComponentMap.register('input');
ComponentMap.register('hierarchy');
