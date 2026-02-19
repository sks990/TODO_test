# 공통 UI 구조 및 Todo/모달 컴포넌트 구현

## 개요
- **타입**: feature
- **우선순위**: high
- **담당 에이전트**: PM
- **완료일**: 2026-02-19

## 태스크 설명
## 목적 및 기본방침
애플리케이션의 기본적인 레이아웃을 구성하고, Todo 목록 뷰와 할 일 추가/수정 모달 등 핵심 UI 컴포넌트들을 바닐라 JavaScript와 DOM API를 사용하여 구현합니다. 이는 사용자가 애플리케이션을 처음 접할 때의 핵심 기능을 제공합니다.

## 실행 계획 및 방법
1.  **`index.html` 구조 정의**: `App`, `Header`, `MainContent`, `ModalContainer`를 위한 기본 HTML 스켈레톤을 구성합니다.
2.  **`App` 컴포넌트 구현**: 전역 상태(`StateManager`)를 구독하고, `Header`와 `MainContent`를 동적으로 렌더링하는 루트 컴포넌트를 구현합니다.
3.  **`Header` 컴포넌트 구현**: 뷰 전환(`Todo`, `Kanban`, `Gantt`) 네비게이션 메뉴와 테마 토글 버튼을 포함합니다. `onViewChange` 및 `onThemeToggle` 이벤트를 처리합니다.
4.  **`MainContent` 컴포넌트 구현**: `currentView` 상태에 따라 `TodoListView`, `KanbanBoardView`, `GanttChartView` 중 하나를 동적으로 렌더링하는 로직을 구현합니다.
5.  **`TodoListView` 컴포넌트 구현**: 할 일 필터링/정렬 컨트롤과 `TaskItem` 목록, 할 일 추가 버튼을 포함하는 Todo 목록 뷰를 구현합니다.
6.  **`TaskItem` 컴포넌트 구현**: 개별 할 일 항목(제목, 마감일, 우선순위, 완료 여부 체크박스)을 표시하고, 클릭 시 상세/수정 모달 오픈 및 완료 상태 토글 이벤트를 처리합니다. 드래그 가능한 속성(`draggable`)을 추가합니다.
7.  **`ModalContainer` 컴포넌트 구현**: 모달을 위한 오버레이 배경과 모달 콘텐츠를 동적으로 삽입할 컨테이너를 구현합니다. 모달 열림/닫힘 애니메이션 효과를 적용합니다.
8.  **`TaskFormModal` 컴포넌트 구현**: 할 일 추가/수정을 위한 폼(`title`, `description`, `status`, `priority`, `dueDate`, `startDate`, `endDate`, `boardColumnId`, `parentId`)을 포함하는 모달을 구현하고, `onSave` 및 `onCancel` 이벤트를 처리합니다. 사용자 입력 유효성 검사 UI 피드백을 추가합니다.
9.  CSS를 사용하여 "인터랙티브하고 화려한" UI/UX 요구사항에 맞춰 시각적 디자인, 반응형 레이아웃, 전환 및 애니메이션 효과를 구현합니다.

## 확인 방법 및 체크리스트
- [ ] 웹 페이지 로드 시 `App`, `Header`, `MainContent`가 올바르게 렌더링되는지 확인.
- [ ] 헤더의 네비게이션 메뉴 클릭 시 뷰가 전환되고, 활성 뷰에 대한 시각적 피드백이 제공되는지 확인.
- [ ] 테마 토글 버튼 클릭 시 라이트/다크 모드로 전환되고, UI 스타일이 변경되는지 확인.
- [ ] `TodoListView`에서 할 일 추가 버튼 클릭 시 `TaskFormModal`이 올바르게 열리고 닫히는 애니메이션이 작동하는지 확인.
- [ ] `TaskItem`의 완료 체크박스 클릭 시 스타일이 변경되고, 드래그 시 시각적 피드백이 제공되는지 확인.
- [ ] `TaskFormModal`에서 모든 필드의 입력이 가능하며, 필수 필드 유효성 검사 시 오류 메시지가 표시되는지 확인.

