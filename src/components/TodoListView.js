import stateManager from '../utils/StateManager.js';
import TaskItem from './TaskItem.js';
import TaskFormModal from './TaskFormModal.js'; // Need this to open the modal

const TodoListView = () => {
    const todoListViewElement = document.createElement('section');
    todoListViewElement.className = 'todo-list-view';
    todoListViewElement.classList.add('container');

    let taskListContainer = null;
    let currentFilter = { status: 'all', priority: 'all', search: '' };
    let currentSortOrder = 'dueDate_asc';

    // Function to create controls (filter, sort, add button)
    const createControls = () => {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'todo-controls';

        controlsDiv.innerHTML = `
            <div class="filter-sort-group">
                <select id="filter-status">
                    <option value="all">All Statuses</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                <select id="filter-priority">
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input type="text" id="search-task" placeholder="Search tasks...">
            </div>
            <div class="filter-sort-group">
                <select id="sort-order">
                    <option value="dueDate_asc">Due Date (Asc)</option>
                    <option value="dueDate_desc">Due Date (Desc)</option>
                    <option value="priority_desc">Priority (High to Low)</option>
                    <option value="priority_asc">Priority (Low to High)</option>
                    <option value="createdAt_desc">Created (Newest)</option>
                </select>
                <button class="add-task-button">Add New Task</button>
            </div>
        `;
        return controlsDiv;
    };

    // Function to render the list of tasks
    const renderTasks = (tasks) => {
        if (!taskListContainer) return;

        taskListContainer.innerHTML = ''; // Clear current list

        const sortedAndFilteredTasks = tasks
            .filter(task => {
                const statusMatch = currentFilter.status === 'all' || task.status === currentFilter.status;
                const priorityMatch = currentFilter.priority === 'all' || task.priority === currentFilter.priority;
                const searchMatch = task.title.toLowerCase().includes(currentFilter.search.toLowerCase());
                return statusMatch && priorityMatch && searchMatch;
            })
            .sort((a, b) => {
                // Simple sorting logic based on currentSortOrder
                // More robust sorting can be implemented
                if (currentSortOrder === 'dueDate_asc') return (a.dueDate || '').localeCompare(b.dueDate || '');
                if (currentSortOrder === 'dueDate_desc') return (b.dueDate || '').localeCompare(a.dueDate || '');
                const priorityMap = { low: 1, medium: 2, high: 3 };
                if (currentSortOrder === 'priority_desc') return priorityMap[b.priority] - priorityMap[a.priority];
                if (currentSortOrder === 'priority_asc') return priorityMap[a.priority] - priorityMap[b.priority];
                if (currentSortOrder === 'createdAt_desc') return new Date(b.createdAt) - new Date(a.createdAt);
                return 0; // Default no sort
            });


        if (sortedAndFilteredTasks.length === 0) {
            taskListContainer.innerHTML = '<p class="container">No tasks found. Try adjusting your filters or adding a new one!</p>';
            return;
        }

        sortedAndFilteredTasks.forEach(task => {
            const taskItemElement = TaskItem({
                task,
                onToggleComplete: handleToggleComplete,
                onEdit: handleEditTask,
                onDelete: handleDeleteTask
            });
            taskListContainer.appendChild(taskItemElement);
        });
    };

    // --- Event Handlers ---
    const handleFilterChange = () => {
        currentFilter.status = todoListViewElement.querySelector('#filter-status').value;
        currentFilter.priority = todoListViewElement.querySelector('#filter-priority').value;
        currentFilter.search = todoListViewElement.querySelector('#search-task').value;
        stateManager.setFilters(currentFilter); // Update state manager filters
        renderTasks(stateManager.getState().tasks); // Re-render tasks with new filters
    };

    const handleSortChange = () => {
        currentSortOrder = todoListViewElement.querySelector('#sort-order').value;
        stateManager.setSortOrder(currentSortOrder); // Update state manager sort order
        renderTasks(stateManager.getState().tasks); // Re-render tasks with new sort order
    };

    const handleAddTaskClick = () => {
        // Find the App component's element to access the openTaskModal method
        const appElement = document.getElementById('app');
        if (appElement && appElement.openTaskModal) {
            appElement.openTaskModal(null); // Open modal for adding a new task
        }
    };

    const handleToggleComplete = (taskId) => {
        stateManager.toggleTaskCompletion(taskId);
        // stateManager.notify() will trigger renderTasks
    };

    const handleEditTask = (taskId) => {
        const taskToEdit = stateManager.getState().tasks.find(task => task.id === taskId);
        const appElement = document.getElementById('app');
        if (appElement && appElement.openTaskModal && taskToEdit) {
            appElement.openTaskModal(taskToEdit); // Open modal with task data for editing
        }
    };

    const handleDeleteTask = (taskId) => {
        if (confirm('Are you sure you want to delete this task?')) {
            stateManager.deleteTask(taskId);
            // stateManager.notify() will trigger renderTasks
        }
    };

    // --- Initialization ---
    const controlsElement = createControls();
    taskListContainer = document.createElement('div');
    taskListContainer.className = 'task-list';

    todoListViewElement.appendChild(controlsElement);
    todoListViewElement.appendChild(taskListContainer);

    // Add event listeners to controls
    controlsElement.querySelector('#filter-status').addEventListener('change', handleFilterChange);
    controlsElement.querySelector('#filter-priority').addEventListener('change', handleFilterChange);
    controlsElement.querySelector('#search-task').addEventListener('input', handleFilterChange); // Use input for live search
    controlsElement.querySelector('#sort-order').addEventListener('change', handleSortChange);
    controlsElement.querySelector('.add-task-button').addEventListener('click', handleAddTaskClick);

    // Initial render of tasks
    renderTasks(stateManager.getState().tasks);

    // Subscribe to state changes to re-render tasks when they change
    const unsubscribe = stateManager.subscribe(() => {
        const state = stateManager.getState();
        // Update current filters and sort order from state
        currentFilter = state.filters;
        currentSortOrder = state.sortOrder;

        // Update control values from state
        const statusSelect = todoListViewElement.querySelector('#filter-status');
        const prioritySelect = todoListViewElement.querySelector('#filter-priority');
        const searchInput = todoListViewElement.querySelector('#search-task');
        const sortSelect = todoListViewElement.querySelector('#sort-order');

        if (statusSelect) statusSelect.value = currentFilter.status;
        if (prioritySelect) prioritySelect.value = currentFilter.priority;
        if (searchInput) searchInput.value = currentFilter.search;
        if (sortSelect) sortSelect.value = currentSortOrder;

        renderTasks(state.tasks);
    });

    // Clean up subscription when the component is removed (if it were possible)
    // For this single-page app structure, it might not be strictly necessary until app unmount.
    todoListViewElement.removeSubscription = unsubscribe;

    return todoListViewElement;
};

export default TodoListView;