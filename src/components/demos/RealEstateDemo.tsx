import React, { useState } from 'react';
import { 
  Building, 
  Home, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Heart, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Check, 
  X, 
  SlidersHorizontal,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface Property {
  id: string;
  title: string;
  purpose: 'sale' | 'rent';
  type: 'villa' | 'apartment' | 'penthouse' | 'office';
  typeLabel: string;
  city: string;
  district: string;
  priceSAR: number;
  pricePeriod?: string;
  areaM2: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  badge?: string;
  features: string[];
}

const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'فيلا مودرن ذكية بتصميم معماري مع مسبح خاص',
    purpose: 'sale',
    type: 'villa',
    typeLabel: 'فيلا مستقلة',
    city: 'الرياض',
    district: 'حي حطين الراقي',
    priceSAR: 3850000,
    areaM2: 520,
    bedrooms: 5,
    bathrooms: 6,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badge: 'حصري وجديد ⭐',
    features: ['مسبح خارجي متدفق', 'نظام سمارت هوم كامل', 'غرفة سينما منزلية', 'مصعد إيطالي']
  },
  {
    id: 'prop-2',
    title: 'بنتهاوس فاخر بإطلالة بانورامية على كورنيش جدة',
    purpose: 'sale',
    type: 'penthouse',
    typeLabel: 'بنتهاوس بريميوم',
    city: 'جدة',
    district: 'حي الشاطئ',
    priceSAR: 2450000,
    areaM2: 340,
    bedrooms: 4,
    bathrooms: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    badge: 'إطلالة بحرية كاملة',
    features: ['شرفة واسعة على البحر', 'أرضيات رخام إيطالي', 'نادي صحي بالبرج', 'مواقف سيارات خاصة']
  },
  {
    id: 'prop-3',
    title: 'شقة عصرية مؤثثة بالكامل بتصميم سكندنافي',
    purpose: 'rent',
    type: 'apartment',
    typeLabel: 'شقة مفروشة',
    city: 'الرياض',
    district: 'حي الياسمين',
    priceSAR: 75000,
    pricePeriod: 'سنوياً',
    areaM2: 165,
    bedrooms: 3,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    badge: 'فرصة إيجار ذهبية',
    features: ['أثاث فندقي جديد', 'دخول ذكي ببصمة', 'مطبخ مجهز بالكامل', 'قريبة من المترو']
  },
  {
    id: 'prop-4',
    title: 'مكتب أعمال تنفيذي مفتوح في برج تجاري مرموق',
    purpose: 'rent',
    type: 'office',
    typeLabel: 'مكتب تجاري',
    city: 'الخبر',
    district: 'طريق الملك فيصل',
    priceSAR: 120000,
    pricePeriod: 'سنوياً',
    areaM2: 240,
    bedrooms: 0,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    badge: 'مجهز لشركات الـ IT',
    features: ['قاعة اجتماعات مجهزة', 'شبكة ألياف بصرية فائقة', 'خدمات أمن واستقبال 24/7', 'مواقف خاصة']
  },
  {
    id: 'prop-5',
    title: 'فيلا كلاسيكية واسعة مع حديقة ومجلس خارجي ضخم',
    purpose: 'sale',
    type: 'villa',
    typeLabel: 'قصر مصغر',
    city: 'الرياض',
    district: 'حي النرجس',
    priceSAR: 4900000,
    areaM2: 680,
    bedrooms: 6,
    bathrooms: 7,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    features: ['حديقة خلفية شاسعة', 'مجلس ضيافة يتسع لـ 40 شخصاً', 'غرفة سائق ومستودع', 'ضمانات إنشائية 10 سنوات']
  },
  {
    id: 'prop-6',
    title: 'شقة فاخرة دوبلكس بدرج داخلي وتشطيب VIP',
    purpose: 'sale',
    type: 'apartment',
    typeLabel: 'شقة دوبلكس',
    city: 'جدة',
    district: 'حي الروضة',
    priceSAR: 1350000,
    areaM2: 210,
    bedrooms: 3,
    bathrooms: 4,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    badge: 'تشطيب فندقي',
    features: ['نوافذ زجاجية مزدوجة', 'تكييف مركزي مدمج', 'موقع استراتيجي هادئ', 'اتحاد ملاك منظم']
  }
];

