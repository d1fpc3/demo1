# Northbound — demo1

Single-page fictional design studio site. Showcase build for the React 19 + Vite + Framer Motion + GSAP + Lenis house stack.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Stack

- Vite 6 + React 19
- `motion` (Framer Motion v11)
- `gsap` + `@gsap/react` (ScrollTrigger pin/scrub for stacking work cards)
- `lenis` (smooth scroll, exposes velocity to the marquees)
- `split-type` (free SplitText alternative)

No images, no Tailwind. CSS variables only.

## Patterns reused

- Magnetic Pull (nav links, approach cards, primary CTA)
- Liquid Fill + Shine Sweep (primary CTA)
- Arrow Slide (ghost CTA)
- Stacking cards (selected work)
- SplitText line/word stagger reveal (hero, headlines)
- Velocity-reactive marquee (hero strip + logo wall)
- `prefers-reduced-motion` short-circuit on every animation
