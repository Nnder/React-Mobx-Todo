import { useState } from 'react'
import { Task } from '../../../types/types';
import { Modal } from '../ModalWrapper/Modal';

interface NewSubtask {
    task: Task;
    open: boolean;
    onClose: ()=>void;
}

export const NewSubtask = ({task, open, onClose} : NewSubtask) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
  
    const createTask = () =>{
      if(!title ||!body) return;
      onClose();
      task.children.push(
      {
          id: `${task.id}.${task.children.length+1}`, 
          completed: false, 
          children: [],
          body, 
          title, 
      })
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