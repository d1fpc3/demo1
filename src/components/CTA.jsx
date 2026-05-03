import { useMagnetic } from '../lib/useMagnetic';
import SplitText from './SplitText';

export default function CTA() {
  const primaryRef = useMagnetic(0.25);

  return (
    <section className="cta" id="contact">
      <div className="container cta__inner">
        <span className="eyebrow">Get in touch</span>
        <SplitText as="h2" className="cta__title serif" stagger={0.05} duration={900}>
          Let's make something worth keeping.
        </SplitText>
        <p className="cta__lede">
          We take on four engagements a year. If something here resonates,
          tell us what you're working on — short emails are welcome.
        </p>

        <div className="cta__buttons">
          <a
            ref={primaryRef}
            href="mailto:hello@northbound.studio"
            className="btn btn--primary"
          >
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__shine" aria-hidden="true" />
            <span className="btn__label">
              hello@northbound.studio
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </a>

          <a href="#work" className="btn btn--ghost">
            <span>View case studies</span>
            <span className="btn__arrows" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="btn__arrow btn__arrow--in">
                <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="btn__arrow btn__arrow--out">
                <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
