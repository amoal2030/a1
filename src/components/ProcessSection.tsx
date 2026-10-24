import React from 'react';
import { APP_CONFIG, ProcessStep } from '../data/config';
import { TRANSLATIONS, Language, Theme } from '../data/translations';
import { MessageSquare, Calculator, Code2, Smartphone, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessSectionProps {
  lang?: Language;
  theme?: Theme;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  lang = 'ar',
  theme = 'dark'
}) => {
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-sky-500" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-sky-500" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-sky-500" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-sky-500" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-sky-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-sky-500" />;
    }
  };

  const getTranslatedStep = (step: ProcessStep) => {
    if (lang === 'ar') return step;

    switch (step.step) {
      case 1:
        return {
          ...step,
          title: "Discovery & Ideas",
          description: "We chat via WhatsApp to understand your business, target audience, and available brand materials or photos.",
          duration: "Day 1"
        };
      case 2:
        return {
          ...step,
          title: "Scope & Fixed Price",
          description: "We agree with complete transparency on page count, features, deadline, and a fixed price with zero surprises.",
          duration: "Day 1"
        };
      case 3:
        return {
          ...step,
          title: "Modern Build & Coding",
          description: "I develop and build your site using modern web tools augmented with AI for clean, blazing-fast, secure code.",
          duration: "Day 2 - 3"
        };
      case 4:
        return {
          ...step,
          title: "Live Review & Polish",
          description: "You receive a live testing link to interact with your site on your phone and laptop, and we fine-tune any details.",
          duration: "Day 4"
        };
      default:
        return {
          ...step,
          title: "Handoff & Launch",
          description: "I hand over the complete source code and guide you step by step to deploy your site live on free cloud hosting.",
          duration: "Day 5"
        };
    }
  };

  return (
    <section id="process" className={`py-20 border-y transition-colors ${
      isDark ? 'bg-slate-900/40 border-white/5' : 'bg-slate-100/60 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`max-w-3xl mb-14 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <span className="text-xs font-bold text-sky-500 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20 inline-block">
            {t.process.kicker}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black mt-3 mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.process.title}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {t.process.subtitle}
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {APP_CONFIG.processSteps.map((rawStep, index) => {
            const step = getTranslatedStep(rawStep);

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 group ${
                  lang === 'ar' ? 'text-right' : 'text-left'
                } ${
                  isDark 
                    ? 'bg-[#0b1120] border-white/10 hover:border-sky-500/40 shadow-black/10 hover:shadow-sky-500/5' 
                    : 'bg-white border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Step Header with Number & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-mono font-black text-sky-500 text-sm group-hover:scale-105 transition-transform ${
                      isDark ? 'bg-slate-900 border-white/10' : 'bg-slate-100 border-slate-200'
                    }`}>
                      0{step.step}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                      {step.duration}
                    </span>
                  </div>

                  <div className="mb-2">
                    {getStepIcon(step.iconName)}
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold mb-2 group-hover:text-sky-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
                    {step.description}
                  </p>
                </div>

                <div className={`pt-4 border-t mt-4 text-[11px] font-semibold ${
                  isDark ? 'border-white/5 text-slate-400' : 'border-slate-100 text-slate-600'
                }`}>
                  {step.step === 5 ? t.process.readyToLaunch : t.process.stepOf.replace('{step}', String(step.step))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
