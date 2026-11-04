'use strict';

// One shared article template. All article text and image paths come from data/news.json.
(function () {
    const title = document.getElementById('article-title');
    const category = document.getElementById('article-category');
    const summary = document.getElementById('article-summary');
    const body = document.getElementById('article-body');
    const id = new URLSearchParams(window.location.search).get('id');

    function el(tag, className, value) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (value !== undefined) node.textContent = String(value);
        return node;
    }

    function localImage(value) {
        if (typeof value !== 'string' || !value.startsWith('assets/images/news/')) return null;
        const url = new URL(value, document.baseURI);
        if (url.origin !== location.origin || !url.pathname.includes('/assets/images/news/')) return null;
        return url.href;
    }

    function render(item) {
        document.title = `${item.title} | Goldenplus Electronics`;
        const description = document.querySelector('meta[name="description"]');
        if (description) description.content = item.summary || item.title;
        category.textContent = `${item.category} / ${item.date}`;
        title.textContent = item.title;
        summary.textContent = item.summary || '';
        body.replaceChildren();

        const cover = localImage(item.image);
        if (cover) {
            const image = el('img', 'event-hero-image');
            image.src = cover;
            image.alt = item.imageAlt || item.title;
            body.appendChild(image);
        }

        if (item.event && typeof item.event === 'object') {
            const facts = el('div', 'event-facts');
            for (const [label, value] of [['Event', item.event.name], ['Dates', item.event.dates], ['Location', item.event.location]]) {
                if (!value) continue;
                const fact = el('div');
                fact.appendChild(el('strong', '', label));
                fact.appendChild(el('span', '', value));
                facts.appendChild(fact);
            }
            if (facts.childElementCount) body.appendChild(facts);
        }

        if (Array.isArray(item.content)) {
            item.content.forEach(block => {
                if (!block || typeof block !== 'object') return;
                if (block.type === 'heading') body.appendChild(el('h2', '', block.text || ''));
                if (block.type === 'paragraph') body.appendChild(el('p', '', block.text || ''));
                if (block.type === 'list' && Array.isArray(block.items)) {
                    const list = el('ul');
                    block.items.forEach(text => list.appendChild(el('li', '', text)));
                    body.appendChild(list);
                }
            });
        }

        if (Array.isArray(item.gallery) && item.gallery.length) {
            const gallery = el('div', 'event-gallery');
            item.gallery.forEach((path, index) => {
                const src = localImage(path);
                if (!src) return;
                const alt = Array.isArray(item.galleryAlt) && item.galleryAlt[index] ? item.galleryAlt[index] : `${item.title} photo ${index + 1}`;
                const figure = el('figure');
                const link = el('a');
                link.href = src;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                const image = el('img');
                image.src = src;
                image.alt = alt;
                image.loading = 'lazy';
                link.appendChild(image);
                figure.appendChild(link);
                figure.appendChild(el('figcaption', '', alt));
                gallery.appendChild(figure);
            });
            if (gallery.childElementCount) body.appendChild(gallery);
        }
    }

    function fail(message) {
        title.textContent = 'Article not available';
        summary.textContent = '';
        body.replaceChildren(el('p', 'news-error', message));
    }

    if (!id) {
        fail('No article was selected. Return to News & Updates.');
        return;
    }

    fetch('data/news.json', { cache: 'no-cache' })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(items => {
            if (!Array.isArray(items)) throw new Error('Invalid news data');
            const item = items.find(entry => entry && entry.id === id);
            if (!item || !Array.isArray(item.content) || !item.content.length) {
                fail('This article has no published content.');
                return;
            }
            render(item);
        })
        .catch(error => {
            console.error('Unable to load article:', error);
            fail('Unable to load news. Please try again later.');
        });
})();
