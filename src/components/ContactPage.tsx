import React, { useState } from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Copy, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle,
  Sparkles,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerConversionCelebration } from '../utils/confetti';

interface ContactPageProps {
  onBackToHome: () => void;
  onShowToast: (msg: string) => void;
  lang?: Language;
  theme?: Theme;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  onShowToast,
  lang = 'ar',
  theme = 'dark'
}) => {
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  const [requestType, setRequestType] = useState('order');
  const [clientName, setClientName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [selectedService, setSelectedService] = useState('intro-3pages');
  const [preferredTimeline, setPreferredTimeline] = useState('standard');
  const [projectDetails, setProjectDetails] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getEstimatedPrice = () => {
    if (requestType === 'inquiry') {
      return lang === 'ar' ? 'مجاني (استشارة أولية)' : 'Free (Initial Consultation)';
    }
    switch (selectedService) {
      case 'landing':
        return lang === 'ar' ? '40$ (حوالي 150 ريال)' : '$40 (approx 150 SAR)';
      case 'intro-3pages':
        return lang === 'ar' ? '60$ (الباقة الافتتاحية - 225 ريال)' : '$60 (Starter Flagship - 225 SAR)';
      case 'portfolio':
        return lang === 'ar' ? '50$ (حوالي 190 ريال)' : '$50 (approx 190 SAR)';
      case 'custom':
        return lang === 'ar' ? 'حسب المتطلبات (يبدأ من 90$)' : 'Custom Scope (From $90)';
      default:
        return '$60';
    }
  };

  const validate = () => {
    const err: { [key: string]: string } = {};
    if (!clientName.trim() || clientName.trim().length < 2) {
      err.clientName = lang === 'ar' 
        ? 'يرجى إدخال اسمك أو اسم النشاط التجاري.' 
        : 'Please enter your name or business name.';
    }
    if (!projectDetails.trim() || projectDetails.trim().length < 5) {
      err.projectDetails = lang === 'ar' 
        ? 'يرجى كتابة نبذة مختصرة عن المطلوب.' 
        : 'Please provide a short description of what you need.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const buildMessage = () => {
    const typeLabel = requestType === 'inquiry' 
      ? (lang === 'ar' ? 'استفسار عام' : 'General Inquiry')
      : requestType === 'maintenance'
      ? (lang === 'ar' ? 'صيانة وتطوير موقع' : 'Website Maintenance & Upgrades')
      : (lang === 'ar' ? 'طلب موقع جديد' : 'New Website Request');

    return [
      `🌟 ${typeLabel} - ${t.siteName}`,
      `---------------------------------------`,
      `${lang === 'ar' ? '👤 الاسم:' : '👤 Name:'} ${clientName}`,
      `${lang === 'ar' ? '🏢 النشاط:' : '🏢 Business:'} ${businessType || (lang === 'ar' ? 'مشروع تجاري' : 'Business')}`,
      `${lang === 'ar' ? '📦 الخدمة:' : '📦 Service:'} ${selectedService === 'intro-3pages' ? (lang === 'ar' ? 'الباقة الافتتاحية ($60)' : 'Flagship Starter ($60)') : selectedService}`,
      `${lang === 'ar' ? '⏱ الموعد:' : '⏱ Timeline:'} ${preferredTimeline}`,
      `${lang === 'ar' ? '💰 التكلفة المقدرة:' : '💰 Estimated Cost:'} ${getEstimatedPrice()}`,
      `---------------------------------------`,
      `${lang === 'ar' ? '📝 الرسالة والتفاصيل:' : '📝 Details:'}`,
      `${projectDetails}`,
      `---------------------------------------`,
      lang === 'ar' ? `تم الإرسال من منصة "${t.siteName}"` : `Sent from "${t.siteName}" platform`
    ].join('\n');
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    triggerConversionCelebration();
    const fullMessage = buildMessage();
    const phone = APP_CONFIG.contact.whatsAppNumber;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`, '_blank');
    setIsSubmitted(true);
    onShowToast(lang === 'ar' ? 'تم فتح واتساب وجاهز للإرسال!' : 'WhatsApp chat opened and ready to send!');
  };

  const handleCopy = () => {
    if (!validate()) return;
    const fullMessage = buildMessage();
    navigator.clipboard.writeText(fullMessage)
      .then(() => onShowToast(lang === 'ar' ? 'تم نسخ تفاصيل الطلب بنجاح!' : 'Order details copied to clipboard!'))
      .catch(() => onShowToast(lang === 'ar' ? 'تم نسخ التفاصيل.' : 'Details copied.'));
  };

  const phone = APP_CONFIG.contact.whatsAppNumber;

  return (
    <div className={`py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      
      {/* Breadcrumb & Navigation */}
      <div className={`mb-8 pb-6 border-b flex flex-wrap items-center justify-between gap-4 ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={onBackToHome}
            className={`hover:text-sky-500 transition-colors flex items-center gap-1 cursor-pointer font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {lang === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{t.nav.hero}</span>
          </button>
          <span>/</span>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.nav.contact}
          </span>
        </div>

        <button
          onClick={onBackToHome}
          className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
            isDark 
              ? 'bg-slate-900 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800' 
              : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
          }`}
        >
          {t.nav.backToHome}
        </button>
      </div>

      {/* Page Title */}
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-bold text-sky-500 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20 inline-block">
          {t.contact.kicker}
        </span>
        <h1 className={`text-3xl sm:text-4xl font-black mt-3 mb-3 ${isDark ? 'text-white' : 'text-slate-950'}`}>
          {t.contact.title}
        </h1>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {t.contact.subtitle}
        </p>
      </div>

      {/* Main 2-Column: Dedicated Form + Guarantees & Contact Info (The redundant 3-cards row was removed as requested) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Panel */}
        <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 shadow-xl border ${
          isDark 
            ? 'bg-[#0b1120] border-white/10 shadow-black/40' 
            : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <div className={`mb-6 pb-4 border-b flex items-center justify-between ${
            isDark ? 'border-white/10' : 'border-slate-100'
          }`}>
            <div>
              <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>{t.contact.formTitle}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {t.contact.formSub}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              {t.contact.responseBadge}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-2xl border text-center space-y-4 my-6 ${
                  isDark ? 'bg-emerald-500/10 border-emerald-400/30' : 'bg-emerald-50 border-emerald-200'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-black shadow-lg">
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
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {t.contact.resetBtn}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                
                {/* Request Type Selector */}
                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {lang === 'ar' ? 'نوع الطلب:' : 'Request Type:'}
                  </label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm border transition-colors outline-none cursor-pointer ${
                      isDark 
                        ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                        : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500 focus:bg-white'
                    }`}
                  >
                    <option value="order">
                      {lang === 'ar' ? 'طلب موقع جديد (الباقة الأساسية أو مخصصة)' : 'New Website Request (Starter or Custom)'}
                    </option>
                    <option value="inquiry">
                      {lang === 'ar' ? 'استفسار عام واستشارة مجانية' : 'General Inquiry & Free Consultation'}
                    </option>
                    <option value="custom-quote">
                      {lang === 'ar' ? 'طلب تسعير لمشروع متعدد الصفحات' : 'Custom Quote for Multi-page Platform'}
                    </option>
                    <option value="maintenance">
                      {lang === 'ar' ? 'تحديث أو صيانة موقع قائم' : 'Website Maintenance & Enhancements'}
                    </option>
                  </select>
                </div>

                {/* Name & Business Type */}
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

                {/* Service Selection */}
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
                        {lang === 'ar' ? 'حل برمجي مخصص متقدم' : 'Custom Tailored Solution'}
                      </option>
                    </select>
                  </div>

                {/* Timeline */}
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
                      {lang === 'ar' ? 'تسليم اعتيادي (3 - 5 أيام عمل)' : 'Standard Delivery (3 - 5 Business Days)'}
                    </option>
                    <option value="urgent">
                      {lang === 'ar' ? 'تسليم سريع عاجل (48 - 72 ساعة)' : 'Express Urgent (48 - 72 Hours)'}
                    </option>
                    <option value="flexible">
                      {lang === 'ar' ? 'مرن وغير مستعجل' : 'Flexible Timeline'}
                    </option>
                  </select>
                </div>

                {/* Details Textarea */}
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

                {/* Price Display */}
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

                {/* Submit Buttons */}
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
                    onClick={handleCopy}
                    className={`py-3.5 px-4 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    <span>{t.contact.copyDetails}</span>
                  </button>
                </div>

              </form>
            )}
          </AnimatePresence>
        </div>

        {/* Guarantees & Contact Channels Column */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Quick WhatsApp Box */}
          <div className={`p-6 rounded-3xl border shadow-xl space-y-4 ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-500/15 via-slate-900 to-slate-950 border-emerald-500/30' 
              : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-emerald-300 shadow-emerald-100/60'
          }`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <MessageCircle className="w-5 h-5 fill-emerald-500 text-transparent" />
              <span>{t.contact.fastestChannel}</span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
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

          {/* Official Info Box */}
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

          {/* Guarantees Box */}
          <div className={`p-6 rounded-3xl border shadow-lg space-y-4 ${
            isDark ? 'bg-slate-900 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2 text-sky-500 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>{t.contact.guaranteesTitle}</span>
            </div>

            <div className={`space-y-4 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-500 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  1
                </div>
                <div>
                  <strong className={`block mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ar' ? 'معاينة حية على هاتفك:' : 'Live Mobile Inspection:'}
                  </strong>
                  {lang === 'ar'
                    ? 'نرسل لك رابطاً تجريبياً مباشراً لتجربة كل صفحة وزر على هاتفك الذكي قبل اعتماد العمل.'
                    : 'We send you a live staging link to inspect every button and page on your phone before final approval.'}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-500 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  2
                </div>
                <div>
                  <strong className={`block mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ar' ? 'تعديلات مريحة حتى الرضا:' : 'Comfortable Revisions:'}
                  </strong>
                  {lang === 'ar'
                    ? 'نعدل النصوص والألوان ومواضع الأقسام حتى تكون راضياً تماماً عن المظهر النهائي.'
                    : 'We fine-tune typography, colors, and content until you are completely satisfied with the result.'}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-500 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  3
                </div>
                <div>
                  <strong className={`block mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'ar' ? 'إرشاد مجاني ومستمر:' : 'Free Deployment Guidance:'}
                  </strong>
                  {lang === 'ar'
                    ? 'نوضح لك كيفية تغيير النصوص أو الأسعار مستقبلاً، وندعمك في ربط الدومين بكل سهولة.'
                    : 'We guide you on how to update texts and assist you in connecting your custom domain.'}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
