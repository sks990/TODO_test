const ModalContainer = () => {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Slot for dynamic modal content (like TaskFormModal)
    const modalContentSlot = document.createElement('div');
    modalContentSlot.className = 'modal-content-slot';
    modalContent.appendChild(modalContentSlot);

    modalBackdrop.appendChild(modalContent);

    // Initial state: hidden
    // modalBackdrop.style.opacity = '0';
    // modalBackdrop.style.visibility = 'hidden';

    // Method to show the modal
    modalBackdrop.showModal = () => {
        modalBackdrop.classList.add('visible');
        // Trigger CSS animations
        // A slight delay is sometimes needed for transitions to apply correctly after class addition
        requestAnimationFrame(() => {
            // The 'visible' class handles the animation via CSS transitions
        });
    };

    // Method to hide the modal
    modalBackdrop.hideModal = () => {
        modalBackdrop.classList.remove('visible');
        // Remove content or reset form after animation ends, or immediately
        // For simplicity, we'll clear it when it becomes invisible.
        modalBackdrop.addEventListener('transitionend', function handleTransitionEnd() {
            if (!modalBackdrop.classList.contains('visible')) {
                modalContent.style.transform = 'scale(0.9)'; // Reset for next opening
                modalContent.style.opacity = '0'; // Reset for next opening
                // Clear slot content to prevent issues or memory leaks
                modalContentSlot.innerHTML = '';
                modalBackdrop.removeEventListener('transitionend', handleTransitionEnd);
            }
        }, { once: true });
    };

    // Close modal if backdrop is clicked
    modalBackdrop.addEventListener('click', (e) => {
        // Check if the click was on the backdrop itself, not its children
        if (e.target === modalBackdrop) {
            modalBackdrop.hideModal();
        }
    });

    // Prevent clicks inside the modal content from closing it
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Expose the content slot so child modals can be appended
    modalBackdrop.contentSlot = modalContentSlot;

    return modalBackdrop;
};

export default ModalContainer;