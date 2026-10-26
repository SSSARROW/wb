import {
  PROBLEMS, CUSTOM_PROBLEM, CUSTOM_EXAMPLES, OPTIONS, SLOT_LABELS, PRODUCTS, GOAL_DRAW, TIMELINE_WEEKS,
  INDUSTRIES, SERVICES, REASONS, PROCESS, PROJECTS, CONTACT, WEB3FORMS_KEY,
} from "./data.js";
import { renderChrome, esc, icon, observeReveals, tilt, reduceMotion } from "./site.js";
import { drawBlueprint } from "./blueprint.js";
import { projectCard, wireProjects } from "./work.js";
import { serviceRow, processCard, reasonCard } from "./markup.js";
import { runIntro } from "./intro.js";

renderChrome("home");
runIntro();
const $ = (id) => document.getElementById(id);
const SLOTS = ["who", "product", "goal", "when"];

/* =========================================================
   Hero state
   ========================================================= */

const state = { problem: 0, customText: "", ov: {}, open: null };

const base = () =>
  state.problem === "custom"
    ? { ...CUSTOM_PROBLEM, before: state.customText.trim() || CUSTOM_PROBLEM.before }
    : PROBLEMS[state.problem];
const val = (k) => state.ov[k] || base()[k];

// Typed answers still need a frame and a module to draw.
function productMeta(word) {
  if (PRODUCTS[word]) return PRODUCTS[word];
  if (/mobile|ios|android|\bapp\b/i.test(word)) return { id: "mobile", frame: "phone", service: "Mobile Apps" };
  if (/\bai\b|assistant|bot|chat/i.test(word)) return { id: "ai", frame: "chat", service: "AI Solutions" };
  if (/site|landing|page/i.test(word)) return { id: "website", frame: "browser", service: "Web Development" };
  return { id: "software", frame: "browser", service: "Custom build" };
}
function goalDraw(word, text = "") {
  if (GOAL_DRAW[word]) return GOAL_DRAW[word];
  const s = `${word} ${text}`;
  if (/book|appoint|reserv|schedul/i.test(s)) return "bookings";
  if (/sell|shop|store|order|pay|checkout/i.test(s)) return "sells";
  if (/question|support|answer|faq|help/i.test(s)) return "answers";
  if (/automat|admin|invoice|data|spreadsheet|document|manual/i.test(s)) return "automates";
  if (/track|report|number|dashboard|stock|count|kpi/i.test(s)) return "tracks";
  return "customers";
}
function whoId(word) {
  const m = word.match(/restaurant|clinic|retail|real-estate|school|enterprise|startup/i);
  return m ? m[0].toLowerCase().replace("real-estate", "realestate") : "";
}

const MODULES_BY_DRAW = {
  bookings: ["Booking calendar", "Email & SMS reminders", "Staff schedule view"],
  sells: ["Product catalogue", "Cart & checkout", "Order management"],
  customers: ["Customer & order records", "Status updates", "Role-based access"],
  answers: ["Knowledge base", "Conversational assistant", "Hand-off to a human"],
  automates: ["Workflow engine", "Integrations (Sheets, email, CRM)", "Audit trail"],
  tracks: ["Live dashboard", "Reports & exports", "Threshold alerts"],
};

function modules() {
  const b = base();
  if (!state.ov.goal) return b.modules;
  return MODULES_BY_DRAW[goalDraw(state.ov.goal)];
}

function sentenceText() {
  return `We're ${val("who")} and we need ${val("product")} that ${val("goal")}, live ${val("when")}.`;
}

/* =========================================================
   Rendering
   ========================================================= */

const problemsEl = $("problems");
// From tablet up only the first few problems show, so all three steps fit on one screen.
const VISIBLE_PROBLEMS = 4;
problemsEl.innerHTML = PROBLEMS.map((p, i) => `
  <li${i >= VISIBLE_PROBLEMS ? ' class="extra"' : ""}><button class="prob" type="button" data-i="${i}" aria-pressed="false">
    <span>${esc(p.t)}</span><span class="mk" aria-hidden="true">→</span><span class="bar" aria-hidden="true"></span>
  </button></li>`).join("");
$("custom-go").innerHTML = icon.pen(18);

