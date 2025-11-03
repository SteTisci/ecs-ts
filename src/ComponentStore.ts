import { SparseSet } from './utils/SparseSet.js';
import { ComponentDataArrays } from './types/index.js';

// The ComponentStore is responsible for storing the data of a specific component type.
// Each entity that has this component is tracked in the internal SparseSet.
//
// The order of values in these arrays matches the order of entity IDs in the dense array of the SparseSet.
//
// This ensures direct positional coherence:
// dense[i] corresponds to componentData.x[i], componentData.y[i], etc.

export function ComponentStore<T extends Record<string, any>>() {
  const componentSet = SparseSet();
  const componentData = {} as ComponentDataArrays<T>;

  function has(eid: number): boolean {
    return componentSet.has(eid);
  }

  function add(eid: number, data: T) {
    if (componentSet.has(eid)) {
      throw new Error(`Entity ${eid} already has this component`);
    }

    // Use the current size (next index) to maintain data coherence with the dense array
    const idx = componentSet.getSize();
    componentSet.add(eid);

    // Store each property of the component into its corresponding array
    for (const key in data) {
      if (!componentData[key]) {
        componentData[key] = [] as T[typeof key][];
      }
      componentData[key][idx] = data[key];
    }
  }

  function remove(eid: number) {
    if (!componentSet.has(eid)) {
      throw new Error(`Entity ${eid} does not have this component`);
    }

    const idx = componentSet.getIndex(eid);
    const lastIdx = componentSet.getSize() - 1;

    // Avoid data swap if component is already the last entry
    if (idx !== lastIdx) {
      for (const key of Object.keys(componentData)) {
        componentData[key][idx] = componentData[key][lastIdx];
      }
    }

    componentSet.remove(eid);

    // Keep component arrays dense and in sync with the SparseSet's dense array
    for (const key in componentData) {
      componentData[key].pop();
    }
  }

  // Direct access to raw data for high-performance iteration
  function getRawData(): { dense: number[]; data: ComponentDataArrays<T> } {
    return {
      dense: componentSet.getDense(),
      data: componentData,
    };
  }

  function getIndex(eid: number): number {
    return componentSet.getIndex(eid);
  }

  function getSize(): number {
    return componentSet.getSize();
  }

  return { add, remove, getRawData, getIndex, has, getSize };
}
