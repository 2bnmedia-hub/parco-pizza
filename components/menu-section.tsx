"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  badge?: string;
}

interface Category {
  key: string;
  label: string;
  Icon: React.FC<{ active: boolean }>;
  items: MenuItem[];
}

function PizzaIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  const f = active ? "rgba(255,255,255,0.12)" : "none";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      {/* Outer pizza circle */}
      <circle cx="10" cy="10" r="8" stroke={c} strokeWidth="1.4" fill={f} />
      {/* 3 slice cuts */}
      <line x1="10" y1="10" x2="10" y2="2" stroke={c} strokeWidth="1.1" strokeOpacity="0.65" />
      <line x1="10" y1="10" x2="16.9" y2="14" stroke={c} strokeWidth="1.1" strokeOpacity="0.65" />
      <line x1="10" y1="10" x2="3.1" y2="14" stroke={c} strokeWidth="1.1" strokeOpacity="0.65" />
      {/* Thick crust arc at bottom */}
      <path d="M3.1 14 Q10 18.5 16.9 14" stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Toppings */}
      <circle cx="10" cy="6.5" r="1.5" fill={c} />
      <circle cx="6.8" cy="12.5" r="1.1" fill={c} />
      <circle cx="13.2" cy="12.5" r="1.1" fill={c} />
    </svg>
  );
}

function PastaIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  const f = active ? "rgba(255,255,255,0.1)" : "none";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      {/* Bowl */}
      <path d="M3 9.5 Q3 16 10 16 Q17 16 17 9.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill={f} />
      <line x1="3" y1="9.5" x2="17" y2="9.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      {/* Spaghetti swirls */}
      <path d="M5.5 9.5 C5 8 7 7 8 8.5 C9 10 11.5 8.5 12 7" stroke={c} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M7 9.5 C6.5 8.5 8 7.5 9 8.5 C10 9.5 12 8.5 12.5 7.5" stroke={c} strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.7" />
      {/* Fork (right side, leaning) */}
      <line x1="15" y1="3.5" x2="14.2" y2="9.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="13.5" y1="3.5" x2="13.5" y2="6" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="15" y1="3.5" x2="15" y2="6" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="16.5" y1="3.5" x2="16.5" y2="6" stroke={c} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M13.5 6 Q15 6.5 16.5 6" stroke={c} strokeWidth="1" />
    </svg>
  );
}

function BreadIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  const f = active ? "rgba(255,255,255,0.1)" : "none";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      {/* Loaf body */}
      <path d="M3 10.5 Q3 5.5 10 5.5 Q17 5.5 17 10.5 L17 15.5 Q17 16.5 16 16.5 L4 16.5 Q3 16.5 3 15.5 Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" fill={f} />
      {/* Score line across domed top */}
      <path d="M6 9.5 Q10 7.5 14 9.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Sesame/texture dots */}
      <circle cx="7.5" cy="13" r="0.8" fill={c} fillOpacity="0.65" />
      <circle cx="10" cy="13" r="0.8" fill={c} fillOpacity="0.65" />
      <circle cx="12.5" cy="13" r="0.8" fill={c} fillOpacity="0.65" />
      {/* Steam puffs */}
      <path d="M7.5 5 Q8 3.5 7.5 2.5" stroke={c} strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M12.5 5 Q13 3.5 12.5 2.5" stroke={c} strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

function SaladIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  const f = active ? "rgba(255,255,255,0.1)" : "none";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      {/* Bowl */}
      <path d="M3 10 Q3 16.5 10 16.5 Q17 16.5 17 10" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill={f} />
      <line x1="3" y1="10" x2="17" y2="10" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M6.5 10 C6 8 7.5 6 8.5 8 C9 6.5 10.5 7 10 9.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Right leaf */}
      <path d="M11 10 C10.5 8 12 6.5 12.5 8.5 C13.5 7 15 8 14 10" stroke={c} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Cherry tomato center */}
      <circle cx="10" cy="8.5" r="1.4" fill={c} fillOpacity={active ? 1 : 0.85} />
      {/* Tiny leaf on tomato */}
      <path d="M10 7.1 C10 6.5 11 6 10.5 7.1" stroke={c} strokeWidth="0.9" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function DessertIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  const f = active ? "rgba(255,255,255,0.12)" : "none";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      {/* Waffle cup */}
      <path d="M6.5 12 L7.5 17 L12.5 17 L13.5 12 Z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" fill={f} />
      <line x1="6.5" y1="12" x2="13.5" y2="12" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      {/* Waffle cross-hatch */}
      <line x1="8" y1="12" x2="8.5" y2="17" stroke={c} strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="10" y1="12" x2="10" y2="17" stroke={c} strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="12" y1="12" x2="11.5" y2="17" stroke={c} strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="6.8" y1="14" x2="13.2" y2="14" stroke={c} strokeWidth="0.8" strokeOpacity="0.4" />
      {/* First gelato scoop */}
      <path d="M6.5 12 C6.5 8.5 8 7 10 7 C12 7 13.5 8.5 13.5 12" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill={active ? "rgba(255,255,255,0.15)" : "none"} />
      {/* Scoop detail */}
      <path d="M8 10 Q10 8.5 12 10" stroke={c} strokeWidth="1" strokeLinecap="round" fill="none" strokeOpacity="0.65" />
      {/* Cherry on top */}
      <circle cx="10" cy="5.5" r="1.3" fill={c} />
      <path d="M10 4.2 C10 3 11.5 2.5 11.5 3.5" stroke={c} strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const CATEGORIES: Category[] = [
  {
    key: "pizza",
    label: "פיצות",
    Icon: PizzaIcon,
    items: [
      { name: "מרגריטה",      price: "₪50", desc: "רוטב עגבניות, גבינות מיקס איטלקי" },
      { name: "פיצת שף",     price: "₪65", desc: "קונפי שרי תמר, פסטו, פרמז'ן",       badge: "מומלץ" },
      { name: "פיצת ורונה",  price: "₪65", desc: "שמנת, תפוחי אדמה, עירית, פרמז'ן" },
      { name: "פיצה מילאנו", price: "₪65", desc: "עגבניות מיובשות, טונה, בצל מקורמל" },
      { name: "פיצה יוונית", price: "₪65", desc: "בולגרית, בצל סגול, זיתי קלמטה" },
      { name: "פיצה לבנה",   price: "₪60", desc: "בסיס שמנת, גבינת מיקס" },
      { name: "פיצה רוזה",   price: "₪60", desc: "רוזה, מיקס גבינות, פרמז'ן" },
      { name: "פיצה פסטו",   price: "₪60", desc: "פסטו-שמנת, נגיעות פסטו, פרמז'ן" },
      { name: "פיצה חריפה",  price: "₪60", desc: "פלפל חריף, שיפקה, צ'ילי גרוס",      badge: "חריף" },
    ],
  },
  {
    key: "pasta",
    label: "פסטות",
    Icon: PastaIcon,
    items: [
      { name: "ספגטי שמנת",          price: "₪58", desc: "ספגטי ברוטב שמנת ביתי" },
      { name: "ספגטי שמנת פטריות",   price: "₪62", desc: "פטריות, שמנת, פרמז'ן" },
      { name: "פנה עגבניות",         price: "₪55", desc: "רוטב עגבניות ביתי, פסטו" },
      { name: "פנה פסטו שמנת",       price: "₪60", desc: "פסטו ביתי, שמנת, פרמז'ן" },
      { name: "רביולי גבינה",        price: "₪65", desc: "ממולא גבינות, רוטב לבחירה",  badge: "בית" },
      { name: "רביולי בטטה",         price: "₪65", desc: "ממולא בטטה וריקוטה",         badge: "בית" },
      { name: "פסטה רוזה",           price: "₪60", desc: "רוזה, ירקות, פרמז'ן" },
    ],
  },
  {
    key: "bread",
    label: "לחמים",
    Icon: BreadIcon,
    items: [
      { name: "לחם שום ביתי",  price: "₪22", desc: "לחם לבן, חמאת שום, פטרוזיליה" },
      { name: "לחם מחמצת",     price: "₪18", desc: "מחמצת ביתית, שמן זית" },
      { name: "לחם שום גבינה", price: "₪28", desc: "שום, גבינה מותכת, עשבי תיבול" },
      { name: "פוקצ'ה",        price: "₪25", desc: "שמן זית, מלח גס, רוזמרין" },
    ],
  },
  {
    key: "salads",
    label: "סלטים",
    Icon: SaladIcon,
    items: [
      { name: "סלט יווני",  price: "₪55", desc: "בולגרית, זיתים, עגבניות, מלפפון" },
      { name: "סלט טונה",  price: "₪55", desc: "טונה, ביצה, קייסר, ירקות טריים" },
      { name: "סלט חלומי", price: "₪60", desc: "גבינת חלומי, ירקות גריל, בלסמי", badge: "מומלץ" },
      { name: "סלט טוסט",  price: "₪60", desc: "ירקות, קרוטונים, גבינה, שף-דרסינג" },
    ],
  },
  {
    key: "desserts",
    label: "קינוחים",
    Icon: DessertIcon,
    items: [
      { name: "פיצת שוקולד",  price: "₪32/45", desc: "שוקולד חם, גרנולה, גלידה",   badge: "אהוב" },
      { name: "פיצת דובאי",   price: "₪32/45", desc: "פיסטוק, קדאיף, שוקולד",      badge: "טרנד" },
      { name: "זיוות שוקולד", price: "₪32",    desc: "שוקולד לבן ומריר, פיסטוק" },
      { name: "פיצת תותים",   price: "₪32/45", desc: "גבינה, תותים טריים, שמנת" },
    ],
  },
];

