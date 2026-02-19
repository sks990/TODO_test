import React, { useState } from 'react';
import { KanbanCard } from '@/src/components/atoms/KanbanCard';
import { Task } from '@/src/types/Task';
import { Column } from '@/src/types/Column';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDrop: (taskId: string, targetColumnId: string) => Promise<void>;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, onDrop }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    onDrop(taskId, column.id);
  };

  return (
    <div
      className={`min-w-[280px] rounded-lg p-4 ${isOver ? 'bg-blue-100' : 'bg-gray-100'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDropEvent}
    >
      <h3 className="text-lg font-semibold mb-4">{column.name}</h3>
      <div className="min-h-[600px] space-y-3">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};