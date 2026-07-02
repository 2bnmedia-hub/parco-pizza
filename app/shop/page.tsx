"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

interface Product {
  id: string; name: string; desc: string; price: number;
  originalPrice?: number; category: string; badge?: string; emoji: string;
}

const PRODUCTS: Product[] = [
  { id: "sauce1", name: "רוטב עגבניות הבית",   desc: "רוטב עגבניות סן מרצנו מבושל 48 שעות",          price: 32,   originalPrice: 38, category: "רטבים",    badge: "בסטסלר",   emoji: "🍅" },
  { id: "sauce2", name: "פסטו בזיליקום טרי",    desc: "פסטו ביתי עם אגוזי לוז ופרמזן",                price: 38,   category: "רטבים",                        emoji: "🌿" },
  { id: "sauce3", name: "שמן צ׳ילי מעושן",       desc: "שמן זית כבוש עם 7 סוגי צ׳ילי",                price: 45,   category: "רטבים",    badge: "חריף",      emoji: "🌶️" },
  { id: "spice1", name: "תערובת תבליני פיצה",    desc: "מיקס ייחודי של 12 תבלינים איטלקיים",           price: 28,   category: "תבלינים",                      emoji: "🧂" },
  { id: "spice2", name: "אורגנו מיובש",          desc: "אורגנו יווני מיובש בשמש — ריח מדהים",          price: 22,   category: "תבלינים",                      emoji: "🫙" },
  { id: "kit1",   name: "ערכת פיצה ביתית",       desc: "קמח, שמרים, רוטב וכלים — הכל להכנת פיצה בבית",price: 89,   category: "ערכות",    badge: "מתנה מושלמת",emoji: "📦" },
  { id: "kit2",   name: "ערכת פסטה ביתית",       desc: "קמח מיוחד, מכונת פסטה ידנית + מדריך מלא",      price: 120,  category: "ערכות",                        emoji: "🍝" },
  { id: "merch1", name: "חולצת T פארקו",          desc: "100% כותנה אורגנית, לוגו רקום — White/Black",   price: 65,   category: "מרצ׳נדייז",                    emoji: "👕" },
  { id: "merch2", name: "כובע פארקו",             desc: "כובע בייסבול מנשי עם לוגו רקום",               price: 55,   category: "מרצ׳נדייז",                    emoji: "🧢" },
  { id: "merch3", name: "כוס ממותגת",             desc: "כוס קרמיקה 350מ׳ל עם ציטוט על פיצה",           price: 48,   category: "מרצ׳נדייז",                    emoji: "☕" },
  { id: "bundle1",name: "חבילת שף",               desc: "רוטב + פסטו + תבלינים + ערכת פיצה",             price: 155,  originalPrice: 187, category: "חבילות", badge: "חיסכון 17%",emoji: "👨‍🍳" },
  { id: "bundle2",name: "מתנה לאוהבי פיצה",       desc: "ערכת פיצה ביתית + תבלינים + חולצה",             price: 175,  originalPrice: 220, category: "חבילות", badge: "מתנה מנצחת",emoji: "🎁" },
];

const CATEGORIES = ["הכל", "רטבים", "תבלינים", "ערכות", "מרצ׳נדייז", "חבילות"];

interface CartItem { product: Product; qty: number; }

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = activeCategory === "הכל" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.product.id === product.id);
      return ex
        ? prev.map(i => i.product.id === product.id ? {...i, qty: i.qty+1} : i)
        : [...prev, { product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.product.id !== id));

  return (
    <div className="min-h-screen" style={{background:"#FFF9F5"}}>
      <Nav />

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 text-center">
        <p className="text-pp-muted tracking-[0.5em] uppercase font-bebas text-sm mb-3">Online Shop</p>
        <h1 className="font-black text-5xl md:text-6xl text-pp-dark" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
          חנות פארקו
        </h1>
        <p className="mt-3 text-pp-muted max-w-lg mx-auto">
          רטבים ביתיים, תבלינים, ערכות פיצה ומרצ׳נדייז מיוחד — ישירות מהמטבח שלנו
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Top bar: category filter + cart button */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="rounded-full px-4 py-2 text-sm font-bold transition-all"
                style={{
                  background: activeCategory===cat ? "#E63946" : "#F5EDE6",
                  color: activeCategory===cat ? "white" : "#8B6347",
                }}>
                {cat}
              </button>
            ))}
          </div>
          {cartCount > 0 && (
            <button onClick={() => setShowCart(true)}
              className="relative flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-black text-white"
              style={{background:"#1A0806"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              עגלה — ₪{cartTotal}
              <span className="absolute -top-2 -left-2 h-5 w-5 rounded-full bg-pp-red flex items-center justify-center text-[10px] font-black">
                {cartCount}
              </span>
            </button>
          )}
        </div>

        {/* Product grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(product => (
            <div key={product.id} className="group rounded-3xl bg-white border border-pp-border overflow-hidden hover:shadow-lg hover:border-pp-red/20 transition-all">
              {/* Product image placeholder */}
              <div className="relative flex items-center justify-center py-10 text-7xl" style={{background:"linear-gradient(145deg,#FFF0E6,#FFE8D6)"}}>
                {product.emoji}
                {product.badge && (
                  <div className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-black text-white font-bebas tracking-wide" style={{background:"#E63946"}}>
                    {product.badge}
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-5">
                <p className="text-[10px] text-pp-muted uppercase tracking-widest font-bebas">{product.category}</p>
                <h3 className="font-black text-base text-pp-dark mt-1" style={{fontFamily:"var(--font-rubik)"}}>{product.name}</h3>
                <p className="text-xs text-pp-muted mt-1 leading-relaxed">{product.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-black text-xl text-pp-dark">₪{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-pp-muted line-through mr-1.5">₪{product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-xl px-4 py-2 text-xs font-black text-white transition-all"
                    style={{background: addedId === product.id ? "#2D6A4F" : "#E63946"}}>
                    {addedId === product.id ? "✓ נוסף" : "הוסף לסל"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setShowCart(false)}>
          <div className="flex-1"/>
          <div
            className="relative w-full max-w-sm h-full overflow-y-auto flex flex-col"
            style={{background:"white"}}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-pp-border sticky top-0 bg-white z-10">
              <h2 className="font-black text-xl text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>
                העגלה שלך
              </h2>
              <button onClick={() => setShowCart(false)} className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-pp-border transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2L10 10M10 2L2 10" stroke="#1A0806" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="flex-1 p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-pp-muted">
                  <div className="text-5xl mb-3">🛒</div>
                  <p>העגלה ריקה</p>
                </div>
              ) : cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-3 rounded-2xl p-4 border border-pp-border">
                  <div className="text-3xl">{item.product.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-pp-dark truncate">{item.product.name}</p>
                    <p className="text-xs text-pp-muted">₪{item.product.price} × {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-pp-red text-sm">₪{item.product.price * item.qty}</p>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-[10px] text-pp-muted hover:text-pp-red transition-colors">
                      הסר
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-pp-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-pp-muted">סה&quot;כ</span>
                  <span className="font-black text-xl text-pp-dark">₪{cartTotal}</span>
                </div>
                <p className="text-xs text-pp-muted mb-4 text-center">משלוח חינם מ-150₪</p>
                <button className="btn-primary w-full py-4 text-sm tracking-widest">
                  לתשלום
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
