import { JOBS, CONTACT } from "./data.js";
import { renderChrome, esc, icon, setMeta, splitText } from "./site.js";
import { postingHTML, jobPostingSchema, jobTags, tallyFormId } from "./markup.js";

renderChrome("careers");
const root = document.getElementById("role-root");

// Accepts /careers/<slug>, /careers/<slug>/apply, or role.html?slug=<slug>&apply=1
const parts = location.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
const q = new URLSearchParams(location.search);
const slug = q.get("slug") || (parts[0] === "careers" && parts[1] !== "role.html" ? parts[1] : "");
const applying = q.get("apply") === "1" || parts[2] === "apply";
const job = JOBS.find((j) => j.slug === slug);

const tags = jobTags;

function notFound() {
  setMeta({ title: "Role not found | SenXDev", description: "This role is no longer open.", path: location.pathname, robots: "noindex, follow" });
  root.innerHTML = `
    <a class="back" href="/careers/">${icon.arrowLeft(16)} All roles</a>
    <div class="empty" style="margin:40px 0 120px">
      <h3>This role isn't open anymore.</h3>
      <p>The link may be old, or the position has been filled. Take a look at what's open today.</p>
      <a class="btn btn-blue" href="/careers/">See open roles ${icon.arrow(16)}</a>
    </div>`;
}

function posting(j) {
  const path = `/careers/${j.slug}`;
  setMeta({ title: `${j.title} | Careers at SenXDev`, description: j.description, path });

  // Job pages built by scripts/build.mjs already carry their JobPosting data.
  if (!document.querySelector("script[data-job]")) {
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify(jobPostingSchema(j));
    document.head.append(ld);
  }

  root.innerHTML = postingHTML(j);
}

function apply(j) {
  const path = `/careers/${j.slug}`;
  setMeta({ title: `Apply: ${j.title} | SenXDev`, description: `Apply for ${j.title} at SenXDev.`, path: `${path}/apply`, robots: "noindex, follow" });

  const formId = tallyFormId(j);
  if (!formId) { posting(j); return; }
  const formUrl = `https://tally.so/r/${formId}?transparentBackground=1&originPage=${encodeURIComponent(location.pathname)}`;
  const embedUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&originPage=${encodeURIComponent(location.pathname)}`;

  root.innerHTML = `
    <a class="back" href="${path}">${icon.arrowLeft(16)} Back to the role</a>
    <header style="padding:28px 0 32px">
      <span class="kicker">Application</span>
      <h1 class="display h-md" data-split style="margin:14px 0 16px">${esc(j.title)}</h1>
      ${tags(j)}
    </header>
    <div class="apply-shell">
      <div class="apply-head">
        <span style="font-size:14px;color:var(--ink-2)">Your answers go straight to the SenXDev hiring team.</span>
        <a class="btn btn-ghost btn-sm" id="newtab" aria-disabled="true" target="_blank" rel="noopener">Open form in new tab ${icon.external(14)}</a>
      </div>
      <div class="apply-frame">
        <iframe id="tally" title="Application form for ${esc(j.title)}" loading="eager" height="560"></iframe>
        <div class="apply-state" id="st-loading" role="status">
          <div><div class="spinner"></div><p style="margin:0">Loading form…</p></div>
        </div>
        <div class="apply-state" id="st-failed" hidden>
          <div>
            <h3>The form didn't load.</h3>
            <p>An ad blocker or a patchy connection can stop embedded forms. Open it in its own tab instead, and it works the same.</p>
            <a class="btn btn-blue" href="${formUrl}" target="_blank" rel="noopener">Open form in new tab ${icon.external(16)}</a>
          </div>
        </div>
        <div class="apply-state" id="st-done" hidden>
          <div>
            <div class="tick" style="width:56px;height:56px;border-radius:50%;background:var(--ok);color:#fff;display:grid;place-items:center;margin:0 auto 18px">${icon.check(26)}</div>
            <h3>Application sent.</h3>
            <p>Thanks for applying for ${esc(j.title)}. We review every application and will contact you by email if there's a fit.</p>
            <a class="btn btn-ghost" href="/careers/">Back to all roles</a>
          </div>
        </div>
      </div>
    </div>`;

  const iframe = document.getElementById("tally");
  const newtab = document.getElementById("newtab");
  const show = (id) => ["st-loading", "st-failed", "st-done"].forEach((s) => (document.getElementById(s).hidden = s !== id));

  // The new-tab link only becomes live once the form URL is set.
  newtab.href = formUrl;
  newtab.removeAttribute("aria-disabled");

  let loaded = false;
  const failTimer = setTimeout(() => { if (!loaded) show("st-failed"); }, 12000);

  window.addEventListener("message", (e) => {
    if (typeof e.data !== "string" || !e.data.includes("Tally.")) return;
    if (e.data.includes("Tally.FormLoaded")) { loaded = true; clearTimeout(failTimer); show(null); }
    if (e.data.includes("Tally.FormSubmitted")) { show("st-done"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  });
  // Fallback for when Tally's postMessage doesn't arrive but the frame did load.
  iframe.addEventListener("load", () => setTimeout(() => { if (!loaded && iframe.src) { loaded = true; clearTimeout(failTimer); show(null); } }, 1500));

  // Tally's embed script adds dynamic height; load it once per session.
  iframe.dataset.tallySrc = embedUrl;
  const boot = () => (window.Tally ? window.Tally.loadEmbeds() : (iframe.src = embedUrl));
  if (window.Tally) boot();
  else {
    const s = document.createElement("script");
    s.src = "https://tally.so/widgets/embed.js";
    s.onload = boot;
    s.onerror = () => (iframe.src = embedUrl);
    document.body.append(s);
  }
}

if (!job) notFound();
else if (applying) apply(job);
else posting(job);
splitText(root);
