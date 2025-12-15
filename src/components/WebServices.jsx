import { motion } from 'framer-motion';
import { ExternalLink, Globe, Smartphone, Zap, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useMemo, useCallback } from 'react';

// Constants
const ANIMATION_DURATION = 0.8;
const SNACKGO_URL = 'https://ayusox.github.io/snackgo/';

const WebServices = () => {
  const { t } = useLanguage();

  // Memoize benefits array to prevent unnecessary re-renders
  const benefits = useMemo(() => [
    {
      icon: Globe,
      title: t('webPresence'),
      description: t('webPresenceDesc')
    },
    {
      icon: Smartphone,
      title: t('responsive'),
      description: t('responsiveDesc')
    },
    {
      icon: Zap,
      title: t('performance'),
      description: t('performanceDesc')
    },
    {
      icon: Shield,
      title: t('security'),
      description: t('securityDesc')
    }
  ], [t]);

  // Memoize scroll handler to prevent unnecessary re-renders
  const handleScrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="web-services" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t('needWebsite')}
              </motion.h2>
              
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: ANIMATION_DURATION }}
              />
            </div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-lg text-slate-300 leading-relaxed">
                {t('webServiceDescription')}
              </p>
              
              <p className="text-slate-400">
                {t('webServiceSubtext')}
              </p>
            </motion.div>

            {/* Benefits grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <benefit.icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-xs text-slate-400">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
            >
              <Button 
                onClick={handleScrollToContact}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-lg shadow-blue-600/25 focus:outline-none focus:ring-0"
              >
                <Heart className="w-4 h-4 mr-2" />
                {t('startProject')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Website Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: ANIMATION_DURATION, delay: 0.2 }}
            className="relative"
          >
            {/* Browser mockup */}
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-2xl border border-slate-700">
              {/* Browser header */}
              <div className="bg-slate-700 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-600 rounded px-3 py-1 text-xs text-slate-300 font-mono">
                    {SNACKGO_URL.replace('https://', '')}
                  </div>
                </div>
              </div>
              
              {/* Website preview */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Real website iframe */}
                <iframe
                  src={SNACKGO_URL}
                  className="w-full h-full border-0"
                  title="SnackGo Website Preview"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                
                {/* Overlay with link */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <a 
                    href={SNACKGO_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/95 text-slate-900 px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-white transition-colors shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('viewProject')}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebServices;