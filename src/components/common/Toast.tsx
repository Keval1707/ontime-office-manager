import { X } from "lucide-react"; // If using lucide-react
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

const typeStyles = {
  success: "bg-green-100 text-green-800 border-green-400",
  error: "bg-red-100 text-red-800 border-red-400",
  info: "bg-blue-100 text-blue-800 border-blue-400",
};

const icons = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
};

const Toast = ({ message, type }: ToastProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-2 border rounded-xl shadow font-roboto text-sm max-w-sm ${typeStyles[type]}`}
    >
      <span className="flex items-center gap-2">
        <span>{icons[type]}</span>
        <span>{message}</span>
      </span>
      <button onClick={() => setVisible(false)} className="text-xl leading-none">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
