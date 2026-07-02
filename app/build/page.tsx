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

/* ─── Topping slots on the pizza (r≤72 from center 100,100) ── */
const TOPPING_SLOTS = [
  {x:100,y:100},
  {x:100,y:78},{x:118,y:111},{x:82,y:111},
  {x:100,y:60},{x:133,y:79},{x:138,y:118},{x:119,y:140},{x:81,y:140},{x:62,y:118},{x:67,y:79},
  {x:100,y:44},{x:132,y:57},{x:154,y:85},{x:155,y:116},{x:134,y:144},
  {x:100,y:158},{x:66,y:144},{x:46,y:116},{x:47,y:85},
];

/* ─── Realistic topping shapes ──────────────────────────── */
function ToppingMark({ type, x, y, idx }: { type: string; x: number; y: number; idx: number }) {
  const rot = (idx * 53) % 360;
  switch (type) {
    case "mushroom":
      return (
        <g transform={`translate(${x},${y})`}>
          <rect x="-2" y="1.5" width="4" height="5" rx="1.5" fill="#D4A870"/>
          <ellipse rx="7.5" ry="5.5" fill="#8B4F1A"/>
          <ellipse rx="5.5" ry="3.8" cy="-0.5" fill="#C07830" opacity="0.75"/>
          <ellipse cx="-2" cy="-2.5" rx="2.2" ry="1.3" fill="rgba(255,225,170,0.45)" transform="rotate(-25,-2,-2.5)"/>
          <ellipse rx="7.5" ry="5.5" fill="none" stroke="rgba(60,20,0,0.25)" strokeWidth="0.7"/>
        </g>
      );
    case "peppers":
      return (
        <g transform={`translate(${x},${y}) rotate(${rot})`}>
          <path d="M-5.5,0 Q-5,-4 0,-5 Q5,-4 5.5,0 Q4,3.5 0,4 Q-4,3.5 -5.5,0Z" fill="#E63946"/>
          <path d="M-3.5,0 Q-3,-2.5 0,-3.2 Q3,-2.5 3.5,0 Q2.5,2.5 0,2.8 Q-2.5,2.5 -3.5,0Z" fill="#F06070" opacity="0.6"/>
          <path d="M0,-4.5 Q0.3,0 0,3.5" stroke="rgba(255,210,200,0.5)" strokeWidth="0.9" fill="none"/>
          <ellipse cx="-2" cy="-2" rx="1.8" ry="1" fill="rgba(255,245,240,0.35)" transform="rotate(-25,-2,-2)"/>
        </g>
      );
    case "olives":
      return (
        <g transform={`rotate(${rot/4},${x},${y})`}>
          <ellipse cx={x} cy={y} rx="5.5" ry="6.5" fill="#1C2E10"/>
          <ellipse cx={x} cy={y} rx="2.2" ry="2.8" fill="#C42020"/>
          <ellipse cx={x-1} cy={y-2.5} rx="1.8" ry="1" fill="rgba(255,255,255,0.28)" transform={`rotate(-20,${x-1},${y-2.5})`}/>
        </g>
      );
    case "corn":
      return (
        <g transform={`translate(${x},${y}) rotate(${rot})`}>
          {([-3,3] as number[]).map((dx,col) =>
            ([-4,0,4] as number[]).map((dy,row) => (
              <g key={`${col}-${row}`} transform={`translate(${dx},${dy})`}>
                <ellipse rx="2.4" ry="3.2" fill="#D8A810"/>
                <ellipse rx="1.6" ry="2.2" fill="#F0C828" opacity="0.8"/>
                <ellipse cy="-1.2" rx="1.1" ry="0.7" fill="rgba(255,255,200,0.5)"/>
              </g>
            ))
          )}
        </g>
      );
    case "pepperoni":
    case "salami": {
      const c = type === "pepperoni" ? "#C41E2A" : "#8B1A2A";
      const c2 = type === "pepperoni" ? "#A01520" : "#6A1220";
      return (
        <g>
          <circle cx={x} cy={y} r="6.5" fill={c}/>
          <circle cx={x} cy={y} r="5" fill={c2} opacity="0.7"/>
          {([[ 2,-2],[-2.2, 0.8],[0.5, 2.8],[-0.5,-3],[2.8, 1.5]] as [number,number][]).map(([dx,dy],i) => (
            <circle key={i} cx={x+dx} cy={y+dy} r="1.1" fill="rgba(255,245,230,0.88)"/>
          ))}
          <circle cx={x} cy={y} r="6.2" fill="none" stroke="rgba(50,5,5,0.35)" strokeWidth="1.3"/>
          <ellipse cx={x-1.5} cy={y-2} rx="2.8" ry="1.4" fill="rgba(255,200,190,0.18)" transform={`rotate(-25,${x-1.5},${y-2})`}/>
        </g>
      );
    }
    case "chicken":
    case "beef": {
      const cf = type === "chicken" ? "#D4956A" : "#8B2E2E";
      const cl = type === "chicken" ? "#E8B090" : "#A84040";
      return (
        <g transform={`translate(${x},${y}) rotate(${rot})`}>
          <path d={type === "chicken"
            ? "M-6.5,-1 Q-5,-5.5 0,-5.5 Q5.5,-4.5 6.5,0 Q5.5,4.5 1,5.5 Q-4,5.5 -6.5,-1Z"
            : "M-5.5,-2 Q-3.5,-6 2,-5.5 Q6.5,-3 6.5,2 Q4.5,5.5 0,5.5 Q-4.5,4.5 -5.5,-2Z"}
            fill={cf}/>
          <path d={type === "chicken"
            ? "M-4,-1.5 Q0,-4 4,-1.5"
            : "M-3,-1 Q1,-4.5 4.5,-1"}
            stroke={`rgba(70,25,0,0.45)`} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          <ellipse cx="-1" cy="-2" rx="3" ry="1.6" fill={cl} opacity="0.4"/>
          <ellipse cx="-1.5" cy="-2.5" rx="2.2" ry="1.1" fill="rgba(255,225,190,0.25)" transform="rotate(-20,-1.5,-2.5)"/>
        </g>
      );
    }
    case "tuna":
      return (
        <g transform={`translate(${x},${y}) rotate(${rot})`}>
          <ellipse rx="6.5" ry="3.5" fill="#5A8AAF"/>
          <ellipse rx="4.5" ry="2.2" fill="#7AAAC0" opacity="0.6"/>
          <path d="M-6,0 Q0,-3 6,0" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none"/>
          <ellipse cx="-1.8" cy="-1.2" rx="2.2" ry="1" fill="rgba(200,235,255,0.35)" transform="rotate(-15,-1.8,-1.2)"/>
        </g>
      );
    case "spinach":
    case "artichoke": {
      const lc = type === "spinach" ? "#2D6A4F" : "#5A8845";
      const lh = type === "spinach" ? "#3A8A65" : "#78B060";
      return (
        <g transform={`translate(${x},${y}) rotate(${rot})`}>
          <path d="M0,-7 Q4.5,-4 4.5,0 Q4.5,5 0,7 Q-4.5,5 -4.5,0 Q-4.5,-4 0,-7Z" fill={lc}/>
          <path d="M0,-6 Q3,-3.5 3,0 Q3,4.5 0,6 Q-3,4.5 -3,0 Q-3,-3.5 0,-6Z" fill={lh} opacity="0.45"/>
          <path d="M0,-6.5 Q0.3,0 0,6.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none"/>
          {([[-1.5,-2],[1.5,-1.5],[-2,1],[2,0.5]] as [number,number][]).map(([px,py],i) => (
            <path key={i} d={`M0,${py-1} Q${px*1.2},${py} ${px*1.8},${py+1}`} stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" fill="none"/>
          ))}
          <ellipse cx="-1.2" cy="-3" rx="1.8" ry="0.9" fill="rgba(255,255,255,0.2)" transform="rotate(-25,-1.2,-3)"/>
        </g>
      );
    }
    case "sun_tomato":
      return (
        <g transform={`rotate(${rot/2},${x},${y})`}>
          <ellipse cx={x} cy={y} rx="5" ry="3.5" fill="#922B00"/>
          <ellipse cx={x} cy={y} rx="3.5" ry="2.5" fill="#C04010" opacity="0.65"/>
          <path d={`M${x},${y-3} L${x},${y+3} M${x-3},${y} L${x+3},${y}`} stroke="rgba(255,180,130,0.3)" strokeWidth="0.9"/>
          <ellipse cx={x-1} cy={y-1.2} rx="1.8" ry="0.9" fill="rgba(255,210,170,0.3)" transform={`rotate(-20,${x-1},${y-1.2})`}/>
        </g>
      );
    case "onion":
      return (
        <g transform={`translate(${x},${y}) rotate(${rot})`}>
          <path d="M-5.5,0 Q-5,-4.5 0,-5.5 Q5,-4.5 5.5,0 Q4,4.5 0,5 Q-4,4.5 -5.5,0Z" fill="#DDD0E8"/>
          <path d="M-3.5,0 Q-3,-2.8 0,-3.5 Q3,-2.8 3.5,0 Q2.5,2.8 0,3.2 Q-2.5,2.8 -3.5,0Z" fill="rgba(255,255,255,0.4)"/>
          <path d="M0,-5 Q0.4,0 0,4.5" stroke="rgba(180,140,200,0.5)" strokeWidth="0.8" fill="none"/>
          <ellipse cx="-1.5" cy="-2.5" rx="1.5" ry="0.9" fill="rgba(255,255,255,0.25)" transform="rotate(-25,-1.5,-2.5)"/>
        </g>
      );
    case "truffle":
      return (
        <g>
          <circle cx={x} cy={y} r="4.5" fill="#3A2820"/>
          <circle cx={x} cy={y} r="3.2" fill="#4A3028" opacity="0.65"/>
          {([[-1.8,-1],[1.2,0.6],[-0.5,1.8],[1.8,-1.6],[0,-0.5]] as [number,number][]).map(([dx,dy],i) => (
            <circle key={i} cx={x+dx} cy={y+dy} r="0.75" fill="rgba(255,255,255,0.12)"/>
          ))}
          <ellipse cx={x-1.2} cy={y-1.8} rx="1.5" ry="0.85" fill="rgba(255,255,255,0.14)" transform={`rotate(-20,${x-1.2},${y-1.8})`}/>
        </g>
      );
    case "caramelized":
      return (
        <g transform={`translate(${x},${y}) rotate(${rot})`}>
          <path d="M-5.5,0 Q-4.5,-5.5 0,-6.5 Q4.5,-5.5 5.5,0 Q4,4.5 0,5.5 Q-4,4.5 -5.5,0Z" fill="#C48020"/>
          <path d="M-3.5,0 Q-2.5,-3.5 0,-4 Q2.5,-3.5 3.5,0 Q2.5,3 0,3.5 Q-2.5,3 -3.5,0Z" fill="#E09828" opacity="0.65"/>
          <path d="M-2.5,-2.5 Q0,-4 2.5,-2" stroke="rgba(130,65,0,0.5)" strokeWidth="1" fill="none" strokeLinecap="round"/>
          <ellipse cx="-1.2" cy="-2" rx="2" ry="1" fill="rgba(255,240,180,0.25)" transform="rotate(-20,-1.2,-2)"/>
        </g>
      );
    case "garlic":
      return (
        <g transform={`translate(${x},${y}) rotate(${rot})`}>
          <path d="M0,-5.5 Q4,-3 4,1 Q2.5,4.5 0,4.5 Q-2.5,4.5 -4,1 Q-4,-3 0,-5.5Z" fill="#E8D8A8"/>
          <path d="M0,-4.5 Q3,-2 3,1 Q2,3.5 0,3.5 Q-2,3.5 -3,1 Q-3,-2 0,-4.5Z" fill="#F5ECC0" opacity="0.65"/>
          <circle cx="1.2" cy="0" r="1.1" fill="#C4900A" opacity="0.6"/>
          <circle cx="-0.8" cy="1.8" r="0.9" fill="#D4A020" opacity="0.5"/>
          <ellipse cx="-0.8" cy="-2.5" rx="1.4" ry="0.8" fill="rgba(255,255,240,0.35)" transform="rotate(-20,-0.8,-2.5)"/>
        </g>
      );
    default:
      return <circle cx={x} cy={y} r="4.5" fill="#888" opacity="0.85"/>;
  }
}

