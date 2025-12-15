import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

// Constants
const SCROLL_THRESHOLD = 20;
const HEADER_OFFSET = 80;
const SCROLL_DELAY = 150;

const Header = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize menu items to prevent unnecessary re-renders
  const menuItems = useMemo(() => [
    { title: t('home'), href: '#inicio' },
    { title: t('about'), href: '#about' },
    { title: t('skills'), href: '#skills' },
    { title: t('methodologyTitle'), href: '#projects' },
    { title: t('needWebsite'), href: '#web-services' },
    { title: t('contact'), href: '#contact' },
  ], [t]);

  // Optimized scroll handler
  const handleScrollTo = useCallback((e, href) => {
    e.preventDefault();
    setIsOpen(false);

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, SCROLL_DELAY);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50" 
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-14 sm:h-16" role="navigation" aria-label="Navegación principal">
          {/* Logo */}
          <motion.a 
            href="#inicio" 
            onClick={(e) => handleScrollTo(e, '#inicio')}
            className="text-white hover:text-blue-400 transition-colors cursor-pointer min-h-[44px] flex items-center touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Mario Jurado Ayuso - Ir al inicio"
          >
            <span className="font-mono text-lg sm:text-xl font-semibold">
              Ayuso<span className="text-blue-400">.dev</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2" role="menubar">
            {menuItems.map((item, index) => (
              <li key={item.title} role="none">
                <motion.a
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="px-2 xl:px-3 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors relative group min-h-[44px] flex items-center touch-manipulation"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  role="menuitem"
                  aria-label={`Ir a la sección ${item.title}`}
                >
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" aria-hidden="true"></span>
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white hover:text-blue-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            onClick={toggleMobileMenu}
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </motion.div>
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-950/98 backdrop-blur-md border-t border-slate-800/50"
            id="mobile-menu"
            aria-label="Menú de navegación móvil"
          >
            <ul className="container mx-auto px-4 sm:px-6 py-4">
              {menuItems.map((item, index) => (
                <li key={item.title}>
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="block py-4 text-slate-300 hover:text-white font-medium transition-colors border-b border-slate-800/30 last:border-b-0 min-h-[44px] flex items-center touch-manipulation"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={`Ir a la sección ${item.title}`}
                  >
                    {item.title}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;