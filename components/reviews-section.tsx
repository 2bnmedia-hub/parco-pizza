"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

const INITIAL_REVIEWS = [
  {
    id: 1, name: "מיכל ב.", avatar: "מ", rating: 5,
    text: "פיצה מרגריטה בלתי נשכחת. הבצק מושלם, הגבינה נמסה בפה. הגיעה בזמן ורותחת!",
    item: "מרגריטה קלאסית", date: "לפני 3 ימים", verified: true,
  },
  {
    id: 2, name: "יוסי ק.", avatar: "י", rating: 5,
    text: "הזמנה משפחתית לשישי בלילה — 4 פיצות גדולות. כולן הגיעו ב-35 דקות. המשפחה השתגעה!",
    item: "פיצה פרמג׳נה", date: "לפני שבוע", verified: true,
  },
  {
    id: 3, name: "דנה ש.", avatar: "ד", rating: 5,
    text: "הפסטה הביתית שלהם — אחת הטובות בחיפה הגדולה. רוטב עגבניות אמיתי, לא מהצנצנת.",
    item: "ספגטי בולוניז", date: "לפני שבועיים", verified: true,
  },
  {
    id: 4, name: "ران מ.", avatar: "ר", rating: 5,
    text: "אירוע עסקי לחברה שלנו עם 30 עובדים. הכל היה מושלם — שירות, אוכל, תזמון.",
    item: "חבילת אירוע", date: "לפני חודש", verified: true,
  },
  {
    id: 5, name: "שרה ל.", avatar: "ש", rating: 5,
    text: "הפיצה שבניתי בעצמי דרך הבוני יצאה מדהים. שמן טרופל + ארטישוק = גאונות!",
    item: "פיצה מותאמת אישית", date: "לפני 2 שבועות", verified: true,
  },
  {
    id: 6, name: "אורן ג.", avatar: "א", rating: 4,
    text: "פיצה מעולה כרגיל. רק הגיעה מעט מאוחר מהרגיל, אבל שווה כל רגע.",
    item: "פיצה 4 גבינות", date: "לפני שבוע", verified: false,
  },
];

function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({length: 5}).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill={i < rating ? "#F4A261" : "#E0CFC0"}>
          <path d="M7 1L8.8 5.2H13.2L9.7 7.8L11 12L7 9.5L3 12L4.3 7.8L0.8 5.2H5.2L7 1Z"/>
        </svg>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({length: 5}).map((_, i) => (
        <button key={i} type="button"
          onMouseEnter={()=>setHover(i+1)}
          onMouseLeave={()=>setHover(0)}
          onClick={()=>onChange(i+1)}>
          <svg width="24" height="24" viewBox="0 0 14 14" fill={(hover||value) > i ? "#F4A261" : "#E0CFC0"}
            className="transition-colors">
            <path d="M7 1L8.8 5.2H13.2L9.7 7.8L11 12L7 9.5L3 12L4.3 7.8L0.8 5.2H5.2L7 1Z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", text: "", item: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      name: form.name,
      avatar: form.name[0]?.toUpperCase() ?? "?",
      rating: form.rating,
      text: form.text,
      item: form.item || "פיצה פארקו",
      date: "הרגע",
      verified: false,
    };
    setReviews(p => [newReview, ...p]);
    setSubmitted(true);
    setShowForm(false);
    setForm({ name:"", text:"", item:"", rating:5 });
  };

  return (
    <section id="reviews" className="py-24 md:py-32 px-6" style={{background:"#FFF9F5"}}>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-pp-muted tracking-[0.5em] uppercase font-bebas text-sm mb-3">Community</p>
            <h2 className="font-black text-4xl md:text-5xl text-pp-dark" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
              מה אומרת הקהילה
            </h2>
            {/* Rating overview */}
            <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
              <div className="text-center">
                <p className="font-black text-5xl text-pp-dark font-bebas">{avgRating}</p>
                <StarDisplay rating={5} size={16}/>
                <p className="text-xs text-pp-muted mt-1">{reviews.length} ביקורות</p>
              </div>
              {[5,4,3].map(stars => {
                const count = reviews.filter(r=>r.rating===stars).length;
                const pct = (count/reviews.length)*100;
                return (
                  <div key={stars} className="flex items-center gap-2 text-xs text-pp-muted">
                    <span>{stars}★</span>
                    <div className="w-24 h-1.5 rounded-full bg-pp-border overflow-hidden">
                      <div className="h-full rounded-full bg-pp-orange transition-all" style={{width:`${pct}%`}}/>
                    </div>
                    <span>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Reviews grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {reviews.map((r, i) => (
            <ScrollReveal key={r.id} className={`reveal-d${(i%4)+1}`}>
              <div className="rounded-3xl p-6 bg-white border border-pp-border hover:border-pp-red/25 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 font-black text-white text-sm"
                      style={{background:"#C62828"}}>
                      {r.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-pp-dark">{r.name}</p>
                        {r.verified && (
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-label="רכישה מאומתת">
                            <circle cx="6.5" cy="6.5" r="6.5" fill="#2E7D32"/>
                            <path d="M3.5 6.5L5.5 8.5L9.5 4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <p className="text-[10px] text-pp-muted">{r.date}</p>
                    </div>
                  </div>
                  <StarDisplay rating={r.rating} size={12}/>
                </div>
                <p className="text-sm text-pp-muted leading-relaxed">&quot;{r.text}&quot;</p>
                <div className="mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold"
                  style={{background:"rgba(198,40,40,0.07)",color:"#C62828"}}>
                  {r.item}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Write review */}
        <div className="text-center">
          {submitted && (
            <p className="text-sm text-pp-green font-bold mb-4" style={{color:"#2E7D32"}}>
              תודה! הביקורת שלך נוספה ✓
            </p>
          )}
          {!showForm ? (
            <button onClick={()=>setShowForm(true)} className="btn-primary px-8 py-3 text-sm tracking-widest">
              כתוב ביקורת
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto rounded-3xl p-6 bg-white border border-pp-border text-right space-y-4">
              <h3 className="font-black text-xl text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>שתף את החוויה שלך</h3>
              <div>
                <label className="text-xs text-pp-muted block mb-1.5">דירוג</label>
                <StarPicker value={form.rating} onChange={n=>setForm(p=>({...p,rating:n}))}/>
              </div>
              <input required value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}
                placeholder="שמך"
                className="w-full rounded-xl border border-pp-border px-4 py-3 text-sm text-pp-dark outline-none focus:border-pp-red transition-colors"/>
              <input value={form.item} onChange={e=>setForm(p=>({...p,item:e.target.value}))}
                placeholder="מה הזמנת? (אופציונלי)"
                className="w-full rounded-xl border border-pp-border px-4 py-3 text-sm text-pp-dark outline-none focus:border-pp-red transition-colors"/>
              <textarea required rows={3} value={form.text} onChange={e=>setForm(p=>({...p,text:e.target.value}))}
                placeholder="ספר לנו על החוויה שלך..."
                className="w-full rounded-xl border border-pp-border px-4 py-3 text-sm text-pp-dark outline-none focus:border-pp-red transition-colors resize-none"/>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1 py-3 text-xs tracking-widest">פרסם</button>
                <button type="button" onClick={()=>setShowForm(false)}
                  className="rounded-2xl border border-pp-border px-4 py-3 text-xs text-pp-muted hover:text-pp-dark transition-colors">
                  ביטול
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
