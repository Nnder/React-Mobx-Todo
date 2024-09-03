import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TaskList } from "../TaskList";
import { Task } from "../../../types/types";
import TaskStore from "../../../store/TaskStore";
import './TaskItem.scss';
import Dropdown from "../../Dropdown/Dropdown";
interface TaskItemProps {
    task: Task;
}

export const TaskItem: React.FC<TaskItemProps>  = observer(({task}) => {
    const [showChildren, setShowChildren] = useState(false);

    const handleChange = ()=>{
        TaskStore.completeTask(task, !task.completed)
    }

    const setTask = () =>{
        TaskStore.setSelectedTask(task)
    }

    return (
        <>
            <li>
                <div className="task">
                    <button className="task__btn" disabled={!task.children.length}
                        onClick={()=>setShowChildren(prev=> !prev)}>
                        {showChildren ?  '∧' : '>'}
                    </button>

                    <Dropdown task={task}/>

                    <div className="task__label">
                        <div className="task__label-title" onClick={setTask}>{task.title}</div>
                        <input type="checkbox" checked={task.completed} onChange={handleChange}/>
                    </div>
                </div>
                
                {showChildren && !!task.children.length && <TaskList show={showChildren} tasks={task.children}/>}
            </li>
        </>
        
    )
})


