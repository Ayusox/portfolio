import { LanguageProvider } from './contexts/LanguageContext';
import ScrollProgress from './components/ScrollProgress';
import LanguageToggle from './components/LanguageToggle';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import WebServices from './components/WebServices';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950">
          {/* Skip Links para accesibilidad */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:z-[60]"
          >
            Saltar al contenido principal
          </a>
          <a 
            href="#navigation" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:z-[60]"
          >
            Saltar a la navegación
          </a>
          
          <ScrollProgress />
          <Header />
          <main role="main" id="main-content" className="pt-16">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <WebServices />
            <Contact />
          </main>
          <Footer />
          <LanguageToggle />
        </div>
    </LanguageProvider>
  );
}

export default App;