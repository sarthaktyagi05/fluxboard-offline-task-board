export type TaskId = string;
export type Status = "todo" | "in-progress" | "done"; 

export interface Task {
  id: TaskId;
  title: string;
  description: string;
  status: Status;
  priority: 1 | 2 | 3; 
  createdAt: number;
  updatedAt: number;
}

export interface BoardState {
  tasks: Record<TaskId, Task>;
  order: {
    todo: TaskId[];
    "in-progress": TaskId[]; 
    done: TaskId[];
  };
  filters: {
    text: string;
    priority: number | null;
  };
  history: Omit<BoardState, 'history' | 'future'>[]; 
  future: Omit<BoardState, 'history' | 'future'>[];
}

export type Action = 
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'MOVE_TASK'; payload: { taskId: TaskId; from: Status; to: Status; newIndex: number } }
  | { type: 'UPDATE_TASK'; payload: Partial<Task> & { id: TaskId } }
  | { type: 'DELETE_TASK'; payload: TaskId }
  | { type: 'SET_FILTER'; payload: string } 
  | { type: 'UNDO' } 
  | { type: 'REDO' }
  | { type: 'HYDRATE'; payload: BoardState };