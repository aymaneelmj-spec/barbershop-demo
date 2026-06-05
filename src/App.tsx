import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Scissors, Star, ChevronDown, ChevronUp, MessageSquare, X, Send, MapPin, Clock, Phone, Loader2, ArrowRight, ChevronLeft, ChevronRight, Sun, Moon, Instagram, Facebook, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewsSection from './components/ReviewsSection';

const fullMenu = [
  { en: "Hair Cut", ar: "حلاقة شعر", price: "SR 20" },
  { en: "Shave", ar: "حلاقة دقن", price: "SR 20" },
  { en: "Face Steam", ar: "صلفرة مع بخار", price: "SR 30" },
  { en: "Hair Wash", ar: "غسيل شعر", price: "SR 5" },
  { en: "Hair Style", ar: "استايل شعر", price: "SR 15" },
  { en: "Hair Pigment", ar: "صبغة شعر", price: "SR 70" },
  { en: "Beard Color", ar: "صبغة دقن", price: "SR 30" },
  { en: "Oil Bath", ar: "حمام زيت بخار", price: "SR 50" },
  { en: "Hair Protein", ar: "بروتين شعر", price: "SR 200" },
  { en: "Full Face Wax", ar: "شمع الوجه كامل", price: "SR 20" },
  { en: "Full Facial", ar: "تنظيف بشرة كامل", price: "SR 150" },
  { en: "Face Mask", ar: "ماسك للوجه", price: "SR 20" },
  { en: "Hair Straightening", ar: "فرد عادي", price: "SR 50" },
  { en: "Nose Stick", ar: "لزقة أنف", price: "SR 5" },
];

