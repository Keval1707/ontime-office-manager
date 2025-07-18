import { useEffect, useState, type ChangeEvent } from "react";
import type { PaymentEntry, PaymentFormProps } from "../data/payments";
import { ClientEntry } from "../data/Clints";
import { useToast } from "../../hooks/useToast";
const paymentModes = ['UPI', 'Bank', 'Cash', 'Other'] as const;
const statuses = ['Paid', 'Pending', 'Partial'] as const;

const PaymentForm = ({ initialData, onSubmit, onCancel }: PaymentFormProps) => {
  const [formData, setFormData] = useState<PaymentEntry>(
    initialData || {
      id: crypto.randomUUID(),
      clientName: "",
      amount: 0,
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMode: "UPI",
      status: "Pending",
      notes: "",
    }
  );
  const toast = useToast()

  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const cleanAmount = value.replace(/^0+(?=\d)/, '');
      setFormData((prev) => ({
        ...prev,
        [name]: cleanAmount === '' ? 0 : parseInt(cleanAmount),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "clientName" && value.trim() !== "") {
      const filtered = ClientEntry
        .map((c) => c.name)
        .filter((n) => n.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered);
    } else if (name === "clientName") {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setFormData((prev) => ({ ...prev, clientName: name }));
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientName.trim()) {
      toast("error", "Client name is required");
      return;
    }

    if (formData.amount <= 0) {
      toast("error", "Amount must be greater than 0");
      return;
    }

    onSubmit(formData);
    toast("success", "Payment added successfully");
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 relative">
      <div className="relative">
        <input
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          placeholder="Client Name"
          className="input w-full"
          autoComplete="off"
          required
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded mt-1 shadow max-h-40 overflow-y-auto">
            {suggestions.map((sug, idx) => (
              <li
                key={idx}
                onClick={() => handleSuggestionClick(sug)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {sug}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="input"
        required
      />

      <input
        name="paymentDate"
        type="date"
        value={formData.paymentDate}
        onChange={handleChange}
        className="input"
      />

      <select
        name="paymentMode"
        value={formData.paymentMode}
        onChange={handleChange}
        className="input"
      >
        {paymentModes.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="input"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <input
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="input"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            onCancel();
            toast("info", "Payment form cancelled");
          }}
          className="btn-secondary"
        >
          Cancel
        </button>

        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
