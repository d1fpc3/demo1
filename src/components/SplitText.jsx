import { useEffect, useRef } from 'react';
import SplitTypeLib from 'split-type';
import { useReducedMotion } from '../lib/useReducedMotion';

/**
 * Wraps children in a per-line stagger reveal triggered when the element
 * enters the viewport. Splits into words inside lines so we can stagger.
 */
export default function SplitText({
  as: Tag = 'div',
  type = 'words,lines',
  className = '',
  delay = 0,
  stagger = 0.05,
  duration = 700,
  children
}) {
  const elRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (reduce) {
      el.style.opacity = 1;
      return;
    }

    const split = new SplitTypeLib(el, { types: type });
    const targets = split.words ?? split.lines ?? [];

    targets.forEach((node) => {
      node.style.display = 'inline-block';
      node.style.transform = 'translateY(110%)';
      node.style.opacity = '0';
      node.style.willChange = 'transform, opacity';
      node.style.transition = `transform ${duration}ms var(--ease-emphasized), opacity ${duration}ms var(--ease-out)`;
    });
    if (split.lines) {
      split.lines.forEach((line) => {
        line.style.overflow = 'hidden';
        line.style.display = 'block';
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          targets.forEach((node, i) => {
            node.style.transitionDelay = `${delay + i * stagger * 1000}ms`;
            node.style.transform = 'translateY(0)';
            node.style.opacity = '1';
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      try { split.revert(); } catch (e) { /* element may already be unmounted */ }
    };
  }, [type, delay, stagger, duration, reduce, children]);

  return (
    <Tag ref={elRef} className={className}>
      {children}
    </Tag>
  );
}
