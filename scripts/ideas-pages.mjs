// Renders the automation ideas pages linked from the Instagram auto-DM:
//   /ideas          pick your type of business
//   /ideas/<slug>   3 ideas for that type of business
// Static HTML plus small inline scripts: one reads ?name= from the DM link to
// greet the visitor and pre-fill the booking link, and /ideas adds the sentence
// picker (its options are plain links without JavaScript). Kept small so the
// pages stay fast inside Instagram's in-app browser.
import { esc, footerHTML } from "../assets/js/markup.js";
import { SITE_URL, CAL_URL, CALL_MINUTES } from "../content/site.config.mjs";
import { BUSINESS_TYPES } from "../content/ideas.mjs";

/* ---------- Content rules ---------- */

// No invented numbers, prices or past work on these pages.
const BANNED = [
  [/\d+(\.\d+)?\s?%|\bper ?cent\b/i, "a percentage"],
  [/[$€£]\s?\d|\b\d[\d,.]*\s?(aed|usd|eur|gbp|dirhams?|dollars?|pounds?|euros?)\b|\b(aed|usd|eur|gbp)\s?\d/i, "a price or amount of money"],
  [/\b(pricing|price|prices|fee|fees)\b/i, "pricing"],
  [/\bcase stud(y|ies)\b|\btestimonials?\b/i, "a case study or testimonial"],
  [/\b(our|other|past|previous) clients?\b|\bwe(?:'ve| have) (?:helped|built this for|done this for)\b/i, "a claim about past clients or projects"],
  [/\bguarantee[ds]?\b/i, "a guarantee"],
  [/\b(save|saves|saving|cut|cuts)\s+(you\s+)?\d+/i, "a savings figure"],
];

/** Returns a list of problems; the build stops if there are any. */
export function checkIdeasContent(types = BUSINESS_TYPES) {
  const problems = [];
  const slugs = new Set();
  for (const t of types) {
    const at = `ideas "${t.slug}"`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug || "")) problems.push(`${at}: invalid slug`);
    if (slugs.has(t.slug)) problems.push(`${at}: duplicate slug`);
    slugs.add(t.slug);
    for (const key of ["name", "short", "timeWasters", "sentence"]) if (!t[key]) problems.push(`${at}: "${key}" is missing`);
    if (!Array.isArray(t.pains) || t.pains.length !== 3) problems.push(`${at}: needs exactly 3 pains`);
    else t.pains.forEach((p, i) => {
      if (!p.say) problems.push(`${at} pain #${i + 1}: "say" is missing`);
      if (![1, 2, 3].includes(p.idea)) problems.push(`${at} pain #${i + 1}: "idea" must be 1, 2 or 3`);
    });
    if (!Array.isArray(t.ideas) || t.ideas.length !== 3) { problems.push(`${at}: needs exactly 3 ideas`); continue; }
    t.ideas.forEach((idea, i) => {
      for (const key of ["title", "summary", "takes_off_plate", "setup_time"]) if (!idea[key]) problems.push(`${at} idea #${i + 1}: "${key}" is missing`);
      if (!Array.isArray(idea.steps) || idea.steps.length < 3 || idea.steps.length > 5) problems.push(`${at} idea #${i + 1}: needs 3–5 steps`);
    });
    const texts = [t.timeWasters, t.sentence, ...(t.pains || []).map((p) => p.say), ...t.ideas.flatMap((x) => [x.title, x.summary, x.takes_off_plate, x.setup_time, ...(x.steps || [])])];
    for (const text of texts) for (const [re, what] of BANNED) if (re.test(text || "")) problems.push(`${at} mentions ${what}: "${text}"`);
  }
  return problems;
}

/* ---------- Shared bits ---------- */

// Booking links. Cal.com puts `notes` into the booking's "Additional notes", which
// is in the booking email you get, so each link carries everything we know:
// business, problem, the idea they want and where they came from. The inline
// script below rebuilds the links with the visitor's name and Instagram handle.
function calAttrs({ biz = "", want = "", from }) {
  const notes = [biz && `Business: ${biz}`, want && `Wants: ${want}`, `Came from: senxdev.com${from}`].filter(Boolean).join("\n");
  return `href="${CAL_URL}?notes=${encodeURIComponent(notes)}" data-cal="${CAL_URL}" data-biz="${esc(biz)}" data-want="${esc(want)}" data-from="${from}" target="_blank" rel="noopener"`;
}

