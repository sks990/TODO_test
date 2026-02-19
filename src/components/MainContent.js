import TodoListView from './TodoListView.js';
import { getElement, createElement } from '../utils/helpers.js';
import { VIEWS } from '../utils/constants.js';

export default class MainContent {
    constructor() {
        this.currentViewComponent = null;
    }

    render(currentView) {
        const mainContent = createElement('main', { className: 'main-content' });

        // Remove previous view if exists
        const existingView = getElement('.current-view');
        if (existingView) {
            existingView.remove();
        }

        // Render the appropriate view based on currentView state
        switch (currentView) {
            case VIEWS.TODO:
                this.currentViewComponent = new TodoListView();
                break;
            case VIEWS.KANBAN:
                // Placeholder for KanbanBoardView
                this.currentViewComponent = {
                    render: () => createElement('div', { textContent: 'Kanban Board View (Not Implemented)', className: 'kanban-board-view' })
                };
                break;
            case VIEWS.GANTT:
                // Placeholder for GanttChartView
                this.currentViewComponent = {
                    render: () => createElement('div', { textContent: 'Gantt Chart View (Not Implemented)', className: 'gantt-chart-view' })
                };
                break;
            default:
                this.currentViewComponent = {
                    render: () => createElement('div', { textContent: 'Unknown View', className: 'unknown-view' })
                };
        }

        const viewElement = this.currentViewComponent.render();
        viewElement.classList.add('current-view'); // Add a class for easy removal/identification
        mainContent.appendChild(viewElement);

        return mainContent;
    }

    // Method to be called by App when state updates
    update(state) {
        // If the view has changed, re-render the main content
        if (this.currentViewComponent && this.currentViewComponent.viewName !== state.currentView) {
             const oldMainContent = getElement('.main-content');
             if(oldMainContent) {
                const newMainContentElement = this.render(state.currentView);
                oldMainContent.replaceWith(newMainContentElement);
             }
        } else if (this.currentViewComponent && typeof this.currentViewComponent.update === 'function') {
            // If the component has an update method (e.g., to re-render tasks), call it
            this.currentViewComponent.update(state);
        }
    }
}