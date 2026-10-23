# Aurelia Events — Website

A complete, responsive website for an event management company, built with plain HTML, CSS and JavaScript. There is no build step and no server to maintain: upload the folder to any static host.

## Pages

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Hero slideshow, intro, stats, filterable services, why-us, process, featured case studies, testimonials, client marquee, estimate CTA, journal, FAQs + enquiry form, Instagram strip |
| About | `about.html` | Story, mission/vision/values, stats, milestones timeline, leadership team, awards, testimonials |
| Services | `services.html` | All 21 services grouped into 4 categories with a sticky category bar, packages/pricing, process, FAQs |
| Service detail | `service.html?id=…` | Generated for every service: inclusions, price, gallery, related case studies, related services |
| Portfolio | `portfolio.html` | Filterable case studies; each opens a detailed case-study popup (challenge, solution, results, gallery). Links like `portfolio.html#royal-Chattogram-wedding` open one directly |
| Gallery | `gallery.html` | Filterable photo grid with a full-screen lightbox (keyboard + swipe) |
| Plan your event | `plan.html` | 4-step planner with a **live budget estimator** and cost breakdown; sends the full brief as an enquiry |
| Journal | `blog.html`, `post.html?id=…` | Blog listing with category filter, article pages with share buttons |
| Careers & vendors | `careers.html` | Job openings, job application form, vendor partner registration |
| Contact | `contact.html` | Contact details, detailed enquiry form, 4 offices, Google Map, full FAQ |
| Privacy / Terms | `privacy.html` | Template policy (have it reviewed legally) |
| 404 | `404.html` | Friendly not-found page |

Site-wide features: sticky header with a services mega-menu, mobile drawer menu, floating WhatsApp / call / back-to-top buttons, a "Request a call back" pop-up form, newsletter sign-up, scroll animations, SEO meta tags, Schema.org markup, `sitemap.xml` and `robots.txt`.

## 1. Rebrand in 2 minutes

Open **`assets/js/config.js`** and change the company name, phone, WhatsApp number, email, address, offices and social links. Every page picks these up automatically.

Then also update the few places search engines read without running JavaScript:
- The `<script type="application/ld+json">` block in `index.html`
- `sitemap.xml` and `robots.txt` (replace `aureliaevents.in` with your domain)
- The letter in `assets/img/favicon.svg`

## 2. Turn on email delivery for forms (important)

Out of the box, every form (enquiry, planner, careers, vendor, newsletter) validates the input and then asks the visitor to **send the pre-filled enquiry to your WhatsApp**, so no lead is lost even before setup.

To receive enquiries **by email** as well:
1. Go to https://web3forms.com, enter the email address where you want enquiries delivered, and copy the free access key.
2. Paste it into `config.js` → `forms.web3formsKey`.

Forms then send straight to your inbox and visitors see a "Thank you" message.

## 3. Edit content

All lists live in **`assets/js/data.js`**: services, prices, case studies, gallery photos, testimonials, team, FAQs, blog posts, job openings, packages and the estimator's cost assumptions (`eventTypes`, `addons`, `tiers`).

### Replace placeholder content before going live
- **Photos:** currently Unsplash stock images. Put your own photos in `assets/img/` and use paths like `"assets/img/Chattogram-wedding.jpg"` in `data.js` (and in the few `<img>` tags in the HTML pages).
- **Testimonials, case studies, client names, team, awards and stats** are realistic samples. Replace them with your real ones; don't publish invented reviews or clients.
- **Estimator pricing** (`eventTypes.perGuest`, `base`, `addons.cost`, `tiers.mult` in `data.js`): tune these to your actual rates.

## 4. Preview locally

Double-click `index.html`, or run a tiny local server for the most accurate preview:

```
npx serve .
```

## 5. Publish

Drag-and-drop the folder onto **Netlify** (app.netlify.com/drop), or use **Vercel**, **GitHub Pages**, **Cloudflare Pages**, or any shared hosting (Hostinger, GoDaddy) via FTP. Point your domain at it and you're live.
