import type { BoardState, Action, Status } from '../store/types';

export const initialState: BoardState = {
  tasks: {},
  order: {
    todo: [],
    'in-progress': [],
    done: []
  },
  filters: { text: "", priority: null },
  history: [],
  future: []
};

export const boardReducer = (state: BoardState, action: Action): BoardState => {
  const saveHistory = () => {
    const { history, future, ...currentState } = state;
    return {
      ...state,
      history: [currentState, ...history].slice(0, 15),
      future: [] 
    };
  };

  switch (action.type) {
    case 'ADD_TASK': {
      const next = saveHistory();
      const task = action.payload;
      return {
        ...next,
        tasks: { ...next.tasks, [task.id]: task },
        order: { ...next.order, todo: [task.id, ...next.order.todo] }
      };
    }

    case 'UPDATE_TASK': {
      const { id, ...updates } = action.payload;
      if (!state.tasks[id]) return state;
      
      const next = saveHistory();
      return {
        ...next,
        tasks: {
          ...next.tasks,
          [id]: { 
            ...next.tasks[id], 
            ...updates, 
            updatedAt: Date.now() 
          }
        }
      };
    }

    case 'MOVE_TASK': {
      const { taskId, from, to, newIndex } = action.payload;
      const next = saveHistory();

      const sourceOrder = next.order[from as Status].filter(id => id !== taskId);
      
      const targetOrder = [...next.order[to as Status]];
      targetOrder.splice(newIndex, 0, taskId);

      return {
        ...next,
        tasks: {
          ...next.tasks,
          [taskId]: { 
            ...next.tasks[taskId], 
            status: to as Status, 
            updatedAt: Date.now() 
          }
        },
        order: {
          ...next.order,
          [from]: sourceOrder,
          [to]: targetOrder
        }
      };
    }

    case 'UNDO': {
      if (state.history.length === 0) return state;
      const [previous, ...remainingHistory] = state.history;
      const { history, future, ...current } = state;
      
      return {
        ...(previous as BoardState),
        history: remainingHistory,
        future: [current, ...future].slice(0, 15)
      };
    }

    case 'REDO': {
      if (state.future.length === 0) return state;
      const [nextState, ...remainingFuture] = state.future;
      const { history, future, ...current } = state;

      return {
        ...(nextState as BoardState),
        history: [current, ...history].slice(0, 15),
        future: remainingFuture
      };
    }

    case 'HYDRATE':
      return { ...action.payload, history: [], future: [] }; 

    default:
      return state;
  }
};