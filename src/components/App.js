import stateManager from '../utils/StateManager.js';
import Header from './Header.js';
import MainContent from './MainContent.js';
import ModalContainer from './ModalContainer.js';
import TaskFormModal from './TaskFormModal.js'; // Import to manage modal state

let unsubscribe = null;

const App = () => {
    const appElement = document.createElement('div');
    appElement.id = 'app';

    let headerInstance = null;
    let mainContentInstance = null;
    let modalContainerInstance = null;
    let taskFormModalInstance = null;

    // Function to render components based on state
    const render = () => {
        // Clean up previous subscriptions if they exist
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }

        const currentState = stateManager.getState();

        // Create or update Header
        if (!headerInstance) {
            headerInstance = Header({ onViewChange: handleViewChange, onThemeToggle: handleThemeToggle });
            appElement.appendChild(headerInstance);
        } else {
            // Update header if needed (e.g., active class on nav items)
            headerInstance.updateActiveNav(currentState.currentView);
        }

        // Create or update MainContent
        if (!mainContentInstance) {
            mainContentInstance = MainContent({ currentView: currentState.currentView });
            appElement.appendChild(mainContentInstance);
        } else {
            // Pass new view to MainContent if it changes
            mainContentInstance.renderView(currentState.currentView);
        }

        // Create or update ModalContainer and TaskFormModal
        if (!modalContainerInstance) {
            modalContainerInstance = ModalContainer();
            appElement.appendChild(modalContainerInstance);
        }
        if (!taskFormModalInstance) {
            // TaskFormModal needs to be rendered inside ModalContainer,
            // and it needs access to modal open/close state managed by ModalContainer or App
            taskFormModalInstance = TaskFormModal({
                onSave: handleTaskSave,
                onCancel: handleTaskCancel
            });
            // Append TaskFormModal's element to ModalContainer's content area
            const modalContentSlot = modalContainerInstance.querySelector('.modal-content-slot');
            if (modalContentSlot) {
                modalContentSlot.appendChild(taskFormModalInstance);
            }
        }

        // Ensure theme is applied
        if (currentState.theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    // Event Handlers
    const handleViewChange = (view) => {
        stateManager.setCurrentView(view);
    };

    const handleThemeToggle = () => {
        stateManager.toggleTheme();
        // Optionally save theme preference to localStorage
        localStorage.setItem('theme', stateManager.getState().theme);
    };

    const handleTaskSave = (taskData) => {
        const currentTask = stateManager.getState().editingTask; // Assume editingTask is managed by stateManager
        if (currentTask && currentTask.id) {
            stateManager.updateTask(currentTask.id, taskData);
        } else {
            stateManager.addTask(taskData);
        }
        closeModal(); // Close modal after saving
    };

    const handleTaskCancel = () => {
        closeModal();
    };

    const openModal = (taskToEdit = null) => {
        if (modalContainerInstance && taskFormModalInstance) {
            // If editing, set the task to be edited in the form modal
            stateManager.setState({ editingTask: taskToEdit });
            modalContainerInstance.showModal();
        }
    };

    const closeModal = () => {
        if (modalContainerInstance) {
            stateManager.setState({ editingTask: null }); // Clear editing task
            modalContainerInstance.hideModal();
        }
    };

    // --- Initialization ---
    stateManager.initialize(); // Load theme, add dummy tasks if needed

    // Initial render
    render();

    // Subscribe to state changes for re-rendering
    unsubscribe = stateManager.subscribe(() => {
        const currentState = stateManager.getState();
        // Re-render relevant parts or the whole app
        // For simplicity, we'll re-render potentially everything that depends on state
        // A more optimized approach would update only what changed.

        // Update Header's active nav item
        if (headerInstance) {
            headerInstance.updateActiveNav(currentState.currentView);
        }
        // Update MainContent's view
        if (mainContentInstance) {
            mainContentInstance.renderView(currentState.currentView);
        }

        // Apply theme class to body
        if (currentState.theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    // Expose methods for controlling modals (if needed from outside, e.g., TaskItem)
    // For now, TaskItem will directly call these via prop drilling or event bubbling
    appElement.openTaskModal = openModal; // Make openModal accessible on the app element for child components to call

    return appElement;
};

export default App;