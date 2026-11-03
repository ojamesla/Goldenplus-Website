'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('primary-nav');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        const expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!expanded));
        navigation.classList.toggle('is-open', !expanded);
        menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    });

    navigation.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('is-open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open navigation');
        });
    });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
