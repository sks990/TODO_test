import stateManager from '../utils/StateManager.js';

const Header = ({ onViewChange, onThemeToggle }) => {
    const headerElement = document.createElement('header');
    headerElement.className = 'app-header';

    const views = ['Todo', 'Kanban', 'Gantt']; // Available views

    // Template for the header content
    const renderHeaderContent = (currentView) => `
        <div class="container header-content">
            <div class="logo">TaskMaster</div>
            <nav class="nav-menu">
                <ul>
                    ${views.map(view => `
                        <li><a href="#" class="${currentView === view ? 'active' : ''}" data-view="${view}">${view}</a></li>
                    `).join('')}
                </ul>
            </nav>
            <button class="theme-toggle-button" aria-label="Toggle theme">
                ${stateManager.getState().theme === 'light' ? '🌙' : '☀️'}
            </button>
        </div>
    `;

    // Initial render
    headerElement.innerHTML = renderHeaderContent(stateManager.getState().currentView);

    // Event listeners
    const attachEventListeners = () => {
        // Navigation links
        headerElement.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.target.dataset.view;
                if (view) {
                    onViewChange(view);
                }
            });
        });

        // Theme toggle button
        const themeToggleButton = headerElement.querySelector('.theme-toggle-button');
        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', () => {
                onThemeToggle();
                // Update button icon immediately
                const newTheme = stateManager.getState().theme;
                themeToggleButton.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
            });
        }
    };

    attachEventListeners();

    // Method to update the active navigation item based on current view
    headerElement.updateActiveNav = (currentView) => {
        headerElement.querySelectorAll('.nav-menu a').forEach(link => {
            if (link.dataset.view === currentView) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        // Update theme toggle button icon if theme changed
        const themeToggleButton = headerElement.querySelector('.theme-toggle-button');
        if (themeToggleButton) {
            themeToggleButton.innerHTML = stateManager.getState().theme === 'light' ? '🌙' : '☀️';
        }
    };

    // Re-render the header content if necessary (e.g., on state change that affects header)
    // For this simple header, only theme toggle requires immediate visual update, handled by updateActiveNav.
    // If the logo or nav items were dynamic, a full re-render might be needed here.

    return headerElement;
};

export default Header;