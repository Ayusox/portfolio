import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed bottom-6 right-6 z-50 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-full p-3 text-white hover:bg-slate-700/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-medium">
          {language === 'es' ? 'ES' : 'EN'}
        </span>
        <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-600">
          {language === 'es' ? (
            // Spanish flag
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 bg-red-500"></div>
              <div className="flex-1 bg-yellow-400"></div>
              <div className="flex-1 bg-red-500"></div>
            </div>
          ) : (
            // UK flag - Union Jack
            <div className="w-full h-full bg-blue-800 relative overflow-hidden">
              {/* White diagonal crosses */}
              <div className="absolute inset-0">
                {/* Top-left to bottom-right diagonal */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-white origin-left transform rotate-[26.57deg] translate-y-1"></div>
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-white origin-right transform rotate-[26.57deg] -translate-y-1"></div>
                </div>
                {/* Top-right to bottom-left diagonal */}
                <div className="absolute top-0 right-0 w-full h-full">
                  <div className="absolute top-0 right-0 w-full h-0.5 bg-white origin-right transform -rotate-[26.57deg] translate-y-1"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left transform -rotate-[26.57deg] -translate-y-1"></div>
                </div>
              </div>
              
              {/* Red diagonal crosses (thinner) */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-px bg-red-600 origin-left transform rotate-[26.57deg] translate-y-1"></div>
                  <div className="absolute bottom-0 right-0 w-full h-px bg-red-600 origin-right transform rotate-[26.57deg] -translate-y-1"></div>
                </div>
                <div className="absolute top-0 right-0 w-full h-full">
                  <div className="absolute top-0 right-0 w-full h-px bg-red-600 origin-right transform -rotate-[26.57deg] translate-y-1"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-red-600 origin-left transform -rotate-[26.57deg] -translate-y-1"></div>
                </div>
              </div>
              
              {/* White cross (St. George's Cross background) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-white"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-white"></div>
              </div>
              
              {/* Red cross (St. George's Cross) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-red-600"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-0.5 bg-red-600"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      </div>
    </motion.button>
  );
};

export default LanguageToggle;