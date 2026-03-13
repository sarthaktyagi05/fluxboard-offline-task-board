import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

export const TaskModal = ({ isOpen, onClose, onSave }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return; 
    onSave(title, description);
    
    setTitle('');
    setDescription('');
    onClose();
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>Create New Task</h2>
        
        <input
          type="text"
          placeholder="Task Heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          autoFocus
        />
        
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          rows={4}
        />
        
        <div style={styles.buttonGroup}>
          <button onClick={handleCancel} style={styles.cancelBtn}>Cancel</button>
          <button onClick={handleSave} style={styles.saveBtn} disabled={!title.trim()}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#FEF7FF', 
    borderRadius: '28px', 
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0px 4px 8px 3px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  heading: { margin: 0, color: '#1C1B1F', fontSize: '24px', fontWeight: 400 },
  input: {
    padding: '12px 16px',
    borderRadius: '4px',
    border: '1px solid #79747E',
    fontSize: '16px',
    backgroundColor: 'transparent',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '4px',
    border: '1px solid #79747E',
    fontSize: '16px',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    resize: 'vertical',
  },
  buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' },
  cancelBtn: {
    padding: '10px 24px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#6750A4',
    fontWeight: 500,
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '10px 24px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#6750A4',
    color: 'white',
    fontWeight: 500,
    cursor: 'pointer',
  }
};