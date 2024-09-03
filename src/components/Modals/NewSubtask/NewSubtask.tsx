import { useState } from 'react'
import { Task } from '../../../types/types';
import { Modal } from '../ModalWrapper/Modal';
import TaskStore from '../../../store/TaskStore';

interface NewSubtask {
    task: Task;
    open: boolean;
    onClose: ()=>void;
}

export const NewSubtask: React.FC<NewSubtask> = ({task, open, onClose}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
  
    const createTask = () =>{
        if(!title ||!body) return;
        onClose();

        const newTask = {
            id: `${task.id}.${task.children.length+1}`, 
            completed: false, 
            children: [],
            parent: task,
            body, 
            title, 
        }

        TaskStore.addSubTask(task, newTask)

        setTitle("")
        setBody("")
    }
    
    return (
      <>
          <Modal isOpen={open} onClose={onClose}>
                <div className="modal__container">
                        <h3>Новая задача</h3>
                        <input className="modal__container-title" type="text" placeholder="Название" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <textarea className="modal__container-body" placeholder="Описание" value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
                        <button onClick={createTask}>Создать</button>
                </div>
          </Modal>
      </>
      
    )
}