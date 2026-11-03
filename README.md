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
