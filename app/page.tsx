"use client";

import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════
// FREGER COSMETICS — TELEGRAM MINI APP
// Luxury Beauty Digital Boutique v2.0
// Enhanced with Quiet Luxury animations & depth
// ═══════════════════════════════════════════════

// ─────────────────────────────────────────────────
// DESIGN TOKENS - Enhanced contrast & warmth
// ─────────────────────────────────────────────────

const tokens = {
  light: {
    bg: "#FFFBF7",
    bgSecondary: "#F7F0E8",
    bgTertiary: "#EDE4D9",
    text: "#1F1A16",
    textSecondary: "#5C524A",
    textMuted: "#8B8078",
    accent: "#9C7B5C", // Rich warm bronze
    accentLight: "#C4A882",
    accentDark: "#7A5D42",
    card: "rgba(255, 255, 255, 0.95)",
    cardSolid: "#FFFFFF",
    cardElevated: "#FFFFFF",
    glass: "rgba(255, 251, 247, 0.92)",
    border: "rgba(31, 26, 22, 0.06)",
    borderStrong: "rgba(31, 26, 22, 0.12)",
    shadow: "0 4px 24px rgba(31, 26, 22, 0.08)",
    shadowDeep: "0 12px 48px rgba(31, 26, 22, 0.12)",
    shadowGlow: "0 0 60px rgba(156, 123, 92, 0.15)",
  },
  dark: {
    bg: "#0F0D0B",
    bgSecondary: "#1A1714",
    bgTertiary: "#252220",
    text: "#F5F0EB",
    textSecondary: "#B8AFA5",
    textMuted: "#6B635A",
    accent: "#C9A87C",
    accentLight: "#E0C9A3",
    accentDark: "#A08560",
    card: "rgba(37, 34, 32, 0.95)",
    cardSolid: "#1F1C19",
    cardElevated: "#2A2723",
    glass: "rgba(15, 13, 11, 0.95)",
    border: "rgba(245, 240, 235, 0.06)",
    borderStrong: "rgba(245, 240, 235, 0.12)",
    shadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
    shadowDeep: "0 12px 48px rgba(0, 0, 0, 0.5)",
    shadowGlow: "0 0 60px rgba(201, 168, 124, 0.1)",
  },
};

// ─────────────────────────────────────────────────
// i18n TRANSLATIONS - Updated section names
// ─────────────────────────────────────────────────

const i18n = {
  he: {
    // Navigation - clearer labels
    navCatalog: "ויטרינה",
    navServices: "ריטואלים",
    navBrand: "עלינו",
    navProfile: "קבינט",
    
    // Header
    cart: "סל קניות",
    
    // Showcase
    heroTitle: "יופי אותנטי",
    heroSubtitle: "קוסמטיקה מקצועית לטיפוח עור מושלם",
    selectBrand: "בחירת מותג",
    selectCategory: "בחירת קטגוריה",
    allBrands: "כל המותגים",
    allCategories: "כל הקטגוריות",
    filterAll: "הכל",
    filterAntiAge: "אנטי-אייג׳",
    filterHydration: "לחות",
    filterCleansing: "ניקוי",
    bestsellers: "רבי מכר",
    curatedBy: "נבחר ע״י אולגה",
    addToCart: "הוספה לסל",
    viewDetails: "לפרטים",
    completeRoutine: "השלימי את הטיפוח",
    newArrivals: "חדשים בחנות",
    
    // Product
    ingredients: "רכיבים פעילים",
    recommended: "מומלץ ע״י אולגה",
    
    // Services (renamed from Rituals)
    servicesTitle: "שירותי הסטודיו",
    servicesSubtitle: "חוויה אישית ומפנקת",
    bookNow: "הזמנת תור",
    duration: "דק׳",
    
    // About/Brand
    brandTitle: "העולם של פרגר",
    aboutRole: "קוסמטיקאית · מאסטר רייקי",
    aboutPhilosophy: "אני מאמינה שיופי אמיתי נובע מאיזון פנימי. כל טיפוח הוא מסע של חיבור לעצמך.",
    yearsExp: "שנות ניסיון",
    brands: "מותגים",
    products: "מוצרים",
    contactOlga: "לשוחח עם אולגה",
    whatsappOlga: "כתבי לי בווטסאפ",
    openInWaze: "פתח ב-Waze",
    openInGoogle: "פתח במפות גוגל",
    openInApple: "פתח במפות אפל",
    location: "קריית גת",
    hours: "א׳-ה׳ 9:00-19:00",
    ourStory: "הסיפור שלנו",
    
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
    // Consents
    consents: "הסכמות",
    consentOrders: "עיבוד הזמנות ונתונים",
    consentProcedures: "טיפולים קוסמטיים",
    consentMarketing: "דיוור שיווקי",
    consentPhotos: "פרסום תמונות לפני/אחרי",
  },
  ru: {
    // Navigation - clearer labels
    navCatalog: "Витрина",
    navServices: "Ритуалы",
    navBrand: "О нас",
    navProfile: "Кабинет",
    
    // Header
    cart: "Корзина",
    
    // Showcase
    heroTitle: "Истинная красота",
    heroSubtitle: "Профессиональная косметика для совершенной кожи",
    selectBrand: "Выбрать бренд",
    selectCategory: "Выбрать категорию",
    allBrands: "Все бренды",
    allCategories: "Все категории",
    filterAll: "Все",
    filterAntiAge: "Anti-age",
    filterHydration: "Увлажнение",
    filterCleansing: "Очищение",
    bestsellers: "Бестселлеры",
    curatedBy: "Выбор Ольги",
    addToCart: "В корзину",
    viewDetails: "Подробнее",
    completeRoutine: "Допо��ните уход",
    newArrivals: "Новинки",
    
    // Product
    ingredients: "Активные ингредиенты",
    recommended: "Рекомендует Ольга",
    
    // Services (renamed from Rituals)
    servicesTitle: "Услуги студии",
    servicesSubtitle: "Персональный уход и релакс",
    bookNow: "Записаться",
    duration: "мин",
    
    // About/Brand
    brandTitle: "Мир Freger",
    aboutRole: "Косметолог · Мастер Рейки",
    aboutPhilosophy: "Я верю, что истинная красота рождается из внутренней гармонии. Каждый уход — это путешествие к себе.",
    yearsExp: "лет опыта",
    brands: "бренда",
    products: "продуктов",
    contactOlga: "Написать Ольге",
    whatsappOlga: "Написать в WhatsApp",
    openInWaze: "Открыть в Waze",
    openInGoogle: "Открыть в Google Maps",
    openInApple: "Открыть в Apple Maps",
    location: "Кирьят-Гат",
    hours: "Вс-Чт 9:00-19:00",
    ourStory: "Наша история",
    
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
    emptyOrdersCta: "Открыть каталог",
    emptyFavorites: "Пока нет избранного",
    // Consents
    consents: "Согласия",
    consentOrders: "Обработка заказов и данных",
    consentProcedures: "Косметологические процедуры",
    consentMarketing: "Маркетинговые рассылки",
    consentPhotos: "Публикация фото до/после",
  },
};

