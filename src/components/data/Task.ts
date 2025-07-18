import {type ClientFormData} from './Clints'
export interface TaskFormData {
    title: string;
    description: string;
    deadline: string;
    priority: 'Low' | 'Medium' | 'High';
    relatedClient?: string;
    status?: string;
}
export interface status {
    id: string,
    status: string
}

export const TaskStatusOptions = [
    { id: "1", status: 'Pending' },
    { id: "2", status: 'In Progress' },
    { id: "3", status: 'Done' },
    { id: "4", status: 'test' },
]
export const TaskEntry: TaskFormData[] = [
    {
        title: 'Fix Landing Page',
        description: 'Improve mobile responsiveness',
        deadline: '2025-08-01',
        priority: 'High',
        status: 'Pending',
        relatedClient: 'Keval',
    },
    {
        title: 'Update Logo',
        description: 'Client requested new branding',
        deadline: '2025-08-05',
        priority: 'Medium',
        status: 'In Progress',
        relatedClient: 'Keval Satani',
    }
]
export interface TaskProps {
    tasks: TaskFormData[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    handleStatusChange: (index: number, newStatus: string) => void;
    status: status[]
}


export interface TaskFormProps {
    onSubmit: (data: TaskFormData) => void;
    initialData?: TaskFormData;
    onCancel: () => void;
    TaskStatusOptions?: status[];
    clientOptions?: ClientFormData[];
}
