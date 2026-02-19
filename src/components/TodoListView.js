import { getElement, createElement, getPriorityClass, getStatusText } from '../utils/helpers.js';
import TaskItem from './TaskItem.js';
import stateManager from '../services/StateManager.js';
import { VIEWS, PRIORITIES } from '../utils/constants.js';

export default class TodoListView {
    constructor() {
        this.viewName = VIEWS.TODO; // To help MainContent identify if a re-render is needed
        this.taskItems = {}; // To store TaskItem instances
    }

    render() {
        const container = createElement('div', { className: 'todo-list-view' });

        const controls = createElement('div', { className: 'todo-controls' });

        // Filter/Sort controls (simplified)
        const filterSortDiv = createElement('div', { className: 'filter-sort' });
        const statusFilter = createElement('select', { id: 'status-filter' });
        ['all', 'todo', 'in_progress', 'done'].forEach(status => {
            const option = createElement('option', { value: status, textContent: `Status: ${getStatusText(status)}` });
            if (status === 'all') option.textContent = 'Status: All';
            statusFilter.appendChild(option);
        });

        const priorityFilter = createElement('select', { id: 'priority-filter' });
        ['all', PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH].forEach(priority => {
            const option = createElement('option', { value: priority, textContent: `Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)}` });
            if (priority === 'all') option.textContent = 'Priority: All';
            priorityFilter.appendChild(option);
        });

        filterSortDiv.appendChild(statusFilter);
        filterSortDiv.appendChild(priorityFilter);

        // Add Task Button
        const addTaskBtn = createElement('button', { className: 'add-task-btn', textContent: '+ Add Task' });
        addTaskBtn.addEventListener('click', () => {
            // Open the modal for adding a new task
             stateManager.emit('open-task-modal', { task: null }); // Emit an event to ModalContainer
        });

        controls.appendChild(filterSortDiv);
        controls.appendChild(addTaskBtn);

        const taskList = createElement('ul', { className: 'task-list' });

        container.appendChild(controls);
        container.appendChild(taskList);

        // Initial render of tasks based on current state
        this.renderTasks(stateManager.state.tasks, taskList);

        // Add event listeners for filter/sort changes
        statusFilter.addEventListener('change', () => this.filterAndRenderTasks(taskList));
        priorityFilter.addEventListener('change', () => this.filterAndRenderTasks(taskList));

        return container;
    }

    filterAndRenderTasks(taskListElement) {
        const statusFilter = getElement('#status-filter');
        const priorityFilter = getElement('#priority-filter');
        const selectedStatus = statusFilter.value;
        const selectedPriority = priorityFilter.value;

        const filteredTasks = stateManager.state.tasks.filter(task => {
            const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
            const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
            return matchesStatus && matchesPriority;
        });

        this.renderTasks(filteredTasks, taskListElement);
    }

    renderTasks(tasks, taskListElement) {
        taskListElement.innerHTML = ''; // Clear existing tasks
        this.taskItems = {}; // Reset task item instances

        if (tasks.length === 0) {
            taskListElement.appendChild(createElement('li', { textContent: 'No tasks found.', style: 'text-align: center; color: grey;' }));
            return;
        }

        tasks.forEach(task => {
            const taskItem = new TaskItem(task, {
                 onToggleComplete: (taskId) => stateManager.toggleTaskCompletion(taskId),
                 onEdit: (taskId) => stateManager.emit('open-task-modal', { task: stateManager.state.tasks.find(t => t.id === taskId) }), // Emit event to open modal with task data
                 onDelete: (taskId) => stateManager.deleteTask(taskId) // Directly delete task
            });
            const taskElement = taskItem.render();
            this.taskItems[task.id] = taskItem; // Store instance
            taskListElement.appendChild(taskElement);

            // Add drag event listeners for TaskItem
            taskElement.draggable = true;
            taskElement.addEventListener('dragstart', (e) => this.handleDragStart(e, task.id));
            taskElement.addEventListener('dragover', this.handleDragOver);
            taskElement.addEventListener('drop', (e) => this.handleDrop(e, task.id));
            taskElement.addEventListener('dragend', this.handleDragEnd);
        });
    }

    // Drag and Drop Handlers
    handleDragStart(e, taskId) {
        e.dataTransfer.setData('text/plain', taskId);
        e.currentTarget.classList.add('dragging');
        // Add a slight delay to ensure the class is applied before the element becomes semi-transparent
        setTimeout(() => {
            e.currentTarget.style.opacity = '0.5';
        }, 0);
    }

    handleDragOver(e) {
        e.preventDefault(); // Necessary to allow dropping
        e.currentTarget.classList.add('drag-over'); // Visual feedback for drop target
    }

    handleDrop(e, targetTaskId) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        const draggedTaskId = parseInt(e.dataTransfer.getData('text/plain'));

        if (draggedTaskId !== targetTaskId) {
            // Reorder tasks in the state
            const tasks = [...stateManager.state.tasks];
            const draggedTaskIndex = tasks.findIndex(task => task.id === draggedTaskId);
            const targetTaskIndex = tasks.findIndex(task => task.id === targetTaskId);

            // Move the dragged task
            const [draggedTask] = tasks.splice(draggedTaskIndex, 1);
            tasks.splice(targetTaskIndex, 0, draggedTask);

            // Update the state and re-render
            stateManager.state.tasks = tasks; // Directly mutate for simplicity, ideally use a dedicated update method
            this.filterAndRenderTasks(getElement('.task-list')); // Re-render based on filters
        }
    }

    handleDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        e.currentTarget.style.opacity = '1'; // Restore opacity

        // Remove drag-over class from all items
        getElement('.task-list')?.querySelectorAll('.task-item').forEach(item => {
            item.classList.remove('drag-over');
        });
    }

    // Method to be called by MainContent when state updates
    update(state) {
        const taskListElement = getElement('.task-list');
        if (taskListElement) {
            // Re-render tasks based on current filters and state
            this.filterAndRenderTasks(taskListElement);
        }
    }
}