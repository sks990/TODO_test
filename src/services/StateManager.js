import { VIEWS } from '../utils/constants.js';

class StateManager {
    constructor() {
        this.state = {
            currentView: VIEWS.TODO,
            theme: 'light',
            tasks: [],
            nextTaskId: 1
        };
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
        // Immediately call listener with current state
        listener(this.state);
    }

    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // State Mutators
    setCurrentView(view) {
        if (Object.values(VIEWS).includes(view)) {
            this.state.currentView = view;
            this.notify();
        }
    }

    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.body.className = this.state.theme === 'dark' ? 'dark-mode' : '';
        this.notify();
    }

    addTask(task) {
        const newTask = {
            id: this.state.nextTaskId++,
            ...task,
            completed: task.completed || false,
            createdAt: new Date().toISOString()
        };
        this.state.tasks.push(newTask);
        this.notify();
        return newTask;
    }

    updateTask(id, updatedTaskData) {
        const taskIndex = this.state.tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            this.state.tasks[taskIndex] = {
                ...this.state.tasks[taskIndex],
                ...updatedTaskData
            };
            this.notify();
            return this.state.tasks[taskIndex];
        }
        return null;
    }

    deleteTask(id) {
        const initialLength = this.state.tasks.length;
        this.state.tasks = this.state.tasks.filter(task => task.id !== id);
        if (this.state.tasks.length < initialLength) {
            this.notify();
            return true;
        }
        return false;
    }

    toggleTaskCompletion(id) {
        const taskIndex = this.state.tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            this.state.tasks[taskIndex].completed = !this.state.tasks[taskIndex].completed;
            this.notify();
            return this.state.tasks[taskIndex];
        }
        return null;
    }

    // Initial setup
    initialize() {
        // Apply initial theme
        document.body.className = this.state.theme === 'dark' ? 'dark-mode' : '';
        // Add some initial dummy tasks for demonstration if needed
        // this.state.tasks = [
        //     { id: this.state.nextTaskId++, title: 'Learn Vanilla JS', completed: true, priority: 'high', dueDate: '2024-08-01' },
        //     { id: this.state.nextTaskId++, title: 'Build UI Components', completed: false, priority: 'medium', dueDate: '2024-08-15' },
        //     { id: this.state.nextTaskId++, title: 'Style the App', completed: false, priority: 'low', dueDate: '2024-08-10' }
        // ];
        this.notify();
    }
}

export default new StateManager();