import { useState } from "react";
import { Modal } from "../ModalWrapper/Modal";
import TaskStore from "../../../store/TaskStore";
import './NewTask.scss'

export const NewTask = () => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const createTask = () =>{
    setOpen(false);
    TaskStore.addTask({
        id: `${TaskStore.tasks.length+1}`, 
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
        <button onClick={()=>setOpen(true)}>
            Новая задача
        </button>
        <Modal isOpen={open} onClose={()=>setOpen(false)}>
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
