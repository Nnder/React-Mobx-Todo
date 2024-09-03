export interface Task {
    id: string;
    title: string;
    body: string;
    completed: boolean;
    parent: Task | null;
    children: Task[];
}