import React from "react"
import { Task } from "../types"
import { useGlobalTimer } from "../hooks/useGlobalTimer"

export default React.memo(({ task }: { task: Task }) => {

  const tick = useGlobalTimer()

  const seconds = Math.floor((tick - task.updatedAt) / 1000)

  return (

    <div className="card" draggable>

      <h4>{task.title}</h4>

      <p>{task.description}</p>

      <small>
        Modified {seconds}s ago
      </small>

    </div>

  )

}, (p, n) => p.task.updatedAt === n.task.updatedAt)