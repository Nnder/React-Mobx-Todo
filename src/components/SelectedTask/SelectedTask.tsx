import { observer } from "mobx-react-lite"
import TaskStore from "../../store/TaskStore"


export const SelectedTask = observer(() => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        {TaskStore.selectedTask === null ? <div>Выберите задачу</div> : 
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        }}>
            <div style={{fontSize: '20px'}}>
                {TaskStore.selectedTask.title}
            </div>
            <div>{TaskStore.selectedTask.body}</div>
        </div>}
        
    </div>
  )
})
