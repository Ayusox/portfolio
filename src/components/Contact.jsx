import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '../contexts/LanguageContext';

// Importar imágenes locales de tecnologías
import html5Icon from '../assets/technologies/html5-original.svg';
import css3Icon from '../assets/technologies/css3-original.svg';
import javascriptIcon from '../assets/technologies/javascript-original.svg';
import reactIcon from '../assets/technologies/react-original.svg';
import bootstrapIcon from '../assets/technologies/bootstrap-original.svg';
import wordpressIcon from '../assets/technologies/wordpress-plain.svg';
import gitIcon from '../assets/technologies/git-original.svg';
import figmaIcon from '../assets/technologies/figma-original.svg';
import pythonIcon from '../assets/technologies/python-original.svg';
import vscodeIcon from '../assets/technologies/vscode-original.svg';

// Constants
const ANIMATION_DURATION = 0.5;
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/mariojuradoayuso@gmail.com';
const CONTACT_EMAIL = 'mariojuradoayuso@gmail.com';
const GITHUB_URL = 'https://github.com/Ayusox';
const INSTAGRAM_URL = 'https://www.instagram.com/mario_ayuso';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoize technologies array to prevent unnecessary re-renders
  const technologies = useMemo(() => [
    { name: 'HTML5', icon: html5Icon },
    { name: 'CSS3', icon: css3Icon },
    { name: 'JavaScript', icon: javascriptIcon },
    { name: 'React', icon: reactIcon },
    { name: 'Bootstrap', icon: bootstrapIcon },
    { name: 'WordPress', icon: wordpressIcon },
    { name: 'Git', icon: gitIcon },
    { name: 'Figma', icon: figmaIcon },
    { name: 'Python', icon: pythonIcon },
    { name: 'VS Code', icon: vscodeIcon }
  ], []);

  // Memoize form handlers to prevent unnecessary re-renders
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co for email functionality without backend
      // This service sends the email directly to the specified address
      const response = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Nuevo mensaje de portafolio de: ${formData.name}`, // Custom subject line
          _template: "table", // Nice email template
          _captcha: "false" // Disable captcha for cleaner UX (optional)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: "¡Mensaje Enviado!",
        description: "Gracias por contactarme. He recibido tu correo y te responderé pronto.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Email error:", error);
      
      // Fallback: Open mailto link if the API service fails
      const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=Contacto desde Portafolio&body=Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMensaje: ${formData.message}`;
      window.location.href = mailtoUrl;
      
      toast({
        variant: "default", // Using default because we opened the mail client
        title: "Abriendo cliente de correo...",
        description: "Hubo un problema con el envío automático, así que he abierto tu aplicación de correo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast]);

  const handleLinkedInClick = useCallback(() => {
    toast({
      title: "LinkedIn",
      description: "🚧 ¡Próximamente! El perfil de LinkedIn estará disponible pronto. 🚀",
    });
  }, [toast]);

  return (
    <section id="contact" className="pt-4 sm:pt-6 pb-0 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_DURATION }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
              {t('contactTitle')}
            </h2>
            <div className="w-10 sm:w-12 h-0.5 bg-slate-400 mx-auto mb-4 sm:mb-5"></div>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed px-4">
              {t('contactDescription')}
            </p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: ANIMATION_DURATION }}
              className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-lg h-full order-2 lg:order-1"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">{t('sendMessage')}</h3>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Honeypot field to prevent spam (hidden) */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div>
                  <Label htmlFor="name" className="text-slate-700 text-sm">{t('name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 border-slate-300 focus:border-blue-500 min-h-[40px] text-sm"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-700 text-sm">{t('email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 border-slate-300 focus:border-blue-500 min-h-[40px] text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-slate-700 text-sm">{t('message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="mt-1 border-slate-300 focus:border-blue-500 text-sm resize-none"
                    placeholder="Cuéntame sobre tu proyecto o propuesta..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white min-h-[40px] touch-manipulation text-sm"
                >
                  {isSubmitting ? t('sending') : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('sendButton')}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: ANIMATION_DURATION }}
              className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-lg h-full order-1 lg:order-2"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">{t('connectWithMe')}</h3>
              <p className="text-slate-600 mb-3 sm:mb-4 text-sm">
                {t('contactPlatformsText')}
              </p>
              <div className="space-y-2 sm:space-y-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50 min-h-[40px] touch-manipulation text-sm py-2"
                  >
                    <Mail className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{CONTACT_EMAIL}</span>
                  </Button>
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50 min-h-[40px] touch-manipulation text-sm py-2"
                  >
                    <Github className="w-4 h-4 mr-2 text-slate-900 flex-shrink-0" />
                    GitHub @Ayusox
                  </Button>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50 min-h-[40px] touch-manipulation text-sm py-2"
                  >
                    <Instagram className="w-4 h-4 mr-2 text-pink-600 flex-shrink-0" />
                    Instagram @mario_ayuso
                  </Button>
                </a>
                <Button
                  onClick={handleLinkedInClick}
                  variant="outline"
                  className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50 min-h-[40px] touch-manipulation text-sm py-2"
                >
                  <Linkedin className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                  LinkedIn Próximamente
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Technology Carousel - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 sm:mt-8 lg:mt-10 mb-0 w-full overflow-hidden"
      >
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 w-6 sm:w-8 lg:w-12 h-full z-10" style={{ background: 'linear-gradient(to right, rgba(241, 245, 249, 0.7), rgba(241, 245, 249, 0.5), rgba(241, 245, 249, 0.25), transparent)' }}></div>
          <div className="absolute right-0 top-0 w-6 sm:w-8 lg:w-12 h-full z-10" style={{ background: 'linear-gradient(to left, rgba(241, 245, 249, 0.7), rgba(241, 245, 249, 0.5), rgba(241, 245, 249, 0.25), transparent)' }}></div>
            
          {/* Scrolling container with seamless infinite loop */}
          <div className="carousel-container py-3 sm:py-4 lg:py-5">
            <div className="carousel-track">
              {/* Create 2 identical copies for seamless scrolling */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="carousel-set">
                  {technologies.map((tech, index) => (
                    <div key={`set-${setIndex}-${index}`} className="carousel-item">
                      <img 
                        src={tech.icon} 
                        alt={`Logo de ${tech.name} - Tecnología utilizada por Mario Jurado Ayuso`}
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        width="64"
                        height="64"
                      />
                      <span className="text-xs text-slate-700 mt-1.5 sm:mt-2 font-semibold tracking-wide uppercase opacity-85 hover:opacity-100 transition-opacity duration-300 text-center">{tech.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

// CSS personalizado para el carrusel seamless
// CSS personalizado para el carrusel seamless
const carouselStyles = `
  .carousel-container {
    overflow: hidden;
    width: 100%;
  }
  
  .carousel-track {
    display: flex;
    animation: seamless-scroll 60s linear infinite;
    width: fit-content;
    /* >> APLICAR ESPACIO DE SEPARACIÓN AQUÍ PARA SEPARAR LOS CAROUSEL-SET << */
    gap: 1.5rem; /* Valor por defecto (móvil) */
  }
  
  .carousel-set {
    display: flex;
    flex-shrink: 0;
    /* MANTENER EL ESPACIO DE SEPARACIÓN DENTRO DE CADA SET */
    gap: 1.5rem; /* Valor por defecto (móvil) */
  }
  
  @media (min-width: 480px) {
    .carousel-track,
    .carousel-set {
      gap: 2rem;
    }
  }
  
  @media (min-width: 640px) {
    .carousel-track,
    .carousel-set {
      gap: 2.5rem;
    }
  }
  
  @media (min-width: 768px) {
    .carousel-track,
    .carousel-set {
      gap: 3rem;
    }
  }
  
  @media (min-width: 1024px) {
    .carousel-track,
    .carousel-set {
      gap: 4rem;
    }
  }
  
  @media (min-width: 1280px) {
    .carousel-track,
    .carousel-set {
      gap: 5rem;
    }
  }
  
  .carousel-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }
  
  .carousel-item:hover {
    transform: translateY(-2px);
  }
  
  .carousel-item span {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    letter-spacing: 0.05em;
  }
  
  @keyframes seamless-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

// Inyectar estilos
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = carouselStyles;
  document.head.appendChild(styleSheet);
}