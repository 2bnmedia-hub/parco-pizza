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

function Separator({ green }: { green?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mx-4 shrink-0 opacity-70"
      aria-hidden="true"
    >
      <path
        d="M8 1L9.96 5.5H15L10.94 8.5L12.47 13L8 10.27L3.53 13L5.06 8.5L1 5.5H6.04L8 1Z"
        fill={green ? "#E8F5E9" : "white"}
      />
    </svg>
  );
}

export function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden" style={{borderBottom: "2px solid #2E7D32"}}>
      <div
        className="py-4"
        style={{
          background: "linear-gradient(135deg, #C62828 0%, #9b1a1a 50%, #C62828 100%)",
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
                <Separator green={i % 4 === 2} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
