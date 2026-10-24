import React, { useState } from 'react';
import { ProjectItem, APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { 
  X, 
  MessageCircle, 
  Check, 
  Layers, 
  Users, 
  Sparkles, 
  Quote, 
  Smartphone, 
  Monitor,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerConversionCelebration } from '../utils/confetti';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestSimilar: (projectTitle: string) => void;
  onLaunchDemo?: (demoId: string) => void;
  lang?: Language;
  theme?: Theme;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
  onLaunchDemo,
  lang = 'ar',
  theme = 'dark'
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  if (!project) return null;

  const phone = APP_CONFIG.contact.whatsAppNumber;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، شاهدت نموذج عمل "${project.title}" على موقعك وأرغب في تنفيذ موقع مشابه لنشاطي.`
      : `Hello, I saw your sample project "${project.title}" on your portfolio and I would like to build a similar website for my business.`
  )}`;

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
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className={`border rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col ${
            lang === 'ar' ? 'text-right' : 'text-left'
          } ${
            isDark 
              ? 'bg-[#0b1120] border-white/15 shadow-sky-500/10' 
              : 'bg-white border-slate-200 shadow-slate-300'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
              isDark ? 'bg-slate-900/90 border-white/15 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 shadow-sm'
            }`}
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Visual Showcase Header with Simulator Toggle */}
          <div className={`relative p-4 sm:p-6 pb-2 border-b ${
            isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-200'
          }`}>
            {/* Viewport mode switcher */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-sky-500 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t.modal.previewScreens}
              </span>
              <div className={`flex items-center p-1 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                    viewMode === 'desktop'
                      ? 'bg-sky-500 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{t.hero.desktop}</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                    viewMode === 'mobile'
                      ? 'bg-sky-500 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{t.hero.mobile}</span>
                </button>
              </div>
            </div>

            {/* Media Container */}
            <div className="flex justify-center items-center py-2">
              {viewMode === 'desktop' ? (
                /* Desktop screen view */
                <div className={`w-full rounded-2xl overflow-hidden border shadow-xl ${
                  isDark ? 'bg-slate-900 border-white/15' : 'bg-white border-slate-300'
                }`}>
                  <div className={`px-3 py-2 border-b flex items-center gap-1.5 ${
                    isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/70"></div>
                    <span className="text-[10px] text-slate-400 font-mono mx-2">
                      {t.modal.desktopVersion}
                    </span>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 sm:h-72 object-cover object-top"
                  />
                </div>
              ) : (
                /* Mobile phone view */
                <div className="w-56 sm:w-64 rounded-3xl bg-slate-950 border-2 border-slate-700 p-2 shadow-2xl">
                  <div className="w-16 h-3 bg-slate-800 rounded-b-md mx-auto mb-1.5"></div>
                  <div className="rounded-2xl overflow-hidden h-64 sm:h-72 bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              )}
            </div>

            {onLaunchDemo && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchDemo(project.id);
                }}
                className="w-full mt-3 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{lang === 'ar' ? 'فتح المعاينة التفاعلية الكاملة لهذا الموقع' : 'Launch Full Interactive Live Demo'}</span>
              </button>
            )}
          </div>

          {/* Body Information */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
                {project.categoryName}
              </span>
              <span className="text-xs text-emerald-500 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {project.statusLabel}
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className={`text-xl sm:text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {project.title}
              </h3>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {project.fullDescription}
              </p>
            </div>

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className={`p-4 rounded-2xl border space-y-2 ${
                isDark ? 'bg-slate-900/70 border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t.modal.featuresTitle}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className={`flex items-center gap-2 text-xs ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <span className="p-0.5 rounded-full bg-sky-500/20 text-sky-500">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Target & Tech Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <Users className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-medium">{t.modal.targetClient}</span>
                  <span className={`text-xs sm:text-sm font-bold mt-0.5 block ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {project.targetClient}
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <Layers className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-medium">{t.modal.techUsed}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${
                          isDark 
                            ? 'text-slate-300 bg-slate-900 border-white/10' 
                            : 'text-slate-700 bg-white border-slate-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Client Testimonial / Feedback quote */}
            {project.clientQuote && (
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isDark 
                  ? 'bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border-sky-400/20' 
                  : 'bg-gradient-to-r from-sky-50 to-emerald-50 border-sky-200'
              }`}>
                <Quote className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <p className={`text-xs sm:text-sm italic leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  "{project.clientQuote}"
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className={`p-5 sm:px-8 border-t flex flex-wrap items-center justify-between gap-3 mt-auto ${
            isDark ? 'border-white/10 bg-slate-950' : 'border-slate-200 bg-slate-50'
          }`}>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
              {t.modal.wantSimilar}
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  triggerConversionCelebration();
                  onClose();
                  onRequestSimilar(project.title);
                }}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border-white/10'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-sm'
                }`}
              >
                {t.modal.fillForm}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerConversionCelebration()}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{t.modal.chatWA}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
