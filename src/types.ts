export type TaskId = string

export type Task = {
  id: TaskId
  title: string
  description: string
  status: "todo" | "inProgress" | "done"
  priority: 1 | 2 | 3
  createdAt: number
  updatedAt: number
}

export type BoardState = {
  tasks: Record<TaskId, Task>

  order: {
    todo: TaskId[]
    inProgress: TaskId[]
    done: TaskId[]
  }

  history: any[]
  future: any[]
}