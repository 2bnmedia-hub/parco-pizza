"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

interface Member {
  firstName: string;
  email: string;
  phone: string;
  points: number;
  orders: number;
  joinDate: string;
}

const TIERS = [
  { id: "bronze", label: "ברונזה",   color: "#C4865A", bg: "#FFF0E0", min: 0,    max: 199,  perks: ["10% הנחה על ההזמנה הראשונה","בר הפתעה ביום הולדת","גישה למבצעים בלעדיים"] },
  { id: "silver", label: "כסף",      color: "#8A9BA8", bg: "#F0F5F8", min: 200,  max: 499,  perks: ["15% הנחה בכל הזמנה","קינוח חינם בכל הזמנה","הזמנה מוקדמת למבצעים"] },
  { id: "gold",   label: "זהב",      color: "#D4A017", bg: "#FFF8E0", min: 500,  max: 999,  perks: ["20% הנחה בכל הזמנה","פיצה אישית חינם בחודש","שליח עדיפות + כניסה לאירועים"] },
  { id: "vip",    label: "VIP",      color: "#E63946", bg: "#FFF0F1", min: 1000, max: 99999, perks: ["25% הנחה בכל הזמנה","ארוחה שלמה חינם כל חודש","שיחת וידאו עם השף + עדיפות בכל דבר"] },
];

const REWARDS = [
  { id: "r1", name: "לחם שום",          points: 50,  emoji: "🍞", category: "מנות" },
  { id: "r2", name: "שתייה קרה",         points: 40,  emoji: "🥤", category: "שתייה" },
  { id: "r3", name: "10% על הזמנה",     points: 80,  emoji: "🏷️", category: "הנחות" },
  { id: "r4", name: "פיצה אישית",        points: 150, emoji: "🍕", category: "מנות" },
  { id: "r5", name: "20% על הזמנה",     points: 200, emoji: "🎯", category: "הנחות" },
  { id: "r6", name: "ארוחה זוגית",       points: 350, emoji: "❤️", category: "מנות" },
];

function TierBadge({ tier }: { tier: typeof TIERS[number] }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black"
      style={{background: tier.bg, color: tier.color}}>
      <span className="h-2 w-2 rounded-full" style={{background: tier.color}}/>
      {tier.label}
    </span>
  );
}

function ProgressBar({ current, min, max, color }: {current:number;min:number;max:number;color:string}) {
  const pct = Math.min(100, ((current - min) / (max - min)) * 100);
  return (
    <div className="h-2 w-full rounded-full bg-pp-border overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{width:`${pct}%`, background:color}}/>
    </div>
  );
}