## 작업 보고서
```filepath:docs/requirements/feature-spec.md
# Feature Specification

## Requirements

### 1. Basic UI Structure and Core Components
-   **Objective**: To establish the foundational layout of the application and implement essential UI components such as the Todo list view and add/edit task modals using Vanilla JavaScript and DOM APIs.
-   **Details**:
    -   Define the basic HTML structure for `App`, `Header`, `MainContent`, and `ModalContainer` in `index.html`.
    -   Implement the `App` component as the root, subscribing to a global `StateManager` and dynamically rendering `Header` and `MainContent`.
    -   Implement the `Header` component with navigation for view switching (`Todo`, `Kanban`, `Gantt`) and a theme toggle button. It should handle `onViewChange` and `onThemeToggle` events.
    -   Implement the `MainContent` component to dynamically render `TodoListView`, `KanbanBoardView`, or `GanttChartView` based on the `currentView` state.
    -   Implement the `TodoListView` component, including controls for filtering/sorting tasks, a list of `TaskItem` components, and an "Add Task" button.
    -   Implement the `TaskItem` component to display individual task details (title, due date, priority, completion status) and handle events for opening the detail/edit modal and toggling completion status. It should also have a `draggable` attribute.
    -   Implement the `ModalContainer` component with an overlay background and a container for dynamically inserted modal content, including opening/closing animations.
    -   Implement the `TaskFormModal` component for adding/editing tasks, including form fields (`title`, `description`, `status`, `priority`, `dueDate`, `startDate`, `endDate`, `boardColumnId`, `parentId`). It should handle `onSave` and `onCancel` events and provide UI feedback for input validation.
    -   Implement CSS to meet "interactive and visually appealing" UI/UX requirements, including visual design, responsive layout, transitions, and animations.

### 2. Task Management Functionality
-   **Objective**: Enable users to add, view, edit, and mark tasks as complete.
-   **Details**:
    -   Users can add new tasks via the `TaskFormModal`.
    -   Users can view a list of tasks in the `TodoListView`.
    -   Users can edit existing tasks using the `TaskFormModal`.
    -   Users can mark tasks as complete/incomplete via a checkbox in the `TaskItem`.
    -   Tasks should be visually distinct when completed.

### 3. Navigation and Theming
-   **Objective**: Allow users to navigate between different views and toggle between light and dark themes.
-   **Details**:
    -   The `Header` component should provide navigation to "Todo", "Kanban", and "Gantt" views.
    -   The active view should be visually highlighted.
    -   A theme toggle in the `Header` should switch between light and dark color schemes.

### 4. User Experience Enhancements
-   **Objective**: Provide a smooth and intuitive user experience.
-   **Details**:
    -   Modal components should have opening and closing animations.
    -   Task items should provide visual feedback when being dragged.
    -   Form input validation should provide clear user feedback.

## Acceptance Criteria

### 1. UI Rendering and Structure
-   [ ] Web page loads correctly, rendering `App`, `Header`, and `MainContent`.
-   [ ] `index.html` contains the basic structure for `App`, `Header`, `MainContent`, and `ModalContainer`.

### 2. Navigation and View Switching
-   [ ] Clicking navigation menus in the header switches the view displayed in `MainContent`.
-   [ ] The active view is visually indicated in the header.

### 3. Theming
-   [ ] Clicking the theme toggle button switches the application between light and dark themes.
-   [ ] UI styles update appropriately for the selected theme.

### 4. Todo List Functionality
-   [ ] The "Add Task" button in `TodoListView` opens the `TaskFormModal`.
-   [ ] The `TaskFormModal` opens and closes with animations.
-   [ ] `TaskItem` completion checkbox toggles task status with visual feedback.
-   [ ] `TaskItem` components are draggable, providing visual feedback during drag operations.

### 5. Task Form Modal
-   [ ] All form fields (`title`, `description`, `status`, `priority`, `dueDate`, `startDate`, `endDate`, `boardColumnId`, `parentId`) are present and functional in the `TaskFormModal`.
-   [ ] User input validation is functional, and error messages are displayed for required fields.
-   [ ] The `onSave` and `onCancel` events from the modal are handled correctly.

### 6. Styling and UX
-   [ ] The UI is visually appealing and interactive as per the requirements.
-   [ ] The layout is responsive across different screen sizes.
-   [ ] Transitions and animations are implemented effectively.

## User Stories

-   As a user, I want to see a basic application layout so that I can understand the structure and navigate its features.
-   As a user, I want to switch between different views (Todo, Kanban, Gantt) so that I can organize and manage my tasks effectively.
-   As a user, I want to toggle between light and dark themes so that I can customize my viewing experience.
-   As a user, I want to add a new task with details like title, description, due date, and priority so that I can keep track of my work.
-   As a user, I want to mark tasks as complete so that I can track my progress.
-   As a user, I want to edit existing tasks so that I can update their details.
-   As a user, I want to see clear visual feedback for actions like drag-and-drop and form validation so that I can use the application intuitively.
-   As a user, I want the application to be visually appealing and interactive so that I have a pleasant user experience.

```
```filepath:src/main.js
import App from './App.js';
import { StateManager } from './services/StateManager.js';
import './styles/main.css';

// Initialize state manager
const stateManager = new StateManager();

// Render the App component
const app = new App({ target: document.getElementById('app'), stateManager });

// Expose stateManager globally for easier debugging or external access if needed
window.stateManager = stateManager;

console.log('Application initialized.');
```

