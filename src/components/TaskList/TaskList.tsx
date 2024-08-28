import { observer } from "mobx-react-lite"
import TaskStore from "../../store/TaskStore"

export const TaskList = observer(() => {
  return (
    <div>
      {TaskStore.tasks.map(task => <div key={task.id}>{task.title}</div>)}
    </div>
  )
})
