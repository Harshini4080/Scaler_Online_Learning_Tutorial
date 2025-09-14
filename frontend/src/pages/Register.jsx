import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    courseTitle: "",
    courseDescription: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate instructor-specific fields
      if (form.role === "Instructor" && (!form.courseTitle || !form.courseDescription)) {
        alert("Please provide a course title and description.");
        return;
      }

      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate(res.data.user.role === "Instructor" ? "/instructor" : "/student");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Name</label>
            <input
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

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

          {/* Role */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Role</label>
            <select
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option>Student</option>
              <option>Instructor</option>
            </select>
          </div>

          {/* 🔹 Instructor-only fields */}
          {form.role === "Instructor" && (
            <>
              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 font-medium">
                  Course Title
                </label>
                <input
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  placeholder="e.g. React Fundamentals"
                  value={form.courseTitle}
                  onChange={(e) => setForm({ ...form, courseTitle: e.target.value })}
                  required={form.role === "Instructor"}
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 font-medium">
                  Course Description
                </label>
                <textarea
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  placeholder="Write a short course description..."
                  value={form.courseDescription}
                  onChange={(e) =>
                    setForm({ ...form, courseDescription: e.target.value })
                  }
                  required={form.role === "Instructor"}
                />
              </div>
            </>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
