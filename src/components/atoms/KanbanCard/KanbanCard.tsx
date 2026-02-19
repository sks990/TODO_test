import React from 'react';
import { ITask } from '../../../types';
import './KanbanCard.css';
import { useTaskStore } from '../../../stores/TaskStore';

interface KanbanCardProps {
  task: ITask;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const { setSelectedTask } = useTaskStore();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
  };

  const handleClick = () => {
    setSelectedTask(task);
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#FF6B6B'; // Red
      case 'medium':
        return '#FFD166'; // Yellow
      case 'low':
        return '#66D2D6'; // Blue
      default:
        return '#A0A0A0'; // Grey
    }
  };

  return (
    <div
      className="kanban-card"
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      style={{ borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}
    >
      <h4 className="kanban-card-title">{task.title}</h4>
      <p className="kanban-card-description">{task.description}</p>
      <div className="kanban-card-footer">
        <span className="kanban-card-priority">{task.priority}</span>
        <span className="kanban-card-due-date">{task.dueDate}</span>
      </div>
    </div>
  );
};