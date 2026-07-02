"use client";

import { useState, useCallback } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

/* ─── Data ──────────────────────────────────────────────── */
const SIZES = {
  personal: { label: "פרסונל",   cm: '20 ס"מ', price: 45,  desc: "מנה אישית",     icon: 0.55 },
  medium:   { label: "בינוני",   cm: '28 ס"מ', price: 69,  desc: "לזוג",           icon: 0.72 },
  large:    { label: "גדול",     cm: '35 ס"מ', price: 89,  desc: "למשפחה קטנה",   icon: 0.87 },
  family:   { label: "משפחתי",  cm: '40 ס"מ', price: 109, desc: "לכל המשפחה",    icon: 1.0  },
} as const;
type SizeKey = keyof typeof SIZES;

const DOUGHS = {
  classic: { label: "קלאסית",       extra: 0,  desc: "עיסה מסורתית ממולאת בטעם" },
  thin:    { label: "דקה ופריכה",   extra: 0,  desc: "קריספית כמו בנאפולי" },
  wheat:   { label: "קמח מלא",      extra: 5,  desc: "בריאה ועשירה בסיבים תזונתיים" },
  stuffed: { label: "שפה ממולאת",   extra: 12, desc: "שפה עם מוצרלה נמסה בפנים" },
} as const;
type DoughKey = keyof typeof DOUGHS;

const SAUCES = {
  tomato: { label: "עגבניות",       extra: 0, gradId: "s-tomato", desc: "רוטב עגבניות סן מרצנו ביתי",  swatch: "#C01818" },
  cream:  { label: "קרם פרש",       extra: 0, gradId: "s-cream",  desc: "רוטב שמנת עדין וקטיפתי",      swatch: "#F0D8B8" },
  pesto:  { label: "פסטו בזיליקום", extra: 5, gradId: "s-pesto",  desc: "פסטו טרי עם אגוזי לוז",       swatch: "#2D6A4F" },
  bbq:    { label: "BBQ מעושן",     extra: 5, gradId: "s-bbq",    desc: "רוטב ברביקיו מעושן מיוחד",    swatch: "#5C2D0E" },
} as const;
type SauceKey = keyof typeof SAUCES;

const CHEESES = {
  mozzarella: { label: "מוצרלה",      extra: 0,  gradId: "c-mozz",   desc: "מוצרלה פיור לאטה טרייה",        swatch: "#FFF8D0" },
  triple:     { label: "תלת גבינות", extra: 8,  gradId: "c-triple", desc: "מוצרלה + פרמזן + גאודה",        swatch: "#F5DC60" },
  vegan:      { label: "טבעוני",      extra: 10, gradId: "c-vegan",  desc: "גבינה טבעונית 100% מקרו",       swatch: "#E8D090" },
} as const;
type CheeseKey = keyof typeof CHEESES;

interface ToppingDef { label: string; price: number; color: string; emoji: string; vegan?: boolean; }
const TOPPINGS: Record<string, ToppingDef> = {
  mushroom:    { label: "פטריות",           price: 5,  color: "#8B5A2B", emoji: "🍄" },
  peppers:     { label: "פלפלים",           price: 5,  color: "#E63946", emoji: "🫑" },
  onion:       { label: "בצל",              price: 5,  color: "#C0A0B8", emoji: "🧅" },
  olives:      { label: "זיתים",            price: 5,  color: "#1C2E10", emoji: "🫒", vegan: true },
  corn:        { label: "תירס",             price: 5,  color: "#E8B820", emoji: "🌽", vegan: true },
  artichoke:   { label: "ארטישוק",          price: 7,  color: "#5A8845", emoji: "🌿", vegan: true },
  spinach:     { label: "תרד",              price: 5,  color: "#2D6A4F", emoji: "🥬", vegan: true },
  sun_tomato:  { label: "עגבניות מיובשות", price: 7,  color: "#922B00", emoji: "🍅", vegan: true },
  chicken:     { label: "עוף",              price: 9,  color: "#C4844A", emoji: "🍗" },
  beef:        { label: "בשר טחון",         price: 11, color: "#8B2020", emoji: "🥩" },
  tuna:        { label: "טונה",             price: 9,  color: "#4A7FB5", emoji: "🐟" },
  salami:      { label: "סלמי",             price: 9,  color: "#8B1A2A", emoji: "🥓" },
  pepperoni:   { label: "פפרוני",           price: 10, color: "#C41E2A", emoji: "🍕" },
  truffle:     { label: "שמן טרופל",        price: 15, color: "#3A2820", emoji: "🍄", vegan: true },
  caramelized: { label: "בצל מקורמל",      price: 8,  color: "#C4820A", emoji: "🧅", vegan: true },
  garlic:      { label: "שום קלוי",         price: 6,  color: "#C8B880", emoji: "🧄", vegan: true },
};

