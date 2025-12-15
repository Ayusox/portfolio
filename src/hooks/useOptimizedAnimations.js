import { useState, useEffect } from 'react';

export const useOptimizedAnimations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // Detectar preferencia de movimiento reducido
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkMobile();
    checkReducedMotion();

    // Listeners para cambios
    window.addEventListener('resize', checkMobile);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Configuraciones de animación optimizadas
  const getAnimationConfig = (baseConfig = {}) => {
    if (prefersReducedMotion) {
      return {
        initial: baseConfig.initial || {},
        animate: baseConfig.animate || baseConfig.whileInView || {},
        transition: { duration: 0 }
      };
    }

    if (isMobile) {
      return {
        initial: baseConfig.initial || {},
        whileInView: baseConfig.whileInView || baseConfig.animate || {},
        viewport: { 
          once: true, 
          margin: "-50px",
          amount: 0.3
        },
        transition: {
          duration: (baseConfig.transition?.duration || 0.6) * 0.7,
          ease: "easeOut",
          ...baseConfig.transition
        }
      };
    }

    // Desktop - animaciones normales
    return {
      initial: baseConfig.initial || {},
      whileInView: baseConfig.whileInView || baseConfig.animate || {},
      viewport: { 
        once: true,
        margin: "-100px",
        amount: 0.2
      },
      transition: {
        duration: baseConfig.transition?.duration || 0.8,
        ease: "easeOut",
        ...baseConfig.transition
      }
    };
  };

  return {
    isMobile,
    prefersReducedMotion,
    getAnimationConfig
  };
};