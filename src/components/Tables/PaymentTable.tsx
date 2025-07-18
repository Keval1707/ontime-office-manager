import { Pencil, Trash2 } from "lucide-react";
import type { PaymentEntry } from "../data/payments";

interface Props {
  payments: PaymentEntry[];
  onEdit: (entry: PaymentEntry) => void;
  onDelete: (id: string) => void;
}

const PaymentTable = ({ payments, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-border animation-fadeIn">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface text-muted text-left text-sm font-medium">
          <tr>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Mode</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Notes</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm text-text">
          {payments.length ? (
            payments.map((entry) => (
              <tr key={entry.id} className="hover:bg-surface transition">
                <td className="px-4 py-2">{entry.clientName}</td>
                <td className="px-4 py-2">₹{entry.amount}</td>
                <td className="px-4 py-2">{entry.paymentDate}</td>
                <td className="px-4 py-2">{entry.paymentMode}</td>
                <td className="px-4 py-2">{entry.status}</td>
                <td className="px-4 py-2">{entry.notes}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => onEdit(entry)} className="text-blue-600 hover:text-blue-800">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(entry.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-muted py-4">
                No payment records available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
