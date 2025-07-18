import { useToast } from "../hooks/useToast";

const Temp = () => {
  const toast = useToast();

  return (
    <div className="p-6 space-x-2">
      <button onClick={() => toast("success", "Login successful")} className="bg-green-600 text-white px-3 py-1 rounded">
        Show Success
      </button>
      <button onClick={() => toast("error", "Invalid email or password")} className="bg-red-600 text-white px-3 py-1 rounded">
        Show Error
      </button>
      <button onClick={() => toast("info", "This is some info")} className="bg-blue-600 text-white px-3 py-1 rounded">
        Show Info
      </button>
    </div>
  );
};

export default Temp;