// Reads ?name= (letters, spaces, dots, hyphens, apostrophes) and ?ig= (an Instagram
// username) from the DM link, shows the greeting, keeps both on internal links and
// adds them to the booking links. window.senxdevBook(link) rebuilds one booking
// link from its data-* attributes; the /ideas picker calls it after each answer.
const PERSONALISE = `<script>
(function () {
  try {
    var q = new URLSearchParams(location.search);
    // An unfilled bot placeholder such as {{name}} counts as missing.
    function clean(raw, notAllowed) { return !raw || /[{}$%\\[\\]]/.test(raw) ? "" : raw.replace(notAllowed, "").trim().slice(0, 30); }
    var name = clean(q.get("name"), /[^\\p{L}\\p{M}' .-]/gu);
    var ig = clean(q.get("ig"), /[^A-Za-z0-9._]/g);
    window.senxdevBook = function (a) {
      var lines = ig ? ["Instagram: @" + ig] : [];
      [["biz", "Business"], ["stuck", "Problem"], ["want", "Wants"]].forEach(function (f) {
        var v = a.getAttribute("data-" + f[0]);
        if (v) lines.push(f[1] + ": " + v);
      });
      lines.push("Came from: senxdev.com" + a.getAttribute("data-from"));
      var u = new URL(a.getAttribute("data-cal"));
      if (name) u.searchParams.set("name", name);
      u.searchParams.set("notes", lines.join("\\n"));
      a.href = u.href;
    };
    document.querySelectorAll("a[data-cal]").forEach(window.senxdevBook);
    document.querySelectorAll("a[data-keep-name]").forEach(function (a) {
      var u = new URL(a.href);
      if (name) u.searchParams.set("name", name);
      if (ig) u.searchParams.set("ig", ig);
      a.href = u.pathname + u.search + u.hash;
    });
    if (!name) return;
    document.querySelectorAll("[data-name]").forEach(function (el) { el.textContent = name; });
    document.querySelectorAll("[data-hello]").forEach(function (el) { el.hidden = false; });
  } catch (e) {}
})();
</script>`;

