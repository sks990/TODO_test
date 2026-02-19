import { create } from 'zustand';
import { IKanbanColumn } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface BoardState {
  boardColumns: IKanbanColumn[];
  addColumn: (name: string) => void;
  removeColumn: (id: string) => void;
  updateColumn: (id: string, name: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  boardColumns: [
    { id: uuidv4(), name: 'To Do', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), name: 'In Progress', createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), name: 'Done', createdAt: new Date(), updatedAt: new Date() },
  ],
  addColumn: (name) =>
    set((state) => ({
      boardColumns: [...state.boardColumns, { id: uuidv4(), name, createdAt: new Date(), updatedAt: new Date() }],
    })),
  removeColumn: (id) =>
    set((state) => ({
      boardColumns: state.boardColumns.filter((column) => column.id !== id),
    })),
  updateColumn: (id, name) =>
    set((state) => ({
      boardColumns: state.boardColumns.map((column) =>
        column.id === id ? { ...column, name, updatedAt: new Date() } : column
      ),
    })),
}));