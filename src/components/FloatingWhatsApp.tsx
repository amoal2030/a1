import React from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language } from '../data/translations';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingWhatsAppProps {
  lang?: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang = 'ar' }) => {
  const phone = APP_CONFIG.contact.whatsAppNumber;
  const t = TRANSLATIONS[lang];
  const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    lang === 'ar' ? APP_CONFIG.contact.defaultWhatsAppMessage : 'Hello, I would like to inquire about modern web development for my project.'
  )}`;

  return (
    <aside aria-label="WhatsApp Quick Action" className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-40`}>
      <motion.a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/35 transition-all group"
        title={t.floatingWA}
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-slate-950"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
        <span className="hidden sm:inline font-bold">{t.floatingWA}</span>
      </motion.a>
    </aside>
  );
};