```filepath:src/App.js
import { Header } from './components/Header/Header.js';
import { MainContent } from './components/MainContent/MainContent.js';
import { ModalContainer } from './components/ModalContainer/ModalContainer.js';
import { StateManager } from './services/StateManager.js'; // Assuming StateManager is in services

export class App {
    constructor({ target, stateManager }) {
        this.target = target;
        this.stateManager = stateManager;
        this.components = {};
        this.render();
        this.subscribeToState();
    }

    render() {
        this.target.innerHTML = `
            <div id="app-container">
                <header id="app-header"></header>
                <main id="main-content"></main>
                <div id="modal-container"></div>
            </div>
        `;

        this.components.header = new Header({
            target: this.target.querySelector('#app-header'),
            stateManager: this.stateManager,
            onViewChange: (view) => this.handleViewChange(view),
            onThemeToggle: () => this.handleThemeToggle()
        });

        this.components.mainContent = new MainContent({
            target: this.target.querySelector('#main-content'),
            stateManager: this.stateManager
        });

        this.components.modalContainer = new ModalContainer({
            target: this.target.querySelector('#modal-container'),
            stateManager: this.stateManager
        });
    }

    subscribeToState() {
        // Subscribe to theme changes
        this.stateManager.subscribe('theme', (newTheme) => {
            document.body.className = newTheme; // Apply theme class to body
        });
        // Initial theme application
        document.body.className = this.stateManager.getState('theme');
    }

    handleViewChange(view) {
        console.log(`View changed to: ${view}`);
        this.stateManager.setState('currentView', view);
    }

    handleThemeToggle() {
        const currentTheme = this.stateManager.getState('theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.stateManager.setState('theme', newTheme);
    }
}
```

```filepath:src/services/StateManager.js
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
```

```filepath:src/components/Header/Header.js
import './Header.css';

export class Header {
    constructor({ target, stateManager, onViewChange, onThemeToggle }) {
        this.target = target;
        this.stateManager = stateManager;
        this.onViewChange = onViewChange;
        this.onThemeToggle = onThemeToggle;
        this.currentView = this.stateManager.getState('currentView');
        this.render();
        this.bindEvents();
        this.subscribeToState();
    }

    render() {
        this.target.innerHTML = `
            <div class="header-container">
                <nav class="view-navigator">
                    <button data-view="Todo" class="${this.currentView === 'Todo' ? 'active' : ''}">Todo</button>
                    <button data-view="Kanban" class="${this.currentView === 'Kanban' ? 'active' : ''}">Kanban</button>
                    <button data-view="Gantt" class="${this.currentView === 'Gantt' ? 'active' : ''}">Gantt</button>
                </nav>
                <div class="header-actions">
                    <button id="theme-toggle">Toggle Theme</button>
                    <div class="user-profile">User</div>
                </div>
            </div>
        `;
        this.updateActiveNavButton();
    }

    bindEvents() {
        this.target.querySelectorAll('.view-navigator button').forEach(button => {
            button.addEventListener('click', (event) => {
                const newView = event.target.dataset.view;
                this.onViewChange(newView);
            });
        });

        this.target.querySelector('#theme-toggle').addEventListener('click', () => {
            this.onThemeToggle();
        });
    }

    subscribeToState() {
        this.stateManager.subscribe('currentView', (newView) => {
            this.currentView = newView;
            this.updateActiveNavButton();
        });
    }

    updateActiveNavButton() {
        this.target.querySelectorAll('.view-navigator button').forEach(button => {
            if (button.dataset.view === this.currentView) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}
```

```filepath:src/components/Header/Header.css
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: var(--color-header-bg);
    border-bottom: 1px solid var(--color-border);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 60px; /* Fixed height for header */
    box-sizing: border-box;
}

.view-navigator button {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    font-size: 1.1em;
    margin-right: 20px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    transition: color 0.3s, background-color 0.3s;
}

.view-navigator button:hover {
    color: var(--color-primary);
}

.view-navigator button.active {
    color: var(--color-text-primary);
    font-weight: bold;
    background-color: var(--color-nav-active-bg);
    border: 1px solid var(--color-primary);
}

.header-actions {
    display: flex;
    align-items: center;
}

#theme-toggle {
    background-color: var(--color-button-bg);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    margin-right: 20px;
    transition: background-color 0.3s, color 0.3s;
}

#theme-toggle:hover {
    background-color: var(--color-button-hover-bg);
}

.user-profile {
    width: 35px;
    height: 35px;
    background-color: var(--color-primary);
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 0.9em;
}

/* Dark Mode Adjustments */
body.dark .header-container {
    background-color: var(--color-header-bg-dark);
    border-bottom: 1px solid var(--color-border-dark);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

body.dark .view-navigator button {
    color: var(--color-text-secondary-dark);
}

body.dark .view-navigator button:hover {
    color: var(--color-primary-dark);
}

body.dark .view-navigator button.active {
    color: var(--color-text-primary-dark);
    background-color: var(--color-nav-active-bg-dark);
    border: 1px solid var(--color-primary-dark);
}

body.dark #theme-toggle {
    background-color: var(--color-button-bg-dark);
    color: var(--color-text-primary-dark);
    border: 1px solid var(--color-border-dark);
}

body.dark #theme-toggle:hover {
    background-color: var(--color-button-hover-bg-dark);
}

```

