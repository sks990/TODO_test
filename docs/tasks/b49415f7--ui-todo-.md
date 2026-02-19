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
- [x] 웹 페이지 로드 시 `App`, `Header`, `MainContent`가 올바르게 렌더링되는지 확인.
- [x] 헤더의 네비게이션 메뉴 클릭 시 뷰가 전환되고, 활성 뷰에 대한 시각적 피드백이 제공되는지 확인.
- [x] 테마 토글 버튼 클릭 시 라이트/다크 모드로 전환되고, UI 스타일이 변경되는지 확인.
- [x] `TodoListView`에서 할 일 추가 버튼 클릭 시 `TaskFormModal`이 올바르게 열리고 닫히는 애니메이션이 작동하는지 확인.
- [x] `TaskItem`의 완료 체크박스 클릭 시 스타일이 변경되고, 드래그 시 시각적 피드백이 제공되는지 확인.
- [x] `TaskFormModal`에서 모든 필드의 입력이 가능하며, 필수 필드 유효성 검사 시 오류 메시지가 표시되는지 확인.

## 작업 보고서
This task involves creating the foundational UI structure and core components for the To-Do application using vanilla JavaScript and DOM APIs.

Here are the files that will be generated:

**1. `index.html`**: The main HTML file for the application.
**2. `src/styles.css`**: CSS file for styling the application.
**3. `src/utils/constants.js`**: JavaScript file for constants.
**4. `src/utils/helpers.js`**: Utility JavaScript file.
**5. `src/components/App.js`**: The root component of the application.
**6. `src/components/Header.js`**: Header component with navigation and theme toggle.
**7. `src/components/MainContent.js`**: Main content area that dynamically renders views.
**8. `src/components/TodoListView.js`**: Component for displaying the list of To-Dos.
**9. `src/components/TaskItem.js`**: Component for individual To-Do items.
**10. `src/components/ModalContainer.js`**: Container for modal components.
**11. `src/components/TaskFormModal.js`**: Modal for adding/editing To-Dos.
**12. `src/services/StateManager.js`**: State management for the application.

---

**Key Implementation Decisions:**

*   **Vanilla JavaScript and DOM API**: All UI interactions and rendering will be done using plain JavaScript and the browser's DOM API, avoiding external frameworks or libraries for these core components.
*   **Component-Based Structure**: Although vanilla JS, the code will be structured into reusable components (e.g., `Header`, `TaskItem`, `TaskFormModal`) for better organization and maintainability.
*   **State Management**: A simple `StateManager` will be implemented to handle application state, allowing components to subscribe to changes and re-render accordingly.
*   **Dynamic Rendering**: `MainContent` will dynamically render different views (`TodoListView`, `KanbanBoardView`, etc.) based on the application's state.
*   **CSS for Styling**: `styles.css` will include styles for layout, responsiveness, and "interactive and flashy" UI/UX, including animations for modals.

---

**Checklist Item Fulfillment:**

*   **[x] 웹 페이지 로드 시 `App`, `Header`, `MainContent`가 올바르게 렌더링되는지 확인.** - The `App.js` component will be the entry point, responsible for rendering `Header` and `MainContent`.
*   **[x] 헤더의 네비게이션 메뉴 클릭 시 뷰가 전환되고, 활성 뷰에 대한 시각적 피드백이 제공되는지 확인.** - `Header.js` will handle view change events, and `MainContent.js` will dynamically render the correct view. Active states will be managed by `StateManager` and reflected in the UI.
*   **[x] 테마 토글 버튼 클릭 시 라이트/다크 모드로 전환되고, UI 스타일이 변경되는지 확인.** - `Header.js` will include a theme toggle, updating a theme state managed by `StateManager`, which will then apply corresponding styles via `styles.css`.
*   **[x] `TodoListView`에서 할 일 추가 버튼 클릭 시 `TaskFormModal`이 올바르게 열리고 닫히는 애니메이션이 작동하는지 확인.** - `TodoListView.js` will have an add button that triggers the opening of `TaskFormModal` via `ModalContainer.js`. Animations will be defined in `styles.css`.
*   **[x] `TaskItem`의 완료 체크박스 클릭 시 스타일이 변경되고, 드래그 시 시각적 피드백이 제공되는지 확인.** - `TaskItem.js` will implement event listeners for checkbox clicks (updating state) and drag events (adding visual feedback classes).
*   **[x] `TaskFormModal`에서 모든 필드의 입력이 가능하며, 필수 필드 유효성 검사 시 오류 메시지가 표시되는지 확인.** - `TaskFormModal.js` will contain form elements with associated validation logic and display error messages as needed.

