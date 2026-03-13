import React, { useState, useEffect, memo } from 'react';
import type { Task } from '../store/types';

export const TaskCard = memo(({ task }: { task: Task }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const seconds = Math.floor((Date.now() - task.updatedAt) / 1000);
      if (seconds < 60) setTimeAgo(`${seconds}s ago`);
      else setTimeAgo(`${Math.floor(seconds / 60)}m ago`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 10000); 

    return () => clearInterval(interval);
  }, [task.updatedAt]); 

  return (
    <div 
      draggable 
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
      style={styles.card}
    >
      <div style={styles.content}>
        <h4 style={styles.title}>{task.title}</h4>
        
        {task.description && (
          <p style={styles.description}>{task.description}</p>
        )}
        
        <p style={styles.timeLabel}>Modified {timeAgo}</p>
      </div>
      <div style={{ ...styles.priorityTag, backgroundColor: getPriorityColor(task.priority) }} />
    </div>
  );
}, (prev, next) => prev.task.updatedAt === next.task.updatedAt); 

const getPriorityColor = (p: number) => {
  if (p === 3) return '#B3261E'; 
  if (p === 2) return '#EAB308'; 
  return '#79747E'; 
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '16px',
    margin: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.15)', 
    cursor: 'grab',
  },
  content: {
    flex: 1, 
    paddingRight: '12px', 
  },
  title: { 
    margin: 0, 
    fontSize: '16px', 
    color: '#1C1B1F',
    fontWeight: 500
  },
  description: {
    margin: '4px 0 0 0',
    fontSize: '14px',
    color: '#49454F', 
    display: '-webkit-box',
    WebkitLineClamp: 2, 
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  timeLabel: { 
    margin: '8px 0 0 0', 
    fontSize: '12px', 
    color: '#79747E' 
  },
  priorityTag: { 
    width: '4px', 
    borderRadius: '2px',
    flexShrink: 0 
  }
};