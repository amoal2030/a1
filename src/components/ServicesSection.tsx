import React from 'react';
import { APP_CONFIG, ServiceItem } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { Check, Clock, Sparkles, ArrowLeft, ArrowRight, Layers, Compass, UserCheck, Code } from 'lucide-react';
import { motion } from 'motion/react';
import { triggerConversionCelebration } from '../utils/confetti';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onExplorePricing: () => void;
  lang?: Language;
  theme?: Theme;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onExplorePricing,
  lang = 'ar',
  theme = 'dark'
}) => {
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  const getIcon = (id: string) => {
    switch (id) {
      case 'landing':
        return <Compass className="w-5 h-5 text-sky-500" />;
      case 'intro-3pages':
        return <Layers className="w-5 h-5 text-sky-500" />;
      case 'portfolio':
        return <UserCheck className="w-5 h-5 text-sky-500" />;
      default:
        return <Code className="w-5 h-5 text-sky-500" />;
    }
  };

  const getServiceInfo = (service: ServiceItem) => {
    if (lang === 'ar') return service;

    switch (service.id) {
      case 'landing':
        return {
          ...service,
          title: "Single Marketing Landing Page",
          badge: "For Ad Campaigns & Single Products",
          description: "A focused, high-conversion landing page crafted specifically to turn visitors into buyers with 1-click WhatsApp checkout.",
          idealFor: "Restaurants, Cafes, Course Launches, Single Products, Promo Campaigns",
          deliveryTime: "2 - 3 Days",
          highlights: [
            "Catchy design with 1-click direct ordering",
            "Clear Call to Action (CTA) to maximize conversion",
            "Direct integration with your business WhatsApp",
            "Ultra-fast loading speed & 100% mobile responsive"
          ]
        };
      case 'intro-3pages':
        return {
          ...service,
          title: "Complete Company Profile (3 Essential Pages)",
          badge: "Most Popular & Economical ⭐",
          description: "The ideal website to give your business credibility, featuring your brand story, services catalog, and direct contact flow.",
          idealFor: "Startups, Local Stores, Professional Offices, Clinics, Boutiques",
          deliveryTime: "3 - 5 Days",
          highlights: [
            "Elegant presentation of company story, team and services",
            "Organized services or products catalog with rich photos",
            "Interactive location map, working hours, and social links",
            "Custom inquiry & booking form connected to WhatsApp"
          ]
        };
      case 'portfolio':
        return {
          ...service,
          title: "Personal Career Portfolio Website",
          badge: "For Freelancers & Professionals",
          description: "A website that showcases your expertise, previous projects, and interactive CV with categorized project galleries.",
          idealFor: "Photographers, Designers, Engineers, Consultants, Developers, Artisans",
          deliveryTime: "3 - 4 Days",
          highlights: [
            "High-resolution fast image showcase with modal zoom",
            "Professional resume & skills section",
            "Project filtering by industry or work type",
            "Direct contact channels & professional links (LinkedIn / Behance)"
          ]
        };
      default:
        return {
          ...service,
          title: "Custom Tailored Web Solution",
          badge: "For Specialized Requirements",
          description: "A website with advanced custom features, interactive calculators, multi-page architectures, or broad product catalogs.",
          idealFor: "Projects needing price calculators, bilingual support, or > 4 pages",
          deliveryTime: "5 - 8 Days",
          highlights: [
            "Full Arabic & English bilingual support (RTL/LTR)",
            "Dynamic price estimators or multi-step booking forms",
            "Advanced interactive physics & animations",
            "Extended technical support & post-launch revisions"
          ]
        };
    }
  };

  return (
    <section id="services" className={`py-20 relative overflow-hidden transition-colors ${
      isDark ? 'bg-transparent' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`max-w-3xl mb-14 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <span className="text-xs font-bold text-sky-500 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20 inline-block">
            {t.services.kicker}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mt-3 mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.services.title}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {APP_CONFIG.services.map((rawService, index) => {
            const service = getServiceInfo(rawService);
            const isFeatured = service.id === 'intro-3pages';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group ${
                  lang === 'ar' ? 'text-right' : 'text-left'
                } ${
                  isFeatured
                    ? isDark
                      ? 'bg-gradient-to-b from-slate-900 to-[#0e172a] border-2 border-sky-400 shadow-xl shadow-sky-500/15 lg:-translate-y-2'
                      : 'bg-white border-2 border-sky-500 shadow-xl shadow-sky-100 lg:-translate-y-2'
                    : isDark
                      ? 'bg-[#0b1120] border border-white/10 hover:border-white/25 shadow-lg shadow-black/20 hover:shadow-black/40'
                      : 'bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-md shadow-slate-100 hover:shadow-lg'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className={`absolute -top-3.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 text-[11px] font-black shadow-md flex items-center gap-1 ${
                    lang === 'ar' ? 'right-6' : 'left-6'
                  }`}>
                    <Sparkles className="w-3 h-3 text-slate-950" />
                    <span>{t.services.featuredBadge}</span>
                  </div>
                )}

                <div>
                  {/* Meta Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                      isDark ? 'bg-slate-800/80 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      {getIcon(service.id)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      <span>{service.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 group-hover:text-sky-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {service.title}
                  </h3>

                  <div className="mb-3">
                    <span className="text-[11px] font-semibold text-sky-500 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-400/20 inline-block">
                      {service.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {service.description}
                  </p>

                  {/* Ideal For */}
                  <div className={`p-2.5 rounded-xl border text-xs mb-5 leading-normal ${
                    isDark ? 'bg-slate-950/60 border-white/5 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      {lang === 'ar' ? 'مناسب لـ: ' : 'Ideal for: '}
                    </span>
                    {service.idealFor}
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2.5 mb-6">
                    <div className={`text-xs font-bold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'ar' ? 'أبرز ما تشمله الخدمة:' : 'Key Inclusions:'}
                    </div>
                    {service.highlights.map((highlight, idx) => (
                      <div key={idx} className={`flex items-start gap-2 text-xs leading-normal ${
                        isDark ? 'text-slate-300' : 'text-slate-700 font-medium'
                      }`}>
                        <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-500 shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Price & Action */}
                <div className={`pt-4 border-t flex items-center justify-between gap-3 mt-auto ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">{t.services.startFrom}</span>
                    <div className={`text-xl sm:text-2xl font-black font-mono flex items-baseline gap-1 ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      <span className={isFeatured ? 'text-sky-600 dark:text-sky-400' : 'text-emerald-600 dark:text-emerald-400'}>
                        {service.startingPriceUSD}$
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans font-normal">
                        (~{Math.round(service.startingPriceUSD * 3.75)} {lang === 'ar' ? 'ر.س' : 'SAR'})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      triggerConversionCelebration();
                      onSelectService(service.id);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 whitespace-nowrap ${
                      isFeatured
                        ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-black shadow-md shadow-sky-500/20'
                        : isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10'
                          : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 shadow-sm'
                    }`}
                  >
                    <span>{t.services.orderBtn}</span>
                    {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner to Pricing details */}
        <div className={`mt-12 p-4 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          lang === 'ar' ? 'text-right' : 'text-left'
        } ${
          isDark 
            ? 'bg-gradient-to-r from-sky-500/10 via-slate-900 to-emerald-500/10 border-white/10' 
            : 'bg-gradient-to-r from-sky-50 via-white to-emerald-50 border-slate-200 shadow-sm'
        }`}>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.services.calculatorBannerTitle}
            </h4>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.services.calculatorBannerSub}
            </p>
          </div>
          <button
            onClick={onExplorePricing}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white border-white/15' 
                : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
            }`}
          >
            {t.services.calculatorBannerBtn}
          </button>
        </div>

      </div>
    </section>
  );
};
