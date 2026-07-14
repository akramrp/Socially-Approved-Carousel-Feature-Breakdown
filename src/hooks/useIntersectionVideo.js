import { useEffect, useState } from 'react';

export function useIntersectionVideo(ref, { root = null, rootMargin = '160px', threshold = 0.55 } = {}) {
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) { setVisible(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= threshold), { root, rootMargin, threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold]);
  return isVisible;
}
