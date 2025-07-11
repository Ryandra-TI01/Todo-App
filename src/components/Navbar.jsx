import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await logout();
        toast.success("Logout successful!");
        navigate("/");
    } catch (error) {
        toast.error("Logout failed!");
    }
  };

  return (
    <nav className="flex justify-between items-center bg-purple-700 text-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold">React Todo App</h1>
      <div className="flex gap-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
