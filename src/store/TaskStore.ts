import { makeAutoObservable } from 'mobx'
import { Task } from '../types/types'

class TaskStore {
    tasks: Task[] = [
        {id: 1, body: '123', title: '123', completed: false, children: []},
        {id: 2, body: '122333', title: '123', completed: false, children: []},
        {id: 3, body: '32', title: '123', completed: false, children: []},
        {id: 4, body: '32323', title: '123', completed: true, children: []},
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

    completeTask(task: Task) {
        this.tasks = this.tasks.map(t => t.id === task.id? { ...task, completed: !task.completed } : t)
        // пройтись по всем дочерним задачам и изменить их статус?
    }
}

export default new TaskStore();