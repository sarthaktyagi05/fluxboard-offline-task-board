import TaskCard from "./TaskCard"

export default function Column({ title, tasks }) {

  return (

    <div className="column">

      <h3>{title}</h3>

      {tasks.map(t => (
        <TaskCard key={t.id} task={t} />
      ))}

    </div>

  )
}