export function SparseSet() {
  const sparse: number[] = [];
  const dense: number[] = [];
  let size = 0;

  function has(eid: number): boolean {
    const idx = sparse[eid];
    return idx !== undefined && idx >= 0 && idx < size && dense[idx] === eid;
  }

  function add(eid: number) {
    if (has(eid)) return;

    sparse[eid] = size;
    dense[size] = eid;
    size++;
  }

  function remove(eid: number) {
    if (!has(eid)) return;

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

  function get(): number[] {
    return dense.slice(0, size);
  }

  return { has, add, remove, getIndex, get };
}
