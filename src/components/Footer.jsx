import SplitText from './SplitText';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="rule" />
        <div className="footer__grid">
          <div className="footer__col">
            <span className="footer__label">Studio</span>
            <SplitText as="p" className="footer__copy" stagger={0.02} duration={700}>
              Northbound is a brand, motion, and web studio working between Brooklyn and Lisbon since 2019. Independent. Senior team. Selective.
            </SplitText>
          </div>
          <div className="footer__col">
            <span className="footer__label">Visit</span>
            <p className="footer__copy">
              68 Jay Street, Suite 412<br />
              Brooklyn, NY 11201<br />
              <span style={{ color: 'var(--graphite)' }}>By appointment only</span>
            </p>
          </div>
          <div className="footer__col">
            <span className="footer__label">Elsewhere</span>
            <ul className="footer__links">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Are.na</a></li>
              <li><a href="#">Read.cv</a></li>
              <li><a href="#">Newsletter</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <span className="footer__label">Index</span>
            <ul className="footer__links">
              <li><a href="#work">Selected work</a></li>
              <li><a href="#capabilities">Capabilities</a></li>
              <li><a href="#approach">Approach</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <span className="serif footer__mark">Northbound</span>
          <span className="footer__legal">© 2026 Northbound Studio LLC · Brooklyn ⁄ Lisbon</span>
        </div>
      </div>
    </footer>
  );
}
