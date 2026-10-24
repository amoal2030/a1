import React from 'react';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { ShieldCheck, HeartHandshake, Zap, DollarSign, Check, X, Code2, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onContactClick: () => void;
  lang?: Language;
  theme?: Theme;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onContactClick,
  lang = 'ar',
  theme = 'dark'
}) => {
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  return (
    <section id="about" className={`py-20 border-y transition-colors ${
      isDark ? 'bg-slate-900/50 border-white/5' : 'bg-slate-100/70 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`max-w-3xl mb-14 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <span className="text-xs font-bold text-sky-500 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20 inline-block">
            {t.about.kicker}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mt-3 mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.about.title}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t.about.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Manifesto Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-7 border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl ${
              lang === 'ar' ? 'text-right' : 'text-left'
            } ${
              isDark 
                ? 'bg-[#0b1120] border-white/10 shadow-black/20' 
                : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}
          >
            <div>
              <div className="flex items-center gap-2.5 text-sky-500 font-bold text-sm mb-4">
                <HeartHandshake className="w-5 h-5 text-sky-500" />
                <span>{t.about.manifestoTitle}</span>
              </div>

              <h3 className={`text-lg sm:text-xl font-bold mb-4 leading-snug ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {t.about.leadText}
              </h3>

              <p className={`text-sm leading-relaxed mb-4 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t.about.p1}
              </p>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {t.about.p2}
              </p>

              {/* 4 Pillars Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-6 border-t ${
                isDark ? 'border-white/10' : 'border-slate-100'
              }`}>
                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-slate-900/80 border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-sky-500 font-bold text-xs mb-1">
                    <Zap className="w-4 h-4 text-sky-500" />
                    <span>{t.about.speedTitle}</span>
                  </div>
                  <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                    {t.about.speedDesc}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-slate-900/80 border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span>{t.about.priceTitle}</span>
                  </div>
                  <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                    {t.about.priceDesc}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-slate-900/80 border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs mb-1">
                    <Code2 className="w-4 h-4 text-indigo-500" />
                    <span>{t.about.codeTitle}</span>
                  </div>
                  <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                    {t.about.codeDesc}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-slate-900/80 border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-xs mb-1">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{t.about.hostingTitle}</span>
                  </div>
                  <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                    {t.about.hostingDesc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transparency / Suitability Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`lg:col-span-5 border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden ${
              lang === 'ar' ? 'text-right' : 'text-left'
            } ${
              isDark 
                ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-[#0e172a] border-sky-500/25 shadow-sky-500/5' 
                : 'bg-white border-sky-200 shadow-slate-200/50'
            }`}
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-sky-500 font-bold text-sm mb-4">
                <ShieldCheck className="w-5 h-5 text-sky-500" />
                <span>{t.about.whoIsItForTitle}</span>
              </div>

              <h4 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.about.whoIsItForSub}
              </h4>

              {/* What we do */}
              <div className="space-y-3 mb-6">
                <div className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-500 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>
                    <strong className={isDark ? 'text-white' : 'text-slate-950 font-black'}>{t.about.forYes1Title}</strong> {t.about.forYes1Desc}
                  </span>
                </div>

                <div className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-500 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>
                    <strong className={isDark ? 'text-white' : 'text-slate-950 font-black'}>{t.about.forYes2Title}</strong> {t.about.forYes2Desc}
                  </span>
                </div>

                <div className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="p-1 rounded-full bg-amber-500/20 text-amber-500 shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </span>
                  <span>
                    <strong className={isDark ? 'text-slate-300' : 'text-slate-900 font-bold'}>{t.about.forNoTitle}</strong> {t.about.forNoDesc}
                  </span>
                </div>
              </div>
            </div>

            <div className={`pt-5 border-t mt-auto ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
              <button
                onClick={onContactClick}
                className={`w-full py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border-sky-400/30'
                    : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
                }`}
              >
                <span>{t.about.contactPrompt}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
