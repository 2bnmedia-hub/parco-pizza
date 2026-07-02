# פארקו פיצה — Parco Pizza Web

## פרטי הפרויקט

| | |
|---|---|
| **URL פרודקשן** | https://parco-pizza-web.vercel.app |
| **Vercel Project** | 2bnmedia-7254s-projects/parco-pizza-web |
| **Stack** | Next.js 16.2 · React 19 · Tailwind CSS v4 · TypeScript |
| **תיקייה ראשית** | `/Users/wassimkhatib/parco-pizza-web/` |
| **תיקייה Desktop** | `/Users/wassimkhatib/Desktop/2bn-tech/parco pizza/` |

> **חשוב:** כל עדכון מבוצע בשתי התיקיות במקביל, ואז `vercel --prod` מתיקיית הפרויקט הראשית.

---

## מידע עסקי

| | |
|---|---|
| **שם** | פארקו פיצה / Parco Pizza |
| **כתובת** | גן אברהם, גאולה כהן 4, קריית ים |
| **טלפון** | 04-6778900 |
| **שעות** | ראשון–חמישי: 12:00–00:00 |
| **הזמנות** | https://order.plweb.online/wl/629098 |
| **Instagram** | https://www.instagram.com/parcopizza/ |
| **Facebook** | https://www.facebook.com/p/Parcopizza-61578178182108/ |
| **מפה** | https://maps.app.goo.gl/Kpcw2dJNp8rcBkVg8 |
| **כשרות** | כשר חלב |

---

## מבנה הקבצים

```
parco-pizza-web/
├── app/
│   ├── layout.tsx          ← fonts (Playfair Display + Heebo), metadata, RTL
│   ├── globals.css         ← Tailwind v4 @theme, צבעים, animations, scroll-reveal
│   ├── page.tsx            ← דף ראשי — מרכיב את כל הסקשנים
│   ├── menu/page.tsx       ← תפריט מלא
│   ├── about/page.tsx      ← אודות
│   └── contact/page.tsx    ← צרו קשר
├── components/
│   ├── nav.tsx             ← ניווט — transparent → dark on scroll, hamburger mobile
│   ├── hero.tsx            ← Hero slideshow — 5 תמונות, autoplay, controls, dots
│   ├── marquee-strip.tsx   ← פס טקסט גולל
│   ├── about-section.tsx   ← סקשן אודות — 2 עמודות, תמונה + טקסט
│   ├── menu-section.tsx    ← תצוגת קטגוריות תפריט (4 קטגוריות)
│   ├── order-cta.tsx       ← CTA הזמנה — תמונת רקע + כפתורים
│   ├── gallery-section.tsx ← גלריה — grid 5 תמונות
│   ├── location-section.tsx← מיקום + שעות + מפה
│   ├── footer.tsx          ← footer עם לינקים, סושיאל, "מבית 2bnmedia.com"
│   └── scroll-reveal.tsx   ← IntersectionObserver wrapper לאנימציות scroll
├── next.config.ts          ← Unsplash image domains
└── tailwind.config.ts      ← (legacy, config נמצא ב-globals.css @theme)
```

---

## פלטת צבעים

| שם | HEX | שימוש |
|---|---|---|
| `brand-dark` | `#0a0a0a` | רקע ראשי |
| `brand-surface` | `#111111` | רקע סקשנים חלופיים |
| `brand-card` | `#181818` | כרטיסים |
| `brand-cream` | `#f5ede0` | טקסט ראשי |
| `brand-muted` | `#8a7a6a` | טקסט משני |
| `brand-gold` | `#c9a96e` | מבטאים, כותרות, כפתורים |
| `brand-border` | `#242424` | גבולות |

---

## פריסה לפרודקשן

```bash
cd /Users/wassimkhatib/parco-pizza-web
vercel --prod
```

---

## לוג עדכונים

| תאריך | שינוי |
|---|---|
| 2026-07-02 | יצירת הפרויקט — כל הדפים והקומפוננטים |
