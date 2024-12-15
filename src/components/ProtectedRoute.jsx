import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isProtected, children }) => {
    const userinfo = localStorage.getItem('accessToken');
    const isRegistered = !!userinfo;
    const hasCompletedInfo = userinfo?.userInfo !== null;

  if (isProtected) {
    if (!isRegistered) {
      return <Navigate to="/login" />;
    }
    if (isRegistered && !hasCompletedInfo) {
      return <Navigate to="/user-info" />;
    }
  }

  return children;
};

export default ProtectedRoute;
