"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const EVENT_TYPES = [
  {
    id: "birthday",
    icon: "🎂",
    title: "יום הולדת",
    desc: "חגגו ביום הולדת כמו שמגיע — פיצה, שמחה ואהבה לכל המשפחה",
    includes: ["תפריט מיוחד לילדים","עוגת יום הולדת","קישוטים","צלם"],
  },
  {
    id: "corporate",
    icon: "💼",
    title: "אירוע עסקי",
    desc: "השקות, מפגשי צוות, ואירועי חברה בסטנדרט גבוה",
    includes: ["תפריט עסקי","הגשה מקצועית","שירות שולחני","חשבונית מס"],
  },
  {
    id: "private",
    icon: "🥂",
    title: "אירוע פרטי",
    desc: "מסיבה, מסיבת רווקות, חגיגת סיום — כל אירוע שמגיע מהלב",
    includes: ["תפריט מותאם","DJ option","עיצוב שולחנות","בר"],
  },
  {
    id: "school",
    icon: "🎒",
    title: "אירוע בית ספרי",
    desc: "טיולים שנתיים, מסיבות סיום, ימי הולדת כיתתיים",
    includes: ["מחיר מיוחד לקבוצות","תפריט ילדים","פעילות גיבוש","תעודות שף"],
  },
];

const PACKAGES = [
  {
    name: "Basic",
    nameHe: "בייסיק",
    price: 800,
    color: "#D4A56A",
    perPerson: null,
    guests: "עד 20 אורחים",
    features: [
      "3 סוגי פיצה גדולים",
      "שתיות כלולות",
      "לחם שום",
      "עגבניות שרי",
      "שירות עצמי",
    ],
  },
  {
    name: "Premium",
    nameHe: "פרמיום",
    price: 1500,
    color: "#E63946",
    perPerson: null,
    guests: "עד 40 אורחים",
    popular: true,
    features: [
      "6 סוגי פיצה גדולים",
      "שתיות ללא הגבלה",
      "מגש ברוסקטות",
      "סלט פארקו",
      "קינוח שיתוף",
      "שירות שולחני",
    ],
  },
  {
    name: "VIP",
    nameHe: "VIP",
    price: 2800,
    color: "#1A0806",
    perPerson: null,
    guests: "עד 80 אורחים",
    features: [
      "פיצות ללא הגבלה",
      "פסטות ביתיות",
      "בר שתיות מלא",
      "קינוחים מיוחדים",
      "שירות לבן מלא",
      "מנהל אירוע",
      "צלם מקצועי",
    ],
  },
];

const TESTIMONIALS = [
  { name: "מיכל ל.", text: "חגגנו יום הולדת 40 ופשוט היה מושלם. האוכל, השירות, האווירה — 10/10!", stars: 5 },
  { name: "דוד ק.", text: "אירוע חברה לכ-60 עובדים יצא מעל הציפיות. כולם שאלו איפה הזמנו.", stars: 5 },
  { name: "שרית מ.", text: "מסיבת יום הולדת לבן שלי עם 20 ילדים. הצוות היה מדהים עם הילדים!", stars: 5 },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({length: 5}).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < stars ? "#F4A261" : "#E0CFC0"}>
          <path d="M7 1L8.8 5.2H13.2L9.7 7.8L11 12L7 9.5L3 12L4.3 7.8L0.8 5.2H5.2L7 1Z"/>
        </svg>
      ))}
    </div>
  );
}

