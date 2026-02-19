import App from './components/App.js';

// Initialize the application
// The App component constructor finds the #app element and renders itself.
// No explicit call to App.init() needed here as it's handled within App.js
console.log('Main script loaded. App initialization is handled in App.js.');

// Note: The App class itself handles finding the #app element and initializing.
// If App.js were structured differently, you might do:
// const appRoot = document.getElementById('app');
// if (appRoot) {
//     const app = new App(appRoot);
//     app.init();
// }