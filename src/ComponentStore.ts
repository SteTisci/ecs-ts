import { SparseSet } from './SparseSet.js';

// The ComponentStore is responsible for storing the data of a specific component type.
// Each entity that has this component is tracked in the internal SparseSet.
//
// The order of values in these arrays matches the order of entity IDs in the dense array of the SparseSet.
//
// This ensures direct positional coherence:
// dense[i] corresponds to componentData.x[i], componentData.y[i], etc.

export function ComponentStore<T extends Record<string, any>>() {
  const set = SparseSet();
  const componentData: Record<string, any[]> = {};

  function add(eid: number, data: T) {
    if (set.has(eid)) return;

    // Use the current size (next index) to maintain data coherence with the dense array
    const idx = set.getSize();
    set.add(eid);

    // Store each property of the component into its corresponding array
    for (const [key, value] of Object.entries(data)) {
      if (!componentData[key]) {
        componentData[key] = [];
      }

      componentData[key][idx] = value;
    }
  }

  function remove(eid: number) {
    if (!set.has(eid)) return;

    const idx = set.getIndex(eid);
    const lastIdx = set.getSize() - 1;

    set.remove(eid);

    // Keep component arrays dense and in sync with the SparseSet's dense array
    for (const key of Object.keys(componentData)) {
      componentData[key][idx] = componentData[key][lastIdx];
      componentData[key].pop();
    }
  }

  // Return the component data for the given entity
  function get(eid: number): T | undefined {
    const idx = set.getIndex(eid);
    const result: any = {};

    for (const key of Object.keys(componentData)) {
      result[key] = componentData[key][idx];
    }

    return result as T;
  }

  function debug() {
    console.log('Dense:', set.getDense());
    console.log('Data:', componentData);
  }

  return { add, remove, get, debug };
}
