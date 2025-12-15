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
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
          {/* Contact Info - Izquierda */}
          <section className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3" aria-labelledby="contact-info-title">
            <h3 id="contact-info-title" className="text-lg font-semibold text-white">{t('contactInfo')}</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-center text-sm text-slate-400">
                <MapPin className="w-4 h-4 mr-2 text-blue-500 shrink-0" aria-hidden="true" />
                <span>{LOCATION}</span>
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <Mail className="w-4 h-4 mr-2 text-blue-500 shrink-0" aria-hidden="true" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-blue-400 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <Code2 className="w-4 h-4 mr-2 text-blue-500 shrink-0" aria-hidden="true" />
                <span>{t('developerRole')} & Ciberseguridad</span>
              </div>
            </address>
          </section>

          {/* Social Media - Derecha */}
          <section className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-4" aria-labelledby="social-links-title">
            <h3 id="social-links-title" className="text-lg font-semibold text-white">{t('connectWithMeFooter')}</h3>
            <nav aria-label="Enlaces de redes sociales">
              <ul className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
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
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p className="mb-4 md:mb-0 text-center md:text-left">
            &copy; {currentYear} Mario Jurado Ayuso. {t('allRightsReserved')}
          </p>
          <p className="mt-1">{t('availableToWork')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;