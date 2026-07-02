"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const SERVICES = [
  { icon: "🏢", title: "צהריים במשרד",    desc: "ארוחת צהריים יומית לצוות — איכות, בזמן, בלי טרחה" },
  { icon: "📊", title: "ישיבות וכנסים",    desc: "מזנון ייצוגי לפגישות עסקיות ו-Boardroom events" },
  { icon: "🎉", title: "אירועי חברה",      desc: "שבועות עבודה, יום גיבוש, אירוע תאגידי — הכל בידינו" },
  { icon: "🔄", title: "הזמנות קבועות",    desc: "הגדרת מנוי שבועי/חודשי עם תמחור מיוחד לעסקים" },
];

const BENEFITS = [
  { label: "מינימום 10 איש",          sub: "נגיש לכל גודל צוות" },
  { label: "משלוח ללא עלות",           sub: "מ-30 מנות ומעלה" },
  { label: "חשבונית מס מלאה",          sub: "לניכוי מס כהוצאה עסקית" },
  { label: "חשבון עסקי",               sub: "תנאי אשראי 30/45 יום" },
  { label: "מנהל לקוח ייעודי",          sub: "נציג קבוע עבורך" },
  { label: "הזמנה עד 12:00",           sub: "אספקה תוך 90 דקות" },
];

const MENU_PACKS = [
  {
    name: "מנת עובד",
    price: 42,
    perUnit: "לאדם",
    min: "מינימום 10",
    items: ["פיצה אישית לבחירה","שתייה קרה","קינוח","כלים מלאים"],
    color: "#D4A56A",
  },
  {
    name: "שולחן שיתוף",
    price: 220,
    perUnit: "לשולחן",
    min: "6-8 אנשים",
    popular: true,
    items: ["3 פיצות גדולות לבחירה","2 סוגי פסטה","סלט פארקו","לחם שום","שתייה ומשקאות חמים"],
    color: "#E63946",
  },
  {
    name: "מנהל בכיר",
    price: 95,
    perUnit: "לאדם",
    min: "מינימום 6",
    items: ["פיצה אישית פרמיום","סלט אישי","קינוח משובח","קפה / שתייה חמה","גרוכי וכלים","פריזנטיישן-ריידי"],
    color: "#1A0806",
  },
];

