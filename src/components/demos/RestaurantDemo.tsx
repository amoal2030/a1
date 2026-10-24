import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Flame, 
  Check, 
  X, 
  Star, 
  Coffee, 
  Cake, 
  Pizza, 
  Sparkles 
} from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  category: 'mains' | 'pizza' | 'drinks' | 'desserts' | 'starters';
  price: number;
  calories: number;
  image: string;
  badge?: string;
  description: string;
  tags: string[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'ستيك ريب آي بلاك أنجوس مع صوص الكمأة الفاخرة',
    category: 'mains',
    price: 34,
    calories: 780,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    badge: 'توصية الشيف ⭐',
    description: 'قطعة لحم أنجوس مشوية على الفحم بدرجة النضج المفضلة مع بيوريه البطاطس الكريمي وصوص الكمأة الإيطالي.',
    tags: ['بدون جلوتين', 'بروتين عالي']
  },
  {
    id: 'm2',
    name: 'سلمون نرويجي مشوي مع زبدة الأعشاب والليمون',
    category: 'mains',
    price: 28,
    calories: 520,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    badge: 'طازج يومياً',
    description: 'فيليه سلمون طازج مطهو على البخار مع خضار سوتيه مقرمشة وزبدة الشبت والليمون الصقلي.',
    tags: ['صحي', 'أوميغا 3']
  },
  {
    id: 'm3',
    name: 'بيتزا نابوليتانا مارغريتا بالحطب والريحان الطازج',
    category: 'pizza',
    price: 18,
    calories: 640,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    badge: 'فرن حطب أصلي',
    description: 'عجينة مخمرة طبيعياً لمدة 48 ساعة، صلصة طماطم سان مارزانو، جبنة موزاريلا بوفالو وريحان طازج.',
    tags: ['نباتي', 'تقليدي إيطالي']
  },
  {
    id: 'm4',
    name: 'سلطة جبن البوراتا مع التين البري والطماطم الكرزية',
    category: 'starters',
    price: 16,
    calories: 390,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80',
    description: 'جبنة بوراتا طازجة كريمية، طماطم كرزية مجففة، صنوبر محمص وصوص البالساميك المعتق.',
    tags: ['نباتي', 'مقبلات باردة']
  },
  {
    id: 'm5',
    name: 'كيكة سان سيباستيان المحروقة بصلصة الشوكولاتة البلجيكية',
    category: 'desserts',
    price: 11,
    calories: 460,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    badge: 'الأكثر طلباً',
    description: 'تشيز كيك إسباني كريمي بطبقة مكرملة غنية تقدم دافئة مع صوص شوكولاتة بلجيكية فاخرة.',
    tags: ['حلى فاخر']
  },
  {
    id: 'm6',
    name: 'قهوة مختصة فلات وايت بالبن الإثيوبي اليرغاشيفي',
    category: 'drinks',
    price: 6,
    calories: 140,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    badge: 'محصول مختص 88+',
    description: 'دبل شوت إسبريسو غني بنكهات الفواكه المجففة مع حليب مبخر بقوام مخملي ورسمة لاتي آرت دقيقة.',
    tags: ['قهوة مختصة']
  }
];

