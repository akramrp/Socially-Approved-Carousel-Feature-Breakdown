export function getCircularWindow(items, activeIndex, radius = 1) {
  if (!items.length) return [];
  const max = items.length;
  return Array.from({ length: Math.min(max, radius * 2 + 1) }, (_, offset) => {
    const index = (activeIndex - radius + offset + max) % max;
    return { item: items[index], index };
  });
}
