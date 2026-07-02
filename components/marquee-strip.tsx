const ITEMS = [
  { text: "פיצה טרייה",          highlight: false },
  { text: "₪50 מרגריטה",         highlight: true  },
  { text: "מוכן מהלב",           highlight: false },
  { text: "פסטה ביתית",          highlight: false },
  { text: "כשר חלבי",            highlight: true  },
  { text: "קריית ים",            highlight: false },
  { text: "טרי כל יום",          highlight: false },
  { text: "₪65 פיצת שף",         highlight: true  },
  { text: "איכות ללא פשרות",     highlight: false },
  { text: "שלמות בכל ביס",       highlight: false },
  { text: "גבינות מובחרות",      highlight: true  },
  { text: "רכיבים טריים",        highlight: false },
  { text: "משלוח מהיר",          highlight: false },
  { text: "₪60 פיצה לבנה",       highlight: true  },
  { text: "מסעדה כשרה",          highlight: false },
  { text: "04-6778900",          highlight: true  },
];

function Separator({ green }: { green?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 opacity-60"
      style={{ margin: "0 2rem" }}
      aria-hidden="true"
    >
      <path
        d="M8 1L9.96 5.5H15L10.94 8.5L12.47 13L8 10.27L3.53 13L5.06 8.5L1 5.5H6.04L8 1Z"
        fill={green ? "#E8F5E9" : "white"}
      />
    </svg>
  );
}

/* 6 repetitions per half → total 12 reps.
   Keyframe: 0 → -50% (moves exactly one half = 6 reps).
   Guarantees no gap even on ultra-wide screens. */
const REPS_PER_HALF = 6;
const allItems = Array.from({ length: REPS_PER_HALF * 2 }, (_, r) =>
  ITEMS.map((item, i) => ({ ...item, key: `${r}-${i}`, starGreen: (r + i) % 5 === 2 }))
).flat();

export function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden"
      style={{ borderBottom: "2px solid #2E7D32" }}
      aria-hidden="true"
    >
      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #C62828 0%, #9b1a1a 50%, #C62828 100%)",
          backgroundSize: "200% auto",
          animation: "shimmer 6s linear infinite",
        }}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            width: "max-content",
            animation: "marquee 60s linear infinite",
          }}
          dir="ltr"
        >
          {allItems.map((item) => (
            <span key={item.key} className="inline-flex items-center">
              <span
                className={`text-sm font-bold tracking-widest uppercase ${
                  item.highlight ? "text-white" : "text-white/70"
                }`}
                style={{
                  fontFamily: "var(--font-rubik)",
                  fontWeight: item.highlight ? 700 : 500,
                }}
              >
                {item.text}
              </span>
              <Separator green={item.starGreen} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
