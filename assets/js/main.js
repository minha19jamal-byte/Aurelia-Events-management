/* =====================================================================
   Aurelia Events — site behaviour
   Builds shared header/footer, renders content from data.js and wires
   up sliders, filters, lightbox, forms and the event planner.
   ===================================================================== */
(function () {
  "use strict";
  const S = window.SITE;
  const D = window.DATA;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page || "";
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  /* ------------------------------------------------------------------
     ICONS
     ------------------------------------------------------------------ */
  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M10 17h10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    rings: '<circle cx="9" cy="14" r="6"/><circle cx="15" cy="14" r="6"/><path d="m10 3 2 3 2-3"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    flower: '<circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9M7.5 12H9M16.5 12H15M12 16.5V15"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    cake: '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1M2 21h20M7 8v3M12 8v3M17 8v3M7 4h.01M12 4h.01M17 4h.01"/>',
    glass: '<path d="M8 22h8M12 15v7M6 2h12l-1 7a5 5 0 0 1-10 0z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    starFill: '<path fill="currentColor" stroke="none" d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    sparkle: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/><path d="M19 3v4M17 5h4"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    speaker: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><path d="M12 6h.01"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.6-.8 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7h2a5.6 5.6 0 0 0 5.5-5.5C22 6 17.5 2 12 2z"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.6a1 1 0 0 0-.2-.6l-3.5-4.4A1 1 0 0 0 17.5 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    wallet: '<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    diamond: '<path d="M12 3 5 12l7 9 7-9z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.2-6"/>',
    quote: '<path fill="currentColor" stroke="none" d="M3 21c3 0 7-1 7-8V5H3v8h4c0 4-2 6-4 6zm11 0c3 0 7-1 7-8V5h-7v8h4c0 4-2 6-4 6z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
    whatsapp: '<path fill="currentColor" stroke="none" d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.2 12C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7a11.9 11.9 0 0 0 5.7 1.4c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4z"/>',
  };
  const icon = (name, cls = "") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.sparkle}</svg>`;
  window.icon = icon;

  const logoMark = () =>
    `<svg class="logo__mark" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22.5" fill="none" stroke="#c9a45c" stroke-width="1.2"/><circle cx="24" cy="24" r="18.5" fill="none" stroke="#c9a45c" stroke-width=".7" stroke-dasharray="1 2.4"/><text x="24" y="32" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="25" font-weight="700" fill="currentColor">${esc(S.shortName.charAt(0))}</text></svg>`;
  const logo = () =>
    `<a href="index.html" class="logo" aria-label="${esc(S.name)} — home">${logoMark()}<span class="logo__text"><span class="logo__name">${esc(S.shortName)}</span><span class="logo__sub">Events &amp; Experiences</span></span></a>`;

  const waLink = (msg = `Hi ${S.name}, I'd like to plan an event.`) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
  const fmtBDT = (n) => {
    if (n >= 1e7) return `${S.currency}${(n / 1e7).toFixed(2).replace(/\.00$/, "")} Cr`;
    if (n >= 1e5) return `${S.currency}${(n / 1e5).toFixed(1).replace(/\.0$/, "")} L`;
    return S.currency + Math.round(n).toLocaleString("en-BD");
  };
  const fmtDate = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" });
  const catName = (id) => (D.categories.find((c) => c.id === id) || {}).name || id;

  /* ------------------------------------------------------------------
     HEADER / DRAWER / FOOTER / FLOATERS
     ------------------------------------------------------------------ */
  const NAV = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services", mega: true, also: ["service.html"] },
    { href: "portfolio.html", label: "Portfolio" },
    { href: "gallery.html", label: "Gallery" },
    { href: "blog.html", label: "Journal", also: ["post.html"] },
    { href: "contact.html", label: "Contact" },
  ];
  const isActive = (n) => n.href === current || (n.also || []).includes(current) || (current === "" && n.href === "index.html");

  function buildHeader() {
    const mega = D.categories
      .map(
        (c) => `<div><h4>${esc(c.name)}</h4><ul>${D.services
          .filter((s) => s.cat === c.id)
          .map((s) => `<li><a href="service.html?id=${s.id}">${esc(s.title)}</a></li>`)
          .join("")}</ul></div>`
      )
      .join("");
    const navItems = NAV.map((n) => {
      const cls = isActive(n) ? "is-active" : "";
      const aria = isActive(n) ? ' aria-current="page"' : "";
      if (n.mega)
        return `<li class="has-mega"><a href="${n.href}" class="${cls}"${aria}>${n.label} ${icon("chev")}</a><div class="mega">${mega}<div class="mega__all"><span class="muted">Not sure what you need? Answer 4 quick questions for an instant estimate.</span><a href="plan.html" class="btn btn--gold btn--sm">Plan my event ${icon("arrow")}</a></div></div></li>`;
      return `<li><a href="${n.href}" class="${cls}"${aria}>${n.label}</a></li>`;
    }).join("");

    const drawerItems = NAV.map((n) => {
      if (n.mega)
        return `<li><button class="sub-toggle" aria-expanded="false">${n.label} ${icon("chev")}</button><div class="sub"><a href="services.html">All services</a>${D.services
          .map((s) => `<a href="service.html?id=${s.id}">${esc(s.title)}</a>`)
          .join("")}</div></li>`;
      return `<li><a href="${n.href}" class="${isActive(n) ? "is-active" : ""}">${n.label}</a></li>`;
    }).join("");

    const html = `
<a href="#main" class="skip-link">Skip to content</a>
<div class="topbar"><div class="container">
  <div class="topbar__info">
    <a href="tel:${S.phoneRaw}">${icon("phone")} ${esc(S.phone)}</a>
    <a href="mailto:${S.email}">${icon("mail")} ${esc(S.email)}</a>
    <span>${icon("clock")} ${esc(S.hours)}</span>
  </div>
  <div class="topbar__social">${socialLinks()}</div>
</div></div>
<header class="header" id="header"><div class="container">
  ${logo()}
  <nav class="nav" aria-label="Main"><ul>${navItems}</ul></nav>
  <div class="header__actions">
    <a href="plan.html" class="btn btn--gold">Plan Your Event</a>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${icon("menu")}</button>
  </div>
</div></header>
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer__scrim" data-close-drawer></div>
  <div class="drawer__panel" role="dialog" aria-label="Menu">
    <div class="drawer__top">${logo()}<button class="drawer__close" data-close-drawer aria-label="Close menu">${icon("close")}</button></div>
    <nav aria-label="Mobile"><ul>${drawerItems}<li><a href="careers.html">Careers &amp; Vendors</a></li></ul></nav>
    <div class="drawer__foot">
      <a href="plan.html" class="btn btn--gold btn--block">Plan Your Event ${icon("arrow")}</a>
      <a href="tel:${S.phoneRaw}">${icon("phone")} ${esc(S.phone)}</a>
      <a href="mailto:${S.email}">${icon("mail")} ${esc(S.email)}</a>
      <a href="${waLink()}" target="_blank" rel="noopener">${icon("whatsapp")} Chat on WhatsApp</a>
    </div>
  </div>
</div>`;
    const slot = $("#site-header");
    if (slot) slot.outerHTML = html;
  }

  function socialLinks() {
    return Object.entries(S.social)
      .filter(([, url]) => url)
      .map(([k, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="${k}">${icon(k)}</a>`)
      .join("");
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    const html = `
<footer class="footer"><div class="container">
  <div class="footer__newsletter">
    <h3>Ideas, trends &amp; <span class="display-em">behind-the-scenes</span> — once a month.</h3>
    <form class="newsletter" data-form="newsletter" data-subject="Newsletter sign-up" novalidate>
      <input type="email" name="email" placeholder="Your email address" aria-label="Email address" required data-label="Email">
      <input type="text" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn btn--gold" type="submit">Subscribe</button>
    </form>
  </div>
  <div class="footer__grid">
    <div>
      ${logo()}
      <p>${esc(S.description)}</p>
      <div class="footer__social">${socialLinks()}</div>
    </div>
    <div>
      <h5>Company</h5>
      <ul>
        <li><a href="about.html">About us</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="blog.html">Journal</a></li>
        <li><a href="careers.html">Careers</a></li>
        <li><a href="careers.html#vendors">Become a vendor</a></li>
        <li><a href="contact.html#faq">FAQs</a></li>
      </ul>
    </div>
    <div>
      <h5>Services</h5>
      <ul>
        ${D.services.filter((s, i) => [0, 1, 2, 4, 5, 6, 10, 14].includes(i)).map((s) => `<li><a href="service.html?id=${s.id}">${esc(s.title)}</a></li>`).join("")}
      </ul>
    </div>
    <div>
      <h5>Get in touch</h5>
      <ul class="footer__contact">
        <li>${icon("pin")}<span>${esc(S.address.line1)}<br>${esc(S.address.line2)}</span></li>
        <li>${icon("phone")}<a href="tel:${S.phoneRaw}">${esc(S.phone)}</a></li>
        <li>${icon("mail")}<a href="mailto:${S.email}">${esc(S.email)}</a></li>
        <li>${icon("clock")}<span>${esc(S.hours)}</span></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <span>© ${year} ${esc(S.name)}. All rights reserved.</span>
    <nav><a href="privacy.html">Privacy policy</a><a href="privacy.html#terms">Terms</a><a href="sitemap.xml">Sitemap</a></nav>
  </div>
</div></footer>
<div class="floaters">
  <button class="fab fab--top" aria-label="Back to top">${icon("arrow")}</button>
  <a class="fab fab--call" href="tel:${S.phoneRaw}" aria-label="Call us">${icon("phone")}<span class="fab__tip">Call ${esc(S.phone)}</span></a>
  <a class="fab fab--wa" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${icon("whatsapp")}<span class="fab__tip">Chat with us</span></a>
</div>
<div class="toast" role="status" aria-live="polite"></div>
<div class="lightbox" aria-hidden="true" role="dialog" aria-label="Image viewer">
  <button class="lightbox__btn lightbox__close" aria-label="Close">${icon("close")}</button>
  <button class="lightbox__btn lightbox__prev" aria-label="Previous">${icon("arrow")}</button>
  <img alt="">
  <button class="lightbox__btn lightbox__next" aria-label="Next">${icon("arrow")}</button>
  <div class="lightbox__caption"></div>
</div>
<div class="modal" id="quote-modal" aria-hidden="true" role="dialog" aria-label="Get a quote">
  <div class="modal__dialog modal__dialog--sm">
    <button class="modal__close" data-close-modal aria-label="Close">${icon("close")}</button>
    <div class="modal__body">
      <span class="eyebrow">Quick enquiry</span>
      <h3>Tell us about your event</h3>
      <p class="muted">We reply within 2 working hours.</p>
      ${quickForm()}
    </div>
  </div>
</div>
<div class="modal" id="case-modal" aria-hidden="true" role="dialog" aria-label="Case study">
  <div class="modal__dialog"><button class="modal__close" data-close-modal aria-label="Close">${icon("close")}</button><div class="case"></div></div>
</div>`;
    const slot = $("#site-footer");
    if (slot) slot.outerHTML = html;
  }

  function eventTypeOptions(selected = "") {
    return `<option value="">Select event type</option>` + D.eventTypes.map((t) => `<option ${t.label === selected ? "selected" : ""}>${esc(t.label)}</option>`).join("") + `<option>Other</option>`;
  }

  function quickForm() {
    return `<form class="form" data-form="quick" data-subject="Quick enquiry" novalidate>
      <div class="field"><label for="q-name">Your name <span class="req">*</span></label><input id="q-name" name="name" required autocomplete="name"></div>
      <div class="form-row">
        <div class="field"><label for="q-phone">Phone <span class="req">*</span></label><input id="q-phone" name="phone" type="tel" required autocomplete="tel"></div>
        <div class="field"><label for="q-email">Email</label><input id="q-email" name="email" type="email" autocomplete="email"></div>
      </div>
      <div class="form-row">
        <div class="field"><label for="q-type">Event type <span class="req">*</span></label><select id="q-type" name="event_type" required>${eventTypeOptions()}</select></div>
        <div class="field"><label for="q-date">Event date</label><input id="q-date" name="event_date" type="date"></div>
      </div>
      <div class="field"><label for="q-msg">Anything else?</label><textarea id="q-msg" name="message" rows="3" style="min-height:90px" placeholder="Guests, city, budget, ideas…"></textarea></div>
      <input type="text" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn btn--dark btn--block" type="submit">Request a call back ${icon("arrow")}</button>
    </form>`;
  }

  /* ------------------------------------------------------------------
     GLOBAL UI BEHAVIOUR
     ------------------------------------------------------------------ */
  function initChrome() {
    const header = $("#header");
    const topBtn = $(".fab--top");
    const onScroll = () => {
      const y = window.scrollY;
      header && header.classList.toggle("is-scrolled", y > 40);
      topBtn && topBtn.classList.toggle("is-shown", y > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    topBtn && topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // Drawer
    const drawer = $("#drawer");
    const toggle = $(".nav-toggle");
    const setDrawer = (open) => {
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
      if (open) $(".drawer__close", drawer).focus();
    };
    toggle && toggle.addEventListener("click", () => setDrawer(true));
    $$("[data-close-drawer]").forEach((b) => b.addEventListener("click", () => setDrawer(false)));
    $$(".sub-toggle").forEach((b) =>
      b.addEventListener("click", () => {
        const open = b.getAttribute("aria-expanded") !== "true";
        b.setAttribute("aria-expanded", String(open));
        b.nextElementSibling.classList.toggle("is-open", open);
      })
    );

    // Modals
    $$("[data-quote]").forEach((b) =>
      b.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = $("#quote-modal");
        const sel = $("select[name=event_type]", modal);
        if (b.dataset.quote && sel) sel.value = b.dataset.quote;
        openModal(modal);
      })
    );
    $$("[data-close-modal]").forEach((b) => b.addEventListener("click", () => closeModal(b.closest(".modal"))));
    $$(".modal").forEach((m) => m.addEventListener("click", (e) => e.target === m && closeModal(m)));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      $$(".modal.is-open").forEach(closeModal);
      if (drawer && drawer.classList.contains("is-open")) setDrawer(false);
    });

    // Site bindings
    $$("[data-site]").forEach((el) => {
      const k = el.dataset.site;
      const map = {
        name: S.name, phone: S.phone, email: S.email, hours: S.hours, tagline: S.tagline,
        address: `${S.address.line1}, ${S.address.line2}`, years: new Date().getFullYear() - S.founded,
      };
      if (k in map) el.textContent = map[k];
      if (el.tagName === "A") {
        if (k === "phone") el.href = `tel:${S.phoneRaw}`;
        if (k === "email") el.href = `mailto:${S.email}`;
      }
      if (k === "whatsapp") el.href = waLink();
    });

    // Date inputs: no past dates
    const today = new Date().toISOString().split("T")[0];
    $$('input[type="date"]').forEach((i) => i.min = today);
    $$("select[data-event-types]").forEach((s) => (s.innerHTML = eventTypeOptions(params.get("type") || "")));
  }

  let lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const f = m.querySelector("input, button.modal__close");
    f && setTimeout(() => f.focus(), 50);
  }
  function closeModal(m) {
    if (!m) return;
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (m.id === "case-modal" && location.hash) history.replaceState(null, "", location.pathname + location.search);
    lastFocus && lastFocus.focus && lastFocus.focus();
  }

  function toast(msg) {
    const t = $(".toast");
    if (!t) return;
    t.innerHTML = icon("checkCircle") + esc(msg);
    t.classList.add("is-shown");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("is-shown"), 3800);
  }

  /* Reveal + counters */
  function initReveal() {
    const els = $$(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("is-in"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));

    const counters = $$("[data-count]:not([data-counted])");
    counters.forEach((c) => (c.dataset.counted = "1"));
    const cio = new IntersectionObserver((entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        cio.unobserve(el);
        const end = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        const dur = 1800;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased).toLocaleString("en-IN") + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }), { threshold: 0.4 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ------------------------------------------------------------------
     LIGHTBOX
     ------------------------------------------------------------------ */
  const LB = { items: [], i: 0 };
  function openLightbox(items, i) {
    LB.items = items; LB.i = i;
    const lb = $(".lightbox");
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    showLB();
    $(".lightbox__close").focus();
  }
  function showLB() {
    const it = LB.items[LB.i];
    const img = $(".lightbox img");
    img.src = it.src;
    img.alt = it.caption || "";
    $(".lightbox__caption").textContent = `${it.caption || ""}  ·  ${LB.i + 1} / ${LB.items.length}`;
  }
  function closeLB() {
    const lb = $(".lightbox");
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    if (!$(".modal.is-open")) document.body.style.overflow = "";
  }
  function initLightbox() {
    const lb = $(".lightbox");
    if (!lb) return;
    const step = (d) => { LB.i = (LB.i + d + LB.items.length) % LB.items.length; showLB(); };
    $(".lightbox__close").addEventListener("click", closeLB);
    $(".lightbox__prev").addEventListener("click", () => step(-1));
    $(".lightbox__next").addEventListener("click", () => step(1));
    lb.addEventListener("click", (e) => e.target === lb && closeLB());
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") { e.stopImmediatePropagation(); closeLB(); }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }, true);
    let sx = 0;
    lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    lb.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });
  }

  /* ------------------------------------------------------------------
     RENDERERS (elements with data-render="...")
     ------------------------------------------------------------------ */
  const R = {};

  R["hero"] = (el) => {
    const keys = (el.dataset.slides || "").split(",");
    const caps = (el.dataset.captions || "").split("|");
    const slides = $(".hero__slides", el);
    slides.innerHTML = keys
      .map((k, i) => `<div class="hero__slide ${i === 0 ? "is-active" : ""}"><img src="${D.img(k.trim(), 2000)}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}></div>`)
      .join("");
    const dots = $(".hero__dots", el);
    dots.innerHTML = keys.map((_, i) => `<button aria-label="Slide ${i + 1}" class="${i === 0 ? "is-active" : ""}"></button>`).join("");
    const cap = $(".hero__caption", el);
    let i = 0, timer;
    const go = (n) => {
      const ss = $$(".hero__slide", el), ds = $$("button", dots);
      ss[i].classList.remove("is-active"); ds[i].classList.remove("is-active");
      i = (n + ss.length) % ss.length;
      ss[i].classList.add("is-active");
      void ds[i].offsetWidth;
      ds[i].classList.add("is-active");
      if (cap && caps[i]) cap.innerHTML = caps[i];
      clearInterval(timer); timer = setInterval(() => go(i + 1), 6000);
    };
    $$("button", dots).forEach((b, n) => b.addEventListener("click", () => go(n)));
    if (cap && caps[0]) cap.innerHTML = caps[0];
    timer = setInterval(() => go(i + 1), 6000);

    const rot = $(".word-rotate", el);
    if (rot) {
      const words = rot.dataset.words.split(",");
      let w = 0;
      setInterval(() => { w = (w + 1) % words.length; rot.innerHTML = `<span>${esc(words[w])}</span>`; }, 2600);
    }
  };

  R["page-hero"] = (el) => {
    const bg = $(".page-hero__bg", el);
    if (bg && el.dataset.img) bg.innerHTML = `<img src="${D.img(el.dataset.img, 1800)}" alt="">`;
  };

  const svcCard = (s) => `
    <a href="service.html?id=${s.id}" class="svc-card reveal">
      <img src="${D.img(s.img, 800)}" alt="${esc(s.title)}" loading="lazy">
      <span class="svc-card__tag">${esc(catName(s.cat))}</span>
      <div class="svc-card__body">
        <div class="svc-card__icon">${icon(s.icon)}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.short)}</p>
        <span class="svc-card__more">Explore ${icon("arrow")}</span>
      </div>
    </a>`;

  R["service-cards"] = (el) => {
    const limit = +el.dataset.limit || 99;
    const grid = $(".grid", el);
    const chips = $(".chips", el);
    const draw = (cat) => {
      const list = D.services.filter((s) => cat === "all" || s.cat === cat);
      grid.innerHTML = (cat === "all" ? pickFeatured(list, limit) : list.slice(0, limit)).map(svcCard).join("");
      initReveal();
    };
    if (chips) {
      chips.innerHTML = `<button class="chip is-active" data-cat="all">All</button>` + D.categories.map((c) => `<button class="chip" data-cat="${c.id}">${esc(c.name)}</button>`).join("");
      chips.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (!b) return;
        $$(".chip", chips).forEach((c) => c.classList.toggle("is-active", c === b));
        draw(b.dataset.cat);
      });
    }
    draw("all");
  };
  // round-robin across categories so "All" shows variety
  function pickFeatured(list, limit) {
    const by = D.categories.map((c) => list.filter((s) => s.cat === c.id));
    const out = [];
    for (let r = 0; out.length < Math.min(limit, list.length); r++) by.forEach((arr) => arr[r] && out.length < limit && out.push(arr[r]));
    return out;
  }

  R["services-full"] = (el) => {
    const nav = $(".cat-nav .chips");
    if (nav) nav.innerHTML = D.categories.map((c, i) => `<a class="chip ${i === 0 ? "is-active" : ""}" href="#${c.id}">${esc(c.name)}</a>`).join("") + `<a class="chip" href="#packages">Packages</a>`;
    let n = 0;
    el.innerHTML = D.categories
      .map((c) => `
      <div class="cat-block" id="${c.id}">
        <div class="cat-block__head reveal"><h2>${esc(c.name)}</h2><p class="muted" style="max-width:520px;margin:0">${esc(c.blurb)}</p></div>
        ${D.services.filter((s) => s.cat === c.id).map((s) => {
          n++;
          return `<div class="svc-row reveal">
            <div><img src="${D.img(s.img, 1100)}" alt="${esc(s.title)}" loading="lazy"></div>
            <div>
              <div class="svc-row__num">${String(n).padStart(2, "0")} — ${esc(c.name)}</div>
              <h3>${esc(s.title)}</h3>
              <p class="muted">${esc(s.short)}</p>
              <ul class="checklist">${s.features.slice(0, 4).map((f) => `<li>${icon("checkCircle")}${esc(f)}</li>`).join("")}</ul>
              <p class="svc-row__price">Starting from <strong>${fmtBDT(s.price)}</strong> ${esc(s.priceNote || "")}</p>
              <div class="svc-actions"><a href="service.html?id=${s.id}" class="btn btn--dark">View details ${icon("arrow")}</a><button class="btn btn--outline" data-quote="${esc(svcToType[s.id] || "")}">Get a quote</button></div>
            </div>
          </div>`;
        }).join("")}
      </div>`)
      .join("");
    // scroll-spy for category chips
    if (nav && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((ens) => ens.forEach((en) => {
        if (en.isIntersecting) $$(".chip", nav).forEach((c) => c.classList.toggle("is-active", c.getAttribute("href") === "#" + en.target.id));
      }), { rootMargin: "-40% 0px -55% 0px" });
      $$(".cat-block, #packages").forEach((b) => io.observe(b));
    }
  };

  const svcToType = {
    "wedding-planning": "Wedding", "destination-weddings": "Destination Wedding", "pre-wedding-ceremonies": "Mehndi / Haldi / Sangeet",
    engagement: "Engagement / Roka", conferences: "Conference / Seminar", "product-launches": "Product Launch", exhibitions: "Exhibition / Stall",
    "award-nights": "Awards / Gala", "corporate-offsites": "Offsite / Annual Meet", "birthday-parties": "Birthday Party",
    anniversaries: "Anniversary / Private Party", "private-parties": "Anniversary / Private Party", concerts: "Concert / Live Show",
  };
  const typeId = (label) => (D.eventTypes.find((t) => t.label === label) || {}).id || "";

  R["service-detail"] = (el) => {
    const s = D.services.find((x) => x.id === params.get("id")) || D.services[0];
    document.title = s.title;
    const meta = $('meta[name="description"]');
    meta && meta.setAttribute("content", s.short);
    const hero = $(".page-hero");
    hero.dataset.img = s.img;
    R["page-hero"](hero);
    $("[data-slot=crumb]").textContent = s.title;
    $("[data-slot=cat]").textContent = catName(s.cat);
    $("[data-slot=title]").textContent = s.title;
    $("[data-slot=short]").textContent = s.short;
    const type = svcToType[s.id];
    const planHref = `plan.html${type ? "?type=" + typeId(type) : ""}`;
    $$("[data-slot=plan]").forEach((a) => (a.href = planHref));
    $$("[data-slot=quote]").forEach((b) => (b.dataset.quote = type || ""));

    const related = D.portfolio.filter((p) => p.cat === s.cat).slice(0, 3);
    const others = D.services.filter((x) => x.cat === s.cat && x.id !== s.id);
    const gal = related.flatMap((p) => p.gallery).slice(0, 6);
    el.innerHTML = `
      <section class="section"><div class="container split">
        <div class="reveal">
          <span class="eyebrow">Overview</span>
          <h2>What's <span class="display-em">included</span></h2>
          <p>${esc(s.desc)}</p>
          <ul class="checklist">${s.features.map((f) => `<li>${icon("checkCircle")}${esc(f)}</li>`).join("")}</ul>
          <p class="svc-row__price">Packages starting from <strong>${fmtBDT(s.price)}</strong> ${esc(s.priceNote || "")} · Final quote depends on guests, venue and scope.</p>
          <div class="svc-actions"><a href="${planHref}" class="btn btn--gold">Get an instant estimate ${icon("arrow")}</a><a href="${waLink(`Hi, I'm interested in ${s.title}.`)}" target="_blank" rel="noopener" class="btn btn--outline">${icon("whatsapp")} WhatsApp us</a></div>
        </div>
        <div class="img-stack reveal" data-delay="2">
          <img src="${D.img(s.img, 1000)}" alt="${esc(s.title)}" loading="lazy">
          <img src="${D.img(gal[0] || s.img, 600)}" alt="" loading="lazy">
          <div class="img-stack__badge"><strong>4.9★</strong><span>Client rating</span></div>
        </div>
      </div></section>
      ${gal.length ? `<section class="section section--sand section--tight"><div class="container">
        <div class="section-head--split section-head reveal"><div><span class="eyebrow">From our events</span><h2>Moments we've <span class="display-em">created</span></h2></div><a href="gallery.html" class="link-arrow">Full gallery ${icon("arrow")}</a></div>
        <div class="case__gallery" data-lb-group>${gal.map((k) => `<button data-src="${D.img(k, 1600)}" data-caption="${esc(s.title)}"><img src="${D.img(k, 600)}" alt="" loading="lazy"></button>`).join("")}</div>
      </div></section>` : ""}
      ${related.length ? `<section class="section"><div class="container">
        <div class="section-head reveal"><span class="eyebrow">Case studies</span><h2>Related <span class="display-em">work</span></h2></div>
        <div class="work-grid">${related.map(workCard).join("")}</div>
      </div></section>` : ""}
      ${others.length ? `<section class="section section--dark"><div class="container">
        <div class="section-head reveal"><span class="eyebrow">Also in ${esc(catName(s.cat))}</span><h2>You might also <span class="display-em">need</span></h2></div>
        <div class="grid grid--3">${others.slice(0, 3).map(svcCard).join("")}</div>
      </div></section>` : ""}`;
    bindLbGroups(el);
    bindWorkCards(el);
  };

  const workCard = (p) => `
    <button class="work-card reveal" data-case="${p.id}" aria-label="Open case study: ${esc(p.title)}">
      <div class="work-card__img"><img src="${D.img(p.img, 900)}" alt="${esc(p.title)}" loading="lazy"></div>
      <div class="work-card__meta"><span>${esc(catName(p.cat))}</span><span>${esc(p.location)}</span><span>${p.year}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
    </button>`;

  R["portfolio"] = (el) => {
    const limit = +el.dataset.limit || 99;
    const grid = $(".work-grid", el);
    const chips = $(".chips", el);
    const draw = (cat) => {
      const list = D.portfolio.filter((p) => cat === "all" || p.cat === cat).slice(0, limit);
      grid.innerHTML = list.length ? list.map(workCard).join("") : `<p class="empty">No projects in this category yet.</p>`;
      bindWorkCards(grid);
      initReveal();
    };
    if (chips) {
      chips.innerHTML = `<button class="chip is-active" data-cat="all">All work</button>` + D.categories.map((c) => `<button class="chip" data-cat="${c.id}">${esc(c.name)}</button>`).join("");
      chips.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (!b) return;
        $$(".chip", chips).forEach((c) => c.classList.toggle("is-active", c === b));
        draw(b.dataset.cat);
      });
    }
    draw("all");
    const h = location.hash.slice(1);
    if (h && D.portfolio.some((p) => p.id === h)) setTimeout(() => openCase(h), 300);
  };

  function bindWorkCards(root) {
    $$("[data-case]", root).forEach((b) => b.addEventListener("click", () => openCase(b.dataset.case)));
  }
  function openCase(id) {
    const p = D.portfolio.find((x) => x.id === id);
    if (!p) return;
    const m = $("#case-modal");
    $(".case", m).innerHTML = `
      <img class="case__hero" src="${D.img(p.img, 1600)}" alt="${esc(p.title)}">
      <div class="modal__body">
        <span class="eyebrow">${esc(catName(p.cat))} · Case study</span>
        <h2>${esc(p.title)}</h2>
        <p style="font-size:1.1rem">${esc(p.summary)}</p>
        <div class="case__facts">
          <div><span>Client</span><strong>${esc(p.client)}</strong></div>
          <div><span>Location</span><strong>${esc(p.location)}</strong></div>
          <div><span>Guests</span><strong>${p.guests.toLocaleString("en-IN")}</strong></div>
          <div><span>Duration</span><strong>${p.days} day${p.days > 1 ? "s" : ""} · ${p.year}</strong></div>
        </div>
        <div class="case__cols">
          <div><h4>The challenge</h4><p class="muted">${esc(p.challenge)}</p></div>
          <div><h4>Our solution</h4><p class="muted">${esc(p.solution)}</p></div>
        </div>
        <h4>Results</h4>
        <div class="case__results">${p.results.map((r) => `<div>${icon("checkCircle")}${esc(r)}</div>`).join("")}</div>
        <div class="case__gallery" data-lb-group>${p.gallery.map((k) => `<button data-src="${D.img(k, 1600)}" data-caption="${esc(p.title)}"><img src="${D.img(k, 500)}" alt="" loading="lazy"></button>`).join("")}</div>
        <div class="svc-actions"><a href="plan.html" class="btn btn--gold">Plan something similar ${icon("arrow")}</a><a href="${waLink(`Hi, I saw your "${p.title}" project and would like something similar.`)}" target="_blank" rel="noopener" class="btn btn--outline">${icon("whatsapp")} Discuss on WhatsApp</a></div>
      </div>`;
    bindLbGroups(m);
    m.scrollTop = 0;
    openModal(m);
    history.replaceState(null, "", "#" + id);
  }

  function bindLbGroups(root) {
    $$("[data-lb-group]", root).forEach((g) => {
      if (g.dataset.bound) return;
      g.dataset.bound = "1";
      const btns = $$("button[data-src]", g);
      btns.forEach((b, i) => b.addEventListener("click", () => openLightbox(btns.map((x) => ({ src: x.dataset.src, caption: x.dataset.caption })), i)));
    });
  }

  R["gallery"] = (el) => {
    const grid = $(".masonry", el);
    const chips = $(".chips", el);
    const cats = [["all", "All"], ["weddings", "Weddings"], ["corporate", "Corporate"], ["concerts", "Concerts"], ["social", "Social"], ["decor", "Décor"]];
    const limit = +el.dataset.limit || 999;
    const items = D.gallery.slice(0, limit);
    grid.innerHTML = items.map((g, i) => `<button class="masonry__item" data-i="${i}" data-cat="${g.cat}" aria-label="View ${esc(g.caption)}"><img src="${g.thumb}" alt="${esc(g.caption)}" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></button>`).join("");
    const visible = () => $$(".masonry__item:not(.is-hidden)", grid);
    grid.addEventListener("click", (e) => {
      const b = e.target.closest(".masonry__item");
      if (!b) return;
      const vis = visible();
      openLightbox(vis.map((v) => items[+v.dataset.i]), vis.indexOf(b));
    });
    if (chips) {
      chips.innerHTML = cats.map(([id, n], i) => `<button class="chip ${i === 0 ? "is-active" : ""}" data-cat="${id}">${n}</button>`).join("");
      chips.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (!b) return;
        $$(".chip", chips).forEach((c) => c.classList.toggle("is-active", c === b));
        $$(".masonry__item", grid).forEach((it) => it.classList.toggle("is-hidden", b.dataset.cat !== "all" && it.dataset.cat !== b.dataset.cat));
      });
    }
  };

  R["insta"] = (el) => {
    const keys = ["weddingConfetti", "concertHearts", "floralCandles", "indianHands", "auditorium", "goldBalloons"];
    el.innerHTML = keys.map((k) => `<a href="${S.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><img src="${D.img(k, 500)}" alt="" loading="lazy">${icon("instagram")}</a>`).join("");
  };

  R["testimonials"] = (el) => {
    const track = $(".testi__track", el);
    track.innerHTML = D.testimonials
      .map((t) => `<div class="testi__slide"><div class="testi__card">
        ${icon("quote", "testi__quote")}
        <div class="testi__stars" aria-label="${t.rating} out of 5 stars">${icon("starFill").repeat(t.rating)}</div>
        <p class="testi__text">“${esc(t.text)}”</p>
        <div class="testi__who"><img src="${t.photo}" alt="" loading="lazy"><div><strong>${esc(t.name)}</strong><span>${esc(t.role)}</span></div></div>
      </div></div>`)
      .join("");
    const dots = $(".slider-dots", el);
    let i = 0, timer;
    const per = () => (window.innerWidth <= 900 ? 1 : 2);
    const max = () => D.testimonials.length - per();
    const drawDots = () => (dots.innerHTML = Array.from({ length: max() + 1 }, (_, n) => `<button aria-label="Go to slide ${n + 1}" class="${n === i ? "is-active" : ""}"></button>`).join(""));
    const go = (n) => {
      i = n > max() ? 0 : n < 0 ? max() : n;
      track.style.transform = `translateX(-${(100 / per()) * i}%)`;
      $$("button", dots).forEach((d, k) => d.classList.toggle("is-active", k === i));
      clearInterval(timer);
      timer = setInterval(() => go(i + 1), 7000);
    };
    drawDots();
    dots.addEventListener("click", (e) => { const b = e.target.closest("button"); b && go($$("button", dots).indexOf(b)); });
    $$("[data-slide]", el.closest("section") || el).forEach((b) => b.addEventListener("click", () => go(i + +b.dataset.slide)));
    window.addEventListener("resize", () => { drawDots(); go(Math.min(i, max())); });
    let sx = 0;
    track.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); });
    go(0);
  };

  R["clients"] = (el) => {
    const items = D.clients.map((c) => `<span class="marquee__item">${esc(c)}</span>`).join("");
    el.innerHTML = `<div class="marquee__track">${items}${items.replace(/class="marquee__item"/g, 'class="marquee__item" aria-hidden="true"')}</div>`;
  };

  R["team"] = (el) => {
    el.innerHTML = D.team.map((t, i) => `<div class="team-card reveal" data-delay="${i}"><div class="team-card__img"><img src="${t.photo}" alt="${esc(t.name)}" loading="lazy"></div><h4>${esc(t.name)}</h4><div class="team-card__role">${esc(t.role)}</div><p>${esc(t.bio)}</p></div>`).join("");
  };

  R["faqs"] = (el) => {
    const limit = +el.dataset.limit || 99;
    el.innerHTML = D.faqs.slice(0, limit).map((f, i) => `
      <div class="acc-item ${i === 0 ? "is-open" : ""}">
        <button aria-expanded="${i === 0}" aria-controls="faq-${i}" id="faq-b-${i}">${esc(f.q)}<span class="acc-ic">${icon("plus")}</span></button>
        <div class="acc-panel" id="faq-${i}" role="region" aria-labelledby="faq-b-${i}"><div><p>${esc(f.a)}</p></div></div>
      </div>`).join("");
    el.addEventListener("click", (e) => {
      const b = e.target.closest(".acc-item > button");
      if (!b) return;
      const item = b.parentElement;
      const open = !item.classList.contains("is-open");
      $$(".acc-item", el).forEach((it) => { it.classList.remove("is-open"); $("button", it).setAttribute("aria-expanded", "false"); });
      item.classList.toggle("is-open", open);
      b.setAttribute("aria-expanded", String(open));
    });
  };

  R["process"] = (el) => {
    el.innerHTML = D.process.map((p, i) => `<div class="step reveal" data-delay="${i}"><div class="step__num">0${i + 1}</div><h4>${esc(p.title)}</h4><p>${esc(p.text)}</p></div>`).join("");
  };

  R["packages"] = (el) => {
    el.innerHTML = D.packages.map((p, i) => `
      <div class="price-card ${p.featured ? "price-card--featured" : ""} reveal" data-delay="${i}">
        ${p.featured ? `<span class="price-card__badge">Most popular</span>` : ""}
        <h3>${esc(p.name)}</h3>
        <div class="price-card__price">${esc(p.price)}</div>
        <div class="price-card__unit">${esc(p.unit)}</div>
        <p class="price-card__note">${esc(p.note)}</p>
        <ul>${p.features.map((f) => `<li>${icon("check")}${esc(f)}</li>`).join("")}</ul>
        <a href="plan.html?tier=${p.name.toLowerCase()}" class="btn ${p.featured ? "btn--gold" : "btn--outline"} btn--block">Choose ${esc(p.name)}</a>
      </div>`).join("");
  };

  const postCard = (p) => `
    <a href="post.html?id=${p.id}" class="post-card reveal">
      <div class="post-card__img"><img src="${D.img(p.img, 800)}" alt="${esc(p.title)}" loading="lazy"></div>
      <div class="post-card__body">
        <div class="post-card__meta"><span>${esc(p.cat)}</span><span>${fmtDate(p.date)}</span><span>${p.read} min read</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.excerpt)}</p>
        <span class="link-arrow">Read article ${icon("arrow")}</span>
      </div>
    </a>`;

  R["posts"] = (el) => {
    const limit = +el.dataset.limit || 99;
    const grid = $(".grid", el);
    const chips = $(".chips", el);
    const draw = (cat) => {
      grid.innerHTML = D.posts.filter((p) => cat === "all" || p.cat === cat).slice(0, limit).map(postCard).join("");
      initReveal();
    };
    if (chips) {
      const cats = [...new Set(D.posts.map((p) => p.cat))];
      chips.innerHTML = `<button class="chip is-active" data-cat="all">All</button>` + cats.map((c) => `<button class="chip" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
      chips.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (!b) return;
        $$(".chip", chips).forEach((c) => c.classList.toggle("is-active", c === b));
        draw(b.dataset.cat);
      });
    }
    draw("all");
  };

  R["post"] = (el) => {
    const p = D.posts.find((x) => x.id === params.get("id")) || D.posts[0];
    document.title = p.title;
    const hero = $(".page-hero");
    hero.dataset.img = p.img;
    R["page-hero"](hero);
    $("[data-slot=title]").textContent = p.title;
    $("[data-slot=crumb]").textContent = p.title;
    $("[data-slot=meta]").textContent = `${p.cat} · ${fmtDate(p.date)} · ${p.read} min read`;
    const author = D.team.find((t) => t.name === p.author);
    const body = p.body.map(([tag, c]) => {
      if (tag === "ul") return `<ul>${c.map((li) => `<li>${esc(li)}</li>`).join("")}</ul>`;
      return `<${tag}>${esc(c)}</${tag}>`;
    }).join("");
    const url = encodeURIComponent(location.href);
    el.innerHTML = `
      <img class="article__cover" src="${D.img(p.img, 1600)}" alt="${esc(p.title)}">
      ${body}
      <div class="article__author">
        ${author ? `<img src="${author.photo}" alt="" style="width:64px;height:64px;border-radius:50%;object-fit:cover">` : ""}
        <div style="flex:1"><strong style="font-family:var(--ff-d);font-size:1.3rem">${esc(p.author)}</strong><div class="muted" style="font-size:.9rem">${esc(author ? author.role : "")} at ${esc(S.name)}</div></div>
        <div class="share">
          <a href="https://wa.me/?text=${encodeURIComponent(p.title + " ")}${url}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">${icon("whatsapp")}</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener" aria-label="Share on Facebook">${icon("facebook")}</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" aria-label="Share on LinkedIn">${icon("linkedin")}</a>
          <button type="button" data-copy aria-label="Copy link">${icon("link")}</button>
        </div>
      </div>`;
    $("[data-copy]", el).addEventListener("click", () => {
      (navigator.clipboard ? navigator.clipboard.writeText(location.href) : Promise.reject()).then(() => toast("Link copied"), () => toast("Copy the link from your address bar"));
    });
    const more = $("[data-render-more]");
    if (more) more.innerHTML = D.posts.filter((x) => x.id !== p.id).slice(0, 3).map(postCard).join("");
  };

  R["jobs"] = (el) => {
    el.innerHTML = D.jobs.map((j) => `
      <div class="job reveal">
        <div><h4>${esc(j.title)}</h4><div class="job__tags"><span>${esc(j.location)}</span><span>${esc(j.type)}</span><span>${esc(j.exp)}</span></div></div>
        <a href="#apply" class="btn btn--outline btn--sm" data-job="${esc(j.title)}">Apply now ${icon("arrow")}</a>
      </div>`).join("");
    const sel = $("#apply select[name=position]");
    if (sel) sel.innerHTML = `<option value="">Select a position</option>` + D.jobs.map((j) => `<option>${esc(j.title)}</option>`).join("") + `<option>General application</option>`;
    el.addEventListener("click", (e) => { const a = e.target.closest("[data-job]"); if (a && sel) sel.value = a.dataset.job; });
  };

  R["offices"] = (el) => {
    el.innerHTML = S.offices.map((o) => `<div class="office reveal"><h4>${icon("pin")}${esc(o.city)}</h4><p>${esc(o.address)}</p><p><a href="tel:${o.phone.replace(/\s/g, "")}">${esc(o.phone)}</a></p></div>`).join("");
  };

  R["map"] = (el) => {
    el.innerHTML = `<iframe title="Office location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${encodeURIComponent(S.address.mapQuery)}&z=15&output=embed"></iframe>`;
  };

  /* ------------------------------------------------------------------
     EVENT PLANNER + ESTIMATOR
     ------------------------------------------------------------------ */
  R["planner"] = (form) => {
    $("[data-slot=types]", form).innerHTML = D.eventTypes.map((t) => `<label class="type-opt"><input type="radio" name="event_type" value="${t.id}" required><span>${icon(t.icon)}${esc(t.label)}</span></label>`).join("");
    $("[data-slot=addons]", form).innerHTML = D.addons.map((a) => `<label class="check"><input type="checkbox" name="services" value="${a.id}"><span>${esc(a.label)}</span></label>`).join("");
    $("[data-slot=tiers]", form).innerHTML = D.tiers.map((t) => `<label class="type-opt"><input type="radio" name="tier" value="${t.id}" ${t.id === "signature" ? "checked" : ""}><span>${esc(t.label)}<small>${esc(t.note)}</small></span></label>`).join("");

    const steps = $$(".planner__step", form);
    const tabs = $$(".planner__progress button");
    let cur = 0;
    const guests = $("input[name=guests]", form);
    const out = $("output[for=guests]", form);

    // Pre-select from URL (?type=wedding&tier=luxe)
    const pre = params.get("type");
    if (pre) { const r = $(`input[name=event_type][value="${pre}"]`, form); if (r) r.checked = true; }
    const tierPre = params.get("tier");
    if (tierPre) { const r = $(`input[name=tier][value="${tierPre}"]`, form); if (r) r.checked = true; }

    const show = (n, scroll = true) => {
      cur = n;
      steps.forEach((s, i) => s.classList.toggle("is-active", i === n));
      tabs.forEach((t, i) => { t.classList.toggle("is-active", i === n); t.classList.toggle("is-done", i < n); });
      if (!scroll) return;
      const top = $(".planner__main").getBoundingClientRect().top + window.scrollY - 110;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
    };
    const stepValid = (n) => {
      const st = steps[n];
      if (n === 0 && !$("input[name=event_type]:checked", form)) { toast("Please choose an event type"); return false; }
      return validate(st);
    };
    $$("[data-next]", form).forEach((b) => b.addEventListener("click", () => stepValid(cur) && show(cur + 1)));
    $$("[data-prev]", form).forEach((b) => b.addEventListener("click", () => show(cur - 1)));
    tabs.forEach((t, i) => t.addEventListener("click", () => {
      if (i <= cur) return show(i);
      for (let k = cur; k < i; k++) if (!stepValid(k)) return show(k);
      show(i);
    }));
    $("[data-slot=types]", form).addEventListener("change", () => setTimeout(() => show(1), 250));

    const calc = () => {
      const g = +guests.value;
      out.textContent = g >= 3000 ? "3000+" : g;
      guests.style.setProperty("--pct", ((g - guests.min) / (guests.max - guests.min)) * 100 + "%");
      const typeIdSel = ($("input[name=event_type]:checked", form) || {}).value;
      const type = D.eventTypes.find((t) => t.id === typeIdSel);
      const tier = D.tiers.find((t) => t.id === ($("input[name=tier]:checked", form) || {}).value) || D.tiers[1];
      const days = +($("select[name=days]", form).value || 1);
      const picked = $$("input[name=services]:checked", form).map((c) => D.addons.find((a) => a.id === c.value));
      const sum = $("[data-slot=summary]");
      const est = $("[data-slot=estimate]");
      const bd = $("[data-slot=breakdown]");
      const row = (k, v) => `<li><span>${k}</span><span>${esc(v)}</span></li>`;
      const cityV = $("select[name=city]", form).value;
      const dateV = $("input[name=event_date]", form).value;
      sum.innerHTML = row("Event", type ? type.label : "—") + row("Date", dateV ? fmtDate(dateV) : "Flexible") + row("City", cityV || "—") + row("Guests", out.textContent) + row("Days", days) + row("Experience", tier.label);
      if (!type) {
        est.textContent = "—";
        bd.innerHTML = `<p class="estimate-note">Choose an event type to see your estimate.</p>`;
        $("input[name=estimate]", form).value = "";
        return;
      }
      const core = (type.base + type.perGuest * g) * tier.mult * (1 + 0.6 * (days - 1));
      const parts = [["Planning & production", core], ...picked.map((a) => [a.label, core * a.cost])];
      const total = parts.reduce((s, p) => s + p[1], 0);
      const lo = total * 0.85, hi = total * 1.15;
      est.textContent = `${fmtBDT(lo)} – ${fmtBDT(hi)}`;
      bd.innerHTML = parts.map(([l, v]) => `<div class="breakdown__row"><span>${esc(l)}</span><span>${fmtBDT(v)}</span><div class="breakdown__bar"><i style="width:${(v / total) * 100}%"></i></div></div>`).join("");
      $("input[name=estimate]", form).value = `${fmtBDT(lo)} – ${fmtBDT(hi)}`;
    };
    form.addEventListener("input", calc);
    form.addEventListener("change", calc);
    calc();
    if (pre && $("input[name=event_type]:checked", form)) show(1, false);
  };

  /* ------------------------------------------------------------------
     FORMS — validation + delivery (Web3Forms → WhatsApp fallback)
     ------------------------------------------------------------------ */
  function setErr(field, msg) {
    let e = $(".field__error", field);
    if (!e) { e = document.createElement("span"); e.className = "field__error"; field.appendChild(e); }
    e.textContent = msg;
    field.classList.toggle("has-error", !!msg);
  }
  function validate(root) {
    let first = null;
    $$("input, select, textarea", root).forEach((el) => {
      if (el.type === "radio" || el.type === "checkbox" || el.classList.contains("hp") || el.type === "hidden") return;
      const v = el.value.trim();
      let msg = "";
      if (el.required && !v) msg = "This field is required";
      else if (el.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = "Please enter a valid email address";
      else if (el.type === "tel" && v && !/^[+]?[\d\s-]{8,16}$/.test(v)) msg = "Please enter a valid phone number";
      else if (el.type === "url" && v && !/^https?:\/\/.+\..+/.test(v)) msg = "Please enter a full link starting with https://";
      const field = el.closest(".field");
      if (field) setErr(field, msg);
      else if (msg) toast(msg);
      if (msg && !first) first = el;
    });
    if (first) { first.focus(); return false; }
    return true;
  }

  function collect(form) {
    const fd = new FormData(form);
    const out = {};
    const labels = {};
    for (const [k, v] of fd.entries()) {
      if (k === "botcheck" || v === "") continue;
      const el = form.querySelector(`[name="${k}"]`);
      let label = el?.dataset.label || el?.closest(".field")?.querySelector("label, .label")?.textContent.replace("*", "").trim() || k.replace(/_/g, " ");
      let val = v;
      if (k === "event_type") { val = (D.eventTypes.find((t) => t.id === v) || {}).label || v; label = "Event type"; }
      if (k === "services") val = (D.addons.find((a) => a.id === v) || {}).label || v;
      if (k === "tier") { val = (D.tiers.find((t) => t.id === v) || {}).label || v; label = "Experience"; }
      if (k === "estimate") label = "Estimated budget";
      if (k === "services") label = "Services needed";
      out[k] = out[k] ? `${out[k]}, ${val}` : val;
      labels[k] = label;
    }
    return { data: out, labels };
  }

  async function submitForm(form) {
    if ($(".hp", form) && $(".hp", form).value) return; // bot
    if (!validate(form)) return;
    const btn = $("button[type=submit]", form);
    const btnHTML = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = "Sending…";
    const { data, labels } = collect(form);
    const kind = form.dataset.form;
    const subject = `${form.dataset.subject || "Website enquiry"}${data.name ? " — " + data.name : ""}`;

    try {
      const log = JSON.parse(localStorage.getItem("enquiries") || "[]");
      log.push({ kind, at: new Date().toISOString(), ...data });
      localStorage.setItem("enquiries", JSON.stringify(log.slice(-20)));
    } catch (_) { /* storage unavailable */ }

    let sent = false;
    if (S.forms.web3formsKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: S.forms.web3formsKey, subject, from_name: S.name + " website", form: kind, page: location.href, ...Object.fromEntries(Object.entries(data).map(([k, v]) => [labels[k] || k, v])) }),
        });
        const j = await res.json();
        sent = !!j.success;
      } catch (_) { sent = false; }
    }

    const msg = `*${subject}*\n` + Object.entries(data).map(([k, v]) => `*${labels[k]}:* ${v}`).join("\n");
    btn.disabled = false;
    btn.innerHTML = btnHTML;

    if (kind === "newsletter") {
      if (sent) { form.reset(); toast("You're subscribed — welcome aboard!"); }
      else { window.open(waLink(`Hi! Please add me to your newsletter: ${data.email}`), "_blank", "noopener"); form.reset(); }
      return;
    }

    const name = esc((data.name || "").split(" ")[0]);
    const box = document.createElement("div");
    box.className = "form-success is-shown";
    box.setAttribute("tabindex", "-1");
    box.innerHTML = sent
      ? `<div class="form-success__icon">${icon("check")}</div>
         <h3>Thank you${name ? ", " + name : ""}!</h3>
         <p class="muted">Your enquiry has reached our team. An event manager will call you within 2 working hours (${esc(S.hours)}).</p>
         <a class="btn btn--outline" href="${waLink(msg)}" target="_blank" rel="noopener">${icon("whatsapp")} Also chat on WhatsApp</a>`
      : `<div class="form-success__icon">${icon("whatsapp")}</div>
         <h3>One last step${name ? ", " + name : ""}</h3>
         <p class="muted">Tap below to send your details to our team on WhatsApp. Everything is already filled in.</p>
         <a class="btn btn--gold" href="${waLink(msg)}" target="_blank" rel="noopener">Send on WhatsApp ${icon("arrow")}</a>
         <p class="form__note" style="margin-top:14px">Prefer email? Write to <a href="mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg.replace(/\*/g, ""))}">${esc(S.email)}</a> or call <a href="tel:${S.phoneRaw}">${esc(S.phone)}</a>.</p>`;
    form.hidden = true;
    form.after(box);
    box.focus();
    const again = document.createElement("button");
    again.className = "btn btn--sm";
    again.style.marginTop = "10px";
    again.textContent = "Send another enquiry";
    again.addEventListener("click", () => { box.remove(); form.reset(); form.hidden = false; form.dispatchEvent(new Event("change")); });
    box.appendChild(document.createElement("br"));
    box.appendChild(again);
  }

  function initForms() {
    $$("form[data-form]").forEach((f) => {
      f.addEventListener("submit", (e) => { e.preventDefault(); submitForm(f); });
      f.addEventListener("input", (e) => { const fld = e.target.closest(".field.has-error"); if (fld) setErr(fld, ""); });
    });
  }

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */
  buildHeader();
  buildFooter();
  $$("i[data-icon]").forEach((el) => (el.outerHTML = icon(el.dataset.icon)));

  const t = document.title;
  if (!t.includes(S.name)) document.title = page === "home" ? `${S.name} — ${t}` : `${t} | ${S.name}`;

  $$("[data-render]").forEach((el) => {
    const fn = R[el.dataset.render];
    if (fn) { try { fn(el); } catch (err) { console.error("Render failed:", el.dataset.render, err); } }
  });
  if (page === "service" || page === "post") {
    const t2 = document.title;
    if (!t2.includes(S.name)) document.title = `${t2} | ${S.name}`;
  }
  bindLbGroups(document);
  initChrome();
  initLightbox();
  initForms();
  initReveal();

  if (!S.forms.web3formsKey) console.info(`[${S.name}] Forms are in WhatsApp-fallback mode. Add a Web3Forms key in assets/js/config.js to receive enquiries by email.`);
})();