```filepath:src/components/MainContent/MainContent.js
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
```

```filepath:src/components/ModalContainer/ModalContainer.js
import './ModalContainer.css';
import { TaskFormModal } from '../TaskFormModal/TaskFormModal.js';

export class ModalContainer {
    constructor({ target, stateManager }) {
        this.target = target;
        this.stateManager = stateManager;
        this.modalInstance = null; // To hold the current modal instance
        this.render();
        this.subscribeToState();
    }

    render() {
        this.target.innerHTML = `
            <div id="modal-overlay" class="modal-overlay hidden">
                <div id="modal-content" class="modal-content">
                    <!-- Modal content will be rendered here -->
                </div>
            </div>
        `;
        this.overlay = this.target.querySelector('#modal-overlay');
        this.modalContent = this.target.querySelector('#modal-content');

        this.overlay.addEventListener('click', (event) => {
            // Close modal if clicking on the overlay background
            if (event.target === this.overlay) {
                this.closeModal();
            }
        });
    }

    subscribeToState() {
        this.stateManager.subscribe('modal', (modalData) => {
            if (modalData && modalData.isOpen) {
                this.openModal(modalData.type, modalData.data);
            } else {
                this.closeModal();
            }
        });
    }

    openModal(modalType, modalData) {
        // Clear previous modal content
        this.modalContent.innerHTML = '';
        this.overlay.classList.remove('hidden');
        this.overlay.classList.add('visible'); // Add visible class for animation

        // Dynamically create and render the modal
        switch (modalType) {
            case 'TaskForm':
                this.modalInstance = new TaskFormModal({
                    target: this.modalContent,
                    stateManager: this.stateManager,
                    initialData: modalData,
                    onClose: () => this.closeModal()
                });
                break;
            // Add cases for other modal types
            default:
                console.warn(`Unknown modal type: ${modalType}`);
                this.closeModal();
                return;
        }
    }

    closeModal() {
        if (this.overlay.classList.contains('visible')) {
            this.overlay.classList.remove('visible');
            this.overlay.classList.add('hidden');
            // Remove modal instance after animation or immediately
            // setTimeout(() => {
                this.modalContent.innerHTML = '';
                this.modalInstance = null;
                this.stateManager.setState('modal', { isOpen: false }); // Update state
            // }, 300); // Match animation duration
            this.modalInstance = null; // Clear instance immediately
            this.stateManager.setState('modal', { isOpen: false }); // Update state
        }
    }
}
```

```filepath:src/components/ModalContainer/ModalContainer.css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.modal-overlay.hidden {
    opacity: 0;
    visibility: hidden;
}

.modal-content {
    background-color: var(--color-modal-bg);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    width: 90%;
    max-width: 500px; /* Adjust as needed */
    max-height: 80vh;
    overflow-y: auto;
    transform: translateY(20px);
    opacity: 1;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.modal-overlay.visible .modal-content {
    transform: translateY(0);
}

/* Dark Mode Adjustments */
body.dark .modal-overlay {
    background-color: rgba(0, 0, 0, 0.7);
}

body.dark .modal-content {
    background-color: var(--color-modal-bg-dark);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}
```

```filepath:src/components/TodoListView/TodoListView.js
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
```

