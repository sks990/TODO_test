import { createElement, getElement } from '../utils/helpers.js';
import { PRIORITIES, STATUSES } from '../utils/constants.js';

export default class TaskFormModal {
    constructor({ taskData, onSave, onCancel }) {
        this.taskData = taskData || {}; // Task data if editing, empty if adding
        this.onSave = onSave;
        this.onCancel = onCancel;
        this.isEditing = !!taskData; // True if editing, false if adding
        this.formValues = { ...this.taskData }; // Initialize form values
    }

    render() {
        const modalContent = createElement('div', { className: 'modal-content' });

        // Modal Header
        const modalHeader = createElement('div', { className: 'modal-header' });
        const title = this.isEditing ? 'Edit Task' : 'Add New Task';
        modalHeader.appendChild(createElement('h2', { textContent: title }));
        const closeBtn = createElement('button', { className: 'close-modal-btn', textContent: '&times;' });
        closeBtn.addEventListener('click', this.onCancel);
        modalHeader.appendChild(closeBtn);

        // Modal Body - Form
        const modalBody = createElement('div', { className: 'modal-body' });
        const form = createElement('form');

        // Form Fields
        const fields = [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'status', label: 'Status', type: 'select', options: Object.values(STATUSES) },
            { name: 'priority', label: 'Priority', type: 'select', options: Object.values(PRIORITIES) },
            { name: 'dueDate', label: 'Due Date', type: 'date' },
            // Add other fields as needed, e.g., startDate, endDate, boardColumnId, parentId
        ];

        fields.forEach(field => {
            const div = createElement('div');
            const label = createElement('label', { textContent: field.label, htmlFor: field.name });
            let input;

            if (field.type === 'textarea') {
                input = createElement('textarea', { id: field.name, name: field.name });
            } else if (field.type === 'select') {
                input = createElement('select', { id: field.name, name: field.name });
                // Add 'Select...' option if not required or if it's a status/priority field
                if (field.required || ['status', 'priority'].includes(field.name)) {
                     const defaultOption = createElement('option', { value: '', textContent: `--- Select ${field.label} ---` });
                     input.appendChild(defaultOption);
                }
                field.options.forEach(optionValue => {
                    const option = createElement('option', { value: optionValue, textContent: optionValue.charAt(0).toUpperCase() + optionValue.slice(1) });
                    input.appendChild(option);
                });
            } else {
                input = createElement('input', { id: field.name, name: field.name, type: field.type });
                if (field.type === 'date') {
                    // Set min date to today to prevent past dates for due dates
                    const today = new Date().toISOString().split('T')[0];
                    input.setAttribute('min', today);
                }
            }

            if (field.required) {
                input.required = true;
            }

            // Set initial value from taskData or formValues
            input.value = this.formValues[field.name] || '';

            // Update formValues on input change
            input.addEventListener('input', (e) => {
                this.formValues[field.name] = e.target.value;
                this.validateField(e.target, field); // Validate on input
            });

            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);
        });

        // Validation message container
        const validationMessage = createElement('div', { className: 'error-message', id: 'form-error-message', style: 'display: none;' });
        form.appendChild(validationMessage);


        // Modal Footer
        const modalFooter = createElement('div', { className: 'modal-footer' });
        const cancelButton = createElement('button', { className: 'cancel-btn', textContent: 'Cancel' });
        cancelButton.addEventListener('click', this.onCancel);
        const saveButton = createElement('button', { className: 'save-btn', textContent: 'Save' });
        saveButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission if it were a real form
            if (this.validateForm(form)) {
                this.onSave({ ...this.formValues, id: this.taskData?.id }); // Pass ID if editing
            }
        });
        modalFooter.appendChild(cancelButton);
        modalFooter.appendChild(saveButton);

        form.appendChild(modalFooter); // Append footer to form
        modalBody.appendChild(form);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);

        return modalContent;
    }

    validateField(inputElement, field) {
        const errorMessageElement = getElement('#form-error-message');
        const value = inputElement.value.trim();
        let error = '';

        if (field.required && !value) {
            error = `${field.label} is required.`;
        } else if (field.name === 'title' && value.length < 3) {
            error = 'Title must be at least 3 characters long.';
        }
        // Add more specific validation rules here if needed

        inputElement.style.borderColor = error ? '#e74c3c' : ''; // Red border on error

        // Check if all fields are valid to display general error
        if (!error && Object.values(this.formValues).some(val => val === '' && fields.find(f => f.name === inputElement.name)?.required)) {
             // If there's still a required field empty, don't show specific error yet, but manage general message
             // This logic might need refinement based on desired UX
        }

        return !error;
    }

    validateForm(formElement) {
        let isFormValid = true;
        const errorMessageElement = getElement('#form-error-message');
        errorMessageElement.textContent = ''; // Clear previous errors
        errorMessageElement.style.display = 'none';

        const fields = [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'status', label: 'Status', type: 'select', options: Object.values(STATUSES) },
            { name: 'priority', label: 'Priority', type: 'select', options: Object.values(PRIORITIES) },
            { name: 'dueDate', label: 'Due Date', type: 'date' },
        ];

        fields.forEach(field => {
            const input = formElement.querySelector(`[name="${field.name}"]`);
            if (input) {
                if (!this.validateField(input, field)) {
                    isFormValid = false;
                     // Accumulate errors for display if needed, or just rely on field-level errors
                     // For simplicity, we'll just set isFormValid to false
                }
                // Also ensure select fields have a valid selection if required
                if (field.type === 'select' && field.required && !input.value) {
                     isFormValid = false;
                     input.style.borderColor = '#e74c3c';
                }
            }
        });

        if (!isFormValid) {
            errorMessageElement.textContent = 'Please fix the errors in the form.';
            errorMessageElement.style.display = 'block';
        }

        return isFormValid;
    }

    // Method to be called by ModalContainer when state updates (e.g., theme change)
    update(state) {
        // Re-render the modal content to apply theme changes if necessary
        // For now, theme is handled directly by ModalContainer's update method
        // but this structure allows for modal-specific theme updates if needed.
    }
}