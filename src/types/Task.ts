export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  boardColumnId: string;
  createdAt: string; // or Date, depending on how it's stored/parsed
  // Add other task-related fields as needed
}