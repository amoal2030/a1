import React, { useState } from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { X, MessageCircle, Copy, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerConversionCelebration } from '../utils/confetti';

interface OrderModalProps {
  isOpen: boolean;
  serviceId?: string;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  lang?: Language;
  theme?: Theme;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  serviceId = 'intro-3pages',
  onClose,
  onShowToast,
  lang = 'ar',
  theme = 'dark'
}) => {
  const [selectedService, setSelectedService] = useState(serviceId);
  const [clientName, setClientName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const currentService = APP_CONFIG.services.find(s => s.id === selectedService) || APP_CONFIG.services[1];

  const validate = () => {
    const err: { [key: string]: string } = {};
    if (!clientName.trim()) {
      err.clientName = lang === 'ar' ? 'يرجى كتابة الاسم أو اسم النشاط.' : 'Please enter your name or business name.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const buildMessage = () => {
    return [
      `🌟 ${lang === 'ar' ? 'طلب خدمة تصميم موقع' : 'Website Design Request'} - ${t.siteName}`,
      `---------------------------------------`,
      `📦 ${lang === 'ar' ? 'الخدمة:' : 'Service:'} ${currentService.title}`,
      `💰 ${lang === 'ar' ? 'السعر المبدئي:' : 'Starting Price:'} ${currentService.startingPriceUSD}$ (~${Math.round(currentService.startingPriceUSD * 3.75)} ${lang === 'ar' ? 'ريال' : 'SAR'})`,
      `⏱ ${lang === 'ar' ? 'مدة التسليم:' : 'Delivery Time:'} ${currentService.deliveryTime}`,
      `👤 ${lang === 'ar' ? 'اسم العميل:' : 'Client Name:'} ${clientName}`,
      `🏢 ${lang === 'ar' ? 'نوع النشاط:' : 'Business Type:'} ${businessType || (lang === 'ar' ? 'مشروع تجاري' : 'Business')}`,
      `---------------------------------------`,
      `📝 ${lang === 'ar' ? 'ملاحظات إضافية:' : 'Additional Notes:'}`,
      `${projectNotes || (lang === 'ar' ? 'أرغب بالبدء بالباقة ومناقشة تفاصيل المحتوى.' : 'I would like to start with this package and discuss the content.')}`,
      `---------------------------------------`,
      lang === 'ar' ? `تم الإرسال عبر منصة "${t.siteName}"` : `Sent via "${t.siteName}" platform`
    ].join('\n');
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    triggerConversionCelebration();
    const msg = buildMessage();
    const phone = APP_CONFIG.contact.whatsAppNumber;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
    onShowToast(lang === 'ar' ? 'تم توجيه طلبك إلى واتساب بنجاح!' : 'Request redirected to WhatsApp!');
  };

  const handleCopy = () => {
    if (!validate()) return;
    const msg = buildMessage();
    navigator.clipboard.writeText(msg)
      .then(() => {
        onShowToast(lang === 'ar' ? 'تم نسخ تفاصيل الطلب بنجاح!' : 'Order details copied to clipboard!');
        onClose();
      })
      .catch(() => onShowToast(lang === 'ar' ? 'تم نسخ الطلب.' : 'Details copied.'));
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className={`border rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative flex flex-col ${
            lang === 'ar' ? 'text-right' : 'text-left'
          } ${
            isDark ? 'bg-[#0b1120] border-white/15' : 'bg-white border-slate-200 shadow-slate-200'
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between pb-4 border-b mb-5 ${
            isDark ? 'border-white/10' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-sky-500" />
              </div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'ar' ? 'تأكيد طلب الموقع' : 'Confirm Website Request'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleWhatsApp} className="space-y-4">
            
            {/* Service Choice */}
            <div>
              <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.contact.serviceLabel}:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none cursor-pointer ${
                  isDark 
                    ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                    : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500'
                }`}
              >
                {APP_CONFIG.services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.startingPriceUSD}$)
                  </option>
                ))}
              </select>
            </div>

            {/* Price Preview Banner */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
              isDark ? 'bg-slate-950 border-sky-400/20' : 'bg-sky-50 border-sky-300'
            }`}>
              <span className={isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}>{lang === 'ar' ? 'التكلفة والمدة:' : 'Cost & Time:'}</span>
              <div className="flex items-center gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold font-mono">
                  ${currentService.startingPriceUSD} (~{Math.round(currentService.startingPriceUSD * 3.75)} {lang === 'ar' ? 'ر.س' : 'SAR'})
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currentService.deliveryTime}</span>
              </div>
            </div>

            {/* Client Name */}
            <div>
              <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {t.contact.clientNameLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder={t.contact.clientNamePlaceholder}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                  isDark 
                    ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                    : 'bg-slate-50 text-slate-950 border-slate-300 focus:bg-white focus:border-sky-500'
                } ${errors.clientName ? 'border-red-500' : ''}`}
              />
              {errors.clientName && (
                <span className="text-[10px] text-red-500 mt-0.5 block">{errors.clientName}</span>
              )}
            </div>

            {/* Business Type */}
            <div>
              <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.contact.businessTypeLabel}
              </label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder={t.contact.businessTypePlaceholder}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                  isDark 
                    ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                    : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500'
                }`}
              />
            </div>

            {/* Notes */}
            <div>
              <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'ar' ? 'ملاحظات أو روابط حسابات النشاط (إن وجدت)' : 'Additional Notes / Social Links (optional)'}
              </label>
              <textarea
                rows={2}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder={lang === 'ar' ? 'رابط إنستغرام أو وصف سريع لما ترغب به...' : 'Instagram link or brief summary...'}
                className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none resize-none ${
                  isDark 
                    ? 'bg-slate-950 text-white border-white/10 focus:border-sky-400' 
                    : 'bg-slate-50 text-slate-900 border-slate-200 focus:border-sky-500'
                }`}
              ></textarea>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{t.contact.submitWA}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className={`py-3 px-3.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Copy details"
              >
                <Copy className="w-4 h-4" />
                <span>{t.contact.copyDetails}</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
