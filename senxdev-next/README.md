# SenXDev — next website

A standalone redesign of senxdev.com. It is fully separate from the React app in the repo root: no dependencies, and nothing here imports from `../src` or `../public`.

## Run it

```bash
npm run build     # node scripts/build.mjs: prerenders pages, sitemap, llms.txt
npm run serve     # http://localhost:5174
npm run dev       # both
```

`serve.mjs` mirrors the clean URLs and `/careers/:slug(/apply)` rewrites in `vercel.json`, so local and deployed routing behave the same. To deploy, point a Vercel project's root directory at `senxdev-next/`; `vercel.json` runs the build.

**After editing content** (`assets/js/data.js`, `content/services.mjs`), run `npm run build` so the static HTML, structured data and sitemap match.

## SEO

- **Prerendered HTML.** `scripts/build.mjs` writes the header, footer, home sections, service pages and job pages as static HTML, so crawlers don't need JavaScript. The browser scripts reuse the same markup (`assets/js/markup.js`) and only fill in what's missing.
- **One page per service** under `/services/<slug>`, plus a hub at `/services`. Copy lives in `content/services.mjs`, with a primary keyword per page (title, H1, intro, URL) and supporting keywords in the body and FAQs.
- **Structured data:** Organization + ProfessionalService and WebSite (home), Service, FAQPage and BreadcrumbList (service pages), ItemList (hub), CollectionPage (work) and JobPosting (job pages).
- **Technical:** unique titles, descriptions and canonicals on every page; one H1 per page; Open Graph and Twitter tags; `sitemap.xml` with lastmod; `robots.txt`; `llms.txt` for AI search; web manifest; security and cache headers.

Keyword map (from Google autocomplete research, Oct 2026):

| Page | Primary keyword |
| --- | --- |
| `/` | custom software development company, app development company |
| `/services` | software development services |
| `/services/custom-software-development` | custom software development services, offshore software development |
| `/services/mobile-app-development` | mobile app development company, iOS & Android, outsource app development |
| `/services/web-development` | website development, web design services, ecommerce websites |
| `/services/web-app-development` | web app development services, web application development company |
| `/services/ai-development` | AI development company, AI chatbot development, AI solutions for business |
| `/services/ui-ux-design` | UI/UX design services, UI UX design agency |

The site targets clients worldwide. Sri Lanka appears as a supporting fact (where the team is based, for offshore searches), not in titles or H1s; structured data sets `areaServed` to Worldwide.

## The idea

The hero is the conversion tool, in three colour blocks on a dark page:

1. **What's slowing you down?** Pick one of six everyday problems, or type your own.
2. **Your brief, in one sentence.** The sentence fills itself in from the problem. Every white word opens a picker with preset options plus "Or type your own…".
3. **See it.** A wireframe blueprint, three modules, and an indicative plan redraw to match.

**Send this brief** drops the sentence (and any custom problem) into the contact form; **WhatsApp** opens a pre-filled chat. Until the visitor touches it, the hero cycles through the problems on its own.

Motion: staged entrance, split-word headings, rolling sentence words, spring pickers, blueprint line drawing with a scan sweep, cursor glow, magnetic buttons, card tilt, scroll reveals, a scroll progress line, a hide-on-scroll header, a marquee, and cross-page view transitions. All of it switches off under `prefers-reduced-motion`.

## Where things live

| What | File |
| --- | --- |
| All content: problems, sentence options, services, reasons, process, projects, jobs, contact details | `assets/js/data.js` |
| Design tokens, all styles and animations | `assets/css/site.css` |
| Header, footer, WhatsApp shortcut, SEO helper, shared motion (glow, magnetic, split text, tilt, reveals) | `assets/js/site.js` |
| Blueprint SVG renderer | `assets/js/blueprint.js` |
| Home page logic (problem picker, sentence pickers, autoplay, contact form) | `assets/js/home.js` |
| Portfolio cards and focus dialog | `assets/js/work.js` |
| Careers list / role posting + apply | `assets/js/careers.js`, `assets/js/role.js` |
| Portfolio demo sites (copied, with a "design concept" banner added) | `projects/` |

When adding or removing a job, also update `sitemap.xml`. Each job needs its own `tallyFormId`; a job without one shows "applications open soon" instead of borrowing another role's form.

## Spec states covered

- Contact: inline field errors, submitting (button locked, no double submit), success, API error, network/timeout error (values kept, WhatsApp/email fallback), honeypot, duplicate-message guard.
- Careers: per-category empty states, "no openings", not-found role page (no silent redirect), Tally loading / load-failure (points to new tab) / submitted, deterministic back links, apply page `noindex`.
- Portfolio: keyboard + backdrop dismiss (native `<dialog>`), image loading/failed fallback, deep links (`#project-4`), concept banner on demo sites.
- Site-wide: real anchors instead of timed scrolling, no dead footer links, service rows/footer links prefill the brief, every new-tab action is a real link (pop-up-blocker safe), `<noscript>` contact fallback.
