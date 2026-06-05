import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  { name: "Servonne Travels", text: "The best barber shop in Riyadh! I had one of the best haircuts ever here. The barbers are skilled, professional, and truly care about their craft.", time: "5 months ago", stars: 5 },
  { name: "Rashid Al-Maimany", text: "Great barber quality. But they're quite slow, so you'll have to wait about 30 min or more to get your turn.", time: "5 years ago", stars: 5 },
  { name: "D A", text: "I found this hidden gem through Google. I had my hair/beard cut/trimmed by Mahmoud Fozi. He is very meticulous and cautious. I was thrilled with the results. I'm coming back again despite the long commute.", time: "5 years ago", stars: 5 },
  { name: "Ziyad Hamdah", text: "Since I came to Riyadh, I still cut my hair with them. All of them are great, especially barber Bader. Great and perfect experience.", time: "3 years ago", stars: 5 },
  { name: "KA VALDOZ Banang", text: "Mohammed is so kind. I gave 5 stars to this barber shop and after 2 weeks I will go back again for my haircut.", time: "3 years ago", stars: 5 },
  { name: "Raza Mohammed", text: "Best barber artists in town. Badr is a magician. 5 stars right away!!!", time: "3 years ago", stars: 5 },
  { name: "Malik Hamdan", text: "Mohammad Alsharif — gentle hand in taking care of my beard and a great barber!", time: "2 years ago", stars: 5 },
  { name: "Ahmed Arafa", text: "One of the best and cleanest in the Kingdom. If you go, ask for Mohammed — he is an artist.", time: "3 years ago", stars: 5 },
  { name: "Alif Mohammed Zubayed", text: "Absolutely wonderful place for haircut & other grooming options. Highly recommended 👌", time: "4 years ago", stars: 5 },
  { name: "Z A", text: "Quiet and comfortable salon with a barber who listens and understands what haircut his customer needs.", time: "4 years ago", stars: 5 },
  { name: "Muhammad Eyad Alraie", text: "Best barbershop in the area, especially Bader — he is professional. Highly recommended.", time: "5 years ago", stars: 5 },
  { name: "Anas Razzaz", text: "Perfect experience, clean, neat, tidy. Nice, welcoming and friendly staff.", time: "5 years ago", stars: 5 },
  { name: "Omar al-ajroush", text: "Good place, good haircuts, good service and reasonable price!", time: "5 years ago", stars: 5 },
  { name: "Ajmal Abdul Rasheed", text: "Good haircuts and good service 😊👍", time: "2 years ago", stars: 5 },
  { name: "Ahmed Musaad", text: "Perfect experience with barber Bader 👌", time: "3 years ago", stars: 5 },
  { name: "eliebechara", text: "Good value for the money.", time: "a year ago", stars: 5 },
  { name: "mah a", text: "The best barber in Riyadh.", time: "2 years ago", stars: 5 },
  { name: "Robert Adante", text: "Good ambiance, clean and friendly staff.", time: "5 years ago", stars: 5 },
  { name: "Kandeevo S", text: "Mahmoud is the best barber 💙", time: "6 years ago", stars: 5 },
  { name: "Ismail Ismail", text: "Good 👍 Super 100% service good.", time: "a year ago", stars: 5 },
];

const PALETTES = [
  ["#c9a84c", "#0e0e0e"], ["#2d6a4f", "#fff"], ["#1d3557", "#fff"],
  ["#7b2d8b", "#fff"], ["#b5451b", "#fff"], ["#145374", "#fff"],
  ["#4a4e69", "#fff"], ["#6d4c41", "#fff"], ["#2e7d32", "#fff"],
  ["#37474f", "#fff"],
];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
}

const GoogleLogo = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function ReviewsSection() {
  const { t } = useTranslation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let scrollDirection = 1;

    const scrollLoop = () => {
      if (carouselRef.current && !isPaused) {
        const el = carouselRef.current;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        
        // Reverse direction if we hit boundries
        if (el.scrollLeft >= maxScrollLeft - 1) {
          scrollDirection = -1;
        } else if (el.scrollLeft <= 0) {
          scrollDirection = 1;
        }

        // Slightly slower speed for text readability
        el.scrollLeft += scrollDirection * 1;
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <section id="reviews" className="py-24 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-serif text-white mb-4 tracking-wide" style={{ fontFamily: '"Playfair Display", serif', color: '#c9a84c' }}>
            {t('Reviews')}
          </h2>
          <div className="flex flex-col items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold font-serif text-white" style={{ fontFamily: '"Playfair Display", serif', color: '#c9a84c' }}>5.0</span>
              <div className="flex flex-col items-start gap-1">
                <div className="flex" style={{ color: '#c9a84c', letterSpacing: '2px', fontSize: '1.4rem' }}>
                  ★★★★★
                </div>
                <div className="flex items-center gap-2">
                  <GoogleLogo />
                  <span className="text-zinc-400 text-sm font-medium tracking-wide">198 Google reviews</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-4 flex gap-2 invisible md:visible z-10">
          <button 
            onClick={() => carouselRef.current?.scrollBy({ left: -360, behavior: 'smooth' })}
            className="p-3 rounded-full bg-zinc-800 text-white hover:bg-amber-500 transition-colors border border-zinc-700 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950 shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute top-1/2 -translate-y-1/2 right-0 md:right-4 flex gap-2 invisible md:visible z-10">
          <button 
            onClick={() => carouselRef.current?.scrollBy({ left: 360, behavior: 'smooth' })}
            className="p-3 rounded-full bg-zinc-800 text-white hover:bg-amber-500 transition-colors border border-zinc-700 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-950 shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel */}
        <div 
          className="relative w-full overflow-hidden mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          dir="ltr"
        >
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-[24px] pb-8 pt-4 hide-scrollbar px-4 lg:px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((r, i) => {
              const [bg, fg] = PALETTES[i % PALETTES.length];
              const stars = "★".repeat(r.stars) + "☆".repeat(5 - r.stars);

              return (
                <div 
                  key={i} 
                  className="shrink-0 w-[320px] md:w-[360px] snap-center bg-zinc-800 border-2 border-zinc-700 hover:border-amber-500 hover:-translate-y-2 transition-all duration-300 rounded-3xl p-7 relative group shadow-xl shadow-black/50"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(201,168,76,.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="absolute top-5 right-6 text-6xl opacity-10 font-serif leading-none" style={{ color: '#c9a84c', fontFamily: '"Playfair Display", serif' }}>
                    "
                  </div>
                  
                  <div className="flex items-center gap-4 mb-5">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg font-serif border-2 border-zinc-800 shadow-md"
                      style={{ background: bg, color: fg, fontFamily: '"Playfair Display", serif' }}
                    >
                      {initials(r.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-lg text-zinc-100 whitespace-nowrap overflow-hidden text-ellipsis">
                        {r.name}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {r.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-base tracking-widest mb-3" style={{ color: '#c9a84c' }}>
                    {stars}
                  </div>
                  
                  <p className="text-[0.95rem] leading-relaxed text-zinc-300 font-light min-h-[110px]">
                    {r.text}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-zinc-700/50 text-xs text-zinc-400">
                    <GoogleLogo />
                    <span className="font-medium tracking-wide">Posted on Google</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile controls */}
        <div className="flex justify-center gap-4 mt-2 md:hidden">
          <button 
            onClick={() => carouselRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
            className="p-3 rounded-full bg-zinc-800 text-white hover:bg-amber-500 transition-colors border border-zinc-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => carouselRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
            className="p-3 rounded-full bg-zinc-800 text-white hover:bg-amber-500 transition-colors border border-zinc-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
