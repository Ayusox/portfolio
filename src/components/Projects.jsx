import { motion } from 'framer-motion';
import { Code2, Coffee, Lightbulb, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { useMemo } from 'react';

// Constants
const ANIMATION_DURATION = 0.6;
const STAGGER_DELAY = 0.2;
const PARTICLE_COUNT = 8;

const Projects = () => {
  const { t } = useLanguage();

  // Memoize floating particles to prevent unnecessary re-renders
  const floatingParticles = useMemo(() => 
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      className: i % 3 === 0 ? 'bg-blue-300' : i % 3 === 1 ? 'bg-purple-300' : 'bg-green-300',
      left: `${10 + (i * 12)}%`,
      top: `${20 + (i * 8)}%`,
      delay: i * 0.5,
      duration: 6 + i,
      x: Math.sin(i) * 20
    })), []
  );

  return (
    <section id="projects" className="py-8 sm:py-12 bg-slate-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Floating Code Symbols */}
        <motion.div
          className="absolute top-20 left-10 text-4xl text-blue-300 opacity-20 font-mono"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {'</>'}
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-20 text-3xl text-purple-300 opacity-25 font-mono"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          {'{}'}
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-1/4 text-2xl text-green-300 opacity-20 font-mono"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          {'()'}
        </motion.div>

        {/* Más símbolos de código flotantes */}
        <motion.div
          className="absolute top-60 right-1/4 text-3xl text-cyan-300 opacity-25 font-mono"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
            rotate: [0, 8, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          {'[]'}
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-1/3 text-2xl text-orange-300 opacity-20 font-mono"
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          {'<>'}
        </motion.div>

        <motion.div
          className="absolute top-80 left-1/3 text-4xl text-indigo-300 opacity-15 font-mono"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 12, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          {'/>'}
        </motion.div>

        <motion.div
          className="absolute bottom-80 left-10 text-2xl text-teal-300 opacity-25 font-mono"
          animate={{ 
            y: [0, 22, 0],
            rotate: [0, 12, 0]
          }}
          transition={{ 
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        >
          {'<!--'}
        </motion.div>

        <motion.div
          className="absolute top-96 right-10 text-3xl text-pink-300 opacity-20 font-mono"
          animate={{ 
            y: [0, -25, 0],
            x: [0, -8, 0]
          }}
          transition={{ 
            duration: 7.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5
          }}
        >
          {'*/'}
        </motion.div>



        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-32 right-1/3 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-60 right-10 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rotate-45 opacity-25"
          animate={{ 
            y: [0, 20, 0],
            rotate: [45, 90, 45]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        <motion.div
          className="absolute top-60 left-20 w-4 h-12 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full opacity-20"
          animate={{ 
            x: [0, 15, 0],
            scaleY: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Animated Lines */}
        <motion.div
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30"
          animate={{ 
            scaleX: [0, 1, 0],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-purple-300 to-transparent opacity-25"
          animate={{ 
            scaleX: [0, 1, 0],
            opacity: [0, 0.25, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />

        {/* Floating Particles */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-2 h-2 rounded-full ${particle.className} opacity-40`}
            style={{
              left: particle.left,
              top: particle.top
            }}
            animate={{ 
              y: [0, -40, 0],
              x: [0, particle.x, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}

        {/* Background Gradient Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        {/* Header centrado */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION - 0.1 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="border-blue-500 text-blue-600 px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium bg-blue-50">
                <Code2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline-block" />
                {t('methodologyBadge')}
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">{t('methodologyTitle')}</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              {t('methodologyDescription')}
            </p>
          </motion.div>
        </div>

        {/* Methodology Steps - Clean and Organized */}
        <div className="space-y-8 sm:space-y-12 relative">
          
          {/* Connecting line */}
          <div className="absolute left-8 sm:left-10 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 hidden lg:block"></div>
          
          {/* Step 1 */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto relative text-center sm:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION, delay: STAGGER_DELAY }}
          >
            {/* Step number */}
            <div className="absolute -left-16 top-6 hidden lg:block">
              <div className="w-8 h-8 bg-white border-2 border-blue-300 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 shadow-sm">
                01
              </div>
            </div>
            
            <div className="flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-xl relative">
              <Lightbulb className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
              {/* Floating dots */}
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-3 h-2 sm:h-3 bg-blue-300 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 relative">
                {t('ideationTitle')}
                <div className="absolute -top-1 -right-4 sm:-right-8 w-1 h-1 bg-blue-400 rounded-full opacity-60 hidden sm:block"></div>
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">{t('ideationText')}</p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto relative text-center sm:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION, delay: STAGGER_DELAY * 2 }}
          >
            {/* Step number */}
            <div className="absolute -left-16 top-6 hidden lg:block">
              <div className="w-8 h-8 bg-white border-2 border-purple-300 rounded-full flex items-center justify-center text-sm font-bold text-purple-600 shadow-sm">
                02
              </div>
            </div>
            
            <div className="flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-xl relative">
              <Code2 className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
              {/* Floating dots */}
              <div className="absolute -top-1 -right-2 sm:-right-3 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 relative">
                {t('developmentTitle')}
                <div className="absolute -top-2 -right-4 sm:-right-6 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-purple-400 rounded-full opacity-60 hidden sm:block"></div>
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">{t('developmentText')}</p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto relative text-center sm:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION, delay: STAGGER_DELAY * 3 }}
          >
            {/* Step number */}
            <div className="absolute -left-16 top-6 hidden lg:block">
              <div className="w-8 h-8 bg-white border-2 border-green-300 rounded-full flex items-center justify-center text-sm font-bold text-green-600 shadow-sm">
                03
              </div>
            </div>
            
            <div className="flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl relative">
              <Zap className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
              {/* Floating dots */}
              <div className="absolute -top-1 sm:-top-2 -right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute -bottom-1 -left-2 sm:-left-3 w-2 sm:w-3 h-2 sm:h-3 bg-emerald-300 rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3 relative">
                {t('optimizationTitle')}
                <div className="absolute -top-1 -right-3 sm:-right-4 w-1 h-1 bg-green-400 rounded-full opacity-60 hidden sm:block"></div>
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">{t('optimizationText')}</p>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_DURATION, delay: STAGGER_DELAY * 4 }}
          className="text-center mt-8 sm:mt-12 mb-4 sm:mb-6 relative px-4"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute bottom-0 right-1/4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-40 blur-lg"></div>
          
          {/* Floating particles */}
          <div className="absolute top-6 sm:top-8 left-1/3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-3 sm:top-4 right-1/3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-purple-300 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-6 sm:bottom-8 left-2/3 w-1 h-1 bg-green-300 rounded-full animate-pulse opacity-70" style={{animationDelay: '2s'}}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4 sm:mb-6 relative">
              <div className="absolute -left-8 sm:-left-12 top-1/2 transform -translate-y-1/2 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-transparent to-slate-300 hidden sm:block"></div>
              <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600 mr-2 sm:mr-3 relative">
                <div className="absolute -top-1 -right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-300 rounded-full animate-pulse opacity-60"></div>
              </Coffee>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{t('philosophyTitle')}</h3>
              <div className="absolute -right-8 sm:-right-12 top-1/2 transform -translate-y-1/2 w-6 sm:w-8 h-0.5 bg-gradient-to-l from-transparent to-slate-300 hidden sm:block"></div>
            </div>
            <div className="relative">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                {t('philosophyText')}
              </p>
              {/* Quote marks decoration - Animated */}
              <motion.div 
                className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 text-4xl sm:text-6xl text-slate-200 font-serif leading-none"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                "
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 sm:-bottom-8 -right-2 sm:-right-4 text-4xl sm:text-6xl text-slate-200 font-serif leading-none rotate-180"
                animate={{ 
                  y: [0, 8, 0],
                  rotate: [180, 183, 180],
                  scale: [1, 1.03, 1]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                "
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Projects;