import './TodoListView.css';
import { TaskItem } from '../TaskItem/TaskItem.js';

export class TodoListView {
    constructor({ target, stateManager }) {
        this.target = target;
        this.stateManager = stateManager;
        this.tasks = this.stateManager.getState('tasks');
        this.render();
        this.bindEvents();
        this.subscribeToState();
    }

    render() {
        this.target.innerHTML = `
            <div class="todo-list-view-container">
                <h2>My Tasks</h2>
                <div class="task-controls">
                    <button id="add-task-btn" class="btn-primary">Add New Task</button>
                    <div class="filter-sort">
                        <select id="status-filter">
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select id="priority-filter">
                            <option value="all">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <input type="text" id="search-filter" placeholder="Search tasks...">
                    </div>
                </div>
                <ul id="task-list">
                    ${this.renderTasks(this.tasks)}
                </ul>
            </div>
        `;
        this.renderTasks(this.tasks); // Initial rendering
    }

    renderTasks(tasksToRender) {
        const taskListElement = this.target.querySelector('#task-list');
        if (!taskListElement) return; // Safety check

        taskListElement.innerHTML = ''; // Clear existing tasks

        if (tasksToRender.length === 0) {
            taskListElement.innerHTML = '<li class="no-tasks">No tasks found.</li>';
            return;
        }

        tasksToRender.forEach(task => {
            const taskItem = new TaskItem({
                target: taskListElement, // Append to the ul
                stateManager: this.stateManager,
                taskData: task,
                onTaskUpdate: (taskId, updatedData) => this.handleTaskUpdate(taskId, updatedData),
                onTaskDelete: (taskId) => this.handleTaskDelete(taskId),
                onTaskToggle: (taskId) => this.handleTaskToggle(taskId),
                onTaskClick: (taskId) => this.handleTaskClick(taskId) // For opening modal
            });
        });
    }

    bindEvents() {
        const addTaskBtn = this.target.querySelector('#add-task-btn');
        addTaskBtn.addEventListener('click', () => {
            // Open the modal for adding a new task
            this.stateManager.setState('modal', { isOpen: true, type: 'TaskForm', data: null });
        });

        // Add event listeners for filters
        this.target.querySelector('#status-filter').addEventListener('change', (e) => this.filterTasks());
        this.target.querySelector('#priority-filter').addEventListener('change', (e) => this.filterTasks());
        this.target.querySelector('#search-filter').addEventListener('input', (e) => this.filterTasks());
    }

    subscribeToState() {
        this.stateManager.subscribe('tasks', (tasks) => {
            this.tasks = tasks;
            this.filterTasks(); // Re-render and filter based on current filter settings
        });
    }

    filterTasks() {
        const statusFilter = this.target.querySelector('#status-filter').value;
        const priorityFilter = this.target.querySelector('#priority-filter').value;
        const searchTerm = this.target.querySelector('#search-filter').value.toLowerCase();

        let filteredTasks = this.tasks;

        // Apply status filter
        if (statusFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.completed === (statusFilter === 'completed'));
        }

        // Apply priority filter
        if (priorityFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
        }

        // Apply search filter
        if (searchTerm) {
            filteredTasks = filteredTasks.filter(task =>
                task.title.toLowerCase().includes(searchTerm) ||
                (task.description && task.description.toLowerCase().includes(searchTerm))
            );
        }

        this.renderTasks(filteredTasks);
    }

    handleTaskUpdate(taskId, updatedData) {
        console.log(`Task ${taskId} updated:`, updatedData);
        this.stateManager.updateTask(taskId, updatedData);
    }

    handleTaskDelete(taskId) {
        console.log(`Task ${taskId} deleted.`);
        this.stateManager.deleteTask(taskId);
    }

    handleTaskToggle(taskId) {
        console.log(`Toggling completion for task ${taskId}.`);
        this.stateManager.toggleTaskCompletion(taskId);
    }

    handleTaskClick(taskId) {
        console.log(`Opening modal for task ${taskId}`);
        const taskToEdit = this.stateManager.getState('tasks').find(task => task.id === taskId);
        if (taskToEdit) {
            this.stateManager.setState('modal', { isOpen: true, type: 'TaskForm', data: taskToEdit });
        }
    }
}