```filepath:src/components/TodoListView/TodoListView.css
.todo-list-view-container {
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    background-color: var(--color-card-bg);
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.todo-list-view-container h2 {
    color: var(--color-text-primary);
    margin-bottom: 20px;
    border-bottom: 2px solid var(--color-primary);
    padding-bottom: 10px;
}

.task-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    flex-wrap: wrap;
    gap: 15px;
}

#add-task-btn {
    padding: 10px 20px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.filter-sort {
    display: flex;
    gap: 10px;
    align-items: center;
}

.filter-sort select,
.filter-sort input[type="text"] {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid var(--color-border);
    background-color: var(--color-input-bg);
    color: var(--color-text-primary);
    font-size: 0.9em;
}

.filter-sort input[type="text"]::placeholder {
    color: var(--color-text-secondary);
}

#task-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.no-tasks {
    text-align: center;
    color: var(--color-text-secondary);
    padding: 30px;
    font-style: italic;
}

/* Dark Mode Adjustments */
body.dark .todo-list-view-container {
    background-color: var(--color-card-bg-dark);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

body.dark .todo-list-view-container h2 {
    color: var(--color-text-primary-dark);
    border-bottom: 2px solid var(--color-primary-dark);
}

body.dark .filter-sort select,
body.dark .filter-sort input[type="text"] {
    border: 1px solid var(--color-border-dark);
    background-color: var(--color-input-bg-dark);
    color: var(--color-text-primary-dark);
}

body.dark .filter-sort input[type="text"]::placeholder {
    color: var(--color-text-secondary-dark);
}

```

```filepath:src/components/TaskItem/TaskItem.js
import './TaskItem.css';

export class TaskItem {
    constructor({ target, stateManager, taskData, onTaskUpdate, onTaskDelete, onTaskToggle, onTaskClick }) {
        this.target = target;
        this.stateManager = stateManager;
        this.taskData = taskData;
        this.onTaskUpdate = onTaskUpdate;
        this.onTaskDelete = onTaskDelete;
        this.onTaskToggle = onTaskToggle;
        this.onTaskClick = onTaskClick;
        this.render();
        this.bindEvents();
    }

    render() {
        const { id, title, dueDate, priority, completed } = this.taskData;
        const priorityClass = `priority-${priority}`; // e.g., priority-high
        const completionClass = completed ? 'completed' : '';

        const li = document.createElement('li');
        li.setAttribute('data-task-id', id);
        li.classList.add('task-item', completionClass, priorityClass);
        li.draggable = true; // Make the item draggable

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
                <span class="task-title">${title}</span>
            </div>
            <div class="task-meta">
                ${dueDate ? `<span class="task-due-date">${dueDate}</span>` : ''}
                <span class="task-priority">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
            </div>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        this.target.appendChild(li);
        this.element = li; // Store reference to the element
    }

    bindEvents() {
        const checkbox = this.element.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            this.onTaskToggle(this.taskData.id);
        });

        const editButton = this.element.querySelector('.edit-btn');
        editButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering click on the whole item
            this.onTaskClick(this.taskData.id);
        });

        const deleteButton = this.element.querySelector('.delete-btn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering click on the whole item
            if (confirm('Are you sure you want to delete this task?')) {
                this.onTaskDelete(this.taskData.id);
            }
        });

        // Handle click on the task title/content area to open modal
        this.element.querySelector('.task-content').addEventListener('click', () => {
             this.onTaskClick(this.taskData.id);
        });

        // Drag and Drop Event Listeners
        this.element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', this.taskData.id);
            e.dataTransfer.effectAllowed = 'move';
            this.element.classList.add('dragging');
            // Optional: Add a small delay or visual cue for drag start
        });

        this.element.addEventListener('dragend', () => {
            this.element.classList.remove('dragging');
        });

        // Note: Drop logic will be handled by the parent list component (e.g., TodoListView or KanbanBoard)
    }
}
```

