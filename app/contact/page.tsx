import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "צרו קשר | פארקו פיצה",
  description: "צרו קשר עם פארקו פיצה — 04-6778900, גן אברהם, גאולה כהן 4, קריית ים",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Header */}
        <section className="bg-brand-surface pt-36 pb-20 text-center">
          <p className="mb-3 text-xs tracking-[0.4em] text-brand-gold uppercase animate-fade-in">
            Contact Us
          </p>
          <h1 className="font-display font-bold text-5xl text-brand-cream animate-fade-up md:text-6xl">
            צרו קשר
          </h1>
        </section>

        {/* Info + Map */}
        <section className="bg-brand-dark py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-8 md:grid-cols-2">

              {/* Info */}
              <ScrollReveal>
                <div className="space-y-8">
                  <div>
                    <p className="mb-3 text-[10px] tracking-[0.3em] text-brand-gold uppercase">טלפון</p>
                    <a
                      href="tel:046778900"
                      className="font-display font-bold text-3xl text-brand-cream hover:text-brand-gold transition-colors"
                    >
                      04-6778900
                    </a>
                  </div>

                  <div className="h-px bg-brand-border" />

                  <div>
                    <p className="mb-3 text-[10px] tracking-[0.3em] text-brand-gold uppercase">כתובת</p>
                    <p className="text-brand-cream">גן אברהם, גאולה כהן 4</p>
                    <p className="text-brand-muted">קריית ים</p>
                    <a
                      href="https://maps.app.goo.gl/Kpcw2dJNp8rcBkVg8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-[10px] tracking-[0.3em] text-brand-gold uppercase hover:opacity-70"
                    >
                      נווט אלינו →
                    </a>
                  </div>

                  <div className="h-px bg-brand-border" />

                  <div>
                    <p className="mb-3 text-[10px] tracking-[0.3em] text-brand-gold uppercase">שעות פתיחה</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-brand-muted">ראשון — חמישי</span>
                        <span className="text-brand-cream">12:00 — 00:00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-brand-muted">שישי / שבת</span>
                        <span className="text-brand-cream">בדקו אותנו</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-brand-border" />

                  <div>
                    <p className="mb-4 text-[10px] tracking-[0.3em] text-brand-gold uppercase">עקבו אחרינו</p>
                    <div className="flex gap-6">
                      <a
                        href="https://www.facebook.com/p/Parcopizza-61578178182108/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-muted hover:text-brand-gold transition-colors"
                      >
                        Facebook
                      </a>
                      <a
                        href="https://www.instagram.com/parcopizza/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-muted hover:text-brand-gold transition-colors"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://order.plweb.online/wl/629098#!/rest/629098/menu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-brand-gold bg-brand-gold px-8 py-3.5 text-xs tracking-[0.3em] text-brand-dark uppercase hover:bg-transparent hover:text-brand-gold transition-all"
                    >
                      הזמינו עכשיו
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Map */}
              <ScrollReveal className="reveal-d2">
                <div className="h-full min-h-[400px] overflow-hidden border border-brand-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.0!2d35.07!3d32.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ5JzU4LjAiTiAzNcKwMDQnMTIuMCJF!5e0!3m2!1siw!2sil!4v1700000000000!5m2!1siw!2sil"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8)", minHeight: "400px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="מיקום פארקו פיצה"
                  />
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
