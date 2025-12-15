import { Github, Linkedin, Mail, Instagram, Code2, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMemo } from 'react';

// Constants
const CONTACT_EMAIL = 'mariojuradoayuso@gmail.com';
const LOCATION = 'Hinojosa del Duque, Córdoba';
const INSTAGRAM_URL = 'https://www.instagram.com/mario_ayuso';
const GITHUB_URL = 'https://github.com/Ayusox';

const Footer = () => {
  const { t } = useLanguage();
  
  // Memoize current year to prevent unnecessary re-calculations
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Memoize social links array to prevent unnecessary re-renders
  const socialLinks = useMemo(() => [
    { icon: <Github className="w-5 h-5" />, href: GITHUB_URL, label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: INSTAGRAM_URL, label: "Instagram" },
    { icon: <Mail className="w-5 h-5" />, href: `mailto:${CONTACT_EMAIL}`, label: "Email" },
  ], []);

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 sm:py-16 border-t border-slate-800" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
          {/* Contact Info - Izquierda */}
          <section className="flex flex-col items-center lg:items-start text-center lg:text-left" aria-labelledby="contact-info-title">
            <h3 id="contact-info-title" className="text-lg font-semibold text-white mb-4">{t('contactInfo')}</h3>
            <address className="not-italic">
              <div className="flex items-start justify-center lg:justify-start text-sm text-slate-400 mb-6 lg:mb-2">
                <MapPin className="w-4 h-4 mr-3 text-blue-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="break-words leading-tight">{LOCATION}</span>
              </div>
              <div className="flex items-start justify-center lg:justify-start text-sm text-slate-400 -mb-1 lg:mb-2">
                <Mail className="w-4 h-4 mr-3 text-blue-500 shrink-0 mt-0.5" aria-hidden="true" />
                <a 
                  href={`mailto:${CONTACT_EMAIL}`} 
                  className="hover:text-blue-400 transition-colors break-all leading-none lg:leading-tight"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="flex items-start justify-center lg:justify-start text-sm text-slate-400">
                <Code2 className="w-4 h-4 mr-3 text-blue-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="break-words leading-none lg:leading-tight">{t('developerRole')} & Ciberseguridad</span>
              </div>
            </address>
          </section>

          {/* Social Media - Derecha */}
          <section className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-4 mt-8 lg:mt-0" aria-labelledby="social-links-title">
            <h3 id="social-links-title" className="text-lg font-semibold text-white mb-2">{t('connectWithMeFooter')}</h3>
            <nav aria-label="Enlaces de redes sociales">
              <ul className="flex space-x-4 justify-center lg:justify-end">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                      aria-label={`Visitar perfil de ${social.label}`}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 space-y-4 md:space-y-0">
          <p className="text-center md:text-left">
            &copy; {currentYear} Mario Jurado Ayuso. {t('allRightsReserved')}
          </p>
          <p className="text-center md:text-right font-medium text-slate-400">{t('availableToWork')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;