const TOPPING_CATEGORIES = {
  veggies:  { label: "ירקות",   keys: ["mushroom","peppers","onion","olives","corn","artichoke","spinach","sun_tomato"] },
  proteins: { label: "חלבונים", keys: ["chicken","beef","tuna","salami","pepperoni"] },
  premium:  { label: "פרמיום",  keys: ["truffle","caramelized","garlic"] },
};

const UPSELLS = {
  drinks:   [
    { id:"coke",     label:"קולה",           price:12, emoji:"🥤" },
    { id:"sprite",   label:"ספרייט",         price:12, emoji:"🥤" },
    { id:"water",    label:"מים מינרלים",    price:8,  emoji:"💧" },
    { id:"oj",       label:"מיץ תפוזים טרי", price:18, emoji:"🍊" },
  ],
  sides: [
    { id:"garlic",     label:"לחם שום",  price:18, emoji:"🍞" },
    { id:"salad",      label:"סלט ירוק", price:29, emoji:"🥗" },
    { id:"bruschetta", label:"ברוסקטה",  price:22, emoji:"🍅" },
  ],
  desserts: [
    { id:"nutella",    label:"קלצונה נוטלה", price:32, emoji:"🍫" },
    { id:"tiramisu",   label:"טירמיסו",      price:28, emoji:"☕" },
    { id:"cheesecake", label:"עוגת גבינה",   price:26, emoji:"🍰" },
  ],
};

/* ─── Photo Maps ─────────────────────────────────────────── */
const PIZZA_PHOTOS: Record<string, string> = {
  tomato: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=500&fit=crop&q=85",
  cream:  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=500&fit=crop&q=85",
  pesto:  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop&q=85",
  bbq:    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&h=500&fit=crop&q=85",
};

const TOPPING_PHOTOS: Record<string, string> = {
  mushroom:    "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=200&h=200&fit=crop&q=80",
  peppers:     "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&fit=crop&q=80",
  onion:       "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop&q=80",
  olives:      "https://images.unsplash.com/photo-1550583724-b2fd6c65b3fa?w=200&h=200&fit=crop&q=80",
  corn:        "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=200&h=200&fit=crop&q=80",
  artichoke:   "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=200&h=200&fit=crop&q=80",
  spinach:     "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop&q=80",
  sun_tomato:  "https://images.unsplash.com/photo-1592924357228-91a4daadcfad?w=200&h=200&fit=crop&q=80",
  chicken:     "https://images.unsplash.com/photo-1555041469-149851eb6889?w=200&h=200&fit=crop&q=80",
  beef:        "https://images.unsplash.com/photo-1529694157872-4f96b461e4e6?w=200&h=200&fit=crop&q=80",
  tuna:        "https://images.unsplash.com/photo-1519708227418-a2f55f75e1fd?w=200&h=200&fit=crop&q=80",
  salami:      "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=200&h=200&fit=crop&q=80",
  pepperoni:   "https://images.unsplash.com/photo-1574068468668-a05a1abb3d59?w=200&h=200&fit=crop&q=80",
  truffle:     "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop&q=80",
  caramelized: "https://images.unsplash.com/photo-1587659335235-5f6a8a79dd34?w=200&h=200&fit=crop&q=80",
  garlic:      "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=200&h=200&fit=crop&q=80",
};

const SAUCE_PHOTOS: Record<string, string> = {
  tomato: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=80&h=80&fit=crop&q=80",
  cream:  "https://images.unsplash.com/photo-1547592180-85f173990554?w=80&h=80&fit=crop&q=80",
  pesto:  "https://images.unsplash.com/photo-1694849506823-23a00e1e7553?w=80&h=80&fit=crop&q=80",
  bbq:    "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=80&h=80&fit=crop&q=80",
};

