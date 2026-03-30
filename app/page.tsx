"use client";

import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════
// FREGER COSMETICS — TELEGRAM MINI APP
// Luxury Beauty Digital Boutique
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────

const tokens = {
  light: {
    bg: "#FAF8F5",
    bgSecondary: "#F5F2ED",
    bgTertiary: "#EDE9E3",
    text: "#2C2825",
    textSecondary: "#6B6560",
    textMuted: "#9B9590",
    accent: "#C4A77D", // Warm champagne/sand
    accentHover: "#B39A70",
    card: "rgba(255, 255, 255, 0.8)",
    cardSolid: "#FFFFFF",
    glass: "rgba(250, 248, 245, 0.85)",
    border: "rgba(44, 40, 37, 0.08)",
    shadow: "rgba(44, 40, 37, 0.06)",
  },
  dark: {
    bg: "#1A1816",
    bgSecondary: "#242220",
    bgTertiary: "#2E2C29",
    text: "#F5F2ED",
    textSecondary: "#A8A29E",
    textMuted: "#78716C",
    accent: "#D4B896",
    accentHover: "#E5C9A7",
    card: "rgba(46, 44, 41, 0.8)",
    cardSolid: "#2E2C29",
    glass: "rgba(26, 24, 22, 0.9)",
    border: "rgba(245, 242, 237, 0.08)",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
};

// ─────────────────────────────────────────────────
// i18n TRANSLATIONS
// ─────────────────────────────────────────────────

const i18n = {
  he: {
    // Navigation
    navShowcase: "ויטרינה",
    navRituals: "טקסים",
    navAbout: "אודות",
    navProfile: "הפרופיל שלי",
    
    // Header
    cart: "סל קניות",
    
    // Showcase
    heroTitle: "יופי אותנטי",
    heroSubtitle: "קוסמטיקה מקצועית לטיפוח עור מושלם",
    filterAll: "הכל",
    filterAntiAge: "אנטי-אייג׳",
    filterHydration: "לחות",
    filterCleansing: "ניקוי",
    bestsellers: "רבי מכר",
    curatedBy: "נבחר ע״י אולגה",
    addToCart: "הוספה לסל",
    viewDetails: "לפרטים",
    completeRoutine: "השלימי את הטיפוח",
    
    // Product
    ingredients: "רכיבים פעילים",
    recommended: "מומלץ ע״י אולגה",
    
    // Rituals
    ritualsTitle: "טקסי טיפוח",
    ritualsSubtitle: "חוויה אישית בסטודיו",
    bookNow: "הזמנת תור",
    duration: "דק׳",
    
    // About
    aboutTitle: "העולם של פרגר",
    aboutRole: "קוסמטיקאית · מאסטר רייקי",
    aboutPhilosophy: "אני מאמינה שיופי אמיתי נובע מאיזון פנימי. כל טיפוח הוא מסע של חיבור לעצמך.",
    yearsExp: "שנות ניסיון",
    brands: "מותגים",
    products: "מוצרים",
    contactOlga: "לשוחח עם אולגה",
    location: "קריית גת",
    hours: "א׳-ה׳ 9:00-19:00",
    
    // Profile
    welcomeBack: "שלום,",
    loyaltyLevel: "רמת נאמנות",
    silver: "כסף",
    gold: "זהב",
    toNextLevel: "עד לרמה הבאה",
    myOrders: "ההזמנות שלי",
    favorites: "מועדפים",
    settings: "הגדרות",
    language: "שפה",
    theme: "ערכת נושא",
    light: "בהיר",
    dark: "כהה",
    help: "עזרה",
    orderStatus: {
      delivered: "נמסר",
      shipping: "בדרך",
      processing: "בעיבוד",
    },
    emptyOrders: "עוד אין הזמנות",
    emptyOrdersCta: "לגלות מוצרים",
    emptyFavorites: "עוד אין מועדפים",
  },
  ru: {
    // Navigation
    navShowcase: "Витрина",
    navRituals: "Ритуалы",
    navAbout: "О нас",
    navProfile: "Кабинет",
    
    // Header
    cart: "Корзина",
    
    // Showcase
    heroTitle: "Истинная красота",
    heroSubtitle: "Профессиональная косметика для совершенной кожи",
    filterAll: "Все",
    filterAntiAge: "Anti-age",
    filterHydration: "Увлажнение",
    filterCleansing: "Очищение",
    bestsellers: "Бестселлеры",
    curatedBy: "Выбор Ольги",
    addToCart: "В корзину",
    viewDetails: "Подробнее",
    completeRoutine: "Дополните уход",
    
    // Product
    ingredients: "Активные ингредиенты",
    recommended: "Рекомендует Ольга",
    
    // Rituals
    ritualsTitle: "Ритуалы ухода",
    ritualsSubtitle: "Персональный опыт в студии",
    bookNow: "Записаться",
    duration: "мин",
    
    // About
    aboutTitle: "Мир Freger",
    aboutRole: "Косметолог · Мастер Рейки",
    aboutPhilosophy: "Я верю, что истинная красота рождается из внутренней гармонии. Каждый уход — это путешествие к себе.",
    yearsExp: "лет опыта",
    brands: "бренда",
    products: "продуктов",
    contactOlga: "Написать Ольге",
    location: "Кирьят-Гат",
    hours: "Вс-Чт 9:00-19:00",
    
    // Profile
    welcomeBack: "Добро пожаловать,",
    loyaltyLevel: "Уровень лояльности",
    silver: "Silver",
    gold: "Gold",
    toNextLevel: "до следующего уровня",
    myOrders: "Мои заказы",
    favorites: "Избранное",
    settings: "Настройки",
    language: "Язык",
    theme: "Тема",
    light: "Светлая",
    dark: "Тёмная",
    help: "Помощь",
    orderStatus: {
      delivered: "Доставлен",
      shipping: "В пути",
      processing: "Обработка",
    },
    emptyOrders: "Пока нет заказов",
    emptyOrdersCta: "Открыть витрину",
    emptyFavorites: "Пока нет избранного",
  },
};

// ─────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name_he: "סרום רטינול 0.5%",
    name_ru: "Сыворотка ретинол 0.5%",
    brand: "Dermalosophy",
    category: "anti-age",
    price: 320,
    image: "linear-gradient(135deg, #E8DDD4 0%, #D4C4B0 100%)",
    desc_he: "סרום אנטי-אייג׳ מתקדם עם רטינול מיוצב",
    desc_ru: "Продвинутая anti-age сыворотка со стабилизированным ретинолом",
    ingredients: ["Retinol", "Vitamin E", "Squalane"],
    featured: true,
  },
  {
    id: 2,
    name_he: "קרם לחות אינטנסיבי",
    name_ru: "Интенсивный увлажняющий крем",
    brand: "ONmacabim",
    category: "hydration",
    price: 280,
    image: "linear-gradient(135deg, #F0E6DC 0%, #E0D0C0 100%)",
    desc_he: "קרם עשיר להזנה עמוקה ושיקום מחסום העור",
    desc_ru: "Насыщенный крем для глубокого питания и восстановления барьера кожи",
    ingredients: ["Hyaluronic Acid", "Ceramides", "Shea Butter"],
    featured: true,
  },
  {
    id: 3,
    name_he: "ג׳ל ניקוי עדין",
    name_ru: "Мягкий очищающий гель",
    brand: "Hikari",
    category: "cleansing",
    price: 145,
    image: "linear-gradient(135deg, #E5EDE8 0%, #C8D8CE 100%)",
    desc_he: "ג׳ל ניקוי טבעי לעור רגיש",
    desc_ru: "Натуральный очищающий гель для чувствительной кожи",
    ingredients: ["Aloe Vera", "Green Tea", "Chamomile"],
    featured: false,
  },
  {
    id: 4,
    name_he: "מסכת פנים מתחדשת",
    name_ru: "Обновляющая маска для лица",
    brand: "Dermalosophy",
    category: "anti-age",
    price: 195,
    image: "linear-gradient(135deg, #F5EAE0 0%, #E5D5C5 100%)",
    desc_he: "מסכת פילינג עדינה עם AHA ו-BHA",
    desc_ru: "Мягкая пилинг-маска с AHA и BHA кислотами",
    ingredients: ["Glycolic Acid", "Salicylic Acid", "Niacinamide"],
    featured: true,
  },
  {
    id: 5,
    name_he: "עיניים אנטי-אייג׳",
    name_ru: "Anti-age крем для глаз",
    brand: "ONmacabim",
    category: "anti-age",
    price: 260,
    image: "linear-gradient(135deg, #EDE5DC 0%, #DDD0C4 100%)",
    desc_he: "קרם עיניים עשיר לטיפול בקמטוטים",
    desc_ru: "Насыщенный крем для глаз против морщин",
    ingredients: ["Peptides", "Caffeine", "Vitamin C"],
    featured: false,
  },
  {
    id: 6,
    name_he: "טונר מאזן",
    name_ru: "Балансирующий тоник",
    brand: "Hikari",
    category: "cleansing",
    price: 125,
    image: "linear-gradient(135deg, #E8F0EA 0%, #D0E0D5 100%)",
    desc_he: "טונר טבעי לאיזון ה-pH של העור",
    desc_ru: "Натуральный тоник для баланса pH кожи",
    ingredients: ["Rose Water", "Witch Hazel", "Panthenol"],
    featured: false,
  },
  {
    id: 7,
    name_he: "סרום ויטמין C",
    name_ru: "Сыворотка витамин C",
    brand: "Dermalosophy",
    category: "anti-age",
    price: 290,
    image: "linear-gradient(135deg, #FFF5E6 0%, #FFE8CC 100%)",
    desc_he: "סרום מבהיר עם ויטמין C יציב 15%",
    desc_ru: "Осветляющая сыворотка со стабильным витамином C 15%",
    ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E"],
    featured: true,
  },
  {
    id: 8,
    name_he: "שמן פנים מזין",
    name_ru: "Питательное масло для лица",
    brand: "Hikari",
    category: "hydration",
    price: 175,
    image: "linear-gradient(135deg, #F8EFE5 0%, #EBD9C8 100%)",
    desc_he: "תערובת שמנים טבעיים להזנת העור",
    desc_ru: "Смесь натуральных масел для питания кожи",
    ingredients: ["Jojoba Oil", "Rosehip Oil", "Argan Oil"],
    featured: false,
  },
];

