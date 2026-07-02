"use client";

import { useState, useEffect, useCallback } from "react";

interface OrderModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type OrderType = "delivery" | "pickup" | "dine-in" | null;
type Step = "type" | "form" | "success";

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 12; h <= 23; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 23) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  slots.push("23:30");
  return slots;
}

const TIME_SLOTS = generateTimeSlots();
const PARTY_SIZES = Array.from({ length: 10 }, (_, i) => i + 1);

export function OrderModal({ open, setOpen }: OrderModalProps) {
  const [step, setStep] = useState<Step>("type");
  const [orderType, setOrderType] = useState<OrderType>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: TIME_SLOTS[2] ?? "12:00",
    date: "",
    partySize: 2,
  });
  const [submitting, setSubmitting] = useState(false);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    // Reset after animation
    setTimeout(() => {
      setStep("type");
      setOrderType(null);
      setForm({ name: "", phone: "", time: TIME_SLOTS[2] ?? "12:00", date: "", partySize: 2 });
      setSubmitting(false);
    }, 300);
  }, [setOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  const handleTypeSelect = (type: OrderType) => {
    setOrderType(type);
    if (type === "delivery") {
      window.open("https://order.plweb.online/wl/629098#!/rest/629098/menu", "_blank", "noopener,noreferrer");
      close();
    } else {
      setStep("form");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setStep("success");
    }, 1200);
  };

  const handleField = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-lg rounded-3xl bg-pp-card shadow-2xl overflow-hidden"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="bg-pp-red px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {step === "type" && "בחר סוג הזמנה"}
                {step === "form" && orderType === "pickup" && "פרטי איסוף עצמי"}
                {step === "form" && orderType === "dine-in" && "הזמנת מקום"}
                {step === "success" && "ההזמנה נשלחה! 🎉"}
              </h2>
              <p className="mt-0.5 text-sm text-white/80">פארקו פיצה — קריית ים</p>
            </div>
            <button
              onClick={close}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
              aria-label="סגור"
            >
              ✕
            </button>
          </div>
          {/* Step indicator */}
          {step !== "success" && (
            <div className="mt-4 flex gap-2">
              {["type", "form"].map((s, i) => (
                <div
                  key={s}
                  className="h-1 flex-1 rounded-full transition-all"
                  style={{
                    background:
                      (step === "type" && i === 0) ||
                      (step === "form" && i <= 1)
                        ? "white"
                        : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Step 1: Type Selection */}
        {step === "type" && (
          <div className="p-6 space-y-3">
            {[
              { type: "delivery" as const,  icon: "🛵", title: "משלוח",        sub: "הביתה תוך 45 דק׳" },
              { type: "pickup" as const,    icon: "🏃", title: "איסוף עצמי",   sub: "מוכן ומחכה לך" },
              { type: "dine-in" as const,   icon: "🪑", title: "ישיבה במקום",  sub: "שמרו מקום לשולחן" },
            ].map((opt) => (
              <button
                key={opt.type}
                onClick={() => handleTypeSelect(opt.type)}
                className="w-full flex items-center gap-4 rounded-2xl border-2 border-pp-border p-5 text-right transition-all hover:border-pp-red hover:bg-pp-surface group"
              >
                <span className="text-4xl">{opt.icon}</span>
                <div className="flex-1">
                  <p className="text-lg font-bold text-pp-dark group-hover:text-pp-red transition-colors">
                    {opt.title}
                  </p>
                  <p className="text-sm text-pp-muted">{opt.sub}</p>
                </div>
                <svg className="h-5 w-5 text-pp-muted group-hover:text-pp-red transition-colors rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-pp-dark">שם מלא</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleField("name", e.target.value)}
                placeholder="שם פרטי ומשפחה"
                className="w-full rounded-xl border-2 border-pp-border bg-pp-surface px-4 py-3 text-pp-dark placeholder:text-pp-muted/60 outline-none transition-colors focus:border-pp-red"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-pp-dark">מספר טלפון</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => handleField("phone", e.target.value)}
                placeholder="050-1234567"
                dir="ltr"
                className="w-full rounded-xl border-2 border-pp-border bg-pp-surface px-4 py-3 text-pp-dark placeholder:text-pp-muted/60 outline-none transition-colors focus:border-pp-red text-right"
              />
            </div>

            {/* Dine-in: Date + Party size */}
            {orderType === "dine-in" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-pp-dark">תאריך</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleField("date", e.target.value)}
                    className="w-full rounded-xl border-2 border-pp-border bg-pp-surface px-4 py-3 text-pp-dark outline-none transition-colors focus:border-pp-red"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-pp-dark">מספר סועדים</label>
                  <select
                    value={form.partySize}
                    onChange={(e) => handleField("partySize", Number(e.target.value))}
                    className="w-full rounded-xl border-2 border-pp-border bg-pp-surface px-4 py-3 text-pp-dark outline-none transition-colors focus:border-pp-red"
                  >
                    {PARTY_SIZES.map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "סועד" : "סועדים"}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Time */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-pp-dark">שעה</label>
              <select
                value={form.time}
                onChange={(e) => handleField("time", e.target.value)}
                className="w-full rounded-xl border-2 border-pp-border bg-pp-surface px-4 py-3 text-pp-dark outline-none transition-colors focus:border-pp-red"
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("type")}
                className="flex-1 rounded-xl border-2 border-pp-border py-3 text-sm font-semibold text-pp-muted transition-colors hover:border-pp-red hover:text-pp-red"
              >
                חזרה
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1 py-3 text-sm tracking-wide disabled:opacity-70"
              >
                {submitting ? "שולח..." : "שלח הזמנה"}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pp-green/10">
              <svg className="h-10 w-10 text-pp-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-pp-dark">תודה, {form.name || "יקר/ה"}!</h3>
            <p className="mt-3 text-pp-muted leading-relaxed">
              קיבלנו את הבקשה שלך. ניצור עמך קשר בקרוב לאישור ה
              {orderType === "pickup" ? "איסוף" : orderType === "dine-in" ? "מקום" : "הזמנה"}.
            </p>
            <a
              href="tel:046778900"
              className="mt-4 block text-2xl font-bold text-pp-red hover:text-pp-dark transition-colors"
              dir="ltr"
            >
              04-6778900
            </a>
            <button
              onClick={close}
              className="btn-primary mt-6 px-8 py-3 text-sm tracking-widest uppercase"
            >
              סגור
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
