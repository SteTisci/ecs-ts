// The SparseSet is responsible for fast entity lookups, insertion and removal.
//
// Maintain two parallel arrays:
// - sparse: a direct lookup table that maps an entity ID (eid) to its index in the dense array.
// - dense: a compact array that stores all active entity IDs contiguously.
//
// The size rapresent the number of active entities in the set.

export function SparseSet() {
  const sparse: number[] = [];
  const dense: number[] = [];
  let size = 0;

  function has(eid: number): boolean {
    const idx = sparse[eid];
    return idx !== undefined && idx >= 0 && idx < size && dense[idx] === eid;
  }

  function add(eid: number) {
    sparse[eid] = size;
    dense[size] = eid;
    size++;
  }

  function remove(eid: number) {
    const idx = sparse[eid];
    const last = dense[size - 1];

    // Swap with the last entry
    dense[idx] = last;
    sparse[last] = idx;

    // Pop the last entry
    dense.pop();
    size--;

    // the entry deleted will be left undefined
    delete sparse[eid];
  }

  function getIndex(eid: number): number {
    return sparse[eid];
  }

  function getDense(): number[] {
    return dense;
  }

  function getSize(): number {
    return size;
  }

  return { has, add, remove, getIndex, getDense, getSize };
}
