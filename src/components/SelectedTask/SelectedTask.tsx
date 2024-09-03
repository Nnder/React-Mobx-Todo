import { observer } from "mobx-react-lite"
import TaskStore from "../../store/TaskStore"
import "./SelectedTask.scss"
import { useParams } from "react-router-dom";


export const SelectedTask = observer(() => {
  const { id } = useParams();
  const task = id ? TaskStore.getTaskById(id) : null
  return (
    <div className="selected__wrapper">
        {task === null ? 
        <div className="selected__wrapper__text">Выберите задачу</div> : 
        <div className="selected__wrapper__text">
            <div className="selected__wrapper__text-title">
                {task.title}
            </div>
            <div className="selected__wrapper__text-body">
                {task.body}
            </div>
        </div>}
        
    </div>
  )
})