// /ideas only: the "I run ___ and I'm stuck ___" picker. Each answer types itself
// into its blank, then the 3 ideas appear in full (the one for that problem first)
// with the booking box under them. "Something else" lets visitors type their own
// business or problem; that goes into the booking notes. Without JavaScript the
// business options are plain links to each type page.
const PICKER = `<script>
(function () {
  var hero = document.querySelector("[data-mad]");
  if (!hero) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var biz = hero.querySelector('[data-blank="biz"]'), pain = hero.querySelector('[data-blank="pain"]');
  var line2 = hero.querySelector("[data-line2]"), opts = document.querySelector("[data-opts]");
  var ownBiz = document.querySelector('[data-own="biz"]'), ownPain = document.querySelector('[data-own="pain"]');
  var book = document.querySelector("[data-book]"), bookLink = book.querySelector("a[data-cal]"), again = document.querySelector("[data-again]");
  var timer, picked = {};
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function show(el, focus) {
    el.hidden = false;
    var f = focus || el.querySelector("input, a, button");
    if (f) f.focus({ preventScroll: true });
  }
  function step(n) { hero.setAttribute("data-step", n); }
  function typeInto(el, text, done) {
    clearInterval(timer);
    var t = el.firstChild, i = 0;
    el.classList.add("filled", "typing");
    if (reduce) { t.nodeValue = text; el.classList.remove("typing"); return done(); }
    t.nodeValue = "";
    timer = setInterval(function () {
      t.nodeValue = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(timer); el.classList.remove("typing"); done(); }
    }, 38);
  }
  function clear(el) { el.firstChild.nodeValue = "\\u2026"; el.classList.remove("filled", "typing"); }
  function hideSteps() { all(".mad-step, [data-book], [data-again]").forEach(function (el) { el.hidden = true; }); }
  function reset() {
    clearInterval(timer); clear(biz); clear(pain);
    line2.hidden = true; picked = {};
    hideSteps();
    all("[data-own] input").forEach(function (i) { i.value = ""; });
    step(1);
    show(opts);
  }
  function askPain() {
    line2.hidden = false;
    step(2);
    if (picked.slug === "other") return show(ownPain);
    show(document.querySelector('[data-pains="' + picked.slug + '"]'));
  }
  // Step 3: the ideas (lead one first) or, for an unlisted business, the "we'll put ideas together" note.
  function finish() {
    var res = document.querySelector('[data-result="' + picked.slug + '"]'), list = res.querySelector("[data-list]"), lead = "";
    if (list) {
      ["1", "2", "3"].forEach(function (n) { list.appendChild(list.querySelector('[data-n="' + n + '"]')); });
      if (picked.idea) {
        var first = list.querySelector('[data-n="' + picked.idea + '"]');
        list.insertBefore(first, list.firstChild);
        lead = first.querySelector(".idea-title").textContent;
      }
    }
    // Put their answers on every booking link, so they arrive in the booking email.
    bookLink.setAttribute("data-want", picked.slug === "other" ? "3 ideas made for their business"
      : lead ? "Help choosing (matched idea: " + lead + ")" : "Help choosing between the 3 ideas");
    all('[data-result="' + picked.slug + '"] [data-idea-book]').concat(bookLink).forEach(function (a) {
      a.setAttribute("data-biz", picked.biz);
      a.setAttribute("data-stuck", picked.pain.replace(/^(on|with) /, ""));
      if (window.senxdevBook) window.senxdevBook(a);
    });
    step(3);
    res.hidden = book.hidden = again.hidden = false;
    res.focus({ preventScroll: true });
    res.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-biz], [data-pain], [data-restart]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (a.hasAttribute("data-restart")) return reset();
    if (a.hasAttribute("data-biz")) {
      opts.hidden = true;
      picked.slug = a.getAttribute("data-biz");
      if (picked.slug === "other") return show(ownBiz);
      picked.biz = a.textContent.trim();
      return typeInto(biz, picked.biz, askPain);
    }
    a.closest(".mad-step").hidden = true;
    if (!a.getAttribute("data-say")) return show(ownPain); // "Something else"
    picked.pain = a.getAttribute("data-say");
    picked.idea = a.getAttribute("data-idea");
    typeInto(pain, picked.pain, finish);
  });
  document.addEventListener("submit", function (e) {
    var form = e.target.closest("[data-own]");
    if (!form) return;
    e.preventDefault();
    var text = form.querySelector("input").value.replace(/\\s+/g, " ").trim();
    if (!text) return form.querySelector("input").focus();
    form.hidden = true;
    if (form === ownBiz) { picked.biz = text; return typeInto(biz, text, askPain); }
    picked.pain = text; picked.idea = "";
    typeInto(pain, text, finish);
  });
})();
</script>`;

function shell({ path, title, description, ogTitle, ogDescription, main, schema = [], headScript = "", extraScript = "" }) {
  const url = `${SITE_URL}${path}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SenXDev">
  <meta property="og:title" content="${esc(ogTitle)}">
  <meta property="og:description" content="${esc(ogDescription)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE_URL}/favicon.jpg">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${esc(ogTitle)}">
  <meta name="twitter:description" content="${esc(ogDescription)}">
  <meta name="theme-color" content="#000000">
  <link rel="icon" href="/assets/img/favicon.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/site.css">
  <link rel="stylesheet" href="/assets/css/ideas.css">${headScript}${schema.map((o) => `\n  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join("")}
</head>
<body class="ideas-page">
  <header class="plan-bar">
    <a class="brand" href="/" aria-label="SenXDev home"><img src="/assets/img/logo.png" alt="SenXDev" width="74" height="24"></a>
    <span>Automation ideas</span>
  </header>

  <main id="main" class="plan-main">
${main}
    <p class="print-only">SenXDev · senxdev.com · support@senxdev.com</p>
  </main>

  ${footerHTML("ideas")}
  ${PERSONALISE}${extraScript}
</body>
</html>
`;
}

const breadcrumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE_URL}${path}` })),
});

/* ---------- Shared sections ---------- */

