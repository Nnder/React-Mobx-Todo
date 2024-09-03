import { makeAutoObservable } from 'mobx'
import { Task } from '../types/types'

class TaskStore {
    tasks: Task[] = []
    selectedTask: Task | null = null;

    constructor() {
        makeAutoObservable(this)
        this.setStore()
    }

    private clearParent(tasks: Task[]) {
        // удаляем все parent для children из-за циклических ссылок
        tasks.map(task => {
            task.parent = null
            if(task.children){
                this.clearParent(task.children)
            }
        })
        return tasks
    }

    private setParent(tasks: Task[], parent: Task | null = null) {
        if(tasks.length === 0) return
        // устанавливаем parent для children
        tasks.forEach(task => {
            task.parent = parent
            if(task.children && task.children.length > 0){
                this.setParent(task.children, task)
            }
        })
    }

    clearStorage(){
        localStorage.setItem('tasks', "")
        localStorage.setItem('selectedTask', "")
    }

    setStore(){
        const storedTasks = localStorage.getItem('tasks');
        const storedSelectedTask = localStorage.getItem('selectedTask');

        this.tasks = storedTasks ? JSON.parse(storedTasks) : []

        this.setParent(this.tasks)
        this.selectedTask = storedSelectedTask ? JSON.parse(storedSelectedTask) : null;
    }

    saveStore(){
        const tasks = this.clearParent([...this.tasks])
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('selectedTask', JSON.stringify(this.selectedTask))
        this.setParent(this.tasks)
    }

    addTask(task: Task) {
        this.tasks.push(task)
        this.saveStore()
    }

    addSubTask(parent: Task, task: Task) {
        parent.children.push(task)
        this.completeParent(parent)
        this.saveStore()
    }

    getTaskById(id: string, tasks: Task[] = this.tasks): Task | null {
        for (let task of tasks) {
            if (task.id === id) {
                return task;
            }
            if (task.children.length > 0) {
                const found = this.getTaskById(id, task.children);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    deleteTask(task: Task){
        if(task.parent){
            const filteredTasks = task.parent.children
            .filter(child => child.id !== task.id)

            // после удаления обновить id задач
            filteredTasks.map((child, index) => {
                const ids =  child.id.split('.')
                ids[ids.length - 1] = index.toString()
                child.id = ids.join('.');
            })

            task.parent.children = filteredTasks;
        } else {
            this.tasks = this.tasks.filter((child)=> child.id !== task.id)
        }
        this.saveStore()
    }

    updateTask(task: Task, title: string, body: string) {
        task.title = title;
        task.body = body;
        this.saveStore()
    }

    completeParent(task: Task){
        // если каждая дочерняя задача выполнена то родительская задача тоже выполняется
        task.completed = task.children.every(child => child.completed === true);
        if (task.parent) {
            this.completeParent(task.parent);
        } else {
            this.saveStore()
        }
    }

    completeTask(task: Task, completed: boolean) {
        // обновляем статус и меняем статус у дочерних задач
        task.completed = completed;
        if (task.children && task.children.length > 0) {
            for (let subtask of task.children) {
                this.completeTask(subtask, completed);
            }
        }
        // проверяем может ли родитель изменить свой статус
        if (task.parent) {
            this.completeParent(task.parent);
        } else {
            this.saveStore()
        }
    }

    setSelectedTask(task:Task) {
        this.selectedTask = task;
        this.saveStore()
    }
}

export default new TaskStore();