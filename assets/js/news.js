'use strict';

(function () {
    const targets = Array.from(document.querySelectorAll('[data-news-list]'));
    if (!targets.length) return;

    const filters = Array.from(document.querySelectorAll('[data-news-filter]'));
    let currentCategory = 'All';
    let items = [];

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function formatDate(value) {
        const parts = String(value).split('-');
        if (parts.length !== 3) return String(value);
        return `${parts[0]}.${parts[1]}.${parts[2]}`;
    }

    function safeUrl(value) {
        try {
            const url = new URL(value, window.location.href);
            if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
            return url.href;
        } catch (error) {
            return null;
        }
    }

    function makeCard(item) {
        const card = createElement('article', 'news-card');
        const meta = createElement('div', 'news-meta');
        const date = createElement('time', 'news-date', formatDate(item.date));
        date.dateTime = item.date;
        meta.appendChild(date);
        meta.appendChild(createElement('span', 'news-category', item.category));
        const imageUrl = item.image ? safeUrl(item.image) : null;
        if (imageUrl) {
            const media = createElement('div', 'news-card-media');
            const img = createElement('img', 'news-card-image');
            img.src = imageUrl;
            img.alt = item.imageAlt || item.title;
            img.loading = 'lazy';
            img.decoding = 'async';
            media.appendChild(img);
            card.appendChild(media);
        }
        card.appendChild(meta);
        card.appendChild(createElement('h3', '', item.title));
        card.appendChild(createElement('p', 'news-summary', item.summary));
        const bottom = createElement('div', 'news-card-bottom');
        bottom.appendChild(createElement('span', 'news-status', item.status));
        const url = safeUrl(item.url);
        if (url) {
            const link = createElement('a', 'news-link', `${item.linkLabel || 'Read more'} →`);
            link.href = url;
            if (new URL(url).origin !== window.location.origin) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
            bottom.appendChild(link);
        }
        card.appendChild(bottom);
        return card;
    }

    function render() {
        targets.forEach(target => {
            const latestOnly = target.dataset.newsList === 'latest';
            let visible = items.filter(item => latestOnly ? item.category !== 'Roadmap' : currentCategory === 'All' || item.category === currentCategory);
            if (latestOnly) visible = visible.slice().sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 3);
            target.replaceChildren();
            if (!visible.length) {
                target.appendChild(createElement('p', 'news-empty', 'No updates in this category yet.'));
                return;
            }
            visible.forEach(item => target.appendChild(makeCard(item)));
        });
    }

    filters.forEach(button => button.addEventListener('click', () => {
        currentCategory = button.dataset.newsFilter;
        filters.forEach(item => {
            const active = item === button;
            item.classList.toggle('is-active', active);
            item.setAttribute('aria-pressed', String(active));
        });
        render();
    }));

    fetch('data/news.json', { cache: 'no-cache' })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Invalid news format');
            items = data.filter(item => item && item.title && item.date && item.category)
                .sort((a, b) => String(b.date).localeCompare(String(a.date)));
            render();
        })
        .catch(error => {
            console.error('Could not load news.json:', error);
            targets.forEach(target => {
                target.replaceChildren(createElement('p', 'news-error', 'News is temporarily unavailable. Please try again later.'));
            });
        });
})();
