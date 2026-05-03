import SplitText from './SplitText';

const CAPS = [
  { tag: '01', name: 'Brand identity', detail: 'Strategy, mark, type, voice, guidelines.' },
  { tag: '02', name: 'Motion design', detail: 'Title sequences, product films, UI motion language.' },
  { tag: '03', name: 'Web experiences', detail: 'Marketing sites, editorial platforms, configurators.' },
  { tag: '04', name: 'Editorial systems', detail: 'Print and digital publications, books, reports.' },
  { tag: '05', name: 'Type direction', detail: 'Custom display faces and licensing curation.' }
];

export default function Capabilities() {
  return (
    <section className="caps" id="capabilities">
      <div className="container caps__inner">
        <div className="caps__left">
          <span className="eyebrow">Capabilities</span>
          <SplitText as="h2" className="caps__title serif" stagger={0.04} duration={800}>
            What we make.
          </SplitText>
          <p className="caps__copy">
            We work in small, senior teams. No producers, no traffic. The people who pitch you
            are the people who build the work.
          </p>
        </div>
        <ul className="caps__list">
          {CAPS.map((c) => (
            <li key={c.tag} className="caps__item">
              <span className="caps__tag">{c.tag}</span>
              <span className="caps__name serif">{c.name}</span>
              <span className="caps__detail">{c.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
