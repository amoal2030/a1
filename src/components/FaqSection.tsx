import React, { useState } from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqSectionProps {
  lang?: Language;
  theme?: Theme;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  lang = 'ar',
  theme = 'dark'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const phone = APP_CONFIG.contact.whatsAppNumber;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'السلام عليكم، لدي استفسار إضافي لم أجده في قسم الأسئلة الشائعة.'
      : 'Hello, I have a specific question about your web services.'
  )}`;

  const faqsList = lang === 'ar' ? APP_CONFIG.faqs : [
    {
      q: "What does 'A developer assisted by modern AI tools' mean?",
      a: "With absolute honesty: I do not claim 15 years building corporate banking systems. I am a passionate frontend developer mastering fundamental web technologies (React, HTML5, CSS3, JS) who utilizes modern generative AI tooling to architect and deliver clean, high-performance code in days. The result: an enterprise-grade website at an economical $60 price point tailored for small businesses."
    },
    {
      q: "Do I have to pay expensive monthly hosting subscriptions?",
      a: "Not at all! The websites I build are super lightweight, modern, and static. They can be permanently hosted completely free of charge on global platforms like Cloudflare Pages, GitHub Pages, or Netlify with complimentary SSL certificates. Your only optional recurring fee in the future is your custom domain name (e.g. yourname.com) if you choose to purchase one."
    },
    {
      q: "What do you need from me before we get started?",
      a: "Only simple details: your business name, a short description of what you sell or offer, your WhatsApp phone number to receive customers, and your logo or photos if available. I handle the rest completely."
    },
    {
      q: "How does payment work and what are the guarantees?",
      a: "We start with a modest initial deposit after agreeing on the scope to confirm seriousness, and the remainder is paid only after you inspect the live staging link on your phone and are completely satisfied with the result before final deployment."
    },
    {
      q: "Can I request revisions or updates after launch?",
      a: "Yes! We include free polish revisions for texts and images during the first week after launch. Furthermore, we format configuration files so you can easily change contact numbers, prices, or details anytime."
    }
  ];

  return (
    <section id="faq" className={`py-20 border-b transition-colors ${
      isDark ? 'bg-slate-900/30 border-white/5' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-500 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20 inline-block mb-3">
            {t.faq.kicker}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-3 ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.faq.title}
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className={`space-y-3.5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          {faqsList.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? isDark 
                      ? 'bg-[#0c1222] border-sky-400/40 shadow-lg shadow-sky-500/5'
                      : 'bg-white border-sky-300 shadow-md shadow-sky-50'
                    : isDark 
                      ? 'bg-[#0b1120] border-white/10 hover:border-white/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className={`w-full p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-bold leading-snug ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-sky-500 text-slate-950 rotate-180'
                        : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className={`px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t pt-4 ${
                        isDark ? 'text-slate-300 border-white/5' : 'text-slate-600 border-slate-100'
                      }`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <div className={`mt-10 p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          lang === 'ar' ? 'text-right' : 'text-left'
        } ${
          isDark 
            ? 'bg-gradient-to-r from-sky-500/10 via-slate-900 to-emerald-500/10 border-white/10' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div>
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.faq.haveQuestion}</h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.faq.haveQuestionSub}
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shrink-0 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>{t.faq.askWABtn}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
