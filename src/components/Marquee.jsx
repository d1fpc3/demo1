import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';

/**
 * Continuous-scroll marquee. baseSpeed is px/sec.
 * Optionally accepts an external velocity signal (from Lenis) to speed up
 * while the user is actively scrolling.
 */
export default function Marquee({
  children,
  baseSpeed = 50,
  velocity = 0,
  direction = 'left',
  className = ''
}) {
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef(0);
  const reduce = useReducedMotion();

  // Mirror velocity prop into a ref so the RAF loop can read it without
  // forcing the main effect to remount on every scroll tick.
  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();
    const dirSign = direction === 'left' ? -1 : 1;

    const tick = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const boost = Math.min(Math.abs(velocityRef.current) * 8, 200);
      const speed = baseSpeed + boost;
      xRef.current += dirSign * speed * dt;

      // Wrap math relies on track.scrollWidth = exactly 2× one group.
      // CSS removes padding-right on .marquee__group to guarantee this.
      // Keep x in [-halfWidth, 0]. Use while-loops so a single overshoot
      // (high velocity boost) still resolves in one frame, no visual step.
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        while (xRef.current <= -halfWidth) xRef.current += halfWidth;
        while (xRef.current >= 0) xRef.current -= halfWidth;
      }

      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseSpeed, direction, reduce]);

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" ref={trackRef}>
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
