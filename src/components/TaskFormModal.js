import stateManager from '../utils/StateManager.js';

const TaskFormModal = ({ onSave, onCancel }) => {
    const modalFormElement = document.createElement('form');
    modalFormElement.className = 'task-form-modal';

    let taskTitleInput, taskDescriptionTextarea, taskStatusSelect, taskPrioritySelect, taskDueDateInput, taskStartDateInput, taskEndDateInput;
    let formTitle = 'Add New Task';
    let currentTaskData = null; // To hold task data if editing

    // Populate form with task data if editing
    const populateForm = (task) => {
        formTitle = 'Edit Task';
        currentTaskData = task;
        taskTitleInput.value = task.title || '';
        taskDescriptionTextarea.value = task.description || '';
        taskStatusSelect.value = task.status || 'todo';
        taskPrioritySelect.value = task.priority || 'medium';
        taskDueDateInput.value = task.dueDate ? task.dueDate.split('T')[0] : '';
        taskStartDateInput.value = task.startDate ? task.startDate.split('T')[0] : '';
        taskEndDateInput.value = task.endDate ? task.endDate.split('T')[0] : '';
    };

    // Reset form to initial state (for adding new tasks)
    const resetForm = () => {
        formTitle = 'Add New Task';
        currentTaskData = null;
        modalFormElement.reset();
        // Clear validation messages
        modalFormElement.querySelectorAll('.error-message').forEach(el => el.remove());
        // Reset input borders/styles
        modalFormElement.querySelectorAll('input, textarea, select').forEach(el => {
            el.classList.remove('error-input');
        });
    };

    // Render the form structure
    const renderForm = () => {
        modalFormElement.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${formTitle}</h2>
                <button type="button" class="modal-close-button" aria-label="Close modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="task-form-group">
                    <label for="task-title">Title</label>
                    <input type="text" id="task-title" required>
                </div>
                <div class="task-form-group">
                    <label for="task-description">Description</label>
                    <textarea id="task-description"></textarea>
                </div>
                <div class="task-form-group">
                    <label for="task-status">Status</label>
                    <select id="task-status">
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div class="task-form-group">
                    <label for="task-priority">Priority</label>
                    <select id="task-priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div class="task-form-group">
                    <label for="task-due-date">Due Date</label>
                    <input type="date" id="task-due-date">
                </div>
                 <div class="task-form-group">
                    <label for="task-start-date">Start Date</label>
                    <input type="date" id="task-start-date">
                </div>
                 <div class="task-form-group">
                    <label for="task-end-date">End Date</label>
                    <input type="date" id="task-end-date">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-button btn-secondary cancel-button">Cancel</button>
                <button type="submit" class="modal-button btn-primary save-button">Save Task</button>
            </div>
        `;

        // Get references to form elements after rendering
        taskTitleInput = modalFormElement.querySelector('#task-title');
        taskDescriptionTextarea = modalFormElement.querySelector('#task-description');
        taskStatusSelect = modalFormElement.querySelector('#task-status');
        taskPrioritySelect = modalFormElement.querySelector('#task-priority');
        taskDueDateInput = modalFormElement.querySelector('#task-due-date');
        taskStartDateInput = modalFormElement.querySelector('#task-start-date');
        taskEndDateInput = modalFormElement.querySelector('#task-end-date');

        // Add event listeners
        modalFormElement.querySelector('.modal-close-button').addEventListener('click', () => {
            onCancel();
            resetForm();
        });
        modalFormElement.querySelector('.cancel-button').addEventListener('click', () => {
            onCancel();
            resetForm();
        });

        modalFormElement.addEventListener('submit', handleFormSubmit);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Clear previous validation errors
        modalFormElement.querySelectorAll('.error-message').forEach(el => el.remove());
        modalFormElement.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));

        const taskData = {
            title: taskTitleInput.value.trim(),
            description: taskDescriptionTextarea.value.trim(),
            status: taskStatusSelect.value,
            priority: taskPrioritySelect.value,
            dueDate: taskDueDateInput.value || null,
            startDate: taskStartDateInput.value || null,
            endDate: taskEndDateInput.value || null,
            // Other fields like boardColumnId, parentId can be added if needed
        };

        // Basic validation
        let isValid = true;
        if (!taskData.title) {
            displayError(taskTitleInput, 'Title is required.');
            isValid = false;
        }

        // Add more validation if needed (e.g., date formats, mutually exclusive dates)

        if (isValid) {
            onSave(taskData);
            resetForm(); // Reset form after successful save
        }
    };

    const displayError = (inputElement, message) => {
        inputElement.classList.add('error-input');
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
    };

    // Initial render
    renderForm();

    // Method to update the form when editing a task
    modalFormElement.populate = populateForm;
    modalFormElement.resetForm = resetForm; // Expose resetForm

    return modalFormElement;
};

export default TaskFormModal;