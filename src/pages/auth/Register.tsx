import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, registerUser } from "../../utils/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) navigate("/"); // already logged in? Go to dashboard
  }, [navigate]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const success = registerUser(email, password);
    if (success) {
      navigate("/login"); // ✅ after register, go to login
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center fadeIn">
      <form
        onSubmit={handleRegister}
        className="bg-surface p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-title font-bold mb-6 text-center">Register</h2>

        <input
          type="email"
          className="w-full border border-border p-3 rounded-xl mb-4 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border border-border p-3 rounded-xl mb-6 focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all"
        >
          Register
        </button>

        <p className="text-muted text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