/* ─── Realistic Pizza Canvas ────────────────────────────── */
const CHAR_MARKS = [
  {x:100,y:13, rx:7,  ry:3,  rot:10},
  {x:147,y:27, rx:5.5,ry:2.5,rot:45},
  {x:179,y:58, rx:5,  ry:2.5,rot:75},
  {x:188,y:103,rx:6,  ry:2.5,rot:2},
  {x:172,y:152,rx:5,  ry:2,  rot:35},
  {x:138,y:182,rx:5.5,ry:2.5,rot:55},
  {x:100,y:190,rx:6,  ry:2.5,rot:0},
  {x:62, y:182,rx:5,  ry:2,  rot:125},
  {x:28, y:150,rx:5.5,ry:2.5,rot:155},
  {x:14, y:103,rx:6,  ry:2.5,rot:175},
  {x:30, y:57, rx:5,  ry:2.5,rot:220},
  {x:60, y:27, rx:5.5,ry:2.5,rot:250},
];

const CHEESE_BLOBS = [
  {cx:86,  cy:86,  rx:24, ry:19, rot:-22},
  {cx:113, cy:82,  rx:22, ry:17, rot:18},
  {cx:76,  cy:110, rx:20, ry:18, rot:-12},
  {cx:106, cy:116, rx:23, ry:18, rot:28},
  {cx:131, cy:95,  rx:18, ry:21, rot:-32},
  {cx:90,  cy:133, rx:21, ry:16, rot:12},
  {cx:119, cy:131, rx:18, ry:20, rot:-18},
  {cx:68,  cy:88,  rx:16, ry:14, rot:8},
  {cx:135, cy:125, rx:14, ry:17, rot:22},
];

