import React from 'react';
import { Task } from '@/src/types/Task';

interface KanbanCardProps {
  task: Task;
}

const priorityColors: Record<string, string> = {
  low: 'bg-green-200',
  medium: 'bg-yellow-200',
  high: 'bg-red-200',
};

export const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = () => {
    // TODO: Implement opening TaskFormModal
    alert(`Opening details for task: ${task.title}`);
  };

  const priorityColor = priorityColors[task.priority] || 'bg-gray-200';

  return (
    <div
      className={`p-3 rounded-lg shadow-md cursor-grab ${priorityColor} hover:shadow-xl transition-shadow duration-200`}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      <h4 className="font-semibold text-sm truncate">{task.title}</h4>
      <p className="text-xs text-gray-600 truncate">{task.description}</p>
    </div>
  );
};