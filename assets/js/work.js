import { PROJECTS } from "./data.js";
import { esc, icon } from "./site.js";

export { projectCard } from "./markup.js";

/** Image loading / failed states for any project media in `root`. */
export function wireImages(root) {
  root.querySelectorAll(".proj-media img, .focus-media img").forEach((img) => {
    const media = img.parentElement;
    const done = () => img.classList.add("loaded");
    const fail = () => media.classList.add("failed");
    if (img.complete) (img.naturalWidth ? done() : fail());
    img.addEventListener("load", done);
    img.addEventListener("error", fail);
  });
}

let dialog;

function ensureDialog() {
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.className = "focus";
  dialog.setAttribute("aria-labelledby", "focus-title");
  document.body.append(dialog);
  // Click on the backdrop (outside the dialog box) dismisses it.
  dialog.addEventListener("click", (e) => {
    const r = dialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (location.hash.startsWith("#project-")) history.replaceState(null, "", location.pathname + location.search);
  });
  return dialog;
}

export function openProject(id, opener) {
  const p = PROJECTS.find((x) => String(x.id) === String(id));
  if (!p) return;
  const dlg = ensureDialog();
  dlg.style.setProperty("--accent", p.color);
  dlg.innerHTML = `
    <button class="focus-close" type="button" aria-label="Close">${icon.close(20)}</button>
    <div class="focus-media proj-media" style="--accent:${p.color}">
      <img src="${p.image}" alt="${esc(p.title)}, shown on laptop, tablet and phone" width="1376" height="768">
      <span class="fallback" aria-hidden="true">${esc(p.title)}</span>
    </div>
    <div class="focus-body">
      <div>
        <p class="focus-label">Interactive Design Showcase · ${esc(p.category)}</p>
        <h2 class="focus-title" id="focus-title">${esc(p.title)}</h2>
        <p class="focus-desc">${esc(p.description)}</p>
      </div>
      <div class="focus-side">
        <p class="disclaimer">This is a high-fidelity design concept for visual demonstration.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn-on-dark" href="${p.url}" target="_blank" rel="noopener">Explore design ${icon.external(16)}</a>
          <a class="btn btn-ghost-dark" href="/#brief">Build one like it</a>
        </div>
      </div>
    </div>`;
  dlg.querySelector(".focus-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("close", () => opener?.focus(), { once: true });
  wireImages(dlg);
  dlg.showModal();
  history.replaceState(null, "", `#project-${p.id}`);
}

export function wireProjects(root) {
  wireImages(root);
  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project]");
    if (btn) openProject(btn.dataset.project, btn);
  });
  const m = location.hash.match(/^#project-(\d+)$/);
  if (m) openProject(m[1]);
}
