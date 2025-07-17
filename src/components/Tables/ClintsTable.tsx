import React, { useState, useMemo } from 'react';

interface Client {
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

interface ClientsTableProps {
  clients: Client[];
  onStatusChange: (index: number, newStatus: string) => void;
  onEdit?: (index: number) => void;
    handleDelete: (index: number) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients, onStatusChange, onEdit,handleDelete }) => {
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  const uniqueServices = useMemo(() =>
    [...new Set(clients.map(c => c.serviceRequired).filter(Boolean))], [clients]);

  const filteredClients = useMemo(() =>
    clients.filter(c =>
      (c.name + c.companyName + c.email + c.phone).toLowerCase().includes(search.toLowerCase()) &&
      (!serviceFilter || c.serviceRequired === serviceFilter)
    ), [clients, search, serviceFilter]);

  return (
    <div className="space-y-4 font-roboto">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        >
          <option value="">All Services</option>
          {uniqueServices.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gray-50">
            <tr className="text-xs text-gray-600 uppercase tracking-wider">
              {['Name', 'Company', 'Phone', 'Email', 'Service', 'Notes', 'Status', 'WhatsApp', 'Edit'].map(header => (
                <th key={header} className="px-4 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredClients.length ? filteredClients.map((c, i) => {
              const actualIndex = clients.findIndex(x => x.email === c.email && x.phone === c.phone);
              return (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.companyName}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.serviceRequired}</td>
                  <td className="px-4 py-2">{c.notes}</td>
                  <td className="px-4 py-2">
                    <select
                      value={c.leadstatus}
                      onChange={(e) => onStatusChange(actualIndex, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      {['New', 'In Progress', 'Converted', 'Closed'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {c.updateOnWhatsApp ? '✅' : '❌'}
                  </td>
                  <td className="px-4 py-2">
                    <button onClick={() => onEdit?.(actualIndex)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(actualIndex)} className="text-red-600 hover:underline ml-2">Delete</button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={9} className="text-center text-gray-400 py-4">No matching records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable;