const moreBtn = document.createElement("button");
moreBtn.type = "button";
moreBtn.className = "more-probs";
moreBtn.setAttribute("aria-expanded", "false");
moreBtn.textContent = `More problems (${PROBLEMS.length - VISIBLE_PROBLEMS}) ▾`;
problemsEl.after(moreBtn);
moreBtn.addEventListener("click", () => {
  const open = problemsEl.classList.toggle("expanded");
  moreBtn.setAttribute("aria-expanded", String(open));
  moreBtn.textContent = open ? "Fewer problems ▴" : `More problems (${PROBLEMS.length - VISIBLE_PROBLEMS}) ▾`;
  if (open) problemsEl.querySelector(".extra .prob")?.focus();
});
// How many problems are on screen right now (autoplay only cycles through those).
const shownProblems = () =>
  problemsEl.classList.contains("expanded") || !matchMedia("(min-width: 720px)").matches ? PROBLEMS.length : VISIBLE_PROBLEMS;

const chips = Object.fromEntries([...document.querySelectorAll(".chip")].map((c) => [c.dataset.slot, c]));

function setChip(slot, text) {
  const roll = chips[slot].querySelector(".roll");
  const now = roll.dataset.v;
  if (now === text) return;
  roll.dataset.v = text;
  chips[slot].setAttribute("aria-label", `${SLOT_LABELS[slot]}: ${text}. Change`);
  if (now === undefined || reduceMotion) { roll.innerHTML = `<span>${esc(text)}</span>`; return; }
  roll.innerHTML = `<span class="out">${esc(now)}</span><span class="in">${esc(text)}</span>`;
  clearTimeout(roll._t);
  roll._t = setTimeout(() => roll.querySelector(".out")?.remove(), 450);
}

function swapText(el, text) {
  if (el.textContent === text) return;
  el.textContent = text;
  el.classList.remove("swap");
  void el.offsetWidth;
  el.classList.add("swap");
}

let lastDraw = "";
let lastMods = "";

