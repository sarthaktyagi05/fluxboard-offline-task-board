import { useReducer } from "react"
import Column from "./Column"
import { reducer } from "../reducer/boardReducer"
import { useDebouncedStorage } from "../hooks/useDebouncedStorage"
import { v4 as uuid } from "uuid"

const initialState = {
  tasks: {},
  order: {
    todo: [],
    inProgress: [],
    done: []
  },
  history: [],
  future: []
}

export default function Board() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useDebouncedStorage("fluxboard", state)

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
    })
  }

  const todo = state.order.todo.map(id => state.tasks[id])
  const prog = state.order.inProgress.map(id => state.tasks[id])
  const done = state.order.done.map(id => state.tasks[id])

  return (

    <div>

      <button onClick={addTask}>Add Task</button>

      <button onClick={() => dispatch({ type: "UNDO" })}>
        Undo
      </button>

      <button onClick={() => dispatch({ type: "REDO" })}>
        Redo
      </button>

      <div className="board">

        <Column title="Todo" tasks={todo} />
        <Column title="In Progress" tasks={prog} />
        <Column title="Done" tasks={done} />

      </div>

    </div>
  )
}