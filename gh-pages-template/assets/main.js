/* Main JS: theme toggle, mobile nav, year, posts loader */
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Footer year
  const year = new Date().getFullYear();
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = year;

  // Theme toggle
  const themeBtn = $("#theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const root = document.documentElement;
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch(e){}
    });
  }

  // Mobile nav
  const toggle = $("#nav-toggle");
  const menu = $("#nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Projects preview on home (pull from posts.json with tag 'project')
  const projectGrid = $("#project-grid");
  if (projectGrid) {
    fetch("assets/posts.json").then(r => r.json()).then(posts => {
      const projects = posts.filter(p => (p.tags || []).includes("project")).slice(0, 6);
      if (!projects.length) {
        projectGrid.innerHTML = '<p class="meta">No projects yet. Add some in <code>assets/posts.json</code>.</p>';
        return;
      }
      projectGrid.innerHTML = projects.map(p => `
        <article class="card">
          <h3><a href="posts.html#id=${encodeURIComponent(p.id)}">${p.title}</a></h3>
          <div class="meta">${p.date} • ${p.tags.join(", ")}</div>
          <p>${p.excerpt}</p>
          <a class="button" href="posts.html#id=${encodeURIComponent(p.id)}">Read →</a>
        </article>
      `).join("");
    }).catch(() => {
      projectGrid.innerHTML = '<p class="meta">Could not load projects.</p>';
    });
  }

  // Posts page
  const postList = $("#post-list");
  if (postList) {
    const search = $("#search");
    const tagFilter = $("#tag-filter");

    fetch("assets/posts.json").then(r => r.json()).then(posts => {
      // build tag options
      const tags = Array.from(new Set(posts.flatMap(p => p.tags || []))).sort();
      tags.forEach(t => {
        const opt = document.createElement("option");
        opt.value = t; opt.textContent = t;
        tagFilter.appendChild(opt);
      });

      function render(list) {
        if (!list.length) {
          postList.innerHTML = '<li class="meta">No matching posts.</li>';
          return;
        }
        postList.innerHTML = list.map(p => `
          <li>
            <a href="#id=${encodeURIComponent(p.id)}"><strong>${p.title}</strong></a>
            <div class="meta">${p.date} • ${p.tags.join(", ")}</div>
            <p>${p.excerpt}</p>
          </li>
        `).join("");
      }

      function applyFilters() {
        const q = (search.value || "").toLowerCase();
        const tag = tagFilter.value;
        let list = posts.slice();
        if (tag) list = list.filter(p => (p.tags || []).includes(tag));
        if (q) list = list.filter(p => p.title.toLowerCase().includes(q) || (p.excerpt||"").toLowerCase().includes(q));
        render(list);
      }

      // support deep linking: #id=post-1 or #tag=project
      function handleHash() {
        const h = window.location.hash.slice(1);
        if (!h) { applyFilters(); return; }
        const [k, v] = h.split("=");
        if (k === "tag" && v) {
          tagFilter.value = decodeURIComponent(v);
          applyFilters();
          return;
        }
        if (k === "id" && v) {
          const id = decodeURIComponent(v);
          const p = posts.find(x => x.id === id);
          if (p) {
            postList.innerHTML = `
              <article class="card">
                <a class="button" href="posts.html">← All posts</a>
                <h1>${p.title}</h1>
                <div class="meta">${p.date} • ${p.tags.join(", ")}</div>
                <hr/>
                <div>${p.content}</div>
              </article>
            `;
            return;
          }
        }
        applyFilters();
      }

      search.addEventListener("input", applyFilters);
      tagFilter.addEventListener("change", applyFilters);
      window.addEventListener("hashchange", handleHash);

      // initial render
      handleHash();
    }).catch(() => {
      postList.innerHTML = '<li class="meta">Could not load posts.</li>';
    });
  }
})();
