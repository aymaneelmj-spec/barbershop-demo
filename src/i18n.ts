import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome to Gentle Hands BarberShop",
      "Tagline": "Premium Grooming & Style in Saudi Arabia",
      "BookNow": "Book Appointment",
      "Services": "Our Services",
      "FAQ": "FAQ",
      "Reviews": "Google Reviews",
      "Photos": "Gallery",
      "Contact": "Contact Us",
      "Chat": "Chat with our Booking Assistant",
      "Haircut": "Classic Haircut",
      "Beard": "Beard Trim & Style",
      "Facial": "Facial Treatment",
      "Address": "Jarir St, Riyadh 12831, Saudi Arabia",
      "Hours": "Hours",
      "Opening_Hours": "Opening Hours",
      "Saturday": "Saturday",
      "Sunday": "Sunday",
      "Monday": "Monday",
      "Tuesday": "Tuesday",
      "Wednesday": "Wednesday",
      "Thursday": "Thursday",
      "Friday": "Friday",
      "FaqQ1": "Do I need to book in advance?",
      "FaqA1": "While we accept walk-ins, we highly recommend booking in advance, especially on weekends.",
      "FaqQ2": "What are your working hours?",
      "FaqA2": "We are open from 10:00 AM to 11:00 PM everyday.",
      "FaqQ3": "Do you offer facial treatments?",
      "FaqA3": "Yes, we offer a range of facial and grooming packages for men.",
      "ChatWelcome": "Hello! I am your booking assistant. How can I help you book your appointment today?"
    }
  },
  ar: {
    translation: {
      "Welcome": "مرحباً بكم في حلاق الأيدي الرقيقة",
      "Tagline": "أرقى خدمات الحلاقة والعناية في المملكة العربية السعودية",
      "BookNow": "احجز موعدك",
      "Services": "خدماتنا",
      "FAQ": "الأسئلة الشائعة",
      "Reviews": "تقييمات جوجل",
      "Photos": "المعرض",
      "Contact": "اتصل بنا",
      "Chat": "تحدث مع مساعد الحجز الخاص بنا",
      "Haircut": "حلاقة كلاسيكية",
      "Beard": "تحديد وتخفيف اللحية",
      "Facial": "تنظيف البشرة",
      "Address": "شارع جرير، الرياض 12831، Saudi Arabia",
      "Hours": "ساعات العمل",
      "Opening_Hours": "أوقات العمل",
      "Saturday": "السبت",
      "Sunday": "الأحد",
      "Monday": "الإثنين",
      "Tuesday": "الثلاثاء",
      "Wednesday": "الأربعاء",
      "Thursday": "الخميس",
      "Friday": "الجمعة",
      "FaqQ1": "هل أحتاج إلى حجز مسبق؟",
      "FaqA1": "على الرغم من أننا نقبل الزيارات بدون موعد، إلا أننا نوصي بشدة بالحجز مسبقًا، خاصة في عطلات نهاية الأسبوع.",
      "FaqQ2": "ما هي ساعات العمل؟",
      "FaqA2": "نعمل من 10:00 صباحًا إلى 11:00 مساءً يوميًا.",
      "FaqQ3": "هل تقدمون خدمات العناية بالبشرة؟",
      "FaqA3": "نعم، نقدم مجموعة متنوعة من باقات العناية بالبشرة للرجال.",
      "ChatWelcome": "مرحباً بك! أنا المساعد الذكي لحلاق فور يو (الأيدي الرقيقة). كيف يمكنني مساعدتك في حجز موعدك اليوم؟"
    }
  }
};

let defaultLng = 'ar';
if (typeof navigator !== 'undefined') {
  const sysLang = navigator.language.toLowerCase();
  defaultLng = sysLang.startsWith('en') ? 'en' : 'ar';
  defaultLng = 'ar';
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLng, 
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