export default function EventsPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", guests: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeType, setActiveType] = useState("birthday");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="min-h-screen" style={{background:"#FFF9F5"}}>
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6 text-center" style={{background:"linear-gradient(135deg,#1A0806 0%,#2D0A05 60%,#3D1010 100%)"}}>
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{background:"radial-gradient(circle,#E63946,transparent 70%)"}}/>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-pp-red tracking-[0.5em] uppercase font-bebas text-sm mb-4">אירועים ומסיבות</p>
          <h1 className="font-black text-5xl md:text-7xl text-white leading-none" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
            נחגוג יחד
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto">
            מיום הולדת קטן ועד אירוע תאגידי גדול — פארקו פיצה מביאה את הניסיון, האוכל והאהבה לכל אירוע
          </p>
          <a href="#inquiry" className="btn-primary inline-block mt-8 px-8 py-4 text-sm tracking-widest">
            שלח פניה עכשיו
          </a>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-black text-3xl md:text-4xl text-pp-dark" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
              אילו אירועים אנחנו מארחים?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {EVENT_TYPES.map(et => (
              <button
                key={et.id}
                onClick={() => setActiveType(et.id)}
                className="rounded-3xl p-6 text-right transition-all border-2"
                style={{
                  borderColor: activeType===et.id ? "#E63946" : "#F0D8C8",
                  background:  activeType===et.id ? "rgba(230,57,70,0.04)" : "white",
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl shrink-0">{et.icon}</span>
                  <div>
                    <h3 className="font-black text-xl text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{et.title}</h3>
                    <p className="text-sm text-pp-muted mt-1">{et.desc}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {et.includes.map(item => (
                        <li key={item} className="rounded-full px-3 py-1 text-xs font-semibold" style={{background:"rgba(230,57,70,0.08)",color:"#E63946"}}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-6" style={{background:"#FFF0E4"}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-pp-muted tracking-[0.4em] uppercase font-bebas text-sm mb-3">חבילות אירוע</p>
            <h2 className="font-black text-3xl md:text-4xl text-pp-dark" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
              בחר את החבילה שלך
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className="relative rounded-3xl overflow-hidden shadow-md">
                {pkg.popular && (
                  <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-black text-white font-bebas tracking-widest" style={{background:"#E63946"}}>
                    הכי פופולרי
                  </div>
                )}
                <div className="p-6 text-white" style={{background: `linear-gradient(135deg,${pkg.color},${pkg.color}cc)`}}>
                  <p className="font-bebas text-sm tracking-widest opacity-70">{pkg.name}</p>
                  <h3 className="font-black text-2xl" style={{fontFamily:"var(--font-rubik)"}}>{pkg.nameHe}</h3>
                  <p className="mt-1 text-4xl font-black font-bebas">₪{pkg.price.toLocaleString()}</p>
                  <p className="text-sm opacity-70 mt-1">{pkg.guests}</p>
                </div>
                <div className="p-6 bg-white">
                  <ul className="space-y-2">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-pp-dark">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#2D6A4F"/>
                          <path d="M4.5 8L6.8 10.3L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#inquiry" className="mt-6 block text-center rounded-2xl py-3 text-sm font-black tracking-widest transition-all"
                    style={{background: pkg.color, color: "white"}}>
                    בחר חבילה זו
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl text-pp-dark text-center mb-10" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
            מה אומרים עלינו
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-3xl p-6 bg-white border border-pp-border">
                <StarRating stars={t.stars}/>
                <p className="mt-3 text-sm text-pp-muted leading-relaxed">&quot;{t.text}&quot;</p>
                <p className="mt-4 font-bold text-sm text-pp-dark">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-20 px-6" style={{background:"linear-gradient(135deg,#1A0806,#2D0A05)"}}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-black text-3xl md:text-4xl text-white" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
              שלח פניה לאירוע
            </h2>
            <p className="text-white/60 mt-2">נחזור אליך תוך 24 שעות עם הצעת מחיר מפורטת</p>
          </div>

          {submitted ? (
            <div className="rounded-3xl p-10 text-center" style={{background:"rgba(255,255,255,0.08)"}}>
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-black text-2xl text-white" style={{fontFamily:"var(--font-rubik)"}}>קיבלנו את הפניה שלך!</h3>
              <p className="text-white/60 mt-2">נחזור אליך בהקדם האפשרי</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">שם מלא</label>
                  <input required value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}
                    placeholder="ישראל ישראלי"
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-pp-red transition-colors text-sm"
                    style={{background:"rgba(255,255,255,0.08)"}}/>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">טלפון</label>
                  <input required type="tel" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}
                    placeholder="050-0000000" dir="ltr"
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-pp-red transition-colors text-sm"
                    style={{background:"rgba(255,255,255,0.08)"}}/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">תאריך האירוע</label>
                  <input type="date" required value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white outline-none focus:border-pp-red transition-colors text-sm"
                    style={{background:"rgba(255,255,255,0.08)"}}/>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">מספר אורחים</label>
                  <select required value={form.guests} onChange={e=>setForm(p=>({...p,guests:e.target.value}))}
                    className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white outline-none focus:border-pp-red transition-colors text-sm"
                    style={{background:"rgba(255,255,255,0.08)"}}>
                    <option value="">בחר...</option>
                    {["עד 20","20-40","40-60","60-80","80+"].map(g=><option key={g} value={g}>{g} אורחים</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5">סוג אירוע</label>
                <select required value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}
                  className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white outline-none focus:border-pp-red transition-colors text-sm"
                  style={{background:"rgba(255,255,255,0.08)"}}>
                  <option value="">בחר סוג אירוע...</option>
                  {EVENT_TYPES.map(et=><option key={et.id} value={et.id}>{et.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5">פרטים נוספים</label>
                <textarea rows={3} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  placeholder="ספר לנו על האירוע שלך..."
                  className="w-full rounded-2xl border border-white/10 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-pp-red transition-colors text-sm resize-none"
                  style={{background:"rgba(255,255,255,0.08)"}}/>
              </div>
              <button type="submit" disabled={submitting}
                className="btn-primary w-full py-4 text-sm tracking-widest mt-2">
                {submitting ? "שולח..." : "שלח פניה"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
