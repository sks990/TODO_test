import React from 'react';
import { useBoardColumns } from '@/src/hooks/useBoardColumns';
import { useTasks } from '@/src/hooks/useTasks';
import { KanbanColumn } from '@/src/components/molecules/KanbanColumn';
import { Task } from '@/src/types/Task';
import { Column } from '@/src/types/Column';

export const KanbanBoardView: React.FC = () => {
  const { columns, loading: columnsLoading } = useBoardColumns();
  const { tasks, loading: tasksLoading, moveTask } = useTasks();

  if (columnsLoading || tasksLoading) {
    return <div>Loading...</div>;
  }

  const handleDrop = async (taskId: string, targetColumnId: string) => {
    await moveTask(taskId, targetColumnId);
  };

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={tasks.filter((task: Task) => task.boardColumnId === column.id)}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};