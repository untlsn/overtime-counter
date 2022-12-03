export const mutToggleInSet = <T>(set: Set<T>, element: T) => {
  if (set.has(element)) set.delete(element);
  else set.add(element);

  return set;
};
