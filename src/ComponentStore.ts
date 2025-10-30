import { SparseSet } from './utils/SparseSet.js';

// The ComponentStore is responsible for storing the data of a specific component type.
// Each entity that has this component is tracked in the internal SparseSet.
//
// The order of values in these arrays matches the order of entity IDs in the dense array of the SparseSet.
//
// This ensures direct positional coherence:
// dense[i] corresponds to componentData.x[i], componentData.y[i], etc.

export function ComponentStore<T extends Record<string, any>>() {
  const componentSet = SparseSet();
  const componentData: Record<string, any[]> = {};

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
    for (const [key, value] of Object.entries(data)) {
      if (!componentData[key]) {
        componentData[key] = [];
      }

      componentData[key][idx] = value;
    }
  }

  function remove(eid: number) {
    if (!componentSet.has(eid)) {
      throw new Error(`Entity ${eid} does not have this component`);
    }

    const idx = componentSet.getIndex(eid);
    const lastIdx = componentSet.getSize() - 1;

    // Check if the component is not the last entry
    if (idx !== lastIdx) {
      for (const key of Object.keys(componentData)) {
        componentData[key][idx] = componentData[key][lastIdx];
      }
    }

    componentSet.remove(eid);

    // Keep component arrays dense and in sync with the SparseSet's dense array
    for (const key of Object.keys(componentData)) {
      componentData[key].pop();
    }
  }

  // Direct access to raw data for high-performance iteration
  function getRawData() {
    return {
      dense: componentSet.getDense(),
      data: componentData,
    };
  }

  // Get index for an entity (for direct array access)
  function getIndex(eid: number): number {
    return componentSet.getIndex(eid);
  }

  function getSize(): number {
    return componentSet.getSize();
  }

  function debug() {
    console.log('Dense:', componentSet.getDense());
    console.log('Data:', componentData);
  }

  return { add, remove, getRawData, getIndex, has, getSize, debug };
}
