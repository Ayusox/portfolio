import { motion } from 'framer-motion';
import { Code2, Shield, Database } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useOptimizedAnimations } from '../hooks/useOptimizedAnimations';
import { useMemo } from 'react';

// Constants
const ANIMATION_DURATION = 0.6;
const STAGGER_DELAY = 0.1;
const PROGRESS_ANIMATION_DURATION = 1;

const Skills = () => {
  const { t } = useLanguage();
  const { getAnimationConfig } = useOptimizedAnimations();
  
  // Memoize skill categories to prevent unnecessary re-renders
  const skillCategories = useMemo(() => [
    {
      title: t('programmingLanguages'),
      icon: Code2,
      skills: [
        { name: 'JavaScript', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'HTML/CSS', level: 95 }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: t('databasesTools'),
      icon: Database,
      skills: [
        { name: 'SQL', level: 80 },
        { name: 'Docker', level: 70 },
        { name: 'Git', level: 85 },
        { name: 'VS Code', level: 95 }
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Ciberseguridad',
      icon: Shield,
      skills: [
        { name: 'Seguridad Web', level: 75 },
        { name: 'Análisis de Vulnerabilidades', level: 70 },
        { name: 'Redes', level: 80 },
        { name: 'Auditorías Básicas', level: 65 }
      ],
      color: 'from-red-500 to-orange-500'
    }
  ], [t]);

  // Memoize additional skills array
  const additionalSkills = useMemo(() => [
    'Responsive Design',
    'UI/UX Design',
    'Testing',
    'Metodologías Ágiles',
    'Control de versiones',
    'Optimización web',
    'Accesibilidad',
    'SEO básico'
  ], []);

  return (
    <section id="skills" className="py-12 sm:py-16 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.header
          {...getAnimationConfig({
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: ANIMATION_DURATION }
          })}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('skillsTitle')}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 sm:mb-6" aria-hidden="true"></div>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            {t('skillsDescription')}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.article
              key={category.title}
              {...getAnimationConfig({
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: ANIMATION_DURATION, delay: categoryIndex * STAGGER_DELAY }
              })}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group w-full"
              aria-labelledby={`category-${categoryIndex}-title`}
            >
              {/* Category Header */}
              <header className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`} aria-hidden="true">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 id={`category-${categoryIndex}-title`} className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{category.title}</h3>
              </header>

              {/* Skills with Progress Bars */}
              <div className="space-y-3 sm:space-y-4" role="list" aria-label={`Habilidades de ${category.title}`}>
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * STAGGER_DELAY + skillIndex * STAGGER_DELAY 
                    }}
                    className="space-y-1.5 sm:space-y-2"
                    role="listitem"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-slate-500 text-xs sm:text-sm font-medium" aria-label={`Nivel de competencia: ${skill.level} por ciento`}>{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2 overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100" aria-label={`Progreso en ${skill.name}`}>
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: PROGRESS_ANIMATION_DURATION, 
                          delay: categoryIndex * STAGGER_DELAY + skillIndex * STAGGER_DELAY + 0.2,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_DURATION, delay: 0.4 }}
          className="mt-8 sm:mt-12 text-center"
          aria-labelledby="additional-skills-title"
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg max-w-4xl mx-auto">
            <h3 id="additional-skills-title" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
              {t('otherCompetencies')}
            </h3>
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3" role="list" aria-label="Competencias adicionales">
              {additionalSkills.map((skill, index) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full text-xs sm:text-sm font-medium hover:from-blue-100 hover:to-purple-100 hover:text-slate-800 transition-all duration-300 cursor-default"
                  role="listitem"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default Skills;