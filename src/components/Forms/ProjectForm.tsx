import { useState, useEffect } from "react";
import type { ProjectFormData, ProjectFormProps } from "../data/Project";

const ProjectForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  statusOptions,
  clientOptions,
}: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>(
    defaultValues || {
      title: "",
      client: "",
      startDate: "",
      endDate: "",
      progress: 0,
      status: "Ongoing",
      notes: "",
    }
  );

  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (formData.client && clientOptions.length > 0) {
      const filtered = clientOptions
        .map((c) => c.name)
        .filter((name) =>
          name.toLowerCase().includes(formData.client.toLowerCase())
        );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [formData.client, clientOptions]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "progress" ? +value : value,
    }));
  };

  const handleSuggestionClick = (value: string) => {
    setFormData((prev) => ({ ...prev, client: value }));
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {[
        { label: "Title", name: "title", type: "text" },
        { label: "Start Date", name: "startDate", type: "date" },
        { label: "End Date", name: "endDate", type: "date" },
        { label: "Progress (%)", name: "progress", type: "number" },
      ].map(({ label, name, type }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-muted">{label}</label>
          <input
            type={type}
            name={name}
            value={(formData as any)[name]}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded"
            required
          />
        </div>
      ))}

      <div className="relative">
        <label className="block text-sm font-medium text-muted">Client</label>
        <input
          type="text"
          name="client"
          value={formData.client}
          onChange={handleChange}
          placeholder="Enter or select client"
          className="w-full p-2 border border-border rounded"
          autoComplete="off"
          required
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-border w-full mt-1 rounded shadow text-sm">
            {suggestions.map((name) => (
              <li
                key={name}
                onClick={() => handleSuggestionClick(name)}
                className="px-3 py-1 cursor-pointer hover:bg-hover"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border border-border rounded"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-muted text-white rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-sidebar text-white rounded hover:bg-hover"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
