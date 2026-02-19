import App from './App.js';
import { StateManager } from './services/StateManager.js';
import './styles/main.css';

// Initialize state manager
const stateManager = new StateManager();

// Render the App component
const app = new App({ target: document.getElementById('app'), stateManager });

// Expose stateManager globally for easier debugging or external access if needed
window.stateManager = stateManager;

console.log('Application initialized.');