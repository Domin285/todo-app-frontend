export interface ToDoItem {
  id: number;
  title: string;
  description?: string;
  isDone: boolean;
  createdAt: string;
}

export type CreateTodoDto = Omit<ToDoItem, 'id' | 'createdAt'>;
