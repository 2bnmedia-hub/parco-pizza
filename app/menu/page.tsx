import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תפריט | פארקו פיצה",
  description: "פיצות מיוחדות, פסטות, לחמים, סלטים, קינוחים ושתייה — פארקו פיצה קריית ים. כשר למהדרין.",
};

// ─── תפריט מלא ──────────────────────────────────────────────────────────────

const PIZZA_SPECIAL = [
  { name: "פיצת שף",    price: "65₪", desc: "גבינת מיקס איטלקי, קונפי שרי תמר, פסטו, פרמז'ן ורוטב קר למעלה" },
  { name: "פיצת ורונה", price: "65₪", desc: "רוטב שמנת ביתי, גבינת מיקס איטלקי, תפוחי אדמה מתובלים, עירית ופרמז'ן מעל" },
  { name: "פיצה מילאנו",price: "65₪", desc: "רוטב עגבניות ביתי, גבינת מיקס איטלקי, עגבניות מיובשות, טונה ובצל מקורמל" },
  { name: "פיצה יוונית", price: "65₪", desc: "רוטב עגבניות ביתי, גבינת מיקס איטלקי, בולגרית, בצל סגול וזיתי קלמטה" },
  { name: "פיצה לבנה",  price: "60₪", desc: "רוטב שמנת, גבינת מיקס איטלקי ופרמז'ן" },
  { name: "פיצה רוזה",  price: "60₪", desc: "רוטב רוזה, מיקס גבינות איטלקי ופרמז'ן" },
  { name: "פיצה פסטו",  price: "60₪", desc: "רוטב שמנת פסטו, מיקס גבינות, נגיעות פסטו מעל ופרמז'ן" },
  { name: "פיצה חריפה", price: "60₪", desc: "רוטב עגבניות ביתי, גבינת מיקס איטלקי, פלפל חריף, שיפקה וצ'ילי גרוס" },
];

const PIZZA_CLASSIC = [
  { name: "מרגריטה אישית",    price: "28₪", desc: "רוטב עגבניות ביתי ומיקס איטלקי" },
  { name: "מרגריטה משפחתית",  price: "50₪", desc: "רוטב עגבניות ביתי ומיקס איטלקי" },
  { name: "ללא גלוטן אישית",  price: "35₪", desc: "מרגריטה בבצק ללא גלוטן" },
  { name: "טבעונית אישית",    price: "35₪", desc: "ללא מוצרי חלב" },
  { name: "טבעונית משפחתית",  price: "55₪", desc: "ללא מוצרי חלב" },
];

const PIZZA_TOPPINGS_REGULAR = [
  "זיתים ירוקים", "פטריות טריות", "בולגרית", "תירס",
  "טונה", "בצל סגול", "פלפל חריף", "שיפקה",
  "גמבה", "ביצה קשה", "פסטו",
];

const PIZZA_TOPPINGS_PREMIUM = [
  "זיתי קלמטה", "קונפי שום", "בצל מקורמל",
  "עגבניות שרי", "עגבניות מיובשות",
  "פרמז'ן", "אננס", "אנשובי",
];

const BREADS = [
  { name: "לחם שום קטן",    price: "15₪", desc: "לחם טרי בחמאת שום ועשבים" },
  { name: "לחם שום גדול",   price: "30₪", desc: "לחם טרי בחמאת שום ועשבים" },
  { name: "לחם זעתר קטן",   price: "15₪", desc: "לחם טרי בשמן זית וזעתר" },
  { name: "לחם זעתר גדול",  price: "30₪", desc: "לחם טרי בשמן זית וזעתר" },
  { name: "זיווה מוצרלה/בולגרית/מיקס", price: "32₪", desc: "מגיע עם רסק עגבניות, סחוג וביצה קשה" },
  { name: "טוסט פיצה",      price: "45₪", desc: "רוטב עגבניות ביתי, גבינת מיקס איטלקי ותוספת אחת לבחירה" },
  { name: "טוסט יווני",     price: "45₪", desc: "רוטב עגבניות ביתי, בולגרית, זיתי קלמטה, בצל סגול וזעתר" },
  { name: "סמבוסק פיצה",    price: "35₪", desc: "רוטב עגבניות ביתי, גבינת מיקס איטלקי ותוספת אחת לבחירה" },
  { name: "סמבוסק יווני",   price: "35₪", desc: "רוטב עגבניות ביתי, בולגרית, זיתי קלמטה, בצל סגול וזעתר" },
];

