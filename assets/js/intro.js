// Home page intro. The hero headline starts big and centred (pure CSS under
// html.intro-on, so it's right from the first frame) while its words rise in.
// After a short hold every word glides from its big position into its place in
// the final title line (FLIP per word), and the input blocks rise in underneath.
//
// Whether it plays is decided before first paint by an inline script in
// index.html's <head>, which adds .intro-on. Any click, scroll, key or tap skips it.

const HOLD = 1600;      // time the big headline stays on screen
const GLIDE = 1050;     // time each word takes to settle
const GLIDE_FAST = 480; // when skipped
const STAGGER = 28;     // delay between words, in ms

export function runIntro() {
  const root = document.documentElement;
  const title = document.getElementById("hero-title");
  if (!root.classList.contains("intro-on") || !title) return;
  scrollTo(0, 0);

  const note = document.createElement("p");
  note.className = "intro-skip";
  note.setAttribute("aria-hidden", "true");
  note.textContent = "Click or scroll to skip";
  document.body.append(note);

  const skipEvents = ["wheel", "touchstart", "keydown", "pointerdown"];
  let done = false;

  const settle = (fast) => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    skipEvents.forEach((ev) => removeEventListener(ev, skip));
    note.classList.add("gone");

    const words = [...title.querySelectorAll(".w")];
    // First: where each word sits in the big headline.
    const first = words.map((w) => w.getBoundingClientRect());
    // Last: drop the big state so the title returns to its normal place. The rest of the
    // hero stays hidden ("settling") until the words have mostly landed.
    root.classList.add("intro-settling");
    root.classList.remove("intro-on");
    const last = words.map((w) => w.getBoundingClientRect());
    // Invert: put each word back where it was, at its old size...
    words.forEach((w, i) => {
      const a = first[i], b = last[i];
      w.style.transition = "none";
      w.style.transformOrigin = "0 0";
      w.style.transform = `translate(${(a.left - b.left).toFixed(1)}px, ${(a.top - b.top).toFixed(1)}px) scale(${(a.height / b.height).toFixed(3)})`;
    });
    void title.offsetWidth;
    // ...then play: every word glides into place.
    const ms = fast ? GLIDE_FAST : GLIDE;
    words.forEach((w, i) => {
      w.style.transition = `transform ${ms}ms cubic-bezier(0.65, 0, 0.15, 1) ${fast ? 0 : i * STAGGER}ms`;
      w.style.transform = "";
    });
    setTimeout(() => root.classList.remove("intro-settling"), fast ? 120 : ms * 0.75);
    setTimeout(() => {
      words.forEach((w) => { w.style.transition = ""; w.style.transformOrigin = ""; });
      note.remove();
    }, ms + words.length * STAGGER + 100);
  };
  const skip = () => settle(true);
  const timer = setTimeout(() => settle(false), HOLD);
  skipEvents.forEach((ev) => addEventListener(ev, skip, { passive: true }));
}
