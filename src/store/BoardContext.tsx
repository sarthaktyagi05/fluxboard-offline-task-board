import React, { createContext, useReducer, useContext, useMemo } from 'react';
import type { ReactNode } from 'react'; 
import { boardReducer, initialState } from './boardReducer'; 
import type { BoardState, Action } from './types'; 

interface BoardContextType {
  state: BoardState;
  dispatch: React.Dispatch<Action>;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]); 

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within a BoardProvider");
  return context;
};