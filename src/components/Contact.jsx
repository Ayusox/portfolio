import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';

// Constants
const ANIMATION_DURATION = 0.5;
const CONTACT_EMAIL = 'mariojuradoayuso@gmail.com';
const GITHUB_URL = 'https://github.com/Ayusox';
const INSTAGRAM_URL = 'https://www.instagram.com/mario_ayuso';
const LINKEDIN_URL = 'https://www.linkedin.com/in/ayuso-dev';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
const EMAILJS_TEMPLATE_ID_CLIENT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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
    { name: 'HTML5', icon: './html5-original.svg' },
    { name: 'CSS3', icon: './css3-original.svg' },
    { name: 'JavaScript', icon: './javascript-original.svg' },
    { name: 'React', icon: './react-original.svg' },
    { name: 'Bootstrap', icon: './bootstrap-original.svg' },
    { name: 'WordPress', icon: './wordpress-plain.svg' },
    { name: 'Git', icon: './git-original.svg' },
    { name: 'Figma', icon: './figma-original.svg' },
    { name: 'Python', icon: './python-original.svg' },
    { name: 'VS Code', icon: './vscode-original.svg' }
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

    // Validación anti-spam: mensaje mínimo de 10 caracteres
    if (formData.message.trim().length < 10) {
      toast({
        title: "❌ Mensaje muy corto",
        description: "Por favor, escribe un mensaje de al menos 10 caracteres.",
        duration: 4000,
        className: "bg-red-50 border-red-200 text-red-800",
      });
      setIsSubmitting(false);
      return;
    }

    // Notificación de inicio
    toast({
      title: "📤 Enviando mensaje...",
      description: "Por favor espera un momento mientras procesamos tu mensaje.",
      duration: 2000,
      className: "bg-yellow-50 border-yellow-200 text-yellow-800",
    });

    try {
      // Verificar que las variables de entorno estén configuradas
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID_ADMIN || !EMAILJS_TEMPLATE_ID_CLIENT || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS configuration missing');
      }

      // Parámetros del template de EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      // Primer envío: Email para el administrador (yo)
      const adminResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_ADMIN,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Solo continuar si el primer envío fue exitoso
      if (adminResult.status !== 200) {
        throw new Error('Failed to send admin email');
      }

      // Segundo envío: Auto-respuesta para el cliente
      const clientResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_CLIENT,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // Verificar que ambos envíos fueron exitosos
      if (adminResult.status === 200 && clientResult.status === 200) {
        toast({
          title: "✅ ¡Mensaje Enviado Exitosamente!",
          description: "🎉 Gracias por contactarme, " + formData.name + ". He recibido tu mensaje y te responderé lo antes posible. También recibirás una confirmación en tu email.",
          duration: 8000, // Mostrar por 8 segundos
          className: "bg-green-50 border-green-200 text-green-800",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('EmailJS client email failed');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      
      toast({
        title: "❌ Error al enviar mensaje",
        description: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctame directamente por email.",
        duration: 6000,
        className: "bg-red-50 border-red-200 text-red-800",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast]);

  const handleLinkedInClick = useCallback(() => {
    window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer');
  }, []);

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
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50 min-h-[40px] touch-manipulation text-sm py-2"
                  >
                    <Linkedin className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    LinkedIn @ayuso-dev
                  </Button>
                </a>
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
            
          {/* Simple scrolling container */}
          <div className="w-full overflow-hidden py-4">
            <motion.div 
              className="flex gap-8 sm:gap-12 md:gap-16"
              animate={{ x: [0, -100 * technologies.length] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              style={{ width: `${technologies.length * 200}px` }}
            >
              {/* Render technologies twice for seamless loop */}
              {[...technologies, ...technologies].map((tech, index) => (
                <div key={index} className="flex flex-col items-center justify-center min-w-[80px] flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-2">
                    <img 
                      src={tech.icon} 
                      alt={`Logo de ${tech.name} - Tecnología utilizada por Mario Jurado Ayuso`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs text-slate-700 font-semibold tracking-wide uppercase opacity-85 text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

// Carrusel ahora usa Framer Motion - no necesita CSS personalizado