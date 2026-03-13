import { BoardState } from "../types"

const LIMIT = 15

export function reducer(state: BoardState, action: any): BoardState {

  switch (action.type) {

    case "ADD_TASK": {

      const task = action.payload

      const newState = {
        ...state,
        tasks: { ...state.tasks, [task.id]: task },
        order: {
          ...state.order,
          todo: [...state.order.todo, task.id]
        }
      }

      return saveHistory(state, newState)
    }

    case "MOVE_TASK": {

      const { id, from, to } = action.payload

      const fromList = [...state.order[from]]
      const toList = [...state.order[to]]

      fromList.splice(fromList.indexOf(id), 1)
      toList.push(id)

      const newState = {
        ...state,
        order: {
          ...state.order,
          [from]: fromList,
          [to]: toList
        },
        tasks: {
          ...state.tasks,
          [id]: { ...state.tasks[id], status: to }
        }
      }

      return saveHistory(state, newState)
    }

    case "UNDO":

      if (!state.history.length) return state

      const prev = state.history[state.history.length - 1]

      return {
        ...prev,
        history: state.history.slice(0, -1),
        future: [strip(state), ...state.future]
      }

    case "REDO":

      if (!state.future.length) return state

      const next = state.future[0]

      return {
        ...next,
        history: [...state.history, strip(state)],
        future: state.future.slice(1)
      }

    default:
      return state
  }
}

function strip(state: BoardState) {
  const { history, future, ...rest } = state
  return rest
}

function saveHistory(oldState: BoardState, newState: BoardState) {

  const snapshot = strip(oldState)

  return {
    ...newState,
    history: [...oldState.history, snapshot].slice(-LIMIT),
    future: []
  }
}