'use strict';

// Only the production domain uses server-side clean URLs. GitHub Pages stays static.
(function () {
    const production = /^(www\.)?goldenplus-elec\.com\.tw$/i.test(window.location.hostname);
    const pages = { '/index.html': '/', '/products.html': '/products', '/news.html': '/news', '/about.html': '/about', '/bde.html': '/bde' };

    function url(value) {
        const target = new URL(value, document.baseURI);
        if (!production || target.origin !== window.location.origin) return target.href;
        const family = target.pathname === '/product.html' ? 'products' : target.pathname === '/article.html' ? 'news' : null;
        const id = target.searchParams.get('id');
        if (family && id && /^[A-Za-z0-9_-]+$/.test(id)) {
            target.pathname = `/${family}/${id}`;
            target.searchParams.delete('id');
        } else if (pages[target.pathname]) {
            target.pathname = pages[target.pathname];
        }
        return target.href;
    }

    function id(section) {
        if (production) {
            const match = window.location.pathname.match(new RegExp(`^/${section}/([A-Za-z0-9_-]+)/?$`));
            if (match) return match[1];
        }
        return new URLSearchParams(window.location.search).get('id');
    }

    window.GoldenplusRoutes = { url, id };
    if (!production) return;
    document.querySelectorAll('a[href]').forEach(link => {
        const value = link.getAttribute('href');
        // A root base URL must not send a same-page anchor back to the homepage.
        link.href = value.startsWith('#') ? window.location.pathname + window.location.search + value : url(value);
    });
})();
