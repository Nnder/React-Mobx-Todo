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
  
    constructor() {
        makeAutoObservable(this)
    }

    addTask(task: Task) {
        this.tasks.push(task)
    }

    deleteTask(task: Task) {
        this.tasks = this.tasks.filter(t => t.id!== task.id)
    }

    updateTask(task: Task) {
        this.tasks = this.tasks.map(t => t.id === task.id? task : t)
    }

    completeTask(task: Task, completed: boolean) {
        task.completed = completed;
        console.log(task.completed)
        if (task.children && task.children.length > 0) {
            for (let subtask of task.children) {
                this.completeTask(subtask, completed);
            }
        }
    }

}

export default new TaskStore();