export const RealEstateDemo: React.FC = () => {
  const [purposeFilter, setPurposeFilter] = useState<'all' | 'sale' | 'rent'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [favorites, setFavorites] = useState<{ [id: string]: boolean }>({});
  const [selectedPropertyForViewing, setSelectedPropertyForViewing] = useState<Property | null>(null);
  const [viewingFormSubmitted, setViewingFormSubmitted] = useState(false);
  const [viewingForm, setViewingForm] = useState({
    name: '',
    phone: '',
    date: '2026-10-26',
    time: '17:00'
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const favoritesCount = Object.values(favorites).filter(Boolean).length;

  const filteredProperties = PROPERTIES.filter(p => {
    const matchesPurpose = purposeFilter === 'all' || p.purpose === purposeFilter;
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    const matchesCity = cityFilter === 'all' || p.city === cityFilter;
    return matchesPurpose && matchesType && matchesCity;
  });

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setViewingFormSubmitted(true);
    setTimeout(() => {
      setSelectedPropertyForViewing(null);
      setViewingFormSubmitted(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Building className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-xl text-white tracking-tight flex items-center gap-1.5">
                منصة دارك
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">للعقارات</span>
              </span>
              <p className="text-[11px] text-slate-400 hidden sm:block">استثمار وتسويق عقاري مرخص</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-white/10 text-xs font-bold text-slate-300">
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
              <span>المفضلة: {favoritesCount}</span>
            </div>
            <button
              onClick={() => alert('مرحباً بك! يمكنك التواصل مع المستشار العقاري عبر أزرار واتساب المخصصة لكل عقار.')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>تواصل مع وكيلنا</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero with Search Bar Filter */}
      <section className="relative py-16 px-4 sm:px-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>أكثر من 850 عقار سكني وتجاري موثق في مدن المملكة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            ابحث عن منزلك المثالي أو <span className="text-emerald-400">فرصتك الاستثمارية القادمة</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            تصفح أرقى الفلل والشقق والبنتهاوس المعروضة للبيع والإيجار بأسعار واضحة ومخططات هندسية معتمدة.
          </p>
        </div>

        {/* Filter Card */}
        <div className="max-w-4xl mx-auto bg-slate-900 p-5 rounded-3xl border border-white/10 shadow-2xl">
          {/* Purpose Tabs */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            {[
              { id: 'all', label: 'جميع العروض' },
              { id: 'sale', label: 'عقارات للبيع' },
              { id: 'rent', label: 'عقارات للإيجار' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPurposeFilter(tab.id as any)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  purposeFilter === tab.id
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">نوع العقار</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">جميع الأنواع</option>
                <option value="villa">فلل وقصور</option>
                <option value="apartment">شقق سكنية ودوبلكس</option>
                <option value="penthouse">بنتهاوس</option>
                <option value="office">مكاتب ومقرات تجارية</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">المدينة</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">كل المدن</option>
                <option value="الرياض">الرياض</option>
                <option value="جدة">جدة</option>
                <option value="الخبر">الخبر</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="w-full text-center py-2 px-3 rounded-xl bg-slate-800 text-xs text-emerald-400 font-bold border border-white/5">
                متاح {filteredProperties.length} عقار مطابق
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => {
            const isFav = !!favorites[property.id];

            return (
              <div
                key={property.id}
                className="rounded-3xl bg-slate-900 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Property Image & Badges */}
                  <div className="relative h-56 bg-slate-950 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md ${
                        property.purpose === 'sale'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {property.purpose === 'sale' ? 'للبيع' : 'للإيجار'}
                      </span>
                      {property.badge && (
                        <span className="text-[10px] font-bold text-white bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                          {property.badge}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => toggleFavorite(property.id, e)}
                      className="absolute top-3 left-3 p-2 rounded-xl bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all cursor-pointer"
                      title="حفظ في المفضلة"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>

                    <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-white font-medium flex items-center gap-1 border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{property.city} - {property.district}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <span className="text-xs text-emerald-400 font-bold">{property.typeLabel}</span>
                    <h3 className="font-bold text-base text-white mt-1 mb-3 line-clamp-2 leading-snug">
                      {property.title}
                    </h3>

                    {/* Stats Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center text-xs text-slate-300">
                      <div className="flex items-center justify-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{property.areaM2} م²</span>
                      </div>
                      {property.bedrooms > 0 && (
                        <div className="flex items-center justify-center gap-1 border-r border-white/5">
                          <Bed className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{property.bedrooms} غرف</span>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-1 border-r border-white/5">
                        <Bath className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{property.bathrooms} حمامات</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {property.features.slice(0, 2).map((feat, i) => (
                        <span key={i} className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-white/5">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Viewing Button */}
                <div className="p-5 pt-0">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs text-slate-400">السعر المطلوب:</span>
                    <div>
                      <span className="text-lg font-black text-emerald-400 font-mono">
                        {property.priceSAR.toLocaleString()} ريال
                      </span>
                      {property.pricePeriod && (
                        <span className="text-xs text-slate-400 mr-1">/ {property.pricePeriod}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedPropertyForViewing(property)}
                      className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>حجز معاينة</span>
                    </button>
                    <a
                      href={`https://wa.me/966500000000?text=${encodeURIComponent(`مرحباً دارك للعقارات، أود الاستفسار عن: ${property.title} بسعر ${property.priceSAR.toLocaleString()} ريال.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>واتساب الوكيل</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Viewing Appointment Modal */}
      {selectedPropertyForViewing && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPropertyForViewing(null)} />
          <div className="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl z-10">
            <button onClick={() => setSelectedPropertyForViewing(null)} className="absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>

            {viewingFormSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">تم حجز موعد المعاينة!</h3>
                <p className="text-xs text-slate-300">
                  سيتواصل معك الوكيل العقاري لتزويدك بالموقع الدقيق واستقبالك في العقار.
                </p>
              </div>
            ) : (
              <form onSubmit={handleViewingSubmit} className="space-y-4">
                <div className="text-center pb-2">
                  <Home className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h3 className="text-base font-bold text-white">حجز موعد معاينة ميدانية</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{selectedPropertyForViewing.title}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكريم</label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الكامل"
                    value={viewingForm.name}
                    onChange={(e) => setViewingForm({ ...viewingForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الجوال للواتساب</label>
                  <input
                    type="tel"
                    required
                    placeholder="05xxxxxxxx"
                    value={viewingForm.phone}
                    onChange={(e) => setViewingForm({ ...viewingForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">التاريخ المفضل</label>
                    <input
                      type="date"
                      value={viewingForm.date}
                      onChange={(e) => setViewingForm({ ...viewingForm, date: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">الفترة الزمنية</label>
                    <select
                      value={viewingForm.time}
                      onChange={(e) => setViewingForm({ ...viewingForm, time: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="10:00">10:00 صباحاً</option>
                      <option value="14:00">2:00 ظهراً</option>
                      <option value="17:00">5:00 عصراً</option>
                      <option value="20:00">8:00 مساءً</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  تأكيد طلب موعد الزيارة
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <p>نموذج تجريبي تفاعلي لبوابة تسويق وعرض عقارات للبيع والإيجار</p>
      </footer>
    </div>
  );
};
