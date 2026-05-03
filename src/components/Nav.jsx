import { useEffect, useState } from 'react';
import { useMagnetic } from '../lib/useMagnetic';

function NavLink({ href, children }) {
  const ref = useMagnetic(0.2);
  return (
    <a ref={ref} href={href} className="nav__link">
      <span>{children}</span>
    </a>
  );
}

function Clock() {
  const [time, setTime] = useState(() => fmt(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(fmt(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="nav__clock">
      <span className="nav__clock-dot" />
      {time} <span className="nav__clock-loc">/ BKN</span>
    </span>
  );
}

function fmt(d) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand serif">
          <span className="nav__brand-mark">N</span>
          <span>Northbound</span>
        </a>
        <div className="nav__links">
          <NavLink href="#work">Work</NavLink>
          <NavLink href="#capabilities">Capabilities</NavLink>
          <NavLink href="#approach">Approach</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        <Clock />
      </div>
    </nav>
  );
}
