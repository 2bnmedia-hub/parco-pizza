import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "אודות | פארקו פיצה",
  description: "הסיפור מאחורי פארקו פיצה — מסעדה איטלקית כשרה בקריית ים",
};

const VALUES = [
  { icon: "🌿", title: "טריות",     desc: "חומרי גלם טריים בכל יום, ללא פשרות" },
  { icon: "❤️", title: "אהבה",      desc: "כל מנה מוכנת עם תשומת לב ואכפתיות"  },
  { icon: "✡️", title: "כשר חלבי",   desc: "כשרות מלאה — מוצרי חלב בלבד"        },
  { icon: "🍕", title: "מגוון",     desc: "תפריט עשיר לכל טעם וכל גיל"         },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80&auto=format&fit=crop"
            alt="פארקו פיצה"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="mb-3 text-xs tracking-[0.4em] text-brand-gold uppercase animate-fade-in">
              About Us
            </p>
            <h1 className="font-display font-bold text-5xl text-brand-cream animate-fade-up md:text-6xl lg:text-7xl">
              הסיפור שלנו
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="bg-brand-dark py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-16 md:grid-cols-2 md:gap-24 lg:items-center">

              <ScrollReveal>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85&auto=format&fit=crop"
                    alt="מטבח פארקו"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 border border-brand-gold/30 h-full w-full pointer-events-none" style={{ zIndex: -1 }} />
                </div>
              </ScrollReveal>

              <div className="space-y-6">
                <ScrollReveal>
                  <p className="text-xs tracking-[0.4em] text-brand-gold uppercase">Our Story</p>
                </ScrollReveal>
                <ScrollReveal className="reveal-d2">
                  <h2 className="font-display font-bold text-4xl text-brand-cream md:text-5xl">
                    מאהבה לאוכל<br />
                    <span className="text-brand-gold">לשולחן שלכם</span>
                  </h2>
                </ScrollReveal>
                <ScrollReveal className="reveal-d3">
                  <div className="h-px w-12 bg-brand-gold/40" />
                </ScrollReveal>
                <ScrollReveal className="reveal-d4">
                  <p className="text-brand-muted leading-relaxed">
                    פארקו פיצה נולד מתוך אהבה אמיתית לאוכל איטלקי ומאמונה שאוכל טוב
                    לא צריך להיות יקר או מסובך. אנחנו ממוקמים בגן אברהם שבקריית ים,
                    ומגישים לקהילה המקומית פיצות, פסטות ומאפים עם חומרי גלם איכותיים.
                  </p>
                </ScrollReveal>
                <ScrollReveal className="reveal-d5">
                  <p className="text-brand-muted leading-relaxed">
                    המטבח שלנו כשר חלבי — אנחנו מתמחים בפיצות יצירתיות עם גבינות מובחרות,
                    פסטה ביתית עם רטבים עשירים, ומגוון קינוחים ייחודיים שתשמחו לנסות.
                    כל מנה מוכנת בהזמנה, טרי ועם לב.
                  </p>
                </ScrollReveal>
                <ScrollReveal className="reveal-d6">
                  <a
                    href="https://order.plweb.online/wl/629098#!/rest/629098/menu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-brand-gold px-8 py-3 text-xs tracking-[0.3em] text-brand-gold uppercase hover:bg-brand-gold hover:text-brand-dark transition-all"
                  >
                    הזמינו עכשיו
                  </a>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-brand-surface py-24">
          <div className="mx-auto max-w-5xl px-6">
            <ScrollReveal>
              <h2 className="mb-16 text-center font-display font-bold text-3xl text-brand-cream">
                מה שמייחד אותנו
              </h2>
            </ScrollReveal>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <ScrollReveal key={v.title} className={`reveal-d${i + 1}`}>
                  <div className="border border-brand-border p-8 text-center hover:border-brand-gold/40 transition-colors">
                    <div className="mb-4 text-3xl">{v.icon}</div>
                    <h3 className="font-display font-bold text-xl text-brand-gold">{v.title}</h3>
                    <p className="mt-2 text-sm text-brand-muted">{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
