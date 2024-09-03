import { observer } from "mobx-react-lite"
import TaskStore from './store/TaskStore.ts'
import { TaskList } from "./components/TaskList/TaskList.tsx";
import { NewTask } from "./components/Modals";
import { SelectedTask } from "./components/SelectedTask/SelectedTask.tsx";

interface AppProps {
    taskStore: typeof TaskStore;
}

const App: React.FC<AppProps> = observer(() => {
    
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
        }}>
            <div style={{
                paddingTop: '16px',
                boxSizing: 'border-box',
                height: '100vh',
                }}>
                <NewTask/>
                <TaskList tasks={TaskStore.tasks}/>
            </div>

            <SelectedTask/>
        </div>
    )
})


export default App
