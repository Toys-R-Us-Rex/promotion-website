import Hero from './components/Hero';
import Process from './components/Process';
import TryItSection from './components/TryItSection';
import ModelShowcase from './components/ModelShowcase';
import VideosSection from './components/VideosSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <Process />
      <ModelShowcase />
      <VideosSection />
      <TryItSection />
      <Footer />
    </div>
  );
}

export default App;