const CHEESE_BUBBLES = [
  {x:88, y:80,  r:5.5, op:0.65},
  {x:113,y:75,  r:4.5, op:0.55},
  {x:74, y:105, r:4,   op:0.6},
  {x:126,y:98,  r:5,   op:0.6},
  {x:94, y:123, r:4.5, op:0.55},
  {x:116,y:121, r:5,   op:0.65},
  {x:102,y:92,  r:4,   op:0.5},
  {x:78, y:128, r:3.5, op:0.45},
  {x:130,y:115, r:3.5, op:0.5},
];

function PizzaCanvas({ size, dough, sauce, cheese, toppings }: {
  size: SizeKey; dough: DoughKey; sauce: SauceKey; cheese: CheeseKey; toppings: string[];
}) {
  const sauceGradId = SAUCES[sauce].gradId;
  const cheeseGradId = CHEESES[cheese].gradId;
  const bubbleColor = cheese === "triple" ? "#D4980A" : cheese === "vegan" ? "#C4901A" : "#E8A028";
  const crustLight  = dough === "wheat" ? "#CC8A3A" : dough === "stuffed" ? "#E8C870" : "#E0A84A";
  const crustDark   = dough === "wheat" ? "#8B5015" : "#7A3A10";

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
    <svg viewBox="0 0 200 205" className="w-full max-w-[380px] mx-auto" aria-label="תצוגת פיצה בהתאמה אישית">
      <defs>
        {/* Crust gradient */}
        <radialGradient id="crust-outer" cx="50%" cy="48%" r="52%">
          <stop offset="0%"   stopColor={crustLight}/>
          <stop offset="62%"  stopColor="#B8782A"/>
          <stop offset="82%"  stopColor="#8A4C12"/>
          <stop offset="100%" stopColor={crustDark}/>
        </radialGradient>
        <radialGradient id="crust-top" cx="50%" cy="42%" r="50%">
          <stop offset="0%"   stopColor={crustLight} stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#B8782A"    stopOpacity="0.4"/>
        </radialGradient>

        {/* Sauce gradients */}
        <radialGradient id="s-tomato" cx="42%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#E03535"/>
          <stop offset="60%"  stopColor="#C02020"/>
          <stop offset="100%" stopColor="#8B0F0F"/>
        </radialGradient>
        <radialGradient id="s-cream" cx="45%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#FFFDF6"/>
          <stop offset="60%"  stopColor="#F8EDD8"/>
          <stop offset="100%" stopColor="#E8D0B0"/>
        </radialGradient>
        <radialGradient id="s-pesto" cx="42%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#3D8060"/>
          <stop offset="60%"  stopColor="#2D6A4F"/>
          <stop offset="100%" stopColor="#1A3D2A"/>
        </radialGradient>
        <radialGradient id="s-bbq" cx="42%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#8B3510"/>
          <stop offset="60%"  stopColor="#6A2508"/>
          <stop offset="100%" stopColor="#3A1005"/>
        </radialGradient>

        {/* Cheese gradients */}
        <radialGradient id="c-mozz" cx="45%" cy="42%" r="58%">
          <stop offset="0%"   stopColor="#FFFFF5"/>
          <stop offset="55%"  stopColor="#F8F2D8"/>
          <stop offset="100%" stopColor="#E8D89A"/>
        </radialGradient>
        <radialGradient id="c-triple" cx="45%" cy="42%" r="58%">
          <stop offset="0%"   stopColor="#FFFCE0"/>
          <stop offset="55%"  stopColor="#F5E060"/>
          <stop offset="100%" stopColor="#D8BC20"/>
        </radialGradient>
        <radialGradient id="c-vegan" cx="45%" cy="42%" r="58%">
          <stop offset="0%"   stopColor="#F8F4E8"/>
          <stop offset="55%"  stopColor="#EAD898"/>
          <stop offset="100%" stopColor="#D0BC70"/>
        </radialGradient>

        {/* Crust noise filter */}
        <filter id="crust-tex" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="5" result="noise"/>
          <feColorMatrix in="noise" type="matrix"
            values="0 0 0 0 0.35  0 0 0 0 0.18  0 0 0 0 0  0 0 0 0.22 0"
            result="tinted"/>
          <feComposite in="tinted" in2="SourceGraphic" operator="in" result="masked"/>
          <feBlend in="SourceGraphic" in2="masked" mode="multiply"/>
        </filter>

        {/* Pizza drop shadow */}
        <filter id="pizza-shadow" x="-15%" y="-10%" width="130%" height="135%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodOpacity="0.28" floodColor="#5C2D0E"/>
        </filter>

        {/* Plate shadow ring */}
        <radialGradient id="plate-rim" cx="50%" cy="50%" r="50%">
          <stop offset="88%"  stopColor="rgba(210,190,165,0)" />
          <stop offset="100%" stopColor="rgba(180,155,120,0.35)"/>
        </radialGradient>
      </defs>

      {/* ── Plate shadow ── */}
      <ellipse cx="100" cy="200" rx="88" ry="8" fill="rgba(0,0,0,0.13)"/>

      {/* ── Plate rim ── */}
      <circle cx="100" cy="101" r="97" fill="url(#plate-rim)" filter="url(#pizza-shadow)"/>
      <circle cx="100" cy="101" r="95" fill="#F9F5F0"/>
      <circle cx="100" cy="101" r="92" fill="#EDE5D8" opacity="0.6"/>

      {/* ── Crust outer ring ── */}
      <circle cx="100" cy="100" r="89" fill="url(#crust-outer)"/>
      <circle cx="100" cy="100" r="89" fill="url(#crust-top)" filter="url(#crust-tex)"/>

      {/* Stuffed crust cheese ring */}
      {dough === "stuffed" && (
        <circle cx="100" cy="100" r="84" fill="none"
          stroke="rgba(255,240,200,0.6)" strokeWidth="4"/>
      )}

      {/* ── Char marks on crust ── */}
      {CHAR_MARKS.map((m, i) => (
        <ellipse key={i}
          cx={m.x} cy={m.y} rx={m.rx} ry={m.ry}
          fill="rgba(38,14,2,0.42)"
          transform={`rotate(${m.rot},${m.x},${m.y})`}
          opacity="0.75"/>
      ))}

      {/* ── Sauce ── */}
      <circle cx="100" cy="100" r="80" fill={`url(#${sauceGradId})`}/>

      {/* ── Cheese base ── */}
      <circle cx="100" cy="100" r="78" fill={`url(#${cheeseGradId})`} opacity="0.9"/>

      {/* ── Organic cheese blobs ── */}
      {CHEESE_BLOBS.map((b, i) => (
        <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
          fill={`url(#${cheeseGradId})`} opacity="0.62"
          transform={`rotate(${b.rot},${b.cx},${b.cy})`}/>
      ))}

      {/* ── Melted cheese bubbles ── */}
      {CHEESE_BUBBLES.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={bubbleColor} opacity={b.op}/>
      ))}

      {/* ── Sauce peeking through cheese ── */}
      {CHEESE_BLOBS.slice(0,3).map((_b, i) => (
        <circle key={i}
          cx={[60,140,100][i]!} cy={[70,68,135][i]!} r="5"
          fill={`url(#${sauceGradId})`} opacity="0.35"/>
      ))}

      {/* ── Toppings ── */}
      {slotPairs.map((t, i) => (
        <ToppingMark key={i} type={t.type} x={t.x} y={t.y} idx={t.idx}/>
      ))}

      {/* ── Cheese gloss highlight ── */}
      <ellipse cx="80" cy="70" rx="24" ry="11"
        fill="rgba(255,255,255,0.14)" transform="rotate(-22,80,70)"/>

      {/* ── Plate inner shadow ── */}
      <circle cx="100" cy="100" r="89" fill="none"
        stroke="rgba(150,100,50,0.12)" strokeWidth="3"/>
    </svg>
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

            {/* Realistic pizza */}
            <PizzaCanvas size={size} dough={dough} sauce={sauce} cheese={cheese} toppings={toppings}/>

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
                  <div className="flex items-center justify-center" style={{width:44,height:44}}>
                    <div className="rounded-full shadow-sm" style={{
                      width:44*s.icon, height:44*s.icon,
                      background: size===key ? "linear-gradient(135deg,#E63946,#c42d38)" : "linear-gradient(135deg,#F0D8C8,#E0C0B0)",
                    }}/>
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
            <h2 className="font-black text-lg text-pp-dark mb-4" style={{fontFamily:"var(--font-rubik)"}}>סוג עיסה</h2>
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
                  <div className="h-9 w-9 rounded-full shrink-0 shadow-md" style={{background:s.swatch}}/>
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
                  <div className="h-9 w-9 rounded-full shadow-md" style={{background:c.swatch}}/>
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

                    {/* Food emoji in warm square */}
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-4xl shadow-sm transition-all"
                      style={{
                        background: sel
                          ? `linear-gradient(145deg,${t.color}25,${t.color}12)`
                          : "linear-gradient(145deg,#FFF5EC,#FFE8D6)",
                        fontSize: "2rem",
                      }}>
                      {t.emoji}
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
