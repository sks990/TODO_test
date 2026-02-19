import React from 'react';
import { KanbanCard } from '../../atoms/KanbanCard/KanbanCard';
import { IKanbanColumn, ITask } from '../../../types';
import './KanbanColumn.css';
import { useTaskStore } from '../../../stores/TaskStore';

interface KanbanColumnProps {
  column: IKanbanColumn;
  tasks: ITask[];
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks }) => {
  const { moveTaskToColumn } = useTaskStore();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const taskId = e.dataTransfer.getData('text/plain');
    moveTaskToColumn(taskId, column.id);
  };

  return (
    <div
      className="kanban-column"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-column-id={column.id}
    >
      <h3 className="kanban-column-title">{column.name}</h3>
      <div className="kanban-card-container">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};