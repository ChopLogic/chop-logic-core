export function removeArrayItemByIndex<T>(arr: T[], index: number): T[] {
  if (index > -1) {
    arr.splice(index, 1);
  }

  return arr;
}
