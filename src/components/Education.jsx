import { motion } from 'framer-motion';
import { GraduationCap, Server, Code, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useOptimizedAnimations } from '../hooks/useOptimizedAnimations';

const Education = () => {
  const { t } = useLanguage();
  const { getAnimationConfig } = useOptimizedAnimations();
  
  const educationData = [
    {
      icon: Server, // Icon for SMR
      title: t('smrTitle'),
      subtitle: t('smrDescription'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Code, // Icon for DAM
      title: t('damTitle'),
      subtitle: t('damDescription'),
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Code, // Icon for DAW
      title: t('dawTitle'),
      subtitle: t('dawDescription'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield, // Icon for Ciberseguridad
      title: t('masterTitle'),
      subtitle: t('masterDescription'),
      color: 'from-cyan-500 to-cyan-600'
    }
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          {...getAnimationConfig({
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5 }
          })}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('educationTitle')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('educationDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              {...getAnimationConfig({
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: index * 0.1 }
              })}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center mb-4 shadow-md`}>
                <edu.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{edu.title}</h3>
              <p className="text-slate-600 text-sm">{edu.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;