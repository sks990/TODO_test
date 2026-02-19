import './ModalContainer.css';
import { TaskFormModal } from '../TaskFormModal/TaskFormModal.js';

export class ModalContainer {
    constructor({ target, stateManager }) {
        this.target = target;
        this.stateManager = stateManager;
        this.modalInstance = null; // To hold the current modal instance
        this.render();
        this.subscribeToState();
    }

    render() {
        this.target.innerHTML = `
            <div id="modal-overlay" class="modal-overlay hidden">
                <div id="modal-content" class="modal-content">
                    <!-- Modal content will be rendered here -->
                </div>
            </div>
        `;
        this.overlay = this.target.querySelector('#modal-overlay');
        this.modalContent = this.target.querySelector('#modal-content');

        this.overlay.addEventListener('click', (event) => {
            // Close modal if clicking on the overlay background
            if (event.target === this.overlay) {
                this.closeModal();
            }
        });
    }

    subscribeToState() {
        this.stateManager.subscribe('modal', (modalData) => {
            if (modalData && modalData.isOpen) {
                this.openModal(modalData.type, modalData.data);
            } else {
                this.closeModal();
            }
        });
    }

    openModal(modalType, modalData) {
        // Clear previous modal content
        this.modalContent.innerHTML = '';
        this.overlay.classList.remove('hidden');
        this.overlay.classList.add('visible'); // Add visible class for animation

        // Dynamically create and render the modal
        switch (modalType) {
            case 'TaskForm':
                this.modalInstance = new TaskFormModal({
                    target: this.modalContent,
                    stateManager: this.stateManager,
                    initialData: modalData,
                    onClose: () => this.closeModal()
                });
                break;
            // Add cases for other modal types
            default:
                console.warn(`Unknown modal type: ${modalType}`);
                this.closeModal();
                return;
        }
    }

    closeModal() {
        if (this.overlay.classList.contains('visible')) {
            this.overlay.classList.remove('visible');
            this.overlay.classList.add('hidden');
            // Remove modal instance after animation or immediately
            // setTimeout(() => {
                this.modalContent.innerHTML = '';
                this.modalInstance = null;
                this.stateManager.setState('modal', { isOpen: false }); // Update state
            // }, 300); // Match animation duration
            this.modalInstance = null; // Clear instance immediately
            this.stateManager.setState('modal', { isOpen: false }); // Update state
        }
    }
}