import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition">
          <span className="text-2xl font-extrabold">🎓</span>
          <span className="font-bold text-xl">Online Learning Tutorial</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-3">
          {!token && (
            <>
              <Link
                to="/login"
                className={`px-5 py-2 rounded-full font-semibold transition hover:scale-105 hover:shadow-md ${
                  isActive("/login") ? "bg-white text-blue-600 shadow-lg" : "bg-white text-blue-600"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-5 py-2 rounded-full font-semibold transition hover:scale-105 hover:shadow-md ${
                  isActive("/register") ? "bg-white text-blue-600 shadow-lg" : "bg-white text-blue-600"
                }`}
              >
                Register
              </Link>
            </>
          )}

          {token && role === "Instructor" && (
            <Link
              to="/instructor"
              className="px-5 py-2 rounded-full bg-white text-blue-600 font-semibold hover:scale-105 hover:shadow-md transition"
            >
              Instructor Dashboard
            </Link>
          )}

          {token && role === "Student" && (
            <Link
              to="/student"
              className="px-5 py-2 rounded-full bg-white text-blue-600 font-semibold hover:scale-105 hover:shadow-md transition"
            >
              Student Dashboard
            </Link>
          )}

          {token && (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 hover:shadow-md transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
