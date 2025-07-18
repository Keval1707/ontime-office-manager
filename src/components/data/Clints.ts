export interface ClientFormData {
    id: number;
    name: string;
    companyName: string;
    phone: string;
    email: string;
    address: string;
    serviceRequired: string;
    notes: string;
    leadstatus: string;
    updateOnWhatsApp?: boolean;
}

export interface ClientsTableProps {
    clients: ClientFormData[];
    onStatusChange: (index: number, newStatus: string) => void;
    onEdit?: (index: number) => void;
    handleDelete: (index: number) => void;
}

export const ClientEntry: ClientFormData[] = [
    {
        id: 1,
        name: 'Keval Satani',
        companyName: 'TechCorp',
        phone: '123-456-7890',
        email: 'john@techcorp.com',
        address: '123 Tech St.',
        serviceRequired: 'Web Development',
        notes: 'VIP Client',
        leadstatus: 'New',
        updateOnWhatsApp: false,
    },
    {
        id: 2,
        name: 'Keval',
        companyName: 'DesignX',
        phone: '987-654-3210',
        email: 'jane@designx.com',
        address: '456 Design Ave.',
        serviceRequired: 'Graphic Design',
        notes: 'Urgent project',
        leadstatus: 'New',
        updateOnWhatsApp: false,
    },
];
