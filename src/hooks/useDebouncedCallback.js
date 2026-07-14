import { useCallback, useEffect, useRef } from 'react';
export function useDebouncedCallback(callback, delay = 150) {
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  return useCallback((...args) => { clearTimeout(timer.current); timer.current = setTimeout(() => callback(...args), delay); }, [callback, delay]);
}