const services = [
  {
    id: 1,
    name_he: "ניקוי עמוק",
    name_ru: "Глубокое очищение",
    duration: 60,
    price: 350,
    desc_he: "טיפול מקיף לניקוי עמוק של העור, חילוץ ראשים שחורים והזנה",
    desc_ru: "Комплексный уход для глубокого очищения кожи, экстракция и питание",
    gradient: "linear-gradient(135deg, #E8DDD4 0%, #C4A77D 100%)",
  },
  {
    id: 2,
    name_he: "הרמוניה אנרגטית",
    name_ru: "Энергетическая гармония",
    duration: 45,
    price: 250,
    desc_he: "טיפול רייקי משולב עם טיפוח פנים להרגעה ואיזון",
    desc_ru: "Рейки терапия в сочетании с уходом за лицом для расслабления и баланса",
    gradient: "linear-gradient(135deg, #E5EDE8 0%, #A8C4B4 100%)",
  },
  {
    id: 3,
    name_he: "התחדשות העור",
    name_ru: "Обновление кожи",
    duration: 45,
    price: 300,
    desc_he: "פילינג מקצועי והזנה אינטנסיבית לעור זוהר",
    desc_ru: "Профессиональный пилинг и интенсивное питание для сияющей кожи",
    gradient: "linear-gradient(135deg, #F5EAE0 0%, #D4B896 100%)",
  },
  {
    id: 4,
    name_he: "עיסוי פיסול",
    name_ru: "Скульптурный массаж",
    duration: 30,
    price: 200,
    desc_he: "טכניקת עיסוי מתקדמת להרמת ומיצוק קווי הפנים",
    desc_ru: "Продвинутая массажная техника для лифтинга и укрепления контуров лица",
    gradient: "linear-gradient(135deg, #EDE5DC 0%, #C8B8A8 100%)",
  },
];

