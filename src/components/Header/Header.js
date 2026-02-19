import './Header.css';

export class Header {
    constructor({ target, stateManager, onViewChange, onThemeToggle }) {
        this.target = target;
        this.stateManager = stateManager;
        this.onViewChange = onViewChange;
        this.onThemeToggle = onThemeToggle;
        this.currentView = this.stateManager.getState('currentView');
        this.render();
        this.bindEvents();
        this.subscribeToState();
    }

    render() {
        this.target.innerHTML = `
            <div class="header-container">
                <nav class="view-navigator">
                    <button data-view="Todo" class="${this.currentView === 'Todo' ? 'active' : ''}">Todo</button>
                    <button data-view="Kanban" class="${this.currentView === 'Kanban' ? 'active' : ''}">Kanban</button>
                    <button data-view="Gantt" class="${this.currentView === 'Gantt' ? 'active' : ''}">Gantt</button>
                </nav>
                <div class="header-actions">
                    <button id="theme-toggle">Toggle Theme</button>
                    <div class="user-profile">User</div>
                </div>
            </div>
        `;
        this.updateActiveNavButton();
    }

    bindEvents() {
        this.target.querySelectorAll('.view-navigator button').forEach(button => {
            button.addEventListener('click', (event) => {
                const newView = event.target.dataset.view;
                this.onViewChange(newView);
            });
        });

        this.target.querySelector('#theme-toggle').addEventListener('click', () => {
            this.onThemeToggle();
        });
    }

    subscribeToState() {
        this.stateManager.subscribe('currentView', (newView) => {
            this.currentView = newView;
            this.updateActiveNavButton();
        });
    }

    updateActiveNavButton() {
        this.target.querySelectorAll('.view-navigator button').forEach(button => {
            if (button.dataset.view === this.currentView) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}