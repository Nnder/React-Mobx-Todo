import { observer } from "mobx-react-lite"
import TaskStore from './store/TaskStore.ts'
import { TaskList } from "./components/TaskList/TaskList.tsx";
import { NewTask } from "./components/Modals";
import { SelectedTask } from "./components/SelectedTask/SelectedTask.tsx";
import './index.scss'

interface AppProps {
    taskStore: typeof TaskStore;
}

const App: React.FC<AppProps> = observer(() => {
    return (
        <div className="main__container">
            <div className="main__container-tasklist">
                <NewTask/>
                <TaskList tasks={TaskStore.tasks}/>
            </div>
            <SelectedTask/>
        </div>
    )
})


export default App