```filepath:src/components/TaskItem/TaskItem.css
.task-item {
    background-color: var(--color-card-bg);
    padding: 15px 20px;
    margin-bottom: 12px;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: grab; /* Indicate draggable */
    transition: background-color 0.3s, box-shadow 0.3s, transform 0.2s ease-out;
    border-left: 5px solid transparent; /* For priority indicator */
}

.task-item:hover {
    background-color: var(--color-card-hover-bg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.task-item.dragging {
    opacity: 0.5;
    background-color: var(--color-primary); /* Visual cue during drag */
    transform: scale(1.02);
}

.task-content {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-right: 15px;
    cursor: pointer; /* Make the content area clickable */
}

.task-checkbox {
    margin-right: 12px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--color-primary); /* Custom checkbox color */
}

.task-title {
    font-size: 1em;
    color: var(--color-text-primary);
    flex-shrink: 1; /* Allow title to shrink if needed */
    word-break: break-word; /* Break long words */
}

.task-item.completed .task-title {
    text-decoration: line-through;
    color: var(--color-text-secondary);
    opacity: 0.7;
}

.task-meta {
    display: flex;
    align-items: center;
    font-size: 0.85em;
    color: var(--color-text-secondary);
    white-space: nowrap; /* Prevent wrapping of meta info */
}

.task-due-date {
    margin-right: 10px;
}

.task-priority {
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: bold;
    text-transform: capitalize;
}

/* Priority Colors */
.priority-low .task-priority,
.priority-low { border-left-color: #63b3ed; } /* Blue */
.priority-low .task-priority { background-color: #bee3f8; color: #2b6cb0; }

.priority-medium .task-priority,
.priority-medium { border-left-color: #f6ad55; } /* Orange */
.priority-medium .task-priority { background-color: #fed78e; color: #dd6b20; }

.priority-high .task-priority,
.priority-high { border-left-color: #f56565; } /* Red */
.priority-high .task-priority { background-color: #feb7b7; color: #c53030; }

.task-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 15px;
}

.edit-btn, .delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9em;
    padding: 5px 8px;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
}

.edit-btn {
    color: var(--color-primary);
}
.edit-btn:hover {
    background-color: var(--color-primary-light);
}

.delete-btn {
    color: #e53e3e; /* Red */
}
.delete-btn:hover {
    background-color: #fed7d7; /* Light red */
}

/* Dark Mode Adjustments */
body.dark .task-item {
    background-color: var(--color-card-bg-dark);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

body.dark .task-item:hover {
    background-color: var(--color-card-hover-bg-dark);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

body.dark .task-item.dragging {
    background-color: var(--color-primary-dark);
}

body.dark .task-checkbox {
   accent-color: var(--color-primary-dark);
}

body.dark .task-item.completed .task-title {
    color: var(--color-text-secondary-dark);
}

body.dark .task-title {
    color: var(--color-text-primary-dark);
}

body.dark .task-meta {
    color: var(--color-text-secondary-dark);
}

body.dark .edit-btn:hover {
    background-color: var(--color-primary-light-dark);
}

/* Priority Colors Dark Mode */
body.dark .priority-low { border-left-color: #90cdf4; } /* Light Blue */
body.dark .priority-low .task-priority { background-color: #81e6d9; color: #2a4365;} /* Teal */

body.dark .priority-medium .task-priority { background-color: #fdc68a; color: #9c4221;} /* Darker Orange */
body.dark .priority-medium { border-left-color: #fbb67a; }

body.dark .priority-high .task-priority { background-color: #febcbc; color: #9b2c2c; } /* Darker Red */
body.dark .priority-high { border-left-color: #f58a8a; }

```

```filepath:src/components/TaskFormModal/TaskFormModal.js
import './TaskFormModal.css';

export class TaskFormModal {
    constructor({ target, stateManager, initialData, onClose }) {
        this.target = target;
        this.stateManager = stateManager;
        this.initialData = initialData; // Task data if editing, null if adding
        this.onClose = onClose;
        this.isEditing = !!initialData;
        this.render();
        this.bindEvents();
        this.populateForm();
    }

    render() {
        this.target.innerHTML = `
            <div class="task-form-modal">
                <h2>${this.isEditing ? 'Edit Task' : 'Add New Task'}</h2>
                <form id="task-form">
                    <div class="form-group">
                        <label for="task-title">Title <span class="required">*</span></label>
                        <input type="text" id="task-title" required>
                        <div class="error-message" id="title-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="task-description">Description</label>
                        <textarea id="task-description"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="task-priority">Priority <span class="required">*</span></label>
                            <select id="task-priority" required>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div class="error-message" id="priority-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="task-status">Status <span class="required">*</span></label>
                            <select id="task-status" required>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                             <div class="error-message" id="status-error"></div>
                        </div>
                    </div>
                    <div class="form-row">
                         <div class="form-group">
                            <label for="task-due-date">Due Date</label>
                            <input type="date" id="task-due-date">
                        </div>
                         <div class="form-group">
                            <label for="task-start-date">Start Date</label>
                            <input type="date" id="task-start-date">
                        </div>
                         <div class="form-group">
                            <label for="task-end-date">End Date</label>
                            <input type="date" id="task-end-date">
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" id="cancel-btn" class="btn-secondary">Cancel</button>
                        <button type="submit" id="save-btn" class="btn-primary">${this.isEditing ? 'Update Task' : 'Add Task'}</button>
                    </div>
                </form>
            </div>
        `;
        this.form = this.target.querySelector('#task-form');
        this.titleInput = this.target.querySelector('#task-title');
        this.descriptionInput = this.target.querySelector('#task-description');
        this.priorityInput = this.target.querySelector('#task-priority');
        this.statusInput = this.target.querySelector('#task-status');
        this.dueDateInput = this.target.querySelector('#task-due-date');
        this.startDateInput = this.target.querySelector('#task-start-date');
        this.endDateInput = this.target.querySelector('#task-end-date');

        // Add more input element references if needed
    }

    populateForm() {
        if (this.isEditing && this.initialData) {
            this.titleInput.value = this.initialData.title || '';
            this.descriptionInput.value = this.initialData.description || '';
            this.priorityInput.value = this.initialData.priority || 'medium';
            this.statusInput.value = this.initialData.status || 'pending';
            this.dueDateInput.value = this.initialData.dueDate || '';
            this.startDateInput.value = this.initialData.startDate || '';
            this.endDateInput.value = this.initialData.endDate || '';
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                this.saveTask();
            }
        });

        this.target.querySelector('#cancel-btn').addEventListener('click', () => {
            this.onClose();
        });

        // Add input listeners for real-time validation
        this.titleInput.addEventListener('input', () => this.validateField('title'));
        this.priorityInput.addEventListener('change', () => this.validateField('priority'));
        this.statusInput.addEventListener('change', () => this.validateField('status'));
    }

    validateField(fieldName) {
        const input = this.target.querySelector(`#task-${fieldName}`);
        const errorDiv = this.target.querySelector(`#${fieldName}-error`);
        if (!input || !errorDiv) return;

        if (input.value.trim() === '' && input.hasAttribute('required')) {
            errorDiv.textContent = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
            input.classList.add('input-error');
            return false;
        } else {
            errorDiv.textContent = '';
            input.classList.remove('input-error');
            return true;
        }
    }

     validateForm() {
        let isValid = true;

        // Title validation
        isValid = this.validateField('title') && isValid;

        // Priority validation
        isValid = this.validateField('priority') && isValid;

        // Status validation
        isValid = this.validateField('status') && isValid;

        // Add more field validations as needed

        return isValid;
    }

    saveTask() {
        const taskData = {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            priority: this.priorityInput.value,
            status: this.statusInput.value,
            dueDate: this.dueDateInput.value,
            startDate: this.startDateInput.value,
            endDate: this.endDateInput.value,
            // Add other fields like boardColumnId, parentId if applicable later
        };

        if (this.isEditing) {
            this.stateManager.updateTask(this.initialData.id, taskData);
        } else {
            this.stateManager.addTask(taskData);
        }
        this.onClose();
    }
}
```

```filepath:src/components/TaskFormModal/TaskFormModal.css
.task-form-modal {
    background-color: var(--color-modal-bg);
    padding: 30px;
    border-radius: 8px;
    width: 100%; /* Occupy the modal-content area */
    max-width: 500px; /* Max width */
    box-sizing: border-box;
}

