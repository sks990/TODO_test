import { Header } from './components/Header/Header.js';
import { MainContent } from './components/MainContent/MainContent.js';
import { ModalContainer } from './components/ModalContainer/ModalContainer.js';
import { StateManager } from './services/StateManager.js'; // Assuming StateManager is in services

export class App {
    constructor({ target, stateManager }) {
        this.target = target;
        this.stateManager = stateManager;
        this.components = {};
        this.render();
        this.subscribeToState();
    }

    render() {
        this.target.innerHTML = `
            <div id="app-container">
                <header id="app-header"></header>
                <main id="main-content"></main>
                <div id="modal-container"></div>
            </div>
        `;

        this.components.header = new Header({
            target: this.target.querySelector('#app-header'),
            stateManager: this.stateManager,
            onViewChange: (view) => this.handleViewChange(view),
            onThemeToggle: () => this.handleThemeToggle()
        });

        this.components.mainContent = new MainContent({
            target: this.target.querySelector('#main-content'),
            stateManager: this.stateManager
        });

        this.components.modalContainer = new ModalContainer({
            target: this.target.querySelector('#modal-container'),
            stateManager: this.stateManager
        });
    }

    subscribeToState() {
        // Subscribe to theme changes
        this.stateManager.subscribe('theme', (newTheme) => {
            document.body.className = newTheme; // Apply theme class to body
        });
        // Initial theme application
        document.body.className = this.stateManager.getState('theme');
    }

    handleViewChange(view) {
        console.log(`View changed to: ${view}`);
        this.stateManager.setState('currentView', view);
    }

    handleThemeToggle() {
        const currentTheme = this.stateManager.getState('theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.stateManager.setState('theme', newTheme);
    }
}