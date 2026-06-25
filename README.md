# Game Dev Portfolio

Vite + React portfolio, content-driven by a single JSON file. Hosts on GitHub Pages.

## Edit your content

Everything lives in **`src/data/portfolio.json`** — no code changes needed.

- `profile` — your name, role, tagline, email, social links.
- `skills` — array of strings.
- `projects[]` — each project has `title`, `year`, `role`, `summary`,
  `description`, `tags`, `highlights`, `links`, plus `accent`
  (`pink` | `gold` | `mint` | `blue`).
- `projects[].cta` — the main call-to-action button shown in the project
  modal: `{ "text": "Go to project", "url": "https://..." }`. Both `text`
  and `url` are editable; if `text` is omitted it defaults to "Go to project".

### Images & video
Put files in `public/media/` and reference them as `/media/filename.ext`.

Each project has a `cover` and a `gallery[]`. Supported media types:

```json
{ "type": "image",   "src": "/media/shot.png",  "alt": "..." }
{ "type": "video",   "src": "/media/clip.mp4",  "alt": "..." }   // self-hosted file
{ "type": "youtube", "src": "dQw4w9WgXcQ",       "alt": "..." }   // just the video ID
```

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. Push to a GitHub repo (branch `main`).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. The included workflow builds and deploys on every push.

The site serves from `https://<user>.github.io/<repo>/`. The `base` path is
set automatically from the repo name by the deploy workflow — no manual edits.
If you use a custom domain or a `<user>.github.io` repo, set `base: "/"` in
`vite.config.js`.
