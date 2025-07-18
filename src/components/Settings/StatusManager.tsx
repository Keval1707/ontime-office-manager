import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useToast } from "../../hooks/useToast";

export interface StatusItem {
  name: string;
  desc: string;
}

interface StatusManagerProps {
  title: string;
  initialStatuses: StatusItem[];
  onUpdate?: (statuses: StatusItem[]) => void; 
}

const StatusManager = ({ title, initialStatuses, onUpdate }: StatusManagerProps) => {
  const [statuses, setStatuses] = useState<StatusItem[]>(initialStatuses);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const toast = useToast()

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (trimmed && !statuses.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...statuses, { name: trimmed, desc: newDesc.trim() }];
      setStatuses(updated);
      onUpdate?.(updated);
      toast("success", "Status added successfully.")
      setNewName("");
      setNewDesc("");
    } else {
      toast("error", "Status name is required or already exists.");
    }
  };

  const handleDelete = (index: number) => {
    const updated = statuses.filter((_, i) => i !== index);
    setStatuses(updated);
    onUpdate?.(updated);
    toast("error", "Status deleted.")
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditName(statuses[index].name);
    setEditDesc(statuses[index].desc);
  };

  const handleSaveEdit = () => {
    const nameTrimmed = editName.trim();
    if (nameTrimmed) {
      const updated = [...statuses];
      updated[editingIndex!] = { name: nameTrimmed, desc: editDesc.trim() };
      setStatuses(updated);
      onUpdate?.(updated);
      setEditingIndex(null);
      toast("info", "Status updated.")
      setEditName("");
      setEditDesc("");
    }
  };

  return (
    <div className="font-roboto text-text text-sm animate-fadeIn space-y-6">
      <h2 className="text-title font-semibold">{title}</h2>

      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Status name"
          className="flex-1 border border-border rounded px-4 py-2 bg-background"
        />
        <input
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder="Description (optional)"
          className="flex-1 border border-border rounded px-4 py-2 bg-background"
        />
        <button
          onClick={handleAdd}
          className="bg-sidebar text-sidebarText hover:bg-hover px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-border bg-white max-w-4xl">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface text-muted text-left text-sm font-medium">
            <tr>
              <th className="px-4 py-3 w-1/4">Status</th>
              <th className="px-4 py-3 w-2/4">Description</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-text text-sm">
            {statuses.length ? (
              statuses.map((status, index) => (
                <tr key={index} className="hover:bg-surface transition">
                  <td className="px-4 py-3">
                    {editingIndex === index ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full border border-border rounded px-3 py-2 bg-background"
                      />
                    ) : (
                      <span className="font-medium">{status.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingIndex === index ? (
                      <input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full border border-border rounded px-3 py-2 bg-background"
                      />
                    ) : (
                      <span className="text-muted">{status.desc || "—"}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {editingIndex === index ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="text-muted hover:text-text"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-muted py-6">
                  No statuses added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusManager;
