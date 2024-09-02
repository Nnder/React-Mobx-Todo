import { makeAutoObservable } from 'mobx'
import { Task } from '../types/types'

class TaskStore {
    tasks: Task[] = [
        {id: '1', body: '123', title: '123232323232323', completed: false, children: []},
        {id: '2', body: '122333', title: '12323232323', completed: false, children: []},
        {id: '3', body: '32', title: '1', completed: false, children: []},
        {id: '4', body: '32323', title: '123', completed: false, children: [
            {id: '4.1', body: '123', title: '123', completed: false, children: []},
            {id: '4.2', body: '123', title: '123', completed: false, children: []},
            {id: '4.3', body: '123', title: '123', completed: false, children: [
                {id: '4.3.1', body: '123', title: '123', completed: false, children: []},
                {id: '4.3.2', body: '123', title: '123', completed: false, children: []},
                {id: '4.3.3', body: '123', title: '123', completed: false, children: []}
            ]}
        ]},
    ] 

    selectedTask: Task | null = null;
  
    constructor() {
        makeAutoObservable(this)
    }

    addTask(task: Task) {
        this.tasks.push(task)
    }

    deleteTask(task: Task, tasks : Task[] = this.tasks){
        const newTasks = tasks.filter(t => {
            if(task.id === t.id){
                return false;
            } else if(t.children && t.children.length > 0){
                t.children = this.deleteTask(task, t.children);
                return true;
            }
            return true;
        })

        return newTasks
    }

    updateTask(task: Task, title: string, body: string) {
        task.title = title;
        task.body = body;
    }

    completeTask(task: Task, completed: boolean) {
        task.completed = completed;
        if (task.children && task.children.length > 0) {
            for (let subtask of task.children) {
                this.completeTask(subtask, completed);
            }
        }
    }

    setSelectedTask(task:Task) {
        this.selectedTask = task;
    }

}

export default new TaskStore();