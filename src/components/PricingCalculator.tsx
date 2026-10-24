import React, { useState } from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { 
  Check, 
  X, 
  Sparkles, 
  MessageCircle, 
  Clock, 
  Calculator,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { ConversionAssurance } from './ConversionAssurance';
import { triggerConversionCelebration } from '../utils/confetti';

interface PricingCalculatorProps {
  onSelectPackage: (details: { name: string; price: number; description: string }) => void;
  onOpenCalculatorPage?: () => void;
  lang?: Language;
  theme?: Theme;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ 
  onSelectPackage,
  onOpenCalculatorPage,
  lang = 'ar',
  theme = 'dark'
}) => {
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  // Configurator state
  const [pagesCount, setPagesCount] = useState<number>(3);
  const [hasBilingual, setHasBilingual] = useState<boolean>(false);
  const [hasProductCatalog, setHasProductCatalog] = useState<boolean>(false);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [hasDomainAssistance, setHasDomainAssistance] = useState<boolean>(false);

  // Price Calculation Logic
  const basePagePrice = pagesCount === 1 ? 40 : pagesCount === 3 ? 60 : 60 + (pagesCount - 3) * 15;
  const bilingualFee = hasBilingual ? 25 : 0;
  const catalogFee = hasProductCatalog ? 20 : 0;
  const urgentFee = isUrgent ? 30 : 0;
  const domainFee = hasDomainAssistance ? 15 : 0;

  const totalPriceUSD = basePagePrice + bilingualFee + catalogFee + urgentFee + domainFee;
  const totalPriceSAR = Math.round(totalPriceUSD * 3.75);

  // Timeline Calculation Logic
  const getTimelineDays = () => {
    if (isUrgent) {
      return lang === 'ar' ? '48 إلى 72 ساعة (تسليم عاجل مكثف)' : '48 to 72 Hours (Express Delivery)';
    }
    if (pagesCount <= 1) {
      return lang === 'ar' ? '2 - 3 أيام عمل' : '2 - 3 Business Days';
    }
    if (pagesCount <= 3) {
      return lang === 'ar' ? '3 - 5 أيام عمل' : '3 - 5 Business Days';
    }
    return lang === 'ar' ? '5 - 7 أيام عمل' : '5 - 7 Business Days';
  };

  const getCustomSummaryText = () => {
    const addons = [];
    if (hasBilingual) addons.push(lang === 'ar' ? 'لغتين (عربي + إنجليزي)' : 'Bilingual (AR/EN)');
    if (hasProductCatalog) addons.push(lang === 'ar' ? 'كتالوج منتجات تفاعلي' : 'Interactive Product Catalog');
    if (isUrgent) addons.push(lang === 'ar' ? 'تسليم عاجل خلال 48-72 ساعة' : 'Express 48-72h Delivery');
    if (hasDomainAssistance) addons.push(lang === 'ar' ? 'مساعدة ربط الدومين' : 'Domain DNS Setup');
    
    return lang === 'ar'
      ? `موقع مخصص من ${pagesCount} صفحات ${addons.length > 0 ? `مع (${addons.join('، ')})` : ''} بسعر إجمالي ${totalPriceUSD}$ (~${totalPriceSAR} ريال).`
      : `Custom website with ${pagesCount} pages ${addons.length > 0 ? `plus (${addons.join(', ')})` : ''} at $${totalPriceUSD} (~${totalPriceSAR} SAR).`;
  };

  const phone = APP_CONFIG.contact.whatsAppNumber;
  const customWhatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، قمت بتحديد متطلبات موقعي عبر حاسبة الأسعار:\n- عدد الصفحات: ${pagesCount} صفحات\n- لغتين: ${hasBilingual ? 'نعم' : 'لا'}\n- كتالوج تفاعلي: ${hasProductCatalog ? 'نعم' : 'لا'}\n- تسليم عاجل: ${isUrgent ? 'نعم' : 'لا'}\n- مساعدة الدومين: ${hasDomainAssistance ? 'نعم' : 'لا'}\n- السعر التقديري: ${totalPriceUSD}$ (~${totalPriceSAR} ر.س)\n- المدة: ${getTimelineDays()}\nأود مناقشة البدء والتنفيذ.`
      : `Hello, I calculated my website scope using your interactive pricing calculator:\n- Pages: ${pagesCount} pages\n- Bilingual: ${hasBilingual ? 'Yes' : 'No'}\n- Interactive Catalog/Menu: ${hasProductCatalog ? 'Yes' : 'No'}\n- Express Delivery: ${isUrgent ? 'Yes' : 'No'}\n- Domain Setup: ${hasDomainAssistance ? 'Yes' : 'No'}\n- Estimated Price: $${totalPriceUSD} (~${totalPriceSAR} SAR)\n- Estimated Timeline: ${getTimelineDays()}\nI would like to discuss and get started.`
  )}`;

  const flagshipWhatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، أود حجز "الباقة الافتتاحية للمشاريع الصغيرة" ($60 / 225 ريال) لموقعي.`
      : `Hello, I would like to book the Starter Package ($60 / approx 225 SAR) for my new website.`
  )}`;

  return (
    <section id="pricing" className={`py-20 border-b transition-colors ${
      isDark ? 'bg-[#060911] border-white/5' : 'bg-slate-100/60 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`max-w-3xl mb-14 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <span className="text-xs font-bold text-sky-500 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20 inline-block">
            {t.pricing.kicker}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mt-3 mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.pricing.title}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t.pricing.subtitle}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Flagship 60$ Package Card */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-7 rounded-3xl p-6 sm:p-9 border-2 border-sky-500 shadow-2xl relative flex flex-col justify-between ${
              lang === 'ar' ? 'text-right' : 'text-left'
            } ${
              isDark 
                ? 'bg-gradient-to-b from-[#0c1322] to-[#080d18] shadow-sky-500/10' 
                : 'bg-white shadow-sky-100'
            }`}
          >
            {/* Top Badge */}
            <div className={`absolute -top-3.5 px-4 py-1 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 text-xs font-black shadow-lg flex items-center gap-1.5 ${
              lang === 'ar' ? 'right-8' : 'left-8'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>{t.pricing.popularBadge}</span>
            </div>

            <div>
              {/* Header with Title and Price */}
              <div className={`flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4 pb-6 border-b ${
                isDark ? 'border-white/10' : 'border-slate-100'
              }`}>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ar' ? APP_CONFIG.introPackage.name : 'Small Business Starter Package'}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>{t.pricing.durationPrefix} {APP_CONFIG.introPackage.deliveryTime}</span>
                    <span>•</span>
                    <span className="text-emerald-500 font-bold">{t.pricing.pagesBadge}</span>
                  </div>
                </div>

                <div className={lang === 'ar' ? 'text-right sm:text-left' : 'text-left sm:text-right'}>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-3xl sm:text-5xl font-black text-sky-500">
                      ${APP_CONFIG.introPackage.priceUSD}
                    </span>
                    <span className="text-xs text-slate-400 font-sans">
                      {t.pricing.perSite}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-emerald-500 font-mono mt-0.5">
                    {t.pricing.sarEstimate}
                  </div>
                </div>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {lang === 'ar' 
                  ? APP_CONFIG.introPackage.description 
                  : 'An ideal, budget-friendly digital presence for stores, restaurants, cafes, and freelancers to establish a credible online presence with zero headache.'}
              </p>

              {/* Inclusions & Honest Exclusions Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                
                {/* What's Included */}
                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-900/60 border-emerald-500/20' : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm mb-3">
                    <Check className="w-4 h-4" />
                    <span>{t.pricing.includedTitle}</span>
                  </div>
                  <div className="space-y-2.5">
                    {(lang === 'ar' ? APP_CONFIG.introPackage.featuresIncluded : [
                      "Full 3-page custom design (Home, About & Services, Contact)",
                      "100% responsive across mobile, tablet, and desktop",
                      "Modern typography and clean layout with custom styling",
                      "Floating 1-tap WhatsApp button for direct client leads",
                      "Custom inquiry and order booking form tailored to your trade",
                      "Basic Search Engine Optimization (SEO) setup for Google",
                      "Super lightweight source code with instant loading",
                      "Free guidance & deployment on permanent cloud hosting"
                    ]).map((feat, idx) => (
                      <div key={idx} className={`flex items-start gap-2 text-xs leading-normal ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Honest Exclusions */}
                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-900/60 border-amber-500/20' : 'bg-amber-50/50 border-amber-200'
                }`}>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm mb-3">
                    <X className="w-4 h-4" />
                    <span>{t.pricing.excludedTitle}</span>
                  </div>
                  <div className="space-y-2.5">
                    {(lang === 'ar' ? APP_CONFIG.introPackage.featuresExcluded : [
                      "Does not include custom domain purchase (.com / .sa) - we guide you to buy at base cost",
                      "Does not include direct bank credit card gateway backends",
                      "Does not include heavy backend CMS (updates are made cleanly in code)",
                      "Does not include specialized marketing copywriting (client provides core text)"
                    ]).map((feat, idx) => (
                      <div key={idx} className={`flex items-start gap-2 text-xs leading-normal ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shrink-0 mt-1.5"></span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

              {/* Bottom Actions */}
            <div className={`pt-4 border-t flex flex-wrap items-center gap-3 ${
              isDark ? 'border-white/10' : 'border-slate-100'
            }`}>
              <a
                href={flagshipWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerConversionCelebration()}
                className="flex-1 py-3.5 px-6 rounded-xl sm:rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/35 hover:shadow-emerald-500/50 active:scale-95 transition-all text-center group"
              >
                <span className="relative flex h-3.5 w-3.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-slate-950"></span>
                </span>
                <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
                <span>{t.pricing.bookWhatsApp}</span>
              </a>

              <button
                onClick={() => {
                  triggerConversionCelebration();
                  onSelectPackage({
                    name: lang === 'ar' ? APP_CONFIG.introPackage.name : 'Starter 3-Page Package ($60)',
                    price: APP_CONFIG.introPackage.priceUSD,
                    description: lang === 'ar' ? 'الباقة الافتتاحية للمشاريع الصغيرة (3 صفحات)' : 'Small Business Starter Package (3 Pages)'
                  });
                }}
                className={`py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-white/10'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 shadow-sm'
                }`}
              >
                {t.pricing.fillForm}
              </button>
            </div>
          </motion.div>

          {/* Interactive Custom Quote Calculator */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between shadow-xl ${
              lang === 'ar' ? 'text-right' : 'text-left'
            } ${
              isDark 
                ? 'bg-[#0b1120] border-white/10' 
                : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-sky-500 font-bold text-sm">
                  <Calculator className="w-4 h-4 text-sky-500" />
                  <span>{t.pricing.calcTitle}</span>
                </div>
                {onOpenCalculatorPage && (
                  <button
                    onClick={onOpenCalculatorPage}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                      isDark
                        ? 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border-sky-500/30'
                        : 'bg-sky-50 hover:bg-sky-100 text-sky-600 border-sky-200'
                    }`}
                    title={lang === 'ar' ? 'فتح الحاسبة في صفحة كاملة مستقلة' : 'Open in dedicated full page'}
                  >
                    <span>{lang === 'ar' ? 'صفحة الحاسبة' : 'Full Page'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              <h4 className={`text-base sm:text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.pricing.calcHeadline}
              </h4>
              <p className={`text-xs mb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.pricing.calcSub}
              </p>

              {/* Step 1: Pages Selection */}
              <div className="mb-5">
                <label className={`text-xs font-bold block mb-2 flex items-center justify-between ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <span>{t.pricing.pagesCountLabel}</span>
                  <span className="text-sky-500 font-mono font-bold text-sm">
                    {pagesCount} {t.pricing.pagesWord}
                  </span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 5, 8].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setPagesCount(count)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        pagesCount === count
                          ? 'bg-sky-500 text-slate-950 font-black shadow-md shadow-sky-500/25'
                          : isDark
                            ? 'bg-slate-900 text-slate-300 border border-white/10 hover:border-white/20'
                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {count === 1 ? t.pricing.singleLanding : `${count} ${t.pricing.pagesWord}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Add-on Checkbox Options */}
              <div className="space-y-2.5 mb-6">
                <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.pricing.addonsLabel}
                </label>

                {/* Bilingual */}
                <label
                  onClick={() => setHasBilingual(!hasBilingual)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    hasBilingual
                      ? 'bg-sky-500/10 border-sky-400/50 text-sky-700 dark:text-white'
                      : isDark ? 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/15' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      hasBilingual ? 'bg-sky-500 border-sky-400 text-slate-950' : 'border-slate-400'
                    }`}>
                      {hasBilingual && <Check className="w-3 h-3" />}
                    </div>
                    <span>{t.pricing.bilingualOpt}</span>
                  </div>
                  <span className="font-mono text-sky-500 font-bold">+25$</span>
                </label>

                {/* Catalog / Menu */}
                <label
                  onClick={() => setHasProductCatalog(!hasProductCatalog)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    hasProductCatalog
                      ? 'bg-sky-500/10 border-sky-400/50 text-sky-700 dark:text-white'
                      : isDark ? 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/15' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      hasProductCatalog ? 'bg-sky-500 border-sky-400 text-slate-950' : 'border-slate-400'
                    }`}>
                      {hasProductCatalog && <Check className="w-3 h-3" />}
                    </div>
                    <span>{t.pricing.catalogOpt}</span>
                  </div>
                  <span className="font-mono text-sky-500 font-bold">+20$</span>
                </label>

                {/* Urgent Delivery */}
                <label
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    isUrgent
                      ? 'bg-sky-500/10 border-sky-400/50 text-sky-700 dark:text-white'
                      : isDark ? 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/15' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      isUrgent ? 'bg-sky-500 border-sky-400 text-slate-950' : 'border-slate-400'
                    }`}>
                      {isUrgent && <Check className="w-3 h-3" />}
                    </div>
                    <span>{t.pricing.urgentOpt}</span>
                  </div>
                  <span className="font-mono text-sky-500 font-bold">+30$</span>
                </label>

                {/* Domain Assistance */}
                <label
                  onClick={() => setHasDomainAssistance(!hasDomainAssistance)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    hasDomainAssistance
                      ? 'bg-sky-500/10 border-sky-400/50 text-sky-700 dark:text-white'
                      : isDark ? 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/15' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      hasDomainAssistance ? 'bg-sky-500 border-sky-400 text-slate-950' : 'border-slate-400'
                    }`}>
                      {hasDomainAssistance && <Check className="w-3 h-3" />}
                    </div>
                    <span>{t.pricing.domainOpt}</span>
                  </div>
                  <span className="font-mono text-sky-500 font-bold">+15$</span>
                </label>
              </div>

              {/* Dynamic Price Output Box */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 mb-5 ${
                isDark ? 'bg-slate-950 border-sky-500/30' : 'bg-slate-50 border-sky-200'
              }`}>
                <div>
                  <span className="text-[11px] text-slate-400 block">{t.pricing.estimatedTotal}</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-500 font-mono">
                    ${totalPriceUSD}
                    <span className="text-xs text-slate-400 font-sans mx-1">
                      (~{totalPriceSAR} {lang === 'ar' ? 'ريال' : 'SAR'})
                    </span>
                  </div>
                </div>
                <div className={`text-xs ${lang === 'ar' ? 'text-left' : 'text-right'}`}>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.pricing.estimatedTimeline}</div>
                  <div className="text-sky-500 font-medium">{getTimelineDays()}</div>
                </div>
              </div>
            </div>

            {/* Custom Order Action */}
            <div className={`pt-4 border-t space-y-2.5 ${
              isDark ? 'border-white/10' : 'border-slate-100'
            }`}>
              <motion.a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerConversionCelebration()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/35 hover:shadow-emerald-500/50 transition-all text-center group cursor-pointer"
              >
                <span className="relative flex h-3.5 w-3.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-slate-950"></span>
                </span>
                <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
                <span>{lang === 'ar' ? 'طلب التسعيرة المخصصة عبر واتساب' : 'Request Custom Scope via WhatsApp'}</span>
              </motion.a>

              <button
                type="button"
                onClick={() => {
                  triggerConversionCelebration();
                  onSelectPackage({
                    name: lang === 'ar' ? `باقة مخصصة (${pagesCount} صفحات)` : `Custom Plan (${pagesCount} Pages)`,
                    price: totalPriceUSD,
                    description: getCustomSummaryText()
                  });
                }}
                className={`w-full py-2.5 px-4 rounded-full font-semibold text-xs border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
                    : 'bg-slate-100/80 hover:bg-slate-200 text-slate-800 hover:text-slate-950 border-slate-200'
                }`}
              >
                {t.pricing.fillFormCustom}
              </button>
            </div>
          </motion.div>

        </div>

        {/* High-Converting ROI Simulator, Guarantees, & Payment Trust Area */}
        <div className="mt-14">
          <ConversionAssurance 
            lang={lang} 
            theme={theme} 
            onBookNow={() => {
              triggerConversionCelebration();
              onSelectPackage({
                name: lang === 'ar' ? APP_CONFIG.introPackage.name : 'Starter 3-Page Package ($60)',
                price: APP_CONFIG.introPackage.priceUSD,
                description: lang === 'ar' ? 'الباقة الافتتاحية مع ضمان الرضا الكامل 100%' : 'Starter Package with 100% Satisfaction Guarantee'
              });
            }} 
          />
        </div>

      </div>
    </section>
  );
};