const CHEESE_PHOTOS: Record<string, string> = {
  mozzarella: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=160&h=160&fit=crop&q=80",
  triple:     "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=160&h=160&fit=crop&q=80",
  vegan:      "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=160&h=160&fit=crop&q=80",
};

// Single pizza photo used at 4 different display sizes
const SIZE_PIZZA_PHOTO = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop&q=80";

/* ─── Topping slots on the pizza (r≤72 from center 100,100) ── */
const TOPPING_SLOTS = [
  {x:100,y:100},
  {x:100,y:78},{x:118,y:111},{x:82,y:111},
  {x:100,y:60},{x:133,y:79},{x:138,y:118},{x:119,y:140},{x:81,y:140},{x:62,y:118},{x:67,y:79},
  {x:100,y:44},{x:132,y:57},{x:154,y:85},{x:155,y:116},{x:134,y:144},
  {x:100,y:158},{x:66,y:144},{x:46,y:116},{x:47,y:85},
];

/* ─── Topping marks using real food photos ───────────────── */
function ToppingMark({ type, x, y, idx }: { type: string; x: number; y: number; idx: number }) {
  const clipId = `tc-${idx}`;
  const r = 9;
  const src = TOPPING_PHOTOS[type];
  const fallbackColor = TOPPINGS[type]?.color ?? "#888";
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <circle cx={x} cy={y} r={r}/>
        </clipPath>
      </defs>
      <circle cx={x} cy={y} r={r + 1.5} fill="rgba(255,255,255,0.55)"/>
      {src ? (
        <image
          href={src}
          x={x - r} y={y - r}
          width={r * 2} height={r * 2}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid slice"
        />
      ) : (
        <circle cx={x} cy={y} r={r} fill={fallbackColor} opacity="0.85"/>
      )}
      <circle cx={x} cy={y} r={r} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
    </g>
  );
}

