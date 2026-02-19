const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
    const taskItemElement = document.createElement('div');
    taskItemElement.className = `task-item ${task.status === 'done' ? 'completed' : ''}`;
    taskItemElement.dataset.taskId = task.id;
    taskItemElement.setAttribute('draggable', true); // Make it draggable

    // Determine priority class and text
    let priorityClass = '';
    let priorityText = '';
    switch (task.priority) {
        case 'high':
            priorityClass = 'priority-high';
            priorityText = 'High';
            break;
        case 'medium':
            priorityClass = 'priority-medium';
            priorityText = 'Medium';
            break;
        case 'low':
            priorityClass = 'priority-low';
            priorityText = 'Low';
            break;
        default:
            priorityClass = 'priority-medium';
            priorityText = 'Medium';
    }

    // Format date for display
    const formattedDueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'No Due Date';

    taskItemElement.innerHTML = `
        <div class="task-item-header">
            <div class="task-item-title" data-task-id="${task.id}">${task.title}</div>
            <div class="task-item-actions">
                <input type="checkbox" class="task-item-checkbox" data-task-id="${task.id}" ${task.status === 'done' ? 'checked' : ''}>
                <button class="edit-task-button" data-task-id="${task.id}" aria-label="Edit task">✏️</button>
                <button class="delete-task-button" data-task-id="${task.id}" aria-label="Delete task">❌</button>
            </div>
        </div>
        <div class="task-item-details">
            <span class="task-item-priority ${priorityClass}">${priorityText}</span>
            ${task.dueDate ? `<span>Due: ${formattedDueDate}</span>` : ''}
        </div>
    `;

    // Add event listeners
    const checkbox = taskItemElement.querySelector('.task-item-checkbox');
    checkbox.addEventListener('change', (e) => {
        e.stopPropagation(); // Prevent triggering edit on click
        onToggleComplete(task.id);
    });

    const title = taskItemElement.querySelector('.task-item-title');
    title.addEventListener('click', (e) => {
        e.stopPropagation();
        onEdit(task.id);
    });

    const editButton = taskItemElement.querySelector('.edit-task-button');
    editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        onEdit(task.id);
    });

    const deleteButton = taskItemElement.querySelector('.delete-task-button');
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        onDelete(task.id);
    });

    // Drag and Drop event handlers
    taskItemElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
        taskItemElement.classList.add('dragging'); // Add a class for visual feedback
    });

    taskItemElement.addEventListener('dragend', () => {
        taskItemElement.classList.remove('dragging');
    });


    return taskItemElement;
};

export default TaskItem;