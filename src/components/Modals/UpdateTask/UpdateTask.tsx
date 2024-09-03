import { useState } from 'react'
import { Task } from '../../../types/types';
import { Modal } from '../ModalWrapper/Modal';
import TaskStore from '../../../store/TaskStore';

interface UpdateTask {
    task: Task;
    open: boolean;
    onClose: ()=>void;
}

export const UpdateTask: React.FC<UpdateTask> = ({task, open, onClose}) => {
    const [title, setTitle] = useState(task.title)
    const [body, setBody] = useState(task.body)
  
    const updateTask = () =>{
      if(!title ||!body) return;
      onClose();
      
      TaskStore.updateTask(task, title, body)

      setTitle("")
      setBody("")
    }
    
    return (
      <>
          <Modal isOpen={open} onClose={onClose}>
              <div className="modal__container">
                  <h3>Обновить задачу</h3>
                  <input className="modal__container-title" type="text" placeholder="Название" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                  <textarea className="modal__container-body" placeholder="Описание" value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
                  <button onClick={updateTask}>Обновить</button>
              </div>
          </Modal>
      </>
      
    )
}