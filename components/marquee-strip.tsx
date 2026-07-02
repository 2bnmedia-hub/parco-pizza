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
      className="mx-6 shrink-0 opacity-60"
      aria-hidden="true"
    >
      <path
        d="M8 1L9.96 5.5H15L10.94 8.5L12.47 13L8 10.27L3.53 13L5.06 8.5L1 5.5H6.04L8 1Z"
        fill={green ? "#E8F5E9" : "white"}
      />
    </svg>
  );
}

/* Render one full pass of all items */
function ItemRow() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            className={`text-sm font-bold tracking-widest uppercase ${
              item.highlight ? "text-white" : "text-white/70"
            }`}
            style={{ fontFamily: "var(--font-rubik)", fontWeight: item.highlight ? 700 : 500 }}
          >
            {item.text}
          </span>
          <Separator green={i % 5 === 2} />
        </span>
      ))}
    </>
  );
}

export function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden"
      style={{ borderBottom: "2px solid #2E7D32" }}
      aria-hidden="true"
    >
      <div
        className="py-4"
        style={{
          background: "linear-gradient(135deg, #C62828 0%, #9b1a1a 50%, #C62828 100%)",
          backgroundSize: "200% auto",
          animation: "shimmer 6s linear infinite",
        }}
      >
        {/* Two identical halves — animates exactly -50% so loop is seamless */}
        <div
          className="flex whitespace-nowrap"
          style={{
            width: "max-content",
            animation: "marquee 50s linear infinite",
          }}
          dir="ltr"
        >
          {/* Half 1 */}
          <div className="flex whitespace-nowrap">
            <ItemRow />
          </div>
          {/* Half 2 — identical, ensures nothing is ever empty on reset */}
          <div className="flex whitespace-nowrap">
            <ItemRow />
          </div>
        </div>
      </div>
    </div>
  );
}