const orders = [
  {
    id: "FRG-2847",
    date: "25.03.2026",
    total: 465,
    status: "delivered",
    items: 2,
  },
  {
    id: "FRG-2912",
    date: "28.03.2026",
    total: 320,
    status: "shipping",
    items: 1,
  },
  {
    id: "FRG-2956",
    date: "30.03.2026",
    total: 580,
    status: "processing",
    items: 3,
  },
];

// ─────────────────────────────────────────────────
// ICONS (SVG)
// ─────────────────────────────────────────────────

const Icons = {
  Cart: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Sun: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Moon: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Showcase: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  Rituals: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <circle cx="12" cy="12" r="4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  About: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Profile: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M3 11h18" />
    </svg>
  ),
  Close: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ArrowRight: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Check: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Heart: ({ size = 20, color = "currentColor", filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  ChevronDown: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Package: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Clock: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  MapPin: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Send: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
};

// ─────────────────────────────────────────────────
// MAIN APP COMPONENT
// ─────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState<"showcase" | "rituals" | "about" | "profile">("showcase");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<"he" | "ru">("he");
  const [cart, setCart] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const t = i18n[lang];
  const c = tokens[theme];
  const isRTL = lang === "he";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSection]);

  const addToCart = (productId: number) => {
    setCart((prev) => [...prev, productId]);
  };

  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter((p) => p.category === activeFilter);

  // ─────────────────────────────────────────────────
  // STYLES
  // ─────────────────────────────────────────────────

  const styles = {
    app: {
      fontFamily: "'Cormorant Garamond', 'Heebo', serif",
      maxWidth: 430,
      margin: "0 auto",
      height: "100vh",
      backgroundColor: c.bg,
      color: c.text,
      direction: isRTL ? "rtl" : "ltr",
      position: "relative" as const,
      overflow: "hidden",
      transition: "background-color 0.5s ease, color 0.5s ease",
    },
    header: {
      position: "fixed" as const,
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      backgroundColor: c.glass,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: `1px solid ${c.border}`,
      zIndex: 100,
      transition: "background-color 0.5s ease",
    },
    logo: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: "0.05em",
      color: c.text,
    },
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    iconBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      color: c.text,
      transition: "background-color 0.2s ease",
    },
    langToggle: {
      fontSize: 14,
      fontWeight: 500,
      padding: "6px 10px",
      borderRadius: 16,
      backgroundColor: c.bgSecondary,
      border: "none",
      cursor: "pointer",
      color: c.text,
      fontFamily: "'Inter', sans-serif",
    },
    cartBadge: {
      position: "absolute" as const,
      top: 4,
      [isRTL ? "left" : "right"]: 4,
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: c.accent,
      color: theme === "light" ? "#FFF" : c.bg,
      fontSize: 11,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
    },
    main: {
      height: "100vh",
      overflowY: "auto" as const,
      paddingTop: 56,
      paddingBottom: 90,
    },
    nav: {
      position: "fixed" as const,
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "8px 12px",
      backgroundColor: c.glass,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: 32,
      border: `1px solid ${c.border}`,
      boxShadow: `0 8px 32px ${c.shadow}`,
      zIndex: 100,
    },
    navItem: (active: boolean) => ({
      width: active ? "auto" : 44,
      height: 44,
      borderRadius: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: active ? "0 16px" : 0,
      backgroundColor: active ? c.accent : "transparent",
      border: "none",
      cursor: "pointer",
      color: active ? (theme === "light" ? "#FFF" : c.bg) : c.textSecondary,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Heebo', sans-serif",
      fontSize: 13,
      fontWeight: 500,
    }),
    section: {
      padding: "24px 20px",
    },
    hero: {
      position: "relative" as const,
      height: 360,
      borderRadius: 0,
      overflow: "hidden",
      marginBottom: 32,
      background: `linear-gradient(180deg, ${c.bgTertiary} 0%, ${c.bgSecondary} 100%)`,
    },
    heroContent: {
      position: "absolute" as const,
      bottom: 40,
      [isRTL ? "right" : "left"]: 24,
      [isRTL ? "left" : "right"]: 24,
    },
    heroTitle: {
      fontSize: 42,
      fontWeight: 300,
      lineHeight: 1.1,
      marginBottom: 12,
      fontFamily: "'Cormorant Garamond', serif",
    },
    heroSubtitle: {
      fontSize: 15,
      color: c.textSecondary,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 300,
    },
    filterRow: {
      display: "flex",
      gap: 8,
      marginBottom: 28,
      overflowX: "auto" as const,
      paddingBottom: 4,
      scrollbarWidth: "none" as const,
    },
    filterPill: (active: boolean) => ({
      padding: "10px 18px",
      borderRadius: 24,
      backgroundColor: active ? c.accent : c.bgSecondary,
      color: active ? (theme === "light" ? "#FFF" : c.bg) : c.text,
      border: "none",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "'Heebo', sans-serif",
      whiteSpace: "nowrap" as const,
      transition: "all 0.2s ease",
    }),
    sectionTitle: {
      fontSize: 22,
      fontWeight: 400,
      marginBottom: 20,
      fontFamily: "'Cormorant Garamond', serif",
    },
    bentoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16,
    },
    productCard: (large: boolean) => ({
      gridColumn: large ? "span 2" : "span 1",
      position: "relative" as const,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: c.cardSolid,
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }),
    productImage: (gradient: string, large: boolean) => ({
      width: "100%",
      height: large ? 240 : 180,
      background: gradient,
    }),
    productInfo: {
      padding: 16,
    },
    productBrand: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
      color: c.textMuted,
      marginBottom: 6,
      fontFamily: "'Inter', sans-serif",
    },
    productName: {
      fontSize: 16,
      fontWeight: 500,
      marginBottom: 8,
      fontFamily: "'Cormorant Garamond', serif",
      lineHeight: 1.3,
    },
    productPrice: {
      fontSize: 15,
      fontWeight: 600,
      color: c.accent,
      fontFamily: "'Inter', sans-serif",
    },
    featuredBadge: {
      position: "absolute" as const,
      top: 12,
      [isRTL ? "left" : "right"]: 12,
      padding: "6px 12px",
      borderRadius: 16,
      backgroundColor: c.glass,
      backdropFilter: "blur(10px)",
      fontSize: 11,
      fontWeight: 500,
      color: c.text,
      fontFamily: "'Heebo', sans-serif",
    },
    carousel: {
      display: "flex",
      gap: 16,
      overflowX: "auto" as const,
      paddingBottom: 8,
      scrollbarWidth: "none" as const,
      marginInline: -20,
      paddingInline: 20,
    },
    carouselCard: {
      minWidth: 160,
      borderRadius: 16,
      overflow: "hidden",
      backgroundColor: c.cardSolid,
      flexShrink: 0,
    },
    quoteBlock: {
      padding: "32px 24px",
      margin: "32px 0",
      backgroundColor: c.bgSecondary,
      borderRadius: 20,
      textAlign: "center" as const,
    },
    quote: {
      fontSize: 18,
      fontStyle: "italic",
      fontFamily: "'Cormorant Garamond', serif",
      lineHeight: 1.6,
      marginBottom: 16,
    },
    quoteAuthor: {
      fontSize: 13,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
    },
    // Product Detail Modal
    modal: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: c.bg,
      zIndex: 200,
      display: "flex",
      flexDirection: "column" as const,
      overflow: "hidden",
    },
    modalHeader: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      padding: "16px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 10,
      backgroundColor: "transparent",
    },
    modalImage: (gradient: string) => ({
      width: "100%",
      height: 320,
      background: gradient,
      flexShrink: 0,
    }),
    modalContent: {
      flex: 1,
      padding: "24px 20px",
      overflowY: "auto" as const,
    },
    modalBrand: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      color: c.accent,
      marginBottom: 8,
      fontFamily: "'Inter', sans-serif",
    },
    modalName: {
      fontSize: 28,
      fontWeight: 400,
      marginBottom: 16,
      fontFamily: "'Cormorant Garamond', serif",
      lineHeight: 1.2,
    },
    modalDesc: {
      fontSize: 15,
      lineHeight: 1.7,
      color: c.textSecondary,
      marginBottom: 24,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 300,
    },
    ingredientPills: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: 8,
      marginBottom: 24,
    },
    ingredientPill: {
      padding: "8px 14px",
      borderRadius: 20,
      backgroundColor: c.bgSecondary,
      fontSize: 13,
      fontFamily: "'Inter', sans-serif",
      color: c.text,
    },
    recommendedBadge: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 16px",
      backgroundColor: c.bgSecondary,
      borderRadius: 12,
      marginBottom: 24,
    },
    addToCartBtn: {
      position: "fixed" as const,
      bottom: 24,
      left: 20,
      right: 20,
      maxWidth: 390,
      margin: "0 auto",
      padding: "18px 24px",
      borderRadius: 28,
      backgroundColor: c.accent,
      color: theme === "light" ? "#FFF" : c.bg,
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      boxShadow: `0 8px 24px ${c.shadow}`,
      transition: "transform 0.2s ease, background-color 0.2s ease",
    },
    // Rituals
    ritualCard: {
      position: "relative" as const,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 16,
      cursor: "pointer",
    },
    ritualGradient: (gradient: string) => ({
      padding: "28px 24px",
      background: gradient,
    }),
    ritualName: {
      fontSize: 24,
      fontWeight: 400,
      marginBottom: 8,
      fontFamily: "'Cormorant Garamond', serif",
      color: "#2C2825",
    },
    ritualMeta: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      fontSize: 14,
      color: "rgba(44, 40, 37, 0.7)",
      fontFamily: "'Heebo', sans-serif",
    },
    ritualDesc: {
      marginTop: 12,
      fontSize: 14,
      lineHeight: 1.6,
      color: "rgba(44, 40, 37, 0.8)",
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 300,
    },
    bookBtn: {
      marginTop: 20,
      padding: "14px 24px",
      borderRadius: 24,
      backgroundColor: "rgba(44, 40, 37, 0.9)",
      color: "#FFF",
      border: "none",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "'Heebo', sans-serif",
    },
    // About
    aboutHero: {
      textAlign: "center" as const,
      padding: "40px 20px",
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      background: `linear-gradient(135deg, ${c.bgTertiary} 0%, ${c.accent} 100%)`,
      margin: "0 auto 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 40,
      fontFamily: "'Cormorant Garamond', serif",
      color: theme === "light" ? "#FFF" : c.bg,
    },
    aboutName: {
      fontSize: 28,
      fontWeight: 400,
      marginBottom: 8,
      fontFamily: "'Cormorant Garamond', serif",
    },
    aboutRole: {
      fontSize: 14,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
      marginBottom: 24,
    },
    aboutPhilosophy: {
      fontSize: 18,
      fontStyle: "italic",
      lineHeight: 1.7,
      color: c.textSecondary,
      fontFamily: "'Cormorant Garamond', serif",
      maxWidth: 320,
      margin: "0 auto 40px",
    },
    statsRow: {
      display: "flex",
      justifyContent: "center",
      gap: 32,
      marginBottom: 48,
    },
    stat: {
      textAlign: "center" as const,
    },
    statNumber: {
      fontSize: 36,
      fontWeight: 300,
      fontFamily: "'Cormorant Garamond', serif",
      color: c.accent,
    },
    statLabel: {
      fontSize: 12,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
      marginTop: 4,
    },
    brandCard: {
      padding: "24px 20px",
      backgroundColor: c.cardSolid,
      borderRadius: 16,
      marginBottom: 12,
    },
    brandName: {
      fontSize: 18,
      fontWeight: 500,
      marginBottom: 4,
      fontFamily: "'Cormorant Garamond', serif",
    },
    brandDesc: {
      fontSize: 13,
      color: c.textSecondary,
      fontFamily: "'Heebo', sans-serif",
    },
    contactBtn: {
      width: "100%",
      padding: "18px 24px",
      borderRadius: 28,
      backgroundColor: c.accent,
      color: theme === "light" ? "#FFF" : c.bg,
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginTop: 32,
    },
    locationInfo: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: 8,
      marginTop: 24,
      fontSize: 14,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
    },
    // Profile
    welcomeCard: {
      padding: "32px 24px",
      backgroundColor: c.cardSolid,
      borderRadius: 20,
      marginBottom: 24,
      textAlign: isRTL ? "right" as const : "left" as const,
    },
    welcomeText: {
      fontSize: 14,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
      marginBottom: 4,
    },
    userName: {
      fontSize: 28,
      fontWeight: 400,
      fontFamily: "'Cormorant Garamond', serif",
    },
    loyaltyCard: {
      padding: "24px",
      borderRadius: 20,
      background: `linear-gradient(135deg, ${c.accent} 0%, ${theme === "light" ? "#B39A70" : "#E5C9A7"} 100%)`,
      marginBottom: 24,
      color: theme === "light" ? "#FFF" : c.bg,
    },
    loyaltyLevel: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      marginBottom: 4,
      fontFamily: "'Inter', sans-serif",
      opacity: 0.8,
    },
    loyaltyName: {
      fontSize: 24,
      fontWeight: 500,
      fontFamily: "'Cormorant Garamond', serif",
      marginBottom: 16,
    },
    progressBar: {
      height: 4,
      backgroundColor: "rgba(255,255,255,0.3)",
      borderRadius: 2,
      marginBottom: 8,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      width: "40%",
      backgroundColor: "#FFF",
      borderRadius: 2,
    },
    progressText: {
      fontSize: 12,
      fontFamily: "'Heebo', sans-serif",
      opacity: 0.9,
    },
    ordersSection: {
      backgroundColor: c.cardSolid,
      borderRadius: 20,
      marginBottom: 16,
      overflow: "hidden",
    },
    ordersHeader: {
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
    },
    ordersTitle: {
      fontSize: 16,
      fontWeight: 500,
      fontFamily: "'Heebo', sans-serif",
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    orderItem: {
      padding: "16px 24px",
      borderTop: `1px solid ${c.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    orderInfo: {
      display: "flex",
      flexDirection: "column" as const,
      gap: 4,
    },
    orderId: {
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
    },
    orderDate: {
      fontSize: 12,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
    },
    orderStatus: (status: string) => ({
      padding: "6px 12px",
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      backgroundColor: status === "delivered" 
        ? "rgba(34, 197, 94, 0.1)" 
        : status === "shipping" 
        ? "rgba(59, 130, 246, 0.1)" 
        : "rgba(251, 191, 36, 0.1)",
      color: status === "delivered" 
        ? "#22c55e" 
        : status === "shipping" 
        ? "#3b82f6" 
        : "#f59e0b",
    }),
    settingsItem: {
      backgroundColor: c.cardSolid,
      borderRadius: 16,
      padding: "16px 20px",
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    settingsLabel: {
      fontSize: 15,
      fontFamily: "'Heebo', sans-serif",
    },
    themeToggle: {
      display: "flex",
      gap: 8,
    },
    themeBtn: (active: boolean) => ({
      padding: "8px 14px",
      borderRadius: 12,
      backgroundColor: active ? c.accent : c.bgSecondary,
      color: active ? (theme === "light" ? "#FFF" : c.bg) : c.text,
      border: "none",
      cursor: "pointer",
      fontSize: 13,
      fontFamily: "'Heebo', sans-serif",
    }),
  };

  // ─────────────────────────────────────────────────
  // RENDER SECTIONS
  // ─────────────────────────────────────────────────

  const renderShowcase = () => (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${isRTL ? "30%" : "70%"} 30%, ${c.accent}20 0%, transparent 50%)`,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{t.heroTitle}</h1>
          <p style={styles.heroSubtitle}>{t.heroSubtitle}</p>
        </div>
      </div>

      <div style={styles.section}>
        {/* Filters */}
        <div style={styles.filterRow}>
          {[
            { id: "all", label: t.filterAll },
            { id: "anti-age", label: t.filterAntiAge },
            { id: "hydration", label: t.filterHydration },
            { id: "cleansing", label: t.filterCleansing },
          ].map((filter) => (
            <button
              key={filter.id}
              style={styles.filterPill(activeFilter === filter.id)}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Curated Section */}
        <h2 style={styles.sectionTitle}>{t.curatedBy}</h2>

        {/* Quote Block */}
        <div style={styles.quoteBlock}>
          <p style={styles.quote}>
            {lang === "he" 
              ? "״סרום הרטינול הזה שינה את הטיפוח שלי. אני משתמשת בו כל ערב.״"
              : "«Эта сыворотка с ретинолом изменила мой уход. Я использую её каждый вечер.»"
            }
          </p>
          <p style={styles.quoteAuthor}>— {lang === "he" ? "אולגה פרגר" : "Ольга Фрегер"}</p>
        </div>

        {/* Bento Grid */}
        <div style={styles.bentoGrid}>
          {filteredProducts.slice(0, 6).map((product, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <div
                key={product.id}
                style={styles.productCard(isLarge)}
                onClick={() => setSelectedProduct(product)}
              >
                <div style={styles.productImage(product.image, isLarge)} />
                {product.featured && (
                  <div style={styles.featuredBadge}>{t.curatedBy}</div>
                )}
                <div style={styles.productInfo}>
                  <p style={styles.productBrand}>{product.brand}</p>
                  <h3 style={styles.productName}>
                    {lang === "he" ? product.name_he : product.name_ru}
                  </h3>
                  <p style={styles.productPrice}>₪{product.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bestsellers Carousel */}
        <h2 style={{ ...styles.sectionTitle, marginTop: 40 }}>{t.bestsellers}</h2>
        <div style={styles.carousel}>
          {products.filter(p => p.featured).map((product) => (
            <div
              key={product.id}
              style={styles.carouselCard}
              onClick={() => setSelectedProduct(product)}
            >
              <div style={{ ...styles.productImage(product.image, false), height: 140 }} />
              <div style={{ padding: 12 }}>
                <p style={{ ...styles.productBrand, fontSize: 10 }}>{product.brand}</p>
                <h3 style={{ ...styles.productName, fontSize: 14 }}>
                  {lang === "he" ? product.name_he : product.name_ru}
                </h3>
                <p style={{ ...styles.productPrice, fontSize: 14 }}>₪{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRituals = () => (
    <div>
      {/* Hero */}
      <div style={{ ...styles.hero, height: 280 }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${c.bgSecondary} 0%, ${c.accent}30 100%)`,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }} />
        <div style={{ ...styles.heroContent, bottom: 32 }}>
          <h1 style={{ ...styles.heroTitle, fontSize: 36 }}>{t.ritualsTitle}</h1>
          <p style={styles.heroSubtitle}>{t.ritualsSubtitle}</p>
        </div>
      </div>

      <div style={styles.section}>
        {services.map((service) => (
          <div key={service.id} style={styles.ritualCard}>
            <div style={styles.ritualGradient(service.gradient)}>
              <h3 style={styles.ritualName}>
                {lang === "he" ? service.name_he : service.name_ru}
              </h3>
              <div style={styles.ritualMeta}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Icons.Clock size={14} color="rgba(44, 40, 37, 0.7)" />
                  {service.duration} {t.duration}
                </span>
                <span>₪{service.price}</span>
              </div>
              <p style={styles.ritualDesc}>
                {lang === "he" ? service.desc_he : service.desc_ru}
              </p>
              <button style={styles.bookBtn}>
                {t.bookNow}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div>
      <div style={styles.aboutHero}>
        <div style={styles.avatar}>О</div>
        <h1 style={styles.aboutName}>
          {lang === "he" ? "אולגה פרגר" : "Ольга Фрегер"}
        </h1>
        <p style={styles.aboutRole}>{t.aboutRole}</p>
        <p style={styles.aboutPhilosophy}>{t.aboutPhilosophy}</p>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <div style={styles.statNumber}>10+</div>
            <div style={styles.statLabel}>{t.yearsExp}</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>3</div>
            <div style={styles.statLabel}>{t.brands}</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>173+</div>
            <div style={styles.statLabel}>{t.products}</div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.brands}</h2>
        
        {[
          { name: "Dermalosophy", desc: lang === "he" ? "קוסמצבטיקה אקטיבית, רטינול, חומצות" : "Активная космецевтика, ретинол, кислоты" },
          { name: "ONmacabim", desc: lang === "he" ? "אנטי-אייג׳ מקצועי" : "Профессиональный anti-age" },
          { name: "Hikari", desc: lang === "he" ? "קוסמצבטיקה טבעית" : "Натуральная космецевтика" },
        ].map((brand) => (
          <div key={brand.name} style={styles.brandCard}>
            <h3 style={styles.brandName}>{brand.name}</h3>
            <p style={styles.brandDesc}>{brand.desc}</p>
          </div>
        ))}

        <button style={styles.contactBtn}>
          <Icons.Send size={18} color={theme === "light" ? "#FFF" : c.bg} />
          {t.contactOlga}
        </button>

        <div style={styles.locationInfo}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icons.MapPin size={14} color={c.textMuted} />
            {t.location}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icons.Clock size={14} color={c.textMuted} />
            {t.hours}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div style={styles.section}>
      {/* Welcome */}
      <div style={styles.welcomeCard}>
        <p style={styles.welcomeText}>{t.welcomeBack}</p>
        <h1 style={styles.userName}>Ko</h1>
      </div>

      {/* Loyalty Card */}
      <div style={styles.loyaltyCard}>
        <p style={styles.loyaltyLevel}>{t.loyaltyLevel}</p>
        <h2 style={styles.loyaltyName}>{t.silver}</h2>
        <div style={styles.progressBar}>
          <div style={styles.progressFill} />
        </div>
        <p style={styles.progressText}>₪1,500 {t.toNextLevel}</p>
      </div>

      {/* Orders */}
      <div style={styles.ordersSection}>
        <div 
          style={styles.ordersHeader}
          onClick={() => setExpandedOrders(!expandedOrders)}
        >
          <span style={styles.ordersTitle}>
            <Icons.Package size={18} color={c.text} />
            {t.myOrders}
          </span>
          <div style={{ 
            transform: expandedOrders ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}>
            <Icons.ChevronDown size={20} color={c.textMuted} />
          </div>
        </div>
        {expandedOrders && orders.map((order) => (
          <div key={order.id} style={styles.orderItem}>
            <div style={styles.orderInfo}>
              <span style={styles.orderId}>{order.id}</span>
              <span style={styles.orderDate}>{order.date} · {order.items} {lang === "he" ? "פריטים" : "товара"} · ₪{order.total}</span>
            </div>
            <span style={styles.orderStatus(order.status)}>
              {t.orderStatus[order.status as keyof typeof t.orderStatus]}
            </span>
          </div>
        ))}
      </div>

      {/* Favorites */}
      <div style={styles.ordersSection}>
        <div style={styles.ordersHeader}>
          <span style={styles.ordersTitle}>
            <Icons.Heart size={18} color={c.text} />
            {t.favorites}
          </span>
        </div>
      </div>

      {/* Settings */}
      <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>{t.settings}</h2>
      
      <div style={styles.settingsItem}>
        <span style={styles.settingsLabel}>{t.language}</span>
        <div style={styles.themeToggle}>
          <button 
            style={styles.themeBtn(lang === "he")}
            onClick={() => setLang("he")}
          >
            עברית
          </button>
          <button 
            style={styles.themeBtn(lang === "ru")}
            onClick={() => setLang("ru")}
          >
            Русский
          </button>
        </div>
      </div>

      <div style={styles.settingsItem}>
        <span style={styles.settingsLabel}>{t.theme}</span>
        <div style={styles.themeToggle}>
          <button 
            style={styles.themeBtn(theme === "light")}
            onClick={() => setTheme("light")}
          >
            {t.light}
          </button>
          <button 
            style={styles.themeBtn(theme === "dark")}
            onClick={() => setTheme("dark")}
          >
            {t.dark}
          </button>
        </div>
      </div>

      <div style={{ 
        textAlign: "center", 
        marginTop: 40, 
        fontSize: 13, 
        color: c.textMuted,
        fontFamily: "'Heebo', sans-serif",
      }}>
        <p>{t.help} · v1.0.0</p>
      </div>
    </div>
  );

  // Product Detail Modal
  const renderProductModal = () => {
    if (!selectedProduct) return null;
    
    return (
      <div style={{
        ...styles.modal,
        animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={styles.modalHeader}>
          <button 
            style={{ ...styles.iconBtn, backgroundColor: c.glass, backdropFilter: "blur(10px)" }}
            onClick={() => setSelectedProduct(null)}
          >
            <Icons.Close size={20} color={c.text} />
          </button>
          <button style={{ ...styles.iconBtn, backgroundColor: c.glass, backdropFilter: "blur(10px)" }}>
            <Icons.Heart size={20} color={c.text} />
          </button>
        </div>

        <div style={styles.modalImage(selectedProduct.image)} />

        <div style={styles.modalContent}>
          <p style={styles.modalBrand}>{selectedProduct.brand}</p>
          <h1 style={styles.modalName}>
            {lang === "he" ? selectedProduct.name_he : selectedProduct.name_ru}
          </h1>
          <p style={styles.modalDesc}>
            {lang === "he" ? selectedProduct.desc_he : selectedProduct.desc_ru}
          </p>

          <h3 style={{ ...styles.sectionTitle, fontSize: 16, marginBottom: 12 }}>
            {t.ingredients}
          </h3>
          <div style={styles.ingredientPills}>
            {selectedProduct.ingredients.map((ing) => (
              <span key={ing} style={styles.ingredientPill}>{ing}</span>
            ))}
          </div>

          {selectedProduct.featured && (
            <div style={styles.recommendedBadge}>
              <Icons.Check size={16} color={c.accent} />
              <span style={{ fontSize: 14, fontFamily: "'Heebo', sans-serif" }}>
                {t.recommended}
              </span>
            </div>
          )}

          <h3 style={{ ...styles.sectionTitle, fontSize: 16, marginTop: 32 }}>
            {t.completeRoutine}
          </h3>
          <div style={{ ...styles.carousel, marginBottom: 100 }}>
            {products
              .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
              .slice(0, 3)
              .map((product) => (
                <div
                  key={product.id}
                  style={{ ...styles.carouselCard, minWidth: 140 }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div style={{ ...styles.productImage(product.image, false), height: 100 }} />
                  <div style={{ padding: 10 }}>
                    <p style={{ ...styles.productBrand, fontSize: 9 }}>{product.brand}</p>
                    <h3 style={{ ...styles.productName, fontSize: 13 }}>
                      {lang === "he" ? product.name_he : product.name_ru}
                    </h3>
                    <p style={{ ...styles.productPrice, fontSize: 13 }}>₪{product.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <button 
          style={styles.addToCartBtn}
          onClick={() => {
            addToCart(selectedProduct.id);
            setSelectedProduct(null);
          }}
        >
          {t.addToCart} · ₪{selectedProduct.price}
        </button>
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Heebo:wght@300;400;500;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={styles.app}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>FREGER</div>
          <div style={styles.headerActions}>
            <button 
              style={styles.langToggle}
              onClick={() => setLang(lang === "he" ? "ru" : "he")}
            >
              {lang === "he" ? "🇷🇺" : "🇮🇱"}
            </button>
            <button 
              style={styles.iconBtn}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Icons.Moon size={20} color={c.text} />
              ) : (
                <Icons.Sun size={20} color={c.text} />
              )}
            </button>
            <button style={{ ...styles.iconBtn, position: "relative" }}>
              <Icons.Cart size={20} color={c.text} />
              {cart.length > 0 && (
                <span style={styles.cartBadge}>{cart.length}</span>
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main} ref={mainRef}>
          {activeSection === "showcase" && renderShowcase()}
          {activeSection === "rituals" && renderRituals()}
          {activeSection === "about" && renderAbout()}
          {activeSection === "profile" && renderProfile()}
        </main>

        {/* Navigation */}
        <nav style={styles.nav}>
          {[
            { id: "showcase", icon: Icons.Showcase, label: t.navShowcase },
            { id: "rituals", icon: Icons.Rituals, label: t.navRituals },
            { id: "about", icon: Icons.About, label: t.navAbout },
            { id: "profile", icon: Icons.Profile, label: t.navProfile },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                style={styles.navItem(isActive)}
                onClick={() => setActiveSection(item.id as typeof activeSection)}
              >
                <Icon 
                  size={20} 
                  color={isActive ? (theme === "light" ? "#FFF" : c.bg) : c.textSecondary} 
                />
                {isActive && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Product Modal */}
        {selectedProduct && renderProductModal()}
      </div>
    </>
  );
}
