import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TaskList } from "../TaskList";
import { Task } from "../../../types/types";
import TaskStore from "../../../store/TaskStore";
import './TaskItem.scss';

interface TaskItemProps {
    task: Task;
}


export const TaskItem = observer(({task} : TaskItemProps) => {
    const [showChildren, setShowChildren] = useState(false);

    const handleChange = ()=>{
        TaskStore.completeTask(task, !task.completed)
    }

    return (
        <li>
            <div className="task">
                <button className="task__btn" disabled={!task.children.length}
                    onClick={()=>setShowChildren(prev=> !prev)}>
                    {showChildren ?  '∧' : '>'}
                </button>

                <div className="task__label">
                    {task.title} 
                    <input type="checkbox" checked={task.completed} onChange={handleChange}/>
                </div>
            </div>
            
            {showChildren && !!task.children.length && <TaskList show={showChildren} tasks={task.children}/>}
        </li>
    )
})
