import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';

/**
 * Continuous-scroll marquee. baseSpeed is px/sec.
 *
 * Renders the children N times in each "group" where N is whatever count
 * makes one group wider than the wrapper. Without that, short children
 * lists would show two copies on screen at once and the loop would read
 * as a duplicate.
 */
export default function Marquee({
  children,
  baseSpeed = 50,
  velocity = 0,
  direction = 'left',
  className = ''
}) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef(0);
  const reduce = useReducedMotion();
  const [repeatsPerGroup, setRepeatsPerGroup] = useState(1);

  // Mirror velocity into a ref so the RAF loop reads it without
  // forcing the main animation effect to remount on every scroll tick.
  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  // Decide how many copies of `children` go in each group so that one
  // group is at least as wide as the wrapper. Re-measure on resize and
  // after fonts load (serif glyph widths change).
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const measure = () => {
      const wrapperWidth = wrapper.clientWidth;
      const firstCopy = track.querySelector('.marquee__copy');
      if (!firstCopy) return;
      const onePassWidth = firstCopy.scrollWidth;
      if (onePassWidth <= 0 || wrapperWidth <= 0) return;
      // We want one group ≥ wrapperWidth. +1 for safety against
      // fractional widths and font-load reflow.
      const next = Math.max(1, Math.ceil(wrapperWidth / onePassWidth) + 1);
      setRepeatsPerGroup((prev) => (prev === next ? prev : next));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => ro.disconnect();
  }, [children, repeatsPerGroup]);

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
  }, [baseSpeed, direction, reduce, repeatsPerGroup]);

  // Build group content: children repeated N times. Each copy has its
  // own flex container so gap spacing repeats correctly across copies.
  const groupContent = [];
  for (let i = 0; i < repeatsPerGroup; i++) {
    groupContent.push(
      <span className="marquee__copy" key={i}>{children}</span>
    );
  }

  return (
    <div className={`marquee ${className}`} ref={wrapperRef}>
      <div className="marquee__track" ref={trackRef}>
        <div className="marquee__group">{groupContent}</div>
        <div className="marquee__group" aria-hidden="true">{groupContent}</div>
      </div>
    </div>
  );
}
