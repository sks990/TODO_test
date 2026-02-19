export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  boardColumnId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IKanbanColumn {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBoard {
  id: string;
  name: string;
  kanbanColumns: IKanbanColumn[];
  createdAt: Date;
  updatedAt: Date;
}