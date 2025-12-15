import { motion } from 'framer-motion';
import { MapPin, Calendar, Code } from 'lucide-react';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { useLanguage } from '../contexts/LanguageContext';
import { useMemo, useState, useEffect } from 'react';

// Constants
const ANIMATION_DURATION = 0.8;
const USERNAME = 'Ayusox';

const About = () => {
  const { t } = useLanguage();
  const { publicRepos, totalCommits, topLanguages, loading, error, isFallback } = useGitHubStats(USERNAME);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize GitHub profile URL to prevent unnecessary re-renders
  const githubProfileUrl = useMemo(() => `https://github.com/${USERNAME}`, []);

  // Memoize formatted languages display
  const formattedLanguages = useMemo(() => {
    return topLanguages.length > 0 ? JSON.stringify(topLanguages) : '["Loading..."]';
  }, [topLanguages]);

  return (
    <section id="about" className="pt-12 sm:pt-16 pb-16 sm:pb-20 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Content */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION }}
            className="w-full order-1 lg:order-1"
          >
            <header className="text-center lg:text-left mb-6 sm:mb-8">
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t('aboutTitle')}
              </motion.h2>
              
              <motion.div 
                className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto lg:mx-0"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                aria-hidden="true"
              />
            </header>

            <motion.div 
              className="space-y-4 sm:space-y-6 text-slate-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-base sm:text-lg font-medium text-center lg:text-left">
                {t('aboutDescription')}
              </p>
              
              <aside className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-l-4 border-blue-500 mx-auto max-w-2xl lg:max-w-none">
                <p className="text-slate-700 text-sm sm:text-base">
                  {t('aboutEducation')}
                </p>
              </aside>
              
              <p className="text-slate-600 italic text-center lg:text-left text-sm sm:text-base">
                {t('aboutPassion')}
              </p>
            </motion.div>
          </motion.article>

          {/* Developer Metrics */}
          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION, delay: 0.2 }}
            className="w-full order-2 lg:order-2 space-y-4 sm:space-y-6 mt-6 lg:mt-4"
            aria-label="Estadísticas y métricas de desarrollo"
          >
            {/* GitHub Stats Card */}
            {isMobile ? (
              <section
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 group hover:border-blue-500/50 transition-all duration-500 shadow-xl"
                aria-labelledby="github-stats-title"
              >
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div 
                      className={`w-3 h-3 rounded-full animate-pulse ${isFallback ? 'bg-yellow-400' : 'bg-green-400'}`}
                      aria-label={isFallback ? 'Datos en caché' : 'Conectado a GitHub'}
                    ></div>
                    <span className="text-slate-300 font-mono text-xs sm:text-sm break-all" id="github-stats-title">
                      github.com/{USERNAME}
                      {isFallback && <span className="text-yellow-400 ml-2">(cached)</span>}
                    </span>
                  </div>
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 self-start sm:self-auto" aria-hidden="true" />
                </header>
                
                <div className="space-y-2 sm:space-y-3">
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                    </div>
                  ) : error ? (
                    <div className="text-red-400 text-xs sm:text-sm font-mono text-center py-2">
                      {error}
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs sm:text-sm font-mono">{t('publicRepos')}</span>
                        <span className="text-white font-bold text-sm sm:text-base">{publicRepos}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs sm:text-sm font-mono">{t('estimatedCommits')}</span>
                        <span className="text-green-400 font-mono text-sm sm:text-base">{totalCommits}+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs sm:text-sm font-mono">{t('topLanguages')}</span>
                        <span className="text-blue-400 font-mono text-xs sm:text-sm break-all">
                          {formattedLanguages}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs sm:text-sm font-mono">{t('status')}</span>
                        <span className="text-purple-400 font-mono text-xs sm:text-sm">{t('activeStatus')}</span>
                      </div>
                    </>
                  )}
                </div>
                
                {/* GitHub Link */}
                <footer className="mt-4 pt-4 border-t border-slate-600">
                  <a 
                    href={githubProfileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm font-mono"
                    aria-label="Ver perfil completo en GitHub"
                  >
                    <span>{t('viewProfile')}</span>
                  </a>
                </footer>
              </section>
            ) : (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 group hover:border-blue-500/50 transition-all duration-500 shadow-xl"
                aria-labelledby="github-stats-title"
              >
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div 
                      className={`w-3 h-3 rounded-full animate-pulse ${isFallback ? 'bg-yellow-400' : 'bg-green-400'}`}
                      aria-label={isFallback ? 'Datos en caché' : 'Conectado a GitHub'}
                    ></div>
                    <span className="text-slate-300 font-mono text-xs sm:text-sm break-all" id="github-stats-title">
                      github.com/{USERNAME}
                      {isFallback && <span className="text-yellow-400 ml-2">(cached)</span>}
                    </span>
                  </div>
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 self-start sm:self-auto" aria-hidden="true" />
                </header>
                
                <div className="space-y-2 sm:space-y-3">
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                    </div>
                  ) : error ? (
                    <div className="text-red-400 text-xs sm:text-sm font-mono text-center py-2">
                      {error}
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs sm:text-sm font-mono">{t('publicRepos')}</span>
                        <span className="text-white font-bold text-sm sm:text-base">{publicRepos}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs sm:text-sm font-mono">{t('estimatedCommits')}</span>
                        <span className="text-green-400 font-mono text-sm sm:text-base">{totalCommits}+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs sm:text-sm font-mono">{t('topLanguages')}</span>
                        <span className="text-blue-400 font-mono text-xs sm:text-sm break-all">
                          {formattedLanguages}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-xs sm:text-sm font-mono">{t('status')}</span>
                        <span className="text-purple-400 font-mono text-xs sm:text-sm">{t('activeStatus')}</span>
                      </div>
                    </>
                  )}
                </div>
                
                {/* GitHub Link */}
                <footer className="mt-4 pt-4 border-t border-slate-600">
                  <a 
                    href={githubProfileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm font-mono"
                    aria-label="Ver perfil completo en GitHub"
                  >
                    <span>{t('viewProfile')}</span>
                  </a>
                </footer>
              </motion.section>
            )}

            {/* Location & Availability Card */}
            {isMobile ? (
              <section
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 group hover:border-green-500/50 transition-all duration-500 shadow-xl"
                aria-labelledby="availability-title"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400" aria-hidden="true" />
                      <span className="text-slate-300 text-xs sm:text-sm" id="availability-title">{t('location')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      <span className="text-slate-300 text-xs sm:text-sm">{t('availableForWork')}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-white" aria-label="4 años de experiencia aprendiendo">4+</div>
                    <div className="text-xs text-slate-400">{t('yearsLearning')}</div>
                  </div>
                </div>
              </section>
            ) : (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 group hover:border-green-500/50 transition-all duration-500 shadow-xl"
                aria-labelledby="availability-title"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400" aria-hidden="true" />
                      <span className="text-slate-300 text-xs sm:text-sm" id="availability-title">{t('location')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      <span className="text-slate-300 text-xs sm:text-sm">{t('availableForWork')}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-white" aria-label="4 años de experiencia aprendiendo">4+</div>
                    <div className="text-xs text-slate-400">{t('yearsLearning')}</div>
                  </div>
                </div>
              </motion.section>
            )}
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default About;