export default function LoyaltyPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [tab, setTab] = useState<"home"|"rewards"|"history">("home");
  const [form, setForm] = useState({ firstName:"", email:"", phone:"" });
  const [submitting, setSubmitting] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [redeemed, setRedeemed] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("parco_member");
    if (stored) setMember(JSON.parse(stored));
  }, []);

  const currentTier = TIERS.find(t => (member?.points ?? 0) >= t.min && (member?.points ?? 0) <= t.max) ?? TIERS[0]!;
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];

  const join = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const newMember: Member = {
        ...form,
        points: 50,
        orders: 0,
        joinDate: new Date().toLocaleDateString("he-IL"),
      };
      localStorage.setItem("parco_member", JSON.stringify(newMember));
      setMember(newMember);
      setSubmitting(false);
    }, 1000);
  };

  const logout = () => { localStorage.removeItem("parco_member"); setMember(null); };

  const redeem = (reward: typeof REWARDS[number]) => {
    if (!member || member.points < reward.points || redeemed.includes(reward.id)) return;
    const updated = { ...member, points: member.points - reward.points };
    localStorage.setItem("parco_member", JSON.stringify(updated));
    setMember(updated);
    setRedeemed(p => [...p, reward.id]);
  };

  /* ── Landing ── */
  if (!member) return (
    <div className="min-h-screen" style={{background:"#FFF9F5"}}>
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6 text-center" style={{background:"linear-gradient(135deg,#1A0806,#E63946)"}}>
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[600px] rounded-full" style={{background:"radial-gradient(circle,rgba(255,255,255,0.2),transparent 70%)"}}/>
          </div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-6xl mb-4">👑</div>
          <h1 className="font-black text-5xl md:text-7xl text-white leading-none" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
            מועדון VIP<br/>פארקו
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto">
            הצטרף לקהילת חברי הVIP שלנו וקבל הטבות בלעדיות, נקודות על כל הזמנה ועוד
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setShowLogin(false)} className="rounded-full px-8 py-4 text-sm font-black tracking-widest bg-white text-pp-red transition-all hover:bg-pp-yellow">
              הצטרף עכשיו — חינם
            </button>
            <button onClick={() => setShowLogin(true)} className="rounded-full px-8 py-4 text-sm font-black tracking-widest border-2 border-white text-white transition-all hover:bg-white/10">
              יש לי חשבון
            </button>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black text-3xl text-pp-dark text-center mb-12" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
            ארבעה דרגות — הטבות גדלות
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {TIERS.map(t => (
              <div key={t.id} className="rounded-3xl p-6 border-2 transition-all hover:shadow-md" style={{borderColor:t.color+"44",background:t.bg}}>
                <div className="h-10 w-10 rounded-full mb-4" style={{background:t.color}}/>
                <h3 className="font-black text-xl text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{t.label}</h3>
                <p className="text-xs text-pp-muted mt-1 mb-4">{t.min}–{t.max === 99999 ? "∞" : t.max} נקודות</p>
                <ul className="space-y-1.5">
                  {t.perks.map(p => (
                    <li key={p} className="flex items-start gap-2 text-xs text-pp-dark">
                      <svg width="12" height="12" viewBox="0 0 12 12" className="shrink-0 mt-0.5" fill="none">
                        <circle cx="6" cy="6" r="6" fill={t.color}/>
                        <path d="M3 6L5 8L9 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 px-6" style={{background:"linear-gradient(135deg,#E63946,#c42d38)"}}>
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-black text-3xl text-white mb-2" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
            {showLogin ? "כניסה לחשבון" : "הצטרף עכשיו"}
          </h2>
          <p className="text-white/60 text-sm mb-8">
            {showLogin ? "הכנס את הפרטים שלך" : "מצטרפים בחינם, מרוויחים מייד"}
          </p>
          <form onSubmit={join} className="space-y-3">
            {!showLogin && (
              <input required value={form.firstName} onChange={e=>setForm(p=>({...p,firstName:e.target.value}))}
                placeholder="שם פרטי"
                className="w-full rounded-2xl border-0 bg-white/20 px-5 py-3.5 text-center text-white placeholder:text-white/50 outline-none focus:bg-white/30 focus:ring-2 focus:ring-white/60 text-sm"/>
            )}
            <input required type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}
              placeholder="כתובת אימייל" dir="ltr"
              className="w-full rounded-2xl border-0 bg-white/20 px-5 py-3.5 text-center text-white placeholder:text-white/50 outline-none focus:bg-white/30 focus:ring-2 focus:ring-white/60 text-sm"/>
            <input required type="tel" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}
              placeholder="מספר טלפון" dir="ltr"
              className="w-full rounded-2xl border-0 bg-white/20 px-5 py-3.5 text-center text-white placeholder:text-white/50 outline-none focus:bg-white/30 focus:ring-2 focus:ring-white/60 text-sm"/>
            <button type="submit" disabled={submitting}
              className="w-full rounded-2xl bg-white px-8 py-4 font-black text-pp-red transition-all hover:bg-pp-yellow hover:text-pp-dark disabled:opacity-70 text-sm tracking-wide"
              style={{fontFamily:"var(--font-rubik)"}}>
              {submitting ? "רושמים אותך..." : showLogin ? "כניסה" : "הצטרף — קבל 50 נקודות מייד"}
            </button>
          </form>
          <button onClick={()=>setShowLogin(!showLogin)} className="mt-4 text-xs text-white/50 hover:text-white transition-colors">
            {showLogin ? "אין לי חשבון — הצטרפות" : "יש לי חשבון — כניסה"}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen" style={{background:"#FFF9F5"}}>
      <Nav />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-24">
        {/* Member header */}
        <div className="rounded-3xl p-8 mb-6 text-white" style={{background:`linear-gradient(135deg,${currentTier.color},${currentTier.color}bb)`}}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <TierBadge tier={currentTier}/>
              <h1 className="font-black text-3xl mt-2 text-white" style={{fontFamily:"var(--font-rubik)"}}>
                שלום, {member.firstName}!
              </h1>
              <p className="text-white/70 text-sm mt-1">חבר מ-{member.joinDate}</p>
            </div>
            <div className="text-center">
              <p className="font-black text-5xl font-bebas text-white">{member.points}</p>
              <p className="text-xs text-white/60 mt-1">נקודות</p>
            </div>
          </div>
          {nextTier && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                <span>נותרו {nextTier.min - member.points} נקודות לדרגת {nextTier.label}</span>
                <span>{member.points}/{nextTier.min}</span>
              </div>
              <ProgressBar current={member.points} min={currentTier.min} max={nextTier.min} color="rgba(255,255,255,0.9)"/>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "נקודות", value: member.points, suffix: "" },
            { label: "הזמנות", value: member.orders, suffix: "" },
            { label: "דרגה",   value: currentTier.label, suffix: "" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 bg-white border border-pp-border text-center">
              <p className="font-black text-2xl text-pp-dark font-bebas">{s.value}{s.suffix}</p>
              <p className="text-xs text-pp-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {([["home","ראשי"],["rewards","פרסים"],["history","היסטוריה"]] as const).map(([key,label]) => (
            <button key={key} onClick={()=>setTab(key)}
              className="rounded-full px-5 py-2 text-sm font-bold transition-all"
              style={{background:tab===key?"#E63946":"#F5EDE6",color:tab===key?"white":"#8B6347"}}>
              {label}
            </button>
          ))}
        </div>

        {/* Tab: Home */}
        {tab === "home" && (
          <div className="space-y-4">
            <div className="rounded-3xl p-6 bg-white border border-pp-border">
              <h2 className="font-black text-lg text-pp-dark mb-4" style={{fontFamily:"var(--font-rubik)"}}>ההטבות שלך כ-{currentTier.label}</h2>
              <ul className="space-y-3">
                {currentTier.perks.map(p => (
                  <li key={p} className="flex items-center gap-3 text-sm text-pp-dark">
                    <div className="h-7 w-7 rounded-full flex items-center justify-center shrink-0" style={{background:currentTier.color}}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L4.8 8.3L9.5 3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl p-6 bg-white border border-pp-border">
              <h2 className="font-black text-lg text-pp-dark mb-2" style={{fontFamily:"var(--font-rubik)"}}>קבל עוד נקודות</h2>
              <div className="space-y-3">
                {[
                  {action:"הזמן דרך האתר",points:10,desc:"לכל ₪1 בהזמנה"},
                  {action:"שתף עם חבר",points:50,desc:"לכל הפניה מוצלחת"},
                  {action:"כתוב ביקורת",points:20,desc:"עם תמונה +30"},
                  {action:"יום הולדת",points:100,desc:"מתנה שנתית"},
                ].map(item => (
                  <div key={item.action} className="flex items-center justify-between rounded-2xl p-4" style={{background:"#FFF0E4"}}>
                    <div>
                      <p className="font-bold text-sm text-pp-dark">{item.action}</p>
                      <p className="text-xs text-pp-muted">{item.desc}</p>
                    </div>
                    <span className="font-black text-pp-red text-sm">+{item.points} נק׳</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Rewards */}
        {tab === "rewards" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {REWARDS.map(r => {
              const canRedeem = member.points >= r.points;
              const isRedeemed = redeemed.includes(r.id);
              return (
                <div key={r.id} className="rounded-3xl p-5 bg-white border border-pp-border text-center">
                  <div className="text-4xl mb-3">{r.emoji}</div>
                  <p className="font-black text-sm text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{r.name}</p>
                  <p className="text-xs text-pp-muted mt-1">{r.category}</p>
                  <p className="font-black text-pp-red mt-2">{r.points} נק׳</p>
                  <button
                    onClick={() => redeem(r)}
                    disabled={!canRedeem || isRedeemed}
                    className="mt-3 w-full rounded-xl py-2.5 text-xs font-black tracking-wide transition-all"
                    style={{
                      background: isRedeemed ? "#2D6A4F" : canRedeem ? "#E63946" : "#F0D8C8",
                      color: isRedeemed || canRedeem ? "white" : "#C4A090",
                    }}>
                    {isRedeemed ? "✓ מומש" : canRedeem ? "מש עכשיו" : `חסרות ${r.points - member.points} נק׳`}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab: History */}
        {tab === "history" && (
          <div className="rounded-3xl p-8 bg-white border border-pp-border text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-black text-xl text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>
              טרם ביצעת הזמנות
            </h3>
            <p className="text-pp-muted text-sm mt-2">כל הזמנה שלך תופיע כאן עם הפרטים המלאים</p>
          </div>
        )}

        {/* Logout */}
        <button onClick={logout} className="mt-8 w-full text-xs text-pp-muted hover:text-pp-red transition-colors py-2">
          התנתק
        </button>
      </div>

      <Footer />
    </div>
  );
}
