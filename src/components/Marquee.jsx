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
  const lastTimeRef = useRef(0);
  const rafRef = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    if (!track) return;

    const tick = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const dirSign = direction === 'left' ? -1 : 1;
      const boost = Math.min(Math.abs(velocity) * 8, 200);
      const speed = baseSpeed + boost;
      xRef.current += dirSign * speed * dt;

      const halfWidth = track.scrollWidth / 2;
      if (xRef.current <= -halfWidth) xRef.current += halfWidth;
      if (xRef.current >= 0) xRef.current -= halfWidth;

      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseSpeed, velocity, direction, reduce]);

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" ref={trackRef}>
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
