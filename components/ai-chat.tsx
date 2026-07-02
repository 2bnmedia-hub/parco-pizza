"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Pizza {
  name: string;
  price: number;
  sauce: string;
  toppings: string[];
  spicy: boolean;
  cream: boolean;
}

const MENU: { pizzas: Pizza[] } = {
  pizzas: [
    { name: "פיצת שף",    price: 65, sauce: "none",        toppings: ["קונפי שרי תמר", "פסטו", "פרמז'ן"],         spicy: false, cream: false },
    { name: "פיצת ורונה", price: 65, sauce: "cream",       toppings: ["תפוחי אדמה", "עירית", "פרמז'ן"],           spicy: false, cream: true  },
    { name: "פיצה מילאנו",price: 65, sauce: "tomato",      toppings: ["עגבניות מיובשות", "טונה", "בצל מקורמל"],   spicy: false, cream: false },
    { name: "פיצה יוונית",price: 65, sauce: "tomato",      toppings: ["בולגרית", "בצל סגול", "זיתי קלמטה"],       spicy: false, cream: false },
    { name: "פיצה לבנה",  price: 60, sauce: "cream",       toppings: ["גבינת מיקס"],                              spicy: false, cream: true  },
    { name: "פיצה רוזה",  price: 60, sauce: "rosa",        toppings: ["מיקס גבינות", "פרמז'ן"],                  spicy: false, cream: true  },
    { name: "פיצה פסטו",  price: 60, sauce: "pesto-cream", toppings: ["נגיעות פסטו", "פרמז'ן"],                  spicy: false, cream: true  },
    { name: "פיצה חריפה", price: 60, sauce: "tomato",      toppings: ["פלפל חריף", "שיפקה", "צ'ילי גרוס"],       spicy: true,  cream: false },
    { name: "מרגריטה",    price: 50, sauce: "tomato",      toppings: ["מיקס איטלקי"],                             spicy: false, cream: false },
  ],
};

type Step = 0 | 1 | 2 | 3 | 4;

interface Message {
  from: "bot" | "user";
  text: string;
  buttons?: { label: string; icon?: React.ReactNode }[];
  pizzas?: Pizza[];
}

interface Prefs {
  spicy: "none" | "little" | "lots" | null;
  sauce: "tomato" | "cream" | "pesto" | "any" | null;
  extras: "veggies" | "tuna" | "cheese" | "classic" | null;
}

/* ── SVG icons for buttons ───────────────────────────── */
function IconSpice({ level }: { level: "none" | "low" | "high" }) {
  if (level === "none") return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
  );
  if (level === "low") return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2C7 2 4 5 4 8a3 3 0 0 0 6 0c0-3-3-6-3-6z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C7 1 3 5 3 8.5a4 4 0 0 0 8 0C11 5 7 1 7 1z" stroke="currentColor" strokeWidth="1.2" fill="rgba(198,40,40,0.2)"/><path d="M7 5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
  );
}

function IconTomato() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 3.5C7 3.5 6 2 7 1s2.5 1 2.5 1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none"/></svg>;
}

function IconCream() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 10 Q3 6 7 6 Q11 6 11 10 H3Z" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M5 6 Q5 3 7 3 Q9 3 9 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/></svg>;
}

function IconBasil() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12 C7 12 2 9 2 5 C2 3 3.5 2 5 2.5 C5.5 1.5 6.5 1 7 1 C7.5 1 8.5 1.5 9 2.5 C10.5 2 12 3 12 5 C12 9 7 12 7 12Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(46,125,50,0.2)"/><path d="M7 12 V6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>;
}

function IconFish() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7 C2 7 4 4 7 4 S12 6 12 7 S10 10 7 10 S2 7 2 7Z" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="9" cy="7" r="0.8" fill="currentColor"/></svg>;
}

