import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtechedRoutes = ({ isAdmin }) => {
    const location = useLocation();
    const { isAuthenticated, user } = useSelector(state => state.users);

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }

    // if (isAuthenticated && user) {
    //     if (user.role === "User" || user.role === "Practice") {
    //         return <Navigate to="/userDashboard" />;
    //     }
    //     else {
    //         return <Outlet />;
    //     }
    // } else {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }
    // if (isAuthenticated === false) {
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    // }

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" />
    // }

    // return <Outlet />;


    // ------------------------------------

    if (!isAuthenticated) {
        if (isAdmin) {
            return <Navigate to="/ctrl-center/login" state={{ from: location }} replace />;
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (isAdmin) {
        if (isAuthenticated && user) {
            if (user.role === "User" || user.role === "Practice") {
                return <Navigate to="/userDashboard" />;
            }
            else {
                return <Outlet />;
            }
        } else {
            return <Navigate to="/" state={{ from: location }} replace />;
        }
    }

    if (!isAdmin) {
        if (isAuthenticated && user) {
            if (user.role === "Admin" || user.role === "Super-Admin") {
                return <Navigate to="/dashboard" />;
            }
            else {
                return <Outlet />;
            }
        } else {
            return <Navigate to="/" state={{ from: location }} replace />;
        }
    }

}

export default ProtechedRoutes;