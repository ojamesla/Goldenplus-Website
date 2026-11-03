# Goldenplus Electronics — New Homepage Prototype

This is a **standalone, local-first static HTML/CSS/JavaScript prototype** derived from the user's `Website.zip` backup. It does not require SitePro, PHP, WordPress, npm or a build step.

## Preview in Visual Studio Code

1. Extract the ZIP file.
2. Open the `Goldenplus-Website` folder in VS Code.
3. Open `index.html` in a browser, or use the Live Server extension (`Open with Live Server`).
4. Test desktop and mobile layouts using browser developer tools.

Alternative local web server:

```bash
cd Goldenplus-Website
python3 -m http.server 8000
```

Open http://localhost:8000.

## Site sections

- Hero / introduction
- Core solutions
- Pico Display product family (2.4, 2.8, 3.5, 4.3 inch)
- BDE software (GitHub Downloads / Examples)
- Tutorials and support resources
- Contact entry point (placeholder email: see below)

## Must verify before production

1. **Contact address:** Change `YOUR-CONTACT-EMAIL@example.com` in `index.html` to a verified corporate email. The email link is a placeholder and no form backend has been implemented.
2. **Product specifications:** The resolutions presented here were taken from the earlier site and should be verified against released hardware.
3. **Brand and images:** The optimized images were extracted from the provided backup. Confirm usage rights and marketing approval before publication.
4. **Version compatibility:** BDE v2.0.3.2 is listed as the latest published installer in the current materials. Example project minimum compatible versions have not been verified.
5. **Existing URLs:** Before replacing `httpdocs`, map old public URLs (such as `/Brilliant-IDE/`, `/Pico-Display/`) to the new pages with 301 redirects or preserve corresponding paths.
6. **Forms:** Existing SitePro/PHP contact form is **not** included. Rebuild or replace it after verifying email delivery and anti-spam functionality.
7. **SEO:** Add a real Open Graph social preview image, sitemap, robots.txt and confirmed canonical URLs when launch paths are final.
8. **Hosting:** Keep original `httpdocs` and SitePro project backups. Do not deploy blindly over the live site.

## File structure

```text
Goldenplus-Website/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/*.webp, *.png
└── README.md
```

## Deployment plan

Deploy only after review. This prototype uses relative image/script paths so it can run as a static site on Plesk. Its large assets are externally hosted on GitHub and YouTube. Production deployment should be performed to a staging subdirectory or subdomain first, with backups and rollback planned.
