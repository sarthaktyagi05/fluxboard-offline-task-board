import React, { useState } from 'react';
import { useBoard } from '../store/BoardContext';
import { TaskModal } from './TaskModal';
import type { Status } from '../store/types';

export const Header = () => {
  const { state, dispatch } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_FILTER', payload: e.target.value });
  };

  const handleAddTask = (title: string, description: string) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: crypto.randomUUID(),
        title,
        description,
        status: 'todo' as Status,
        priority: 2, 
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    });
  };

  return (
    <>
      <header style={styles.header}>
        <div style={styles.leftSection}>
          <h1 style={styles.title}>FluxBoard</h1>
          <button onClick={() => setIsModalOpen(true)} style={styles.fab}>
            + New Task
          </button>
        </div>

        <div style={styles.centerSection}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={state.filters.text}
            onChange={handleSearch}
            style={styles.searchBar}
          />
        </div>

        <div style={styles.rightSection}>
          <button 
            onClick={() => dispatch({ type: 'UNDO' })} 
            disabled={state.history.length === 0}
            style={state.history.length === 0 ? styles.disabledBtn : styles.btn}
          >
            Undo ({state.history.length})
          </button>
          <button 
            onClick={() => dispatch({ type: 'REDO' })} 
            disabled={state.future.length === 0}
            style={state.future.length === 0 ? styles.disabledBtn : styles.btn}
          >
            Redo ({state.future.length})
          </button>
        </div>
      </header>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddTask} 
      />
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', backgroundColor: '#F7F2FA', borderBottom: '1px solid #CAC4D0', position: 'sticky', top: 0, zIndex: 100 },
  leftSection: { display: 'flex', alignItems: 'center', gap: '24px' },
  title: { fontSize: '22px', color: '#1C1B1F', margin: 0 },
  fab: { backgroundColor: '#6750A4', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '16px', cursor: 'pointer', boxShadow: '0px 1px 3px rgba(0,0,0,0.2)' },
  centerSection: { display: 'flex', flex: 1, justifyContent: 'center' },
  searchBar: { padding: '10px 16px', width: '300px', borderRadius: '28px', border: '1px solid #79747E', backgroundColor: '#ECE6F0' },
  btn: { margin: '0 4px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #6750A4', background: 'none', color: '#6750A4', cursor: 'pointer' },
  disabledBtn: { margin: '0 4px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #CCC', color: '#CCC', cursor: 'not-allowed' },
  rightSection: { display: 'flex', gap: '8px' }
};