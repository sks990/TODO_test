import { TodoListView } from '../TodoListView/TodoListView.js';
// Import other views as they are created
// import { KanbanBoardView } from '../KanbanBoardView/KanbanBoardView.js';
// import { GanttChartView } from '../GanttChartView/GanttChartView.js';

export class MainContent {
    constructor({ target, stateManager }) {
        this.target = target;
        this.stateManager = stateManager;
        this.currentView = this.stateManager.getState('currentView');
        this.render();
        this.subscribeToState();
    }

    render() {
        this.target.innerHTML = '<div id="view-container"></div>';
        this.renderCurrentView();
    }

    renderCurrentView() {
        const viewContainer = this.target.querySelector('#view-container');
        // Clear previous view
        viewContainer.innerHTML = '';

        let currentComponent;
        switch (this.currentView) {
            case 'Todo':
                currentComponent = new TodoListView({ target: viewContainer, stateManager: this.stateManager });
                break;
            // case 'Kanban':
            //     currentComponent = new KanbanBoardView({ target: viewContainer, stateManager: this.stateManager });
            //     break;
            // case 'Gantt':
            //     currentComponent = new GanttChartView({ target: viewContainer, stateManager: this.stateManager });
            //     break;
            default:
                viewContainer.innerHTML = '<h2>Welcome! Select a view from the header.</h2>';
                break;
        }
        // Store component instance if needed for later manipulation
        this.activeComponent = currentComponent;
    }

    subscribeToState() {
        this.stateManager.subscribe('currentView', (newView) => {
            this.currentView = newView;
            this.renderCurrentView();
        });
    }
}