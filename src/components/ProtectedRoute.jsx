import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUserinfoStore from "../useUserinfoStore";
import fetchData from "../utility/fetchData";

const ProtectedRoute = ({ isProtected, children }) => {
  const { addUserInfo } = useUserinfoStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const id = localStorage.getItem('id');
      if (accessToken) {
        try {
          const response = await fetchData(`profiles/${id}`);
          const data = await response.results;
          
          // Update Zustand store with fetched data

          // setUsername(data.username || '');
          // setIsFreelancer(data.isFreelancer || false);
          // setName(data.name || '');
          // setPhoneNumber(data.phoneNumber || '');
          // setAbout(data.about || '');
          addUserInfo(data)
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const isRegistered = !!localStorage.getItem('accessToken');

  if (isProtected && !isRegistered) {
    return <Navigate to="/register" />;
  }

  return children;
};

export default ProtectedRoute;
