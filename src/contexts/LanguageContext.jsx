import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  }, []);

  const translations = {
    es: {
      // Header
      home: 'Inicio',
      about: 'Sobre mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
      
      // Hero
      developer: 'Desarrollador',
      frontend: 'Frontend',
      heroDescription: 'Especializado en crear interfaces modernas y experiencias digitales excepcionales. Apasionado por el código limpio y las tecnologías web.',
      viewProjects: 'Ver Proyectos',
      downloadCV: 'Descargar CV',
      availableForProjects: 'Disponible para proyectos',
      
      // About
      aboutTitle: 'Sobre mí',
      aboutDescription: 'Desarrollador junior especializado en frontend y tecnologías web. Me apasiona crear interfaces de usuario modernas, trabajar con inteligencia artificial y construir experiencias digitales excepcionales.',
      aboutEducation: 'Actualmente cursando Desarrollo de Aplicaciones Web (DAW) y con formación en Ciberseguridad. Me especializo en tecnologías modernas como React, JavaScript y CSS.',
      aboutSkills: 'Aunque me considero mejor en el frontend, puedo trabajar sin problemas en temas de backend o fullstack ya que tengo una base de conocimiento general.',
      aboutPassion: 'Aunque me especializo en frontend, tengo conocimientos sólidos en backend que me permiten trabajar en proyectos fullstack cuando es necesario.',
      currentlyStudying: 'Actualmente cursando',
      webDevelopment: 'Desarrollo de Aplicaciones Web (DAW)',
      cybersecurity: 'Ciberseguridad',
      whenNotCoding: 'Cuando no estoy programando, me gusta explorar nuevas tecnologías, contribuir a proyectos open source y mantenerme actualizado con las últimas tendencias del desarrollo web.',
      
      // Skills
      skillsTitle: 'Habilidades',
      skillsDescription: 'Tecnologías y herramientas que domino para crear soluciones digitales completas',
      programmingLanguages: 'Lenguajes de Programación',
      databasesTools: 'Bases de Datos & Herramientas',
      otherCompetencies: 'Otras competencias',
      
      // Contact
      contactTitle: 'Contacto',
      contactDescription: '¿Tienes un proyecto en mente? Estoy disponible para nuevas oportunidades.',
      sendMessage: 'Enviar un Mensaje',
      connectWithMe: 'Conéctate Conmigo',
      name: 'Nombre',
      email: 'Correo Electrónico',
      message: 'Mensaje',
      sendButton: 'Enviar Mensaje',
      sending: 'Enviando...',
      contactPlatformsText: 'No dudes en contactarme a través de cualquiera de estas plataformas. Siempre estoy abierto a discutir nuevas oportunidades y colaboraciones.',
      
      // Methodology
      methodologyBadge: 'Proceso de Desarrollo',
      methodologyTitle: 'Mi Metodología',
      methodologyDescription: 'Cómo transformo ideas en experiencias digitales excepcionales',
      

      
      ideationTitle: 'Escucho y Planifico',
      ideationText: 'Primero hablamos de tu idea. Me gusta entender qué necesitas y qué problemas quieres resolver. Después investigo un poco, veo qué funciona bien y diseño una solución que se adapte perfectamente a ti.',
      
      developmentTitle: 'Creo y Construyo',
      developmentText: 'Aquí es donde empiezo a desarrollar. Escribo código limpio y organizado, probando cada parte para asegurarme de que todo funciona bien. Me gusta que las cosas sean fáciles de usar y que se vean geniales en cualquier dispositivo.',
      
      optimizationTitle: 'Pulimos y Lanzamos',
      optimizationText: 'Antes de entregar, reviso todo una vez más. Me aseguro de que cargue rápido, sea accesible para todos y funcione perfectamente. Una vez listo, lo ponemos en línea y te explico cómo funciona todo.',
      
      philosophyTitle: 'Mi Enfoque',
      philosophyText: 'Me gusta crear cosas que sean fáciles de usar. Si alguien puede usar tu web sin complicarse, entonces he hecho bien mi trabajo. Cada proyecto me enseña algo nuevo y me ayuda a mejorar.',
      

      
      // Education
      educationTitle: 'Educación',
      educationDescription: 'Mi formación académica y certificaciones en desarrollo de software y ciberseguridad.',
      
      // Footer
      contactInfo: 'Información de Contacto',
      developerRole: 'Desarrollador',
      madeWith: 'Hecho con',
      allRightsReserved: 'Todos los derechos reservados.',
      availableToWork: 'Disponible para trabajar online',
      connectWithMeFooter: 'Conecta Conmigo',
      
      // Education Cards
      smrTitle: 'Sistemas Microinformáticos y Redes',
      smrDescription: 'Fundamentos en sistemas informáticos, redes e integración hardware-software.',
      damTitle: 'Desarrollo de Aplicaciones Multiplataforma',
      damDescription: 'Educación integral en desarrollo de aplicaciones multiplataforma e ingeniería de software.',
      dawTitle: 'Desarrollo de Aplicaciones Web',
      dawDescription: 'Formación especializada en tecnologías web modernas, frameworks y prácticas de desarrollo full-stack.',
      masterTitle: 'Máster en Ciberseguridad',
      masterDescription: 'Formación avanzada en ciberseguridad enfocada en análisis de amenazas, pruebas de penetración y arquitectura de seguridad.',
      
      // Projects Cards
      frontendProjectTitle: 'Desarrollo Web Frontend',
      frontendProjectCategory: 'Diseño Web',
      frontendProjectDescription: 'Diseño y maquetación de sitios web responsivos utilizando HTML, CSS y React. Creación de portafolios personales y landing pages optimizadas, enfocándose en la estructura semántica, buenas prácticas y la adaptabilidad a diferentes dispositivos móviles.',
      ecommerceProjectTitle: 'E-commerce Demo',
      ecommerceProjectCategory: 'Aplicación React',
      ecommerceProjectDescription: 'Aplicación de tienda virtual básica que permite visualizar un catálogo de productos, filtrar por categorías y gestionar un carrito de compras. Implementación de estado global para manejar la selección de artículos del usuario y simular el proceso de compra.',
      mobileProjectTitle: 'Aplicación Móvil',
      mobileProjectCategory: 'Desarrollo Móvil',
      mobileProjectDescription: 'Desarrollo de aplicaciones móviles nativas y multiplataforma utilizando tecnologías como React Native. Enfoque en la experiencia de usuario, rendimiento y integración con APIs externas para crear aplicaciones funcionales y atractivas.',
      
      // GitHub Stats
      publicRepos: 'public_repos:',
      estimatedCommits: 'estimated_commits:',
      topLanguages: 'top_languages:',
      status: 'status:',
      activeStatus: '"Active Developer"',
      viewProfile: '→ view profile',
      
      // Location
      location: 'Córdoba, España',
      availableForWork: 'Disponible para proyectos',
      yearsLearning: 'años aprendiendo',
      
      // Web Services
      needWebsite: '¿Necesitas una web?',
      webServiceDescription: 'En el mundo digital actual, tener una presencia online profesional no es opcional, es esencial. Te ayudo a crear sitios web modernos, rápidos y optimizados que conviertan visitantes en clientes.',
      webServiceSubtext: 'A la derecha puedes ver mi último proyecto: una página web completa para SnackGo, un local de comida rápida. Desde landing pages hasta aplicaciones web completas, desarrollo soluciones digitales que impulsan tu negocio hacia el éxito.',
      webPresence: 'Presencia Digital',
      webPresenceDesc: 'Destaca en internet con un diseño único',
      responsive: 'Diseño Responsivo',
      responsiveDesc: 'Perfecto en móviles, tablets y desktop',
      performance: 'Alto Rendimiento',
      performanceDesc: 'Carga rápida y experiencia fluida',
      security: 'Seguridad',
      securityDesc: 'Código limpio y prácticas seguras',
      startProject: 'Me interesa',
      viewProject: 'Ver Proyecto'
    },
    en: {
      // Header
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      
      // Hero
      developer: 'Developer',
      frontend: 'Frontend',
      heroDescription: 'Specialized in creating modern interfaces and exceptional digital experiences. Passionate about clean code and web technologies.',
      viewProjects: 'View Projects',
      downloadCV: 'Download CV',
      availableForProjects: 'Available for projects',
      
      // About
      aboutTitle: 'About me',
      aboutDescription: 'Junior developer specialized in frontend and web technologies. I am passionate about creating modern user interfaces, working with artificial intelligence and building exceptional digital experiences.',
      aboutEducation: 'Currently studying Web Application Development (DAW) and with training in Cybersecurity. I specialize in modern technologies like React, JavaScript and CSS.',
      aboutSkills: 'Although I consider myself better at frontend, I can work without problems on backend or fullstack topics since I have a general knowledge base.',
      aboutPassion: 'While I specialize in frontend, I have solid backend knowledge that allows me to work on fullstack projects when needed.',
      currentlyStudying: 'Currently studying',
      webDevelopment: 'Web Application Development (DAW)',
      cybersecurity: 'Cybersecurity',
      whenNotCoding: 'When I\'m not coding, I like to explore new technologies, contribute to open source projects and stay updated with the latest web development trends.',
      
      // Skills
      skillsTitle: 'Skills',
      skillsDescription: 'Technologies and tools I master to create complete digital solutions',
      programmingLanguages: 'Programming Languages',
      databasesTools: 'Databases & Tools',
      otherCompetencies: 'Other competencies',
      
      // Contact
      contactTitle: 'Contact',
      contactDescription: 'Have a project in mind? I\'m available for new opportunities.',
      sendMessage: 'Send a Message',
      connectWithMe: 'Connect with Me',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      sendButton: 'Send Message',
      sending: 'Sending...',
      contactPlatformsText: 'Feel free to contact me through any of these platforms. I am always open to discussing new opportunities and collaborations.',
      
      // Methodology
      methodologyBadge: 'Development Process',
      methodologyTitle: 'My Methodology',
      methodologyDescription: 'How I transform ideas into exceptional digital experiences',
      

      
      ideationTitle: 'Listen and Plan',
      ideationText: 'First we talk about your idea. I like to understand what you need and what problems you want to solve. Then I do some research, see what works well and design a solution that fits you perfectly.',
      
      developmentTitle: 'Create and Build',
      developmentText: 'This is where the fun begins. I write clean and organized code, testing each part to make sure everything works well. I like things to be easy to use and look great on any device.',
      
      optimizationTitle: 'Polish and Launch',
      optimizationText: 'Before delivering, I review everything one more time. I make sure it loads fast, is accessible to everyone and works perfectly. Once ready, we put it online and I explain how everything works.',
      
      philosophyTitle: 'My Approach',
      philosophyText: 'I like to create things that are easy to use. If someone can use your website without complications, then I\'ve done my job well. Every project teaches me something new and helps me improve.',
      

      
      // Education
      educationTitle: 'Education',
      educationDescription: 'My academic background and certifications in software development and cybersecurity.',
      
      // Footer
      contactInfo: 'Contact Information',
      developerRole: 'Developer',
      madeWith: 'Made with',
      allRightsReserved: 'All rights reserved.',
      availableToWork: 'Available to work online',
      connectWithMeFooter: 'Connect with Me',
      
      // Education Cards
      smrTitle: 'Microcomputer Systems and Networks',
      smrDescription: 'Fundamentals in computer systems, networks and hardware-software integration.',
      damTitle: 'Multiplatform Application Development',
      damDescription: 'Comprehensive education in multiplatform application development and software engineering.',
      dawTitle: 'Web Application Development',
      dawDescription: 'Specialized training in modern web technologies, frameworks and full-stack development practices.',
      masterTitle: 'Master in Cybersecurity',
      masterDescription: 'Advanced training in cybersecurity focused on threat analysis, penetration testing and security architecture.',
      
      // Projects Cards
      frontendProjectTitle: 'Frontend Web Development',
      frontendProjectCategory: 'Web Design',
      frontendProjectDescription: 'Design and layout of responsive websites using HTML, CSS and React. Creation of personal portfolios and optimized landing pages, focusing on semantic structure, best practices and adaptability to different mobile devices.',
      ecommerceProjectTitle: 'E-commerce Demo',
      ecommerceProjectCategory: 'React App',
      ecommerceProjectDescription: 'Basic virtual store application that allows viewing a product catalog, filtering by categories and managing a shopping cart. Implementation of global state to handle user item selection and simulate the purchase process.',
      mobileProjectTitle: 'Mobile Application',
      mobileProjectCategory: 'Mobile Development',
      mobileProjectDescription: 'Development of native and cross-platform mobile applications using technologies like React Native. Focus on user experience, performance and integration with external APIs to create functional and attractive applications.',
      
      // GitHub Stats
      publicRepos: 'public_repos:',
      estimatedCommits: 'estimated_commits:',
      topLanguages: 'top_languages:',
      status: 'status:',
      activeStatus: '"Active Developer"',
      viewProfile: '→ view profile',
      
      // Location
      location: 'Córdoba, Spain',
      availableForWork: 'Available for projects',
      yearsLearning: 'years learning',
      
      // Web Services
      needWebsite: 'Need a website?',
      webServiceDescription: 'In today\'s digital world, having a professional online presence is not optional, it\'s essential. I help you create modern, fast and optimized websites that convert visitors into customers.',
      webServiceSubtext: 'On the right you can see my latest project: a complete website for SnackGo, a fast food restaurant. From landing pages to complete web applications, I develop digital solutions that drive your business to success.',
      webPresence: 'Digital Presence',
      webPresenceDesc: 'Stand out online with unique design',
      responsive: 'Responsive Design',
      responsiveDesc: 'Perfect on mobile, tablet and desktop',
      performance: 'High Performance',
      performanceDesc: 'Fast loading and smooth experience',
      security: 'Security',
      securityDesc: 'Clean code and secure practices',
      startProject: 'I\'m interested',
      viewProject: 'View Project'
    }
  };

  // Memoized translation function
  const t = useCallback((key) => {
    return translations[language]?.[key] || key;
  }, [language]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    toggleLanguage,
    t
  }), [language, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};