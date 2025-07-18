import { useState } from 'react';
import type { ClientFormData } from '../components/data/Clints';
import ClientForm from '../components/Forms/ClientForm';
import ClientsTable from '../components/Tables/ClintsTable';
import { useToast } from '../hooks/useToast';
import { ClientEntry } from '../components/data/Clints';

const ClientManagement = () => {
    const [clients, setClients] = useState<ClientFormData[]>(ClientEntry);
    const toast = useToast();
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
            toast("success", "Client updated successfully ✅");
        } else {
            setClients([...clients, { ...data, leadstatus: 'New' }]);
            toast("success", "Client added successfully ✅");
        }
        setIsModalOpen(false);
        setEditingIndex(null);
    };

    const handleStatusChange = (index: number, newStatus: string) => {
        const updated = [...clients];
        updated[index].leadstatus = newStatus;
        setClients(updated);
        toast("info", `Lead status changed to "${newStatus}"`);
    };

    const handleEditClick = (index: number) => {
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        const deletedClient = clients[index];
        setClients(prev => prev.filter((_, i) => i !== index));
        toast("error", `Deleted client: ${deletedClient.name}`);
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
