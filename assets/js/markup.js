// Markup shared by the browser and scripts/build.mjs. No DOM access here, so the
// build can prerender exactly what the browser would draw.
import { CONTACT, SERVICES } from "./data.js";

const svg = (body, size = 18, extra = "") =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

export const icon = {
  arrow: (s) => svg('<path d="M5 12h14M13 6l6 6-6 6"/>', s, 'class="arrow"'),
  arrowLeft: (s) => svg('<path d="M19 12H5M11 18l-6-6 6-6"/>', s),
  external: (s) => svg('<path d="M7 17 17 7M8 7h9v9"/>', s),
  close: (s) => svg('<path d="M6 6l12 12M18 6 6 18"/>', s),
  menu: (s) => svg('<path d="M4 8h16M4 16h16"/>', s),
  check: (s) => svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', s),
  pen: (s) => svg('<path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"/>', s),
  plus: (s) => svg('<path d="M12 5v14M5 12h14"/>', s),
  spark: (s) => svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>', s),
  whatsapp: (s = 20) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.7A11.8 11.8 0 0 0 24 12c0-3.2-1.2-6.1-3.5-8.4z"/></svg>`,
};

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/* ---------- Site chrome ---------- */

export function headerHTML(active) {
  const isHome = active === "home";
  const h = (anchor) => (isHome ? anchor : `/${anchor}`);
  const cur = (name) => (active === name ? ' aria-current="page"' : "");
  return `<a class="skip" href="#main">Skip to content</a>
<div class="progress-line" aria-hidden="true"></div>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/" aria-label="SenXDev home"><img src="/assets/img/logo.png" alt="SenXDev" width="80" height="26"></a>
    <nav class="nav-pill" aria-label="Main">
      <span class="blob" aria-hidden="true"></span>
      <a href="/services"${cur("services")}>Services</a>
      <a href="/work"${cur("work")}>Work</a>
      <a href="${h("#process")}">Process</a>
      <a href="/careers/"${cur("careers")}>Careers</a>
    </nav>
    <div class="nav-cta">
      <a class="btn btn-on-dark btn-sm" href="${h("#brief")}" data-magnetic>Start a brief <span class="arrow" aria-hidden="true">→</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">${icon.menu(20)}</button>
    </div>
  </div>
</header>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
  <a href="/services">Services</a>
  <a href="/work">Work</a>
  <a href="${h("#process")}">Process</a>
  <a href="/careers/">Careers</a>
  <a class="btn btn-primary" href="${h("#brief")}">Start a brief <span class="arrow" aria-hidden="true">→</span></a>
</nav>`;
}

export function footerHTML(active) {
  const isHome = active === "home";
  const h = (anchor) => (isHome ? anchor : `/${anchor}`);
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-cta">
      <p class="display h-lg" data-split>Got a problem? <span class="accent">Say it.</span></p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn btn-primary" href="${h("#brief")}" data-magnetic>Start your brief <span class="arrow" aria-hidden="true">→</span></a>
        <a class="btn btn-ghost" href="mailto:${CONTACT.email}">${CONTACT.email}</a>
      </div>
    </div>
    <div class="foot-grid">
      <div class="foot-brand">
        <img src="/assets/img/logo.png" alt="SenXDev" width="80" height="26" loading="lazy">
        <p>SenXDev is a custom software development company. We design and build mobile apps, web apps, websites and AI solutions for businesses worldwide, from our team in Sri Lanka.</p>
      </div>
      <div><h2 class="foot-h">Services</h2><ul>
        ${SERVICES.map((s) => `<li><a href="/services/${s.slug}">${esc(s.title)}</a></li>`).join("\n        ")}
      </ul></div>
      <div><h2 class="foot-h">Company</h2><ul>
        <li><a href="/services">All services</a></li>
        <li><a href="/ideas">Automation ideas</a></li>
        <li><a href="/work">Work</a></li>
        <li><a href="${h("#process")}">Process</a></li>
        <li><a href="${h("#faq")}">FAQ</a></li>
        <li><a href="/careers/">Careers</a></li>
      </ul></div>
      <div><h2 class="foot-h">Contact</h2><ul>
        <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li><a href="${CONTACT.phoneHref}">${CONTACT.phone}</a></li>
        <li><a href="${CONTACT.whatsapp}" target="_blank" rel="noopener">WhatsApp ↗</a></li>
        <li><a href="${CONTACT.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a></li>
        <li><a href="${CONTACT.instagram}" target="_blank" rel="noopener">Instagram ↗</a></li>
      </ul></div>
    </div>
    <div class="foot-word" aria-hidden="true">SenXDev</div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} SenXDev · Custom software development company.</span>
      <span>Designed &amp; built in-house.</span>
    </div>
  </div>
