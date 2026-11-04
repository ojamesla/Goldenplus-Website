# Goldenplus Electronics Website — V2

A lightweight, responsive **four-page static website**, designed for GitHub Pages and Plesk hosting. No SitePro runtime, database, build system, or external CSS library is required.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Corporate homepage, solutions, products, short company-history preview, resources and contact |
| `about.html` | Company history from 2008 through 2025 and today; based on previous official copy |
| `products.html` | Pico Display overview (2.4 / 2.8 / 3.5 / 4.3-inch) and upcoming families |
| `bde.html` | Brilliant Display Editor product page, releases, examples and tutorials |

## Local preview

Open this folder in VS Code or run:

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`. Because every page is at repository root, it can also be deployed unchanged to `https://ojamesla.github.io/Goldenplus-Website/`.

## GitHub Pages publishing

Upload **the contents of this folder** to the `main` branch at the repository root. `index.html` must be in the root. GitHub Pages Settings: Deploy from a branch → `main` → `/(root)`.

## Important before public launch

- **Contact link:** Currently redirects to existing goldenplus-elec.com.tw homepage as a safe temporary route; verify the correct contact page or company email before launch.
- **Hardware specifications:** Screen sizes/resolutions are based on prior public materials; validate hardware, MCU, RAM, I/O and communications against authoritative product specs.
- **History:** Copy reflects historical text from the previous site. Verify claims and dates before publishing as an official replacement.
- **Images:** Selected photographs are adapted from the supplied legacy website, compressed to WebP for performance. Check image licensing and usage rights.
- **No contact form:** This static site does not send email or handle user-submitted data. Add a secure form service or backend separately if needed.
- **Old URLs:** If moving the production site away from SitePro, plan redirects from old product URLs to new routes to avoid broken inbound links.
- **Source privacy:** Do not upload the original SitePro backup, credentials, database exports or access tokens to this public repository.

## Structure

```
Goldenplus-Website-V2/
├── index.html
├── about.html
├── products.html
├── bde.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
└── README.md
```

## Design

Single shared stylesheet and JavaScript navigation. Each HTML file is independently editable and has a relative link structure compatible with GitHub Pages. No server-side code is needed.


## News & Updates (V3)

- `news.html`: separate news listing with category filters.
- `data/news.json`: **only file needed to maintain the news entries**.
- `assets/js/news.js`: loads JSON, sorts by latest date, shows the newest three entries on `index.html`, and renders all entries on `news.html`.
- The homepage has a **Latest News** section. All site pages have a **News** navigation link.

### Add a news entry

Edit `data/news.json` in VS Code. Keep JSON valid and use this object structure:

```json
{
    "id": "unique-item-id",
    "date": "2026-11-04",
    "category": "Product Update",
    "status": "Released",
    "title": "Announcement title",
    "summary": "A short, factual description.",
    "url": "https://example.com",
    "linkLabel": "Read more"
}
```

Supported filters: `Product Update`, `Examples`, `Tutorials`, `Roadmap`.
Dates and publication status for the starter entries should be reviewed before public publication; the items are editable examples based on available BDE milestones.

### Local testing

Run `python3 -m http.server 8000` inside the website folder and open `http://localhost:8000/`.
Do not use the `file://` URL for News testing: browsers typically block `fetch()` of local JSON files.

### Deploy on GitHub Pages

Copy **the contents** of this directory into the existing `Goldenplus-Website` repo root and commit to `main`. Preserve `index.html` at the root; upload `news.html`, `data/news.json`, and `assets/js/news.js` together.
