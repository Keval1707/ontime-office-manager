// data/Payment

export interface PaymentEntry {
  id: string;
  clientName: string;
  amount: number;
  paymentDate: string;
  paymentMode: 'UPI' | 'Bank' | 'Cash' | 'Other';
  status: 'Paid' | 'Pending' | 'Partial';
  notes?: string;
}
export interface PaymentFormProps {
  initialData?: PaymentEntry;
  onSubmit: (data: PaymentEntry) => void;
  onCancel: () => void;
}

export const payments: PaymentEntry[] = [
  {
    id: '1',
    clientName: 'Client A',
    amount: 5000,
    paymentDate: '2025-07-10',
    paymentMode: 'Bank',
    status: 'Paid',
    notes: 'Initial payment',
  },
  {
    id: '2',
    clientName: 'Client B',
    amount: 10000,
    paymentDate: '2025-07-15',
    paymentMode: 'UPI',
    status: 'Pending',
    notes: 'test payment',
  },
];
