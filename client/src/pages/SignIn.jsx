import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded-lg p-8 w-96 flex flex-col gap-4 bg-white"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Sign In
        </h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-black"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-black"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
