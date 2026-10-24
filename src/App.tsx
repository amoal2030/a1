/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { APP_CONFIG, ProjectItem } from './data/config';
import { TRANSLATIONS, Language, Theme } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingCalculator } from './components/PricingCalculator';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectModal } from './components/ProjectModal';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { ContactPage } from './components/ContactPage';
import { CalculatorPage } from './components/CalculatorPage';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toast } from './components/Toast';
import { OrderModal } from './components/OrderModal';
import { DemoViewer } from './components/demos/DemoViewer';
import { MessageCircle, Sparkles } from 'lucide-react';
import { triggerConversionCelebration } from './utils/confetti';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'calculator'>('home');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  
  // Interactive Live Demo View state
  const [activeDemo, setActiveDemo] = useState<string | null>(() => {
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#demo=')) {
        return hash.replace('#demo=', '');
      }
    } catch {}
    return null;
  });

  // Language & Theme State - defaults to 'dark'
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme_preference');
      return (saved === 'dark' || saved === 'light') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Order Modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalServiceId, setOrderModalServiceId] = useState('intro-3pages');

  // Contact section pre-fill state
  const [selectedServiceForForm, setSelectedServiceForForm] = useState('intro-3pages');
  const [prefillDescription, setPrefillDescription] = useState('');

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Sync lang & dir attribute with DOM
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Sync theme with DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = "bg-[#070b14] text-slate-100 antialiased selection:bg-sky-500 selection:text-white font-sans overflow-x-hidden min-h-screen";
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = "bg-[#f8fafc] text-slate-900 antialiased selection:bg-sky-500 selection:text-white font-sans overflow-x-hidden min-h-screen";
    }
  }, [theme]);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    showToast(nextLang === 'ar' ? 'تم تحويل لغة الموقع إلى العربية' : 'Switched language to English');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme_preference', nextTheme);
    } catch {}
    showToast(nextTheme === 'dark' ? 'تم تفعيل المظهر الداكن' : (lang === 'ar' ? 'تم تفعيل المظهر الفاتح' : 'Switched to Light Theme'));
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Section observer to update active navbar link
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sectionIds = ['hero', 'about', 'services', 'pricing', 'portfolio', 'process', 'faq', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [currentPage]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOrderModal = (serviceId: string = 'intro-3pages') => {
    setOrderModalServiceId(serviceId);
    setIsOrderModalOpen(true);
  };

  const handleSelectPackageFromCalculator = (details: { name: string; price: number; description: string }) => {
    setSelectedServiceForForm(details.name.includes('مخصصة') || details.name.includes('Custom') ? 'custom' : 'intro-3pages');
    setPrefillDescription(details.description);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => scrollToSection('contact'), 150);
    } else {
      scrollToSection('contact');
    }
    showToast(lang === 'ar' ? `تم تطبيق مواصفات "${details.name}" على استمارة الطلب.` : `Applied "${details.name}" to request form.`);
  };

  const handleRequestSimilarProject = (projectTitle: string) => {
    setSelectedServiceForForm('intro-3pages');
    setPrefillDescription(lang === 'ar' ? `أرغب في تصميم موقع شبيه بنموذج: "${projectTitle}".` : `I would like to build a website similar to: "${projectTitle}".`);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => scrollToSection('contact'), 150);
    } else {
      scrollToSection('contact');
    }
  };

  // Hash sync for demo links and browser back navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#demo=')) {
        setActiveDemo(hash.replace('#demo=', ''));
      } else if (activeDemo) {
        setActiveDemo(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeDemo]);

  const handleLaunchDemo = (demoId: string) => {
    setActiveDemo(demoId);
    window.location.hash = `demo=${demoId}`;
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const handleCloseDemo = () => {
    setActiveDemo(null);
    if (window.location.hash.startsWith('#demo=')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    setTimeout(() => {
      const portfolioEl = document.getElementById('portfolio');
      if (portfolioEl) portfolioEl.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // If a live demo is currently active, render full-screen interactive DemoViewer
  if (activeDemo) {
    return (
      <DemoViewer
        demoId={activeDemo}
        onBack={handleCloseDemo}
        lang={lang}
        theme={theme}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative ${
      isDark 
        ? 'bg-[#070b14] text-slate-100 bg-mesh-pattern' 
        : 'bg-[#f8fafc] text-slate-900 bg-mesh-pattern-light'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenOrderModal={handleOpenOrderModal}
        lang={lang}
        onToggleLang={toggleLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          <>
            {/* 1. Hero Section with Dual Device Mockup Switcher */}
            <Hero
              onOrderClick={handleOpenOrderModal}
              onExplorePortfolio={() => scrollToSection('portfolio')}
              lang={lang}
              theme={theme}
            />

            {/* 2. About & Transparency Section */}
            <AboutSection
              onContactClick={() => scrollToSection('contact')}
              lang={lang}
              theme={theme}
            />

            {/* 3. Services Section */}
            <ServicesSection
              onSelectService={(serviceId) => handleOpenOrderModal(serviceId)}
              onExplorePricing={() => scrollToSection('pricing')}
              lang={lang}
              theme={theme}
            />

            {/* 4. Interactive Pricing Calculator & Flagship 60$ Card */}
            <PricingCalculator
              onSelectPackage={handleSelectPackageFromCalculator}
              onOpenCalculatorPage={() => {
                setCurrentPage('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              lang={lang}
              theme={theme}
            />

            {/* 5. Filterable Portfolio Section with Mobile/Desktop Preview */}
            <PortfolioSection
              onOpenProject={(project) => setActiveProject(project)}
              onLaunchDemo={handleLaunchDemo}
              lang={lang}
              theme={theme}
            />

            {/* 6. Process Roadmap Section (5 Steps) */}
            <ProcessSection
              lang={lang}
              theme={theme}
            />

            {/* 7. Interactive Contact & Order Form Section with WhatsApp Generator */}
            <ContactSection
              initialService={selectedServiceForForm}
              prefillDescription={prefillDescription}
              onShowToast={showToast}
              lang={lang}
              theme={theme}
            />

            {/* 8. FAQ Section */}
            <FaqSection
              lang={lang}
              theme={theme}
            />
          </>
        ) : currentPage === 'calculator' ? (
          /* Dedicated Pricing / Cost Calculator Page */
          <CalculatorPage
            onBackToHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenOrderForm={(summary) => {
              setPrefillDescription(summary);
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            lang={lang}
            theme={theme}
          />
        ) : (
          /* Dedicated Contact Page */
          <ContactPage
            onBackToHome={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
            lang={lang}
            theme={theme}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(id) => {
          if (currentPage !== 'home') {
            setCurrentPage('home');
            setTimeout(() => scrollToSection(id), 150);
          } else {
            scrollToSection(id);
          }
        }}
        onOpenContact={() => {
          setCurrentPage('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCalculator={() => {
          setCurrentPage('calculator');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        theme={theme}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp lang={lang} />

      {/* Quick Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        serviceId={orderModalServiceId}
        onClose={() => setIsOrderModalOpen(false)}
        onShowToast={showToast}
        lang={lang}
        theme={theme}
      />

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onRequestSimilar={handleRequestSimilarProject}
        onLaunchDemo={handleLaunchDemo}
        lang={lang}
        theme={theme}
      />

      {/* Toast Feedback Notice */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
