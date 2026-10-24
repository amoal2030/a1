import React, { useState } from 'react';
import { APP_CONFIG, ProjectItem } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { Eye, ExternalLink, Smartphone, Monitor, Play, Sparkles, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface PortfolioSectionProps {
  onOpenProject: (project: ProjectItem) => void;
  onLaunchDemo: (demoId: string) => void;
  lang?: Language;
  theme?: Theme;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ 
  onOpenProject,
  onLaunchDemo,
  lang = 'ar',
  theme = 'dark'
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  const filterTabs = [
    { id: 'all', label: lang === 'ar' ? 'جميع النماذج (6)' : 'All Demos (6)' },
    { id: 'store', label: lang === 'ar' ? 'متجر إلكتروني' : 'E-Commerce Store' },
    { id: 'restaurant', label: lang === 'ar' ? 'مطعم ومنيو' : 'Restaurant & Menu' },
    { id: 'company', label: lang === 'ar' ? 'شركة برمجية' : 'Tech Company' },
    { id: 'realestate', label: lang === 'ar' ? 'بوابة عقارية' : 'Real Estate' },
    { id: 'clinic', label: lang === 'ar' ? 'عيادة طبية' : 'Medical Clinic' },
    { id: 'saas', label: lang === 'ar' ? 'منتج SaaS' : 'SaaS Landing' },
  ];

  const getTranslatedProject = (project: ProjectItem) => {
    if (lang === 'ar') return project;

    switch (project.id) {
      case 'tech-store':
        return {
          ...project,
          title: "TechnoZone Smart Devices & Tech E-Commerce",
          categoryName: "Tech Electronics Online Store",
          statusLabel: "Interactive Demo Prototype",
          summary: "Complete electronics store featuring interactive shopping cart, category filters, and 1-tap WhatsApp checkout.",
        };
      case 'restaurant-menu':
        return {
          ...project,
          title: "Aroma Lounge Bistro & Specialty Coffee",
          categoryName: "Dining Landing Page & Interactive Menu",
          statusLabel: "Interactive Demo Prototype",
          summary: "Interactive dining menu with dish prices, calories, WhatsApp ordering, and table reservation booking system.",
        };
      case 'tech-company':
        return {
          ...project,
          title: "SahabSoft Software Solutions & Cloud Tech",
          categoryName: "Corporate Software & IT Company",
          statusLabel: "Interactive Demo Prototype",
          summary: "Modern enterprise IT presence showcasing cloud platforms, mobile apps, real metrics, and instant RFQ consultation.",
        };
      case 'real-estate':
        return {
          ...project,
          title: "Darek Luxury Real Estate & Property Portal",
          categoryName: "Real Estate Listings & Investment",
          statusLabel: "Interactive Demo Prototype",
          summary: "Property portal for buying and renting villas and apartments with city search, favorites, and viewing appointments.",
        };
      case 'medical-clinic':
        return {
          ...project,
          title: "Shifa Specialized Medical Clinic & Dental Center",
          categoryName: "Healthcare Clinic & Doctor Directory",
          statusLabel: "Interactive Demo Prototype",
          summary: "Medical clinic website with consultant doctor profiles, treatment specialties, and smart online appointment booking.",
        };
      case 'saas-landing':
        return {
          ...project,
          title: "FocusMetric Smart Task Management SaaS",
          categoryName: "Digital Product & Cloud SaaS Landing",
          statusLabel: "Interactive Demo Prototype",
          summary: "High-converting digital product landing page featuring interactive dashboard preview, pricing matrix, and free trial.",
        };
      default:
        return project;
    }
  };

  const filteredProjects = activeFilter === 'all'
    ? APP_CONFIG.projects
    : APP_CONFIG.projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className={`py-20 relative overflow-hidden transition-colors ${
      isDark ? 'bg-transparent' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'معرض أعمالي التفاعلي الكامل' : 'Interactive Complete Portfolio'}</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mt-3 mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {lang === 'ar' ? 'نماذج مواقع ويب واقعية جاهزة للاستخدام' : 'Realistic Complete Demo Websites Ready to Deploy'}
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {lang === 'ar' 
              ? 'صممت 6 نماذج مواقع ويب كاملة ومستقلة تحاكي نشاطك التجاري بدقة، اضغط على «معاينة الموقع» لتجربة الموقع الحقيقي والتفاعل مع ميزاته.' 
              : 'Explore 6 full interactive demo websites tailored for different industries. Click "Live Preview" to interact with each real demo.'}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
            <Info className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'جميع المشاريع أدناه هي نماذج تصميمية تجريبية حية ومكتملة البرمجة' : 'All projects below are fully interactive showcase demo websites'}</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-sky-500 text-slate-950 font-black shadow-md shadow-sky-500/25'
                  : isDark
                    ? 'bg-slate-900/80 text-slate-300 hover:text-white border border-white/5 hover:border-white/15'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((rawProject, index) => {
            const project = getTranslatedProject(rawProject);

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`border rounded-3xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col group ${
                  lang === 'ar' ? 'text-right' : 'text-left'
                } ${
                  isDark 
                    ? 'bg-[#0b1120] border-white/10 hover:border-sky-500/40 shadow-black/20 hover:shadow-sky-500/10' 
                    : 'bg-white border-slate-200 hover:border-sky-300 shadow-slate-100 hover:shadow-xl'
                }`}
              >
                {/* Media Header with Image */}
                <div 
                  className="relative h-56 sm:h-60 overflow-hidden cursor-pointer bg-slate-950"
                  onClick={() => onLaunchDemo(project.id)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Category Badge */}
                  <div className={`absolute top-3 ${lang === 'ar' ? 'right-3' : 'left-3'} flex items-center gap-2`}>
                    <span className="text-[11px] font-bold text-white bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 shadow-sm">
                      {project.categoryName}
                    </span>
                  </div>

                  {/* Demo Prototype Tag */}
                  <div className={`absolute top-3 ${lang === 'ar' ? 'left-3' : 'right-3'} flex items-center gap-1.5 bg-emerald-950/90 text-emerald-400 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[10px] font-bold shadow-md`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{project.statusLabel}</span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <span className="px-5 py-2.5 rounded-xl bg-sky-500 text-slate-950 text-xs font-black flex items-center gap-2 shadow-xl shadow-sky-500/30">
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>{lang === 'ar' ? 'فتح ومعاينة الموقع كاملاً' : 'Launch Live Demo'}</span>
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h3 
                    onClick={() => onLaunchDemo(project.id)}
                    className={`text-base sm:text-lg font-bold group-hover:text-sky-400 transition-colors mb-2 cursor-pointer leading-snug ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 flex-grow line-clamp-2 ${
                    isDark ? 'text-slate-300' : 'text-slate-700 font-medium'
                  }`}>
                    {project.summary}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                          isDark 
                            ? 'text-slate-400 bg-slate-900/90 border-white/5' 
                            : 'text-slate-700 bg-slate-100 border-slate-200 font-semibold'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Dual Action Buttons */}
                  <div className={`pt-3.5 border-t grid grid-cols-2 gap-2 ${
                    isDark ? 'border-white/10' : 'border-slate-100'
                  }`}>
                    <button
                      type="button"
                      onClick={() => onLaunchDemo(project.id)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>{lang === 'ar' ? 'معاينة الموقع' : 'Live Preview'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenProject(project)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                        isDark 
                          ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-white/10' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                      }`}
                    >
                      <Info className="w-3.5 h-3.5 text-sky-400" />
                      <span>{lang === 'ar' ? 'المواصفات' : 'Details'}</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
