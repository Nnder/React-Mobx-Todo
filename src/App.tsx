import { observer } from "mobx-react-lite"
import TaskStore from './store/TaskStore.ts'
import { TaskList } from "./components/TaskList/TaskList.tsx";

interface AppProps {
    taskStore: typeof TaskStore;
}

const App: React.FC<AppProps> = observer(() => {
    
    return (
        <>
            <div>
                <button onClick={()=>
                    TaskStore.addTask({
                        id: `${TaskStore.tasks.length+1}`, 
                        body: '123', 
                        title: '123', 
                        completed: false, 
                        children: []}
                        )}>
                    Новая задача
                </button>

                <TaskList tasks={TaskStore.tasks}/>
                
                {/* <Modal isOpen={true} onClose={()=>{false}}>
                    modal
                </Modal> */}
            </div>


            <div>
                
            </div>
        </>
    )
})


export default App
