const ITEMS = [
  { text: "פיצה טרייה",          highlight: false },
  { text: "₪50 מרגריטה",         highlight: true  },
  { text: "מוכן מהלב",           highlight: false },
  { text: "פסטה ביתית",          highlight: false },
  { text: "כשר למהדרין",         highlight: true  },
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

function Separator() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mx-4 shrink-0 opacity-60"
      aria-hidden="true"
    >
      <path
        d="M8 1L9.96 5.5H15L10.94 8.5L12.47 13L8 10.27L3.53 13L5.06 8.5L1 5.5H6.04L8 1Z"
        fill="white"
      />
    </svg>
  );
}

export function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden py-4"
      style={{
        background: "linear-gradient(135deg, #E63946 0%, #c8303c 50%, #E63946 100%)",
        backgroundSize: "200% auto",
        animation: "shimmer 6s linear infinite",
      }}
    >
      <div className="flex whitespace-nowrap" style={{ width: "max-content" }} dir="ltr">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 45s linear infinite" }}
        >
          {repeated.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center"
            >
              <span
                className={`text-sm font-bold tracking-widest uppercase ${
                  item.highlight ? "text-white" : "text-white/75"
                }`}
                style={{ fontFamily: "var(--font-rubik)", fontWeight: item.highlight ? 700 : 500 }}
              >
                {item.text}
              </span>
              <Separator />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
