export interface Task {
    id: number;
    title: string;
    body: string;
    completed: boolean;
    children: Task[];
}