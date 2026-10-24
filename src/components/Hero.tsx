import React, { useState } from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { 
  Sparkles, 
  MessageCircle, 
  ArrowLeft, 
  ArrowRight,
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  Zap, 
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { getAssetUrl } from '../utils/assets';

interface HeroProps {
  onOrderClick: (serviceId?: string) => void;
  onExplorePortfolio: () => void;
  lang?: Language;
  theme?: Theme;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOrderClick, 
  onExplorePortfolio,
  lang = 'ar',
  theme = 'dark'
}) => {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  const phone = APP_CONFIG.contact.whatsAppNumber;
  const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    lang === 'ar' 
      ? 'السلام عليكم، أود حجز الباقة الافتتاحية للمشاريع الصغيرة ($60) لموقعي الجديد.'
      : 'Hello, I would like to book the Starter Package ($60) for my new website.'
  )}`;

  return (
    <section id="hero" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Decorative luminous backdrops */}
      <div className={`absolute top-1/4 right-5 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-sky-500/10' : 'bg-sky-400/20'
      }`} />
      <div className={`absolute bottom-10 left-5 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-10 ${
        isDark ? 'bg-emerald-500/10' : 'bg-emerald-400/20'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className={`lg:col-span-7 flex flex-col items-start ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            
            {/* Animated Meta Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-md border ${
                isDark 
                  ? 'bg-slate-900/80 border-sky-400/30 text-sky-300 shadow-sky-500/10' 
                  : 'bg-white border-sky-300 text-sky-700 shadow-sky-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              <span>{t.hero.kicker}</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-500 font-bold">{t.hero.deliveryBadge}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.25] tracking-tight mb-6 ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              {t.hero.headlinePrefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-400 to-emerald-500">
                {t.hero.headlineHighlight}
              </span>{' '}
              {t.hero.headlineSuffix}
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-8 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              <button
                onClick={() => onOrderClick('intro-3pages')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{t.hero.ctaPrimary}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl border font-bold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-sm ${
                  isDark
                    ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 text-transparent" />
                <span>{t.hero.ctaWhatsApp}</span>
              </a>
            </motion.div>

            {/* Proof Metric Strips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`w-full grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t ${
                isDark ? 'border-white/10' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col">
                <div className={`text-xl sm:text-2xl font-black flex items-baseline gap-1 font-mono ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span className="text-sky-500">{t.hero.proofPrice}</span>
                  <span className="text-xs text-slate-400 font-sans">{t.hero.proofPriceUnit}</span>
                </div>
                <span className="text-xs text-slate-400 mt-0.5">{t.hero.proofPriceLabel}</span>
              </div>

              <div className={`flex flex-col pr-3 sm:pr-6 ${lang === 'ar' ? 'border-r border-slate-200 dark:border-white/10' : 'border-l border-slate-200 dark:border-white/10 pl-3 sm:pl-6'}`}>
                <div className={`text-xl sm:text-2xl font-black flex items-baseline gap-1 font-mono ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span className="text-emerald-500">{t.hero.proofTime}</span>
                  <span className="text-xs text-slate-400 font-sans">{t.hero.proofTimeUnit}</span>
                </div>
                <span className="text-xs text-slate-400 mt-0.5">{t.hero.proofTimeLabel}</span>
              </div>

              <div className={`flex flex-col pr-3 sm:pr-6 ${lang === 'ar' ? 'border-r border-slate-200 dark:border-white/10' : 'border-l border-slate-200 dark:border-white/10 pl-3 sm:pl-6'}`}>
                <div className={`text-xl sm:text-2xl font-black flex items-baseline gap-1 font-mono ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span className="text-sky-500">{t.hero.proofResponsive}</span>
                  <span className="text-xs text-slate-400 font-sans">{t.hero.proofResponsiveUnit}</span>
                </div>
                <span className="text-xs text-slate-400 mt-0.5">{t.hero.proofResponsiveLabel}</span>
              </div>
            </motion.div>

          </div>

          {/* Left Column: Interactive Dual Device Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full relative"
            >
              {/* Device Selector Tabs on Top */}
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {t.hero.deviceSimulator}
                </span>
                <div className={`flex items-center p-1 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-900/90 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <button
                    onClick={() => setDevicePreview('desktop')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                      devicePreview === 'desktop'
                        ? 'bg-sky-500 text-slate-950 font-black shadow-sm'
                        : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>{t.hero.desktop}</span>
                  </button>
                  <button
                    onClick={() => setDevicePreview('mobile')}
                    className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                      devicePreview === 'mobile'
                        ? 'bg-sky-500 text-slate-950 font-black shadow-sm'
                        : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{t.hero.mobile}</span>
                  </button>
                </div>
              </div>

              {/* Realistic Frame Card */}
              <div className="relative mx-auto transition-all duration-300">
                {devicePreview === 'desktop' ? (
                  /* Desktop / Laptop Frame Mockup */
                  <div className={`w-full rounded-2xl overflow-hidden shadow-2xl border ${
                    isDark 
                      ? 'bg-slate-900 border-white/15 shadow-black/60' 
                      : 'bg-white border-slate-300 shadow-slate-300/60'
                  }`}>
                    {/* Browser top chrome */}
                    <div className={`px-4 py-2.5 border-b flex items-center justify-between ${
                      isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                      </div>
                      <div className={`px-4 py-0.5 rounded-md text-[11px] font-mono border flex items-center gap-1 ${
                        isDark ? 'bg-slate-900 text-slate-400 border-white/5' : 'bg-white text-slate-600 border-slate-200'
                      }`}>
                        <span className="text-emerald-500">🔒</span>
                        <span>https://yourbrand.com</span>
                      </div>
                      <span className="text-[10px] text-sky-500 font-bold bg-sky-500/10 px-2 py-0.5 rounded">
                        {t.hero.desktopBadge}
                      </span>
                    </div>

                    {/* Image canvas with interactive overlay */}
                    <div className="relative h-72 sm:h-80 overflow-hidden group">
                      <img
                        src={getAssetUrl('assets/images/hero.jpg')}
                        alt="Desktop Preview"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-right">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-400/30">
                              {t.hero.deliveryBadge}
                            </span>
                            <h3 className="text-base font-bold text-white mt-1.5">
                              {t.hero.desktopDescTitle}
                            </h3>
                            <p className="text-xs text-slate-300">
                              {t.hero.desktopDescSub}
                            </p>
                          </div>
                          <button
                            onClick={onExplorePortfolio}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                          >
                            {t.hero.explorePortfolio}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mobile Frame Mockup */
                  <div className="w-64 sm:w-72 mx-auto rounded-[2.5rem] bg-slate-950 border-4 border-slate-700 p-2.5 shadow-2xl shadow-sky-500/10">
                    <div className="w-24 h-4 bg-slate-800 rounded-b-xl mx-auto mb-2 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-950"></div>
                    </div>

                    <div className="rounded-[1.8rem] overflow-hidden bg-slate-900 border border-white/10 relative h-96">
                      <img
                        src={getAssetUrl('assets/images/restaurant.jpg')}
                        alt="Mobile Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-4 text-right">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-400/30 w-fit">
                          {t.hero.mobileBadge}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">
                          {t.hero.mobileDescTitle}
                        </h4>
                        <p className="text-[11px] text-slate-300 mb-2">
                          {t.hero.mobileDescSub}
                        </p>
                        <a
                          href={whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-emerald-500 text-slate-950 text-xs font-black rounded-lg text-center shadow-md flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                          {t.hero.mobileOrderBtn}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating feature pills around device */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`hidden sm:flex absolute -bottom-4 -right-4 backdrop-blur-md rounded-2xl p-3 shadow-xl items-center gap-3 border ${
                  isDark ? 'bg-slate-900/95 border-emerald-500/40' : 'bg-white/95 border-emerald-300 shadow-slate-200'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.hero.guaranteePillTitle}</div>
                  <div className="text-[10px] text-slate-400">{t.hero.guaranteePillDesc}</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className={`hidden sm:flex absolute -top-3 -left-3 backdrop-blur-md rounded-2xl p-3 shadow-xl items-center gap-3 border ${
                  isDark ? 'bg-slate-900/95 border-sky-500/40' : 'bg-white/95 border-sky-300 shadow-slate-200'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center font-black">
                  <Zap className="w-4 h-4 text-sky-500" />
                </div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.hero.speedPillTitle}</div>
                  <div className="text-[10px] text-slate-400">{t.hero.speedPillDesc}</div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
