import { useReducer } from "react";
import { Column } from "./Column";
import { boardReducer } from "../reducer/boardReducer";
import { v4 as uuid } from "uuid";
import { useDebouncedLS } from "../hooks/useDebouncedLS"; 
import type { BoardState, Status } from "../store/types";

const initialState: BoardState = {
  tasks: {},
  order: {
    todo: [],
    "in-progress": [], 
    done: []
  },
  filters: {
    text: "",
    priority: null
  },
  history: [],
  future: []
};

export default function Board() {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  useDebouncedLS(state); 

  function addTask() {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: uuid(),
        title: "New Task",
        description: "Example task",
        status: "todo",
        priority: 2,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    });
  }

  const handleMove = (taskId: string, to: Status, index: number) => {
  const from = (Object.keys(state.order) as Status[]).find(key => 
    state.order[key].includes(taskId)
  );

  if (from) {
    dispatch({ 
      type: "MOVE_TASK", 
      payload: { 
        taskId, 
        from, 
        to, 
        newIndex: index 
      } 
    });
  } else {
    console.error(`Task ${taskId} not found in any column.`);
  }
};

  return (
    <div>
      <div className="controls">
        <button onClick={addTask}>Add Task</button>
        <button onClick={() => dispatch({ type: "UNDO" })} disabled={state.history.length === 0}>Undo</button>
        <button onClick={() => dispatch({ type: "REDO" })} disabled={state.future.length === 0}>Redo</button>
      </div>

      <div className="board" style={{ display: 'flex', gap: '20px' }}>
        <Column 
          status="todo" 
          taskIds={state.order.todo} 
          tasks={state.tasks} 
          onMove={handleMove} 
        />
        <Column 
          status="in-progress" 
          taskIds={state.order["in-progress"]}
          tasks={state.tasks} 
          onMove={handleMove} 
        />
        <Column 
          status="done" 
          taskIds={state.order.done} 
          tasks={state.tasks} 
          onMove={handleMove} 
        />
      </div>
    </div>
  );
}