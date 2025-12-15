import { useState, useEffect, useCallback } from 'react';

export const useOptimizedAnimations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar si es móvil (especialmente iOS)
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      setIsMobile(isMobileDevice || isSmallScreen || isIOS);
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

  // IntersectionObserver para animaciones que solo se ejecutan una vez
  const createSingleUseObserver = useCallback((callback) => {
    if (isMobile || prefersReducedMotion) return null;
    
    return new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          callback(entry.target);
          // Desconectar para que no se vuelva a animar
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );
  }, [isMobile, prefersReducedMotion]);

  // Configuraciones de animación optimizadas
  const getAnimationConfig = (baseConfig = {}) => {
    // Solo deshabilitar whileInView en móviles, mantener todo lo demás
    if ((prefersReducedMotion || isMobile) && baseConfig.whileInView) {
      const finalState = baseConfig.whileInView || {};
      return {
        initial: finalState,
        animate: finalState,
        className: "scroll-animation-disabled", // Agregar clase para CSS
        transition: { duration: 0 }
      };
    }

    // Permitir TODAS las demás animaciones en móviles (animate, etc.)
    if (isMobile || prefersReducedMotion) {
      return baseConfig; // Devolver configuración original
    }

    // Desktop - animaciones normales
    return {
      initial: baseConfig.initial || {},
      whileInView: baseConfig.whileInView || baseConfig.animate || {},
      animate: baseConfig.animate,
      viewport: baseConfig.whileInView ? { 
        once: true,
        margin: "-100px",
        amount: 0.2
      } : undefined,
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
    getAnimationConfig,
    createSingleUseObserver
  };
};