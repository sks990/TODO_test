export class StateManager {
    constructor() {
        this.state = {
            currentView: 'Todo', // Default view
            theme: localStorage.getItem('theme') || 'light', // Default theme, sync with localStorage
            tasks: [], // Example state for tasks
            // Add other global states as needed
        };
        this.listeners = {};

        // Initialize theme on load
        document.body.className = this.state.theme;
        // Persist theme to localStorage
        localStorage.setItem('theme', this.state.theme);
    }

    getState(key) {
        return this.state[key];
    }

    setState(key, value) {
        if (this.state[key] !== value) {
            this.state[key] = value;
            this.notify(key, value);
            // Persist theme to localStorage
            if (key === 'theme') {
                localStorage.setItem('theme', value);
            }
        }
    }

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
        // Call immediately with current state
        callback(this.state[key]);
    }

    unsubscribe(key, callback) {
        if (this.listeners[key]) {
            this.listeners[key] = this.listeners[key].filter(listener => listener !== callback);
        }
    }

    notify(key, value) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => {
                try {
                    callback(value);
                } catch (error) {
                    console.error(`Error in listener for key "${key}":`, error);
                }
            });
        }
    }

    // --- Task specific methods (example) ---
    addTask(task) {
        const newTask = { ...task, id: Date.now(), status: 'pending' }; // Add unique ID and default status
        this.state.tasks.push(newTask);
        this.setState('tasks', this.state.tasks); // Notify listeners about tasks update
    }

    updateTask(id, updatedTaskData) {
        const taskIndex = this.state.tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            this.state.tasks[taskIndex] = { ...this.state.tasks[taskIndex], ...updatedTaskData };
            this.setState('tasks', this.state.tasks);
        }
    }

    toggleTaskCompletion(id) {
        const taskIndex = this.state.tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            this.state.tasks[taskIndex].completed = !this.state.tasks[taskIndex].completed;
            this.setState('tasks', this.state.tasks);
        }
    }

    deleteTask(id) {
        this.state.tasks = this.state.tasks.filter(task => task.id !== id);
        this.setState('tasks', this.state.tasks);
    }
}