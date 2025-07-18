import { type ClientFormData} from "./Clints"
export interface ProjectFormData {
    title: string;
    client: string;
    startDate: string;
    endDate: string;
    progress: number;
    status: "Ongoing" | "Paused" | "Completed";
    notes?: string;
}

export interface ProjectFormProps {
    defaultValues?: ProjectFormData;
    statusOptions: string[];
    clientOptions: ClientFormData[];
    onSubmit: (data: ProjectFormData) => void;
    onCancel: () => void;
}
export interface ProjectTableProps {
    projects: ProjectFormData[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

export const ProjectEntrys: ProjectFormData[] = [
    {
        title: "Website Redesign",
        client: "1",
        startDate: "2025-07-01",
        endDate: "2025-07-31",
        progress: 45,
        status: "Ongoing",
        notes: "Focus on responsive design and performance.",
    },
    {
        title: "Mobile App Launch",
        client: "2",
        startDate: "2025-06-15",
        endDate: "2025-08-15",
        progress: 80,
        status: "Paused",
        notes: "Awaiting client feedback on beta version.",
    },
]