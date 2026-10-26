import { icon, esc, headerHTML, footerHTML } from "./markup.js";

export { icon, esc };
export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = matchMedia("(pointer: fine)").matches;

/**
 * Header, footer, WhatsApp shortcut and ambient motion, shared by every page.
 * Pages built by scripts/build.mjs already contain the header and footer; any
 * page without them gets them inserted here.
 */
export function renderChrome(active) {
  document.documentElement.classList.remove("no-js");
  if (!document.querySelector(".site-header")) document.body.insertAdjacentHTML("afterbegin", headerHTML(active));
  if (!document.querySelector(".site-footer")) document.body.insertAdjacentHTML("beforeend", footerHTML(active));

  const header = document.querySelector(".site-header");
  const mobile = document.getElementById("mobile-nav");
  const progress = document.querySelector(".progress-line");

  // Mobile menu
  const menuBtn = header.querySelector(".menu-btn");
  const setMenu = (open) => {
    mobile.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.innerHTML = open ? icon.close(20) : icon.menu(20);
  };
  menuBtn.addEventListener("click", () => setMenu(!mobile.classList.contains("open")));
  mobile.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && mobile.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });

  // Sliding highlight behind the hovered nav link
  const pill = header.querySelector(".nav-pill");
  const blob = pill.querySelector(".blob");
  const moveBlob = (a) => {
    if (!a) { blob.style.opacity = "0"; return; }
    blob.style.opacity = "1";
    blob.style.width = `${a.offsetWidth}px`;
    blob.style.transform = `translateX(${a.offsetLeft}px)`;
  };
  pill.addEventListener("pointerover", (e) => moveBlob(e.target.closest("a")));
  pill.addEventListener("pointerleave", () => moveBlob(pill.querySelector('[aria-current="page"]')));
  requestAnimationFrame(() => moveBlob(pill.querySelector('[aria-current="page"]')));

  // Header hides on scroll down, returns on scroll up; progress line tracks the page.
  let lastY = scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("scrolled", y > 10);
    header.classList.toggle("hidden", y > 300 && y > lastY && !mobile.classList.contains("open"));
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  ambient();
  splitText();
  observeReveals();
  magnetic();
  requestAnimationFrame(() => document.body.classList.add("loaded"));
}

/** Soft glow that trails the cursor across the dark background. */
function ambient() {
  if (reduceMotion || !finePointer) return;
  const glow = document.createElement("div");
  glow.className = "glow";
  glow.setAttribute("aria-hidden", "true");
  document.body.prepend(glow);
  let tx = innerWidth / 2, ty = innerHeight / 3, x = tx, y = ty, running = false;
  const tick = () => {
    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;
    glow.style.setProperty("--gx", `${x.toFixed(1)}px`);
    glow.style.setProperty("--gy", `${y.toFixed(1)}px`);
    if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) requestAnimationFrame(tick);
    else running = false;
  };
  addEventListener("pointermove", (e) => {
    tx = e.clientX; ty = e.clientY;
    glow.classList.add("on");
    if (!running) { running = true; requestAnimationFrame(tick); }
  }, { passive: true });
  document.addEventListener("pointerleave", () => glow.classList.remove("on"));
}

/** Wrap each word of [data-split] headings so they rise in one after another. */
export function splitText(root = document) {
  root.querySelectorAll("[data-split]:not([data-split-done])").forEach((el) => {
    el.dataset.splitDone = "1";
    let i = 0;
    const walk = (node) => {
      for (const child of [...node.childNodes]) {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          for (const part of child.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) { frag.append(" "); continue; }
            const w = document.createElement("span");
            w.className = "w";
            w.style.setProperty("--i", i++);
            const inner = document.createElement("span");
            inner.textContent = part;
            w.append(inner);
            frag.append(w);
          }
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
          walk(child);
        }
      }
    };
    walk(el);
    el.classList.add("reveal-split");
  });
  observeReveals(root, "[data-split]");
}

export function observeReveals(root = document, selector = ".reveal, [data-split], .pcard, .reason") {
  const els = root.querySelectorAll(selector);
  if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((el) => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
}

/** Buttons drift toward the cursor and light up where it touches them. */
export function magnetic(root = document) {
  if (reduceMotion || !finePointer) return;
  root.addEventListener("pointermove", (e) => {
    const b = e.target.closest?.(".btn");
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", `${e.clientX - r.left}px`);
    b.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (b.hasAttribute("data-magnetic")) {
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
      b.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    }
  });
  root.addEventListener("pointerout", (e) => {
    const b = e.target.closest?.("[data-magnetic]");
    if (b && !b.contains(e.relatedTarget)) b.style.transform = "";
  });
}

/** Cards tilt toward the cursor. */
export function tilt(root, selector) {
  if (reduceMotion || !finePointer) return;
  root.addEventListener("pointermove", (e) => {
    const c = e.target.closest(selector);
    if (!c) return;
    const r = c.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    c.classList.add("tilting");
    c.style.setProperty("--ry", `${(px * 6).toFixed(2)}deg`);
    c.style.setProperty("--rx", `${(-py * 5).toFixed(2)}deg`);
  });
  root.addEventListener("pointerout", (e) => {
    const c = e.target.closest(selector);
    if (c && !c.contains(e.relatedTarget)) {
      c.classList.remove("tilting");
      c.style.setProperty("--rx", "0deg");
      c.style.setProperty("--ry", "0deg");
    }
  });
}

/** Per-screen SEO tags, for pages whose content is decided at runtime. */
export function setMeta({ title, description, path, robots = "index, follow" }) {
  const url = `https://senxdev.com${path}`;
  document.title = title;
  const set = (attr, key, val) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.append(el); }
    el.setAttribute("content", val);
  };
  set("name", "description", description);
  set("name", "robots", robots);
  set("property", "og:title", title);
  set("property", "og:description", description);
  set("property", "og:url", url);
  set("name", "twitter:title", title);
  set("name", "twitter:description", description);
  let canon = document.head.querySelector('link[rel="canonical"]');
  if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.append(canon); }
  canon.href = url;
}
