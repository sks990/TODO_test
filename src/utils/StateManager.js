// Mock StateManager using a simple Observable pattern
// In a real app, this would be more sophisticated (e.g., Redux, Zustand, Context API with hooks)

class StateManager {
    constructor() {
        this.state = {
            currentView: 'Todo', // 'Todo', 'Kanban', 'Gantt'
            theme: 'light',      // 'light', 'dark'
            tasks: [],           // Array of task objects
            nextTaskId: 1,
            filters: {
                status: 'all',
                priority: 'all',
                search: ''
            },
            sortOrder: 'dueDate_asc' // e.g., 'dueDate_asc', 'priority_desc'
        };
        this.listeners = [];
    }

    // Subscribe a callback function to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        // Return an unsubscribe function
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Notify all listeners about state changes
    notify() {
        this.listeners.forEach(listener => listener());
    }

    // Get the current state
    getState() {
        // Return a copy to prevent direct mutation
        return JSON.parse(JSON.stringify(this.state));
    }

    // Update state and notify listeners
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    // --- Specific Actions ---

    // Set the current view
    setCurrentView(view) {
        this.setState({ currentView: view });
    }

    // Toggle theme
    toggleTheme() {
        const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
        this.setState({ theme: newTheme });
        // Apply theme to body class
        if (newTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    // Add a new task
    addTask(taskData) {
        const newTask = {
            id: this.state.nextTaskId++,
            title: taskData.title,
            description: taskData.description || '',
            status: taskData.status || 'todo', // 'todo', 'in-progress', 'done'
            priority: taskData.priority || 'medium', // 'low', 'medium', 'high'
            dueDate: taskData.dueDate || null,
            startDate: taskData.startDate || null,
            endDate: taskData.endDate || null,
            boardColumnId: taskData.boardColumnId || null, // For Kanban
            parentId: taskData.parentId || null, // For subtasks, etc.
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.setState({ tasks: [...this.state.tasks, newTask] });
    }

    // Update an existing task
    updateTask(taskId, updatedData) {
        const tasks = this.state.tasks.map(task =>
            task.id === taskId ? { ...task, ...updatedData, updatedAt: new Date().toISOString() } : task
        );
        this.setState({ tasks });
    }

    // Toggle task completion status
    toggleTaskCompletion(taskId) {
        const tasks = this.state.tasks.map(task =>
            task.id === taskId
                ? { ...task, status: task.status === 'done' ? 'todo' : 'done', updatedAt: new Date().toISOString() }
                : task
        );
        this.setState({ tasks });
    }

    // Delete a task
    deleteTask(taskId) {
        const tasks = this.state.tasks.filter(task => task.id !== taskId);
        this.setState({ tasks });
    }

    // Set filters
    setFilters(filters) {
        this.setState({ filters: { ...this.state.filters, ...filters } });
    }

    // Set sort order
    setSortOrder(sortOrder) {
        this.setState({ sortOrder });
    }

    // --- Helper for initial setup ---
    // Sets up initial state, e.g., applies dark mode if saved in localStorage
    initialize() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setState({ theme: savedTheme });
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        // Add some dummy tasks for initial rendering if needed
        if (this.state.tasks.length === 0) {
            this.addTask({ title: "Learn State Management", priority: "high", dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] });
            this.addTask({ title: "Implement Header Component", priority: "medium", dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0] });
            this.addTask({ title: "Style Task Items", priority: "low", dueDate: new Date(new Date().getDate() + 5).toISOString().split('T')[0] });
        }
    }
}

// Create a single instance of StateManager
const stateManager = new StateManager();

export default stateManager;