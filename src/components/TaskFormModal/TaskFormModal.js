import './TaskFormModal.css';

export class TaskFormModal {
    constructor({ target, stateManager, initialData, onClose }) {
        this.target = target;
        this.stateManager = stateManager;
        this.initialData = initialData; // Task data if editing, null if adding
        this.onClose = onClose;
        this.isEditing = !!initialData;
        this.render();
        this.bindEvents();
        this.populateForm();
    }

    render() {
        this.target.innerHTML = `
            <div class="task-form-modal">
                <h2>${this.isEditing ? 'Edit Task' : 'Add New Task'}</h2>
                <form id="task-form">
                    <div class="form-group">
                        <label for="task-title">Title <span class="required">*</span></label>
                        <input type="text" id="task-title" required>
                        <div class="error-message" id="title-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="task-description">Description</label>
                        <textarea id="task-description"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="task-priority">Priority <span class="required">*</span></label>
                            <select id="task-priority" required>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div class="error-message" id="priority-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="task-status">Status <span class="required">*</span></label>
                            <select id="task-status" required>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                             <div class="error-message" id="status-error"></div>
                        </div>
                    </div>
                    <div class="form-row">
                         <div class="form-group">
                            <label for="task-due-date">Due Date</label>
                            <input type="date" id="task-due-date">
                        </div>
                         <div class="form-group">
                            <label for="task-start-date">Start Date</label>
                            <input type="date" id="task-start-date">
                        </div>
                         <div class="form-group">
                            <label for="task-end-date">End Date</label>
                            <input type="date" id="task-end-date">
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" id="cancel-btn" class="btn-secondary">Cancel</button>
                        <button type="submit" id="save-btn" class="btn-primary">${this.isEditing ? 'Update Task' : 'Add Task'}</button>
                    </div>
                </form>
            </div>
        `;
        this.form = this.target.querySelector('#task-form');
        this.titleInput = this.target.querySelector('#task-title');
        this.descriptionInput = this.target.querySelector('#task-description');
        this.priorityInput = this.target.querySelector('#task-priority');
        this.statusInput = this.target.querySelector('#task-status');
        this.dueDateInput = this.target.querySelector('#task-due-date');
        this.startDateInput = this.target.querySelector('#task-start-date');
        this.endDateInput = this.target.querySelector('#task-end-date');

        // Add more input element references if needed
    }

    populateForm() {
        if (this.isEditing && this.initialData) {
            this.titleInput.value = this.initialData.title || '';
            this.descriptionInput.value = this.initialData.description || '';
            this.priorityInput.value = this.initialData.priority || 'medium';
            this.statusInput.value = this.initialData.status || 'pending';
            this.dueDateInput.value = this.initialData.dueDate || '';
            this.startDateInput.value = this.initialData.startDate || '';
            this.endDateInput.value = this.initialData.endDate || '';
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                this.saveTask();
            }
        });

        this.target.querySelector('#cancel-btn').addEventListener('click', () => {
            this.onClose();
        });

        // Add input listeners for real-time validation
        this.titleInput.addEventListener('input', () => this.validateField('title'));
        this.priorityInput.addEventListener('change', () => this.validateField('priority'));
        this.statusInput.addEventListener('change', () => this.validateField('status'));
    }

    validateField(fieldName) {
        const input = this.target.querySelector(`#task-${fieldName}`);
        const errorDiv = this.target.querySelector(`#${fieldName}-error`);
        if (!input || !errorDiv) return;

        if (input.value.trim() === '' && input.hasAttribute('required')) {
            errorDiv.textContent = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
            input.classList.add('input-error');
            return false;
        } else {
            errorDiv.textContent = '';
            input.classList.remove('input-error');
            return true;
        }
    }

     validateForm() {
        let isValid = true;

        // Title validation
        isValid = this.validateField('title') && isValid;

        // Priority validation
        isValid = this.validateField('priority') && isValid;

        // Status validation
        isValid = this.validateField('status') && isValid;

        // Add more field validations as needed

        return isValid;
    }

    saveTask() {
        const taskData = {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            priority: this.priorityInput.value,
            status: this.statusInput.value,
            dueDate: this.dueDateInput.value,
            startDate: this.startDateInput.value,
            endDate: this.endDateInput.value,
            // Add other fields like boardColumnId, parentId if applicable later
        };

        if (this.isEditing) {
            this.stateManager.updateTask(this.initialData.id, taskData);
        } else {
            this.stateManager.addTask(taskData);
        }
        this.onClose();
    }
}