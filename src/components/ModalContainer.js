import { getElement, createElement } from '../utils/helpers.js';
import stateManager from '../services/StateManager.js';
import TaskFormModal from './TaskFormModal.js';

export default class ModalContainer {
    constructor() {
        this.modalElement = null;
        this.currentModalComponent = null;
        this.stateManager = stateManager;
        this.isModalOpen = false;

        // Listen for events to open/close modals
        this.stateManager.subscribe('open-task-modal', this.handleOpenTaskModal.bind(this));
        this.stateManager.subscribe('close-modal', this.handleCloseModal.bind(this));
    }

    render() {
        this.modalElement = createElement('div', { className: 'modal-overlay' });
        this.modalElement.addEventListener('click', (e) => {
            // Close modal if clicking on the overlay background
            if (e.target === this.modalElement) {
                this.closeModal();
            }
        });
        return this.modalElement;
    }

    handleOpenTaskModal({ task }) {
        // Clear any existing modal content
        this.modalElement.innerHTML = '';

        // Instantiate and render the TaskFormModal
        this.currentModalComponent = new TaskFormModal({
            taskData: task,
            onSave: (taskData) => this.handleSaveTask(taskData),
            onCancel: () => this.closeModal()
        });
        this.modalElement.appendChild(this.currentModalComponent.render());
        this.openModal();
    }

    handleSaveTask(taskData) {
        if (taskData.id) {
            // Update existing task
            this.stateManager.updateTask(taskData.id, taskData);
        } else {
            // Add new task
            this.stateManager.addTask(taskData);
        }
        this.closeModal();
    }

    handleCloseModal() {
        this.closeModal();
    }

    openModal() {
        this.modalElement.classList.add('visible');
        // Add the modal content, allow it to render before animating
        if (this.currentModalComponent) {
            const modalContent = this.modalElement.querySelector('.modal-content');
            if (modalContent) {
                // Trigger animation by adding class after a short delay
                setTimeout(() => {
                   modalContent.style.transform = 'scale(1)';
                }, 50); // Small delay to allow element to be in DOM
            }
        }
        this.isModalOpen = true;
    }

    closeModal() {
        this.modalElement.classList.remove('visible');
        this.isModalOpen = false;
        // Clear the modal content after animation
        this.modalElement.addEventListener('transitionend', () => {
            if (!this.isModalOpen) { // Ensure it's actually closed before clearing
                 this.modalElement.innerHTML = '';
                 this.currentModalComponent = null; // Clear component reference
            }
        }, { once: true }); // Use once: true to avoid multiple listeners
    }

    // Method to be called by App when state updates (e.g., theme change)
    update(state) {
       // If modal is open, potentially update its appearance based on theme
        if (this.isModalOpen && this.modalElement) {
            this.modalElement.style.backgroundColor = state.theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)';
            const modalContent = this.modalElement.querySelector('.modal-content');
            if (modalContent) {
                 modalContent.style.backgroundColor = state.theme === 'dark' ? '#34495e' : '#f4f7f6';
                 modalContent.style.color = state.theme === 'dark' ? '#ecf0f1' : '#333';
            }
            // Re-apply styles to form elements within the modal if they change based on theme
            const inputs = this.modalElement.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                 input.style.backgroundColor = state.theme === 'dark' ? '#2c3e50' : '#f4f7f6';
                 input.style.color = state.theme === 'dark' ? '#ecf0f1' : '#333';
                 input.style.borderColor = state.theme === 'dark' ? '#34495e' : '#e0e0e0';
            });
        }
    }
}