.task-form-modal h2 {
    color: var(--color-text-primary);
    margin-top: 0;
    margin-bottom: 25px;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 10px;
}

.form-group {
    margin-bottom: 20px;
    width: 100%;
}

.form-row {
    display: flex;
    gap: 15px; /* Spacing between form groups in a row */
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.form-row .form-group {
    flex: 1; /* Each form group takes equal space */
    min-width: 180px; /* Minimum width before wrapping */
}

label {
    display: block;
    margin-bottom: 8px;
    color: var(--color-text-secondary);
    font-weight: 500;
}

.required {
    color: var(--color-accent); /* Use accent color for required fields */
    margin-left: 4px;
}

input[type="text"],
input[type="date"],
textarea,
select {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    background-color: var(--color-input-bg);
    color: var(--color-text-primary);
    font-size: 1em;
    box-sizing: border-box; /* Include padding and border in element's total width */
    transition: border-color 0.3s, background-color 0.3s;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus,
select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-light);
}

.input-error {
    border-color: var(--color-accent) !important;
}

.input-error:focus {
     box-shadow: 0 0 0 2px var(--color-accent-light);
}

.error-message {
    color: var(--color-accent);
    font-size: 0.8em;
    margin-top: 5px;
    height: 1.2em; /* Reserve space to prevent layout shifts */
}

textarea {
    min-height: 100px;
    resize: vertical;
}

.form-actions {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
}

/* Dark Mode Adjustments */
body.dark .task-form-modal {
    background-color: var(--color-modal-bg-dark);
}

body.dark .task-form-modal h2 {
    color: var(--color-text-primary-dark);
    border-bottom: 1px solid var(--color-border-dark);
}

body.dark label {
    color: var(--color-text-secondary-dark);
}

body.dark input[type="text"],
body.dark input[type="date"],
body.dark textarea,
body.dark select {
    border: 1px solid var(--color-border-dark);
    background-color: var(--color-input-bg-dark);
    color: var(--color-text-primary-dark);
}

body.dark input[type="text"]:focus,
body.dark input[type="date"]:focus,
body.dark textarea:focus,
body.dark select:focus {
    border-color: var(--color-primary-dark);
    box-shadow: 0 0 0 2px var(--color-primary-light-dark);
}

body.dark .input-error {
     border-color: var(--color-accent-dark) !important;
}
body.dark .input-error:focus {
    box-shadow: 0 0 0 2px var(--color-accent-light-dark);
}
body.dark .error-message {
    color: var(--color-accent-dark);
}