</footer>
<a class="wa" href="${CONTACT.whatsappGreeting}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"><span class="wa-ic">${icon.whatsapp(20)}</span><span class="wa-txt">Chat with us on WhatsApp</span></a>`;
}

/* ---------- Shared blocks ---------- */

export function projectCard(p, { lazy = true } = {}) {
  return `
    <button class="proj" type="button" data-project="${p.id}" style="--accent:${p.color}" aria-haspopup="dialog">
      <div class="proj-media">
        <img src="${p.image}" alt="${esc(p.title)}: ${esc(p.category.toLowerCase())} website design by SenXDev on laptop, tablet and phone" width="1376" height="768" ${lazy ? 'loading="lazy"' : ""} decoding="async">
        <span class="fallback" aria-hidden="true">${esc(p.title)}</span>
      </div>
      <div class="proj-meta">
        <h3 class="proj-title">${esc(p.title)}</h3>
        <span class="proj-cat">${esc(p.category)}</span>
      </div>
      <p class="proj-desc">${esc(p.description)}</p>
    </button>`;
}

export function serviceRow(s, i) {
  return `
  <li class="svc reveal" style="--i:${i}">
    <span class="svc-n">${String(i + 1).padStart(2, "0")}</span>
    <h3 class="svc-t"><a href="/services/${s.slug}">${esc(s.title)}</a></h3>
    <p class="svc-d">${esc(s.description)}</p>
    <button class="brief-this" type="button" data-product="${esc(s.product)}">Brief this ${icon.arrow(15)}</button>
  </li>`;
}

export function processCard(p, i) {
  return `
  <article class="pcard reveal" style="--i:${i}">
    <span class="num">0${i + 1}</span>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.description)}</p>
    <div class="track" aria-hidden="true"><span></span></div>
  </article>`;
}

export function reasonCard(r, i) {
  return `
  <article class="reason reveal" style="--i:${i}"><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p></article>`;
}

export function faqList(faqs) {
  return faqs.map((f, i) => `
  <details class="faq reveal" style="--i:${i}">
    <summary><h3>${esc(f.q)}</h3><span class="faq-ic" aria-hidden="true">${icon.plus(18)}</span></summary>
    <div class="faq-a"><p>${esc(f.a)}</p></div>
  </details>`).join("");
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function roleRow(j, i) {
  return `
      <li class="role" style="--i:${i}"><a href="/careers/${j.slug}">
        <h3 class="role-t">${esc(j.title)}</h3>
        <div class="tags"><span class="tag">${esc(j.location)}</span><span class="tag">${esc(j.type)}</span><span class="tag">${esc(j.category)}</span></div>
        <span class="btn btn-ghost btn-sm" aria-hidden="true">View role ${icon.arrow(15)}</span>
        <p class="role-d">${esc(j.description)}</p>
      </a></li>`;
}

/** Job descriptions: blank line = new block; a short first line becomes a heading; "- " lines become a list. */
export function renderDescription(text) {
  return text.trim().split(/\n\s*\n/).map((block) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    let html = "";
    if (lines.length > 1 && !lines[0].startsWith("- ") && lines[0].length < 60 && !/[.:]$/.test(lines[0])) {
      html += `<h2>${esc(lines.shift())}</h2>`;
    }
    let list = [];
    let para = [];
    const flushList = () => { if (list.length) { html += `<ul>${list.map((l) => `<li><span>${esc(l)}</span></li>`).join("")}</ul>`; list = []; } };
    const flushPara = () => { if (para.length) { html += `<p>${para.map(esc).join("<br>")}</p>`; para = []; } };
    for (const l of lines) {
      if (l.startsWith("- ")) { flushPara(); list.push(l.slice(2)); }
      else { flushList(); para.push(l); }
    }
    flushList(); flushPara();
    return html;
  }).join("");
}

export const EMPLOYMENT = { "Full-time": "FULL_TIME", "Part-time": "PART_TIME", Contract: "CONTRACTOR", Internship: "INTERN" };

export function jobPostingSchema(j) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: j.fullDescription.replace(/\n/g, "<br>"),
    datePosted: j.posted,
    employmentType: EMPLOYMENT[j.type] || "OTHER",
    hiringOrganization: { "@type": "Organization", name: "SenXDev", sameAs: "https://www.senxdev.com", logo: "https://www.senxdev.com/favicon.jpg" },
    ...(j.location === "Remote"
      ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Anywhere" } }
      : { jobLocation: { "@type": "Place", address: j.location } }),
    directApply: true,
    url: `https://www.senxdev.com/careers/${j.slug}`,
  };
}

export function tallyFormId(j) {
  return j.tallyFormId && !j.tallyFormId.includes("REPLACE_WITH") ? j.tallyFormId : "";
}

export function jobTags(j) {
  return `<div class="tags"><span class="tag">${esc(j.location)}</span><span class="tag">${esc(j.type)}</span><span class="tag">${esc(j.category)}</span></div>`;
}

/** A job posting page body (used by role.js and prerendered by the build). */
export function postingHTML(j) {
  const path = `/careers/${j.slug}`;
  const tags = jobTags;
  const canApply = Boolean(tallyFormId(j));
  return `
    <a class="back" href="/careers/">${icon.arrowLeft(16)} All roles</a>
    <header style="padding:28px 0 clamp(36px,5vw,56px)">
      <span class="kicker">${esc(j.category)} · ${esc(j.location)}</span>
      <h1 class="display h-lg" data-split style="margin:16px 0 20px;max-width:18ch">${esc(j.title)}</h1>
      ${tags(j)}
    </header>
    <div class="posting">
      <article class="posting-body">${renderDescription(j.fullDescription)}</article>
      <aside>
        <div class="apply-card">
          <dl>
            <dt>Location</dt><dd>${esc(j.location)}</dd>
            <dt>Type</dt><dd>${esc(j.type)}</dd>
            <dt>Team</dt><dd>${esc(j.category)}</dd>
          </dl>
          ${canApply
            ? `<a class="btn btn-blue" href="${path}/apply">Apply for this role ${icon.arrow(16)}</a>
               <p style="margin:0;font-size:13px;color:var(--dim)">The form opens right here. No account needed.</p>`
            : `<p style="margin:0;font-size:14px;color:var(--muted)">Applications for this role open soon. Email <a href="mailto:${CONTACT.email}">${CONTACT.email}</a> to register interest.</p>`}
        </div>
      </aside>
    </div>`;
}
