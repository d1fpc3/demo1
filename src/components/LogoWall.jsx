import Marquee from './Marquee';

const CLIENTS = [
  'Halcyon',
  'Meridian',
  'Cinder & Co.',
  'Outback',
  'Opulence',
  'White Line',
  'Mech & Gas',
  'd1fpc3'
];

export default function LogoWall({ velocity }) {
  return (
    <section className="logos" aria-label="Selected clients">
      <div className="container logos__head">
        <span className="eyebrow">Trusted by — selected clients, 2019–2026</span>
      </div>
      <Marquee baseSpeed={28} velocity={velocity} direction="right" className="logos__marquee">
        {CLIENTS.map((c) => (
          <span key={c} className="logos__name serif">{c}</span>
        ))}
      </Marquee>
    </section>
  );
}
