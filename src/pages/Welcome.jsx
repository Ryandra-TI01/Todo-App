import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const { user } = useAuth();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Selamat datang di Todo App</h1>
      {!user ? (
        <div className="space-x-4">
          <Link to="/login" className="text-purple-700 font-semibold underline">Login</Link>
          <Link to="/register" className="text-purple-700 font-semibold underline">Register</Link>
        </div>
      ) : (
        <p className="text-green-600">Kamu sudah login sebagai <strong>{user.name}</strong>.</p>
      )}
    </div>
  );
}
