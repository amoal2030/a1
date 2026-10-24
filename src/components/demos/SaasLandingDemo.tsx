import React, { useState } from 'react';
import { 
  Zap, 
  Check, 
  Sparkles, 
  Shield, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  ArrowLeft, 
  Star, 
  Users, 
  Layers, 
  X,
  Play
} from 'lucide-react';

export const SaasLandingDemo: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [trialEmail, setTrialEmail] = useState('');
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [interactiveTasks, setInteractiveTasks] = useState([
    { id: 1, title: 'إطلاق النسخة 2.4 من واجهة برمجة التطبيقات', done: true, tag: 'تطوير' },
    { id: 2, title: 'تصميم تجربة التسجيل الجديدة للمستخدمين', done: false, tag: 'تصميم UI' },
    { id: 3, title: 'مراجعة مؤشرات الأداء الربع سنوية', done: false, tag: 'إدارة' },
  ]);

  const toggleTask = (id: number) => {
    setInteractiveTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrialSuccess(true);
    setTimeout(() => {
      setIsTrialModalOpen(false);
      setTrialSuccess(false);
      setTrialEmail('');
    }, 2500);
  };

  const faqs = [
    {
      q: 'هل توجد فترة تجربة مجانية بدون بطاقة ائتمانية؟',
      a: 'نعم، نوفر تجربة مجانية بالكامل لمدة 14 يوماً مع وصول غير محدود لكافة ميزات الذكاء الاصطناعي وبدون الحاجة لإدخال أي بطاقة بنكية.'
    },
    {
      q: 'هل يدعم فوكس ميتريك اللغة العربية بالكامل؟',
      a: 'بالتأكيد، المنصة مصممة ومبرمجة لتدعم الواجهات العربية واتجاه RTL وتوليد التقارير وتلخيص الاجتماعات باللغة العربية بذكاء فائق.'
    },
    {
      q: 'هل يمكن ربط النظام مع تطبيقات فريقي الحالية؟',
      a: 'نعم، يتكامل فوكس ميتريك بضغطة زر واحدة مع Slack، Google Workspace، GitHub، WhatsApp Business، وZapier.'
    },
    {
      q: 'ما مدى أمان وسرية بيانات مشاريعنا؟',
      a: 'تُحفظ جميع البيانات في خوادم مشفرة سحابياً بمعيار AES-256 المتوافق مع معايير الأمان العالمية SOC2 وGDPR.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500 selection:text-white" dir="rtl">
      {/* Top Notification */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-violet-800/30">
        <Sparkles className="w-3.5 h-3.5 text-violet-300" />
        <span>تم إطلاق ميزة المساعد الذكي AI Auto-Pilot | جربها مجاناً اليوم</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-tight flex items-center gap-1.5">
                فوكس ميتريك
                <span className="text-[10px] font-bold text-violet-400 bg-violet-950 px-2 py-0.5 rounded border border-violet-500/30">SAAS PLATFORM</span>
              </span>
              <p className="text-[11px] text-slate-400 hidden sm:block">منصة ذكية لإدارة المشاريع والفرق</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-violet-400 transition-colors">الميزات</a>
            <a href="#preview" className="hover:text-violet-400 transition-colors">لوحة التحكم</a>
            <a href="#pricing" className="hover:text-violet-400 transition-colors">الباقات والأسعار</a>
            <a href="#faq" className="hover:text-violet-400 transition-colors">الأسئلة الشائعة</a>
          </nav>

          <button
            onClick={() => setIsTrialModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>ابدأ تجربة مجانية</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-8 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.22),rgba(255,255,255,0))]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-violet-400 text-violet-400" />
            <span>منصة الإنتاجية رقم 1 في المنطقة لعام 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            نظّم أعمال فريقك وضاعف إنتاجيتك <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400">
              بقوة الذكاء الاصطناعي
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            تخلص من تشتت المحادثات والمهام الضائعة. لوحات كانبان ذكية، تقارير أداء لحظية، وتلخيص آلي لسير العمل يمنح فريقك سرعة إنجاز استثنائية.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => setIsTrialModalOpen(true)}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-xl shadow-violet-600/30 transition-all cursor-pointer active:scale-95"
            >
              ابدأ تجربتك المجانية لمدة 14 يوماً
            </button>
            <a
              href="#preview"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-violet-400 fill-violet-400" />
              <span>جرب لوحة التحكم التفاعلية</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> بدون بطاقة ائتمانية</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> إعداد في دقيقتين</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> إلغاء في أي وقت</span>
          </div>
        </div>

        {/* Interactive App UI Preview */}
        <div id="preview" className="max-w-5xl mx-auto mt-14 rounded-3xl bg-slate-900 border border-violet-500/30 p-4 sm:p-6 shadow-2xl shadow-violet-500/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-xs text-slate-400 font-mono mr-2">FocusMetric Workspace v2.4</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/20">
              ● متصل ومباشر
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left mini sidebar stats */}
            <div className="md:col-span-4 bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-4">
              <div>
                <span className="text-xs text-slate-400">إنجاز مهام الأسبوع</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xl font-black text-white">84%</span>
                  <span className="text-xs text-emerald-400 font-bold">+12% أسرع</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full w-[84%]"></div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>الأعضاء النشطين:</span>
                  <span className="font-bold text-white">16 عضواً</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>المهام المتبقية:</span>
                  <span className="font-bold text-violet-400">4 مهام فقط</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/20 text-xs text-violet-300">
                ✨ اقتراح الذكاء الاصطناعي: تم تلخيص تقرير الأداء اليومي وإرساله للمدير بنجاح.
              </div>
            </div>

            {/* Interactive Tasks Checklist */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">قائمة المهام السريعة (جرب الضغط عليها للتحديد):</h4>
                <span className="text-xs text-slate-400">انقر للإكمال</span>
              </div>

              <div className="space-y-2">
                {interactiveTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      task.done 
                        ? 'bg-slate-950/50 border-white/5 opacity-60 line-through' 
                        : 'bg-slate-800/80 border-white/10 hover:border-violet-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        task.done ? 'bg-violet-500 border-violet-500 text-white' : 'border-slate-500'
                      }`}>
                        {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-white">{task.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/5">
                      {task.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Monthly / Yearly toggle */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-violet-400 tracking-wider uppercase">خطط الاشتراك المرنة</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-3">اختر الباقة المناسبة لحجم فريقك</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            يمكنك البدء مجاناً والترقية مع نمو أعمالك في أي وقت.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10 mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              دفع شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>دفع سنوي</span>
              <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full">وفر 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400">باقة البداية</span>
              <h3 className="text-lg font-bold text-white mt-1">Starter Free</h3>
              <div className="my-4">
                <span className="text-3xl font-black text-white">$0</span>
                <span className="text-xs text-slate-400 mr-1">/ للأبد</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">مثالية للأفراد والمستقلين لتنظيم مهامهم اليومية.</p>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> حتى 3 مشاريع نشطة</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> لوحات كانبان غير محدودة</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 1GB مساحة تخزين سحابية</div>
              </div>
            </div>

            <button
              onClick={() => setIsTrialModalOpen(true)}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 transition-colors cursor-pointer"
            >
              البدء مجاناً
            </button>
          </div>

          {/* Pro Tier (Featured) */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-violet-950/60 to-slate-900 border-2 border-violet-500 shadow-2xl shadow-violet-500/20 flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-950 bg-gradient-to-r from-violet-400 to-cyan-400 px-3 py-0.5 rounded-full shadow">
              الأكثر طلباً للفرق ⭐
            </span>
            <div>
              <span className="text-xs font-bold text-violet-400">باقة الفرق الاحترافية</span>
              <h3 className="text-lg font-bold text-white mt-1">Pro Team</h3>
              <div className="my-4">
                <span className="text-3xl font-black text-white">
                  ${billingCycle === 'yearly' ? '15' : '19'}
                </span>
                <span className="text-xs text-slate-400 mr-1">/ شهرياً لكل مستخدم</span>
              </div>
              <p className="text-xs text-slate-300 mb-6">للشركات الناشئة وفرق العمل التي تحتاج للسرعة والذكاء الاصطناعي.</p>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> عدد غير محدود من المشاريع والمهام</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> مساعد الذكاء الاصطناعي AI Auto-Pilot</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> تقارير إنتاجية أسبوعية آلية</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> تكامل كامل مع Slack وWhatsApp</div>
              </div>
            </div>

            <button
              onClick={() => setIsTrialModalOpen(true)}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg shadow-violet-500/30 transition-all cursor-pointer"
            >
              ابدأ تجربة الـ 14 يوماً مجاناً
            </button>
          </div>

          {/* Enterprise */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400">باقة المؤسسات</span>
              <h3 className="text-lg font-bold text-white mt-1">Enterprise Scale</h3>
              <div className="my-4">
                <span className="text-3xl font-black text-white">
                  ${billingCycle === 'yearly' ? '39' : '49'}
                </span>
                <span className="text-xs text-slate-400 mr-1">/ شهرياً لكل مستخدم</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">للشركات الكبرى التي تتطلب أماناً مخصصاً وإدارة صلاحيات متطورة.</p>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> بنية تحتية سحابية مخصصة Dedicated</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> تسجيل دخول موحد SSO ومعايير SAML</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> مدير حساب فني خاص ودعم 24/7</div>
              </div>
            </div>

            <button
              onClick={() => setIsTrialModalOpen(true)}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 transition-colors cursor-pointer"
            >
              تواصل مع المبيعات
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-8 py-16 border-t border-white/10">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-3xl font-black text-white">الأسئلة الشائعة حول المنصة</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900 border border-white/5 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-right flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-violet-400 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-violet-400' : 'text-slate-500'}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Free Trial Modal */}
      {isTrialModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsTrialModalOpen(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border border-violet-500/30 rounded-3xl p-6 shadow-2xl z-10 text-center">
            <button onClick={() => setIsTrialModalOpen(false)} className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>

            {trialSuccess ? (
              <div className="py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">تم تفعيل حسابك التجريبي!</h3>
                <p className="text-xs text-slate-300">
                  تم إرسال رابط الدخول وكلمة المرور المؤقتة إلى بريدك الإلكتروني.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTrialSubmit} className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-400 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">ابدأ تجربة فوكس ميتريك مجاناً</h3>
                <p className="text-xs text-slate-400">14 يوماً من الإنتاجية الكاملة دون أي التزام مالي</p>

                <input
                  type="email"
                  required
                  placeholder="ادخل بريدك الإلكتروني للعمل..."
                  value={trialEmail}
                  onChange={(e) => setTrialEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
                >
                  إنشاء مساحة العمل التجريبية الآن
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <p>نموذج تجريبي تفاعلي لصفحة هبوط منتج رقمي ومنصة سحابية (SaaS)</p>
      </footer>
    </div>
  );
};
