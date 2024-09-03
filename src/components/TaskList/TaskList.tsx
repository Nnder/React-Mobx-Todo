import { observer } from "mobx-react-lite"
import { TaskItem } from "./TaskItem/TaskItem"
import { Task } from "../../types/types";
import './TaskList.scss';

interface TaskListProps {
    tasks: Task[];
    show?: boolean;
}

export const TaskList: React.FC<TaskListProps>  = observer(({tasks, show = true}: TaskListProps) => {

    return (
        <ul style={{display: show ? 'flex' : 'none',}}
        className="tasks__container">
            {tasks.map(task => 
                <TaskItem task={task} key={task.id}/>
            )}
        </ul>
    )
})
