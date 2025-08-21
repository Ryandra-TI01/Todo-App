import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "./Route";
import Loading from "../components/common/Loading";

export default function PrivateRoute() {
  const { isAuthenticated,loading } = useAuth();
  if(loading) return <Loading/>
  
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
}
