import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../lib/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'halcyon',
    name: 'Halcyon Audio',
    year: '2025',
    discipline: 'Identity · Web',
    blurb: 'A boutique speaker brand rebuilt around a single product line. New mark, type system, and ecommerce.',
    bg: 'linear-gradient(135deg, oklch(0.42 0.04 50), oklch(0.28 0.03 50))',
    fg: 'oklch(0.92 0.02 80)'
  },
  {
    id: 'meridian',
    name: 'Meridian Press',
    year: '2024',
    discipline: 'Editorial · Type',
    blurb: 'Quarterly journal of long-form interviews. Custom serif and a 12-column grid that bends to image.',
    bg: 'linear-gradient(160deg, oklch(0.72 0.13 50), oklch(0.55 0.10 45))',
    fg: 'oklch(0.14 0.01 80)'
  },
  {
    id: 'cinder',
    name: 'Cinder & Co.',
    year: '2024',
    discipline: 'Brand · Motion',
    blurb: 'A coffee roaster moving from wholesale into direct-to-consumer. Packaging system, site, and launch film.',
    bg: 'linear-gradient(150deg, oklch(0.32 0.02 80), oklch(0.18 0.01 80))',
    fg: 'oklch(0.92 0.02 80)'
  }
];

export default function SelectedWork() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia('(max-width: 720px)').matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.proj-card');
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const scale = 1 - (cards.length - 1 - i) * 0.04;
        const rot = (i % 2 === 0 ? -1 : 1) * 2.5;
        gsap.to(card, {
          scale,
          rotate: rot,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top top+=120',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1
          }
        });
      });
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="container work__head">
        <span className="eyebrow">Selected work · 2024–2025</span>
        <h2 className="work__title serif">A small body of work, made on purpose.</h2>
      </div>

      <div className="work__stack">
        {PROJECTS.map((p, i) => (
          <article
            key={p.id}
            className="proj-card"
            style={{ background: p.bg, color: p.fg, '--idx': i }}
          >
            <div className="proj-card__inner container">
              <header className="proj-card__head">
                <span className="proj-card__num serif">0{i + 1}</span>
                <span className="proj-card__discipline">{p.discipline}</span>
              </header>
              <h3 className="proj-card__name serif">{p.name}</h3>
              <p className="proj-card__blurb">{p.blurb}</p>
              <footer className="proj-card__foot">
                <span className="proj-card__year">{p.year}</span>
                <span className="proj-card__cta">
                  Open case study
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
