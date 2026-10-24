import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  Monitor, 
  Smartphone, 
  Tablet, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Maximize2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TechStoreDemo } from './TechStoreDemo';
import { RestaurantDemo } from './RestaurantDemo';
import { TechCompanyDemo } from './TechCompanyDemo';
import { RealEstateDemo } from './RealEstateDemo';
import { MedicalClinicDemo } from './MedicalClinicDemo';
import { SaasLandingDemo } from './SaasLandingDemo';
import { APP_CONFIG, ProjectItem } from '../../data/config';
import { Language, Theme } from '../../data/translations';

interface DemoViewerProps {
  demoId: string;
  onBack: () => void;
  lang?: Language;
  theme?: Theme;
}

export const DemoViewer: React.FC<DemoViewerProps> = ({
  demoId,
  onBack,
  lang = 'ar',
  theme = 'dark'
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const project = APP_CONFIG.projects.find(p => p.id === demoId);

  // Scroll to top upon opening
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [demoId]);

  const getDemoComponent = () => {
    switch (demoId) {
      case 'tech-store':
        return <TechStoreDemo />;
      case 'restaurant-menu':
        return <RestaurantDemo />;
      case 'tech-company':
        return <TechCompanyDemo />;
      case 'real-estate':
        return <RealEstateDemo />;
      case 'medical-clinic':
        return <MedicalClinicDemo />;
      case 'saas-landing':
        return <SaasLandingDemo />;
      default:
        return (
          <div className="py-24 text-center space-y-4">
            <h2 className="text-xl font-bold text-white">النموذج قيد التجهيز</h2>
            <button
              onClick={onBack}
              className="px-6 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold"
            >
              العودة للمعرض
            </button>
          </div>
        );
    }
  };

  const projectTitle = project?.title || 'نموذج تصميمي تفاعلي';
  const categoryName = project?.categoryName || 'موقع ويب متكامل';

  const handleWhatsAppInquiry = () => {
    const text = `مرحباً، لقد عاينت نموذج "${projectTitle}" في معرض أعمالك، وأرغب في تنفيذ موقع ويب احترافي مماثل لنشاطي التجاري.`;
    window.open(`https://wa.me/${APP_CONFIG.contact.whatsAppNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sticky Demo Control Topbar */}
      <header className="sticky top-0 z-50 bg-[#0b1120]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Back button & Title Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10 shadow-sm"
              title="العودة لمعرض الأعمال"
            >
              <ArrowRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
              <span>العودة للمعرض</span>
            </button>

            <div className="hidden sm:block border-r border-white/10 pr-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                  {projectTitle}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  نموذج حي تفاعلي
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block">{categoryName}</span>
            </div>
          </div>

          {/* Device Responsive Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceMode === 'desktop'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>شاشة حاسوب</span>
            </button>

            <button
              onClick={() => setDeviceMode('tablet')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceMode === 'tablet'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>تابلت</span>
            </button>

            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceMode === 'mobile'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>شاشة جوال</span>
            </button>
          </div>

          {/* Order Call to Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppInquiry}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">طلب موقع مطابق لهذا النموذج</span>
              <span className="sm:hidden">طلب هذا النموذج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Workspace Area */}
      <div className={`flex-1 transition-all ${
        deviceMode === 'desktop'
          ? 'w-full'
          : deviceMode === 'tablet'
            ? 'max-w-3xl mx-auto my-6 rounded-[2rem] border-4 border-slate-700 shadow-2xl overflow-hidden bg-slate-950'
            : 'max-w-[390px] mx-auto my-6 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden bg-slate-950'
      }`}>
        {/* If in mobile mode, display realistic speaker pill */}
        {deviceMode === 'mobile' && (
          <div className="bg-slate-950 py-2 flex justify-center border-b border-white/5">
            <div className="w-20 h-3.5 bg-slate-800 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-950 ml-2"></div>
            </div>
          </div>
        )}

        {/* Live Interactive Demo Body */}
        <div className="w-full">
          {getDemoComponent()}
        </div>
      </div>
    </div>
  );
};
