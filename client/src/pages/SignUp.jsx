import { useState } from "react";
import API from "../api";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });
      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded-lg p-8 w-96 flex flex-col gap-4 bg-white"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Sign Up
        </h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <input
          placeholder="Name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500 text-black"
          required
        />
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
          className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