function IconCheese() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10 L7 4 L12 10 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="6" cy="8" r="0.7" fill="currentColor"/><circle cx="9" cy="8.5" r="0.6" fill="currentColor"/></svg>;
}

function IconOrder() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 3V2.5C5 1.7 5.7 1 6.5 1h1C8.3 1 9 1.7 9 2.5V3" stroke="currentColor" strokeWidth="1.1"/><path d="M5 7h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
}

function IconRefresh() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7A4 4 0 1 1 7 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M7 1v3l2-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function IconMenu() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}

/* ── Marco avatar ─────────────────────────────────────── */
function MarcoAvatar() {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-inner"
      style={{ background: "linear-gradient(135deg, #2E7D32, #1b5e20)" }}
      aria-hidden="true"
    >
      {/* Chat bubble + sparkle — clear AI chat indicator */}
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        {/* Speech bubble body */}
        <path d="M3 5 C3 3.9 3.9 3 5 3 H21 C22.1 3 23 3.9 23 5 V15 C23 16.1 22.1 17 21 17 H14 L10 22 V17 H5 C3.9 17 3 16.1 3 15 Z"
          fill="white" opacity="0.95"/>
        {/* Sparkle star top-right inside bubble */}
        <path d="M18 6.5 L18.6 8.2 L20.3 8.8 L18.6 9.4 L18 11.1 L17.4 9.4 L15.7 8.8 L17.4 8.2 Z"
          fill="#2E7D32"/>
        {/* Two small dots — typing dots */}
        <circle cx="8.5" cy="12" r="1.4" fill="#2E7D32"/>
        <circle cx="12" cy="12" r="1.4" fill="#2E7D32"/>
      </svg>
    </div>
  );
}

const INITIAL_MESSAGES: Message[] = [
  {
    from: "bot",
    text: "שלום! אני מארקו, הסייען הפיצאיולי של פארקו. בוא נמצא את הפיצה המושלמת בשבילך!",
    buttons: [
      { label: "בואו נתחיל", icon: <IconBasil /> },
      { label: "קח אותי לתפריט", icon: <IconMenu /> },
    ],
  },
];

function scorePizza(pizza: Pizza, prefs: Prefs): number {
  let score = 0;
  if (prefs.spicy === "none" && !pizza.spicy) score += 3;
  if (prefs.spicy === "lots" && pizza.spicy) score += 3;
  if (prefs.spicy === "little") score += 1;
  if (prefs.sauce === "tomato" && pizza.sauce.includes("tomato")) score += 3;
  if (prefs.sauce === "cream" && pizza.cream) score += 3;
  if (prefs.sauce === "pesto" && pizza.sauce.includes("pesto")) score += 3;
  if (prefs.sauce === "any") score += 1;
  const tops = pizza.toppings.join(" ");
  if (prefs.extras === "tuna" && tops.includes("טונה")) score += 3;
  if (prefs.extras === "cheese" && pizza.cream) score += 2;
  if (prefs.extras === "veggies" && (tops.includes("עגבניות") || tops.includes("זיתי") || tops.includes("פסטו"))) score += 2;
  if (prefs.extras === "classic" && pizza.sauce === "tomato" && !pizza.spicy) score += 2;
  return score;
}

