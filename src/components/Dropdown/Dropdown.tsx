import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import './styles.scss';
import { Task } from '../../types/types';
import { useState } from 'react';
import { NewSubtask } from '../Modals';
import { UpdateTask } from '../Modals';
import TaskStore from '../../store/TaskStore';

interface Dropdown {
    task: Task;
}

const Dropdown: React.FC<Dropdown> = ({task} : Dropdown) => {
    const [openNewSubtask, setOpenNewSubtask] = useState(false)
    const [openUpdateTask, setOpenUpdateTask] = useState(false)

    const openModalNewSubtask = () =>
        setOpenNewSubtask(true)

    const openModalUpdateTask = () =>
        setOpenUpdateTask(true)

    const deleteTask = () =>
        TaskStore.deleteTask(task)

    return (
        <>
            <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button aria-label="Customise options">
                <img src="vertical.svg" className="IconButton" alt="M"/>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent">
                <DropdownMenu.Item className="DropdownMenuItem" onClick={openModalNewSubtask}>
                    Добавить
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={openModalUpdateTask}>
                    Изменить
                </DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem" onClick={deleteTask}>
                    Удалить
                </DropdownMenu.Item>
                
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <NewSubtask task={task} open={openNewSubtask} onClose={()=>setOpenNewSubtask(false)}/>
            <UpdateTask task={task} open={openUpdateTask} onClose={()=>setOpenUpdateTask(false)}/>
        </>
    );
};

export default Dropdown;