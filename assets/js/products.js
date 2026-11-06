'use strict';

// The home page, catalog and detail template share one product data source.
(function () {
    const cardTargets = document.querySelectorAll('[data-product-cards]');
    const comparisonTarget = document.querySelector('[data-product-comparison]');
    const detailTarget = document.getElementById('product-body');
    const selectedId = window.GoldenplusRoutes.id('products');

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = String(text);
        return node;
    }

    function productLink(item, label, className) {
        const link = el('a', className || 'text-link', label);
        link.href = window.GoldenplusRoutes.url(`product.html?id=${encodeURIComponent(item.id)}`);
        return link;
    }

    function table(caption, columns, rows) {
        const wrapper = el('div', 'spec-scroll');
        wrapper.tabIndex = 0;
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', caption);
        const node = el('table', 'spec-table');
        node.appendChild(el('caption', '', caption));
        const head = el('thead');
        const header = el('tr');
        columns.forEach(value => {
            const cell = el('th', '', value);
            cell.scope = 'col';
            header.appendChild(cell);
        });
        head.appendChild(header);
        node.appendChild(head);
        const body = el('tbody');
        rows.forEach(row => {
            const line = el('tr');
            row.forEach((value, index) => {
                const cell = el(index === 0 ? 'th' : 'td', '', value);
                if (index === 0) cell.scope = 'row';
                line.appendChild(cell);
            });
            body.appendChild(line);
        });
        node.appendChild(body);
        wrapper.appendChild(node);
        return wrapper;
    }

    function cards(items, target) {
        const fragment = document.createDocumentFragment();
        const displayed = target.dataset.productCards === 'related' ? items.filter(item => item.id !== selectedId) : items;
        displayed.forEach(item => {
            const card = el('article', `family-card family-${item.id}`);
            card.appendChild(el('p', 'family-category', item.category));
            const heading = el('h3');
            heading.appendChild(productLink(item, item.name, 'family-title-link'));
            card.appendChild(heading);
            card.appendChild(el('p', 'family-summary', item.summary));
            const list = el('ul', 'family-highlights');
            item.highlights.forEach(value => list.appendChild(el('li', '', value)));
            card.appendChild(list);
            card.appendChild(productLink(item, 'View configurations →', 'text-link family-cta'));
            fragment.appendChild(card);
        });
        target.replaceChildren(fragment);
    }

    function renderComparison(items) {
        const rows = [
            ['Product format'].concat(items.map(item => item.comparison.format)),
            ['Integration'].concat(items.map(item => item.comparison.integration)),
            ['Display sizes'].concat(items.map(item => item.models.rows.map(row => row[0] + (item.id === 'omni' ? ': ' + row[1] : '')).join(' / '))),
            ['Selection focus'].concat(items.map(item => item.comparison.focus))
        ];
        comparisonTarget.replaceChildren(table('Goldenplus product family comparison', ['Selection guide'].concat(items.map(item => item.name)), rows));
        comparisonTarget.appendChild(el('p', 'catalog-note', 'Need a 5-inch or 7-inch platform, or another configuration? Contact us with your application requirements. Availability depends on the product family and selected model.'));
    }

    function renderDetail(item) {
        document.title = `${item.name} | Goldenplus Electronics`;
        document.querySelector('meta[name="description"]').content = item.summary;
        document.getElementById('product-category').textContent = `GOLDENPLUS / ${item.category.toUpperCase()}`;
        document.getElementById('product-title').textContent = item.name;
        document.getElementById('product-summary').textContent = item.summary;
        document.getElementById('product-breadcrumb').textContent = item.name;
        document.getElementById('product-inquiry').href = `mailto:goldenplus@goldenplus-elec.com.tw?subject=${encodeURIComponent(item.name + ' inquiry')}`;
        const fragment = document.createDocumentFragment();
        const intro = el('div', 'product-intro-grid');
        const overview = el('div');
        overview.appendChild(el('p', 'section-kicker', 'PRODUCT OVERVIEW'));
        overview.appendChild(el('h2', '', item.tagline));
        overview.appendChild(el('p', 'section-lead', item.audience));
        const list = el('ul', 'check-list');
        item.highlights.forEach(value => list.appendChild(el('li', '', value)));
        overview.appendChild(list);
        intro.appendChild(overview);
        intro.appendChild(table(`${item.name} features`, ['Feature', 'Description'], item.facts));
        fragment.appendChild(intro);
        const configs = el('section', 'product-block');
        configs.appendChild(el('p', 'section-kicker', 'CONFIGURATIONS'));
        configs.appendChild(el('h2', '', 'Compare the formats.'));
        configs.appendChild(table(item.models.caption, item.models.columns, item.models.rows));
        configs.appendChild(el('p', 'catalog-note', item.note));
        fragment.appendChild(configs);
        const applications = el('section', 'product-block');
        applications.appendChild(el('p', 'section-kicker', 'APPLICATION IDEAS'));
        applications.appendChild(el('h2', '', 'Build around your equipment.'));
        const tags = el('ul', 'application-tags');
        item.applications.forEach(value => tags.appendChild(el('li', '', value)));
        applications.appendChild(tags);
        fragment.appendChild(applications);
        const downloads = el('section', 'product-block brochure-panel');
        downloads.appendChild(el('p', 'section-kicker', 'DOCUMENTS'));
        downloads.appendChild(el('h2', '', 'Product brochures.'));
        const links = el('div', 'brochure-links');
        item.downloads.forEach(file => {
            // Only serve PDFs from this site's brochure directory.
            if (!/^assets\/docs\/[a-z0-9-]+\.pdf$/.test(file.path)) return;
            const link = el('a', 'brochure-link', `${file.label} ↗`);
            link.href = file.path;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            links.appendChild(link);
        });
        downloads.appendChild(links);
        downloads.appendChild(el('p', 'catalog-note', 'Brochures describe the product range. Confirm model-specific specifications, availability and software compatibility with Goldenplus before ordering.'));
        fragment.appendChild(downloads);
        detailTarget.replaceChildren(fragment);
    }

    function fail(message) {
        cardTargets.forEach(target => target.replaceChildren(el('p', 'catalog-error', message)));
        if (comparisonTarget) comparisonTarget.replaceChildren(el('p', 'catalog-error', message));
        if (detailTarget) {
            document.title = 'Product not available | Goldenplus Electronics';
            document.getElementById('product-title').textContent = 'Product not available';
            document.getElementById('product-summary').textContent = 'Browse our product families or contact Goldenplus for assistance.';
            detailTarget.replaceChildren(el('p', 'catalog-error', message));
        }
    }

    fetch(new URL('data/products.json', document.baseURI), { cache: 'no-cache' })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(items => {
            if (!Array.isArray(items) || items.length !== 3 || !items.every(item => item && /^[a-z]+$/.test(item.id) && Array.isArray(item.highlights))) throw new Error('Invalid product catalog');
            if (detailTarget) {
                const item = items.find(entry => entry.id === selectedId);
                if (!item) {
                    fail('No matching product family was found. Use All products to choose a family.');
                    return;
                }
                renderDetail(item);
            }
            cardTargets.forEach(target => cards(items, target));
            if (comparisonTarget) renderComparison(items);
        })
        .catch(error => {
            console.error('Unable to load products:', error);
            fail('Unable to load product information. Please refresh the page or contact goldenplus@goldenplus-elec.com.tw.');
        });
})();
