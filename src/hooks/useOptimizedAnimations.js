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
    if (prefersReducedMotion || isMobile) {
      // En móviles y con preferencias de movimiento reducido, no usar animaciones de scroll
      const finalState = baseConfig.whileInView || baseConfig.animate || {};
      return {
        initial: finalState,
        animate: finalState,
        transition: { duration: 0 }
      };
    }

    // Solo desktop - animaciones normales
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