import React, { useState, useMemo } from 'react';
import { TaskCard } from './TaskCard';
import { useBoard } from '../store/BoardContext';
import { useTaskFilters } from '../hooks/useTaskFilters';
import type { TaskId, Task, Status } from '../store/types';

interface Props {
  status: Status;
  taskIds: TaskId[]; 
  tasks: Record<TaskId, Task>;
  onMove: (taskId: string, to: Status, index: number) => void;
}

export const Column = ({ status, taskIds, tasks, onMove }: Props) => {
  const { state } = useBoard();
  const [scrollTop, setScrollTop] = useState(0);
  const [isOver, setIsOver] = useState(false);
  
  const ITEM_HEIGHT = 120; 

  const filteredIds = useTaskFilters(state, status); 

  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 1);
  const visibleIds = useMemo(() => filteredIds.slice(startIndex, startIndex + 12), [filteredIds, startIndex]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
    setIsOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;
    const dropY = e.clientY - e.currentTarget.getBoundingClientRect().top + scrollTop;
    const calculatedIndex = Math.floor(dropY / ITEM_HEIGHT);
    const finalIndex = Math.min(Math.max(0, calculatedIndex), filteredIds.length);
    
    onMove(taskId, status, finalIndex);
  };

  return (
    <div 
      className={`column ${status}`}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ ...styles.columnContainer, backgroundColor: isOver ? '#F2E7FE' : '#F7F2FA' }}
    >
      <h2 style={styles.columnTitle}>{status.toUpperCase()} ({filteredIds.length})</h2>
      <div style={{ height: filteredIds.length * ITEM_HEIGHT, position: 'relative' }}>
        {visibleIds.map((id, index) => (
          <div key={id} style={{ position: 'absolute', top: (startIndex + index) * ITEM_HEIGHT, width: '100%', transition: 'top 0.2s ease' }}>
            {tasks[id] && <TaskCard task={tasks[id]} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  columnContainer: { height: '85vh', overflowY: 'auto' as const, borderRadius: '12px', padding: '8px', transition: 'background-color 0.2s ease', border: '1px solid #CAC4D0' },
  columnTitle: { padding: '16px', fontSize: '14px', fontWeight: 500, color: '#49454F', letterSpacing: '0.1px' }
};