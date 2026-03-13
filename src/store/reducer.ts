import type { BoardState, Action } from './types';

export const initialState: BoardState = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Complete Navatech Assignment",
      description: "Implement offline-first architecture",
      status: "todo",
      priority: 3,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  },
  order: {
    todo: ["task-1"],
    "in-progress": [],
    done: [],
  },
  filters: { text: '', priority: null },
  history: [],
  future: []
};

export const boardReducer = (state: BoardState, action: Action): BoardState => {
  const saveHistory = () => {
    const { history, future, ...rest } = state;
    return { ...state, history: [rest, ...history].slice(0, 15), future: [] }; 
  };

  switch (action.type) {
    case 'ADD_TASK': {
      const next = saveHistory();
      return {
        ...next,
        tasks: { ...next.tasks, [action.payload.id]: action.payload },
        order: { ...next.order, todo: [action.payload.id, ...next.order.todo] }
      };
    }
    default:
      return state;
  }
};