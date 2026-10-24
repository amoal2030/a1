import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Star, 
  Trash2, 
  Check, 
  X, 
  Zap, 
  Shield, 
  Truck, 
  RotateCcw, 
  MessageCircle, 
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Plus,
  Minus
} from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: 'laptops' | 'phones' | 'audio' | 'watches';
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  specs: string[];
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ماك بوك برو M3 ماكس 16 إنش (Apple MacBook Pro)',
    category: 'laptops',
    categoryLabel: 'حواسيب محمولة',
    price: 2499,
    oldPrice: 2699,
    rating: 4.9,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    badge: 'الأكثر مبيعاً',
    specs: ['معالج M3 Max 14-Core', 'ذاكرة 36GB موحدة', 'سعة تخزين 1TB SSD', 'شاشة Liquid Retina XDR'],
    description: 'أقوى حاسوب محمول للمطورين والمصممين ومحرري الفيديو مع أداء خارق وعمر بطارية يصل إلى 22 ساعة.'
  },
  {
    id: 'p2',
    name: 'سامسونج جالاكسي S24 ألترا 5G (Galaxy S24 Ultra)',
    category: 'phones',
    categoryLabel: 'هواتف ذكية',
    price: 1199,
    oldPrice: 1299,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    badge: 'ذكاء اصطناعي Galaxy AI',
    specs: ['كاميرا 200 ميجابكسل', 'شاشة 6.8 بوصة AMOLED 120Hz', 'معالج Snapdragon 8 Gen 3', 'قلم S-Pen مدمج'],
    description: 'هاتف قمة التقنية مع ميزات الترجمة الفورية والبحث بدائرة وتكبير بصري فائق حتى 100x.'
  },
  {
    id: 'p3',
    name: 'سماعات سوني اللاسلكية الاحترافية WH-1000XM5',
    category: 'audio',
    categoryLabel: 'سماعات وملحقات',
    price: 349,
    oldPrice: 399,
    rating: 4.9,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    badge: 'عزل ضوضاء فائق',
    specs: ['إلغاء ضوضاء رائد عالمياً', 'بطارية 30 ساعة متواصلة', 'صوت فائق الدقة Hi-Res', '8 ميكروفونات للمكالمات'],
    description: 'تجربة صوتية نقية تحجب ضوضاء الطائرات والمكاتب بذكاء، مع راحة استثنائية طوال اليوم.'
  },
  {
    id: 'p4',
    name: 'ساعة آبل الذكية ألترا 2 (Apple Watch Ultra 2)',
    category: 'watches',
    categoryLabel: 'ساعات وإكسسوارات',
    price: 799,
    oldPrice: 849,
    rating: 4.7,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    badge: 'إصدار التيتانيوم',
    specs: ['هيكل تيتانيوم صلب 49mm', 'مقاومة الماء حتى عمق 100م', 'سطوع 3000 شمعة', 'نظام GPS ثنائي التردد'],
    description: 'ساعة المغامرات والرياضيين الأقوى، مزودة بنظام إنذار طوارئ وقياس الأكسجين وتخطيط القلب.'
  },
  {
    id: 'p5',
    name: 'لوحة مفاتيح ميكانيكية احترافية Keychron Q1 Pro',
    category: 'laptops',
    categoryLabel: 'حواسيب محمولة',
    price: 189,
    rating: 4.8,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    specs: ['مفاتيح Gateron Jupiter', 'هيكل ألومنيوم CNC مفرز', 'اتصال لاسلكي وبلوتوث', 'برمجة كاملة QMK/VIA'],
    description: 'الخيار الأفضل للبرمجة والكتابة السريعة بصوت كلكي مريح وتصميم ميكانيكي مخصص بالكامل.'
  },
  {
    id: 'p6',
    name: 'شاشة ألعاب منحنية سامسونج أوديسي G9 OLED',
    category: 'laptops',
    categoryLabel: 'حواسيب محمولة',
    price: 1399,
    oldPrice: 1599,
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    badge: 'انحناء 1800R',
    specs: ['شاشة 49 بوصة فائقة الاتساع', 'معدل تحديث 240Hz', 'زمن استجابة 0.03ms', 'لوحة Neo Quantum OLED'],
    description: 'انغماس حقيقي ومساحة عمل هائلة تعادل شاشتين كاملتين مع ألوان سوداء حقيقية فائقة التباين.'
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

interface TechStoreDemoProps {
  onOrderSite?: () => void;
}

export const TechStoreDemo: React.FC<TechStoreDemoProps> = ({ onOrderSite }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`تمت إضافة "${product.name.slice(0, 26)}..." إلى السلة`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('تم حذف المنتج من السلة');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'TECH20') {
      setDiscountPercent(20);
      showToast('🎉 تم تفعيل خصم 20% بنجاح!');
    } else {
      showToast('كود الخصم غير صحيح (جرب كود: TECH20)');
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const finalTotal = rawSubtotal - discountAmount;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsText = cart
      .map(item => `• ${item.product.name} (عدد: ${item.quantity}) - $${item.product.price * item.quantity}`)
      .join('\n');
    const msg = `مرحباً متجر تكنو زون، أود شراء الطلب التالي:\n\n${itemsText}\n\nالإجمالي: $${finalTotal.toFixed(2)}`;
    window.open(`https://wa.me/966500000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white" dir="rtl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 animate-pulse" />
        <span>عروض الصيف التقنية: شحن مجاني لجميع الطلبات + خصم 20% بكود <strong className="font-mono bg-white/20 px-1.5 py-0.5 rounded">TECH20</strong></span>
      </div>

      {/* Store Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                تكنو زون
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 rounded">متجر تقني</span>
              </span>
              <p className="text-[11px] text-slate-400 hidden sm:block">أحدث الأجهزة والإلكترونيات بضمان الوكيل</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-md hidden md:block relative">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث عن لابتوب، جوال، سماعة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-white/10 transition-all cursor-pointer flex items-center gap-2"
              title="عرض سلة المشتريات"
            >
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-bold hidden sm:inline">السلة</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-cyan-500 text-slate-950 font-black text-[11px] rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden relative">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث في المتجر..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </header>

      {/* Hero Showcase Banner */}
      <section className="relative overflow-hidden py-12 px-4 sm:px-8 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-cyan-400" />
              <span>الجيل الجديد من الأجهزة الذكية لعام 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              أقوى عتاد للمحترفين مع <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ضمان ذهبي سنتين</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              تصفح تشكيلة مختارة من أقوى الحواسيب والهواتف الذكية والسماعات الاحترافية. تجربة شراء سلسلة وسريعة مع إمكانية إتمام الطلب الفوري عبر واتساب.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#products-grid"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all cursor-pointer"
              >
                تصفح المنتجات الآن
              </a>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-cyan-400" /> شحن خلال 24 ساعة</span>
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-400" /> ضمان أصلي 100%</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"
                alt="Tech Setup"
                className="w-full h-64 sm:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg w-fit border border-cyan-400/30">
                  عرض الأسبوع الحصري
                </span>
                <h3 className="text-white font-bold text-base mt-2">ماك بوك برو M3 الجديد بخصم $200</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main id="products-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            {[
              { id: 'all', label: 'الكل (6)' },
              { id: 'laptops', label: 'حواسيب وشاشات' },
              { id: 'phones', label: 'هواتف ذكية' },
              { id: 'audio', label: 'سماعات وصوتيات' },
              { id: 'watches', label: 'ساعات وإكسسوارات' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            عرض {filteredProducts.length} من أصل {PRODUCTS.length} منتج
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex flex-col group hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-52 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-950 bg-cyan-400 px-2 py-0.5 rounded-md shadow-sm">
                    {product.badge}
                  </span>
                )}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{product.categoryLabel}</span>
                    <span>{product.reviewsCount} تقييم</span>
                  </div>
                  <h3 
                    onClick={() => setSelectedProduct(product)}
                    className="font-bold text-sm text-white hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2 mb-2"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Quick specs */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.specs.slice(0, 2).map((spec, i) => (
                      <span key={i} className="text-[10px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-white/5">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Add Button */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-cyan-400">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-xs text-slate-500 line-through">${product.oldPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="معاينة المواصفات"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shadow-cyan-500/20"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>أضف للسلة</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border-r border-white/10 h-full flex flex-col z-10 shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">سلة المشتريات ({totalCartCount})</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-3">
                  <ShoppingCart className="w-12 h-12 mx-auto text-slate-600 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-slate-300">سلتك فارغة حالياً</p>
                  <p className="text-xs text-slate-500">تصفح المنتجات وأضف ما ترغب لشرائه بسهولة</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="p-3 rounded-xl bg-slate-800/80 border border-white/5 flex gap-3 items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover bg-slate-950 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                      <p className="text-cyan-400 text-xs font-bold mt-1">${item.product.price * item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-xs hover:bg-slate-600">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-1">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-xs hover:bg-slate-600">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Checkout */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-slate-950 space-y-3">
                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="كود الخصم (TECH20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button type="submit" className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold cursor-pointer">
                    تطبيق
                  </button>
                </form>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-bold">
                    <span>خصم الكوبون (20%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-bold text-white">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-cyan-400 font-black text-lg">${finalTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إتمام الطلب عبر واتساب مباشرة</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white z-20">
              <X className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="h-64 sm:h-full bg-slate-950">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-400/20">
                    {selectedProduct.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 mb-2">{selectedProduct.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{selectedProduct.description}</p>
                  
                  <div className="space-y-1.5 mb-4">
                    <h4 className="text-xs font-bold text-slate-200">المواصفات التقنية:</h4>
                    {selectedProduct.specs.map((s, i) => (
                      <div key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-black text-cyan-400">${selectedProduct.price}</span>
                    {selectedProduct.oldPrice && (
                      <span className="text-xs text-slate-500 line-through mr-2">${selectedProduct.oldPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>أضف للسلة الآن</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-cyan-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <p>نموذج تجريبي تفاعلي لمتجر إلكتروني حديث للأجهزة الذكية | صمم باحترافية وسرعة فائقة</p>
      </footer>
    </div>
  );
};
