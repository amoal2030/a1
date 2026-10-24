import React, { useState } from 'react';
import { Language, Theme } from '../data/translations';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  CreditCard, 
  Lock, 
  Zap, 
  HelpCircle,
  ThumbsUp,
  Clock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { triggerConversionCelebration } from '../utils/confetti';

interface ConversionAssuranceProps {
  lang?: Language;
  theme?: Theme;
  onBookNow?: () => void;
}

export const ConversionAssurance: React.FC<ConversionAssuranceProps> = ({
  lang = 'ar',
  theme = 'dark',
  onBookNow
}) => {
  const isDark = theme === 'dark';
  const [ticketValue, setTicketValue] = useState<number>(150); // average client order value in SAR

  // How many clients to break even on 60 USD (~225 SAR)?
  const websiteCostSAR = 225;
  const breakEvenClients = Math.max(1, Math.ceil(websiteCostSAR / ticketValue));

  const handleActionClick = () => {
    triggerConversionCelebration();
    if (onBookNow) onBookNow();
  };

  return (
    <div className={`rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-[#0c1424] via-[#090e1a] to-[#070b14] border-sky-500/30 shadow-sky-500/10' 
        : 'bg-gradient-to-b from-white via-sky-50/40 to-white border-sky-300 shadow-xl shadow-sky-100/80'
    }`}>
      {/* Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Banner: Urgency & High Confidence */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-sky-500/20 mb-8 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
          <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            {lang === 'ar' ? 'استثمار ذكي يغطي تكلفته في أيام معدودة' : 'High ROI investment that pays for itself in days'}
          </span>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
          isDark 
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
            : 'bg-amber-100/80 text-amber-900 border-amber-300'
        }`}>
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{lang === 'ar' ? 'متبقي 3 مقاعد تسليم فوري لهذا الأسبوع' : 'Only 3 express delivery slots open this week'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Interactive ROI Simulator */}
        <div className={`lg:col-span-7 space-y-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-400/20 mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'محاكي العائد على استثمارك' : 'Live Investment ROI Simulator'}</span>
            </div>
            
            <h3 className={`text-xl sm:text-2xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {lang === 'ar' 
                ? 'كم عميل يحتاج موقعك الجديد ليغطي تكلفته بالكامل؟' 
                : 'How many customers does your new website need to break even?'}
            </h3>
            
            <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {lang === 'ar'
                ? 'المواقع الاحترافية ليست تكلفة بل ماكينة لجلب المبيعات والعملاء. حرك المؤشر أدناه لتشاهد سرعة استردادك لمبلغ الـ 60 دولار (~225 ريال):'
                : 'A professional website is a sales magnet, not an expense. Adjust your average order value to see how quickly you recover the $60 (~225 SAR):'}
            </p>
          </div>

          {/* Interactive Slider Box */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-slate-900/80 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {lang === 'ar' ? 'متوسط قيمة الطلب أو العميل لديك:' : 'Average customer purchase value:'}
              </label>
              <span className="text-base font-black text-sky-600 dark:text-sky-400 font-mono">
                {ticketValue} {lang === 'ar' ? 'ريال' : 'SAR'}
              </span>
            </div>

            <input
              type="range"
              min="50"
              max="500"
              step="25"
              value={ticketValue}
              onChange={(e) => setTicketValue(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />

            <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mt-2 font-mono">
              <span>50 {lang === 'ar' ? 'ريال' : 'SAR'}</span>
              <span>250 {lang === 'ar' ? 'ريال' : 'SAR'}</span>
              <span>500 {lang === 'ar' ? 'ريال' : 'SAR'}</span>
            </div>

            {/* Dynamic Result Ticker */}
            <div className={`mt-4 p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDark 
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
                : 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold">
                    {lang === 'ar' ? 'النتيجة المباشرة:' : 'Direct Outcome:'}
                  </div>
                  <div className="text-sm sm:text-base font-black">
                    {lang === 'ar'
                      ? `تحتاج فقط ${breakEvenClients} ${breakEvenClients === 1 ? 'عميل واحد' : 'عملاء'} لتغطية تكلفة الموقع بالكامل!`
                      : `You only need ${breakEvenClients} customer${breakEvenClients > 1 ? 's' : ''} to recover 100% of the cost!`}
                  </div>
                </div>
              </div>

              <div className={`text-center sm:text-left px-3 py-1.5 rounded-lg font-mono text-xs font-black ${
                isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-200/70 text-emerald-900'
              }`}>
                {lang === 'ar' ? 'العائد: 100% وأكثر 🚀' : 'ROI: 100%+ 🚀'}
              </div>
            </div>
          </div>

          {/* Golden 100% Risk-Free Guarantee */}
          <div className={`p-4 sm:p-5 rounded-2xl border relative overflow-hidden ${
            isDark 
              ? 'bg-amber-500/10 border-amber-400/30' 
              : 'bg-amber-50 border-amber-300 shadow-sm'
          }`}>
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 animate-pulse-glow">
                <ShieldCheck className="w-6 h-6 text-slate-950" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm sm:text-base font-black ${isDark ? 'text-amber-300' : 'text-amber-950'}`}>
                    {lang === 'ar' ? 'ضمان الرضا بلا مخاطر (100% Risk-Free)' : '100% Risk-Free Satisfaction Guarantee'}
                  </h4>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-amber-100/90' : 'text-amber-900'}`}>
                  {lang === 'ar'
                    ? 'نحن نثق بجودة عملنا: نبدأ بدفعة مبدئية رمزية لتأكيد الجدية، ولا يتم دفع المبلغ النهائي إلا بعد معاينة الموقع وتجربته على هاتفك وإعجابك به بالكامل!'
                    : 'Zero risk to you: we start with a modest initial deposit, and the final payment is due only after you inspect and approve the live working site on your phone!'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Methods, Trust Seals & Instant Action */}
        <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          
          <div className={`p-6 rounded-3xl border ${
            isDark ? 'bg-slate-900/90 border-white/10' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 mb-4">
              <Lock className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طرق دفع معتمدة وسريعة' : 'Accepted Fast & Secure Payment Options'}</span>
            </div>

            {/* Payment Method Badges with Micro-interactions */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {[
                { name: 'مدى (Mada)', bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400' },
                { name: 'Apple Pay ', bg: 'bg-slate-500/10 border-slate-500/30 text-slate-800 dark:text-slate-200' },
                { name: 'Visa / MC', bg: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400' },
                { name: 'تحويل بنكي', bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-400' },
                { name: 'STC Pay', bg: 'bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400' },
                { name: 'PayPal', bg: 'bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-400' },
              ].map((method, idx) => (
                <div
                  key={idx}
                  className={`py-2 px-2.5 rounded-xl border text-[11px] font-bold text-center transition-all hover:scale-105 select-none ${method.bg}`}
                >
                  {method.name}
                </div>
              ))}
            </div>

            {/* High-Trust Checklist */}
            <div className="space-y-2 mb-6">
              {[
                lang === 'ar' ? 'بدون أي اشتراكات استضافة شهرية مخفية' : 'Zero hidden monthly hosting subscriptions',
                lang === 'ar' ? 'تسليم سريع في 3 إلى 5 أيام عمل' : 'Fast delivery in 3 to 5 business days',
                lang === 'ar' ? 'دعم فني وتعديلات مجانية بعد الإطلاق' : 'Free post-launch updates and guidance',
                lang === 'ar' ? 'كود خفيف وسريع ومتوافق مع جوجل (SEO)' : 'Ultra-fast clean code optimized for Google SEO',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Instant Excitement Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleActionClick}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 cursor-pointer active:scale-95 transition-all text-center group"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{lang === 'ar' ? 'ابدأ موقعك الآن واحصل على الضمان الكامل' : 'Start Your Website Now with Full Guarantee'}</span>
              {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </motion.button>

            <div className="text-center mt-2.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {lang === 'ar' ? '⚡ نقوم بالتواصل معك فوراً لمناقشة أفكار موقعك' : '⚡ We reach out promptly to review your website goals'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
