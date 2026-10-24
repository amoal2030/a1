import React, { useState } from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  Globe, 
  Zap, 
  FileText, 
  Layers, 
  Plus, 
  Minus,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { ConversionAssurance } from './ConversionAssurance';
import { triggerConversionCelebration } from '../utils/confetti';

interface CalculatorPageProps {
  onBackToHome: () => void;
  onOpenOrderForm?: (summary: string) => void;
  lang?: Language;
  theme?: Theme;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onBackToHome,
  onOpenOrderForm,
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
  const [businessName, setBusinessName] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState(false);

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
    if (hasProductCatalog) addons.push(lang === 'ar' ? 'كتالوج تفاعلي' : 'Interactive Catalog');
    if (isUrgent) addons.push(lang === 'ar' ? 'تسليم عاجل (48-72 ساعة)' : 'Express 48-72h');
    if (hasDomainAssistance) addons.push(lang === 'ar' ? 'مساعدة ربط الدومين' : 'Domain Setup');
    
    return lang === 'ar'
      ? `موقع مخصص من ${pagesCount} صفحات ${addons.length > 0 ? `مع (${addons.join('، ')})` : ''} بسعر إجمالي ${totalPriceUSD}$ (~${totalPriceSAR} ريال).`
      : `Custom website with ${pagesCount} pages ${addons.length > 0 ? `plus (${addons.join(', ')})` : ''} at $${totalPriceUSD} (~${totalPriceSAR} SAR).`;
  };

  const phone = APP_CONFIG.contact.whatsAppNumber;
  const customWhatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، قمت بتحديد متطلبات موقعي عبر صفحة حاسبة الأسعار:\n${businessName ? `- اسم النشاط: ${businessName}\n` : ''}- عدد الصفحات: ${pagesCount} صفحات\n- لغتين: ${hasBilingual ? 'نعم' : 'لا'}\n- كتالوج تفاعلي: ${hasProductCatalog ? 'نعم' : 'لا'}\n- تسليم عاجل: ${isUrgent ? 'نعم' : 'لا'}\n- مساعدة الدومين: ${hasDomainAssistance ? 'نعم' : 'لا'}\n- السعر التقديري: ${totalPriceUSD}$ (~${totalPriceSAR} ر.س)\n- المدة: ${getTimelineDays()}\nأود مناقشة البدء والتنفيذ.`
      : `Hello, I configured my website scope via your dedicated Price Calculator page:\n${businessName ? `- Business: ${businessName}\n` : ''}- Pages: ${pagesCount} pages\n- Bilingual: ${hasBilingual ? 'Yes' : 'No'}\n- Interactive Catalog: ${hasProductCatalog ? 'Yes' : 'No'}\n- Express Delivery: ${isUrgent ? 'Yes' : 'No'}\n- Domain Setup: ${hasDomainAssistance ? 'Yes' : 'No'}\n- Estimated Price: $${totalPriceUSD} (~${totalPriceSAR} SAR)\n- Estimated Timeline: ${getTimelineDays()}\nI would like to discuss and get started.`
  )}`;

  const handleCopySummary = () => {
    const summary = getCustomSummaryText();
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors ${
      lang === 'ar' ? 'text-right' : 'text-left'
    }`}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Breadcrumb & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-dashed border-slate-200 dark:border-white/10">
          <button
            onClick={onBackToHome}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
            }`}
          >
            {lang === 'ar' ? <ArrowRight className="w-4 h-4 text-sky-500" /> : <ArrowLeft className="w-4 h-4 text-sky-500" />}
            <span>{t.nav.backToHome}</span>
          </button>

          {/* Page Badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{lang === 'ar' ? 'حاسبة تكلفة المشاريع التفاعلية' : 'Interactive Project Cost Calculator'}</span>
          </div>
        </div>

        {/* Hero Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-500 border border-sky-500/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'حاسبة شفافة 100% دون تكاليف خفية' : '100% Transparent Instant Pricing'}</span>
          </div>
          <h1 className={`text-2xl sm:text-4xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {lang === 'ar' ? 'احسب تكلفة موقعك بدقة وبنقرة زر' : 'Calculate Your Website Cost Instantly'}
          </h1>
          <p className={`text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {lang === 'ar'
              ? 'حدّد عدد الصفحات والمزايا التقنية التي تناسب نشاطك التجاري، واعرف التكلفة التقديرية بالدولار والريال مع مدة التسليم المتوقعة وإمكانية الحجز المباشر عبر واتساب.'
              : 'Choose the number of pages and custom features for your business, and receive an instant estimate in USD & SAR with accurate turnaround time and direct WhatsApp booking.'}
          </p>
        </div>

        {/* Main Grid: Configurator + Live Price Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Options (7 Cols) */}
          <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6 ${
            isDark 
              ? 'bg-[#0b1222]/90 border-white/10' 
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            
            {/* Business Name Field (Optional) */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ar' ? 'اسم نشاطك التجاري (اختياري لتخصيص العرض):' : 'Business Name (Optional):'}
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: متجر الزهور، مقهى النخيل، عيادة الأمل...' : 'e.g., Blossom Cafe, Acme Tech...'}
                className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none ${
                  isDark
                    ? 'bg-slate-900/80 border-white/10 text-white placeholder-slate-500 focus:border-sky-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                }`}
              />
            </div>

            {/* Pages Count Slider & Stepper */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/60 border-white/5' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ar' ? '1. عدد صفحات الموقع' : '1. Number of Website Pages'}
                  </h3>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {lang === 'ar' ? '(الصفحة الأولى 40$، 3 صفحات 60$، وأي صفحة إضافية بـ 15$ فقط)' : '($40 for 1 page, $60 for 3 pages, $15/extra page)'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPagesCount(Math.max(1, pagesCount - 1))}
                    disabled={pagesCount <= 1}
                    className="p-1.5 rounded-lg bg-sky-500/20 text-sky-500 hover:bg-sky-500/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className={`text-base font-black px-3 py-1 rounded-lg border ${
                    isDark ? 'bg-slate-800 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}>
                    {pagesCount} {lang === 'ar' ? 'صفحات' : 'pages'}
                  </span>
                  <button
                    onClick={() => setPagesCount(Math.min(15, pagesCount + 1))}
                    disabled={pagesCount >= 15}
                    className="p-1.5 rounded-lg bg-sky-500/20 text-sky-500 hover:bg-sky-500/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[
                  { count: 1, label: lang === 'ar' ? 'صفحة هبوط (1)' : 'Landing (1)' },
                  { count: 3, label: lang === 'ar' ? 'الباقة الأساسية (3)' : 'Starter (3)', featured: true },
                  { count: 5, label: lang === 'ar' ? 'مؤسسي (5)' : 'Company (5)' },
                  { count: 7, label: lang === 'ar' ? 'شامل (7)' : 'Expanded (7)' }
                ].map((item) => (
                  <button
                    key={item.count}
                    onClick={() => setPagesCount(item.count)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      pagesCount === item.count
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                        : isDark
                          ? 'bg-slate-800/80 border-white/5 text-slate-300 hover:bg-slate-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Add-ons Checkboxes */}
            <div className="space-y-3">
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ar' ? '2. المزايا والترقيات الإضافية (اختياري)' : '2. Add-on Features & Upgrades'}
              </h3>

              <div className="space-y-2.5">
                {/* Bilingual Toggle */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  hasBilingual
                    ? isDark ? 'bg-sky-500/10 border-sky-500/40' : 'bg-sky-50/80 border-sky-300'
                    : isDark ? 'bg-slate-900/40 border-white/5 hover:border-white/15' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={hasBilingual}
                    onChange={(e) => setHasBilingual(e.target.checked)}
                    className="mt-0.5 rounded text-sky-500 focus:ring-sky-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'ar' ? 'دعم لغتين (عربي + إنجليزي)' : 'Bilingual Support (Arabic + English)'}
                      </span>
                      <span className="text-xs font-black text-sky-500">+25$</span>
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lang === 'ar' ? 'مبدل لغة ذكي كامل النصوص والأزرار وتنسيق RTL و LTR تلقائي.' : 'Full UI translations switcher with RTL/LTR dynamic flip.'}
                    </p>
                  </div>
                </label>

                {/* Interactive Product Catalog / Menu */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  hasProductCatalog
                    ? isDark ? 'bg-sky-500/10 border-sky-500/40' : 'bg-sky-50/80 border-sky-300'
                    : isDark ? 'bg-slate-900/40 border-white/5 hover:border-white/15' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={hasProductCatalog}
                    onChange={(e) => setHasProductCatalog(e.target.checked)}
                    className="mt-0.5 rounded text-sky-500 focus:ring-sky-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'ar' ? 'كتالوج منتجات / منيو تفاعلي مع فلترة' : 'Interactive Product Catalog / Menu with Filter'}
                      </span>
                      <span className="text-xs font-black text-sky-500">+20$</span>
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lang === 'ar' ? 'عرض الأصناف مع أسعار وصور وتصنيفات وزر طلب سريع لكل منتج.' : 'Showcase items with categories, prices, images, and WhatsApp ordering.'}
                    </p>
                  </div>
                </label>

                {/* Urgent Express Delivery */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isUrgent
                    ? isDark ? 'bg-amber-500/10 border-amber-500/40' : 'bg-amber-50/80 border-amber-300'
                    : isDark ? 'bg-slate-900/40 border-white/5 hover:border-white/15' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'ar' ? 'تسليم عاجل ومكثف (48 إلى 72 ساعة)' : 'Express Priority Delivery (48 to 72 Hours)'}
                      </span>
                      <span className="text-xs font-black text-amber-500">+30$</span>
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lang === 'ar' ? 'أولوية برمجية قصوى والعمل المتواصل لتسليم الموقع في وقت قياسي.' : 'Highest priority dev track to launch your project in record time.'}
                    </p>
                  </div>
                </label>

                {/* Domain Setup */}
                <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  hasDomainAssistance
                    ? isDark ? 'bg-sky-500/10 border-sky-500/40' : 'bg-sky-50/80 border-sky-300'
                    : isDark ? 'bg-slate-900/40 border-white/5 hover:border-white/15' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={hasDomainAssistance}
                    onChange={(e) => setHasDomainAssistance(e.target.checked)}
                    className="mt-0.5 rounded text-sky-500 focus:ring-sky-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'ar' ? 'مساعدة في شراء وربط الدومين (DNS)' : 'Domain Purchase & DNS Linking Assistance'}
                      </span>
                      <span className="text-xs font-black text-sky-500">+15$</span>
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lang === 'ar' ? 'إعداد سجلات DNS وحماية SSL المجانية وضمان تشغيل الموقع على نطاقك الخاص.' : 'Full DNS records configuration, free SSL, and domain launch verification.'}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Standard Included Features (Free) */}
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              isDark ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50/60 border-emerald-200'
            }`}>
              <div className="font-bold text-emerald-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'مزايا أساسية مشمولة مجاناً في كل موقع ($0):' : 'Included by Default for Free ($0):'}</span>
              </div>
              <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'ar' ? 'زر واتساب مباشر لاستقبال الطلبات' : 'Direct WhatsApp customer booking'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'ar' ? 'تجاوب كامل 100% مع الجوال والكمبيوتر' : '100% Mobile & Desktop responsiveness'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'ar' ? 'استضافة مجانية سريعة دون اشتراك شهري' : 'Free lightning-fast hosting, no monthly fees'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'ar' ? 'تسليم الكود المصدري كاملاً' : 'Full source code ownership'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary Card & Direct Booking (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className={`rounded-3xl p-6 sm:p-7 border shadow-2xl relative overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-b from-slate-900 to-[#070b14] border-white/15' 
                : 'bg-white border-slate-200 shadow-slate-200/60'
            }`}>
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {lang === 'ar' ? 'التسعيرة التقديرية الفورية' : 'Instant Estimated Quote'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {lang === 'ar' ? 'سعر نهائي ثابت' : 'Fixed No Surprises'}
                  </span>
                </div>

                {/* Big Price Display */}
                <div className="text-center py-2 space-y-1">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                      ${totalPriceUSD}
                    </span>
                    <span className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lang === 'ar' ? 'دولار أمريكي' : 'USD'}
                    </span>
                  </div>
                  <div className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    ≈ {totalPriceSAR} {lang === 'ar' ? 'ريال سعودي تقريباً' : 'SAR approx'}
                  </div>
                </div>

                {/* Timeline Box */}
                <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
                  isDark ? 'bg-slate-800/80 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}>
                  <Clock className="w-4 h-4 text-sky-500 shrink-0" />
                  <div>
                    <span className="font-semibold block">{lang === 'ar' ? 'مدة التسليم المقدرة:' : 'Estimated Delivery Time:'}</span>
                    <span className="font-bold text-sky-400">{getTimelineDays()}</span>
                  </div>
                </div>

                {/* Specs List */}
                <div className="space-y-2 text-xs pt-1">
                  <div className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {lang === 'ar' ? 'ملخص المواصفات المحددة:' : 'Selected Scope Summary:'}
                  </div>
                  <ul className={`space-y-1.5 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                      <span>{pagesCount} {lang === 'ar' ? 'صفحات ويب مصممة خصيصاً' : 'custom tailored web pages'}</span>
                    </li>
                    {hasBilingual && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                        <span>{lang === 'ar' ? 'واجهة ثنائية اللغة (عربي / إنجليزي)' : 'Bilingual Interface (AR / EN)'}</span>
                      </li>
                    )}
                    {hasProductCatalog && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                        <span>{lang === 'ar' ? 'كتالوج منتجات / منيو تفاعلي' : 'Interactive Products / Menu Catalog'}</span>
                      </li>
                    )}
                    {isUrgent && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{lang === 'ar' ? 'مسار تسليم سريع ذو أولوية' : 'Express fast-track delivery'}</span>
                      </li>
                    )}
                    {hasDomainAssistance && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                        <span>{lang === 'ar' ? 'ربط وإعداد اسم النطاق (الدومين)' : 'Domain name setup & DNS'}</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Actions: Primary WhatsApp (matching aside > a) & Form Booking */}
                <div className="pt-3 space-y-2.5">
                  <motion.a
                    href={customWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => triggerConversionCelebration()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 px-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer relative overflow-hidden group"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
                    </span>
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>{lang === 'ar' ? 'إرسال هذه المواصفات عبر واتساب' : 'Send Quote via WhatsApp'}</span>
                  </motion.a>

                  <button
                    onClick={handleCopySummary}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      copiedSummary
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : isDark
                          ? 'bg-slate-800/70 text-slate-300 border-white/10 hover:text-white hover:bg-slate-800'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? (lang === 'ar' ? 'تم نسخ المواصفات بنجاح!' : 'Quote Copied!') : (lang === 'ar' ? 'نسخ ملخص التسعيرة' : 'Copy Quote Text')}</span>
                  </button>
                </div>

                {/* Guarantee Banner */}
                <div className="pt-2 text-[11px] text-center text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{lang === 'ar' ? 'معاينة تجريبية للموقع وضمان الرضا قبل الدفع النهائي' : 'Live demo preview & 100% satisfaction before final payment'}</span>
                </div>
              </div>
            </div>

            {/* Comparison Callout: 60$ Starter Package */}
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              isDark ? 'bg-sky-500/10 border-sky-500/20' : 'bg-sky-50/80 border-sky-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-black text-sky-600 dark:text-sky-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'أو ابدأ بالباقة الافتتاحية ($60)' : 'Or Starter Flagship ($60)'}
                </span>
                <span className="font-bold text-xs text-sky-600 dark:text-sky-400">$60 / 225 ر.س</span>
              </div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
                {lang === 'ar'
                  ? 'إذا كنت تريد بداية سريعة بأقل ميزانية ممكنة، تشمل 3 صفحات عصرية جاهزة خلال 3-5 أيام.'
                  : 'Looking for the fastest launch at minimum budget? Get 3 responsive pages delivered in 3-5 days.'}
              </p>
              <button
                onClick={onBackToHome}
                className="text-[11px] font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'معاينة تفاصيل الباقة في الرئيسية' : 'View Flagship Package Details'}</span>
                {lang === 'ar' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
              </button>
            </div>

          </div>

        </div>

        {/* Conversion & Pay-Readiness Assurance Widget */}
        <div className="pt-4">
          <ConversionAssurance 
            lang={lang} 
            theme={theme} 
            onBookNow={() => {
              triggerConversionCelebration();
              if (onOpenOrderForm) {
                onOpenOrderForm(getCustomSummaryText());
              }
            }} 
          />
        </div>

      </div>
    </div>
  );
};