function getRecommendations(prefs: Prefs): Pizza[] {
  return [...MENU.pizzas]
    .map((p) => ({ pizza: p, score: scorePizza(p, prefs) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.pizza);
}

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [step, setStep] = useState<Step>(0);
  const [prefs, setPrefs] = useState<Prefs>({ spicy: null, sauce: null, extras: null });
  const messagesRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  /* ── Drag state ─────────────────────────────────────────── */
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ ox: 0, oy: 0 });

  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const panel = chatPanelRef.current;
    if (!panel) return;
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0]!.clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0]!.clientY : e.clientY;
    const rect = panel.getBoundingClientRect();
    dragOffset.current = { ox: clientX - rect.left, oy: clientY - rect.top };
    isDragging.current = true;
    /* snapshot current position so we switch from bottom/left CSS to top/left px */
    setPos({ x: rect.left, y: rect.top });
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = "touches" in e ? (e as TouchEvent).touches[0]!.clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? (e as TouchEvent).touches[0]!.clientY : (e as MouseEvent).clientY;
      const panel = chatPanelRef.current;
      const pw = panel?.offsetWidth ?? 384;
      const ph = panel?.offsetHeight ?? 500;
      const rawX = clientX - dragOffset.current.ox;
      const rawY = clientY - dragOffset.current.oy;
      const clampedX = Math.max(0, Math.min(window.innerWidth - pw, rawX));
      const clampedY = Math.max(0, Math.min(window.innerHeight - ph, rawY));
      setPos({ x: clampedX, y: clampedY });
    };
    const onUp = () => { isDragging.current = false; };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    };
  }, []);

  /* Reset position when closed */
  const handleClose = useCallback(() => {
    setOpen(false);
    setPos(null);
  }, []);

  /* Scroll to bottom of messages */
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }, 80);
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, scrollToBottom]);

  /* Focus last message for screen readers */
  useEffect(() => {
    if (open && lastMessageRef.current) {
      lastMessageRef.current.focus();
    }
  }, [messages.length, open]);

  const addBotMessage = useCallback((msg: Omit<Message, "from">) => {
    setMessages((prev) => [...prev, { from: "bot", ...msg }]);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { from: "user", text }]);
  }, []);

  const handleButton = useCallback(
    (label: string) => {
      addUserMessage(label);

      if (step === 0) {
        if (label === "קח אותי לתפריט") {
          window.location.href = "/#menu";
          setOpen(false);
          return;
        }
        setStep(1);
        setTimeout(() => {
          addBotMessage({
            text: "כמה חריף אתה אוהב?",
            buttons: [
              { label: "בכלל לא", icon: <IconSpice level="none" /> },
              { label: "קצת חריף", icon: <IconSpice level="low" /> },
              { label: "חריף ממש", icon: <IconSpice level="high" /> },
            ],
          });
        }, 400);
        return;
      }

      if (step === 1) {
        const map: Record<string, Prefs["spicy"]> = {
          "בכלל לא": "none",
          "קצת חריף": "little",
          "חריף ממש": "lots",
        };
        const spicy = map[label] ?? "none";
        setPrefs((p) => ({ ...p, spicy }));
        setStep(2);
        setTimeout(() => {
          addBotMessage({
            text: "עם איזה רוטב?",
            buttons: [
              { label: "עגבניות", icon: <IconTomato /> },
              { label: "שמנת", icon: <IconCream /> },
              { label: "פסטו", icon: <IconBasil /> },
              { label: "לא משנה" },
            ],
          });
        }, 400);
        return;
      }

      if (step === 2) {
        const map: Record<string, Prefs["sauce"]> = {
          "עגבניות": "tomato",
          "שמנת": "cream",
          "פסטו": "pesto",
          "לא משנה": "any",
        };
        const sauce = map[label] ?? "any";
        setPrefs((p) => ({ ...p, sauce }));
        setStep(3);
        setTimeout(() => {
          addBotMessage({
            text: "יש משהו שאתה אוהב במיוחד?",
            buttons: [
              { label: "ירקות", icon: <IconBasil /> },
              { label: "טונה", icon: <IconFish /> },
              { label: "גבינות הרבה", icon: <IconCheese /> },
              { label: "פשוט קלאסי" },
            ],
          });
        }, 400);
        return;
      }

      if (step === 3) {
        const map: Record<string, Prefs["extras"]> = {
          "ירקות": "veggies",
          "טונה": "tuna",
          "גבינות הרבה": "cheese",
          "פשוט קלאסי": "classic",
        };
        const extras = map[label] ?? "classic";
        const newPrefs: Prefs = { ...prefs, extras };
        setPrefs(newPrefs);
        setStep(4);
        const recs = getRecommendations(newPrefs);
        setTimeout(() => {
          addBotMessage({
            text: "מצוין! הנה ההמלצות שלי בשבילך:",
            pizzas: recs,
            buttons: [
              { label: "הזמינו עכשיו", icon: <IconOrder /> },
              { label: "נסה שוב", icon: <IconRefresh /> },
            ],
          });
        }, 600);
        return;
      }

      if (step === 4) {
        if (label === "הזמינו עכשיו") {
          window.open("https://order.plweb.online/wl/629098#!/rest/629098/menu", "_blank", "noopener,noreferrer");
          setOpen(false);
          return;
        }
        setStep(0);
        setPrefs({ spicy: null, sauce: null, extras: null });
        setMessages(INITIAL_MESSAGES);
        return;
      }
    },
    [step, prefs, addUserMessage, addBotMessage],
  );

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-4 left-4 z-50 group">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "סגור צ'אט עם מארקו" : "פתח צ'אט עם מארקו"}
          aria-expanded={open}
          aria-controls="marco-chat-panel"
          className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pp-red"
          style={{
            background: open
              ? "linear-gradient(135deg, #2B2B2B, #2D0A05)"
              : "linear-gradient(135deg, #2E7D32, #1b5e20)",
            boxShadow: open
              ? "0 4px 20px rgba(26,8,6,0.4)"
              : "0 4px 20px rgba(46,125,50,0.5)",
          }}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4L14 14M14 4L4 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <MarcoAvatar />
          )}
          {!open && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ background: "#2E7D32" }}
              aria-hidden="true"
            />
          )}
        </button>
        {!open && (
          <div
            className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-pp-dark px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
            role="tooltip"
          >
            צ&apos;אט עם מארקו
          </div>
        )}
      </div>

      {/* Chat panel — draggable */}
      {open && (
        <div
          id="marco-chat-panel"
          ref={chatPanelRef}
          role="dialog"
          aria-label="צ'אט עם מארקו — הסייען הפיצאיולי"
          aria-modal="false"
          className="fixed z-50 flex flex-col rounded-3xl shadow-2xl"
          style={
            pos
              ? {
                  left: pos.x,
                  top: pos.y,
                  width: "min(22rem, calc(100vw - 3rem))",
                  height: "min(500px, calc(100dvh - 40px))",
                  animation: "none",
                }
              : {
                  bottom: "6rem",
                  left: "1.5rem",
                  width: "min(22rem, calc(100vw - 3rem))",
                  height: "min(500px, calc(100dvh - 120px))",
                  animation: "fadeUp 0.3s ease forwards",
                }
          }
        >
          {/* Header — drag handle */}
          <div
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="flex items-center gap-3 px-4 py-3.5 text-white shrink-0 rounded-t-3xl select-none"
            style={{
              background: "linear-gradient(135deg, #2E7D32, #1b5e20)",
              cursor: isDragging.current ? "grabbing" : "grab",
            }}
            aria-label="גרור להזזת הצ'אט"
          >
            {/* Drag indicator */}
            <div className="shrink-0 opacity-50" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="5" cy="4" r="1.3" fill="white"/>
                <circle cx="11" cy="4" r="1.3" fill="white"/>
                <circle cx="5" cy="8" r="1.3" fill="white"/>
                <circle cx="11" cy="8" r="1.3" fill="white"/>
                <circle cx="5" cy="12" r="1.3" fill="white"/>
                <circle cx="11" cy="12" r="1.3" fill="white"/>
              </svg>
            </div>
            <MarcoAvatar />
            <div className="flex-1 min-w-0">
              <p className="font-black text-base leading-tight" style={{ fontFamily: "var(--font-rubik)" }}>
                מארקו
              </p>
              <p className="text-xs text-white/70">הסייען הפיצאיולי שלך</p>
            </div>
            <button
              onClick={handleClose}
              onMouseDown={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white shrink-0"
              aria-label="סגור צ'אט"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2L10 10M10 2L2 10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages — scrollable */}
          <div
            ref={messagesRef}
            role="log"
            aria-label="שיחה עם מארקו"
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 min-h-0 overflow-y-auto bg-pp-surface p-4 space-y-3"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(46,125,50,0.3) transparent" }}
          >
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              return (
                <div
                  key={i}
                  ref={isLast ? lastMessageRef : undefined}
                  tabIndex={isLast ? -1 : undefined}
                  className={`flex flex-col gap-2 ${msg.from === "user" ? "items-end" : "items-start"}`}
                >
                  {/* Bot avatar for bot messages */}
                  {msg.from === "bot" && i > 0 && (
                    <div className="flex items-center gap-1.5">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full shrink-0"
                        style={{ background: "linear-gradient(135deg, #2E7D32, #1b5e20)" }}
                        aria-hidden="true"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M6 14h12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4z" fill="white"/>
                          <path d="M9 14V10A3 3 0 0 1 6 7 A3 3 0 0 1 9 4C9.5 2.8 10.7 2 12 2C13.3 2 14.5 2.8 15 4A3 3 0 0 1 18 7A3 3 0 0 1 15 10V14" fill="white"/>
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-pp-muted">מארקו</span>
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-pp-red text-white rounded-tl-sm"
                        : "bg-white text-pp-dark shadow-sm rounded-tr-sm border border-pp-border/40"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Pizza recommendation cards */}
                  {msg.pizzas && msg.pizzas.length > 0 && (
                    <div className="w-full space-y-2" role="list" aria-label="פיצות מומלצות">
                      {msg.pizzas.map((pizza) => (
                        <div
                          key={pizza.name}
                          role="listitem"
                          className="rounded-2xl border border-pp-border bg-white p-3 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-black text-pp-dark text-sm" style={{ fontFamily: "var(--font-rubik)" }}>
                                {pizza.name}
                              </p>
                              <p className="text-xs text-pp-muted mt-0.5">
                                {pizza.toppings.join(", ")}
                              </p>
                            </div>
                            <span className="shrink-0 text-sm font-black text-pp-red">₪{pizza.price}</span>
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {pizza.spicy && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-pp-red/10 px-2 py-0.5 text-[10px] font-semibold text-pp-red">
                                <IconSpice level="high" /> חריף
                              </span>
                            )}
                            {pizza.cream && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-pp-orange/10 px-2 py-0.5 text-[10px] font-semibold text-pp-orange">
                                <IconCream /> שמנת
                              </span>
                            )}
                            {pizza.sauce.includes("pesto") && (
                              <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "rgba(46,125,50,0.1)", color: "#2E7D32" }}>
                                <IconBasil /> פסטו
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  {msg.buttons && i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2" role="group" aria-label="אפשרויות תגובה">
                      {msg.buttons.map((btn) => (
                        <button
                          key={btn.label}
                          onClick={() => handleButton(btn.label)}
                          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-pp-red"
                          style={{
                            borderColor: "#2E7D32",
                            color: "#2E7D32",
                            background: "white",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#2E7D32";
                            (e.currentTarget as HTMLButtonElement).style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "white";
                            (e.currentTarget as HTMLButtonElement).style.color = "#2E7D32";
                          }}
                        >
                          {btn.icon}
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer bar */}
          <div
            className="shrink-0 flex items-center justify-between px-4 py-2.5 rounded-b-3xl border-t border-pp-border/30"
            style={{ background: "#FFF8E7" }}
          >
            <span className="text-[10px] text-pp-muted/60">
              מארקו — הסייען של פארקו פיצה
            </span>
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: "#2E7D32" }}
              title="מחובר"
              aria-label="מארקו מחובר"
            />
          </div>
        </div>
      )}
    </>
  );
}
