import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate(res.data.user.role === "Instructor" ? "/instructor" : "/student");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 px-4 pt-16">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md max-h-screen overflow-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
