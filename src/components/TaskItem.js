import { formatDate, getPriorityClass, getStatusText } from '../utils/helpers.js';

export default class TaskItem {
    constructor(task, { onToggleComplete, onEdit, onDelete }) {
        this.task = task;
        this.onToggleComplete = onToggleComplete;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
    }

    render() {
        const li = document.createElement('li');
        li.className = `task-item ${this.task.completed ? 'completed' : ''} ${getPriorityClass(this.task.priority)}`;
        li.dataset.taskId = this.task.id;

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.task.completed;
        checkbox.addEventListener('change', (e) => {
            // Prevent triggering edit/drag events when just checking/unchecking
            e.stopPropagation();
            this.onToggleComplete(this.task.id);
        });

        // Task Title and Details
        const contentDiv = document.createElement('div');
        contentDiv.style.cursor = 'pointer'; // Indicate clickable
        contentDiv.addEventListener('click', (e) => {
            // Prevent triggering edit when clicking checkbox or delete button
             if (!e.target.closest('input[type="checkbox"], button')) {
                this.onEdit(this.task.id);
             }
        });

        const titleSpan = document.createElement('span');
        titleSpan.textContent = this.task.title;
        titleSpan.style.fontWeight = 'bold';

        const descriptionSpan = document.createElement('span');
        descriptionSpan.textContent = this.task.description || '';
        descriptionSpan.style.fontSize = '13px';
        descriptionSpan.style.marginLeft = '10px';
        descriptionSpan.style.color = 'grey';

        contentDiv.appendChild(titleSpan);
        // Optionally add description if it exists and is short
        if (this.task.description) {
            const shortDesc = this.task.description.length > 50 ? this.task.description.substring(0, 50) + '...' : this.task.description;
            const descElement = document.createElement('div');
            descElement.textContent = shortDesc;
            descElement.style.fontSize = '13px';
            descElement.style.marginTop = '5px';
            descElement.style.color = 'grey';
            contentDiv.appendChild(descElement);
        }


        // Details: Due Date, Priority Indicator, Status
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'task-details';

        const dueDateSpan = document.createElement('span');
        dueDateSpan.textContent = `Due: ${formatDate(this.task.dueDate)}`;

        const statusSpan = document.createElement('span');
        statusSpan.textContent = `Status: ${getStatusText(this.task.status)}`;

        const priorityIndicator = document.createElement('span');
        priorityIndicator.className = 'priority-indicator';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.marginLeft = '15px';
        editButton.style.padding = '5px 10px';
        editButton.style.border = 'none';
        editButton.style.borderRadius = '3px';
        editButton.style.cursor = 'pointer';
        editButton.style.backgroundColor = '#bdc3c7';
        editButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering drag events
            this.onEdit(this.task.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '3px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.backgroundColor = '#e74c3c';
        deleteButton.style.color = 'white';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering drag events
            if (confirm('Are you sure you want to delete this task?')) {
                this.onDelete(this.task.id);
            }
        });


        detailsDiv.appendChild(dueDateSpan);
        detailsDiv.appendChild(statusSpan);
        detailsDiv.appendChild(priorityIndicator);
        detailsDiv.appendChild(editButton);
        detailsDiv.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(contentDiv);
        li.appendChild(detailsDiv);

        // Add event listeners for drag and drop (handled by parent TodoListView)
        // li.addEventListener('dragstart', this.handleDragStart);
        // li.addEventListener('dragover', this.handleDragOver);
        // li.addEventListener('drop', this.handleDrop);
        // li.addEventListener('dragend', this.handleDragEnd);

        return li;
    }

    // Update the task item's display if the task data changes
    update(newTaskData) {
        this.task = { ...this.task, ...newTaskData };
        const element = document.querySelector(`[data-task-id="${this.task.id}"]`);
        if (element) {
            const newElement = this.render();
            element.replaceWith(newElement);
        }
    }
}