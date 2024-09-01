import { observer } from "mobx-react-lite"
import TaskStore from './store/TaskStore.ts'
import { TaskList } from "./components/TaskList/TaskList.tsx";
import { NewTask } from "./components/Modals/index.ts";

interface AppProps {
    taskStore: typeof TaskStore;
}

const App: React.FC<AppProps> = observer(() => {
    
    return (
        <>
            <div>
                <NewTask/>
                <TaskList tasks={TaskStore.tasks}/>
            </div>


            <div>
                
            </div>
        </>
    )
})


export default App
