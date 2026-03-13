import  { useCallback } from 'react';
import { BoardProvider, useBoard } from './store/BoardContext';
import { Column } from './components/Column';
import { Header } from './components/Header'; 
import { useDebouncedLS } from './hooks/useDebouncedLS';
import type { Status, TaskId } from './store/types';

const FluxBoard = () => {
  const { state, dispatch } = useBoard();
  
  useDebouncedLS(state); // Persistent storage 

  const handleMoveTask = useCallback((taskId: TaskId, to: Status, newIndex: number) => {
    const from = (Object.keys(state.order) as Status[]).find(key => state.order[key].includes(taskId));
    if (from) {
      dispatch({ type: 'MOVE_TASK', payload: { taskId, from, to, newIndex } });
    }
  }, [dispatch, state.order]);

  return (
    <div style={styles.appContainer}>
      <Header />
      <main style={styles.boardGrid}>
        <Column status="todo" taskIds={state.order.todo} tasks={state.tasks} onMove={handleMoveTask} />
        <Column status="in-progress" taskIds={state.order['in-progress']} tasks={state.tasks} onMove={handleMoveTask} />
        <Column status="done" taskIds={state.order.done} tasks={state.tasks} onMove={handleMoveTask} />
      </main>
    </div>
  );
};

const styles = {
  appContainer: { backgroundColor: '#FEF7FF', minHeight: '100vh', display: 'flex', flexDirection: 'column' as const },
  boardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', padding: '24px', flex: 1, maxWidth: '1600px', margin: '0 auto', width: '100%', boxSizing: 'border-box' as const }
};

export default function App() {
  return (
    <BoardProvider>
      <FluxBoard />
    </BoardProvider>
  );
}