const SALADS = [
  { name: "סלט יווני",  price: "55₪", desc: "מלפפון, עגבניה, עלי חסה, בולגרית וזיתי קלמטה. מגיע עם לחם לבן/מחמצת" },
  { name: "סלט טונה",   price: "55₪", desc: "מלפפון, עגבניה, עלי חסה, טונה, תירס, זיתי קלמטה וביצה קשה. מגיע עם לחם לבן/מחמצת" },
  { name: "סלט חלומי",  price: "60₪", desc: "מלפפון, עגבניות שרי, גזר, בצל סגול, עלי חסה. חלומי ופטריות טריות מוקפצות בפסטו. מגיע עם לחם" },
  { name: "סלט טוסט",   price: "60₪", desc: "מלפפון, עגבניות שרי, גמבה, בצל סגול, עלי חסה, בולגרית, זיתי קלמטה. קוביות טוסט בחמאת שום" },
];

const PASTAS = [
  {
    name: "ספגטי / פנה / רביולי גבינה / רביולי בטטה",
    price: "",
    desc: "רטבים לבחירה: שמנת, שמנת פטריות, שמנת פסטו, רוזה, עגבניות",
    note: "תוספת הקרמה ₪5",
  },
];

const DESSERTS = [
  { name: "פיצת שוקולד אישית",    price: "32₪", desc: "חום / לבן / פיסטוק" },
  { name: "פיצת שוקולד משפחתית",  price: "45₪", desc: "חום / לבן / פיסטוק" },
  { name: "פיצת דובאי אישית",     price: "32₪", desc: "קדאיף בממרח פיסטוק, שוקולד חום מעל וסוכריות שוקולד לבן" },
  { name: "פיצת דובאי משפחתית",   price: "45₪", desc: "קדאיף בממרח פיסטוק, שוקולד חום מעל וסוכריות שוקולד לבן" },
  { name: "זיוות שוקולד",         price: "32₪", desc: "חום / לבן / פיסטוק" },
];

const DRINKS = [
  { name: "פחית",                price: "8₪"  },
  { name: "טרופית",              price: "3₪"  },
  { name: "בקבוק קטן",           price: "10₪" },
  { name: "בקבוק גדול",          price: "15₪" },
  { name: "ברד קטן",             price: "5₪"  },
  { name: "ברד גדול",            price: "10₪" },
  { name: "קפה קר גדול",         price: "14₪" },
  { name: "אייס קפה קטן",        price: "6₪"  },
  { name: "אייס קפה גדול",       price: "12₪" },
  { name: "הפוך קטן",            price: "12₪" },
  { name: "הפוך גדול",           price: "14₪" },
  { name: "נס קפה גדול",         price: "12₪" },
  { name: "תה גדול",             price: "10₪" },
  { name: "אספרסו קצר/ארוך",    price: "9₪"  },
  { name: "אספרסו כפול/ארוך",   price: "11₪" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ en, he, desc }: { en: string; he: string; desc?: string }) {
  return (
    <ScrollReveal>
      <div className="mb-10">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-brand-gold uppercase">{en}</p>
            <h2 className="mt-1 font-display font-bold text-3xl text-brand-cream md:text-4xl">{he}</h2>
          </div>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
        {desc && <p className="mt-3 text-sm text-brand-muted">{desc}</p>}
      </div>
    </ScrollReveal>
  );
}

