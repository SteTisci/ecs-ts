import { ComponentName } from '../types/index.js';

function ComponentRegistry() {
  const nameToId = new Map<ComponentName, number>();
  const idToName = new Map<number, ComponentName>();
  let nextId = 0;

  function register(name: ComponentName) {
    if (nameToId.has(name)) return;

    const id = nextId++;

    nameToId.set(name, id);
    idToName.set(id, name);
  }

  function getId(name: ComponentName): number {
    return nameToId.get(name)!;
  }

  function getName(id: number): ComponentName {
    return idToName.get(id)!;
  }

  return { register, getId, getName };
}

// Map every component to a incremental number (max components = 32)
export const ComponentMap = ComponentRegistry();

ComponentMap.register('Position');
ComponentMap.register('Size');
ComponentMap.register('Velocity');
ComponentMap.register('Sprite');
ComponentMap.register('Health');
ComponentMap.register('Damage');
ComponentMap.register('Lifetime');
ComponentMap.register('Weapon');
ComponentMap.register('Input');
ComponentMap.register('Hierarchy');
