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

## Product catalog

The homepage family cards, product listing, comparison and shared `product.html?id=pico` detail page load `data/products.json`. The other family IDs are `aeternus` and `omni`. Product photos are optional; current catalog pages use text and tables.

Each family contains `id`, `name`, `category`, `tagline`, `summary`, `audience`, `highlights`, `facts`, `models` (`caption`, `columns`, `rows`), `note`, `applications`, `comparison` (`format`, `integration`, `focus`) and `downloads`. Keep the three family IDs stable. Downloads must point to PDFs under `assets/docs/`. The family comparison uses these same records.

English and Chinese brochures in `assets/docs/` are the original supplied exhibition PDFs. Published specifications follow these materials and the existing Pico display formats. Unconfirmed CPU/memory specifications and retail prices are intentionally omitted. Confirm any new model, size or interface before publishing it.

Preview through HTTP, not by opening HTML with `file://`:

```sh
python3 -m json.tool data/products.json >/dev/null
python3 -m http.server 8000
```

Check `/`, `/products.html`, and `/product.html?id=pico`, `?id=aeternus`, `?id=omni`. The detailed pages require JavaScript, as the News article template does. Search previews for individual query-string pages may not reflect dynamically populated metadata.

## Publishing updates and avoiding stale caches

Before uploading a release, run `python3 tools/update_asset_versions.py`. It adds a content hash to each root HTML page's local CSS/JavaScript URLs. Run it again whenever an asset changes; unchanged files keep their version. Upload the updated HTML **and** its matching assets together. This also works on GitHub Pages, which ignores `.htaccess` and `web.config`.

On the Apache production host, upload `.htaccess` too: HTML, CSS, JavaScript and JSON now require cache revalidation instead of retaining CSS/JS for eight days. Existing image caching is retained. The IIS `web.config` also requests revalidation for static files. Previously cached HTML can still need one force refresh after the first deployment of this fix.

Deploy from `feat/product-catalog` while this pull request is open; `main` does not contain the catalog until the PR is merged. Upload **both** `products.html` (listing) and `product.html` (shared detail template), plus the entire `assets/` and `data/` folders, to the same website root as `index.html`. Keep `.git/` on your computer. Check that uploads did not create a nested project directory.

The server configurations prefer `index.html` over old PHP homepages. Catalog paths are excluded from the legacy SiteBuilder fallback, so a missing `product.html` returns 404 instead of executing legacy PHP. This does not restore a missing file: upload the actual `product.html`. If an existing static file still returns 500, inspect the hosting error log.

After deployment, check `/`, `/products.html`, `/product.html?id=pico`, `/product.html?id=aeternus`, `/product.html?id=omni`, `/news.html` and `/data/products.json`. Confirm the new homepage title, rendered tables, brochure downloads and cache response headers.

## Production-only clean URLs

The production domains `goldenplus-elec.com.tw` and `www.goldenplus-elec.com.tw` use `/products`, `/products/pico`, `/products/aeternus`, `/products/omni`, `/news`, `/news/ARTICLE_ID`, `/about` and `/bde`. Upload the HTML, JavaScript and matching `.htaccess` (Apache) or `web.config` (IIS with URL Rewrite installed) together. The site must be installed at the domain root.

Server rules internally serve the existing HTML templates. Direct requests to supported old `.html` URLs redirect permanently to the new routes, with article/product IDs moved from the query string into the path. Detail IDs use letters, digits, underscores and hyphens. Keep new News IDs in this format; other IDs retain their existing query-string URLs. Canonical detail redirects discard the old query string. A trailing slash on supported routes redirects to the same route without it. Existing legacy News redirect files remain usable.

A small head bootstrap sets the production asset base to `/` before styles/scripts load. `assets/js/routes.js` converts navigation and dynamic product/news links, reads IDs from clean paths, and preserves in-page anchors. Data and article images resolve from the site base, so nested routes do not request `/products/assets` or `/news/data` by mistake.

On GitHub Pages and localhost, the production host check is false: the original `.html?id=...` URLs and repository-relative assets continue working. GitHub Pages does not apply the server rewrite files. Clean paths are therefore tested in production hosting; refreshing a nested URL requires the matching server rules and template files to be present.
