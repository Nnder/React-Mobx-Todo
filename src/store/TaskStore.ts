import { makeAutoObservable } from 'mobx'
import { Task } from '../types/types'

class TaskStore {
    tasks: Task[] = [
        {id: '1', title: 'Задача 1', body: 'Тело задача 1', completed: false, children: [], parent: null},
        {id: '2', title: 'Задача 2', body: 'Тело задача 2', completed: false, children: [], parent: null},
        {id: '3', title: 'Задача 3', body: 'Тело задача 3', completed: false, children: [], parent: null},
        {id: '4', title: 'Задача 4', body: 'Тело задача 4', completed: false, children: [], parent: null},
    ] 

    selectedTask: Task | null = null;
  
    constructor() {
        makeAutoObservable(this)
    }

    addTask(task: Task) {
        this.tasks.push(task)
    }

    addSubTask(parent: Task, task: Task) {
        parent.children.push(task)
        this.completeParent(parent)
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
    }

    updateTask(task: Task, title: string, body: string) {
        task.title = title;
        task.body = body;
    }

    completeParent(task: Task){
        // если каждая дочерняя задача выполнена то родительская задача тоже выполняется
        task.completed = task.children.every(child => child.completed === true);
        if (task.parent) {
            this.completeParent(task.parent);
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
        }
    }

    setSelectedTask(task:Task) {
        this.selectedTask = task;
    }
}

export default new TaskStore();