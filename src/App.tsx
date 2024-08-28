import { observer } from "mobx-react-lite"
import TaskStore from './store/TaskStore.ts'
import { TaskList } from "./components/TaskList/TaskList.tsx";

interface AppProps {
    taskStore: typeof TaskStore;
}

const App: React.FC<AppProps> = observer(() => {
    
    return (
        <span>
            <button onClick={()=>TaskStore.addTask({id: 1, body: '123', title: '123', completed: false, children: []})}>add</button>
            <TaskList/>

            {/* <Modal isOpen={true} onClose={()=>{false}}>
                modal
            </Modal> */}
        </span>
    )
})


export default App
