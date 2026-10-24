import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  Cloud, 
  Smartphone, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Users2, 
  Activity, 
  Code2, 
  MessageSquare,
  Sparkles,
  Layers,
  ChevronLeft
} from 'lucide-react';

export const TechCompanyDemo: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('cloud');
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    companyName: '',
    email: '',
    serviceType: 'cloud',
    budget: '50k',
    projectScope: ''
  });

  const services = [
    {
      id: 'cloud',
      title: 'الأنظمة السحابية وبوابات المؤسسات',
      icon: Cloud,
      desc: 'بناء منصات الويب السحابية الضخمة القابلة للتوسع (Microservices & Serverless) مع قواعد بيانات موزعة وأمان عالي.',
      features: ['معمارية Microservices مرنة', 'تكامل آمن عبر Rest API وGraphQL', 'تحكم كامل بالصلاحيات RBAC', 'توافق مع معايير الأيزو والأمن']
    },
    {
      id: 'mobile',
      title: 'تطبيقات الهواتف الذكية المتقدمة',
      icon: Smartphone,
      desc: 'تطوير تطبيقات أصلية وهجينة للأجهزة الذكية (iOS & Android) بأداء فائق وتجربة مستخدم سلسة واستجابة فورية.',
      features: ['دعم كامل لنظامي iOS وAndroid', 'إشعارات لحظية متزامنة', 'ربط بوابات الدفع والمحافظ', 'واجهات سريعة وتفاعلية']
    },
    {
      id: 'ai',
      title: 'الذكاء الاصطناعي وأتمتة العمليات',
      icon: Cpu,
      desc: 'دمج نماذج الذكاء الاصطناعي التوليدي وتحليل البيانات الضخمة وأتمتة المهام الروتينية لرفع كفاءة فريقك بنسبة 300%.',
      features: ['شات بوت ذكي مخصص للشركات', 'أتمتة معالجة المستندات والفواتير', 'تحليلات تنبؤية لسلوك العملاء', 'لوحات تحكم ذكية للبيانات']
    },
    {
      id: 'cyber',
      title: 'الأمن السيبراني وحماية البنية التحتية',
      icon: ShieldCheck,
      desc: 'تقييم الثغرات الأمنية، واختبار الاختراق الأخلاقي، وتأمين الخوادم والبيانات الحساسة ضد أي تهديدات سيبرانية.',
      features: ['فحص دوري للثغرات البرمجية', 'تشفير البيانات الحساسة End-to-End', 'تطبيق ضوابط الهيئة الوطنية للأمن', 'نسخ احتياطي واستعادة في الكوارث']
    }
  ];

  const caseStudies = [
    {
      client: 'شركة المدار اللوجستية',
      title: 'نظام إدارة أساطيل الشحن وتتبع الشحنات اللحظي',
      metrics: 'تقليص وقت تسليم الشحنات بنسبة 42%',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      tag: 'لوجستيات'
    },
    {
      client: 'مجموعة الرؤية المالية',
      title: 'منصة استثمار آمنة وإدارة المحافظ الرقمية',
      metrics: 'معالجة أكثر من 1.2 مليون عملية آمنة شهرياً',
      tech: ['Next.js', 'Python AI', 'AWS Cloud', 'Redis'],
      tag: 'تقنية مالية FinTech'
    },
    {
      client: 'شبكة التعليم الذكي',
      title: 'بوابة تعليمية متكاملة لـ 50 ألف طالب ومعلم',
      metrics: 'جاهزية 99.98% خلال فترات الاختبارات المكثفة',
      tech: ['TypeScript', 'FastAPI', 'Kubernetes', 'WebRTC'],
      tag: 'تعليم إلكتروني'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSubmitted(true);
    setTimeout(() => setConsultationSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white" dir="rtl">
      {/* Enterprise Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-tight flex items-center gap-1.5">
                سحاب سوفت
                <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">SAHAB SOFT</span>
              </span>
              <p className="text-[11px] text-slate-400 hidden sm:block">حلول برمجية وتحول رقمي متقدم</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-blue-400 transition-colors">الخدمات التقنية</a>
            <a href="#casestudies" className="hover:text-blue-400 transition-colors">قصص النجاح</a>
            <a href="#stats" className="hover:text-blue-400 transition-colors">عن الشركة</a>
            <a href="#quote" className="hover:text-blue-400 transition-colors">طلب استشارة</a>
          </nav>

          <a
            href="#quote"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>ابدأ مشروعك</span>
            <ChevronLeft className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-8 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.18),rgba(255,255,255,0))]">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الشريك التقني لأكثر من 150 مؤسسة وهيئة تجارية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            نطور برمجيات ذكية وحلولاً سحابية <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              تقود أعمالك نحو الريادة الرقمية
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            من الفكرة إلى البنية السحابية المتكاملة، نبتكر أنظمة مؤسسية مخصصة، تطبيقات فائقة التجاوب، وحلول ذكاء اصطناعي تواكب طموح شركتك.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#quote"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-600/25 transition-all cursor-pointer"
            >
              طلب استشارة ومقترح تكلفة مجاني
            </a>
            <a
              href="#casestudies"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              استعراض قصص النجاح
            </a>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div id="stats" className="max-w-6xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
          <div className="text-center p-3">
            <span className="block text-3xl font-black text-blue-400 font-mono">+150</span>
            <span className="text-xs text-slate-400 font-medium">مشروع برمجي منجز</span>
          </div>
          <div className="text-center p-3 border-r border-white/5">
            <span className="block text-3xl font-black text-indigo-400 font-mono">99.9%</span>
            <span className="text-xs text-slate-400 font-medium">نسبة استقرار الأنظمة (SLA)</span>
          </div>
          <div className="text-center p-3 border-r border-white/5">
            <span className="block text-3xl font-black text-cyan-400 font-mono">+45</span>
            <span className="text-xs text-slate-400 font-medium">مهندس ومطور استشاري</span>
          </div>
          <div className="text-center p-3 border-r border-white/5">
            <span className="block text-3xl font-black text-emerald-400 font-mono">12+</span>
            <span className="text-xs text-slate-400 font-medium">دولة في الشرق الأوسط</span>
          </div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">الخدمات التخصصية</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-3">قدرات هندسية متكاملة لجميع المجالات</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            نقدم حلولاً برمجية مصممة خصيصاً وفق أحدث المعايير العالمية في الأمان وسرعة التنفيذ.
          </p>
        </div>

        {/* Services Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {services.map(srv => {
            const IconComponent = srv.icon;
            const isSelected = selectedService === srv.id;

            return (
              <button
                key={srv.id}
                onClick={() => setSelectedService(srv.id)}
                className={`p-5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10' 
                    : 'bg-slate-900/60 border-white/5 hover:border-white/15'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-blue-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">{srv.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{srv.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        {(() => {
          const current = services.find(s => s.id === selectedService)!;
          const CurrentIcon = current.icon;
          return (
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">{current.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{current.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {current.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-4 text-center">
                <h4 className="text-sm font-bold text-white">هل ترغب في تنفيذ نظام مماثل؟</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  احصل على دراسة جدوى فنية مجانية وتحديد زمني دقيق لمشروعك خلال 24 ساعة.
                </p>
                <a
                  href="#quote"
                  className="inline-block w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  طلب تفاصيل الخدمة
                </a>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Case Studies */}
      <section id="casestudies" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">نماذج من أعمالنا</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-3">قصص نجاح تثبت الفارق في أداء المؤسسات</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                  {item.tag}
                </span>
                <span className="block text-xs text-slate-400 mt-3 font-medium">{item.client}</span>
                <h3 className="font-bold text-base text-white mt-1 mb-3 leading-snug">{item.title}</h3>
                
                <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-emerald-400 font-semibold mb-4">
                  📈 {item.metrics}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {item.tech.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Request / Quote Form */}
      <section id="quote" className="max-w-4xl mx-auto px-4 sm:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 shadow-2xl">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-xs font-bold text-blue-400">ابدأ التعاون التقني</span>
            <h3 className="text-2xl font-black text-white mt-1">طلب استشارة وعرض سعر لمشروعك</h3>
            <p className="text-xs text-slate-400 mt-2">سنرد عليك خلال 12 ساعة بخطة عمل تفصيلية وتكلفة تقديرية</p>
          </div>

          {consultationSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-white text-base">تم إرسال طلبك بنجاح!</h4>
              <p className="text-xs text-slate-300">سيتواصل معك مهندس الحلول لمناقشة التفاصيل الفنية فوراً.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المؤسسة أو النشاط</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: شركة التطوير اللوجستي"
                    value={formState.companyName}
                    onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني للعمل</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">نوع الحل المطلوب</label>
                  <select
                    value={formState.serviceType}
                    onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="cloud">نظام سحابي وبوابة إلكترونية</option>
                    <option value="mobile">تطبيق هاتف ذكي (iOS / Android)</option>
                    <option value="ai">حلول ذكاء اصطناعي وأتمتة</option>
                    <option value="cyber">تدقيق أمني واختبار اختراق</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">الميزانية المتوقعة</label>
                  <select
                    value={formState.budget}
                    onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="10k">$5,000 - $10,000</option>
                    <option value="25k">$10,000 - $25,000</option>
                    <option value="50k">$25,000 - $50,000</option>
                    <option value="100k">أكثر من $50,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">نبذة عن فكرة المشروع ومتطلباته</label>
                <textarea
                  rows={3}
                  required
                  placeholder="وضح باختصار أهداف النظام والوظائف الرئيسية التي ترغب في بنائها..."
                  value={formState.projectScope}
                  onChange={(e) => setFormState({ ...formState, projectScope: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                إرسال طلب الاستشارة الفنية الآن
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <p>نموذج تجريبي تفاعلي لموقع شركة برمجيات وحلول رقمية ومؤسسية</p>
      </footer>
    </div>
  );
};