function GallerySection() {
  const { t, i18n } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let scrollDirection = 1;

    const scrollLoop = () => {
      if (scrollRef.current && !isPaused) {
        const el = scrollRef.current;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        
        if (el.scrollLeft >= maxScrollLeft - 1) {
          scrollDirection = -1;
        } else if (el.scrollLeft <= 0) {
          scrollDirection = 1;
        }

        el.scrollLeft += scrollDirection * 1.5;
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const images = [1, 2, 3, 4, 5, 6, 7].map(num => `/gallery/${num}.jpg`);

  return (
    <section id="gallery" className="py-24 bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">{t('Photos')}</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
        </motion.div>
      </div>

      <div 
        className="relative w-full group/slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        dir="ltr"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 flex gap-2 invisible md:visible z-10">
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: -350, behavior: 'smooth' })}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-amber-500 hover:text-white transition-colors border border-zinc-300 dark:border-zinc-700 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:ring-offset-zinc-950 shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 flex gap-2 invisible md:visible z-10">
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: 350, behavior: 'smooth' })}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-amber-500 hover:text-white transition-colors border border-zinc-300 dark:border-zinc-700 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:ring-offset-zinc-950 shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-12 pt-4 hide-scrollbar px-8 lg:px-24" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((src, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.5, type: 'spring' }}
              key={idx} 
              className="shrink-0 w-[260px] md:w-[320px] aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 relative group cursor-pointer border-2 border-transparent hover:border-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/20 hover:-translate-y-2 snap-center"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`Gallery photo ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-zinc-600 text-xs mt-3 md:hidden tracking-widest">
          ← swipe to browse →
        </p>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors text-white z-10 border border-zinc-700"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Selected Gallery Photo"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Always start in dark mode — user can toggle if they want
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark');
    }
    return true;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const isRTL = i18n.language === 'ar';

  return (
    <>
      <AnimatePresence>
        {isAppLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 ${isRTL ? 'dir-rtl' : 'dir-ltr'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Full-screen scissors — absolutely positioned, behind the logo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <span className="scissors-float scissors-float-1">✂</span>
            <span className="scissors-float scissors-float-2">✂</span>
            <span className="scissors-float scissors-float-3">✂</span>
            <span className="scissors-float scissors-float-4">✂</span>
            <span className="scissors-float scissors-float-5">✂</span>
          </div>

          {/* Centered logo + text */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <img
                src="/gallery/barbershoplogo.png"
                alt="Gentle Hands Barber"
                className="h-28 md:h-36 w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-amber-500 text-xs tracking-[0.35em] uppercase font-semibold"
            >
              Premium Grooming
            </motion.p>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen font-sans bg-zinc-950 text-white ${isRTL ? 'dir-rtl' : 'dir-ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60 shadow-sm transition-all duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center gap-2 group cursor-pointer flex-shrink-0">
              <img
                src="/gallery/barbershoplogo.png"
                alt="Gentle Hands Barber"
                className="h-9 w-9 md:h-11 md:w-auto object-contain rounded-full transition-transform group-hover:scale-105 drop-shadow"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="text-white font-bold text-sm md:text-base tracking-wide whitespace-nowrap hidden sm:block">
                Gentle Hands Barber
              </span>
            </div>
            <div className="hidden lg:flex gap-10 items-center font-semibold text-sm tracking-wider uppercase text-zinc-200">
              <a href="#services" className="text-zinc-300 hover:text-amber-400 transition-colors">{t('Services')}</a>
              <a href="#gallery" className="text-zinc-300 hover:text-amber-400 transition-colors">{t('Photos')}</a>
              <a href="#reviews" className="text-zinc-300 hover:text-amber-400 transition-colors">{t('Reviews')}</a>
              <a href="#faq" className="text-zinc-300 hover:text-amber-400 transition-colors">{t('FAQ')}</a>
              <div className="flex items-center gap-3 border-l border-zinc-700 pl-6">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center justify-center bg-zinc-800 border border-zinc-700 hover:border-amber-500 rounded-full w-10 h-10 transition-all text-zinc-200 hover:shadow-lg hover:-translate-y-0.5"
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center justify-center bg-zinc-800 border border-zinc-700 hover:border-amber-500 rounded-full w-10 h-10 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                >
                  <img 
                    src={i18n.language === 'ar' ? "https://flagcdn.com/w40/gb.png" : "https://flagcdn.com/w40/sa.png"} 
                    srcSet={i18n.language === 'ar' ? "https://flagcdn.com/w80/gb.png 2x" : "https://flagcdn.com/w80/sa.png 2x"}
                    width="20"
                    alt={i18n.language === 'ar' ? "English" : "العربية"}
                    className="rounded-sm shadow-sm"
                  />
                </button>
              </div>
            </div>
            
            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center justify-center bg-zinc-800 border border-zinc-700 hover:border-amber-500 rounded-full w-9 h-9 transition-all text-zinc-200"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleLanguage}
                className="flex items-center justify-center bg-zinc-800 border border-zinc-700 hover:border-amber-500 rounded-full w-9 h-9 transition-all"
                title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
              >
                <img 
                  src={i18n.language === 'ar' ? "https://flagcdn.com/w40/gb.png" : "https://flagcdn.com/w40/sa.png"} 
                  srcSet={i18n.language === 'ar' ? "https://flagcdn.com/w80/gb.png 2x" : "https://flagcdn.com/w80/sa.png 2x"}
                  width="18"
                  alt={i18n.language === 'ar' ? "English" : "العربية"}
                  className="rounded-sm shadow-sm"
                />
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -mr-2 text-zinc-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-zinc-800 bg-zinc-950/98"
            >
              <div className="flex flex-col font-semibold text-sm tracking-wider uppercase">
                {[
                  { href: '#services', label: t('Services') },
                  { href: '#gallery', label: t('Photos') },
                  { href: '#reviews', label: t('Reviews') },
                  { href: '#faq', label: t('FAQ') },
                ].map((item, i) => (
                  <a
                    key={i}
                    onClick={() => setIsMobileMenuOpen(false)}
                    href={item.href}
                    className="flex items-center justify-between px-5 py-3.5 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/60 last:border-b-0"
                  >
                    <span>{item.label}</span>
                    <span className="text-amber-500 text-xs">›</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-14 md:pt-16">
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
              alt="Luxury Barbershop Interior" 
              className="w-full h-full object-cover opacity-40 grayscale-[30%] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-zinc-950/80" />
            <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />
          </div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-3 md:mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-amber-500 font-semibold tracking-[0.3em] text-xs md:text-sm uppercase">{t('Premium Grooming')} | {t('Luxury Experience')}</p>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ wordSpacing: isRTL ? '0.1em' : 'normal', lineHeight: isRTL ? '1.4' : '1.1' }}
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-4 md:mb-6 transition-all drop-shadow-2xl ${isRTL ? 'font-arabic' : 'font-serif tracking-tight'} duration-700`}
            >
              {t('Welcome')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-base md:text-xl text-zinc-300 font-light mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {t('Tagline')}
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center items-center w-full max-w-xs sm:max-w-sm md:max-w-4xl mx-auto px-4"
            >
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3.5 px-8 rounded-full shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 w-full md:w-auto hover:-translate-y-1 text-sm md:text-base"
              >
                <div className="relative flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 flex-shrink-0" />
                  <div className="absolute inset-0 bg-white/20 blur-[2px] rounded-full animate-ping"></div>
                </div>
                <span className="whitespace-nowrap">{isRTL ? 'الحجز الذكي' : 'Smart Booking'}</span>
              </button>

              <a 
                href={`https://wa.me/966548127020?text=${encodeURIComponent(isRTL ? "السلام عليكم، أريد الحجز" : "Hello, I would like to book an appointment")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-white font-bold py-3.5 px-8 rounded-full transition-all flex items-center justify-center gap-3 w-full md:w-auto hover:-translate-y-1 whatsapp-glow-btn text-sm md:text-base"
              >
                <svg className="w-5 h-5 flex-shrink-0 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                <span className="whitespace-nowrap relative z-10">{t('Book via WhatsApp')}</span>
              </a>
              
              <a 
                href="https://www.google.com/maps/place/%D8%AD%D9%84%D8%A7%D9%82+%D8%A7%D9%84%D8%A3%D9%8A%D8%AF%D9%8A+%D8%A7%D9%84%D8%B1%D9%82%D9%8A%D9%82%D8%A9+Barbershop%E2%80%AD/@24.6732776,46.7181856,16.5z/data=!4m11!1m3!2m2!1sbarbershops+near+Saudi+Arabia!6e1!3m6!1s0x3e2f05a71b256ef7:0xdbd8555bb0fb09ba!8m2!3d24.6707546!4d46.731436!15sCh1iYXJiZXJzaG9wcyBuZWFyIFNhdWRpIEFyYWJpYVofIh1iYXJiZXJzaG9wcyBuZWFyIHNhdWRpIGFyYWJpYZIBC2JhcmJlcl9zaG9wmgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDI1a00xUllaRk5PVkU0eVlXMDBkMlZVVmpWWFIxRjVZV3hPU2xKdFl4QULgAQD6AQQIUBBK!16s%2Fg%2F11h1mk4sz1?entry=ttu&g_ep=EgoyMDI2MDYwMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800/80 backdrop-blur-md hover:bg-zinc-700 text-white border border-zinc-600 font-bold py-3.5 px-8 rounded-full shadow-xl transition-all flex items-center justify-center gap-3 w-full md:w-auto hover:-translate-y-1 text-sm md:text-base"
              >
                <MapPin className="w-5 h-5 flex-shrink-0 text-amber-500" />
                <span className="whitespace-nowrap">{t('Get Directions')}</span>
              </a>
            </motion.div>
          </div>
        </section>

        <section id="services" className="py-24 bg-zinc-900 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.02]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className={`text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-widest ${isRTL ? 'font-arabic' : 'font-serif'}`}>{t('Services')}</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full opacity-80" />
            </motion.div>
            
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 lg:p-16 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10 relative z-10">
                {fullMenu.map((svc, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx} 
                    className="flex justify-between items-baseline group py-3 border-b border-zinc-200 dark:border-zinc-800/50 hover:border-amber-500/30 transition-colors"
                  >
                    <span className={`text-base md:text-xl text-zinc-200 font-medium group-hover:text-amber-400 transition-colors ${isRTL ? 'font-arabic' : 'font-serif tracking-wide'}`}>
                      {i18n.language === 'ar' ? svc.ar : svc.en}
                    </span>
                    <div className="flex-1 mx-4 border-b border-zinc-700/40 border-dotted relative top-[-8px] min-w-0"></div>
                    <span className="text-amber-600 dark:text-amber-500 font-bold tracking-widest text-lg">
                      {svc.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GallerySection />

        <ReviewsSection />

        <section id="faq" className="py-24 bg-zinc-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-4">{t('FAQ')}</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
            </motion.div>
            <div className="space-y-4">
              {[1, 2, 3].map((num) => (
                <FAQItem 
                  key={num} 
                  question={t(`FaqQ${num}` as any)} 
                  answer={t(`FaqA${num}` as any)} 
                />
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-zinc-950 pt-16 pb-8 border-t border-zinc-800 text-zinc-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-white font-bold text-xl mb-4">Gentle Hands Barber</h3>
                <p className="leading-relaxed">{t('Tagline')}</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-lg">{t('Contact')}</h4>
                <div className="space-y-4">
                  <p className="flex items-start">
                    <MapPin className={`w-5 h-5 shrink-0 ${isRTL ? 'ml-3' : 'mr-3'} text-amber-500 mt-1`} /> 
                    <a href="https://www.google.com/maps/place/%D8%AD%D9%84%D8%A7%D9%82+%D8%A7%D9%84%D8%A3%D9%8A%D8%AF%D9%8A+%D8%A7%D9%84%D8%B1%D9%82%D9%8A%D9%82%D8%A9+Barbershop%E2%80%AD/@24.6732776,46.7181856,16.5z/data=!4m11!1m3!2m2!1sbarbershops+near+Saudi+Arabia!6e1!3m6!1s0x3e2f05a71b256ef7:0xdbd8555bb0fb09ba!8m2!3d24.6707546!4d46.731436!15sCh1iYXJiZXJzaG9wcyBuZWFyIFNhdWRpIEFyYWJpYVofIh1iYXJiZXJzaG9wcyBuZWFyIHNhdWRpIGFyYWJpYZIBC2JhcmJlcl9zaG9wmgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDI1a00xUllaRk5PVkU0eVlXMDBkMlZVVmpWWFIxRjVZV3hPU2xKdFl4QULgAQD6AQQIUBBK!16s%2Fg%2F11h1mk4sz1?entry=ttu&g_ep=EgoyMDI2MDYwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="leading-tight hover:text-amber-500 transition-colors">
                      {t('Address')}
                    </a>
                  </p>
                  <p className="flex items-center"><Phone className={`w-5 h-5 shrink-0 ${isRTL ? 'ml-3' : 'mr-3'} text-amber-500`} /> <span dir="ltr" className="font-medium text-zinc-900 dark:text-white tracking-wide">+966 54 812 7020</span></p>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-lg">{t('Hours')}</h4>
                <div className="space-y-3">
                  <div className="flex items-center mb-4">
                    <Clock className={`w-5 h-5 text-amber-500 ${isRTL ? 'ml-3' : 'mr-3'}`} /> 
                    <span className={`font-semibold text-zinc-900 dark:text-white ${isRTL ? 'mr-1' : 'ml-1'}`}>{t('Opening_Hours', 'Opening Hours')}</span>
                  </div>
                  <div className={`grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2.5 ${isRTL ? 'pr-8' : 'pl-8'}`}>
                    <span>{t('Thursday', 'Thursday')}</span><span dir="ltr" className="text-zinc-200 font-medium">9 AM - 12 AM</span>
                    <span>{t('Friday', 'Friday')}</span><span dir="ltr" className="text-zinc-200 font-medium">12 PM - 12 AM</span>
                    <span>{t('Saturday', 'Saturday')}</span><span dir="ltr" className="text-zinc-200 font-medium">9 AM - 12 AM</span>
                    <span>{t('Sunday', 'Sunday')}</span><span dir="ltr" className="text-zinc-200 font-medium">9 AM - 12 AM</span>
                    <span>{t('Monday', 'Monday')}</span><span dir="ltr" className="text-zinc-200 font-medium">9 AM - 12 AM</span>
                    <span>{t('Tuesday', 'Tuesday')}</span><span dir="ltr" className="text-zinc-200 font-medium">9 AM - 12 AM</span>
                    <span>{t('Wednesday', 'Wednesday')}</span><span dir="ltr" className="text-zinc-200 font-medium">9 AM - 12 AM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
              <p>&copy; {new Date().getFullYear()} Gentle Hands Barber | حلاق الأيدي الرقيقة. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 bg-amber-600 hover:bg-amber-500 text-white rounded-full shadow-2xl shadow-amber-500/30 flex items-center justify-center transition-all z-50 transform hover:scale-110"
      >
        {isChatOpen ? <X className="w-6 h-6 flex-shrink-0" /> : <MessageSquare className="w-6 h-6 flex-shrink-0" />}
      </button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[90px] right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-[400px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-[60] overflow-hidden flex flex-col"
            style={{ maxHeight: '600px', height: '70vh' }}
          >
            <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                   <Scissors className="w-5 h-5 text-zinc-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Assistant</h3>
                  <p className="text-xs text-amber-500 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2 ml-1" /> Online</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <ChatInterface isRTL={isRTL} t={t} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

function ChatInterface({ isRTL, t }: { isRTL: boolean, t: any }) {
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([
    { role: 'bot', text: t('ChatWelcome') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(prev => {
      const newArray = [...prev];
      if (newArray.length > 0 && newArray[0].role === 'bot') {
        newArray[0].text = t('ChatWelcome');
      }
      return newArray;
    });
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server error');
      }
      
      let botResponseText = data.response;
      
      const bookMarker = "[BOOKING_CONFIRMED:";
      if (botResponseText.includes(bookMarker)) {
        try {
          const startIndex = botResponseText.indexOf(bookMarker) + bookMarker.length;
          const endIndex = botResponseText.indexOf("]", startIndex);
          const jsonStr = botResponseText.substring(startIndex, endIndex).trim();
          const bookingData = JSON.parse(jsonStr);
          
          await fetch('/api/notify-boss', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
          });

          botResponseText = botResponseText.replace(/\[BOOKING_CONFIRMED:.*?\]/, '').trim();
          if(!botResponseText) {
             botResponseText = "Your appointment has been perfectly booked, and I've notified the boss. Looking forward to seeing you!";
          }
        } catch(e) {
          console.error("Booking parse error", e);
        }
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponseText }]);
    } catch (e: any) {
      const errorMsg = e.message?.includes('GEMINI_API_KEY') 
        ? "Missing GEMINI_API_KEY environment variable. Please add it in your Vercel Dashboard settings!"
        : 'عذراً، حدث خطأ. / Sorry, something went wrong.';
      setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFEFC] dark:bg-zinc-900">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-amber-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 rounded-2xl p-3">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-[#FCFBF7] dark:bg-zinc-950">
        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#FFFEFC] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}

const FAQItem = ({ question, answer }: { key?: number, question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-[#FCFBF7] dark:bg-zinc-950"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-[#FFFEFC] dark:bg-zinc-900/50 transition-colors"
      >
        <span className="font-bold text-zinc-900 dark:text-white">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-amber-500" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
      </button>
      <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-zinc-600 dark:text-zinc-400">{answer}</p>
      </div>
    </motion.div>
  );
}

export default App;
