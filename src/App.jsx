import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Projects from './components/Projects';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-background text-dark overflow-x-hidden selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Projects />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}

export default App;
