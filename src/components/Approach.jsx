import { useMagnetic } from '../lib/useMagnetic';

const STEPS = [
  {
    n: '01',
    title: 'Listen',
    body: 'Two weeks of interviews with founders, customers, and ops. We arrive with questions, not decks.'
  },
  {
    n: '02',
    title: 'Make',
    body: 'A single concept, fully built. No three-route presentations. We make the case for one direction and stand behind it.'
  },
  {
    n: '03',
    title: 'Refine',
    body: 'Two rounds of paid revisions, then we ship. Anything beyond that, we talk about scope.'
  }
];

function StepCard({ step }) {
  const ref = useMagnetic(0.12);
  return (
    <article ref={ref} className="step">
      <div className="step__inner">
        <header className="step__head">
          <span className="step__num serif">{step.n}</span>
          <span className="step__title serif">{step.title}</span>
        </header>
        <p className="step__body">{step.body}</p>
        <div className="step__rule" />
      </div>
    </article>
  );
}

export default function Approach() {
  return (
    <section className="approach" id="approach">
      <div className="container approach__head">
        <span className="eyebrow">Approach</span>
        <h2 className="approach__title serif">Three steps. No theatre.</h2>
      </div>
      <div className="approach__row">
        {STEPS.map((s) => <StepCard key={s.n} step={s} />)}
      </div>
    </section>
  );
}
