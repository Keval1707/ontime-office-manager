import { useState, useEffect } from 'react';
import {type ClientFormData} from '../data/Clints'

interface Props {
  onSubmit: (data: ClientFormData) => void;
  initialData?: Partial<ClientFormData>;
  onCancel?: () => void;
}

const ClientForm = ({ onSubmit, initialData = {}, onCancel }: Props) => {
  const [form, setForm] = useState<ClientFormData>({
    name: '', companyName: '', phone: '', email: '',
    address: '', serviceRequired: '', notes: '',
    leadstatus: 'New', updateOnWhatsApp: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm(prev => ({ ...prev, ...initialData, leadstatus: initialData.leadstatus || 'New' }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<any>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={e => (e.preventDefault(), onSubmit(form))} className="space-y-4 text-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" required value={form.name} onChange={handleChange} placeholder="Name" className="input" />
        <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="input" />
        <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="Phone" className="input" />
        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email" className="input" />
        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" rows={2} className="input md:col-span-2 resize-none" />
        <input name="serviceRequired" value={form.serviceRequired} onChange={handleChange} placeholder="Service Required" className="input md:col-span-2" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" rows={3} className="input md:col-span-2 resize-none" />
        <select name="leadstatus" value={form.leadstatus} onChange={handleChange} className="input">
          {['New', 'Follow Up', 'Converted', 'Closed'].map(status => <option key={status}>{status}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="updateOnWhatsApp"
          checked={form.updateOnWhatsApp}
          onChange={e => setForm(prev => ({ ...prev, updateOnWhatsApp: e.target.checked }))}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="updateOnWhatsApp" className="text-sm text-gray-700">
          Notify client via WhatsApp
        </label>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        )}
        <button type="submit" className="btn-primary">Save</button>
      </div>
    </form>
  );
};

export default ClientForm;