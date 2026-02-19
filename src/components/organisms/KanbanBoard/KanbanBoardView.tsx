import React from 'react';
import { KanbanColumn } from '../KanbanColumn/KanbanColumn';
import { useBoardStore } from '../../../stores/BoardStore';
import { useTaskStore } from '../../../stores/TaskStore';
import './KanbanBoardView.css';

export const KanbanBoardView: React.FC = () => {
  const boardColumns = useBoardStore((state) => state.boardColumns);
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="kanban-board-view">
      {boardColumns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={tasks.filter((task) => task.boardColumnId === column.id)}
        />
      ))}
    </div>
  );
};