/* Category SVG icons for card backgrounds */
function CardAccent({ categoryKey }: { categoryKey: string }) {
  if (categoryKey === "pizza") {
    return (
      <svg className="absolute -left-4 -top-4 w-20 h-20 text-pp-red/5 pointer-events-none" viewBox="0 0 80 80" fill="currentColor">
        <path d="M40 5L70 60H10Z" />
      </svg>
    );
  }
  return (
    <svg className="absolute -left-4 -top-4 w-16 h-16 text-pp-red/5 pointer-events-none" viewBox="0 0 60 60" fill="currentColor">
      <circle cx="30" cy="30" r="28" />
    </svg>
  );
}

export function MenuSection() {
  const [activeKey, setActiveKey] = useState("pizza");
  const activeCategory = CATEGORIES.find((c) => c.key === activeKey) ?? CATEGORIES[0]!;

  return (
    <section
      id="menu"
      className="py-14 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FFF3D5 0%, #FFF8E7 50%, #FFF3D5 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* Header */}
        <div className="mb-10 md:mb-14 text-center">
          <ScrollReveal>
            <p className="mb-3 tracking-[0.5em] text-pp-red uppercase font-bebas text-base">
              Our Menu — התפריט שלנו
            </p>
          </ScrollReveal>
          <ScrollReveal className="reveal-d2">
            <h2
              className="relative inline-block text-3xl font-black text-pp-dark md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
            >
              מה יוצא היום
            </h2>
          </ScrollReveal>
          <ScrollReveal className="reveal-d3">
            <p className="mx-auto mt-5 max-w-md text-pp-muted text-[15px]">
              מיטב הטעמים האיטלקיים, מוכנים מדי יום עם חומרי גלם טריים
            </p>
          </ScrollReveal>
        </div>

        {/* Category tabs */}
        <ScrollReveal className="reveal-d4">
          <div className="mb-8 md:mb-10 -mx-4 md:mx-0">
            <div className="flex overflow-x-auto gap-2.5 px-4 pb-2 md:flex-wrap md:justify-center md:gap-3.5 md:px-0 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const isActive = cat.key === activeKey;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveKey(cat.key)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 md:px-6 md:py-3 text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-pp-red text-white shadow-lg shadow-pp-red/30 scale-105"
                      : "bg-white text-pp-muted border border-pp-border hover:border-pp-red hover:text-pp-red hover:shadow-md"
                  }`}
                  style={{ fontFamily: "var(--font-rubik)" }}
                >
                  <cat.Icon active={isActive} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
            </div>
          </div>
        </ScrollReveal>

        {/* Menu items grid */}
        <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activeCategory.items.map((item, i) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-2xl border border-pp-border/60 bg-white p-5 shadow-sm card-premium"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <CardAccent categoryKey={activeKey} />

              {/* Badge */}
              {item.badge && (
                <span className="absolute top-3 left-3 rounded-full bg-pp-red px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                  {item.badge}
                </span>
              )}

              {/* Category icon */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pp-surface text-pp-red transition-transform duration-300 group-hover:scale-110 group-hover:bg-pp-red group-hover:text-white">
                <activeCategory.Icon active={false} />
              </div>

              {/* Content */}
              <h3
                className="font-black text-pp-dark text-base leading-tight"
                style={{ fontFamily: "var(--font-rubik)", fontWeight: 800 }}
              >
                {item.name}
              </h3>
              <p className="mt-1.5 text-xs text-pp-muted leading-relaxed">{item.desc}</p>

              {/* Price */}
              <div className="mt-4 flex items-baseline justify-end gap-1.5">
                <span
                  className="text-xl text-pp-red"
                  style={{ fontFamily: "var(--font-rubik)", fontWeight: 500 }}
                >
                  {item.price}
                </span>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-pp-red/0 to-transparent transition-all duration-300 group-hover:via-pp-red/60" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 rounded-full border-2 border-pp-dark text-pp-dark px-10 py-4 text-sm font-black tracking-widest uppercase transition-all hover:bg-pp-dark hover:text-white"
            >
              לכל התפריט
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
