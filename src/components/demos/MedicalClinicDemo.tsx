import React, { useState } from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Calendar, 
  Clock, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  User, 
  MessageCircle, 
  Sparkles, 
  Check, 
  X,
  ChevronLeft
} from 'lucide-react';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyKey: string;
  credentials: string;
  experience: string;
  image: string;
  priceSAR: number;
}

const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'د. ريم المنصور',
    specialty: 'طب وتجميل الأسنان وزراعة الأسنان',
    specialtyKey: 'dental',
    credentials: 'البورد السويدي في زراعة وتجميل الأسنان',
    experience: 'خبرة 14 سنة',
    image: 'https://images.unsplash.com/photo-1594824813511-66779e2cf442?auto=format&fit=crop&w=800&q=80',
    priceSAR: 250
  },
  {
    id: 'doc-2',
    name: 'د. خالد السالم',
    specialty: 'طب الأطفال وحديثي الولادة',
    specialtyKey: 'pediatrics',
    credentials: 'الزمالة الكندية في رعاية الأطفال والرضع',
    experience: 'خبرة 18 سنة',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    priceSAR: 220
  },
  {
    id: 'doc-3',
    name: 'د. سارة الغامدي',
    specialty: 'الأمراض الجلدية والليزر التجميلي',
    specialtyKey: 'derma',
    credentials: 'البورد الأمريكي في الأمراض الجلدية وعلاج البشرة',
    experience: 'خبرة 12 سنة',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    priceSAR: 280
  },
  {
    id: 'doc-4',
    name: 'د. فهد القحطاني',
    specialty: 'الطب الباطني واستشاري أمراض القلب',
    specialtyKey: 'internal',
    credentials: 'استشاري أمراض القلب وقسطرة الشرايين التاجية',
    experience: 'خبرة 16 سنة',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    priceSAR: 300
  }
];

