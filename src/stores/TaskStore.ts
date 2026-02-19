import { create } from 'zustand';
import { ITask } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TaskState {
  tasks: ITask[];
  selectedTask: ITask | null;
  addTask: (
    title: string,
    description: string,
    priority: string,
    dueDate: string,
    boardColumnId: string
  ) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<ITask>) => void;
  moveTaskToColumn: (taskId: string, targetColumnId: string) => void;
  setSelectedTask: (task: ITask | null) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [
    {
      id: uuidv4(),
      title: 'Implement Kanban Board UI',
      description: 'Create KanbanBoardView, KanbanColumn, and KanbanCard components.',
      priority: 'high',
      dueDate: '2024-03-15',
      boardColumnId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', // Example ID for 'To Do'
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      title: 'Design Drag and Drop Logic',
      description: 'Implement drag and drop functionality for tasks between columns.',
      priority: 'medium',
      dueDate: '2024-03-18',
      boardColumnId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', // Example ID for 'To Do'
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  selectedTask: null,
  addTask: (title, description, priority, dueDate, boardColumnId) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: uuidv4(),
          title,
          description,
          priority,
          dueDate,
          boardColumnId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask, updatedAt: new Date() } : task
      ),
    })),
  moveTaskToColumn: (taskId, targetColumnId) =>
    set((state) => {
      const taskToMove = state.tasks.find((task) => task.id === taskId);
      if (!taskToMove) return { tasks: state.tasks };

      return {
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? { ...task, boardColumnId: targetColumnId, updatedAt: new Date() }
            : task
        ),
      };
    }),
  setSelectedTask: (task) => set({ selectedTask: task }),
}));

// Helper to get initial column IDs (replace with actual logic if columns are dynamic)
const initialTodoColumnId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
const initialInProgressColumnId = 'b2c3d4e5-f6a7-8901-2345-678901bcdef0';
const initialDoneColumnId = 'c3d4e5f6-a7b8-9012-3456-789012cdef01';

// Initialize tasks with placeholder column IDs
useTaskStore.setState((state) => ({
  tasks: state.tasks.map(task => {
    if (task.title === 'Implement Kanban Board UI' || task.title === 'Design Drag and Drop Logic') {
      return { ...task, boardColumnId: initialTodoColumnId };
    }
    return task;
  }),
}));

// Add example tasks for other columns if needed
// Example for 'In Progress'
useTaskStore.getState().addTask('Refactor User Service', 'Improve performance and add logging.', 'medium', '2024-03-20', initialInProgressColumnId);
// Example for 'Done'
useTaskStore.getState().addTask('Set up Database Schema', 'Initial migration and schema definition.', 'low', '2024-03-10', initialDoneColumnId);