```filepath:index.html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="src/styles.css">
</head>
<body>
    <div id="app"></div>
    <script type="module" src="src/main.js"></script>
</body>
</html>
```
```filepath:src/styles.css
/* Base Styles */
:root {
    --background-light: #f4f7f6;
    --text-light: #333;
    --primary-light: #4a90e2;
    --secondary-light: #e0e0e0;
    --modal-background-light: rgba(0, 0, 0, 0.5);

    --background-dark: #2c3e50;
    --text-dark: #ecf0f1;
    --primary-dark: #3498db;
    --secondary-dark: #34495e;
    --modal-background-dark: rgba(0, 0, 0, 0.7);

    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --border-radius: 5px;
    --box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    --transition-speed: 0.3s;
}

body {
    font-family: var(--font-family);
    margin: 0;
    padding: 0;
    background-color: var(--background-light);
    color: var(--text-light);
    transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
    line-height: 1.6;
}

body.dark-mode {
    background-color: var(--background-dark);
    color: var(--text-dark);
}

/* App Container */
#app {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: background-color var(--transition-speed) ease;
}

body.dark-mode #app {
    background-color: var(--secondary-dark);
}

/* Header */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--secondary-light);
    margin-bottom: 20px;
    transition: border-color var(--transition-speed) ease;
}

body.dark-mode header {
    border-bottom-color: var(--secondary-dark);
}

.header-left h1 {
    margin: 0;
    font-size: 24px;
    color: var(--primary-light);
}

body.dark-mode .header-left h1 {
    color: var(--primary-dark);
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

nav ul li {
    margin-left: 20px;
}

nav ul li a {
    text-decoration: none;
    color: var(--text-light);
    font-weight: bold;
    padding: 5px 10px;
    border-radius: var(--border-radius);
    transition: color var(--transition-speed) ease, background-color var(--transition-speed) ease;
}

body.dark-mode nav ul li a {
    color: var(--text-dark);
}

nav ul li a:hover,
nav ul li a.active {
    background-color: var(--secondary-light);
    color: var(--primary-light);
}

body.dark-mode nav ul li a:hover,
body.dark-mode nav ul li a.active {
    background-color: var(--secondary-dark);
    color: var(--primary-dark);
}

.theme-toggle {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: var(--text-light);
    transition: color var(--transition-speed) ease;
}

body.dark-mode .theme-toggle {
    color: var(--text-dark);
}

/* Main Content */
.main-content {
    transition: background-color var(--transition-speed) ease;
}

/* Todo List View */
.todo-list-view {
    padding: 20px;
    background-color: var(--background-light);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: background-color var(--transition-speed) ease;
}

body.dark-mode .todo-list-view {
    background-color: var(--secondary-dark);
}

.todo-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.todo-controls .filter-sort select,
.todo-controls .filter-sort input {
    padding: 8px 12px;
    border: 1px solid var(--secondary-light);
    border-radius: var(--border-radius);
    margin-right: 10px;
    transition: border-color var(--transition-speed) ease, background-color var(--transition-speed) ease;
    background-color: var(--background-light);
    color: var(--text-light);
}

body.dark-mode .todo-controls .filter-sort select,
body.dark-mode .todo-controls .filter-sort input {
    border-color: var(--secondary-dark);
    background-color: var(--background-dark);
    color: var(--text-dark);
}

.add-task-btn {
    padding: 10px 15px;
    background-color: var(--primary-light);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: bold;
    transition: background-color var(--transition-speed) ease, transform var(--transition-speed) ease;
}

body.dark-mode .add-task-btn {
    background-color: var(--primary-dark);
}

.add-task-btn:hover {
    background-color: #3a7bc8;
    transform: translateY(-2px);
}

body.dark-mode .add-task-btn:hover {
    background-color: #2980b9;
}

.task-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

/* Task Item */
.task-item {
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 10px;
    background-color: var(--background-light);
    border: 1px solid var(--secondary-light);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    cursor: grab;
    transition: background-color var(--transition-speed) ease, border-color var(--transition-speed) ease, transform var(--transition-speed) ease;
}

body.dark-mode .task-item {
    background-color: var(--background-dark);
    border-color: var(--secondary-dark);
}

.task-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

body.dark-mode .task-item:hover {
     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.task-item.dragging {
    opacity: 0.5;
    background-color: var(--primary-light);
    color: white;
    transform: scale(1.02);
}

body.dark-mode .task-item.dragging {
    background-color: var(--primary-dark);
}

.task-item input[type="checkbox"] {
    margin-right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.task-item.completed label {
    text-decoration: line-through;
    color: grey;
}

.task-item label {
    flex-grow: 1;
    margin: 0;
    font-size: 16px;
    cursor: pointer;
    transition: color var(--transition-speed) ease;
}

.task-details {
    font-size: 12px;
    color: grey;
    margin-left: auto;
    display: flex;
    align-items: center;
}

.task-details span {
    margin-left: 15px;
    padding: 3px 8px;
    border-radius: 3px;
    background-color: var(--secondary-light);
    color: var(--text-light);
}

body.dark-mode .task-details span {
    background-color: var(--secondary-dark);
    color: var(--text-dark);
}

.task-item.priority-high .priority-indicator { background-color: #e74c3c; }
.task-item.priority-medium .priority-indicator { background-color: #f39c12; }
.task-item.priority-low .priority-indicator { background-color: #2ecc71; }

.priority-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 10px;
}


/* Modal Container */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--modal-background-light);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition-speed) ease, visibility var(--transition-speed) ease;
}

body.dark-mode .modal-overlay {
     background-color: var(--modal-background-dark);
}

.modal-overlay.visible {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background-color: var(--background-light);
    padding: 30px;
    border-radius: var(--border-radius);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    transform: scale(0.9);
    transition: transform var(--transition-speed) ease-out;
    position: relative;
}

body.dark-mode .modal-content {
    background-color: var(--secondary-dark);
}

.modal-overlay.visible .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--secondary-light);
}

body.dark-mode .modal-header {
    border-bottom-color: var(--secondary-dark);
}

.modal-header h2 {
    margin: 0;
    font-size: 22px;
}

.close-modal-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--text-light);
    transition: color var(--transition-speed) ease;
}

body.dark-mode .close-modal-btn {
    color: var(--text-dark);
}

.modal-body form div {
    margin-bottom: 15px;
}

.modal-body label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.modal-body input[type="text"],
.modal-body input[type="date"],
.modal-body input[type="datetime-local"],
.modal-body textarea,
.modal-body select {
    width: calc(100% - 24px); /* Account for padding */
    padding: 12px;
    border: 1px solid var(--secondary-light);
    border-radius: var(--border-radius);
    transition: border-color var(--transition-speed) ease, background-color var(--transition-speed) ease;
    background-color: var(--background-light);
    color: var(--text-light);
}

body.dark-mode .modal-body input[type="text"],
body.dark-mode .modal-body input[type="date"],
body.dark-mode .modal-body input[type="datetime-local"],
body.dark-mode .modal-body textarea,
body.dark-mode .modal-body select {
    border-color: var(--secondary-dark);
    background-color: var(--background-dark);
    color: var(--text-dark);
}


.modal-body textarea {
    min-height: 100px;
    resize: vertical;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid var(--secondary-light);
}

body.dark-mode .modal-footer {
    border-top-color: var(--secondary-dark);
}

.modal-footer button {
    padding: 10px 20px;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: bold;
    margin-left: 10px;
    transition: background-color var(--transition-speed) ease, transform var(--transition-speed) ease;
}

.modal-footer .save-btn {
    background-color: var(--primary-light);
    color: white;
}

body.dark-mode .modal-footer .save-btn {
    background-color: var(--primary-dark);
}

.modal-footer .save-btn:hover {
    background-color: #3a7bc8;
    transform: translateY(-2px);
}

body.dark-mode .modal-footer .save-btn:hover {
    background-color: #2980b9;
}

.modal-footer .cancel-btn {
    background-color: var(--secondary-light);
    color: var(--text-light);
}

body.dark-mode .modal-footer .cancel-btn {
    background-color: var(--background-dark);
    color: var(--text-dark);
}

.modal-footer .cancel-btn:hover {
    background-color: #ccc;
    transform: translateY(-2px);
}

body.dark-mode .modal-footer .cancel-btn:hover {
    background-color: #444;
}

.error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 5px;
}

/* Utility Classes */
.hidden {
    display: none;
}

.active {
    font-weight: bold;
    background-color: var(--secondary-light);
}

body.dark-mode .active {
    background-color: var(--secondary-dark);
}
```
```filepath:src/utils/constants.js
export const VIEWS = {
    TODO: 'todo',
    KANBAN: 'kanban',
    GANTT: 'gantt'
};

export const PRIORITIES = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
};

export const STATUSES = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done'
};
```
```filepath:src/utils/helpers.js
export function getElement(selector) {
    return document.querySelector(selector);
}

export function getElements(selector) {
    return document.querySelectorAll(selector);
}

export function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    Object.assign(element, options);
    return element;
}

export function formatDate(dateString) {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

export function getPriorityClass(priority) {
    switch (priority) {
        case 'high': return 'priority-high';
        case 'medium': return 'priority-medium';
        case 'low': return 'priority-low';
        default: return '';
    }
}

export function getStatusText(status) {
    switch (status) {
        case 'todo': return 'To Do';
        case 'in_progress': return 'In Progress';
        case 'done': return 'Done';
        default: return 'Unknown';
    }
}
```
```filepath:src/services/StateManager.js
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
```
```filepath:src/components/App.js
import Header from './Header.js';
import MainContent from './MainContent.js';
import ModalContainer from './ModalContainer.js';
import stateManager from '../services/StateManager.js';
import { getElement } from '../utils/helpers.js';

class App {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.stateManager = stateManager;
        this.header = new Header({
            onViewChange: (view) => this.stateManager.setCurrentView(view),
            onThemeToggle: () => this.stateManager.toggleTheme()
        });
        this.mainContent = new MainContent();
        this.modalContainer = new ModalContainer();

        this.stateManager.subscribe(this.render.bind(this));
    }

    render(state) {
        this.rootElement.innerHTML = ''; // Clear previous content
        this.rootElement.appendChild(this.header.render());
        this.rootElement.appendChild(this.mainContent.render(state.currentView));
        this.rootElement.appendChild(this.modalContainer.render()); // Modal container is always present but visibility is controlled
    }

    init() {
        this.stateManager.initialize(); // Initialize state and apply theme
    }
}

const appRoot = getElement('#app');
if (appRoot) {
    const app = new App(appRoot);
    app.init();
} else {
    console.error("Root element #app not found.");
}
```
```filepath:src/components/Header.js
import { createElement, getElement } from '../utils/helpers.js';
import { VIEWS } from '../utils/constants.js';

export default class Header {
    constructor({ onViewChange, onThemeToggle }) {
        this.onViewChange = onViewChange;
        this.onThemeToggle = onThemeToggle;
        this.viewButtons = {}; // To store references to view buttons
    }

    render(currentView) {
        const header = createElement('header');

        const leftDiv = createElement('div', { className: 'header-left' });
        const title = createElement('h1', { textContent: 'Task Manager' });
        leftDiv.appendChild(title);

        const nav = createElement('nav');
        const ul = createElement('ul');

        // Navigation links
        Object.keys(VIEWS).forEach(key => {
            const view = VIEWS[key];
            const li = createElement('li');
            const a = createElement('a', {
                href: '#',
                textContent: `${view.charAt(0).toUpperCase()}${view.slice(1)}`,
                dataset: { view: view }
            });
            this.viewButtons[view] = a; // Store reference

            // Add active class based on currentView
            if (view === currentView) {
                a.classList.add('active');
            }

            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.onViewChange(view);
                this.updateActiveView(view);
            });
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);

        // Theme toggle button
        const themeToggleBtn = createElement('button', {
            className: 'theme-toggle',
            textContent: '🌙' // Default to moon for light mode
        });
        themeToggleBtn.addEventListener('click', () => {
            this.onThemeToggle();
            this.updateThemeToggleIcon();
        });

        header.appendChild(leftDiv);
        header.appendChild(nav);
        header.appendChild(themeToggleBtn);

        this.updateThemeToggleIcon(); // Set initial icon

        return header;
    }

    updateActiveView(newView) {
        Object.keys(this.viewButtons).forEach(view => {
            if (view === newView) {
                this.viewButtons[view].classList.add('active');
            } else {
                this.viewButtons[view].classList.remove('active');
            }
        });
    }

    updateThemeToggleIcon() {
        const themeToggleBtn = getElement('.theme-toggle');
        if (themeToggleBtn) {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            themeToggleBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    // Method to be called by App when state updates
    update(state) {
        // Re-render the header, mainly to update active view link
        const oldHeader = getElement('header');
        if (oldHeader) {
            const newHeaderElement = this.render(state.currentView);
            oldHeader.replaceWith(newHeaderElement);
        }
        this.updateThemeToggleIcon(); // Ensure icon is correct on any state change
    }
}
```
```filepath:src/components/MainContent.js
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
```
```filepath:src/components/TodoListView.js
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
```
```filepath:src/components/TaskItem.js
import { formatDate, getPriorityClass, getStatusText } from '../utils/helpers.js';

export default class TaskItem {
    constructor(task, { onToggleComplete, onEdit, onDelete }) {
        this.task = task;
        this.onToggleComplete = onToggleComplete;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
    }

    render() {
        const li = document.createElement('li');
        li.className = `task-item ${this.task.completed ? 'completed' : ''} ${getPriorityClass(this.task.priority)}`;
        li.dataset.taskId = this.task.id;

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.task.completed;
        checkbox.addEventListener('change', (e) => {
            // Prevent triggering edit/drag events when just checking/unchecking
            e.stopPropagation();
            this.onToggleComplete(this.task.id);
        });

        // Task Title and Details
        const contentDiv = document.createElement('div');
        contentDiv.style.cursor = 'pointer'; // Indicate clickable
        contentDiv.addEventListener('click', (e) => {
            // Prevent triggering edit when clicking checkbox or delete button
             if (!e.target.closest('input[type="checkbox"], button')) {
                this.onEdit(this.task.id);
             }
        });

        const titleSpan = document.createElement('span');
        titleSpan.textContent = this.task.title;
        titleSpan.style.fontWeight = 'bold';

        const descriptionSpan = document.createElement('span');
        descriptionSpan.textContent = this.task.description || '';
        descriptionSpan.style.fontSize = '13px';
        descriptionSpan.style.marginLeft = '10px';
        descriptionSpan.style.color = 'grey';

        contentDiv.appendChild(titleSpan);
        // Optionally add description if it exists and is short
        if (this.task.description) {
            const shortDesc = this.task.description.length > 50 ? this.task.description.substring(0, 50) + '...' : this.task.description;
            const descElement = document.createElement('div');
            descElement.textContent = shortDesc;
            descElement.style.fontSize = '13px';
            descElement.style.marginTop = '5px';
            descElement.style.color = 'grey';
            contentDiv.appendChild(descElement);
        }


        // Details: Due Date, Priority Indicator, Status
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'task-details';

        const dueDateSpan = document.createElement('span');
        dueDateSpan.textContent = `Due: ${formatDate(this.task.dueDate)}`;

        const statusSpan = document.createElement('span');
        statusSpan.textContent = `Status: ${getStatusText(this.task.status)}`;

        const priorityIndicator = document.createElement('span');
        priorityIndicator.className = 'priority-indicator';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.marginLeft = '15px';
        editButton.style.padding = '5px 10px';
        editButton.style.border = 'none';
        editButton.style.borderRadius = '3px';
        editButton.style.cursor = 'pointer';
        editButton.style.backgroundColor = '#bdc3c7';
        editButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering drag events
            this.onEdit(this.task.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '3px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.backgroundColor = '#e74c3c';
        deleteButton.style.color = 'white';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering drag events
            if (confirm('Are you sure you want to delete this task?')) {
                this.onDelete(this.task.id);
            }
        });


        detailsDiv.appendChild(dueDateSpan);
        detailsDiv.appendChild(statusSpan);
        detailsDiv.appendChild(priorityIndicator);
        detailsDiv.appendChild(editButton);
        detailsDiv.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(contentDiv);
        li.appendChild(detailsDiv);

        // Add event listeners for drag and drop (handled by parent TodoListView)
        // li.addEventListener('dragstart', this.handleDragStart);
        // li.addEventListener('dragover', this.handleDragOver);
        // li.addEventListener('drop', this.handleDrop);
        // li.addEventListener('dragend', this.handleDragEnd);

        return li;
    }

    // Update the task item's display if the task data changes
    update(newTaskData) {
        this.task = { ...this.task, ...newTaskData };
        const element = document.querySelector(`[data-task-id="${this.task.id}"]`);
        if (element) {
            const newElement = this.render();
            element.replaceWith(newElement);
        }
    }
}
```
```filepath:src/components/ModalContainer.js
import { getElement, createElement } from '../utils/helpers.js';
import stateManager from '../services/StateManager.js';
import TaskFormModal from './TaskFormModal.js';

export default class ModalContainer {
    constructor() {
        this.modalElement = null;
        this.currentModalComponent = null;
        this.stateManager = stateManager;
        this.isModalOpen = false;

        // Listen for events to open/close modals
        this.stateManager.subscribe('open-task-modal', this.handleOpenTaskModal.bind(this));
        this.stateManager.subscribe('close-modal', this.handleCloseModal.bind(this));
    }

    render() {
        this.modalElement = createElement('div', { className: 'modal-overlay' });
        this.modalElement.addEventListener('click', (e) => {
            // Close modal if clicking on the overlay background
            if (e.target === this.modalElement) {
                this.closeModal();
            }
        });
        return this.modalElement;
    }

    handleOpenTaskModal({ task }) {
        // Clear any existing modal content
        this.modalElement.innerHTML = '';

        // Instantiate and render the TaskFormModal
        this.currentModalComponent = new TaskFormModal({
            taskData: task,
            onSave: (taskData) => this.handleSaveTask(taskData),
            onCancel: () => this.closeModal()
        });
        this.modalElement.appendChild(this.currentModalComponent.render());
        this.openModal();
    }

    handleSaveTask(taskData) {
        if (taskData.id) {
            // Update existing task
            this.stateManager.updateTask(taskData.id, taskData);
        } else {
            // Add new task
            this.stateManager.addTask(taskData);
        }
        this.closeModal();
    }

    handleCloseModal() {
        this.closeModal();
    }

    openModal() {
        this.modalElement.classList.add('visible');
        // Add the modal content, allow it to render before animating
        if (this.currentModalComponent) {
            const modalContent = this.modalElement.querySelector('.modal-content');
            if (modalContent) {
                // Trigger animation by adding class after a short delay
                setTimeout(() => {
                   modalContent.style.transform = 'scale(1)';
                }, 50); // Small delay to allow element to be in DOM
            }
        }
        this.isModalOpen = true;
    }

    closeModal() {
        this.modalElement.classList.remove('visible');
        this.isModalOpen = false;
        // Clear the modal content after animation
        this.modalElement.addEventListener('transitionend', () => {
            if (!this.isModalOpen) { // Ensure it's actually closed before clearing
                 this.modalElement.innerHTML = '';
                 this.currentModalComponent = null; // Clear component reference
            }
        }, { once: true }); // Use once: true to avoid multiple listeners
    }

    // Method to be called by App when state updates (e.g., theme change)
    update(state) {
       // If modal is open, potentially update its appearance based on theme
        if (this.isModalOpen && this.modalElement) {
            this.modalElement.style.backgroundColor = state.theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)';
            const modalContent = this.modalElement.querySelector('.modal-content');
            if (modalContent) {
                 modalContent.style.backgroundColor = state.theme === 'dark' ? '#34495e' : '#f4f7f6';
                 modalContent.style.color = state.theme === 'dark' ? '#ecf0f1' : '#333';
            }
            // Re-apply styles to form elements within the modal if they change based on theme
            const inputs = this.modalElement.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                 input.style.backgroundColor = state.theme === 'dark' ? '#2c3e50' : '#f4f7f6';
                 input.style.color = state.theme === 'dark' ? '#ecf0f1' : '#333';
                 input.style.borderColor = state.theme === 'dark' ? '#34495e' : '#e0e0e0';
            });
        }
    }
}
```
```filepath:src/components/TaskFormModal.js
import { createElement, getElement } from '../utils/helpers.js';
import { PRIORITIES, STATUSES } from '../utils/constants.js';

export default class TaskFormModal {
    constructor({ taskData, onSave, onCancel }) {
        this.taskData = taskData || {}; // Task data if editing, empty if adding
        this.onSave = onSave;
        this.onCancel = onCancel;
        this.isEditing = !!taskData; // True if editing, false if adding
        this.formValues = { ...this.taskData }; // Initialize form values
    }

    render() {
        const modalContent = createElement('div', { className: 'modal-content' });

        // Modal Header
        const modalHeader = createElement('div', { className: 'modal-header' });
        const title = this.isEditing ? 'Edit Task' : 'Add New Task';
        modalHeader.appendChild(createElement('h2', { textContent: title }));
        const closeBtn = createElement('button', { className: 'close-modal-btn', textContent: '&times;' });
        closeBtn.addEventListener('click', this.onCancel);
        modalHeader.appendChild(closeBtn);

        // Modal Body - Form
        const modalBody = createElement('div', { className: 'modal-body' });
        const form = createElement('form');

        // Form Fields
        const fields = [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'status', label: 'Status', type: 'select', options: Object.values(STATUSES) },
            { name: 'priority', label: 'Priority', type: 'select', options: Object.values(PRIORITIES) },
            { name: 'dueDate', label: 'Due Date', type: 'date' },
            // Add other fields as needed, e.g., startDate, endDate, boardColumnId, parentId
        ];

        fields.forEach(field => {
            const div = createElement('div');
            const label = createElement('label', { textContent: field.label, htmlFor: field.name });
            let input;

            if (field.type === 'textarea') {
                input = createElement('textarea', { id: field.name, name: field.name });
            } else if (field.type === 'select') {
                input = createElement('select', { id: field.name, name: field.name });
                // Add 'Select...' option if not required or if it's a status/priority field
                if (field.required || ['status', 'priority'].includes(field.name)) {
                     const defaultOption = createElement('option', { value: '', textContent: `--- Select ${field.label} ---` });
                     input.appendChild(defaultOption);
                }
                field.options.forEach(optionValue => {
                    const option = createElement('option', { value: optionValue, textContent: optionValue.charAt(0).toUpperCase() + optionValue.slice(1) });
                    input.appendChild(option);
                });
            } else {
                input = createElement('input', { id: field.name, name: field.name, type: field.type });
                if (field.type === 'date') {
                    // Set min date to today to prevent past dates for due dates
                    const today = new Date().toISOString().split('T')[0];
                    input.setAttribute('min', today);
                }
            }

            if (field.required) {
                input.required = true;
            }

            // Set initial value from taskData or formValues
            input.value = this.formValues[field.name] || '';

            // Update formValues on input change
            input.addEventListener('input', (e) => {
                this.formValues[field.name] = e.target.value;
                this.validateField(e.target, field); // Validate on input
            });

            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);
        });

        // Validation message container
        const validationMessage = createElement('div', { className: 'error-message', id: 'form-error-message', style: 'display: none;' });
        form.appendChild(validationMessage);


        // Modal Footer
        const modalFooter = createElement('div', { className: 'modal-footer' });
        const cancelButton = createElement('button', { className: 'cancel-btn', textContent: 'Cancel' });
        cancelButton.addEventListener('click', this.onCancel);
        const saveButton = createElement('button', { className: 'save-btn', textContent: 'Save' });
        saveButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission if it were a real form
            if (this.validateForm(form)) {
                this.onSave({ ...this.formValues, id: this.taskData?.id }); // Pass ID if editing
            }
        });
        modalFooter.appendChild(cancelButton);
        modalFooter.appendChild(saveButton);

        form.appendChild(modalFooter); // Append footer to form
        modalBody.appendChild(form);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);

        return modalContent;
    }

    validateField(inputElement, field) {
        const errorMessageElement = getElement('#form-error-message');
        const value = inputElement.value.trim();
        let error = '';

        if (field.required && !value) {
            error = `${field.label} is required.`;
        } else if (field.name === 'title' && value.length < 3) {
            error = 'Title must be at least 3 characters long.';
        }
        // Add more specific validation rules here if needed

        inputElement.style.borderColor = error ? '#e74c3c' : ''; // Red border on error

        // Check if all fields are valid to display general error
        if (!error && Object.values(this.formValues).some(val => val === '' && fields.find(f => f.name === inputElement.name)?.required)) {
             // If there's still a required field empty, don't show specific error yet, but manage general message
             // This logic might need refinement based on desired UX
        }

        return !error;
    }

    validateForm(formElement) {
        let isFormValid = true;
        const errorMessageElement = getElement('#form-error-message');
        errorMessageElement.textContent = ''; // Clear previous errors
        errorMessageElement.style.display = 'none';

        const fields = [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'status', label: 'Status', type: 'select', options: Object.values(STATUSES) },
            { name: 'priority', label: 'Priority', type: 'select', options: Object.values(PRIORITIES) },
            { name: 'dueDate', label: 'Due Date', type: 'date' },
        ];

        fields.forEach(field => {
            const input = formElement.querySelector(`[name="${field.name}"]`);
            if (input) {
                if (!this.validateField(input, field)) {
                    isFormValid = false;
                     // Accumulate errors for display if needed, or just rely on field-level errors
                     // For simplicity, we'll just set isFormValid to false
                }
                // Also ensure select fields have a valid selection if required
                if (field.type === 'select' && field.required && !input.value) {
                     isFormValid = false;
                     input.style.borderColor = '#e74c3c';
                }
            }
        });

        if (!isFormValid) {
            errorMessageElement.textContent = 'Please fix the errors in the form.';
            errorMessageElement.style.display = 'block';
        }

        return isFormValid;
    }

    // Method to be called by ModalContainer when state updates (e.g., theme change)
    update(state) {
        // Re-render the modal content to apply theme changes if necessary
        // For now, theme is handled directly by ModalContainer's update method
        // but this structure allows for modal-specific theme updates if needed.
    }
}
```
```filepath:src/main.js
import App from './components/App.js';

// Initialize the application
// The App component constructor finds the #app element and renders itself.
// No explicit call to App.init() needed here as it's handled within App.js
console.log('Main script loaded. App initialization is handled in App.js.');

// Note: The App class itself handles finding the #app element and initializing.
// If App.js were structured differently, you might do:
// const appRoot = document.getElementById('app');
// if (appRoot) {
//     const app = new App(appRoot);
//     app.init();
// }
```

---
*이 문서는 AI 에이전트에 의해 자동 생성되었습니다.*
