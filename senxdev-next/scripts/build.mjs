// Prerenders everything search engines should see without running JavaScript:
//   - header, footer and structured data on every page
//   - home sections (services, work, process, reasons, FAQ, contact list)
//   - one static page per service (/services/<slug>) and the services hub
//   - one static page per job (/careers/<slug>) with JobPosting data
//   - sitemap.xml and llms.txt
// Safe to run repeatedly: content goes between <!-- @name --> ... <!-- /@name --> markers.
// Usage: node scripts/build.mjs

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SERVICES, PROCESS, REASONS, PROJECTS, JOBS, INDUSTRIES, CONTACT } from "../assets/js/data.js";
import { SERVICE_PAGES, HOME_FAQS } from "../content/services.mjs";
import {
  esc, icon, headerHTML, footerHTML, projectCard, serviceRow, processCard, reasonCard,
  faqList, faqSchema, roleRow, postingHTML, jobPostingSchema,
} from "../assets/js/markup.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://senxdev.com";
const TODAY = new Date().toISOString().slice(0, 10);
const OG_IMAGE = `${SITE}/favicon.jpg`;

/* ---------- Helpers ---------- */

const read = (p) => readFile(join(ROOT, p), "utf8");
async function write(p, s) {
  await mkdir(dirname(join(ROOT, p)), { recursive: true });
  await writeFile(join(ROOT, p), s);
  console.log("  wrote", p);
}
function fill(html, name, content) {
  const re = new RegExp(`<!-- @${name} -->[\\s\\S]*?<!-- /@${name} -->`);
  if (!re.test(html)) throw new Error(`Missing <!-- @${name} --> marker`);
  return html.replace(re, () => `<!-- @${name} -->${content}<!-- /@${name} -->`);
}
const jsonld = (...objs) => objs.map((o) => `\n  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join("") + "\n  ";

/* ---------- Structured data ---------- */

const ORG_ID = `${SITE}/#organization`;
const organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "SenXDev",
  url: SITE,
  logo: `${SITE}/favicon.jpg`,
  image: OG_IMAGE,
  description: "SenXDev is a custom software development company building mobile apps, web apps, websites and AI solutions for startups and businesses worldwide, from its team in Sri Lanka.",
  email: CONTACT.email,
  telephone: "+94763581264",
  address: { "@type": "PostalAddress", addressCountry: "LK" },
  areaServed: "Worldwide",
  sameAs: [CONTACT.linkedin, CONTACT.instagram],
  contactPoint: [{ "@type": "ContactPoint", telephone: "+94763581264", email: CONTACT.email, contactType: "sales", availableLanguage: ["English"] }],
  knowsAbout: SERVICE_PAGES.map((s) => s.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software development services",
    itemListElement: SERVICE_PAGES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${SITE}/services/${s.slug}` } })),
  },
};
const website = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "SenXDev", publisher: { "@id": ORG_ID }, inLanguage: "en" };
const breadcrumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE}${path}` })),
});

/* ---------- Page shell for generated pages ---------- */

