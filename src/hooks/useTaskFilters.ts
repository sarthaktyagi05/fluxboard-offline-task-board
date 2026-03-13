import { useMemo } from 'react';
import type { BoardState, Status } from '../store/types';

export const useTaskFilters = (state: BoardState, status: Status) => {
  return useMemo(() => {
    const { tasks, order, filters } = state;
    const columnOrder = order[status];

    if (!filters.text && !filters.priority) return columnOrder;

    return columnOrder.filter((id) => {
      const task = tasks[id];
      const matchesText = task.title.toLowerCase().includes(filters.text.toLowerCase()) ||
                          task.description.toLowerCase().includes(filters.text.toLowerCase());
      const matchesPriority = filters.priority ? task.priority === filters.priority : true;
      
      return matchesText && matchesPriority;
    });
  }, [state, status]);
};