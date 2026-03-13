import { useEffect } from 'react';
import type { BoardState } from '../store/types';

export const useDebouncedLS = (state: BoardState) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        const { history, future, ...data } = state;
        localStorage.setItem('fluxboard_v1', JSON.stringify(data));
      } catch (err) {
        console.error("Corruption detected. Resetting store.");
        localStorage.removeItem('fluxboard_v1'); 
      }
    }, 800); 

    return () => clearTimeout(handler);
  }, [state]);
};