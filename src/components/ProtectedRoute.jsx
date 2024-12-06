import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isProtected, children }) => {
    const userinfo = localStorage.getItem('userInfo');
  const isRegistered = !!userinfo;
  const hasCompletedInfo = userinfo?.userInfo !== null;
console.log(isRegistered, hasCompletedInfo);

  if (isProtected) {
    if (!isRegistered) {
      return <Navigate to="/register" />;
    }
    if (isRegistered && !hasCompletedInfo) {
      return <Navigate to="/user-info" />;
    }
  }

  return children;
};

export default ProtectedRoute;
