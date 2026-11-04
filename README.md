# Goldenplus Website V4 — News managed with JSON

Static multi-page website hosted with GitHub Pages. **New News articles no longer require copying HTML.**

## Add an article

1. Copy event photos to `assets/images/news/` (prefer `.webp`).
2. Edit **`data/news.json`** and add an entry with a unique `id`, date, category, status, title, summary and optional image.
3. For a complete article, add a `content` array. Supported blocks: `{ "type": "heading", "text": "..." }`, `{ "type": "paragraph", "text": "..." }`, `{ "type": "list", "items": ["...", "..."] }`.
4. Optionally set `event: {"name":"...","dates":"...","location":"..."}` and `gallery: ["assets/images/news/photo-01.webp"]`; `galleryAlt` provides descriptions.
5. **Do not create a new HTML file**. The News listing automatically links to `article.html?id=YOUR_ID` for articles with a non-empty `content` array. You may omit `url` for such articles. Items without `content` continue linking to their existing external `url`.
6. Test with a local HTTP server, then push to GitHub `main`.

Preview locally:

```sh
python3 -m json.tool data/news.json >/dev/null
python3 -m http.server 8000
```

Open `http://localhost:8000/news.html` and `http://localhost:8000/article.html?id=taiwan-smart-agriweek-2026`.

Publish:

```sh
git add .
git commit -m "Add Goldenplus news"
git push origin main
```

**Important:** This is a browser-rendered static site. Article contents load from JSON via JavaScript; dedicated per-article metadata and search crawler support may be limited compared with pre-rendered static pages. If SEO becomes important for every article, use a static site generator later.

The former `news/taiwan-smart-agriweek-2026.html` remains as a redirect for previously shared links. Existing product, About, Home and BDE pages are retained.
