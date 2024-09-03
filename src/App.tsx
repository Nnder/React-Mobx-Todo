import { observer } from "mobx-react-lite"
import TaskStore from './store/TaskStore.ts'
import { TaskList } from "./components/TaskList/TaskList.tsx";
import { NewTask } from "./components/Modals";

import './index.scss'
import { Outlet } from "react-router-dom";

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
            <Outlet/>
        </div>
    )
})


export default App
