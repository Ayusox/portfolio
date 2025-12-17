import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Terminal, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { generateCV } from '@/utils/cvGenerator';
import { useLanguage } from '../contexts/LanguageContext';

// Animation constants
const TYPING_SPEED = 50;
const LINE_DELAY = 300;

const Hero = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [typedText, setTypedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  
  // Memoize code lines to prevent unnecessary re-renders
  const codeLines = useMemo(() => {
    const developerData = {
      name: "Mario Jurado Ayuso",
      location: "Hinojosa del Duque, Córdoba",
      skills: ["React", "JavaScript", "CSS", "HTML"],
    };
    
    return language === 'es' ? [
      'const developer = {',
      `  name: "${developerData.name}",`,
      '  role: "Desarrollador",',
      `  location: "${developerData.location}",`,
      `  skills: ${JSON.stringify(developerData.skills)},`,
      '  passion: "Crear experiencias digitales",',
      '  available: true',
      '};'
    ] : [
      'const developer = {',
      `  name: "${developerData.name}",`,
      '  role: "Developer",',
      `  location: "${developerData.location}",`,
      `  skills: ${JSON.stringify(developerData.skills)},`,
      '  passion: "Creating digital experiences",',
      '  available: true',
      '};'
    ];
  }, [language]);

  // Typing animation effect
  useEffect(() => {
    if (currentLine >= codeLines.length) return;

    const line = codeLines[currentLine];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setTypedText(prev => {
          const lines = prev.split('\n');
          lines[currentLine] = line.substring(0, charIndex);
          return lines.join('\n');
        });
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setCurrentLine(prev => prev + 1), LINE_DELAY);
      }
    }, TYPING_SPEED);

    return () => clearInterval(typeInterval);
  }, [currentLine, codeLines]);

  // Memoized event handlers
  const handleDownloadCV = useCallback(async () => {
    try {
      await generateCV();
      toast({
        title: "¡CV Descargado!",
        description: "El currículum en PDF se ha generado y descargado correctamente."
      });
    } catch (error) {
      console.error('Error generating CV:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al generar el PDF. Por favor intenta de nuevo."
      });
    }
  }, [toast]);

  const handleGoToGitHub = useCallback(() => {
    window.open('https://github.com/Ayusox', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section id="inicio" className="min-h-screen bg-slate-950 text-white relative overflow-hidden" role="banner">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" aria-hidden="true"></div>
      
      {/* Gradient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-16 relative z-10 flex items-center h-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
          
          {/* Mobile/Tablet: Content First, Desktop: Terminal */}
          <motion.aside 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 w-full flex-shrink-0"
            aria-label="Terminal de código interactivo"
          >
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg overflow-hidden shadow-2xl max-w-full">
              {/* Terminal header */}
              <div className="bg-slate-800/80 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-1.5 sm:gap-2" aria-hidden="true">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 ml-2 sm:ml-4">
                  <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" aria-hidden="true" />
                  <span className="text-xs sm:text-sm text-slate-400 font-mono">developer.js</span>
                </div>
              </div>
              
              {/* Terminal content */}
              <div className="p-4 sm:p-5 lg:p-6 font-mono text-xs sm:text-sm">
                <div className="text-slate-400 mb-4 sm:mb-5 whitespace-nowrap">
                  <span className="text-green-400">mario@portfolio</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-slate-400">$ cat developer.js</span>
                </div>
                
                <pre className="text-slate-300 leading-relaxed" aria-label="Código JavaScript mostrando información del desarrollador">
                  <code>
                    {typedText.split('\n').map((line, index) => (
                      <div key={index} className="min-h-[1.2rem] sm:min-h-[1.5rem] break-all sm:break-normal">
                        {line.includes('name:') && <span className="text-orange-400">name: </span>}
                        {line.includes('role:') && <span className="text-orange-400">role: </span>}
                        {line.includes('location:') && <span className="text-orange-400">location: </span>}
                        {line.includes('skills:') && <span className="text-orange-400">skills: </span>}
                        {line.includes('passion:') && <span className="text-orange-400">passion: </span>}
                        {line.includes('available:') && <span className="text-orange-400">available: </span>}
                        {line.includes('"') && (
                          <span className="text-green-300">
                            {line.replace(/"/g, '"').replace(/name: |role: |location: |skills: |passion: |available: /, '')}
                          </span>
                        )}
                        {line.includes('true') && <span className="text-blue-400">true</span>}
                        {line.includes('[') && <span className="text-yellow-300">{line.match(/\[.*\]/)?.[0]}</span>}
                        {(line.includes('{') || line.includes('}')) && (
                          <span className="text-slate-300">{line}</span>
                        )}
                        {index === currentLine && (
                          <span className="animate-pulse text-green-400" aria-hidden="true">|</span>
                        )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </motion.aside>

          {/* Mobile/Tablet: Content First, Desktop: Content */}
          <motion.header 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 w-full text-center lg:text-left flex-shrink-0"
          >
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {t('developer')}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 leading-none pb-3">
                    {t('frontend').includes('&') ? (
                      <>
                        <span className="inline-block">Frontend &</span>{' '}
                        <span className="inline-block">Ciberseguridad</span>
                      </>
                    ) : (
                      t('frontend')
                    )}
                  </span>
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                {t('heroDescription')}
              </motion.p>
            </div>

            <motion.nav 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center lg:justify-start"
              aria-label="Acciones principales"
            >
              <Button 
                onClick={handleGoToGitHub}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-lg shadow-blue-600/25 focus:outline-none focus:ring-0 min-h-[44px] touch-manipulation"
                aria-label="Ver proyectos en GitHub"
              >
                <Code2 className="w-4 h-4 mr-2" aria-hidden="true" />
                {t('viewProjects')}
              </Button>
              
              <Button 
                onClick={handleDownloadCV}
                className="bg-slate-800/50 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 focus:outline-none focus:ring-0 min-h-[44px] touch-manipulation"
                aria-label="Descargar currículum en PDF"
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                {t('downloadCV')}
              </Button>
            </motion.nav>

            {/* Status indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center justify-center lg:justify-start gap-3 text-sm mt-6 sm:mt-8"
              role="status"
              aria-label="Estado de disponibilidad"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></div>
                <span className="text-slate-400">{t('availableForProjects')}</span>
              </div>
            </motion.div>
          </motion.header>
        </div>
      </div>
    </section>
  );
};

export default Hero;