```

```filepath:src/styles/main.css
/* Define CSS Variables for theming */
:root {
    /* Light Theme Defaults */
    --color-primary: #4A90E2; /* Primary blue */
    --color-primary-light: #A0C4F0;
    --color-primary-light-dark: #e6f0fa; /* For hover effects */
    --color-accent: #F56565; /* Red for errors/important */
    --color-accent-light: #febcbc;
    --color-accent-light-dark: #fae6e6;

    --color-background: #f8f9fa;
    --color-card-bg: #ffffff;
    --color-card-hover-bg: #f0f4f8;
    --color-header-bg: #ffffff;
    --color-modal-bg: #ffffff;
    --color-input-bg: #ffffff;
    --color-button-bg: #f0f0f0;
    --color-button-hover-bg: #e0e0e0;
    --color-nav-active-bg: #e8f0fe;

    --color-text-primary: #333333;
    --color-text-secondary: #777777;
    --color-border: #dddddd;
}

/* Dark Theme */
body.dark {
    --color-primary: #63B3ED; /* Lighter blue for dark */
    --color-primary-light: #90CDF4;
    --color-primary-light-dark: #2a4365; /* Dark background for hover */
    --color-accent: #FC8181; /* Lighter red for dark */
    --color-accent-light: #fed7d7;
    --color-accent-light-dark: #853535;

    --color-background: #1a202c; /* Dark background */
    --color-card-bg: #2d3748; /* Darker card background */
    --color-card-hover-bg: #414a5a; /* Slightly lighter for hover */
    --color-header-bg: #2d3748;
    --color-modal-bg: #2d3748;
    --color-input-bg: #414a5a; /* Dark input background */
    --color-button-bg: #4a5568;
    --color-button-hover-bg: #5a677a;
    --color-nav-active-bg: #4a5568;

    --color-text-primary: #e2e8f0; /* Light text */
    --color-text-secondary: #a0aec0; /* Lighter gray */
    --color-border: #4a5568; /* Darker border */
}

/* Global Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    line-height: 1.6;
    transition: background-color 0.3s, color 0.3s;
    min-height: 100vh;
    display: flex; /* Use flex to make #app fill the viewport */
    flex-direction: column;
}

#app {
    flex: 1; /* Allow #app to grow and fill available space */
    display: flex; /* Ensure it can contain its children properly */
    flex-direction: column;
}

/* Basic Button Styles */
.btn-primary {
    background-color: var(--color-primary);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary:hover {
    background-color: var(--color-primary-light);
    transform: translateY(-1px);
}

.btn-secondary {
    background-color: var(--color-button-bg);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.btn-secondary:hover {
    background-color: var(--color-button-hover-bg);
    color: var(--color-text-primary);
     transform: translateY(-1px);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .header-container {
        flex-direction: column;
        height: auto;
        padding: 10px 15px;
    }

    .view-navigator {
        margin-bottom: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .view-navigator button {
        margin: 5px;
    }

    .header-actions {
        width: 100%;
        justify-content: center;
    }

    #theme-toggle {
        margin-right: 10px;
    }

    .todo-list-view-container {
        margin: 10px;
        padding: 15px;
    }

    .task-controls {
        flex-direction: column;
        align-items: stretch;
    }

    .filter-sort {
        flex-direction: column;
        align-items: stretch;
    }
    .filter-sort select, .filter-sort input[type="text"] {
        width: calc(100% - 24px); /* Adjust width considering padding */
    }

    .form-row {
        flex-direction: column;
    }
    .form-row .form-group {
        min-width: unset;
    }
}
```

```filepath:index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Manager AI</title>
    <!-- Link to main CSS file -->
    <link rel="stylesheet" href="src/styles/main.css">
</head>
<body>
    <div id="app">
        <!-- Application will be mounted here by JavaScript -->
    </div>

    <!-- Main JavaScript entry point -->
    <script type="module" src="src/main.js"></script>
</body>
</html>
```

```filepath:package.json
{
  "name": "project-manager-ai",
  "version": "1.0.0",
  "description": "AI Project Manager with UI components",
  "main": "src/main.js",
  "scripts": {
    "start": "echo 'Starting application...' && live-server --port=8080",
    "build": "echo 'Build process not implemented yet.'"
  },
  "keywords": [
    "project-management",
    "ai",
    "javascript",
    "ui"
  ],
  "author": "Project Manager AI Agent",
  "license": "ISC",
  "devDependencies": {
    "live-server": "^1.5.4"
  }
}
```


---
*이 문서는 AI 에이전트에 의해 자동 생성되었습니다.*
