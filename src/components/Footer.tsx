import React from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { Code, MessageCircle, Mail, Phone, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenCalculator?: () => void;
  lang?: Language;
  theme?: Theme;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenContact,
  onOpenCalculator,
  lang = 'ar',
  theme = 'dark'
}) => {
  const currentYear = new Date().getFullYear();
  const phone = APP_CONFIG.contact.whatsAppNumber;
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t pt-16 pb-12 relative overflow-hidden transition-colors ${
      lang === 'ar' ? 'text-right' : 'text-left'
    } ${
      isDark ? 'bg-slate-950 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md">
                <Code className="w-4 h-4 text-slate-950" />
              </div>
              <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {t.siteName}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              {t.siteTagline}
            </p>

            <div className="pt-2 text-xs text-sky-500 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.developerTitle} • {t.developerName}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.footer.sectionsTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-sky-500 transition-colors cursor-pointer"
                >
                  {t.nav.hero}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-sky-500 transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-sky-500 transition-colors cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-sky-500 transition-colors cursor-pointer"
                >
                  {t.nav.pricing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCalculator ? onOpenCalculator() : onNavigate('pricing')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer font-semibold text-emerald-400/90"
                >
                  {t.nav.calculator}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-sky-500 transition-colors cursor-pointer"
                >
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-sky-500 transition-colors cursor-pointer"
                >
                  {t.nav.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.footer.channelsTitle}
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-semibold"
                dir="ltr"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500/20" />
                <span>{APP_CONFIG.contact.phoneInternational} (WhatsApp)</span>
              </a>

              <a
                href={`mailto:${APP_CONFIG.contact.email}`}
                className="flex items-center gap-2 hover:text-sky-500 transition-colors"
                dir="ltr"
              >
                <Mail className="w-4 h-4 text-sky-500" />
                <span>{APP_CONFIG.contact.email}</span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>{t.contact.locationLabel} {lang === 'ar' ? APP_CONFIG.contact.city : 'Saudi Arabia'}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-sky-400 border-white/10'
                      : 'bg-white hover:bg-slate-50 text-sky-600 border-slate-200 shadow-sm'
                  }`}
                >
                  {t.footer.contactPageBtn}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'border-white/10 text-slate-500' : 'border-slate-200 text-slate-400'
        }`}>
          <div>
            &copy; {currentYear} <strong className={isDark ? 'text-slate-300' : 'text-slate-700'}>{t.siteName}</strong>. {t.footer.rightsReserved}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span>{t.footer.builtWith}</span>
            <span>•</span>
            <span className="text-sky-500">React 19 + Tailwind + Motion</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
