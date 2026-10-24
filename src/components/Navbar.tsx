import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { MessageCircle, Menu, X, Code, Sparkles, ChevronLeft, ChevronRight, Globe, Sun, Moon, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currentPage: 'home' | 'contact' | 'calculator';
  setCurrentPage: (page: 'home' | 'contact' | 'calculator') => void;
  onOpenOrderModal?: (serviceId?: string) => void;
  lang: Language;
  onToggleLang: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  currentPage,
  setCurrentPage,
  onOpenOrderModal,
  lang,
  onToggleLang,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t.nav.hero },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'process', label: t.nav.process },
    { id: 'faq', label: t.nav.faq },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        onNavigate(id);
      }, 100);
    } else {
      onNavigate(id);
    }
  };

  const phone = APP_CONFIG.contact.whatsAppNumber;
  const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    lang === 'ar' ? APP_CONFIG.contact.defaultWhatsAppMessage : 'Hello, I would like to inquire about website development for my business.'
  )}`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#070b14]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30'
              : 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-md shadow-slate-200/50'
            : isDark
              ? 'bg-transparent border-b border-white/5'
              : 'bg-transparent border-b border-slate-200/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('hero')}
              className={`flex items-center gap-2.5 cursor-pointer ${lang === 'ar' ? 'text-right' : 'text-left'}`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-sky-500/25 hover:scale-105 transition-transform">
                <Code className="w-5 h-5 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className={`text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {t.siteName}
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </span>
                <span className="text-[11px] text-sky-500 font-semibold hidden sm:inline-block">
                  {lang === 'ar' ? 'مواقع ذكية للمشاريع الصغيرة' : 'Smart websites for small businesses'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className={`hidden xl:flex items-center gap-1 p-1.5 rounded-full border shadow-inner ${
            isDark 
              ? 'bg-slate-900/70 border-white/10' 
              : 'bg-slate-100/90 border-slate-200'
          }`}>
            {navLinks.map((link) => {
              const isActive = currentPage === 'home' && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? isDark ? 'text-white font-bold' : 'text-slate-950 font-bold'
                      : isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className={`absolute inset-0 rounded-full border ${
                        isDark 
                          ? 'bg-gradient-to-r from-sky-500/30 to-blue-500/20 border-sky-400/50' 
                          : 'bg-white border-slate-300 shadow-sm'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}

            {/* Dedicated Calculator Page Button */}
            <button
              onClick={() => {
                setCurrentPage('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentPage === 'calculator'
                  ? 'text-white'
                  : 'text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300'
              }`}
            >
              {currentPage === 'calculator' && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-emerald-500 border border-emerald-400 rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                {t.nav.calculator}
              </span>
            </button>

            {/* Dedicated Contact Button */}
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currentPage === 'contact'
                  ? 'text-white'
                  : 'text-sky-500 hover:text-sky-600 dark:text-sky-300 dark:hover:text-white'
              }`}
            >
              {currentPage === 'contact' && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-sky-500 border border-sky-400 rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                {t.nav.contact}
              </span>
            </button>
          </nav>

          {/* Action Zone: Lang Switcher, Theme Switcher, WhatsApp & CTA */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher Toggle */}
            <button
              onClick={onToggleLang}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
              }`}
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Theme Switcher Toggle (Dark / Light) */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-white/10 text-amber-400 hover:text-amber-300 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
              }`}
              title={t.themeToggle}
              aria-label={t.themeToggle}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-800" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-white/10 text-slate-300 hover:text-white' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
              }`}
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-20 inset-x-0 backdrop-blur-xl border-b p-5 shadow-2xl z-40 xl:hidden flex flex-col gap-2.5 ${
              isDark 
                ? 'bg-[#090e1a]/95 border-white/15 text-white' 
                : 'bg-white/95 border-slate-200 text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b text-xs ${
              isDark ? 'border-white/10 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span>{lang === 'ar' ? 'تصفح أقسام الموقع' : 'Navigation Menu'}</span>
              <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                {t.availableNow}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    lang === 'ar' ? 'text-right' : 'text-left'
                  } ${
                    currentPage === 'home' && activeSection === link.id
                      ? 'bg-sky-500/20 text-sky-500 border border-sky-500/40'
                      : isDark ? 'bg-slate-900/70 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {lang === 'ar' ? <ChevronLeft className="w-3.5 h-3.5 opacity-60" /> : <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
                </button>
              ))}
            </div>

            {/* Mobile Calculator Page Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentPage('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between mt-1 ${
                lang === 'ar' ? 'text-right' : 'text-left'
              } ${
                currentPage === 'calculator'
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-500 border border-emerald-400/30'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-500" />
                {t.nav.calculator}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                {lang === 'ar' ? 'حساب فوري' : 'Instant Quote'}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between mt-1 ${
                lang === 'ar' ? 'text-right' : 'text-left'
              } ${
                currentPage === 'contact'
                  ? 'bg-sky-500 text-slate-950 font-black'
                  : 'bg-gradient-to-r from-sky-500/20 to-blue-500/10 text-sky-500 border border-sky-400/30'
              }`}
            >
              <span>{t.nav.contact}</span>
            </button>

            <div className="pt-2 flex gap-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-center text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenOrderModal) {
                    onOpenOrderModal('intro-3pages');
                  } else {
                    handleLinkClick('pricing');
                  }
                }}
                className="flex-1 py-3 rounded-xl bg-sky-500 text-slate-950 font-black text-center text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>$60 Plan</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