function MenuItem({
  name, price, desc, note, delay = 1,
}: {
  name: string; price?: string; desc?: string; note?: string; delay?: number;
}) {
  return (
    <ScrollReveal className={`reveal-d${delay}`}>
      <div className="group flex items-start justify-between gap-4 border-b border-brand-border py-5 transition-colors last:border-0 hover:bg-brand-surface/30">
        <div className="flex-1">
          <p className="text-base font-semibold text-brand-cream transition-colors group-hover:text-brand-gold">
            {name}
          </p>
          {desc && <p className="mt-1 text-sm leading-relaxed text-brand-muted">{desc}</p>}
          {note && (
            <p className="mt-1 text-xs text-brand-gold/60 italic">{note}</p>
          )}
        </div>
        {price && (
          <p className="shrink-0 font-display font-bold text-xl text-brand-gold">{price}</p>
        )}
      </div>
    </ScrollReveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MenuPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-dark pt-36 pb-20 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 60%, #c9a96e 0%, transparent 50%), radial-gradient(circle at 75% 30%, #c9a96e 0%, transparent 45%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl px-6">
            <p className="mb-4 text-xs tracking-[0.4em] text-brand-gold uppercase animate-fade-in">
              Parco Pizza&nbsp;•&nbsp;כשר למהדרין
            </p>
            <h1 className="font-display font-bold text-5xl text-brand-cream animate-fade-up md:text-7xl">
              התפריט שלנו
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm text-brand-muted">
              מוכן מדי יום עם חומרי גלם טריים, אהבה למקצוע וגאווה אמיתית בכל מנה
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-brand-gold/40" />
              <span className="text-xs tracking-widest text-brand-gold uppercase">Menu</span>
              <div className="h-px w-12 bg-brand-gold/40" />
            </div>
          </div>
        </section>

        {/* Menu body */}
        <div className="bg-brand-dark">
          <div className="mx-auto max-w-4xl space-y-24 px-6 py-20">

            {/* פיצות מיוחדות */}
            <section>
              <SectionHeader en="Special Pizzas" he="פיצות מיוחדות" />
              {PIZZA_SPECIAL.map((item, i) => (
                <MenuItem key={item.name} {...item} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} />
              ))}
            </section>

            {/* פיצות קלאסיות */}
            <section>
              <SectionHeader en="Classic Pizzas" he="פיצות קלאסיות" />
              {PIZZA_CLASSIC.map((item, i) => (
                <MenuItem key={item.name} {...item} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} />
              ))}

              {/* תוספות */}
              <ScrollReveal>
                <div className="mt-8 grid gap-6 rounded-none border border-brand-border bg-brand-surface/40 p-6 md:grid-cols-2">
                  <div>
                    <p className="mb-3 text-[10px] tracking-[0.3em] text-brand-gold uppercase">
                      תוספות רגילות — ₪2 / 4 / 8
                    </p>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {PIZZA_TOPPINGS_REGULAR.join(" • ")}
                    </p>
                    <p className="mt-2 text-xs italic text-brand-muted/60">*תוספת בולגרית — ₪4/8</p>
                  </div>
                  <div>
                    <p className="mb-3 text-[10px] tracking-[0.3em] text-brand-gold uppercase">
                      תוספות פרימיום — ₪4 / 8 / 10
                    </p>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {PIZZA_TOPPINGS_PREMIUM.join(" • ")}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* לחמים, זיוות וטוסטים */}
            <section>
              <SectionHeader
                en="Breads, Toasts & Sambusak"
                he="לחמים, זיוות וטוסטים"
                desc="*הטוסטים מגיעים בליווי סלט אישי"
              />
              {BREADS.map((item, i) => (
                <MenuItem key={item.name} {...item} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} />
              ))}
            </section>

            {/* פסטות */}
            <section>
              <SectionHeader en="Pastas" he="פסטות" />
              {PASTAS.map((item, i) => (
                <MenuItem key={i} {...item} delay={1} />
              ))}
              <ScrollReveal>
                <div className="mt-4 border border-brand-border bg-brand-surface/40 p-5">
                  <p className="text-[10px] tracking-[0.3em] text-brand-gold uppercase mb-2">
                    בחירת סוגי הפסטה
                  </p>
                  <p className="text-sm text-brand-muted">
                    ספגטי&nbsp;•&nbsp;פנה&nbsp;•&nbsp;רביולי גבינה&nbsp;•&nbsp;רביולי בטטה
                  </p>
                  <p className="mt-3 text-[10px] tracking-[0.3em] text-brand-gold uppercase mb-2">
                    בחירת רטבים
                  </p>
                  <p className="text-sm text-brand-muted">
                    שמנת&nbsp;•&nbsp;שמנת פטריות&nbsp;•&nbsp;שמנת פסטו&nbsp;•&nbsp;רוזה&nbsp;•&nbsp;עגבניות
                  </p>
                  <p className="mt-3 text-xs italic text-brand-gold/60">תוספת הקרמה ₪5</p>
                </div>
              </ScrollReveal>
            </section>

            {/* סלטים */}
            <section>
              <SectionHeader en="Salads" he="סלטים" />
              {SALADS.map((item, i) => (
                <MenuItem key={item.name} {...item} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} />
              ))}
            </section>

            {/* קינוחים */}
            <section>
              <SectionHeader en="Desserts" he="קינוחים" />
              {DESSERTS.map((item, i) => (
                <MenuItem key={item.name} {...item} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} />
              ))}
            </section>

            {/* שתייה */}
            <section>
              <SectionHeader en="Beverages" he="שתייה" />
              <ScrollReveal>
                <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-3">
                  {DRINKS.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between border-b border-brand-border py-3.5"
                    >
                      <span className="text-sm text-brand-muted">{item.name}</span>
                      <span className="font-display font-bold text-base text-brand-gold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

          </div>
        </div>

        {/* Bottom CTA */}
        <section className="border-t border-brand-border bg-brand-surface py-20 text-center">
          <ScrollReveal>
            <p className="mb-3 text-xs tracking-[0.4em] text-brand-gold uppercase">Order Now</p>
            <h2 className="font-display font-bold text-3xl text-brand-cream">מוכנים להזמין?</h2>
            <p className="mt-3 text-sm text-brand-muted">הזמינו אונליין או צלצלו אלינו</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://order.plweb.online/wl/629098#!/rest/629098/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-brand-gold bg-brand-gold px-10 py-3.5 text-xs tracking-[0.3em] text-brand-dark uppercase transition-all hover:bg-transparent hover:text-brand-gold"
              >
                הזמינו עכשיו
              </a>
              <a
                href="tel:046778900"
                className="border border-brand-border px-10 py-3.5 text-xs tracking-[0.3em] text-brand-muted uppercase transition-all hover:border-brand-gold hover:text-brand-gold"
              >
                04-6778900
              </a>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
