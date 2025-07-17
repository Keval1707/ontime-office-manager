interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