// One idea in full, with its own booking button so nobody has to scroll to the end
// to act on it. `n` is its number on a type page; on /ideas the number and the
// "Start here" badge come from CSS, because the picker reorders the ideas.
// `book` is { biz, from } for its booking link.
function ideaArticle(idea, book, n) {
  return `
      <article class="idea"${n ? ` id="idea-${n}"` : ""} data-n="${idea.n}">
        <div class="idea-head">
          <span class="idea-n">${n ? `#${n}` : ""}</span>
          ${!n || n === 1 ? '<span class="start-here">Start here</span>' : ""}
        </div>
        <h2 class="idea-title">${esc(idea.title)}</h2>
        <p class="idea-summary">${esc(idea.summary)}</p>
        <h3 class="label">How it would work</h3>
        <ol class="plan-steps">
          ${idea.steps.map((s) => `<li>${esc(s)}</li>`).join("\n          ")}
        </ol>
        <dl class="facts">
          <div><dt>Takes off your plate</dt><dd>${esc(idea.takes_off_plate)}</dd></div>
          <div><dt>Setup time</dt><dd>${esc(idea.setup_time)}</dd></div>
        </dl>
        <a class="idea-book" ${calAttrs({ ...book, want: idea.title })} data-idea-book>
          <span>Set this up for my business →</span>
          <small>${CALL_MINUTES}-min call to plan it with you</small>
        </a>
      </article>`;
}

const SETUP_NOTE = `
    <p class="setup-note">Setup times cover building and testing. If your WhatsApp number isn't set up for automation yet, Meta's approval can add a few days to a couple of weeks.</p>`;

// The booking box under the ideas. `book` is calAttrs' { biz, want, from }.
function bookBox(book, attrs = "") {
  return `
    <section class="plan-cta mad-book" aria-labelledby="book-h"${attrs}>
      <h2 id="book-h">Want this running in your business?</h2>
      <p>Book a ${CALL_MINUTES}-min call. We'll look at how you work today, tell you which idea to start with and what it takes to set it up.</p>
      <a class="cta-btn" ${calAttrs(book)}>Book my ${CALL_MINUTES}-min call</a>
      <p class="cta-alt">Prefer not to call? Reply 'video' in our DM and we'll send a 3-minute recorded walkthrough instead.</p>
    </section>`;
}

/* ---------- /ideas ---------- */

export function renderIdeasIndex() {
  // Pain buttons drop a leading "on"/"with" that only reads well inside the sentence.
  const painLabel = (say) => say.replace(/^(on|with) /, "").replace(/^("?)(\w)/, (m, q, c) => q + c.toUpperCase());
  const ownForm = (kind, label, placeholder, button) => `
    <form class="mad-step mad-own" data-own="${kind}" hidden>
      <label class="label" for="own-${kind}">${label}</label>
      <div class="mad-own-row">
        <input id="own-${kind}" type="text" maxlength="60" autocomplete="off" placeholder="${placeholder}">
        <button type="submit" class="mad-go">${button}</button>
      </div>
      <button type="button" class="mad-link" data-restart>← Start over</button>
    </form>`;

  const opts = BUSINESS_TYPES.map((t, i) => `
        <a class="mad-opt" href="/ideas/${t.slug}" data-keep-name data-biz="${t.slug}" style="--i:${i}">${esc(t.sentence)}</a>`).join("");

  const steps = BUSINESS_TYPES.map((t) => `
    <div class="mad-step" data-pains="${t.slug}" hidden>
      <p class="label">What eats most of your time?</p>
      <div class="mad-pains">${t.pains.map((p) => `
        <button type="button" class="mad-pain" data-pain data-idea="${p.idea}" data-say="${esc(p.say)}">${esc(painLabel(p.say))}</button>`).join("")}
        <button type="button" class="mad-pain other" data-pain>Something else</button>
      </div>
      <button type="button" class="mad-link" data-restart>← Change business</button>
    </div>
    <section class="mad-step mad-result" data-result="${t.slug}" tabindex="-1" aria-label="Your 3 ideas" hidden>
      <div class="ideas" data-list>${t.ideas.map((idea, i) => ideaArticle({ ...idea, n: i + 1 }, { from: "/ideas" })).join("")}
      </div>${SETUP_NOTE}
    </section>`).join("");

  const main = `    <section class="plan-hero picker-hero" data-mad data-step="1">
      <div class="mad-progress" aria-hidden="true"><span></span><span></span><span></span></div>
      <p class="hello" data-hello hidden>Hey <span data-name></span>, finish the sentence.</p>
      <h1 class="mad-line"><span class="sr-only">Automation ideas for your business. </span>I run <span class="mad-blank" data-blank="biz">…</span></h1>
      <p class="mad-line" data-line2 hidden>and I'm stuck <span class="mad-blank" data-blank="pain">…</span></p>
    </section>

    <nav class="mad-step mad-opts" data-opts aria-label="Pick your type of business">${opts}
        <a class="mad-opt other" href="#other" data-biz="other" style="--i:${BUSINESS_TYPES.length}">something else</a>
    </nav>
${ownForm("biz", "What kind of business do you run?", "e.g. a bakery", "Next →")}
${ownForm("pain", "What eats most of your time?", "e.g. chasing payments", "Show my ideas →")}
${steps}
    <section class="mad-step mad-result mad-unlisted" data-result="other" tabindex="-1" hidden>
      <h2>We'll put your 3 ideas together</h2>
      <p>We haven't written ideas for your type of business on this page yet, so we'll work out 3 made for you. Book a call below and we'll go through them with you, or reply in our Instagram DM and we'll send them there.</p>
    </section>
${bookBox({ from: "/ideas" }, " data-book hidden")}
    <p class="mad-again" data-again hidden><button type="button" class="mad-link" data-restart>Start over</button></p>

    <section class="other-box" id="other" aria-labelledby="other-h">
      <h2 id="other-h">Not on the list?</h2>
      <p>Reply in our Instagram DM with what your business does and what takes up most of your time. We'll send you 3 ideas made for you.</p>
      <a class="cta-btn" ${calAttrs({ biz: "Not on the list", want: "3 ideas made for their business", from: "/ideas" })}>Or book a ${CALL_MINUTES}-min call</a>
    </section>`;

  return shell({
    path: "/ideas",
    title: "AI Automation Ideas for Your Business | SenXDev",
    description: "Practical AI automation ideas for restaurants, salons, clinics, real estate, online stores, gyms, agencies and more. Pick your business and see 3 ideas made for it.",
    ogTitle: "Your 3 automation ideas",
    ogDescription: "Pick your type of business and see 3 automations made for it.",
    main,
    schema: [breadcrumbs([["Home", "/"], ["Automation ideas", "/ideas"]])],
    headScript: `\n  <script>document.documentElement.classList.add("js")</script>`,
    extraScript: PICKER,
  });
}

/* ---------- /ideas/<slug> ---------- */

export function renderIdeasPage(t) {
  const book = { biz: t.sentence, from: `/ideas/${t.slug}` };
  const ideas = t.ideas.map((idea, i) => ideaArticle({ ...idea, n: i + 1 }, book, i + 1)).join("");

  const others = BUSINESS_TYPES.filter((o) => o.slug !== t.slug)
    .map((o) => `<a href="/ideas/${o.slug}" data-keep-name>${esc(o.name)}</a>`).join("");

  const main = `    <section class="plan-hero">
      <a class="back" href="/ideas" data-keep-name>← All business types</a>
      <p class="hello" data-hello hidden>Hey <span data-name></span> 👋 here are your 3 ideas.</p>
      <h1 class="plan-h1">3 automation ideas for <span class="type-title">${esc(t.short)}</span></h1>
    </section>

    <section class="told" aria-labelledby="told-h">
      <h2 class="label" id="told-h">Sound familiar?</h2>
      <p>${esc(t.timeWasters)}</p>
    </section>

    <section class="ideas" aria-label="3 ideas">${ideas}
    </section>${SETUP_NOTE}
${bookBox({ ...book, want: "Help choosing between the 3 ideas" })}

    <section class="switch" aria-label="Other business types">
      <p>Not quite your business? Pick another:</p>
      <div class="type-chips">${others}<a href="/ideas#other" data-keep-name>Something else</a></div>
    </section>`;

  return shell({
    path: `/ideas/${t.slug}`,
    title: `AI Automation Ideas for ${t.name} | SenXDev`,
    description: `3 practical automation ideas for ${t.short}: ${t.ideas.map((x) => x.title.toLowerCase()).join(", ")}. Built with WhatsApp, AI and the tools you already use.`,
    ogTitle: `3 automation ideas for ${t.short}`,
    ogDescription: `Practical automations for ${t.short}, built around the tools you already use.`,
    main,
    schema: [breadcrumbs([["Home", "/"], ["Automation ideas", "/ideas"], [t.name, `/ideas/${t.slug}`]])],
  });
}
