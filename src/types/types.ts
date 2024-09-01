export interface Task {
    id: string;
    title: string;
    body: string;
    completed: boolean;
    children: Task[];
}