export const RestaurantDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedDishes, setSelectedDishes] = useState<{ [id: string]: number }>({});
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveSuccess, setReserveSuccess] = useState(false);
  const [reservation, setReservation] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '2026-10-25',
    time: '19:30',
    seating: 'indoor',
    notes: ''
  });

  const toggleDishSelect = (id: string) => {
    setSelectedDishes(prev => {
      const current = prev[id] || 0;
      if (current === 0) {
        return { ...prev, [id]: 1 };
      }
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const selectedCount = Object.keys(selectedDishes).length;
  const filteredDishes = activeTab === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(d => d.category === activeTab);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReserveSuccess(true);
    setTimeout(() => {
      setIsReserveModalOpen(false);
      setReserveSuccess(false);
    }, 2500);
  };

  const handleOrderViaWhatsApp = () => {
    const dishesList = Object.entries(selectedDishes)
      .map(([id, qty]) => {
        const item = MENU_ITEMS.find(m => m.id === id);
        return item ? `• ${item.name} (${item.price}$)` : '';
      })
      .filter(Boolean)
      .join('\n');

    const text = selectedCount > 0
      ? `مرحباً مطعم أروما لاونج، أود طلب الأصناف التالية:\n\n${dishesList}`
      : `مرحباً مطعم أروما لاونج، أود الاستفسار وحجز طاولة لديكم.`;

    window.open(`https://wa.me/966500000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans antialiased selection:bg-amber-500 selection:text-black" dir="rtl">
      {/* Top Bar with Info */}
      <div className="bg-amber-950/40 border-b border-amber-900/30 text-amber-200/90 text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> طريق الملك عبدالعزيز، حي النخيل</span>
          <span className="hidden sm:flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> يومياً: 1:00 ظهراً - 1:00 صباحاً</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono font-bold">+966 11 000 0000</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/20">
              <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-xl text-stone-100 font-serif tracking-wide">أروما لاونج</span>
              <span className="text-[10px] text-amber-400 block font-medium">BISTRO & SPECIALTY COFFEE</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
            <a href="#menu-section" className="hover:text-amber-400 transition-colors">قائمة الطعام</a>
            <a href="#about-section" className="hover:text-amber-400 transition-colors">عن المطعم</a>
            <a href="#hours-section" className="hover:text-amber-400 transition-colors">الموقع وساعات العمل</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>احجز طاولتك</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Atmosphere */}
      <section className="relative min-h-[500px] flex items-center justify-center py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            alt="Restaurant Ambiance"
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تجربة طعام راقية ومذاق استثنائي يحكي شغف الطهاة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-serif">
            أطباق عالمية مبتكرة بنكهات طازجة <span className="text-amber-400">وفرن حطب تقليدي</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            نجمع بين أصول الطهي المتوسطية الفاخرة وأجود المحاصيل واللحوم الطازجة في أجواء هادئة وأنيقة تلائم لقاءات العمل والعائلة.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="#menu-section"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
            >
              استعراض المنيو المصور والأسعار
            </a>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm border border-stone-700 backdrop-blur-md transition-all cursor-pointer"
            >
              حجز موعد عشاء
            </button>
          </div>
        </div>
      </section>

      {/* Menu Categories & Items */}
      <section id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">قائمة الطعام التفاعلية</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-3 font-serif">أشهى الأطباق والمشروبات</h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            يمكنك تصفح الأسعار، واختيار ما يعجبك لإرسال طلبك فورياً عبر واتساب أو الاستمتاع به في فرعنا.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {[
            { id: 'all', label: 'كامل القائمة' },
            { id: 'mains', label: 'الأطباق الرئيسية' },
            { id: 'pizza', label: 'البيتزا والمخبوزات' },
            { id: 'starters', label: 'المقبلات والسلطات' },
            { id: 'desserts', label: 'الحلويات الفاخرة' },
            { id: 'drinks', label: 'القهوة والمشروبات' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map(dish => {
            const isSelected = !!selectedDishes[dish.id];

            return (
              <div
                key={dish.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isSelected 
                    ? 'bg-amber-950/20 border-amber-500 shadow-xl shadow-amber-500/10' 
                    : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="relative h-48 bg-stone-950 overflow-hidden">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    {dish.badge && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold text-stone-950 bg-amber-400 px-2 py-0.5 rounded shadow">
                        {dish.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono font-medium text-stone-200 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                      {dish.calories} سعرة حرارية
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-base text-white">{dish.name}</h3>
                      <span className="text-base font-black text-amber-400 font-serif">${dish.price}</span>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed mb-3">
                      {dish.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {dish.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => toggleDishSelect(dish.id)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تمت إضافة الصنف للقائمة</span>
                      </>
                    ) : (
                      <>
                        <span>اختيار هذا الصنف للطلب</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Dishes Bar */}
        {selectedCount > 0 && (
          <div className="fixed bottom-6 inset-x-4 max-w-lg mx-auto z-40 bg-stone-900 border border-amber-500/40 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom duration-300">
            <div>
              <span className="text-xs font-bold text-amber-400 block">تم اختيار {selectedCount} أصناف</span>
              <span className="text-[11px] text-stone-400">جاهز للإرسال إلى واتساب المطعم</span>
            </div>
            <button
              onClick={handleOrderViaWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال الطلب</span>
            </button>
          </div>
        )}
      </section>

      {/* Reservation Modal */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsReserveModalOpen(false)} />
          <div className="relative w-full max-w-md bg-stone-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl z-10">
            <button onClick={() => setIsReserveModalOpen(false)} className="absolute top-4 left-4 p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800">
              <X className="w-5 h-5" />
            </button>

            {reserveSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">تم تأكيد استلام طلب الحجز!</h3>
                <p className="text-xs text-stone-300">
                  سيتواصل معك فريق الاستقبال لتأكيد تفاصيل طاولتك خلال دقائق.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div className="text-center pb-2">
                  <UtensilsCrossed className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-white font-serif">حجز طاولة في أروما لاونج</h3>
                  <p className="text-xs text-stone-400">يرجى ملء البيانات التالية لتأكيد أفضل موقع لك</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">الاسم الكريم</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عبدالله الشمري"
                    value={reservation.name}
                    onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">رقم الجوال</label>
                    <input
                      type="tel"
                      required
                      placeholder="05xxxxxxxx"
                      value={reservation.phone}
                      onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">عدد الضيوف</label>
                    <select
                      value={reservation.guests}
                      onChange={(e) => setReservation({ ...reservation, guests: e.target.value })}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="1">شخص واحد</option>
                      <option value="2">شخصان (طاولة ثنائية)</option>
                      <option value="4">4 أشخاص (عائلية)</option>
                      <option value="6">6 أشخاص</option>
                      <option value="8+">8 أشخاص فأكثر</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">تاريخ الحجز</label>
                    <input
                      type="date"
                      value={reservation.date}
                      onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">الوقت</label>
                    <select
                      value={reservation.time}
                      onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="13:30">1:30 ظهراً (غداء)</option>
                      <option value="15:00">3:00 عصراً</option>
                      <option value="19:30">7:30 مساءً (عشاء أول)</option>
                      <option value="21:30">9:30 مساءً (عشاء ثانٍ)</option>
                      <option value="23:00">11:00 ليلاً</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">مكان الجلوس المفضل</label>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {[
                      { id: 'indoor', label: 'صالة داخلية' },
                      { id: 'terrace', label: 'تراس خارجي' },
                      { id: 'private', label: 'جلسة خاصة' }
                    ].map(seat => (
                      <button
                        type="button"
                        key={seat.id}
                        onClick={() => setReservation({ ...reservation, seating: seat.id })}
                        className={`py-1.5 rounded-lg border text-xs cursor-pointer ${
                          reservation.seating === seat.id
                            ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                            : 'bg-stone-800 text-stone-300 border-stone-700'
                        }`}
                      >
                        {seat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  تأكيد حجز الطاولة الآن
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-8 px-4 text-center text-xs text-stone-500">
        <p>نموذج تجريبي تفاعلي لموقع مطعم وقائمة طعام ذكية مع نظام حجز طاولات</p>
      </footer>
    </div>
  );
};
