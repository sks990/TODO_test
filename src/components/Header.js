import { createElement, getElement } from '../utils/helpers.js';
import { VIEWS } from '../utils/constants.js';

export default class Header {
    constructor({ onViewChange, onThemeToggle }) {
        this.onViewChange = onViewChange;
        this.onThemeToggle = onThemeToggle;
        this.viewButtons = {}; // To store references to view buttons
    }

    render(currentView) {
        const header = createElement('header');

        const leftDiv = createElement('div', { className: 'header-left' });
        const title = createElement('h1', { textContent: 'Task Manager' });
        leftDiv.appendChild(title);

        const nav = createElement('nav');
        const ul = createElement('ul');

        // Navigation links
        Object.keys(VIEWS).forEach(key => {
            const view = VIEWS[key];
            const li = createElement('li');
            const a = createElement('a', {
                href: '#',
                textContent: `${view.charAt(0).toUpperCase()}${view.slice(1)}`,
                dataset: { view: view }
            });
            this.viewButtons[view] = a; // Store reference

            // Add active class based on currentView
            if (view === currentView) {
                a.classList.add('active');
            }

            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.onViewChange(view);
                this.updateActiveView(view);
            });
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);

        // Theme toggle button
        const themeToggleBtn = createElement('button', {
            className: 'theme-toggle',
            textContent: '🌙' // Default to moon for light mode
        });
        themeToggleBtn.addEventListener('click', () => {
            this.onThemeToggle();
            this.updateThemeToggleIcon();
        });

        header.appendChild(leftDiv);
        header.appendChild(nav);
        header.appendChild(themeToggleBtn);

        this.updateThemeToggleIcon(); // Set initial icon

        return header;
    }

    updateActiveView(newView) {
        Object.keys(this.viewButtons).forEach(view => {
            if (view === newView) {
                this.viewButtons[view].classList.add('active');
            } else {
                this.viewButtons[view].classList.remove('active');
            }
        });
    }

    updateThemeToggleIcon() {
        const themeToggleBtn = getElement('.theme-toggle');
        if (themeToggleBtn) {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            themeToggleBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    // Method to be called by App when state updates
    update(state) {
        // Re-render the header, mainly to update active view link
        const oldHeader = getElement('header');
        if (oldHeader) {
            const newHeaderElement = this.render(state.currentView);
            oldHeader.replaceWith(newHeaderElement);
        }
        this.updateThemeToggleIcon(); // Ensure icon is correct on any state change
    }
}