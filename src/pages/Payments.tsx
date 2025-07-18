import { useState } from "react";
import { type PaymentEntry, payments as initialData } from '../components/data/payments';
import PaymentForm from "../components/Forms/PaymentForm";
import PaymentTable from "../components/Tables/PaymentTable";
import Modal from "../components/Modal";

const Payments = () => {
    const [payments, setPayments] = useState<PaymentEntry[]>(initialData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<PaymentEntry | null>(null);

    const handleSave = (entry: PaymentEntry) => {
        setPayments(prev => {
            const exists = prev.find(p => p.id === entry.id);
            return exists
                ? prev.map(p => (p.id === entry.id ? entry : p))
                : [...prev, entry];
        });
        setModalOpen(false);
        setEditing(null);
    };

    const handleDelete = (id: string) => {
        setPayments(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="p-6 fadeIn">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-title">Payments</h1>
                <button onClick={() => { setEditing(null); setModalOpen(true); }} className="btn-primary">
                    + Add Payment
                </button>
            </div>

            <PaymentTable
                payments={payments}
                onEdit={(entry) => {
                    setEditing(entry);
                    setModalOpen(true);
                }}
                onDelete={handleDelete}
            />

            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={editing ? "Edit Payment" : "Add Payment"}
                >
                    <PaymentForm
                        initialData={editing || undefined}
                        onSubmit={handleSave}
                        onCancel={() => setModalOpen(false)}
                    />
                </Modal>

            )}
        </div>
    );
};

export default Payments;
