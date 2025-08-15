# GitHub Pages HTML/CSS/JS Template

A clean, no-build template inspired by minimal Jekyll blogs — but implemented in plain HTML/CSS/JS so you can drop it into GitHub Pages without Ruby or bundlers.

## Features
- Light/dark theme with `localStorage`
- Mobile-friendly, accessible navigation
- Blog-style posts powered by a simple `assets/posts.json`
- Projects preview on the home page (filter by the `project` tag)
- 404 page

## Getting Started
1. Create a new repo (or use your existing one).
2. Copy these files to the root of the repo.
3. Commit and push.
4. In your repo settings, enable **Pages** (deploy from the `main` branch root).
5. Visit your site once Pages finishes building.

### Customize
- **Brand & profile:** Edit titles and header text in `index.html` and `posts.html`.
- **Colors & type:** Tweak CSS variables at the top of `assets/style.css`.
- **Posts:** Add/edit items in `assets/posts.json`. Each post supports `id`, `title`, `date`, `tags`, `excerpt`, and `content` (HTML allowed).
- **Projects grid:** Add the `"project"` tag to any post to have it appear on the home page grid.

### Notes
- If you add folders like `/blog/slug/index.html`, you can link to them from posts instead of using JSON content.
- The contact form uses Formspree; replace the action URL with your own or remove the form.

MIT Licensed. Have fun!
