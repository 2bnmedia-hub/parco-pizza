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
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path d="M9 1.5L16 14.5H2Z" stroke={active ? "white" : "currentColor"} strokeWidth="1.4" strokeLinejoin="round" fill={active ? "rgba(255,255,255,0.15)" : "none"} />
      <circle cx="9" cy="9.5" r="1.4" fill={active ? "white" : "currentColor"} />
      <circle cx="6.5" cy="11.5" r="1" fill={active ? "white" : "currentColor"} opacity="0.7" />
      <circle cx="11.5" cy="11.5" r="1" fill={active ? "white" : "currentColor"} opacity="0.7" />
    </svg>
  );
}

function PastaIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path d="M2 9C2 5.7 5 3 9 3S16 5.7 16 9" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.5 11.5C3.5 9.5 6 8.5 9 8.5S14.5 9.5 14.5 11.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 14C5 12.5 6.8 12 9 12S13 12.5 13 14" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BreadIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path d="M3 10C3 7 5.7 5 9 5S15 7 15 10V14H3V10Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" fill={active ? "rgba(255,255,255,0.1)" : "none"} />
      <path d="M3 10H15" stroke={c} strokeWidth="1.4" />
      <path d="M6 7.5 C6 6.5 7.5 6 9 6 S12 6.5 12 7.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SaladIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path d="M9 3 C9 3 6 5 5 8 S5 14 9 14 S13 11 12 8 S9 3 9 3Z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" fill={active ? "rgba(255,255,255,0.1)" : "none"} />
      <path d="M9 5 C8 7 8 9 9 11" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3 13H15" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function DessertIcon({ active }: { active: boolean }) {
  const c = active ? "white" : "currentColor";
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path d="M4 10H14L13 15H5Z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" fill={active ? "rgba(255,255,255,0.1)" : "none"} />
      <path d="M3 10 C3 7 5.5 5.5 9 5.5 S15 7 15 10" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9 5.5 V3" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="9" cy="2.5" r="1" fill={c} />
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
      className="py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FFF5E8 0%, #FFFDF9 50%, #FFF5E8 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-14 text-center">
          <ScrollReveal>
            <p className="mb-3 tracking-[0.5em] text-pp-red uppercase font-bebas text-base">
              Our Menu — התפריט שלנו
            </p>
          </ScrollReveal>
          <ScrollReveal className="reveal-d2">
            <h2
              className="relative inline-block text-4xl font-black text-pp-dark md:text-5xl lg:text-6xl"
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
          <div className="mb-10 flex flex-wrap justify-center gap-3.5">
            {CATEGORIES.map((cat) => {
              const isActive = cat.key === activeKey;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveKey(cat.key)}
                  className={`flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 ${
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
        </ScrollReveal>

        {/* Menu items grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              <div className="mt-4 flex items-baseline gap-1.5">
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
