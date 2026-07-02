"use client";

import { useState, useEffect, useCallback } from "react";

interface A11yState {
  fontSize: 0 | 1 | 2;
  contrast: boolean;
  grayscale: boolean;
  links: boolean;
  noAnim: boolean;
  bigCursor: boolean;
  readableFont: boolean;
}

const DEFAULTS: A11yState = {
  fontSize: 0,
  contrast: false,
  grayscale: false,
  links: false,
  noAnim: false,
  bigCursor: false,
  readableFont: false,
};

function applyState(s: A11yState) {
  const root = document.documentElement;
  root.classList.toggle("a11y-font-lg", s.fontSize === 1);
  root.classList.toggle("a11y-font-xl", s.fontSize === 2);
  root.classList.toggle("a11y-contrast", s.contrast);
  root.classList.toggle("a11y-grayscale", s.grayscale);
  root.classList.toggle("a11y-links", s.links);
  root.classList.toggle("a11y-no-anim", s.noAnim);
  root.classList.toggle("a11y-big-cursor", s.bigCursor);
  root.classList.toggle("a11y-readable", s.readableFont);
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULTS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("a11y");
      if (saved) {
        const parsed = JSON.parse(saved) as A11yState;
        setState(parsed);
        applyState(parsed);
      }
    } catch {}
  }, []);

  const update = useCallback((patch: Partial<A11yState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      applyState(next);
      try { localStorage.setItem("a11y", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULTS);
    applyState(DEFAULTS);
    try { localStorage.removeItem("a11y"); } catch {}
  }, []);

  const fontLabel = state.fontSize === 0 ? "רגיל" : state.fontSize === 1 ? "גדול" : "גדול מאוד";

  return (
    <>
      {/* Floating trigger button — same size + position as AI chat, stacked above it */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[88px] left-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-white"
        style={{ background: "#0057B8" }}
        aria-label="פתח תפריט נגישות"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {/* Classic ISA — International Symbol of Access */}
        <svg width="30" height="30" viewBox="0 0 100 110" fill="white" aria-hidden="true">
          {/* Head */}
          <circle cx="68" cy="10" r="10" />
          {/* Torso leaning forward */}
          <line x1="63" y1="21" x2="53" y2="48" stroke="white" strokeWidth="8" strokeLinecap="round" />
          {/* Arm extended forward */}
          <line x1="60" y1="31" x2="82" y2="24" stroke="white" strokeWidth="7" strokeLinecap="round" />
          {/* Forearm angled */}
          <line x1="82" y1="24" x2="88" y2="36" stroke="white" strokeWidth="7" strokeLinecap="round" />
          {/* Seat */}
          <line x1="53" y1="48" x2="74" y2="48" stroke="white" strokeWidth="8" strokeLinecap="round" />
          {/* Lower leg */}
          <line x1="74" y1="48" x2="79" y2="67" stroke="white" strokeWidth="7" strokeLinecap="round" />
          {/* Footrest */}
          <line x1="66" y1="67" x2="81" y2="67" stroke="white" strokeWidth="7" strokeLinecap="round" />
          {/* Rear wheel (large — dominant feature) */}
          <circle cx="36" cy="78" r="22" fill="none" stroke="white" strokeWidth="8" />
          {/* Front caster (small) */}
          <circle cx="80" cy="75" r="7" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="תפריט נגישות"
          aria-modal="false"
          className="fixed bottom-[154px] left-4 z-[9998] w-72 rounded-2xl border border-white/10 shadow-2xl"
          style={{ background: "#1C1C1C", color: "white" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wide" style={{ fontFamily: "var(--font-rubik)" }}>כלי נגישות</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-white/60 hover:text-white transition-colors"
              aria-label="סגור תפריט נגישות"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Controls */}
          <div className="p-3 space-y-1">

            {/* Font size */}
            <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><text x="1" y="14" fontSize="10" fill="white" fontWeight="bold">A</text><text x="9" y="16" fontSize="13" fill="white" fontWeight="bold">A</text></svg>
                <span className="text-sm text-white/80">גודל טקסט</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => update({ fontSize: Math.max(0, state.fontSize - 1) as 0|1|2 })}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white text-lg leading-none transition-colors"
                  aria-label="הקטן טקסט"
                  disabled={state.fontSize === 0}
                >−</button>
                <span className="text-xs text-white/50 w-14 text-center">{fontLabel}</span>
                <button
                  onClick={() => update({ fontSize: Math.min(2, state.fontSize + 1) as 0|1|2 })}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white text-lg leading-none transition-colors"
                  aria-label="הגדל טקסט"
                  disabled={state.fontSize === 2}
                >+</button>
              </div>
            </div>

            {[
              {
                key: "contrast" as const,
                label: "ניגודיות גבוהה",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.4"/><path d="M9 1.5 A7.5 7.5 0 0 1 9 16.5 Z" fill="white"/></svg>,
              },
              {
                key: "grayscale" as const,
                label: "גווני אפור",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.4" fill="none"/><circle cx="9" cy="9" r="4" fill="white" fillOpacity="0.5"/></svg>,
              },
              {
                key: "links" as const,
                label: "הדגשת קישורים",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 11 L5.5 12.5 Q3.5 14.5 3.5 12 Q3.5 9.5 5.5 9.5 L8 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 7 L12.5 5.5 Q14.5 3.5 14.5 6 Q14.5 8.5 12.5 8.5 L10 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="7.5" y1="10.5" x2="10.5" y2="7.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>,
              },
              {
                key: "noAnim" as const,
                label: "עצירת אנימציות",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="4" y="4" width="4" height="10" rx="1" fill="white" fillOpacity="0.8"/><rect x="10" y="4" width="4" height="10" rx="1" fill="white" fillOpacity="0.8"/></svg>,
              },
              {
                key: "bigCursor" as const,
                label: "סמן גדול",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 3 L4 14 L7.5 11 L9.5 15.5 L11.5 14.5 L9.5 10 L14 10 Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" fill="white" fillOpacity="0.2"/></svg>,
              },
              {
                key: "readableFont" as const,
                label: "פונט קריא",
                icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><text x="2" y="13" fontSize="12" fill="white" fontFamily="serif" fontWeight="bold">Aa</text></svg>,
              },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => update({ [key]: !state[key] })}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${state[key] ? "bg-white/15" : "hover:bg-white/5"}`}
                aria-pressed={state[key]}
              >
                <div className="flex items-center gap-2.5">
                  {icon}
                  <span className="text-sm text-white/80">{label}</span>
                </div>
                <div className={`w-9 h-5 rounded-full transition-colors relative ${state[key] ? "bg-pp-green" : "bg-white/20"}`}
                  style={{ background: state[key] ? "#2E7D32" : undefined }}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${state[key] ? "translate-x-0.5" : "translate-x-4"}`} />
                </div>
              </button>
            ))}

          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between">
            <a href="/accessibility" className="text-[11px] text-white/40 hover:text-white/70 transition-colors underline underline-offset-2">
              הצהרת נגישות
            </a>
            <button
              onClick={reset}
              className="text-[11px] text-white/50 hover:text-white transition-colors"
            >
              איפוס הכל
            </button>
          </div>
        </div>
      )}
    </>
  );
}