export const MedicalClinicDemo: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [chosenDoctor, setChosenDoctor] = useState<Doctor | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    patientName: '',
    phone: '',
    specialty: 'dental',
    date: '2026-10-27',
    timeSlot: '16:00',
    notes: ''
  });

  const specialties = [
    { id: 'all', name: 'جميع التخصصات' },
    { id: 'dental', name: 'الأسنان والابتسامة' },
    { id: 'derma', name: 'الجلدية والليزر' },
    { id: 'pediatrics', name: 'طب الأطفال' },
    { id: 'internal', name: 'الباطنية والقلب' }
  ];

  const filteredDoctors = selectedSpecialty === 'all'
    ? DOCTORS
    : DOCTORS.filter(d => d.specialtyKey === selectedSpecialty);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setIsBookModalOpen(false);
      setBookingSubmitted(false);
      setChosenDoctor(null);
    }, 2800);
  };

  const openBookingForDoctor = (doc: Doctor) => {
    setChosenDoctor(doc);
    setBookingData(prev => ({ ...prev, specialty: doc.specialtyKey }));
    setIsBookModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-teal-500 selection:text-slate-950" dir="rtl">
      {/* Top Clinic Info Bar */}
      <div className="bg-teal-950/60 border-b border-teal-800/30 text-teal-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-teal-400" /> الرياض - طريق الإمام سعود، مخرج 9</span>
            <span className="hidden sm:flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-teal-400" /> السبت - الخميس: 9:00 ص - 10:00 م</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-rose-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              طوارئ العيادات: 920000000
            </span>
          </div>
        </div>
      </div>

      {/* Main Clinic Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20">
              <HeartPulse className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-tight flex items-center gap-1.5">
                مجمع شفاء الطبي
                <span className="text-[10px] font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-500/30">SHIFA CLINIC</span>
              </span>
              <p className="text-[11px] text-slate-400 hidden sm:block">رعاية تخصصية شاملة بمعايير عالمية</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <a href="#specialties" className="hover:text-teal-400 transition-colors">العيادات التخصصية</a>
            <a href="#doctors" className="hover:text-teal-400 transition-colors">أطباؤنا الاستشاريون</a>
            <a href="#features" className="hover:text-teal-400 transition-colors">مزايا الرعاية</a>
          </nav>

          <button
            onClick={() => {
              setChosenDoctor(null);
              setIsBookModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>حجز موعد كشف</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-8 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>اعتماد المركز السعودي لاعتماد المنشآت الصحية (CBAHI)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              صحتك وصحة عائلتك في أيدٍ <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                استشارية متخصصة وموثوقة
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              نجمع أفضل الاستشاريين في طب وتجميل الأسنان، الجلدية، الأطفال، والباطنية تحت سقف واحد بأحدث التقنيات وأعلى معايير التعقيم والراحة.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setChosenDoctor(null);
                  setIsBookModalOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition-all cursor-pointer"
              >
                احجز موعدك الطبي الآن
              </button>
              <a
                href="#doctors"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-white/10 transition-all cursor-pointer"
              >
                استعراض كادر الأطباء
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 text-slate-300 text-xs">
              <div>
                <span className="block text-xl font-black text-teal-400">+25</span>
                <span>طبيب استشاري</span>
              </div>
              <div>
                <span className="block text-xl font-black text-teal-400">100%</span>
                <span>تعقيم رقمي فائق</span>
              </div>
              <div>
                <span className="block text-xl font-black text-teal-400">+40,000</span>
                <span>مريض راضٍ سنوياً</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                alt="Clinic Reception"
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-bold text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-lg w-fit border border-teal-500/30">
                  صالة استقبال فندقية مريحة
                </span>
                <h3 className="text-white font-bold text-base mt-2">بيئة هادئة ومجهزة لخصوصية تامة لجميع المراجعين</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-400 tracking-wider uppercase">فريق النخبة الطبي</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-3">نخبة من الاستشاريين ذوي الخبرة العالية</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            يمكنك الاطلاع على مؤهلات كل طبيب وحجز موعد كشف مباشر في العيادة.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {specialties.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSpecialty(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSpecialty === tab.id
                  ? 'bg-teal-500 text-slate-950 font-black shadow-lg shadow-teal-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map(doc => (
            <div
              key={doc.id}
              className="rounded-3xl bg-slate-900 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-teal-500/40 hover:shadow-xl transition-all"
            >
              <div>
                <div className="relative h-60 bg-slate-950 overflow-hidden">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-3 right-3 text-[11px] font-bold text-white bg-slate-950/80 px-2.5 py-1 rounded-lg border border-white/10">
                    {doc.experience}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-xs text-teal-400 font-bold block mb-1">{doc.specialty}</span>
                  <h3 className="font-bold text-base text-white mb-2">{doc.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {doc.credentials}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5 mt-2">
                <div className="flex items-baseline justify-between mb-3 pt-2">
                  <span className="text-xs text-slate-400">سعر الكشف:</span>
                  <span className="text-sm font-black text-teal-400 font-mono">{doc.priceSAR} ريال</span>
                </div>

                <button
                  onClick={() => openBookingForDoctor(doc)}
                  className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>حجز موعد كشف</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Booking Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsBookModalOpen(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border border-teal-500/30 rounded-3xl p-6 shadow-2xl z-10">
            <button onClick={() => setIsBookModalOpen(false)} className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">تم تأكيد حجز الموعد بنجاح!</h3>
                <p className="text-xs text-slate-300">
                  تم إرسال رسالة نصية وتأكيد واتساب إلى رقمك بتفاصيل وموقع العيادة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="text-center pb-2">
                  <Stethoscope className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                  <h3 className="text-base font-bold text-white">
                    {chosenDoctor ? `حجز موعد مع ${chosenDoctor.name}` : 'حجز موعد كشف طبي'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">اختر الموعد الأنسب وسنقوم بتأكيده فوراً</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المريض / المراجِع</label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي"
                    value={bookingData.patientName}
                    onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الجوال لتأكيد الحجز</label>
                  <input
                    type="tel"
                    required
                    placeholder="05xxxxxxxx"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">تاريخ الموعد</label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">الفترة المتاحة</label>
                    <select
                      value={bookingData.timeSlot}
                      onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="10:00">10:00 صباحاً</option>
                      <option value="11:30">11:30 صباحاً</option>
                      <option value="16:00">4:00 عصراً</option>
                      <option value="17:30">5:30 عصراً</option>
                      <option value="19:00">7:00 مساءً</option>
                      <option value="20:30">8:30 مساءً</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">ملاحظات أو أعراض ترغب بإضافتها</label>
                  <textarea
                    rows={2}
                    placeholder="اختياري: هل تشكو من أعراض معينة أو علاج سابق؟"
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  تأكيد موعد الكشف الآن
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <p>نموذج تجريبي تفاعلي لموقع عيادة ومجمع طبي مع نظام حجز مواعيد إلكتروني</p>
      </footer>
    </div>
  );
};