function page({ path, title, description, active, schema, main, script, robots = "index, follow" }) {
  const url = `${SITE}${path}`;
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SenXDev">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${OG_IMAGE}">
  <meta name="theme-color" content="#0c0c0c">
  <link rel="icon" href="/assets/img/favicon.jpg">
  <link rel="apple-touch-icon" href="/assets/img/favicon.jpg">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/site.css">
  <!-- @schema -->${jsonld(...schema)}<!-- /@schema -->
</head>
<body>
  <!-- @header -->${headerHTML(active)}<!-- /@header -->
  <main id="main">
${main}
  </main>
  <!-- @footer -->${footerHTML(active)}<!-- /@footer -->
  <script type="module">
${script}
  </script>
</body>
</html>
`;
}

const crumbsHTML = (items) => `<nav aria-label="Breadcrumb"><ol class="crumbs">${items
  .map(([name, path], i) => (i < items.length - 1 ? `<li><a href="${path}">${esc(name)}</a></li>` : `<li aria-current="page">${esc(name)}</li>`))
  .join("")}</ol></nav>`;

const briefLink = (product) => `/?product=${encodeURIComponent(product)}#brief`;

/* ---------- Service pages ---------- */

function servicePage(s) {
  const path = `/services/${s.slug}`;
  const crumbs = [["Home", "/"], ["Services", "/services"], [s.name, path]];
  const others = SERVICE_PAGES.filter((o) => o.slug !== s.slug);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}${path}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: `${SITE}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.name,
      itemListElement: s.deliverables.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d.t, description: d.d } })),
    },
  };

  const main = `
    <section class="svc-hero">
      <div class="wrap">
        ${crumbsHTML(crumbs)}
        <span class="kicker">${esc(s.kicker)}</span>
        <h1 class="display h-xl" data-split>${esc(s.h1)}</h1>
        ${s.intro.map((p) => `<p class="lede reveal">${esc(p)}</p>`).join("\n        ")}
        <div class="svc-hero-cta reveal">
          <a class="btn btn-primary" href="${briefLink(s.product)}" data-magnetic>Start your brief <span class="arrow" aria-hidden="true">→</span></a>
          <a class="btn btn-ghost" href="${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi SenXDev! I'm interested in ${s.name.toLowerCase()}.`)}" target="_blank" rel="noopener">Ask on WhatsApp</a>
        </div>
      </div>
    </section>

    <section aria-labelledby="fix-h">
      <div class="wrap">
        <h2 class="sr-only" id="fix-h">Problems ${esc(s.name.toLowerCase())} solves</h2>
        <div class="fix-grid">
          <div class="fix-card problem reveal">
            <h2>Sound familiar?</h2>
            <ul>${s.problems.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          </div>
          <div class="fix-card solution reveal" style="--i:1">
            <small>WITH SENXDEV</small>
            <h2>What changes.</h2>
            <p>${esc(s.fix)}</p>
            <a class="btn btn-white" href="${briefLink(s.product)}" style="justify-self:start">See what we'd build <span class="arrow" aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="deliver-h">
      <div class="wrap">
        <div class="section-head">
          <h2 class="display h-lg" id="deliver-h" data-split>What we build.</h2>
          <p class="lede reveal">${esc(s.name)} services, from first sketch to launch and support.</p>
        </div>
        <div class="deliver">
          ${s.deliverables.map((d, i) => `<article class="dcard reveal" style="--i:${i % 3}"><b>${String(i + 1).padStart(2, "0")}</b><h3>${esc(d.t)}</h3><p>${esc(d.d)}</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section" aria-label="Industries and technology">
      <div class="wrap two-col">
        <div class="reveal">
          <h2>Who it's for</h2>
          <div class="pill-row">${s.industries.map((x) => `<span class="pill">${esc(x)}</span>`).join("")}</div>
        </div>
        <div class="reveal" style="--i:1">
          <h2>Typical technology</h2>
          <div class="pill-row">${s.stack.map((x) => `<span class="pill">${esc(x)}</span>`).join("")}</div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="proc-h">
      <div class="wrap">
        <div class="section-head">
          <h2 class="display h-lg" id="proc-h" data-split>How a project runs.</h2>
          <p class="lede reveal">The same four stages on every ${esc(s.name.toLowerCase())} project, so you always know what's next.</p>
        </div>
        <div class="process-grid">${PROCESS.map(processCard).join("")}</div>
      </div>
    </section>

    <section class="section" aria-labelledby="faq-h">
      <div class="wrap">
        <div class="section-head">
          <h2 class="display h-lg" id="faq-h" data-split>${esc(s.name)} FAQ.</h2>
        </div>
        <div class="faqs">${faqList(s.faqs)}</div>
      </div>
    </section>

    <section class="section" aria-labelledby="rel-h">
      <div class="wrap">
        <div class="section-head">
          <h2 class="display h-md" id="rel-h" data-split>Related services</h2>
        </div>
        <div class="related">
          ${others.map((o, i) => `<a class="rcard reveal" style="--i:${i % 3};--accent:${o.accent}" href="/services/${o.slug}"><span>${esc(o.kicker.split(" · ")[0])}</span><strong>${esc(o.name)} ${icon.arrow(18)}</strong><p>${esc(o.description)}</p></a>`).join("\n          ")}
        </div>
        <div class="cta-band reveal">
          <h2>Ready to talk about ${esc(s.short.toLowerCase())}?</h2>
          <div class="cta-row">
            <a class="btn btn-ink" href="${briefLink(s.product)}" data-magnetic>Start your brief <span class="arrow" aria-hidden="true">→</span></a>
            <a class="btn btn-white" href="mailto:${CONTACT.email}">${CONTACT.email}</a>
          </div>
        </div>
      </div>
    </section>`;

  return page({
    path,
    title: s.title,
    description: s.description,
    active: "services",
    schema: [serviceSchema, breadcrumbs(crumbs), faqSchema(s.faqs)],
    main,
    script: `    import { renderChrome } from "/assets/js/site.js";\n    renderChrome("services");`,
  });
}

function servicesHub() {
  const path = "/services";
  const crumbs = [["Home", "/"], ["Services", path]];
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software development services",
    itemListElement: SERVICE_PAGES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/services/${s.slug}`, name: s.name })),
  };
  const main = `
    <section class="svc-hero">
      <div class="wrap">
        ${crumbsHTML(crumbs)}
        <h1 class="kicker">Software development services</h1>
        <p class="display h-xl" data-split>Everything you need to <span class="accent">build it.</span></p>
        <p class="lede reveal">SenXDev is a software development company offering custom software development, mobile app development, web app development, website development, AI solutions and UI/UX design, all from one offshore team, for startups and businesses worldwide.</p>
      </div>
    </section>
    <section aria-label="Services">
      <div class="wrap">
        <div class="svc-hub">
          ${SERVICE_PAGES.map((s, i) => `<a class="hub-card reveal" style="--i:${i % 3};--accent:${s.accent}" href="/services/${s.slug}"><span class="n">${String(i + 1).padStart(2, "0")} · ${esc(s.kicker.split(" · ")[0])}</span><h2>${esc(s.name)}</h2><p>${esc(s.description)}</p><span class="go">Explore ${esc(s.short.toLowerCase())} ${icon.arrow(16)}</span></a>`).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section" aria-labelledby="proc-h">
      <div class="wrap">
        <div class="section-head">
          <h2 class="display h-lg" id="proc-h" data-split>Four stages. No surprises.</h2>
          <p class="lede reveal">Every service follows the same software development process.</p>
        </div>
        <div class="process-grid">${PROCESS.map(processCard).join("")}</div>
        <div class="cta-band reveal">
          <h2>Not sure which service you need?</h2>
          <div class="cta-row">
            <a class="btn btn-ink" href="/#brief" data-magnetic>Tell us the problem <span class="arrow" aria-hidden="true">→</span></a>
            <a class="btn btn-white" href="${CONTACT.whatsappGreeting}" target="_blank" rel="noopener">WhatsApp us</a>
          </div>
        </div>
      </div>
    </section>`;
  return page({
    path,
    title: "Software Development Services | Web, Mobile & AI | SenXDev",
    description: "Custom software, mobile app, web app and website development, AI solutions and UI/UX design services for startups and businesses worldwide, from SenXDev.",
    active: "services",
    schema: [list, breadcrumbs(crumbs)],
    main,
    script: `    import { renderChrome } from "/assets/js/site.js";\n    renderChrome("services");`,
  });
}

/* ---------- Existing pages: fill markers ---------- */

async function buildHome() {
  let h = await read("index.html");
  h = fill(h, "schema", jsonld(organization, website, faqSchema(HOME_FAQS)));
  h = fill(h, "header", headerHTML("home"));
  h = fill(h, "footer", footerHTML("home"));
  h = fill(h, "marquee", [...INDUSTRIES, ...INDUSTRIES].map((x) => `<span>${x}</span>`).join(""));
  h = fill(h, "services", SERVICES.map(serviceRow).join(""));
  h = fill(h, "work", PROJECTS.map((p) => projectCard(p)).join(""));
  h = fill(h, "process", PROCESS.map(processCard).join(""));
  h = fill(h, "reasons", REASONS.map(reasonCard).join(""));
  h = fill(h, "faq", faqList(HOME_FAQS));
  h = fill(h, "contact", [
    ["Email", CONTACT.email, `mailto:${CONTACT.email}`, false],
    ["Phone", CONTACT.phone, CONTACT.phoneHref, false],
    ["WhatsApp", CONTACT.phone, CONTACT.whatsapp, true],
    ["LinkedIn", "linkedin.com/company/senxdev", CONTACT.linkedin, true],
    ["Instagram", "@senxdev", CONTACT.instagram, true],
  ].map(([k, v, href, ext]) => `
  <li><a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>
    <span class="k">${k}</span><span class="v">${esc(v)}</span>${ext ? icon.external(16) : icon.arrow(16)}
  </a></li>`).join(""));
  await write("index.html", h);
}

async function buildWork() {
  let h = await read("work.html");
  const gallery = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Web & App Design Portfolio",
    url: `${SITE}/work`,
    publisher: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS.map((p, i) => ({
        "@type": "ListItem", position: i + 1,
        item: { "@type": "CreativeWork", name: p.title, genre: p.category, description: p.description, image: `${SITE}${p.image}`, creator: { "@id": ORG_ID } },
      })),
    },
  };
  h = fill(h, "schema", jsonld(gallery, breadcrumbs([["Home", "/"], ["Work", "/work"]])));
  h = fill(h, "header", headerHTML("work"));
  h = fill(h, "footer", footerHTML("work"));
  h = fill(h, "work", PROJECTS.map((p, i) => projectCard(p, { lazy: i > 1 })).join(""));
  await write("work.html", h);
}

async function buildCareers() {
  let h = await read("careers/index.html");
  h = fill(h, "schema", jsonld(breadcrumbs([["Home", "/"], ["Careers", "/careers"]])));
  h = fill(h, "header", headerHTML("careers"));
  h = fill(h, "footer", footerHTML("careers"));
  h = fill(h, "roles", `<ul class="roles">${JOBS.map(roleRow).join("")}</ul>`);
  await write("careers/index.html", h);

  // role.html stays the dynamic template (apply pages, unknown slugs).
  let tpl = await read("careers/role.html");
  tpl = fill(tpl, "schema", "");
  tpl = fill(tpl, "header", headerHTML("careers"));
  tpl = fill(tpl, "footer", footerHTML("careers"));
  await write("careers/role.html", tpl);

  // One static page per job, so crawlers get the posting and JobPosting data without JS.
  for (const j of JOBS) {
    const path = `/careers/${j.slug}`;
    const title = `${j.title} (${j.location}) | Careers at SenXDev`;
    let p = tpl
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(j.description)}">`)
      .replace(/<meta name="robots" content="[^"]*">/, `<meta name="robots" content="index, follow">\n  <link rel="canonical" href="${SITE}${path}">\n  <meta property="og:title" content="${esc(title)}">\n  <meta property="og:description" content="${esc(j.description)}">\n  <meta property="og:url" content="${SITE}${path}">`);
    p = fill(p, "schema", `\n  <script type="application/ld+json" data-job>${JSON.stringify(jobPostingSchema(j))}</script>${jsonld(breadcrumbs([["Home", "/"], ["Careers", "/careers"], [j.title, path]]))}`);
    p = p.replace(/(<div class="wrap" id="role-root"[^>]*>)[\s\S]*?(<\/div><\/main>)/, `$1${postingHTML(j)}$2`);
    await write(`careers/${j.slug}/index.html`, p);
  }
}

async function buildSimple(file, active) {
  let h = await read(file);
  h = fill(h, "schema", "");
  h = fill(h, "header", headerHTML(active));
  h = fill(h, "footer", footerHTML(active));
  await write(file, h);
}

/* ---------- Sitemap, llms.txt, manifest ---------- */

async function buildSitemap() {
  const urls = [
    ["/", "1.0", "weekly"],
    ["/services", "0.9", "monthly"],
    ...SERVICE_PAGES.map((s) => [`/services/${s.slug}`, "0.9", "monthly"]),
    ["/work", "0.7", "monthly"],
    ["/careers", "0.6", "weekly"],
    ...JOBS.map((j) => [`/careers/${j.slug}`, "0.5", "weekly"]),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/build.mjs. Edit content in assets/js/data.js and content/services.mjs, then rebuild. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr, cf]) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${TODAY}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`).join("\n")}
</urlset>
`;
  await write("sitemap.xml", xml);
}

async function buildLlms() {
  const txt = `# SenXDev

> SenXDev is a custom software development company. We design and build mobile apps, web apps, websites and AI solutions for startups and businesses worldwide (USA, UK, Canada, Australia and more), from our team in Sri Lanka.

Contact: ${CONTACT.email} · ${CONTACT.phone} · WhatsApp ${CONTACT.whatsapp}

## Services
${SERVICE_PAGES.map((s) => `- [${s.name}](${SITE}/services/${s.slug}): ${s.description}`).join("\n")}

## Company
- [Home](${SITE}/): Tell us what's slowing your business down and see what we'd build.
- [Work](${SITE}/work): Web and app design portfolio.
- [Careers](${SITE}/careers): Open roles.
`;
  await write("llms.txt", txt);
}

async function buildManifest() {
  await write("site.webmanifest", JSON.stringify({
    name: "SenXDev",
    short_name: "SenXDev",
    description: "Custom software development company",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0c",
    theme_color: "#0c0c0c",
    icons: [{ src: "/assets/img/favicon.jpg", sizes: "any", type: "image/jpeg" }],
  }, null, 2) + "\n");
}

/* ---------- Run ---------- */

console.log("Building SenXDev pages…");
await buildHome();
await buildWork();
await buildCareers();
await buildSimple("404.html", "");
await write("services/index.html", servicesHub());
for (const s of SERVICE_PAGES) await write(`services/${s.slug}/index.html`, servicePage(s));
await buildSitemap();
await buildLlms();
await buildManifest();
console.log("Done.");
