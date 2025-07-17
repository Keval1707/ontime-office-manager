import { useState } from 'react';
import type { ClientFormData } from '../components/Forms/ClientForm';
import ClientForm from '../components/Forms/ClientForm';
import ClientsTable from '../components/Tables/ClintsTable';

const ClientManagement = () => {
    const [clients, setClients] = useState<ClientFormData[]>([
        {
            name: 'John Doe',
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
            name: 'Jane Smith',
            companyName: 'DesignX',
            phone: '987-654-3210',
            email: 'jane@designx.com',
            address: '456 Design Ave.',
            serviceRequired: 'Graphic Design',
            notes: 'Urgent project',
            leadstatus: 'New',
            updateOnWhatsApp: false,
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const openAddClientModal = () => {
        setEditingIndex(null);
        setIsModalOpen(true);
    };

    const handleClientFormSubmit = (data: ClientFormData) => {
        if (editingIndex !== null) {
            const updated = [...clients];
            updated[editingIndex] = { ...data, leadstatus: updated[editingIndex].leadstatus };
            setClients(updated);
        } else {
            setClients([...clients, { ...data, leadstatus: 'New' }]);
        }
        setIsModalOpen(false);
        setEditingIndex(null);
    };

    const handleStatusChange = (index: number, newStatus: string) => {
        const updated = [...clients];
        updated[index].leadstatus = newStatus;
        setClients(updated);
    };

    const handleEditClick = (index: number) => {
        setEditingIndex(index);
        setIsModalOpen(true);
    };
    
    const handleDelete = (index: number) => {
        setClients(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-6 font-roboto">
            <div className="flex justify-end items-center">
                {/* <h1 className="text-2xl font-semibold">Client Management</h1> */}
                <button
                    onClick={openAddClientModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Add Client
                </button>
            </div>

            <ClientsTable
                clients={clients.map(client => ({
                    ...client,
                    leadstatus: client.leadstatus || 'New', // ✅ default fallback
                }))}
                onStatusChange={handleStatusChange}
                onEdit={handleEditClick}
                handleDelete={handleDelete}
            />


            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-3 text-xl font-bold text-gray-400 hover:text-gray-600"
                        >
                            &times;
                        </button>
                        <ClientForm
                            onSubmit={handleClientFormSubmit}
                            initialData={editingIndex !== null ? clients[editingIndex] : undefined}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientManagement;
