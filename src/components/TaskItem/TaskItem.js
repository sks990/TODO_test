import './TaskItem.css';

export class TaskItem {
    constructor({ target, stateManager, taskData, onTaskUpdate, onTaskDelete, onTaskToggle, onTaskClick }) {
        this.target = target;
        this.stateManager = stateManager;
        this.taskData = taskData;
        this.onTaskUpdate = onTaskUpdate;
        this.onTaskDelete = onTaskDelete;
        this.onTaskToggle = onTaskToggle;
        this.onTaskClick = onTaskClick;
        this.render();
        this.bindEvents();
    }

    render() {
        const { id, title, dueDate, priority, completed } = this.taskData;
        const priorityClass = `priority-${priority}`; // e.g., priority-high
        const completionClass = completed ? 'completed' : '';

        const li = document.createElement('li');
        li.setAttribute('data-task-id', id);
        li.classList.add('task-item', completionClass, priorityClass);
        li.draggable = true; // Make the item draggable

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
                <span class="task-title">${title}</span>
            </div>
            <div class="task-meta">
                ${dueDate ? `<span class="task-due-date">${dueDate}</span>` : ''}
                <span class="task-priority">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
            </div>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        this.target.appendChild(li);
        this.element = li; // Store reference to the element
    }

    bindEvents() {
        const checkbox = this.element.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            this.onTaskToggle(this.taskData.id);
        });

        const editButton = this.element.querySelector('.edit-btn');
        editButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering click on the whole item
            this.onTaskClick(this.taskData.id);
        });

        const deleteButton = this.element.querySelector('.delete-btn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering click on the whole item
            if (confirm('Are you sure you want to delete this task?')) {
                this.onTaskDelete(this.taskData.id);
            }
        });

        // Handle click on the task title/content area to open modal
        this.element.querySelector('.task-content').addEventListener('click', () => {
             this.onTaskClick(this.taskData.id);
        });

        // Drag and Drop Event Listeners
        this.element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', this.taskData.id);
            e.dataTransfer.effectAllowed = 'move';
            this.element.classList.add('dragging');
            // Optional: Add a small delay or visual cue for drag start
        });

        this.element.addEventListener('dragend', () => {
            this.element.classList.remove('dragging');
        });

        // Note: Drop logic will be handled by the parent list component (e.g., TodoListView or KanbanBoard)
    }
}