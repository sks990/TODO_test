import Header from './Header.js';
import MainContent from './MainContent.js';
import ModalContainer from './ModalContainer.js';
import stateManager from '../services/StateManager.js';
import { getElement } from '../utils/helpers.js';

class App {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.stateManager = stateManager;
        this.header = new Header({
            onViewChange: (view) => this.stateManager.setCurrentView(view),
            onThemeToggle: () => this.stateManager.toggleTheme()
        });
        this.mainContent = new MainContent();
        this.modalContainer = new ModalContainer();

        this.stateManager.subscribe(this.render.bind(this));
    }

    render(state) {
        this.rootElement.innerHTML = ''; // Clear previous content
        this.rootElement.appendChild(this.header.render());
        this.rootElement.appendChild(this.mainContent.render(state.currentView));
        this.rootElement.appendChild(this.modalContainer.render()); // Modal container is always present but visibility is controlled
    }

    init() {
        this.stateManager.initialize(); // Initialize state and apply theme
    }
}

const appRoot = getElement('#app');
if (appRoot) {
    const app = new App(appRoot);
    app.init();
} else {
    console.error("Root element #app not found.");
}