export default function CateringPage() {
  const [form, setForm] = useState({
    company: "", name: "", phone: "", email: "",
    size: "", frequency: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="min-h-screen" style={{background:"#FFF9F5"}}>
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6" style={{background:"linear-gradient(135deg,#0F2318 0%,#1a3a28 60%,#2D6A4F 100%)"}}>
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{background:"radial-gradient(circle,#2D6A4F,transparent 70%)"}}/>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto grid md:grid-cols-2 items-center gap-10">
          <div>
            <p className="tracking-[0.5em] uppercase font-bebas text-sm mb-4" style={{color:"#4ade80"}}>Corporate Catering</p>
            <h1 className="font-black text-5xl md:text-6xl text-white leading-none" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
              קייטרינג<br/>לעסקים
            </h1>
            <p className="mt-5 text-lg text-white/70">
              ניסיון של 10+ שנים באספקה לחברות מובילות. פיצה אמיתית, שירות מקצועי, בזמן תמיד.
            </p>
            <a href="#contact" className="inline-block mt-8 rounded-2xl px-8 py-4 text-sm font-black tracking-widest transition-all"
              style={{background:"#4ade80",color:"#0F2318"}}>
              קבל הצעת מחיר
            </a>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {[{n:"500+",l:"לקוחות עסקיים"},{n:"15K+",l:"הזמנות בשנה"},{n:"98%",l:"שביעות רצון"},{n:"45",l:"דק׳ ממוצע"}].map(stat=>(
              <div key={stat.n} className="rounded-2xl p-5 text-center" style={{background:"rgba(255,255,255,0.08)"}}>
                <p className="font-black text-3xl text-white font-bebas">{stat.n}</p>
                <p className="text-xs text-white/50 mt-1">{stat.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black text-3xl text-pp-dark text-center mb-12" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
            השירותים שלנו לעסקים
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {SERVICES.map(s => (
              <div key={s.title} className="rounded-3xl p-6 text-center border border-pp-border bg-white hover:border-pp-red/30 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-black text-base text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{s.title}</h3>
                <p className="text-xs text-pp-muted mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Packages */}
      <section className="py-20 px-6" style={{background:"#FFF0E4"}}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black text-3xl text-pp-dark text-center mb-12" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
            חבילות קייטרינג
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {MENU_PACKS.map(p => (
              <div key={p.name} className="relative rounded-3xl overflow-hidden shadow-md">
                {p.popular && (
                  <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-black text-white font-bebas tracking-widest" style={{background:"#2D6A4F"}}>
                    מומלץ לחברות
                  </div>
                )}
                <div className="p-6 text-white" style={{background:`linear-gradient(135deg,${p.color},${p.color}bb)`}}>
                  <h3 className="font-black text-2xl" style={{fontFamily:"var(--font-rubik)"}}>{p.name}</h3>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-4xl font-black font-bebas">₪{p.price}</span>
                    <span className="text-sm opacity-70 pb-1">{p.perUnit}</span>
                  </div>
                  <p className="text-xs opacity-60 mt-1">{p.min}</p>
                </div>
                <div className="p-6 bg-white">
                  <ul className="space-y-2.5">
                    {p.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-pp-dark">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="7" fill={p.color}/>
                          <path d="M3.5 7L5.5 9L10.5 4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-6 block text-center rounded-2xl py-3 text-sm font-black tracking-widest transition-all text-white"
                    style={{background: p.color}}>
                    הזמן עכשיו
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl text-pp-dark text-center mb-12" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
            למה פארקו לעסקים?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BENEFITS.map(b => (
              <div key={b.label} className="rounded-2xl p-5 bg-white border border-pp-border text-center">
                <div className="flex justify-center mb-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{background:"rgba(45,106,79,0.1)"}}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="9" fill="#2D6A4F"/>
                      <path d="M4.5 9L7.2 11.7L13.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p className="font-black text-sm text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{b.label}</p>
                <p className="text-xs text-pp-muted mt-1">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6" style={{background:"linear-gradient(135deg,#0F2318,#1a3a28)"}}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-black text-3xl text-white" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
              פנה לנו לחשבון עסקי
            </h2>
            <p className="text-white/50 mt-2 text-sm">נחזור בתוך שעות ספורות עם הצעת מחיר מותאמת</p>
          </div>

          {submitted ? (
            <div className="rounded-3xl p-10 text-center" style={{background:"rgba(255,255,255,0.08)"}}>
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-black text-2xl text-white" style={{fontFamily:"var(--font-rubik)"}}>
                הפניה התקבלה!
              </h3>
              <p className="text-white/60 mt-2">מנהל הלקוחות שלנו יצור איתך קשר בקרוב</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">שם החברה</label>
                  <input required value={form.company} onChange={e=>setForm(p=>({...p,company:e.target.value}))}
                    placeholder="פארקו בע&quot;מ"
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-green-400 transition-colors text-sm"
                    style={{background:"rgba(255,255,255,0.08)"}}/>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">איש קשר</label>
                  <input required value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}
                    placeholder="שם מלא"
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-green-400 transition-colors text-sm"
                    style={{background:"rgba(255,255,255,0.08)"}}/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">טלפון</label>
                  <input required type="tel" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}
                    placeholder="050-0000000" dir="ltr"
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-green-400 transition-colors text-sm"
                    style={{background:"rgba(255,255,255,0.08)"}}/>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">מספר עובדים</label>
                  <select value={form.size} onChange={e=>setForm(p=>({...p,size:e.target.value}))}
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white outline-none focus:border-green-400 transition-colors text-sm"
                    style={{background:"rgba(255,255,255,0.08)"}}>
                    <option value="">בחר...</option>
                    {["10-20","20-50","50-100","100+"].map(s=><option key={s} value={s}>{s} עובדים</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5">תדירות הזמנה</label>
                <select value={form.frequency} onChange={e=>setForm(p=>({...p,frequency:e.target.value}))}
                  className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white outline-none focus:border-green-400 transition-colors text-sm"
                  style={{background:"rgba(255,255,255,0.08)"}}>
                  <option value="">בחר...</option>
                  {["חד פעמי","שבועי","דו-שבועי","חודשי"].map(f=><option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5">הערות</label>
                <textarea rows={3} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  placeholder="ספר לנו על הצרכים שלך..."
                  className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-green-400 transition-colors text-sm resize-none"
                  style={{background:"rgba(255,255,255,0.08)"}}/>
              </div>
              <button type="submit" disabled={submitting}
                className="w-full rounded-2xl py-4 text-sm font-black tracking-widest transition-all"
                style={{background:"#4ade80",color:"#0F2318"}}>
                {submitting ? "שולח..." : "שלח פניה עסקית"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
