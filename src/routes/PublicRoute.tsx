import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PageTransition from "../components/PageTransition";

export default function PublicRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <PageTransition>
            <Outlet />
        </PageTransition>
    );
}