"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => { localStorage.setItem("cookie_consent", "accepted"); setVisible(false); };
  const decline = () => { localStorage.setItem("cookie_consent", "declined"); setVisible(false); };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-brand-gold/40 bg-[#fafaf8]/97 backdrop-blur-md"
      style={{ animation: "fadeUp 0.4s ease forwards" }}
    >
      {/* Gold top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-brand-gold/60" />

      <div className="mx-auto max-w-4xl px-6 py-6 text-center">
        <p className="text-[10px] tracking-[0.35em] text-brand-gold uppercase mb-3">
          מדיניות Cookie
        </p>

        <p className="text-sm leading-7 text-brand-cream">
          כדי לתת לך את החוויה הטובה ביותר, אנחנו משתמשים בעוגיות ובכלים כמו{" "}
          <span className="text-brand-gold font-semibold">Google Analytics</span> ו-<span className="text-brand-gold font-semibold">Facebook Pixel</span>.
          {" "}זה עוזר לנו להבין איך אתה משתמש באתר ולהציג לך תוכן רלוונטי.{" "}
          <a href="/privacy" className="text-brand-gold underline underline-offset-2 hover:opacity-80 transition-opacity">
            מדיניות פרטיות
          </a>
        </p>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={accept}
            className="bg-brand-gold px-8 py-2.5 text-xs font-bold tracking-widest text-brand-dark uppercase transition-opacity hover:opacity-85"
          >
            מאשר
          </button>
          <button
            onClick={decline}
            className="border border-brand-border px-8 py-2.5 text-xs font-bold tracking-widest text-brand-muted uppercase transition-colors hover:border-brand-gold/40 hover:text-brand-cream"
          >
            לא מאשר
          </button>
        </div>
      </div>
    </div>
  );
}