/* ─── Photo-based Pizza Canvas ──────────────────────────── */
function PizzaCanvas({ sauce, toppings }: {
  sauce: SauceKey; toppings: string[];
}) {
  const slotPairs: {type:string;x:number;y:number;idx:number}[] = [];
  if (toppings.length > 0) {
    toppings.forEach((top, ti) => {
      const count = Math.max(3, Math.floor(TOPPING_SLOTS.length / toppings.length));
      for (let i = 0; i < count; i++) {
        const si = (ti * 7 + i * 3) % TOPPING_SLOTS.length;
        const slot = TOPPING_SLOTS[si]!;
        if (!slotPairs.some(p => p.x === slot.x && p.y === slot.y)) {
          slotPairs.push({type:top, x:slot.x, y:slot.y, idx:ti*10+i});
        }
      }
    });
  }

  return (
    <div
      className="relative w-full max-w-[380px] mx-auto"
      aria-label="תצוגת פיצה בהתאמה אישית"
    >
      {/* Real pizza photo — changes with sauce selection */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PIZZA_PHOTOS[sauce] ?? PIZZA_PHOTOS.tomato}
        alt="פיצה"
        className="w-full rounded-full object-cover aspect-square"
        style={{
          boxShadow: "0 20px 60px rgba(92,45,14,0.38)",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Topping images overlaid as circular photos */}
      {toppings.length > 0 && (
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {slotPairs.map((t, i) => (
            <ToppingMark key={i} type={t.type} x={t.x} y={t.y} idx={t.idx}/>
          ))}
        </svg>
      )}
    </div>
  );
}

/* ─── Upsell Modal ───────────────────────────────────────── */
function UpsellModal({ total, onClose }: { total: number; onClose: () => void }) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setSelected(p => ({...p, [id]: !p[id]}));
  const extra = Object.entries(selected).filter(([,v])=>v).reduce((s,[id])=>{
    const all = [...UPSELLS.drinks,...UPSELLS.sides,...UPSELLS.desserts];
    return s + (all.find(x=>x.id===id)?.price ?? 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{background:"rgba(26,8,6,0.78)"}}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{background:"#FFF9F5"}}>
        <div className="px-6 py-5 text-center" style={{background:"linear-gradient(135deg,#2D6A4F,#1a4a35)"}}>
          <div className="text-3xl mb-1">🍕</div>
          <h3 className="text-xl font-black text-white" style={{fontFamily:"var(--font-rubik)"}}>
            הפיצה שלך נוספה!
          </h3>
          <p className="text-white/70 text-sm mt-1">רוצה להשלים למנה שלמה?</p>
        </div>
        <div className="px-6 py-5 space-y-5 max-h-[55vh] overflow-y-auto">
          {(["drinks","sides","desserts"] as const).map(cat => (
            <div key={cat}>
              <p className="text-xs font-black tracking-widest text-pp-muted uppercase mb-3 font-bebas">
                {cat==="drinks"?"שתיות":cat==="sides"?"תוספות":"קינוחים"}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {UPSELLS[cat].map(item => (
                  <button key={item.id} onClick={()=>toggle(item.id)}
                    className="flex items-center gap-3 rounded-2xl border-2 p-3 text-right transition-all"
                    style={{
                      borderColor: selected[item.id] ? "#E63946" : "#F0D8C8",
                      background:  selected[item.id] ? "rgba(230,57,70,0.06)" : "white",
                    }}>
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-pp-dark truncate">{item.label}</p>
                      <p className="text-pp-red font-black text-sm">+₪{item.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-pp-border space-y-3">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="text-pp-muted">סה&quot;כ</span>
            <span className="text-pp-dark text-lg">₪{total + extra}</span>
          </div>
          <button onClick={onClose} className="btn-primary w-full py-3.5 text-sm tracking-widest">
            השלם הזמנה
          </button>
          <button onClick={onClose} className="w-full text-xs text-pp-muted hover:text-pp-dark transition-colors py-1">
            המשך ללא תוספות
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function BuildPage() {
  const [size,     setSize]     = useState<SizeKey>("medium");
  const [dough,    setDough]    = useState<DoughKey>("classic");
  const [sauce,    setSauce]    = useState<SauceKey>("tomato");
  const [cheese,   setCheese]   = useState<CheeseKey>("mozzarella");
  const [toppings, setToppings] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<keyof typeof TOPPING_CATEGORIES>("veggies");
  const [pizzaName, setPizzaName] = useState("");
  const [showUpsell, setShowUpsell] = useState(false);
  const [added, setAdded] = useState(false);

  const toggleTopping = useCallback((key: string) => {
    setToppings(prev => prev.includes(key) ? prev.filter(t=>t!==key) : [...prev, key]);
  }, []);

  const totalPrice =
    SIZES[size].price +
    DOUGHS[dough].extra +
    SAUCES[sauce].extra +
    CHEESES[cheese].extra +
    toppings.reduce((s,t) => s + (TOPPINGS[t]?.price ?? 0), 0);

  return (
    <div className="min-h-screen" style={{background:"#FFF9F5"}}>
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-8 text-center px-6">
        <p className="text-pp-muted tracking-[0.5em] uppercase font-bebas text-sm mb-3">Pizza Builder</p>
        <h1 className="font-black text-5xl md:text-6xl text-pp-dark leading-none" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
          בנה את הפיצה שלך
        </h1>
        <p className="mt-3 text-pp-muted max-w-md mx-auto">
          בחר גודל, עיסה, רוטב וטופינגס — הפיצה מתעדכנת בזמן אמת
        </p>
      </section>

      {/* Builder layout */}
      <section className="max-w-7xl mx-auto px-4 pb-24 grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">

        {/* ── Left: Sticky pizza visual ── */}
        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="rounded-3xl py-8 px-6 flex flex-col items-center gap-5 relative"
            style={{background:"linear-gradient(145deg,#F8EDE0,#F0DCC8)"}}>

            {/* Price badge */}
            <div className="absolute top-4 left-4 rounded-2xl px-4 py-2.5 text-center shadow-lg"
              style={{background:"#1A0806"}}>
              <p className="text-[10px] text-white/50 font-bebas tracking-widest">סה&quot;כ</p>
              <p className="text-2xl font-black text-white font-bebas leading-none">₪{totalPrice}</p>
            </div>

            {/* Real pizza photo with topping overlay */}
            <PizzaCanvas sauce={sauce} toppings={toppings}/>

            {/* Name input */}
            <div className="w-full max-w-xs">
              <input type="text" value={pizzaName} onChange={e=>setPizzaName(e.target.value)}
                placeholder="תן שם לפיצה שלך... (אופציונלי)"
                className="w-full rounded-xl border-2 border-pp-border bg-white px-4 py-3 text-sm text-center text-pp-dark placeholder:text-pp-muted/60 outline-none focus:border-pp-red transition-colors"/>
            </div>

            {/* Selected toppings chips */}
            {toppings.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {toppings.map(t => (
                  <button key={t} onClick={()=>toggleTopping(t)}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white transition-all hover:opacity-80"
                    style={{background:TOPPINGS[t]?.color??"#888"}}>
                    <span>{TOPPINGS[t]?.emoji}</span>
                    {TOPPINGS[t]?.label}
                    <span className="text-white/60 text-[10px]">×</span>
                  </button>
                ))}
              </div>
            )}

            {/* CTA */}
            <button onClick={()=>{setShowUpsell(true);setAdded(true);}}
              className="btn-primary w-full py-4 text-sm tracking-widest">
              {added ? "עדכן הזמנה" : "הוסף לסל"} — ₪{totalPrice}
            </button>
          </div>
        </div>

        {/* ── Right: Configuration panels ── */}
        <div className="space-y-6">

          {/* Size */}
          <div className="rounded-3xl p-6 bg-white border border-pp-border">
            <h2 className="font-black text-lg text-pp-dark mb-4" style={{fontFamily:"var(--font-rubik)"}}>גודל פיצה</h2>
            <div className="grid grid-cols-4 gap-3">
              {(Object.entries(SIZES) as [SizeKey, typeof SIZES[SizeKey]][]).map(([key, s]) => (
                <button key={key} onClick={()=>setSize(key)}
                  className="flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all"
                  style={{
                    borderColor: size===key ? "#E63946" : "#F0D8C8",
                    background:  size===key ? "rgba(230,57,70,0.05)" : "white",
                  }}>
                  <div className="flex items-center justify-center" style={{width:50,height:50}}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={SIZE_PIZZA_PHOTO}
                      alt={s.label}
                      className="rounded-full object-cover shadow-md transition-all"
                      style={{
                        width: Math.round(50 * s.icon),
                        height: Math.round(50 * s.icon),
                        outline: size===key ? "2.5px solid #E63946" : "2px solid transparent",
                        outlineOffset: "2px",
                      }}
                    />
                  </div>
                  <span className="font-black text-xs text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{s.label}</span>
                  <span className="text-[10px] text-pp-muted">{s.cm}</span>
                  <span className="font-black text-pp-red text-sm">₪{s.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dough */}
          <div className="rounded-3xl p-6 bg-white border border-pp-border">
            <h2 className="font-black text-lg text-pp-dark mb-4" style={{fontFamily:"var(--font-rubik)"}}>סוג בצק</h2>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(DOUGHS) as [DoughKey, typeof DOUGHS[DoughKey]][]).map(([key, d]) => (
                <button key={key} onClick={()=>setDough(key)}
                  className="rounded-2xl border-2 p-4 text-right transition-all"
                  style={{
                    borderColor: dough===key ? "#E63946" : "#F0D8C8",
                    background:  dough===key ? "rgba(230,57,70,0.05)" : "white",
                  }}>
                  <p className="font-black text-sm text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{d.label}</p>
                  <p className="text-xs text-pp-muted mt-0.5">{d.desc}</p>
                  {d.extra > 0 && <p className="text-pp-red font-bold text-xs mt-1">+₪{d.extra}</p>}
                </button>
              ))}
            </div>
          </div>

          {/* Sauce */}
          <div className="rounded-3xl p-6 bg-white border border-pp-border">
            <h2 className="font-black text-lg text-pp-dark mb-4" style={{fontFamily:"var(--font-rubik)"}}>רוטב</h2>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(SAUCES) as [SauceKey, typeof SAUCES[SauceKey]][]).map(([key, s]) => (
                <button key={key} onClick={()=>setSauce(key)}
                  className="flex items-center gap-3 rounded-2xl border-2 p-4 text-right transition-all"
                  style={{
                    borderColor: sauce===key ? "#E63946" : "#F0D8C8",
                    background:  sauce===key ? "rgba(230,57,70,0.05)" : "white",
                  }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SAUCE_PHOTOS[key]}
                    alt={s.label}
                    className="h-9 w-9 rounded-full shrink-0 shadow-md object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.background = s.swatch; (e.currentTarget as HTMLImageElement).src = ""; }}
                  />
                  <div>
                    <p className="font-black text-sm text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{s.label}</p>
                    <p className="text-[10px] text-pp-muted">{s.desc}</p>
                    {s.extra > 0 && <p className="text-pp-red font-bold text-xs">+₪{s.extra}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cheese */}
          <div className="rounded-3xl p-6 bg-white border border-pp-border">
            <h2 className="font-black text-lg text-pp-dark mb-4" style={{fontFamily:"var(--font-rubik)"}}>גבינה</h2>
            <div className="grid grid-cols-3 gap-3">
              {(Object.entries(CHEESES) as [CheeseKey, typeof CHEESES[CheeseKey]][]).map(([key, c]) => (
                <button key={key} onClick={()=>setCheese(key)}
                  className="flex flex-col items-center gap-2.5 rounded-2xl border-2 p-4 transition-all"
                  style={{
                    borderColor: cheese===key ? "#E63946" : "#F0D8C8",
                    background:  cheese===key ? "rgba(230,57,70,0.05)" : "white",
                  }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CHEESE_PHOTOS[key]}
                    alt={c.label}
                    className="h-16 w-16 rounded-xl shadow-md object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.background = c.swatch; (e.currentTarget as HTMLImageElement).src = ""; }}
                  />
                  <p className="font-black text-xs text-pp-dark text-center" style={{fontFamily:"var(--font-rubik)"}}>{c.label}</p>
                  {c.extra > 0 && <p className="text-pp-red font-bold text-xs">+₪{c.extra}</p>}
                </button>
              ))}
            </div>
          </div>

          {/* Toppings */}
          <div className="rounded-3xl p-6 bg-white border border-pp-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-lg text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>תוספות</h2>
              <span className="text-xs text-pp-muted">{toppings.length} נבחרו</span>
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 mb-4">
              {(Object.entries(TOPPING_CATEGORIES) as [keyof typeof TOPPING_CATEGORIES, {label:string;keys:string[]}][]).map(([key,cat]) => (
                <button key={key} onClick={()=>setActiveTab(key)}
                  className="rounded-full px-4 py-1.5 text-xs font-bold transition-all"
                  style={{
                    background: activeTab===key ? "#E63946" : "#F5EDE6",
                    color:      activeTab===key ? "white" : "#8B6347",
                  }}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Topping grid with large emoji */}
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {TOPPING_CATEGORIES[activeTab].keys.map(key => {
                const t = TOPPINGS[key];
                if (!t) return null;
                const sel = toppings.includes(key);
                return (
                  <button key={key} onClick={()=>toggleTopping(key)}
                    className="relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all"
                    style={{
                      borderColor: sel ? t.color : "#F0D8C8",
                      background: sel ? `${t.color}14` : "white",
                      transform: sel ? "scale(1.03)" : "scale(1)",
                    }}>

                    {/* Real food photo */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm transition-all"
                      style={{
                        outline: sel ? `2.5px solid ${t.color}` : "none",
                        outlineOffset: "2px",
                      }}>
                      {TOPPING_PHOTOS[key] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={TOPPING_PHOTOS[key]}
                          alt={t.label}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl"
                          style={{background: "linear-gradient(145deg,#FFF5EC,#FFE8D6)", fontSize: "2rem"}}>
                          {t.emoji}
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] font-bold text-pp-dark leading-tight text-center">{t.label}</p>
                    <p className="text-[10px] font-semibold text-pp-red">+₪{t.price}</p>

                    {/* Check mark when selected */}
                    {sel && (
                      <div className="absolute top-1.5 left-1.5 h-5 w-5 rounded-full flex items-center justify-center shadow-sm"
                        style={{background:t.color}}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Allergen note */}
          <p className="text-xs text-pp-muted text-center px-4">
            אלרגנים: המסעדה מכינה מוצרי גלוטן, חלב, ביצים, דגים, בוטנים ואגוזים. לפרטים נוספים פנו לצוות.
          </p>
        </div>
      </section>

      {showUpsell && (
        <UpsellModal total={totalPrice} onClose={()=>setShowUpsell(false)}/>
      )}

      <Footer />
    </div>
  );
}
