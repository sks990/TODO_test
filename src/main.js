import App from './components/App.js';
import stateManager from './utils/StateManager.js';

// Get the root element where the app will be mounted
const appRoot = document.getElementById('app');

if (appRoot) {
    // Create the main App component
    const AppComponent = App();

    // Append the App component to the root element
    appRoot.appendChild(AppComponent);

    // Initial theme application based on stateManager (e.g., from localStorage)
    // This is also handled inside App.js's initialize and stateManager.notify
    // but good to ensure on initial load.
    const currentState = stateManager.getState();
    if (currentState.theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

} else {
    console.error("Root element with id 'app' not found!");
}