import TodoListView from './TodoListView.js';

// Placeholder components for other views
const KanbanBoardView = () => {
    const div = document.createElement('div');
    div.innerHTML = '<h2 class="container">Kanban Board View (Coming Soon)</h2>';
    div.classList.add('main-content-view');
    return div;
};

const GanttChartView = () => {
    const div = document.createElement('div');
    div.innerHTML = '<h2 class="container">Gantt Chart View (Coming Soon)</h2>';
    div.classList.add('main-content-view');
    return div;
};

const MainContent = ({ currentView }) => {
    const mainContentElement = document.createElement('main');
    mainContentElement.className = 'main-content';

    const viewsMap = {
        'Todo': TodoListView,
        'Kanban': KanbanBoardView,
        'Gantt': GanttChartView
    };

    let currentViewComponent = null;

    const renderView = (view) => {
        // Clear previous content
        mainContentElement.innerHTML = '';

        const ComponentToRender = viewsMap[view] || TodoListView; // Default to TodoListView if view is invalid
        currentViewComponent = ComponentToRender();
        mainContentElement.appendChild(currentViewComponent);
    };

    // Initial render
    renderView(currentView);

    // Method to update the view when state changes
    mainContentElement.renderView = renderView;

    return mainContentElement;
};

export default MainContent;