// ────────��────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────

// Brand-specific gradient backgrounds
const brandGradients = {
  light: {
    "Dermalosophy": "linear-gradient(145deg, #D4A574 0%, #C9986A 40%, #B8845A 100%)", // warm gold → sand
    "ONmacabim": "linear-gradient(145deg, #A8A095 0%, #C4B8A8 50%, #E5DED5 100%)", // warm gray → beige
    "Hikari": "linear-gradient(145deg, #8BA888 0%, #A8C4A0 50%, #C5E0C0 100%)", // sage green → mint
  },
  dark: {
    "Dermalosophy": "linear-gradient(145deg, #8B6B48 0%, #7A5D3D 40%, #5C4530 100%)", // darkened gold
    "ONmacabim": "linear-gradient(145deg, #5A5550 0%, #6B6358 50%, #7A7268 100%)", // darkened gray
    "Hikari": "linear-gradient(145deg, #4A5E48 0%, #5A7358 50%, #6A8568 100%)", // darkened green
  },
};

const products = [
  {
    id: 1,
    name_he: "סרום רטינול 0.5%",
    name_ru: "Сыворотка ретинол 0.5%",
    brand: "Dermalosophy",
    category: "anti-age",
    price: 320,
    oldPrice: 380,
    desc_he: "סרום אנטי-אייג׳ מתקדם עם רטינול מיוצב",
    desc_ru: "Продвинутая anti-age сыворотка со стабилизированным ретинолом",
    ingredients: ["Retinol", "Vitamin E", "Squalane"],
    featured: true,
  },
  {
    id: 2,
    name_he: "קרם לחות אינטנסיבי",
    name_ru: "Интенсивный увлажняющ��й крем",
    brand: "ONmacabim",
    category: "hydration",
    price: 280,
    oldPrice: null,
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
    oldPrice: null,
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
    oldPrice: 240,
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
    oldPrice: null,
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
    oldPrice: null,
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
    oldPrice: 350,
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
    oldPrice: null,
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
    gradient: "linear-gradient(145deg, #E8DDD4 0%, #D4C4B0 50%, #C4A77D 100%)",
  },
  {
    id: 2,
    name_he: "הרמוניה אנרגטית",
    name_ru: "Энергетическая гармония",
    duration: 45,
    price: 250,
    desc_he: "טיפול רייקי משולב עם טיפוח פנים להרגעה ואיזון",
    desc_ru: "Рейки терапия в сочетании с уходом за лицом для расслабления и баланса",
    gradient: "linear-gradient(145deg, #E5EDE8 0%, #C8D8CE 50%, #A8C4B4 100%)",
  },
  {
    id: 3,
    name_he: "התחדשות העור",
    name_ru: "Обновление кожи",
    duration: 45,
    price: 300,
    desc_he: "פילינג מקצועי והזנה אינטנסיבית לעור זוהר",
    desc_ru: "Профессиональный пилинг и интенсивное питание для сияющей кожи",
    gradient: "linear-gradient(145deg, #F5EAE0 0%, #E5D5C5 50%, #D4B896 100%)",
  },
  {
    id: 4,
    name_he: "עיסוי פיסול",
    name_ru: "Скульптурный массаж",
    duration: 30,
    price: 200,
    desc_he: "טכניקת עיסוי מתקדמת להרמת ומיצוק קווי הפנים",
    desc_ru: "Продвинутая массажная техника для лифтинга и укрепления контуров лица",
    gradient: "linear-gradient(145deg, #EDE5DC 0%, #DDD0C4 50%, #C8B8A8 100%)",
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
// ICONS (SVG) - Redesigned for clarity
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
  // Catalog - Grid icon (Витрина)
  Catalog: ({ size = 22, color = "currentColor", filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill={filled ? color : "none"} stroke={color} strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill={filled ? color : "none"} stroke={color} strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill={filled ? color : "none"} stroke={color} strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill={filled ? color : "none"} stroke={color} strokeWidth="1.5" />
    </svg>
  ),
  // Services - Calendar icon (Ритуалы)
  Services: ({ size = 22, color = "currentColor", filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" fill={filled ? color : "none"} />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  ),
  // Brand - Heart icon (О нас)
  Brand: ({ size = 22, color = "currentColor", filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  // Profile - User silhouette (Кабинет)
  Profile: ({ size = 22, color = "currentColor", filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" fill={filled ? color : "none"} />
      <path d="M20 21c0-4-4-6-8-6s-8 2-8 6" fill={filled ? color : "none"} />
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
  ChevronRight: ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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
  Sparkle: ({ size = 16, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  ),
  // WhatsApp icon
  WhatsApp: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.66 0-3.203-.506-4.485-1.371l-.256-.152-2.65.695.707-2.579-.168-.266A7.955 7.955 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" fill="#25D366"/>
    </svg>
  ),
  // Waze icon (official style)
  Waze: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C7.031 2 3 6.031 3 11c0 2.124.756 4.076 2 5.594V21l3.4-2.267A8.938 8.938 0 0012 20c4.969 0 9-4.031 9-9s-4.031-9-9-9z" fill="#33CCFF"/>
      <circle cx="8.5" cy="10" r="1.5" fill="#000"/>
      <circle cx="15.5" cy="10" r="1.5" fill="#000"/>
      <path d="M8 14c0 0 1.5 2 4 2s4-2 4-2" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  // Google Maps icon
  GoogleMaps: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
      <circle cx="12" cy="9" r="2.5" fill="#fff"/>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84L12 22l5.59-8.16C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
      <path d="M12 6.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="#fff"/>
    </svg>
  ),
  // Apple Maps icon (authentic style)
  AppleMaps: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="appleMapsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#52D367"/>
          <stop offset="50%" stopColor="#3AC653"/>
          <stop offset="100%" stopColor="#5AC770"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="4.5" fill="url(#appleMapsGrad)"/>
      <path d="M7 8.5L12 6l5 2.5v7L12 18l-5-2.5v-7z" fill="#F5F5DC" fillOpacity="0.9"/>
      <path d="M7 8.5L12 11l5-2.5" stroke="#E8C547" strokeWidth="0.5" fill="none"/>
      <path d="M12 11v7" stroke="#E8C547" strokeWidth="0.5"/>
      <path d="M9 9.5l2-1 2 1v4l-2 1-2-1v-4z" fill="#FFD93D" fillOpacity="0.6"/>
      <circle cx="12" cy="10" r="1.5" fill="#FF3B30"/>
      <path d="M12 10l1.5 3" stroke="#FF3B30" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────
// MAIN APP COMPONENT
// ─────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState<"catalog" | "services" | "brand" | "profile">("catalog");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<"he" | "ru">("ru");
  const [cart, setCart] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState(false);
  const [consents, setConsents] = useState({
    orders: true,
    procedures: true,
    marketing: false,
    photos: false,
  });
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Extract unique brands from products
  const brands = [...new Set(products.map(p => p.brand))];
  
  // Get categories available for selected brand (or all if no brand selected)
  const availableCategories = selectedBrand
    ? [...new Set(products.filter(p => p.brand === selectedBrand).map(p => p.category))]
    : [...new Set(products.map(p => p.category))];

  const t = i18n[lang];
  const c = tokens[theme];
  const isRTL = lang === "he";

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), 50);
  }, [activeSection]);

  const addToCart = (productId: number) => {
    setCart((prev) => [...prev, productId]);
  };

  // Handle brand selection - reset category when brand changes
  const handleBrandSelect = (brand: string | null) => {
    setSelectedBrand(brand);
    setSelectedCategory(null); // Reset category when brand changes
  };

  // Filter products based on selected brand and category
  const filteredProducts = products.filter(p => {
    const brandMatch = !selectedBrand || p.brand === selectedBrand;
    const categoryMatch = !selectedCategory || p.category === selectedCategory;
    return brandMatch && categoryMatch;
  });

  // Category labels mapping
  const categoryLabels: Record<string, { he: string; ru: string }> = {
    "anti-age": { he: "אנטי-אייג׳", ru: "Anti-age" },
    "hydration": { he: "לחות", ru: "Увлажнение" },
    "cleansing": { he: "ניקוי", ru: "Очищение" },
  };

  // ─────────────────────────────────���───────────────
  // STYLES - Enhanced with depth & animations
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
      transition: "background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    header: {
      position: "fixed" as const,
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      backgroundColor: c.glass,
      backdropFilter: "blur(24px) saturate(180%)",
      WebkitBackdropFilter: "blur(24px) saturate(180%)",
      borderBottom: `1px solid ${c.border}`,
      zIndex: 100,
      transition: "background-color 0.6s ease",
    },
    logo: {
      width: 42,
      height: 42,
      borderRadius: 21,
      border: `2px solid ${c.accent}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    logoImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
    logoPlaceholder: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 22,
      fontWeight: 500,
      color: c.accent,
      lineHeight: 1,
    },
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    iconBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      color: c.text,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    langToggle: {
      fontSize: 13,
      fontWeight: 600,
      padding: "8px 14px",
      borderRadius: 20,
      backgroundColor: c.bgSecondary,
      border: `1px solid ${c.border}`,
      cursor: "pointer",
      color: c.text,
      fontFamily: "'Inter', sans-serif",
      letterSpacing: "0.02em",
      transition: "all 0.3s ease",
    },
    cartBadge: {
      position: "absolute" as const,
      top: 6,
      [isRTL ? "left" : "right"]: 6,
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: c.accent,
      color: "#FFF",
      fontSize: 10,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      boxShadow: `0 2px 8px ${c.accent}40`,
    },
    main: {
      height: "100vh",
      overflowY: "auto" as const,
      paddingTop: 64,
      paddingBottom: 100,
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
      backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.96)" : "rgba(31, 28, 25, 0.96)",
      backdropFilter: "blur(24px) saturate(180%)",
      WebkitBackdropFilter: "blur(24px) saturate(180%)",
      borderRadius: 20,
      border: `1px solid ${c.borderStrong}`,
      boxShadow: c.shadowDeep,
      zIndex: 100,
    },
    navItem: (active: boolean) => ({
      height: 54,
      borderRadius: 16,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      padding: "6px 12px",
      backgroundColor: active ? c.accent : "transparent",
      border: "none",
      cursor: "pointer",
      color: active ? "#FFF" : c.textSecondary,
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Heebo', sans-serif",
      fontSize: 10,
      fontWeight: 500,
      boxShadow: active ? `0 4px 16px ${c.accent}40` : "none",
      minWidth: 56,
    }),
    section: {
      padding: "28px 20px",
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    hero: {
      position: "relative" as const,
      height: 380,
      borderRadius: 0,
      overflow: "hidden",
      marginBottom: 32,
      background: theme === "light" 
        ? `linear-gradient(160deg, #F5EBE0 0%, #E8D5C4 30%, ${c.accent}40 70%, #1F1A16 100%)`
        : `linear-gradient(160deg, #2A2420 0%, #3A3028 30%, ${c.accent}30 70%, #0A0908 100%)`,
    },
    heroNoise: {
      position: "absolute" as const,
      inset: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      opacity: 0.06,
      mixBlendMode: "overlay" as const,
    },
    heroMesh: {
      position: "absolute" as const,
      inset: 0,
      background: `
        radial-gradient(ellipse 80% 50% at 20% 80%, ${c.accent}35 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 80% 20%, ${theme === "light" ? "#D4A87440" : "#8B6B4830"} 0%, transparent 40%)
      `,
    },
    heroContent: {
      position: "absolute" as const,
      bottom: 48,
      [isRTL ? "right" : "left"]: 28,
      [isRTL ? "left" : "right"]: 28,
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
    },
    heroTitle: {
      fontSize: 46,
      fontWeight: 300,
      lineHeight: 1.05,
      marginBottom: 16,
      fontFamily: "'Cormorant Garamond', serif",
      letterSpacing: "-0.02em",
    },
    heroSubtitle: {
      fontSize: 15,
      color: c.textSecondary,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    filterRow: {
      display: "flex",
      gap: 10,
      marginBottom: 32,
      overflowX: "auto" as const,
      paddingBottom: 4,
      scrollbarWidth: "none" as const,
    },
    filterSection: {
      marginBottom: 28,
    },
    filterLabel: {
      fontSize: 12,
      fontWeight: 600,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
      marginBottom: 14,
    },
    brandRow: {
      display: "flex",
      gap: 12,
      overflowX: "auto" as const,
      paddingBottom: 6,
      scrollbarWidth: "none" as const,
      marginBottom: 8,
    },
    brandPill: (active: boolean) => ({
      padding: "14px 22px",
      borderRadius: 20,
      backgroundColor: active ? c.accent : theme === "light" ? c.cardSolid : c.bgSecondary,
      color: active ? "#FFF" : c.text,
      border: active ? "none" : `1px solid ${c.borderStrong}`,
      cursor: "pointer",
      fontSize: 15,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: active ? 600 : 500,
      whiteSpace: "nowrap" as const,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: active ? `0 4px 16px ${c.accent}35` : c.shadow,
      transform: active ? "scale(1.02)" : "scale(1)",
    }),
    categoryRow: {
      display: "flex",
      gap: 10,
      overflowX: "auto" as const,
      paddingBottom: 6,
      scrollbarWidth: "none" as const,
    },
    categoryPill: (active: boolean, disabled: boolean) => ({
      padding: "11px 18px",
      borderRadius: 16,
      backgroundColor: active ? `${c.accent}18` : theme === "light" ? c.cardSolid : c.bgSecondary,
      color: active ? c.accent : disabled ? c.textMuted : c.textSecondary,
      border: active ? `1.5px solid ${c.accent}` : `1px solid ${c.border}`,
      cursor: disabled ? "not-allowed" : "pointer",
      fontSize: 13,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: active ? 600 : 500,
      whiteSpace: "nowrap" as const,
      transition: "all 0.25s ease",
      opacity: disabled ? 0.5 : 1,
    }),
    filterPill: (active: boolean) => ({
      padding: "12px 20px",
      borderRadius: 28,
      backgroundColor: active ? c.accent : theme === "light" ? c.cardSolid : c.bgSecondary,
      color: active ? "#FFF" : c.text,
      border: active ? "none" : `1px solid ${c.border}`,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "'Heebo', sans-serif",
      whiteSpace: "nowrap" as const,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: active ? `0 4px 16px ${c.accent}30` : "none",
    }),
    sectionTitle: {
      fontSize: 24,
      fontWeight: 400,
      marginBottom: 24,
      fontFamily: "'Cormorant Garamond', serif",
      letterSpacing: "-0.01em",
    },
    bentoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 16,
    },
    productCard: (large: boolean, index: number) => ({
      gridColumn: large ? "span 2" : "span 1",
      position: "relative" as const,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: c.cardSolid,
      cursor: "pointer",
      boxShadow: c.shadow,
      border: `1px solid ${c.border}`,
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
      transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
    }),
    productImage: (brand: string, large: boolean) => ({
      width: "100%",
      height: large ? 260 : 200,
      background: brandGradients[theme][brand as keyof typeof brandGradients.light] || brandGradients[theme]["Dermalosophy"],
      position: "relative" as const,
    }),
    productInfo: {
      padding: 18,
    },
    productBrand: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
      color: c.accent,
      marginBottom: 8,
      fontFamily: "'Inter', sans-serif",
    },
    productName: {
      fontSize: 17,
      fontWeight: 500,
      marginBottom: 10,
      fontFamily: "'Cormorant Garamond', serif",
      lineHeight: 1.3,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 700,
      color: c.text,
      fontFamily: "'Inter', sans-serif",
    },
    featuredBadge: {
      position: "absolute" as const,
      top: 14,
      [isRTL ? "left" : "right"]: 14,
      padding: "8px 14px",
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      fontSize: 11,
      fontWeight: 600,
      color: c.accent,
      fontFamily: "'Heebo', sans-serif",
      boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
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
      minWidth: 170,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: c.cardSolid,
      flexShrink: 0,
      boxShadow: c.shadow,
      border: `1px solid ${c.border}`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    quoteBlock: {
      padding: "36px 28px",
      margin: "36px 0",
      backgroundColor: theme === "light" ? c.cardSolid : c.bgSecondary,
      borderRadius: 24,
      textAlign: "center" as const,
      boxShadow: c.shadow,
      border: `1px solid ${c.border}`,
      position: "relative" as const,
      overflow: "hidden",
    },
    quote: {
      fontSize: 19,
      fontStyle: "italic",
      fontFamily: "'Cormorant Garamond', serif",
      lineHeight: 1.7,
      marginBottom: 20,
      position: "relative" as const,
      zIndex: 1,
    },
    quoteAuthor: {
      fontSize: 13,
      color: c.accent,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 600,
      letterSpacing: "0.05em",
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
    modalImage: (brand: string) => ({
      width: "100%",
      height: 340,
      background: brandGradients[theme][brand as keyof typeof brandGradients.light] || brandGradients[theme]["Dermalosophy"],
      flexShrink: 0,
    }),
    modalPrice: {
      display: "flex",
      alignItems: "baseline",
      gap: 12,
      marginBottom: 20,
    },
    modalPriceMain: {
      fontSize: 32,
      fontWeight: 700,
      color: c.accent,
      fontFamily: "'Inter', sans-serif",
    },
    modalPriceOld: {
      fontSize: 18,
      color: c.textMuted,
      textDecoration: "line-through",
      fontFamily: "'Inter', sans-serif",
    },
    modalContent: {
      flex: 1,
      padding: "28px 24px",
      overflowY: "auto" as const,
    },
    modalBrand: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
      color: c.accent,
      marginBottom: 10,
      fontFamily: "'Inter', sans-serif",
    },
    modalName: {
      fontSize: 30,
      fontWeight: 400,
      marginBottom: 20,
      fontFamily: "'Cormorant Garamond', serif",
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
    },
    modalDesc: {
      fontSize: 15,
      lineHeight: 1.75,
      color: c.textSecondary,
      marginBottom: 28,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 300,
    },
    ingredientPills: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: 10,
      marginBottom: 28,
    },
    ingredientPill: {
      padding: "10px 16px",
      borderRadius: 24,
      backgroundColor: c.bgSecondary,
      fontSize: 13,
      fontFamily: "'Inter', sans-serif",
      color: c.text,
      fontWeight: 500,
      border: `1px solid ${c.border}`,
    },
    recommendedBadge: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "14px 18px",
      backgroundColor: `${c.accent}15`,
      borderRadius: 16,
      marginBottom: 28,
      border: `1px solid ${c.accent}30`,
    },
    addToCartBtn: {
      position: "fixed" as const,
      bottom: 28,
      left: 20,
      right: 20,
      maxWidth: 390,
      margin: "0 auto",
      padding: "20px 28px",
      borderRadius: 32,
      backgroundColor: c.accent,
      color: "#FFF",
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      boxShadow: `0 8px 32px ${c.accent}40`,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    // Services
    serviceCard: (index: number) => ({
      position: "relative" as const,
      borderRadius: 24,
      overflow: "hidden",
      marginBottom: 20,
      cursor: "pointer",
      boxShadow: c.shadow,
      opacity: animateIn ? 1 : 0,
      transform: animateIn ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
    }),
    serviceGradient: (gradient: string) => ({
      padding: "32px 28px",
      background: gradient,
    }),
    serviceName: {
      fontSize: 26,
      fontWeight: 400,
      marginBottom: 10,
      fontFamily: "'Cormorant Garamond', serif",
      color: "#1F1A16",
      letterSpacing: "-0.01em",
    },
    serviceMeta: {
      display: "flex",
      alignItems: "center",
      gap: 20,
      fontSize: 14,
      color: "rgba(31, 26, 22, 0.7)",
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 500,
    },
    serviceDesc: {
      marginTop: 14,
      fontSize: 14,
      lineHeight: 1.7,
      color: "rgba(31, 26, 22, 0.75)",
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 300,
    },
    bookBtn: {
      marginTop: 24,
      padding: "16px 28px",
      borderRadius: 28,
      backgroundColor: "rgba(31, 26, 22, 0.9)",
      color: "#FFF",
      border: "none",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    },
    // Brand/About
    brandHero: {
      textAlign: "center" as const,
      padding: "48px 24px",
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 65,
      margin: "0 auto 24px",
      position: "relative" as const,
      overflow: "hidden",
      boxShadow: `0 12px 40px ${c.accent}40, 0 0 0 3px ${c.accentLight}, 0 0 0 6px ${c.accent}30`,
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
    avatarPlaceholder: {
      width: "100%",
      height: "100%",
      background: `linear-gradient(145deg, ${c.accentLight} 0%, ${c.accent} 50%, ${c.accentDark} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 44,
      fontFamily: "'Cormorant Garamond', serif",
      color: "#FFF",
      fontWeight: 300,
    },
    brandName: {
      fontSize: 30,
      fontWeight: 400,
      marginBottom: 10,
      fontFamily: "'Cormorant Garamond', serif",
      letterSpacing: "-0.01em",
    },
    brandRole: {
      fontSize: 14,
      color: c.accent,
      fontFamily: "'Heebo', sans-serif",
      marginBottom: 28,
      fontWeight: 500,
      letterSpacing: "0.02em",
    },
    brandPhilosophy: {
      fontSize: 19,
      fontStyle: "italic",
      lineHeight: 1.75,
      color: c.textSecondary,
      fontFamily: "'Cormorant Garamond', serif",
      maxWidth: 320,
      margin: "0 auto 44px",
    },
    statsRow: {
      display: "flex",
      justifyContent: "center",
      gap: 40,
      marginBottom: 52,
    },
    stat: {
      textAlign: "center" as const,
    },
    statNumber: {
      fontSize: 40,
      fontWeight: 300,
      fontFamily: "'Cormorant Garamond', serif",
      color: c.accent,
      lineHeight: 1,
    },
    statLabel: {
      fontSize: 12,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
      marginTop: 8,
      fontWeight: 500,
      letterSpacing: "0.03em",
    },
    brandCardItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 22px",
      backgroundColor: c.cardSolid,
      borderRadius: 20,
      marginBottom: 14,
      boxShadow: c.shadow,
      border: `1px solid ${c.border}`,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    brandCardItemContent: {
      flex: 1,
    },
    brandCardItemArrow: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme === "light" ? c.bgSecondary : c.bgTertiary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginInlineStart: 16,
    },
    brandCardName: {
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 6,
      fontFamily: "'Cormorant Garamond', serif",
    },
    brandCardDesc: {
      fontSize: 13,
      color: c.textSecondary,
      fontFamily: "'Heebo', sans-serif",
      lineHeight: 1.5,
    },
    contactBtn: {
      width: "100%",
      padding: "20px 28px",
      borderRadius: 32,
      backgroundColor: c.accent,
      color: "#FFF",
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      marginTop: 36,
      boxShadow: `0 8px 32px ${c.accent}40`,
      transition: "all 0.3s ease",
    },
    locationInfo: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: 10,
      marginTop: 28,
      fontSize: 14,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
    },
    mapLinksRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginTop: 16,
    },
    mapLinkBtn: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: theme === "light" ? "#FFF" : c.bgSecondary,
      border: `1px solid ${c.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.25s ease",
      boxShadow: c.shadow,
    },
    whatsappBtn: {
      width: "100%",
      padding: "16px 28px",
      borderRadius: 16,
      backgroundColor: "#25D366",
      color: "#FFF",
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      marginTop: 32,
      boxShadow: "0 8px 32px rgba(37, 211, 102, 0.35)",
      transition: "all 0.3s ease",
    },
    // Consents block styles
    consentsCard: {
      backgroundColor: c.cardSolid,
      borderRadius: 20,
      padding: 24,
      marginTop: 24,
      border: `1px solid ${c.border}`,
      boxShadow: c.shadow,
    },
    consentsTitle: {
      fontSize: 18,
      fontWeight: 600,
      fontFamily: "'Cormorant Garamond', serif",
      color: c.text,
      marginBottom: 20,
    },
    consentItem: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 0",
      borderBottom: `1px solid ${c.border}`,
      cursor: "pointer",
    },
    consentItemLast: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 0",
      cursor: "pointer",
    },
    consentCheckbox: (checked: boolean) => ({
      width: 22,
      height: 22,
      borderRadius: 6,
      backgroundColor: checked ? c.accent : "transparent",
      border: checked ? "none" : `2px solid ${c.borderStrong}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "all 0.2s ease",
    }),
    consentLabel: {
      fontSize: 15,
      fontFamily: "'Heebo', sans-serif",
      color: c.text,
      fontWeight: 400,
    },
    // Profile
    welcomeCard: {
      padding: "36px 28px",
      backgroundColor: c.cardSolid,
      borderRadius: 24,
      marginBottom: 24,
      textAlign: isRTL ? "right" as const : "left" as const,
      boxShadow: c.shadow,
      border: `1px solid ${c.border}`,
    },
    welcomeText: {
      fontSize: 14,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
      marginBottom: 6,
    },
    userName: {
      fontSize: 32,
      fontWeight: 400,
      fontFamily: "'Cormorant Garamond', serif",
      letterSpacing: "-0.01em",
    },
    loyaltyCard: {
      padding: "28px",
      borderRadius: 24,
      background: `linear-gradient(145deg, ${c.accentLight} 0%, ${c.accent} 50%, ${c.accentDark} 100%)`,
      marginBottom: 28,
      color: "#FFF",
      boxShadow: `0 12px 40px ${c.accent}40`,
      position: "relative" as const,
      overflow: "hidden",
    },
    loyaltyLevel: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
      marginBottom: 6,
      fontFamily: "'Inter', sans-serif",
      opacity: 0.85,
    },
    loyaltyName: {
      fontSize: 26,
      fontWeight: 500,
      fontFamily: "'Cormorant Garamond', serif",
      marginBottom: 20,
    },
    progressBar: {
      height: 5,
      backgroundColor: "rgba(255,255,255,0.25)",
      borderRadius: 3,
      marginBottom: 10,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      width: "40%",
      backgroundColor: "#FFF",
      borderRadius: 3,
    },
    progressText: {
      fontSize: 12,
      fontFamily: "'Heebo', sans-serif",
      opacity: 0.9,
    },
    ordersSection: {
      backgroundColor: c.cardSolid,
      borderRadius: 24,
      marginBottom: 18,
      overflow: "hidden",
      boxShadow: c.shadow,
      border: `1px solid ${c.border}`,
    },
    ordersHeader: {
      padding: "22px 24px",
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
      gap: 12,
    },
    orderItem: {
      padding: "18px 24px",
      borderTop: `1px solid ${c.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    orderInfo: {
      display: "flex",
      flexDirection: "column" as const,
      gap: 5,
    },
    orderId: {
      fontSize: 14,
      fontWeight: 700,
      fontFamily: "'Inter', sans-serif",
    },
    orderDate: {
      fontSize: 12,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
    },
    orderStatus: (status: string) => ({
      padding: "7px 14px",
      borderRadius: 14,
      fontSize: 11,
      fontWeight: 700,
      fontFamily: "'Heebo', sans-serif",
      backgroundColor: status === "delivered" 
        ? "rgba(34, 197, 94, 0.12)" 
        : status === "shipping" 
        ? "rgba(59, 130, 246, 0.12)" 
        : "rgba(251, 191, 36, 0.12)",
      color: status === "delivered" 
        ? "#16a34a" 
        : status === "shipping" 
        ? "#2563eb" 
        : "#d97706",
    }),
    settingsItem: {
      backgroundColor: c.cardSolid,
      borderRadius: 20,
      padding: "18px 22px",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: c.shadow,
      border: `1px solid ${c.border}`,
    },
    settingsLabel: {
      fontSize: 15,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 500,
    },
    themeToggle: {
      display: "flex",
      gap: 8,
    },
    themeBtn: (active: boolean) => ({
      padding: "10px 16px",
      borderRadius: 14,
      backgroundColor: active ? c.accent : c.bgSecondary,
      color: active ? "#FFF" : c.text,
      border: active ? "none" : `1px solid ${c.border}`,
      cursor: "pointer",
      fontSize: 13,
      fontFamily: "'Heebo', sans-serif",
      fontWeight: 500,
      transition: "all 0.3s ease",
      boxShadow: active ? `0 2px 8px ${c.accent}30` : "none",
    }),
  };

  // ─────────────────────────────────────────────────
  // RENDER SECTIONS
  // ─────────────────────────────────────────────────

  const renderCatalog = () => (
    <div>
      {/* Hero with atmospheric background */}
      <div style={styles.hero}>
        {/* Gradient mesh background */}
        <div style={styles.heroMesh} />
        {/* Noise texture overlay */}
        <div style={styles.heroNoise} />
        {/* Content */}
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{t.heroTitle}</h1>
          <p style={styles.heroSubtitle}>{t.heroSubtitle}</p>
        </div>
      </div>

      <div style={styles.section}>
        {/* Brand Filter Row - horizontal scroll pills */}
        <div style={styles.brandRow}>
          <button
            style={styles.brandPill(selectedBrand === null)}
            onClick={() => handleBrandSelect(null)}
          >
            {lang === "he" ? "הכל" : "Все"}
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              style={styles.brandPill(selectedBrand === brand)}
              onClick={() => handleBrandSelect(brand)}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Category Row - appears when brand is selected */}
        {selectedBrand && (
          <div style={{ ...styles.categoryRow, marginTop: 12 }}>
            <button
              style={styles.categoryPill(selectedCategory === null, false)}
              onClick={() => setSelectedCategory(null)}
            >
              {lang === "he" ? "כל הקטגוריות" : "Все категории"}
            </button>
            {["anti-age", "hydration", "cleansing"].map((cat) => {
              const isAvailable = availableCategories.includes(cat);
              return (
                <button
                  key={cat}
                  style={styles.categoryPill(selectedCategory === cat, !isAvailable)}
                  onClick={() => isAvailable && setSelectedCategory(cat)}
                  disabled={!isAvailable}
                >
                  {categoryLabels[cat][lang]}
                </button>
              );
            })}
          </div>
        )}

        {/* Results count */}
        <p style={{
          fontSize: 12,
          color: c.textMuted,
          fontFamily: "'Heebo', sans-serif",
          marginTop: 16,
          marginBottom: 24,
        }}>
          {lang === "he" 
            ? `${filteredProducts.length} מוצרים`
            : `${filteredProducts.length} ${filteredProducts.length === 1 ? "продукт" : filteredProducts.length < 5 ? "продукта" : "продуктов"}`
          }
        </p>

        {/* Curated Section */}
        <h2 style={styles.sectionTitle}>{t.curatedBy}</h2>

        {/* Quote Block */}
        <div style={styles.quoteBlock}>
          <div style={{
            position: "absolute",
            top: 12,
            [isRTL ? "right" : "left"]: 20,
            opacity: 0.1,
          }}>
            <Icons.Sparkle size={28} color={c.accent} />
          </div>
          <p style={styles.quote}>
            {lang === "he" 
              ? "״סרום הרטינול הזה שינה את הטיפוח שלי. אני משתמשת בו כל ערב.״"
              : "«Эта сыворотка с ретинолом изменила мо�� уход. Я использую её каждый вечер.»"
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
                style={styles.productCard(isLarge, index)}
                onClick={() => setSelectedProduct(product)}
              >
                <div style={styles.productImage(product.brand, isLarge)}>
                  {/* Subtle shine effect */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
                  }} />
                </div>
                {product.featured && (
                  <div style={styles.featuredBadge}>{t.curatedBy}</div>
                )}
                <div style={styles.productInfo}>
                  <p style={styles.productBrand}>{product.brand}</p>
                  <h3 style={styles.productName}>
                    {lang === "he" ? product.name_he : product.name_ru}
                  </h3>
                  <p style={styles.productPrice}>{"\u20AA"}{product.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bestsellers Carousel */}
        <h2 style={{ ...styles.sectionTitle, marginTop: 44 }}>{t.bestsellers}</h2>
        <div style={styles.carousel}>
          {products.filter(p => p.featured).map((product) => (
            <div
              key={product.id}
              style={styles.carouselCard}
              onClick={() => setSelectedProduct(product)}
            >
              <div style={{ ...styles.productImage(product.brand, false), height: 150 }} />
              <div style={{ padding: 14 }}>
                <p style={{ ...styles.productBrand, fontSize: 9 }}>{product.brand}</p>
                <h3 style={{ ...styles.productName, fontSize: 15 }}>
                  {lang === "he" ? product.name_he : product.name_ru}
                </h3>
                <p style={{ ...styles.productPrice, fontSize: 15 }}>{"\u20AA"}{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div>
      {/* Hero */}
      <div style={{ ...styles.hero, height: 300 }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${c.bgSecondary} 0%, ${c.accent}20 100%)`,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 80%, ${c.accent}30 0%, transparent 60%)`,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }} />
        <div style={{ ...styles.heroContent, bottom: 40 }}>
          <h1 style={{ ...styles.heroTitle, fontSize: 40 }}>{t.servicesTitle}</h1>
          <p style={styles.heroSubtitle}>{t.servicesSubtitle}</p>
        </div>
      </div>

      <div style={styles.section}>
        {services.map((service, index) => (
          <div key={service.id} style={styles.serviceCard(index)}>
            <div style={styles.serviceGradient(service.gradient)}>
              <h3 style={styles.serviceName}>
                {lang === "he" ? service.name_he : service.name_ru}
              </h3>
              <div style={styles.serviceMeta}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icons.Clock size={15} color="rgba(31, 26, 22, 0.6)" />
                  {service.duration} {t.duration}
                </span>
                <span style={{ fontWeight: 700 }}>{"\u20AA"}{service.price}</span>
              </div>
              <p style={styles.serviceDesc}>
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

  const renderBrand = () => (
    <div>
      <div style={styles.brandHero}>
        <div style={styles.avatar}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/avatar.png" 
            alt="Ольга Фрегер"
            style={styles.avatarImage}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.setAttribute('style', 'display: flex; width: 100%; height: 100%;');
            }}
          />
          <div style={{ ...styles.avatarPlaceholder, display: 'none' }}>О</div>
        </div>
        <h1 style={styles.brandName}>
          {lang === "he" ? "אולגה פרגר" : "Ольга Фрегер"}
        </h1>
        <p style={styles.brandRole}>{t.aboutRole}</p>
        <p style={styles.brandPhilosophy}>{t.aboutPhilosophy}</p>

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
        <h2 style={styles.sectionTitle}>{t.ourStory}</h2>
        
        {[
          { name: "Dermalosophy", desc: lang === "he" ? "קוסמצבטיקה אקטיבית, רטינול, חומצות" : "Активная космецевтика, ретинол, кислоты" },
          { name: "ONmacabim", desc: lang === "he" ? "אנטי-אייג׳ מקצועי" : "Профессиональный anti-age" },
          { name: "Hikari", desc: lang === "he" ? "קוסמצבטיקה טבעית" : "Натуральная космецевтика" },
        ].map((brand) => (
          <div 
            key={brand.name} 
            style={styles.brandCardItem}
            onClick={() => {
              handleBrandSelect(brand.name);
              setActiveSection("catalog");
            }}
          >
            <div style={styles.brandCardItemContent}>
              <h3 style={styles.brandCardName}>{brand.name}</h3>
              <p style={styles.brandCardDesc}>{brand.desc}</p>
            </div>
            <div style={styles.brandCardItemArrow}>
              <Icons.ChevronRight size={18} color={c.accent} />
            </div>
          </div>
        ))}

        <button style={styles.contactBtn}>
          <Icons.Send size={18} color="#FFF" />
          {t.contactOlga}
        </button>

        <div style={styles.locationInfo}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icons.MapPin size={15} color={c.textMuted} />
            {t.location}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icons.Clock size={15} color={c.textMuted} />
            {t.hours}
          </div>
        </div>

        {/* Map Links */}
        <div style={styles.mapLinksRow}>
          <a
            href="https://waze.com/ul?ll=31.6086,34.7643&navigate=yes"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapLinkBtn}
            title={t.openInWaze}
          >
            <Icons.Waze size={26} />
          </a>
          <a
            href="https://maps.google.com/?q=31.6086,34.7643"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapLinkBtn}
            title={t.openInGoogle}
          >
            <Icons.GoogleMaps size={26} />
          </a>
          <a
            href="https://maps.apple.com/?ll=31.6086,34.7643"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapLinkBtn}
            title={t.openInApple}
          >
            <Icons.AppleMaps size={26} />
          </a>
        </div>

        {/* WhatsApp Link */}
        <a
          href="https://wa.me/972501234567?text=שלום%20אולגה"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.whatsappBtn, textDecoration: "none" }}
        >
          <Icons.WhatsApp size={24} />
          {t.whatsappOlga}
        </a>
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
        {/* Decorative element */}
        <div style={{
          position: "absolute",
          top: -20,
          [isRTL ? "left" : "right"]: -20,
          width: 100,
          height: 100,
          borderRadius: 50,
          background: "rgba(255,255,255,0.1)",
        }} />
        <p style={styles.loyaltyLevel}>{t.loyaltyLevel}</p>
        <h2 style={styles.loyaltyName}>{t.silver}</h2>
        <div style={styles.progressBar}>
          <div style={styles.progressFill} />
        </div>
        <p style={styles.progressText}>{"\u20AA"}1,500 {t.toNextLevel}</p>
      </div>

      {/* Orders */}
      <div style={styles.ordersSection}>
        <div 
          style={styles.ordersHeader}
          onClick={() => setExpandedOrders(!expandedOrders)}
        >
          <span style={styles.ordersTitle}>
            <Icons.Package size={20} color={c.text} />
            {t.myOrders}
          </span>
          <div style={{ 
            transform: expandedOrders ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            <Icons.ChevronDown size={20} color={c.textMuted} />
          </div>
        </div>
        {expandedOrders && orders.map((order) => (
          <div key={order.id} style={styles.orderItem}>
            <div style={styles.orderInfo}>
              <span style={styles.orderId}>{order.id}</span>
              <span style={styles.orderDate}>{order.date} · {order.items} {lang === "he" ? "פריטים" : "товара"} · {"\u20AA"}{order.total}</span>
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
            <Icons.Heart size={20} color={c.text} />
            {t.favorites}
          </span>
        </div>
      </div>

      {/* Settings */}
      <h2 style={{ ...styles.sectionTitle, marginTop: 36 }}>{t.settings}</h2>
      
      <div style={styles.settingsItem}>
        <span style={styles.settingsLabel}>{t.language}</span>
        <div style={styles.themeToggle}>
          <button 
            style={styles.themeBtn(lang === "he")}
            onClick={() => setLang("he")}
          >
            {"\u05E2\u05D1\u05E8\u05D9\u05EA"}
          </button>
          <button 
            style={styles.themeBtn(lang === "ru")}
            onClick={() => setLang("ru")}
          >
            {"\u0420\u0443\u0441\u0441\u043A\u0438\u0439"}
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

    {/* Consents Block */}
    <div style={styles.consentsCard}>
      <h3 style={styles.consentsTitle}>{t.consents}</h3>
      
      <div 
        style={styles.consentItem}
        onClick={() => setConsents(prev => ({ ...prev, orders: !prev.orders }))}
      >
        <div style={styles.consentCheckbox(consents.orders)}>
          {consents.orders && <Icons.Check size={14} color="#FFF" />}
        </div>
        <span style={styles.consentLabel}>{t.consentOrders}</span>
      </div>
      
      <div 
        style={styles.consentItem}
        onClick={() => setConsents(prev => ({ ...prev, procedures: !prev.procedures }))}
      >
        <div style={styles.consentCheckbox(consents.procedures)}>
          {consents.procedures && <Icons.Check size={14} color="#FFF" />}
        </div>
        <span style={styles.consentLabel}>{t.consentProcedures}</span>
      </div>
      
      <div 
        style={styles.consentItem}
        onClick={() => setConsents(prev => ({ ...prev, marketing: !prev.marketing }))}
      >
        <div style={styles.consentCheckbox(consents.marketing)}>
          {consents.marketing && <Icons.Check size={14} color="#FFF" />}
        </div>
        <span style={styles.consentLabel}>{t.consentMarketing}</span>
      </div>
      
      <div 
        style={styles.consentItemLast}
        onClick={() => setConsents(prev => ({ ...prev, photos: !prev.photos }))}
      >
        <div style={styles.consentCheckbox(consents.photos)}>
          {consents.photos && <Icons.Check size={14} color="#FFF" />}
        </div>
        <span style={styles.consentLabel}>{t.consentPhotos}</span>
      </div>
    </div>

    <div style={{
      textAlign: "center",
      marginTop: 44,
      fontSize: 13,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
      }}>
        <p>{t.help} · v2.0.0</p>
      </div>
    </div>
  );

  // Product Detail Modal
  const renderProductModal = () => {
    if (!selectedProduct) return null;
    
    return (
      <div style={{
        ...styles.modal,
        animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={styles.modalHeader}>
          <button 
            style={{ 
              ...styles.iconBtn, 
              backgroundColor: "rgba(255,255,255,0.95)", 
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <Icons.Close size={20} color="#1F1A16" />
          </button>
          <button style={{ 
            ...styles.iconBtn, 
            backgroundColor: "rgba(255,255,255,0.95)", 
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          }}>
            <Icons.Heart size={20} color="#1F1A16" />
          </button>
        </div>

<div style={styles.modalImage(selectedProduct.brand)}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
          }} />
        </div>

        <div style={styles.modalContent}>
          <p style={styles.modalBrand}>{selectedProduct.brand}</p>
          <h1 style={styles.modalName}>
            {lang === "he" ? selectedProduct.name_he : selectedProduct.name_ru}
          </h1>
          
          {/* Price display */}
          <div style={styles.modalPrice}>
            <span style={styles.modalPriceMain}>{"\u20AA"}{selectedProduct.price}</span>
            {selectedProduct.oldPrice && (
              <span style={styles.modalPriceOld}>{"\u20AA"}{selectedProduct.oldPrice}</span>
            )}
          </div>

          <p style={styles.modalDesc}>
            {lang === "he" ? selectedProduct.desc_he : selectedProduct.desc_ru}
          </p>

          <h3 style={{ ...styles.sectionTitle, fontSize: 17, marginBottom: 14 }}>
            {t.ingredients}
          </h3>
          <div style={styles.ingredientPills}>
            {selectedProduct.ingredients.map((ing) => (
              <span key={ing} style={styles.ingredientPill}>{ing}</span>
            ))}
          </div>

          {selectedProduct.featured && (
            <div style={styles.recommendedBadge}>
              <Icons.Check size={18} color={c.accent} />
              <span style={{ fontSize: 14, fontFamily: "'Heebo', sans-serif", fontWeight: 500, color: c.accent }}>
                {t.recommended}
              </span>
            </div>
          )}

          <h3 style={{ ...styles.sectionTitle, fontSize: 17, marginTop: 36 }}>
            {t.completeRoutine}
          </h3>
          <div style={{ ...styles.carousel, marginBottom: 110 }}>
            {products
              .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
              .slice(0, 3)
              .map((product) => (
                <div
                  key={product.id}
                  style={{ ...styles.carouselCard, minWidth: 150 }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div style={{ ...styles.productImage(product.brand, false), height: 110 }} />
                  <div style={{ padding: 12 }}>
                    <p style={{ ...styles.productBrand, fontSize: 8 }}>{product.brand}</p>
                    <h3 style={{ ...styles.productName, fontSize: 14 }}>
                      {lang === "he" ? product.name_he : product.name_ru}
                    </h3>
                    <p style={{ ...styles.productPrice, fontSize: 14 }}>{"\u20AA"}{product.price}</p>
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
          {t.addToCart} · {"\u20AA"}{selectedProduct.price}
        </button>
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Heebo:wght@300;400;500;600&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        ::-webkit-scrollbar { display: none; }
        button:active { transform: scale(0.97); }
      `}</style>

      <div style={styles.app}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="Freger" 
              style={styles.logoImage}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.setAttribute('style', 'display: flex;');
              }}
            />
            <span style={{ ...styles.logoPlaceholder, display: 'none' }}>F</span>
          </div>
          <div style={styles.headerActions}>
            <button 
              style={styles.langToggle}
              onClick={() => setLang(lang === "he" ? "ru" : "he")}
            >
              {lang === "he" ? "RU" : "HE"}
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
          {activeSection === "catalog" && renderCatalog()}
          {activeSection === "services" && renderServices()}
          {activeSection === "brand" && renderBrand()}
          {activeSection === "profile" && renderProfile()}
        </main>

        {/* Navigation - Redesigned icons */}
        <nav style={styles.nav}>
          {[
            { id: "catalog", Icon: Icons.Catalog, label: t.navCatalog },
            { id: "services", Icon: Icons.Services, label: t.navServices },
            { id: "brand", Icon: Icons.Brand, label: t.navBrand },
            { id: "profile", Icon: Icons.Profile, label: t.navProfile },
          ].map((item) => {
            const { Icon } = item;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                style={styles.navItem(isActive)}
                onClick={() => setActiveSection(item.id as typeof activeSection)}
              >
                <Icon
                  size={20}
                  color={isActive ? "#FFF" : c.textSecondary}
                  filled={isActive}
                />
                <span style={{ 
                  fontSize: 10, 
                  fontWeight: isActive ? 600 : 500,
                  marginTop: 2,
                }}>{item.label}</span>
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
