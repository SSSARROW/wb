import { JOBS, JOB_CATEGORIES, CONTACT } from "./data.js";
import { renderChrome, esc } from "./site.js";
import { roleRow } from "./markup.js";

renderChrome("careers");

const filters = document.getElementById("filters");
const wrap = document.getElementById("roles-wrap");
const params = new URLSearchParams(location.search);
let active = JOB_CATEGORIES.includes(params.get("category")) ? params.get("category") : "All";

const count = (c) => (c === "All" ? JOBS.length : JOBS.filter((j) => j.category === c).length);
document.getElementById("role-count").textContent = `(${JOBS.length})`;

function render() {
  filters.innerHTML = JOB_CATEGORIES.map((c) => `
    <button class="chip" type="button" data-cat="${c}" aria-pressed="${c === active}">
      ${c} <span class="count">${count(c)}</span>
    </button>`).join("");

  const list = active === "All" ? JOBS : JOBS.filter((j) => j.category === active);

  if (!JOBS.length) {
    wrap.innerHTML = empty("No openings right now.", "We're not hiring at the moment, but we're always glad to hear from great people.");
  } else if (!list.length) {
    wrap.innerHTML = empty(
      `No ${esc(active)} roles open right now.`,
      `We don't have a ${esc(active.toLowerCase())} opening today. Send us a note and we'll keep you in mind, or browse every open role.`,
      true,
    );
  } else {
    wrap.innerHTML = `<ul class="roles">${list.map(roleRow).join("")}</ul>`;
  }
}

function empty(title, body, showAll = false) {
  return `<div class="empty">
    <h3>${title}</h3><p>${body}</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      ${showAll ? `<button class="btn btn-ghost" type="button" data-cat="All">See all roles</button>` : ""}
      <a class="btn" href="mailto:${CONTACT.email}?subject=${encodeURIComponent("Future roles at SenXDev")}">Email us</a>
    </div></div>`;
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-cat]");
  if (!b) return;
  active = b.dataset.cat;
  const url = active === "All" ? location.pathname : `${location.pathname}?category=${active}`;
  history.replaceState(null, "", url);
  render();
});

render();
