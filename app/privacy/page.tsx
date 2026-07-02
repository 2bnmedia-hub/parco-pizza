import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | פארקו פיצה",
  description: "מדיניות הפרטיות של פארקו פיצה — שימוש בעוגיות, גוגל אנליטיקס ופייסבוק פיקסל",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-brand-border pb-10">
      <h2 className="mb-4 font-display font-bold text-xl text-brand-gold">{title}</h2>
      <div className="space-y-3 text-sm leading-7 text-brand-muted">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  const updated = "יולי 2026";

  return (
    <>
      <Nav />
      <main>

        {/* Header */}
        <section className="bg-brand-surface pt-36 pb-16 text-center">
          <p className="mb-3 text-xs tracking-[0.4em] text-brand-gold uppercase">Privacy Policy</p>
          <h1 className="font-display font-bold text-4xl text-brand-cream md:text-5xl">
            מדיניות פרטיות
          </h1>
          <p className="mt-4 text-sm text-brand-muted">עודכן לאחרונה: {updated}</p>
        </section>

        {/* Content */}
        <section className="bg-brand-dark py-16">
          <div className="mx-auto max-w-3xl space-y-10 px-6">

            <Section title="1. מי אנחנו">
              <p>
                פארקו פיצה הוא עסק כשר הממוקם בגן אברהם, גאולה כהן 4, קריית ים.
                אנו מפעילים אתר זה במטרה לספק מידע על התפריט שלנו ולאפשר הזמנות נוחות.
              </p>
              <p>
                לכל שאלה בנוגע למדיניות פרטיות זו ניתן לפנות אלינו בטלפון{" "}
                <a href="tel:046778900" className="text-brand-gold hover:opacity-80">04-6778900</a>.
              </p>
            </Section>

            <Section title="2. אילו מידע נאסף">
              <p>אנו עשויים לאסוף את סוגי המידע הבאים:</p>
              <ul className="list-none space-y-2 pr-4">
                {[
                  "מידע גלישה — דפים שביקרת בהם, זמן שהייה ומקור הגעה לאתר",
                  "מידע טכני — סוג הדפדפן, מערכת ההפעלה, כתובת IP אנונימית",
                  "מידע שיווקי — אינטראקציות עם מודעות ותוכן שיתפת",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                אנו <strong className="text-brand-cream">אינם</strong> אוספים שמות, כתובות דוא"ל
                או פרטים אישיים מזהים ישירות דרך אתר זה, אלא אם בחרת ליצור עמנו קשר.
              </p>
            </Section>

            <Section title="3. עוגיות (Cookies)">
              <p>
                עוגיות הן קבצים קטנים שנשמרים בדפדפן שלך ומאפשרים לנו לשפר את חוויית הגלישה.
                באתר זה אנו משתמשים בסוגים הבאים:
              </p>
              <div className="space-y-4 rounded-none border border-brand-border p-5">
                {[
                  {
                    name: "עוגיות הכרחיות",
                    desc: "נדרשות לתפקוד בסיסי של האתר, כגון שמירת הסכמתך לשימוש בעוגיות.",
                  },
                  {
                    name: "עוגיות אנליטיקה (Google Analytics)",
                    desc: "מאפשרות לנו להבין כיצד המבקרים משתמשים באתר — אילו דפים פופולריים, מאיפה מגיעים הגולשים וכו'. המידע אנונימי לחלוטין.",
                  },
                  {
                    name: "עוגיות שיווק (Facebook Pixel)",
                    desc: "עוזרות לנו להציג מודעות רלוונטיות ברשתות חברתיות ולמדוד את אפקטיביות הקמפיינים שלנו.",
                  },
                ].map((c) => (
                  <div key={c.name} className="border-b border-brand-border pb-4 last:border-0 last:pb-0">
                    <p className="mb-1 text-xs font-semibold tracking-wider text-brand-cream uppercase">{c.name}</p>
                    <p>{c.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="4. Google Analytics">
              <p>
                אנו משתמשים ב-Google Analytics של חברת Google LLC לניתוח תנועה באתר.
                הכלי אוסף מידע אנונימי על אופן השימוש באתר ועוזר לנו לשפר את התוכן והחוויה.
              </p>
              <p>
                Google עשויה להעביר מידע לשרתים בארה"ב ובמדינות אחרות.
                למידע נוסף:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:opacity-80 underline underline-offset-2"
                >
                  מדיניות הפרטיות של Google
                </a>.
              </p>
            </Section>

            <Section title="5. Facebook Pixel">
              <p>
                אנו משתמשים ב-Facebook Pixel של Meta Platforms Inc. לצורך פרסום ממוקד
                ומדידת ביצועי מודעות ברשתות החברתיות של Meta (Facebook ו-Instagram).
              </p>
              <p>
                למידע נוסף:{" "}
                <a
                  href="https://www.facebook.com/privacy/explanation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold hover:opacity-80 underline underline-offset-2"
                >
                  מדיניות הפרטיות של Meta
                </a>.
              </p>
            </Section>

            <Section title="6. שיתוף מידע עם צדדים שלישיים">
              <p>
                אנו אינם מוכרים, מעבירים או משכירים את המידע שלך לצדדים שלישיים,
                למעט השירותים המפורטים לעיל (Google, Meta) הפועלים בהתאם למדיניות הפרטיות שלהם.
              </p>
            </Section>

            <Section title="7. הזכויות שלך">
              <p>בהתאם לחוק הגנת הפרטיות הישראלי ולתקנות GDPR (ככל שחלות), יש לך זכות:</p>
              <ul className="list-none space-y-2 pr-4">
                {[
                  "לדעת אילו נתונים נאספים עליך",
                  "לבקש מחיקה של מידע אישי",
                  "לבטל את הסכמתך לשימוש בעוגיות שיווקיות בכל עת",
                  "לפנות לרשות להגנת הפרטיות בכל עניין",
                ].map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="8. ביטול הסכמה לעוגיות">
              <p>
                ניתן לנהל את העדפות העוגיות שלך ישירות דרך הגדרות הדפדפן, או למחוק את
                ה-localStorage של האתר כדי לאפס את הגדרות ההסכמה.
              </p>
              <p>
                שים לב שחסימת עוגיות מסוימות עשויה לפגוע בחוויית הגלישה באתר.
              </p>
            </Section>

            <Section title="9. שינויים במדיניות">
              <p>
                אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. השינויים יפורסמו בדף זה
                עם תאריך העדכון האחרון בראש הדף. המשך השימוש באתר לאחר פרסום שינויים
                מהווה הסכמה למדיניות המעודכנת.
              </p>
            </Section>

            {/* Contact box */}
            <div className="border border-brand-gold/30 bg-brand-surface/50 p-6 text-center">
              <p className="mb-1 text-xs tracking-[0.3em] text-brand-gold uppercase">צרו קשר</p>
              <p className="text-sm text-brand-muted">
                לכל שאלה בנושא פרטיות:{" "}
                <a href="tel:046778900" className="text-brand-cream hover:text-brand-gold transition-colors">
                  04-6778900
                </a>
                {" "}|{" "}
                <span className="text-brand-cream">גן אברהם, גאולה כהן 4, קריית ים</span>
              </p>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
