# Feature Specification: IndexedDB Schema & DBService

## 1. Overview
This document specifies the design and implementation of the client-side database using IndexedDB for the AI DevTeam Todo application. The purpose is to provide a persistent, reliable, and performant storage layer that operates independently of a backend server when necessary.

## 2. Database Schema Design

### 2.1. Database Name: `AI_DevTeam_Todo`
### 2.2. Version: `1`

### 2.3. Object Stores

#### Store: `tasks`
- **Primary Key**: `id` (String/UUID)
- **Fields**:
    - `id` (String)
    - `title` (String)
    - `description` (String)
    - `status` (String)
    - `priority` (String)
    - `dueDate` (Date/String)
    - `startDate` (Date/String)
    - `endDate` (Date/String)
    - `boardColumnId` (String)
    - `parentId` (String, nullable)
    - `createdAt` (ISO String)
    - `updatedAt` (ISO String)
    - `isCompleted` (Boolean)
- **Indexes**:
    - `status`: For filtering tasks by state (e.g., 'todo', 'in-progress').
    - `dueDate`: For sorting and filtering by deadline.
    - `priority`: For sorting tasks by urgency.
    - `boardColumnId`: For retrieving tasks belonging to a specific board column.
    - `parentId`: For retrieving sub-tasks of a specific parent task.

#### Store: `boardColumns`
- **Primary Key**: `id` (String/UUID)
- **Fields**:
    - `id` (String)
    - `name` (String)
    - `order` (Number)
- **Indexes**:
    - `order`: For maintaining the display order of columns.

#### Store: `settings`
- **Primary Key**: `key` (String)
- **Fields**:
    - `key` (String)
    - `value` (Any)

## 3. DBService API
The `DBService` module provides a Promise-based wrapper around IndexedDB operations.

| Method | Description |
| :--- | :--- |
| `open()` | Initializes the database and handles migrations. |
| `get(storeName, id)` | Retrieves a single record by its primary key. |
| `getAll(storeName, indexName, query)` | Retrieves all records, optionally filtered by an index. |
| `put(storeName, data)` | Adds or updates a record. |
| `delete(storeName, id)` | Removes a record by its primary key. |

## 4. Acceptance Criteria
- [x] Database `AI_DevTeam_Todo` is created in the browser.
- [x] Object stores `tasks`, `boardColumns`, and `settings` are present.
- [x] All specified indexes are created and functional.
- [x] CRUD operations are handled asynchronously via Promises.
- [x] Database versioning is managed via `onupgradeneeded`.