import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export function useLenis() {
  const [velocity, setVelocity] = useState(0);
  const rafIdRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5
      });
    }
    const lenis = lenisInstance;

    const onScroll = ({ velocity: v }) => setVelocity(v);
    lenis.on('scroll', onScroll);

    const tick = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.off('scroll', onScroll);
    };
  }, []);

  return { velocity, lenis: lenisInstance };
}