function render() {
  const b = base();

  problemsEl.querySelectorAll(".prob").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(Number(btn.dataset.i) === state.problem));
    btn.querySelector(".mk").textContent = Number(btn.dataset.i) === state.problem ? "●" : "→";
  });
  $("custom").classList.toggle("active", state.problem === "custom");

  SLOTS.forEach((k) => setChip(k, val(k)));
  swapText($("before"), b.before);
  swapText($("after"), b.after);

  const meta = productMeta(val("product"));
  swapText($("service"), meta.service);

  const draw = goalDraw(val("goal"), state.problem === "custom" ? state.customText : "");
  const drawKey = `${whoId(val("who"))}|${meta.id}|${draw}`;
  if (drawKey !== lastDraw) {
    lastDraw = drawKey;
    $("canvas").innerHTML = drawBlueprint({
      who: { id: whoId(val("who")) },
      product: { id: meta.id, frame: meta.frame, label: val("product") },
      goal: { id: draw, label: val("goal") },
    });
    const c = $("canvas");
    c.classList.remove("scan");
    void c.offsetWidth;
    if (!reduceMotion) c.classList.add("scan");
  }

  const mods = modules();
  if (mods.join("|") !== lastMods) {
    lastMods = mods.join("|");
    $("modules").innerHTML = mods.map((m, i) => `<li style="--i:${i}"><b>${"ABC"[i]}</b>${esc(m)}</li>`).join("");
  }

  const weeks = TIMELINE_WEEKS[val("when")] || 12;
  const bars = $("plan-bars").children;
  [0.15, 0.6, 0.25, 0.25].forEach((share, i) => (bars[i].style.flexGrow = (share * weeks).toFixed(2)));
  $("plan-when").textContent = TIMELINE_WEEKS[val("when")] ? `≈ ${weeks === 16 ? "flexible" : `${weeks} weeks`}` : val("when");

  $("wa-brief").href = `${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi SenXDev! ${briefMessage()}`)}`;
}

function briefMessage() {
  const custom = state.problem === "custom" && state.customText.trim() ? `The problem: ${state.customText.trim()}\n\n` : "";
  return `${custom}${sentenceText()}\n\nCore modules: ${modules().join(", ")}.`;
}

/* =========================================================
   Interactions
   ========================================================= */

function pickProblem(i) {
  state.problem = i;
  state.ov = {};
  closePicker(false);
  render();
}

problemsEl.addEventListener("click", (e) => {
  const b = e.target.closest(".prob");
  if (!b) return;
  pickProblem(Number(b.dataset.i));
  // On phones the next step is off-screen: take the visitor there.
  if (isPhone()) setTimeout(() => scrollToStep(1), 260);
});

/* ---------- Phones: guide the visitor through the stacked steps ---------- */
const isPhone = () => matchMedia("(max-width: 719px)").matches;
const stepEls = [...document.querySelectorAll(".step")];
const STEP_LABELS = ["Pick your problem", "Check your brief", "See what we'd build"];

function scrollToStep(n) {
  const el = stepEls[n];
  if (!el) return;
  const top = el.getBoundingClientRect().top + scrollY - 12;
  scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  el.classList.remove("nudge");
  void el.offsetWidth;
  el.classList.add("nudge");
}

const stepbar = $("stepbar");
let currentStep = 0;
function updateStepbar() {
  const box = $("steps").getBoundingClientRect();
  const show = isPhone() && box.top < innerHeight * 0.75 && box.bottom > innerHeight * 0.35;
  stepbar.classList.toggle("show", show);
  document.body.classList.toggle("stepbar-on", show);
  if (!show) return;
  let cur = 0;
  stepEls.forEach((el, i) => { if (el.getBoundingClientRect().top < innerHeight * 0.5) cur = i; });
  if (cur === currentStep && stepbar.dataset.ready) return;
  stepbar.dataset.ready = "1";
  currentStep = cur;
  stepbar.querySelectorAll(".stepbar-dots i").forEach((d, i) => {
    d.classList.toggle("on", i === cur);
    d.classList.toggle("done", i < cur);
  });
  $("sb-count").textContent = `Step ${cur + 1} of 3`;
  $("sb-label").textContent = STEP_LABELS[cur];
  $("sb-next").innerHTML = cur < 2 ? `Next <span aria-hidden="true">↓</span>` : `Send brief <span aria-hidden="true">→</span>`;
}
$("sb-next").addEventListener("click", () => {
  takeOver();
  if (currentStep < 2) scrollToStep(currentStep + 1);
  else $("send-brief").click();
});
let sbTick = false;
addEventListener("scroll", () => { if (!sbTick) { sbTick = true; requestAnimationFrame(() => { updateStepbar(); sbTick = false; }); } }, { passive: true });
addEventListener("resize", updateStepbar);
requestAnimationFrame(updateStepbar);

// Custom problem
const customInput = $("custom-problem");
customInput.addEventListener("focus", () => {
  stopTyping();
  if (state.problem !== "custom") { state.problem = "custom"; state.ov = {}; closePicker(false); render(); }
});
customInput.addEventListener("input", () => {
  state.customText = customInput.value;
  state.problem = "custom";
  render();
});
customInput.addEventListener("blur", () => { if (!customInput.value) startTyping(); });
customInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  if (isPhone()) { customInput.blur(); scrollToStep(1); }
  else chips.who.focus();
});
// The pen focuses the field; once something is typed it moves on to step 2.
$("custom-go").addEventListener("click", () => {
  if (!customInput.value.trim()) { customInput.focus(); return; }
  if (isPhone()) scrollToStep(1);
  else chips.who.focus();
});

// Example problems type themselves into the empty field.
let typeTimer = null;
function startTyping() {
  if (reduceMotion || customInput.value || document.activeElement === customInput) return;
  stopTyping();
  let ex = 0, ch = 0, dir = 1, hold = 0;
  typeTimer = setInterval(() => {
    const text = CUSTOM_EXAMPLES[ex];
    if (hold > 0) { hold--; return; }
    ch += dir;
    customInput.placeholder = `Something else? e.g. “${text.slice(0, ch)}”`;
    if (dir === 1 && ch >= text.length) { dir = -1; hold = 28; }
    else if (dir === -1 && ch <= 0) { dir = 1; ex = (ex + 1) % CUSTOM_EXAMPLES.length; hold = 6; }
  }, 55);
}
function stopTyping() {
  clearInterval(typeTimer);
  customInput.placeholder = "Something else? Type it here…";
}

// Word picker
const picker = $("picker");
const pickerInput = $("picker-input");

function openPicker(slot) {
  if (state.open === slot) { closePicker(); return; }
  state.open = slot;
  SLOTS.forEach((k) => chips[k].setAttribute("aria-expanded", String(k === slot)));
  $("picker-label").textContent = `Change “${SLOT_LABELS[slot].toLowerCase()}”`;
  $("picker-opts").innerHTML = OPTIONS[slot].map((t, i) =>
    `<button class="opt" type="button" style="--i:${i}" aria-pressed="${t === val(slot)}">${esc(t)}</button>`).join("");
  pickerInput.value = OPTIONS[slot].includes(val(slot)) ? "" : val(slot);
  pickerInput.placeholder = slot === "who" ? "Or type your own, e.g. a bakery" : "Or type your own…";
  picker.hidden = false;
  picker.style.animation = "none";
  void picker.offsetWidth;
  picker.style.animation = "";
  $("hint").hidden = true;
  (picker.querySelector('.opt[aria-pressed="true"]') || picker.querySelector(".opt")).focus({ preventScroll: true });
}

function closePicker(returnFocus = true) {
  if (!state.open) return;
  const slot = state.open;
  state.open = null;
  picker.hidden = true;
  $("hint").hidden = false;
  SLOTS.forEach((k) => chips[k].setAttribute("aria-expanded", "false"));
  if (returnFocus) chips[slot].focus({ preventScroll: true });
}

function setSlot(text) {
  const t = text.trim();
  if (!t || !state.open) return;
  state.ov[state.open] = t;
  closePicker();
  render();
}

SLOTS.forEach((k) => chips[k].addEventListener("click", () => openPicker(k)));
$("picker-opts").addEventListener("click", (e) => { const o = e.target.closest(".opt"); if (o) setSlot(o.textContent); });
$("picker-own").addEventListener("submit", (e) => { e.preventDefault(); setSlot(pickerInput.value); });
$("picker-x").addEventListener("click", () => closePicker());
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && state.open) closePicker(); });
document.addEventListener("pointerdown", (e) => {
  if (state.open && !picker.contains(e.target) && !e.target.closest(".chip")) closePicker(false);
});

/* ---------- Autoplay until the visitor takes over ---------- */
const CYCLE = 5000;
let auto = null;
let userTookOver = false;

function markTiming() {
  problemsEl.querySelectorAll(".prob").forEach((b) => {
    b.classList.remove("timing");
    if (auto && Number(b.dataset.i) === state.problem) { void b.offsetWidth; b.classList.add("timing"); }
  });
}
function startAuto() {
  if (reduceMotion || userTookOver || auto) return;
  problemsEl.style.setProperty("--cycle", `${CYCLE}ms`);
  auto = setInterval(() => {
    const next = typeof state.problem === "number" ? state.problem + 1 : 0;
    pickProblem(next % shownProblems());
    markTiming();
  }, CYCLE);
  markTiming();
}
function pauseAuto() { clearInterval(auto); auto = null; markTiming(); }
function takeOver() {
  if (userTookOver) return;
  userTookOver = true;
  pauseAuto();
  $("live-txt").textContent = "Your brief. Every white word is editable.";
}
["pointerdown", "keydown", "focusin"].forEach((ev) => $("steps").addEventListener(ev, takeOver));
new IntersectionObserver(([en]) => { if (en.isIntersecting) startAuto(); else pauseAuto(); }, { threshold: 0.3 }).observe($("steps"));

/* ---------- Hand the brief to the contact form ---------- */
$("send-brief").addEventListener("click", () => {
  const text = `${briefMessage()}\n\n`;
  const msg = $("f-message");
  const prev = msg.dataset.brief;
  msg.value = prev && msg.value.startsWith(prev) ? text + msg.value.slice(prev.length) : text + msg.value;
  msg.dataset.brief = text;
  const chip = $("brief-chip");
  chip.innerHTML = `${icon.spark(16)}<span><strong>Brief attached.</strong> Add anything else below: budget, links, must-haves.</span>`;
  chip.classList.remove("show");
  void chip.offsetWidth;
  chip.classList.add("show");
  showForm();
  $("contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  setTimeout(() => $("f-name").focus({ preventScroll: true }), reduceMotion ? 0 : 800);
});

// Links from other pages can preset the product: /?product=a%20mobile%20app#brief
const preset = new URLSearchParams(location.search).get("product");
if (preset && OPTIONS.product.includes(preset)) { state.ov.product = preset; userTookOver = true; $("live-txt").textContent = "Your brief. Every white word is editable."; }
render();
startTyping();

/* =========================================================
   Sections
   ========================================================= */

// Sections are prerendered by scripts/build.mjs; fill them only if they arrive empty.
const fill = (id, html) => { const el = $(id); if (!el.children.length) el.innerHTML = html; return el; };

fill("marquee", [...INDUSTRIES, ...INDUSTRIES].map((x) => `<span>${x}</span>`).join(""));

fill("svc-list", SERVICES.map(serviceRow).join("")).addEventListener("click", (e) => {
  const b = e.target.closest("[data-product]");
  if (!b) return;
  takeOver();
  state.ov.product = b.dataset.product;
  closePicker(false);
  render();
  $("brief").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  setTimeout(() => chips.goal.focus({ preventScroll: true }), reduceMotion ? 0 : 700);
});

const grid = fill("work-grid", PROJECTS.map((p) => projectCard(p)).join(""));
grid.querySelectorAll(".proj").forEach((el, i) => { el.classList.add("reveal"); el.style.setProperty("--i", i % 3); });
wireProjects(grid);
tilt(grid, ".proj");

fill("process-grid", PROCESS.map(processCard).join(""));
fill("reasons", REASONS.map(reasonCard).join(""));

/* =========================================================
   Contact
   ========================================================= */

fill("contact-list", [
  ["Email", CONTACT.email, `mailto:${CONTACT.email}`, false],
  ["Phone", CONTACT.phone, CONTACT.phoneHref, false],
  ["WhatsApp", CONTACT.phone, CONTACT.whatsapp, true],
  ["LinkedIn", "linkedin.com/company/senxdev", CONTACT.linkedin, true],
  ["Instagram", "@senxdev", CONTACT.instagram, true],
].map(([k, v, href, ext]) => `
  <li><a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>
    <span class="k">${k}</span><span class="v">${esc(v)}</span>${ext ? icon.external(16) : icon.arrow(16)}
  </a></li>`).join(""));

const form = $("contact-form");
const submitBtn = $("submit");
const alertBox = $("form-alert");

const rules = {
  name: (v) => (v.trim().length < 2 ? "Please enter your name." : ""),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Please enter a valid email address, like nick@example.com." : ""),
  phone: (v) => ((v.match(/\d/g) || []).length < 7 || /[a-z]/i.test(v) ? "Please enter a phone number with at least 7 digits." : ""),
  message: (v) => (v.trim().length < 10 ? "Tell us a little more about your project (at least 10 characters)." : ""),
};

function validateField(input) {
  const err = rules[input.name]?.(input.value) || "";
  input.setAttribute("aria-invalid", String(Boolean(err)));
  $(`e-${input.name}`).textContent = err;
  return !err;
}

Object.keys(rules).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => { if (input.value) validateField(input); });
  input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") validateField(input); });
});

function setSubmitting(on) {
  submitBtn.disabled = on;
  submitBtn.innerHTML = on ? `<span class="spinner" aria-hidden="true"></span> Sending…` : "Send message";
  form.setAttribute("aria-busy", String(on));
}

function showError(html) {
  alertBox.innerHTML = html;
  alertBox.hidden = false;
}

function showForm() {
  form.hidden = false;
  $("form-success").hidden = true;
}

let inFlight = false;
let lastSent = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (inFlight) return;
  alertBox.hidden = true;

  const inputs = Object.keys(rules).map((n) => form.elements[n]);
  const results = inputs.map(validateField);
  if (results.includes(false)) {
    inputs[results.indexOf(false)].focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  if (data.botcheck) return; // honeypot tripped: silently drop
  const fingerprint = `${data.email}|${data.message}`.trim();
  if (fingerprint === lastSent) {
    showError("You've already sent us this exact message. We have it and will reply soon.");
    return;
  }

  const payload = {
    access_key: WEB3FORMS_KEY,
    subject: `New enquiry from ${data.name.trim()} via senxdev.com`,
    from_name: "SenXDev website",
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    message: data.message.trim(),
  };

  inFlight = true;
  setSubmitting(true);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  const fallback = `<a href="${CONTACT.whatsapp}" target="_blank" rel="noopener">WhatsApp</a> or <a href="mailto:${CONTACT.email}">email</a>`;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    let json;
    try { json = await res.json(); } catch { json = null; }

    if (json?.success) {
      lastSent = fingerprint;
      form.reset();
      delete $("f-message").dataset.brief;
      $("brief-chip").classList.remove("show");
      inputs.forEach((i) => i.removeAttribute("aria-invalid"));
      form.hidden = true;
      $("tick").innerHTML = icon.check(28);
      $("form-success").hidden = false;
      $("form-success").focus();
    } else if (json) {
      showError(`Sorry, there was an error sending your message. Please try again, or reach us on ${fallback}.`);
    } else {
      showError(`We couldn't read the server's reply. Your message is still here, so please try again, or reach us on ${fallback}.`);
    }
  } catch (err) {
    const why = err.name === "AbortError" ? "The request timed out." : navigator.onLine === false ? "You appear to be offline." : "We couldn't reach our server.";
    showError(`${why} Your message is still here. Please try again, or reach us on ${fallback}.`);
  } finally {
    clearTimeout(timer);
    inFlight = false;
    setSubmitting(false);
  }
});

$("send-another").addEventListener("click", () => {
  showForm();
  $("f-name").focus();
});

observeReveals();
