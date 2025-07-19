import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, loginUser } from "../../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) navigate("/");
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginUser(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center fadeIn">
      <form
        onSubmit={handleLogin}
        className="bg-surface p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-title font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all"
        >
          Login
        </button>

        <p className="text-muted text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
