import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { 
  MessageCircle, 
  Copy, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerConversionCelebration } from '../utils/confetti';

interface ContactSectionProps {
  initialService?: string;
  prefillDescription?: string;
  onShowToast: (message: string) => void;
  lang?: Language;
  theme?: Theme;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = 'intro-3pages',
  prefillDescription = '',
  onShowToast,
  lang = 'ar',
  theme = 'dark'
}) => {
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  const [clientName, setClientName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [selectedService, setSelectedService] = useState(initialService);
  const [preferredTimeline, setPreferredTimeline] = useState('standard');
  const [projectDetails, setProjectDetails] = useState(prefillDescription);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const phone = APP_CONFIG.contact.whatsAppNumber;

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (prefillDescription) {
      setProjectDetails(prefillDescription);
    }
  }, [prefillDescription]);

  const getEstimatedPrice = () => {
    switch (selectedService) {
      case 'landing':
        return lang === 'ar' ? '40$ (حوالي 150 ريال)' : '$40 (approx 150 SAR)';
      case 'intro-3pages':
        return lang === 'ar' ? '60$ (حوالي 225 ريال - الباقة الافتتاحية)' : '$60 (Starter Flagship - 225 SAR)';
      case 'portfolio':
        return lang === 'ar' ? '50$ (حوالي 190 ريال)' : '$50 (approx 190 SAR)';
      case 'custom':
        return lang === 'ar' ? 'حسب المواصفات (يبدأ من 90$)' : 'Custom Scope (From $90)';
      default:
        return '$60';
    }
  };

  const getServiceLabel = () => {
    const s = APP_CONFIG.services.find(item => item.id === selectedService);
    if (!s) return 'Flagship 3-Page Package ($60)';
    return s.title;
  };

  const getTimelineLabel = () => {
    switch (preferredTimeline) {
      case 'standard':
        return lang === 'ar' ? 'اعتيادي (3 إلى 5 أيام عمل)' : 'Standard (3 to 5 Business Days)';
      case 'urgent':
        return lang === 'ar' ? 'عاجل ومكثف (48 إلى 72 ساعة)' : 'Express (48 to 72 Hours)';
      case 'flexible':
        return lang === 'ar' ? 'مرن (خلال أسبوع إلى 10 أيام)' : 'Flexible (Within 10 Days)';
      default:
        return 'Standard';
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!clientName.trim() || clientName.trim().length < 2) {
      newErrors.clientName = lang === 'ar' 
        ? 'يرجى كتابة الاسم أو اسم النشاط التجاري.' 
        : 'Please enter your name or business name.';
    }
    if (!projectDetails.trim() || projectDetails.trim().length < 5) {
      newErrors.projectDetails = lang === 'ar' 
        ? 'يرجى كتابة نبذة مختصرة عن فكرة موقعك والمطلوب.' 
        : 'Please describe what you would like to showcase on your website.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildFormattedMessage = () => {
    return [
      `🌟 ${lang === 'ar' ? 'طلب تصميم موقع جديد' : 'New Website Request'} - ${t.siteName}`,
      `---------------------------------------`,
      `${lang === 'ar' ? '👤 اسم العميل:' : '👤 Client Name:'} ${clientName}`,
      `${lang === 'ar' ? '🏢 نوع النشاط:' : '🏢 Business Type:'} ${businessType || (lang === 'ar' ? 'مشروع تجاري' : 'Business')}`,
      `${lang === 'ar' ? '📦 الخدمة المطلوبة:' : '📦 Service:'} ${getServiceLabel()}`,
      `${lang === 'ar' ? '⏱ الموعد المفضل:' : '⏱ Timeline:'} ${getTimelineLabel()}`,
      `${lang === 'ar' ? '💰 التكلفة التقديرية:' : '💰 Estimated Cost:'} ${getEstimatedPrice()}`,
      `---------------------------------------`,
      `${lang === 'ar' ? '📝 تفاصيل ومتطلبات المشروع:' : '📝 Project Details:'}`,
      `${projectDetails}`,
      `---------------------------------------`,
      lang === 'ar' ? `تم إرسال هذا الطلب عبر منصة "${t.siteName}"` : `Sent via "${t.siteName}" platform`
    ].join('\n');
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    triggerConversionCelebration();
    const fullMessage = buildFormattedMessage();
    const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;

    window.open(targetUrl, '_blank');
    setIsSubmitted(true);
    onShowToast(lang === 'ar' ? 'تم فتح واتساب مع ملخص طلبك بنجاح!' : 'WhatsApp opened with your request details!');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fullMessage = buildFormattedMessage();
    const email = APP_CONFIG.contact.email;
    const subject = encodeURIComponent(`${lang === 'ar' ? 'طلب موقع جديد' : 'New Website Order'} - ${clientName}`);
    const body = encodeURIComponent(fullMessage);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    onShowToast(lang === 'ar' ? 'تم فتح تطبيق البريد لإرسال طلبك.' : 'Mail app opened.');
  };

  const handleCopyDetails = () => {
    if (!validate()) return;

    const fullMessage = buildFormattedMessage();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullMessage)
        .then(() => onShowToast(lang === 'ar' ? 'تم نسخ تفاصيل الطلب بنجاح إلى الحافظة!' : 'Order details copied to clipboard!'))
        .catch(() => fallbackCopy(fullMessage));
    } else {
      fallbackCopy(fullMessage);
    }
  };

  const fallbackCopy = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    onShowToast(lang === 'ar' ? 'تم نسخ تفاصيل الطلب بنجاح!' : 'Details copied!');
  };

  return (
    <section id="contact" className={`py-20 relative transition-colors ${
      isDark ? 'bg-transparent' : 'bg-slate-100/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`max-w-3xl mb-14 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <span className="text-xs font-bold text-sky-500 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20 inline-block">
            {t.contact.kicker}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mt-3 mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.contact.title}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t.contact.subtitle}
          </p>
        </div>

        {/* Form and Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Order Form */}
          <div className={`lg:col-span-7 border rounded-3xl p-6 sm:p-8 shadow-xl ${
            lang === 'ar' ? 'text-right' : 'text-left'
          } ${
            isDark 
              ? 'bg-[#0b1120] border-white/10 shadow-black/20' 
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            <div className={`mb-6 pb-4 border-b flex items-center justify-between ${
              isDark ? 'border-white/10' : 'border-slate-100'
            }`}>
              <div>
                <h3 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>{t.contact.formTitle}</span>
                </h3>
                <span className="text-xs text-slate-400 mt-1 block">
                  {t.contact.formSub}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                {t.contact.responseBadge}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success Card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-6 rounded-2xl border text-center space-y-4 my-6 ${
                    isDark ? 'bg-emerald-500/10 border-emerald-400/30' : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-black shadow-lg shadow-emerald-500/25">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-300">
                    {t.contact.successTitle.replace('{name}', clientName || (lang === 'ar' ? 'عزيزي العميل' : 'Valued Client'))}
                  </h4>
                  <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {t.contact.successDesc}
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                    >
                      {t.contact.resetBtn}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Main Form */
                <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
                  
                  {/* Row 1: Name and Business Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.contact.clientNameLabel} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder={t.contact.clientNamePlaceholder}
                        className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border transition-colors outline-none ${
                          isDark 
                            ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                            : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500 focus:bg-white'
                        } ${errors.clientName ? 'border-red-500' : ''}`}
                      />
                      {errors.clientName && (
                        <span className="text-[11px] text-red-500 mt-1 block flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.clientName}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.contact.businessTypeLabel}
                      </label>
                      <input
                        type="text"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        placeholder={t.contact.businessTypePlaceholder}
                        className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border transition-colors outline-none ${
                          isDark 
                            ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                            : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 2: Service Choice and Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.contact.serviceLabel}
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border transition-colors outline-none cursor-pointer ${
                          isDark 
                            ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                            : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500 focus:bg-white'
                        }`}
                      >
                        <option value="intro-3pages">
                          {lang === 'ar' ? 'موقع تعريفي متكامل (3 صفحات - 60$ ⭐)' : 'Company Profile (3 Pages - $60 ⭐)'}
                        </option>
                        <option value="landing">
                          {lang === 'ar' ? 'صفحة هبوط تسويقية (Landing Page - 40$)' : 'Single Landing Page ($40)'}
                        </option>
                        <option value="portfolio">
                          {lang === 'ar' ? 'موقع معرض أعمال شخصي (Portfolio - 50$)' : 'Personal Portfolio ($50)'}
                        </option>
                        <option value="custom">
                          {lang === 'ar' ? 'حل برمجي مخصص ومتعدد اللغات (Custom)' : 'Custom Tailored Solution'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {t.contact.timelineLabel}
                      </label>
                      <select
                        value={preferredTimeline}
                        onChange={(e) => setPreferredTimeline(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border transition-colors outline-none cursor-pointer ${
                          isDark 
                            ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                            : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500 focus:bg-white'
                        }`}
                      >
                        <option value="standard">
                          {lang === 'ar' ? 'تسليم اعتيادي قياسي (3 إلى 5 أيام عمل)' : 'Standard (3 to 5 Business Days)'}
                        </option>
                        <option value="urgent">
                          {lang === 'ar' ? 'تسليم عاجل ومكثف (48 إلى 72 ساعة)' : 'Express Urgent (48 to 72 Hours)'}
                        </option>
                        <option value="flexible">
                          {lang === 'ar' ? 'تسليم مرن وغير مستعجل (أسبوع فأكثر)' : 'Flexible Timeline'}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Project Details */}
                  <div>
                    <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t.contact.detailsLabel} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder={t.contact.detailsPlaceholder}
                      className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border transition-colors outline-none resize-none ${
                        isDark 
                          ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                          : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500 focus:bg-white'
                      } ${errors.projectDetails ? 'border-red-500' : ''}`}
                    ></textarea>
                    {errors.projectDetails && (
                      <span className="text-[11px] text-red-500 mt-1 block flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.projectDetails}
                      </span>
                    )}
                  </div>

                  {/* Estimated Cost Display Banner */}
                  <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                    isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {t.contact.costEstLabel}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-emerald-500 font-mono">
                      {getEstimatedPrice()}
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 flex flex-wrap gap-2.5">
                    <button
                      type="submit"
                      className="flex-1 min-w-[200px] py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-slate-950" />
                      <span>{t.contact.submitWA}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyDetails}
                      className={`py-3.5 px-4 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                      title={t.contact.copyDetails}
                    >
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">{t.contact.copyDetails}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleEmailSubmit}
                      className={`py-3.5 px-4 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                      title={t.contact.sendEmail}
                    >
                      <Mail className="w-4 h-4" />
                      <span className="hidden sm:inline">{t.contact.sendEmail}</span>
                    </button>
                  </div>

                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Left Column: Direct Contact Channels & Guarantees */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Quick WhatsApp Banner Card */}
            <div className={`p-6 rounded-3xl border shadow-xl ${
              isDark 
                ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#07130c] border-emerald-500/30 shadow-emerald-500/5' 
                : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-emerald-300 shadow-emerald-100/60'
            }`}>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-2">
                <MessageCircle className="w-5 h-5 fill-emerald-500 text-transparent" />
                <span>{t.contact.fastestChannel}</span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                isDark ? 'text-slate-300' : 'text-slate-700 font-medium'
              }`}>
                {t.contact.fastestChannelDesc}
              </p>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent(
                  lang === 'ar' ? APP_CONFIG.contact.defaultWhatsAppMessage : 'Hello, I would like to inquire about modern web development for my project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerConversionCelebration()}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{t.contact.openWABtn} ({APP_CONFIG.contact.phoneFormatted})</span>
              </a>
            </div>

            {/* Direct Info Card */}
            <div className={`p-6 rounded-3xl border shadow-lg space-y-4 ${
              isDark ? 'bg-[#0b1120] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <h4 className={`text-sm font-bold pb-3 border-b ${
                isDark ? 'text-white border-white/10' : 'text-slate-900 border-slate-100'
              }`}>
                {t.contact.directInfoTitle}
              </h4>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-medium">{t.contact.phoneLabel}</span>
                    <a
                      href={`https://wa.me/${phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono font-bold mt-0.5 block hover:text-emerald-500 transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                      dir="ltr"
                    >
                      {APP_CONFIG.contact.phoneInternational}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-medium">{t.contact.emailLabel}</span>
                    <a
                      href={`mailto:${APP_CONFIG.contact.email}`}
                      className={`font-mono font-bold mt-0.5 block hover:text-sky-500 transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                      dir="ltr"
                    >
                      {APP_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-medium">{t.contact.hoursLabel}</span>
                    <span className={`font-medium mt-0.5 block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'ar' ? APP_CONFIG.contact.workingHours : 'Sat - Thu: 9:00 AM - 6:00 PM'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-medium">{t.contact.locationLabel}</span>
                    <span className={`font-medium mt-0.5 block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'ar' ? APP_CONFIG.contact.city : 'Kingdom of Saudi Arabia'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Step Cards */}
            <div className={`p-5 rounded-3xl border space-y-3 ${
              isDark ? 'bg-slate-900/60 border-white/5' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="text-xs font-bold text-sky-500 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.contact.guaranteesTitle}</span>
              </div>

              {APP_CONFIG.guaranteeSteps.map((step) => (
                <div key={step.num} className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-500 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    {step.num}
                  </div>
                  <div>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                      {lang === 'ar' ? step.title : step.num === 1 ? 'Live Inspection' : step.num === 2 ? 'Free Revisions' : 'Full Guidance'}:
                    </strong>{' '}
                    <span className="text-slate-400">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
