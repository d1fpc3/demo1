import SplitText from './SplitText';
import Marquee from './Marquee';

export default function Hero({ velocity }) {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow" />
      </div>

      <div className="container hero__inner">
        <div className="hero__top">
          <span className="eyebrow">Studio · Est. 2019</span>
          <span className="hero__avail">
            <span className="hero__avail-dot" />
            Booking Q3 2026
          </span>
        </div>

        <SplitText as="h1" className="hero__title serif" stagger={0.06} duration={900}>
          A studio for things <em>worth</em> making.
        </SplitText>

        <div className="hero__meta">
          <SplitText as="p" className="hero__lede" stagger={0.015} duration={600} delay={200}>
            Northbound is a brand, motion, and web studio working between Brooklyn and Lisbon. We design products with weight — type that earns its size, motion that earns its frame.
          </SplitText>
          <div className="hero__index">
            <span className="hero__index-num">01 ⁄ 09</span>
            <span className="hero__index-label">Index</span>
          </div>
        </div>
      </div>

      <div className="hero__marquee">
        <Marquee baseSpeed={40} velocity={velocity}>
          <span className="serif">Brand identity</span>
          <span className="hero__marquee-dot">●</span>
          <span className="serif">Motion design</span>
          <span className="hero__marquee-dot">●</span>
          <span className="serif">Editorial systems</span>
          <span className="hero__marquee-dot">●</span>
          <span className="serif">Web experiences</span>
          <span className="hero__marquee-dot">●</span>
          <span className="serif">Type direction</span>
          <span className="hero__marquee-dot">●</span>
        </Marquee>
      </div>
    </section>
  );
}
