import { observer } from "mobx-react-lite"
import TaskStore from "../../store/TaskStore"
import "./SelectedTask.scss"


export const SelectedTask = observer(() => {
  return (
    <div className="selected__wrapper">
        {TaskStore.selectedTask === null ? 
        <div className="selected__wrapper__text">Выберите задачу</div> : 
        <div className="selected__wrapper__text">
            <div className="selected__wrapper__text-title">
                {TaskStore.selectedTask.title}
            </div>
            <div className="selected__wrapper__text-body">
                {TaskStore.selectedTask.body}
            </div>
        </div>}
        
    </div>
  )
})
