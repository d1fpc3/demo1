import { useLenis } from './lib/useLenis';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import Capabilities from './components/Capabilities';
import Approach from './components/Approach';
import LogoWall from './components/LogoWall';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  const { velocity } = useLenis();

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero velocity={velocity} />
        <SelectedWork />
        <Capabilities />
        <Approach />
        <LogoWall velocity={velocity} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
