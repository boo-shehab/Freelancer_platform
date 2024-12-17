import { useEffect, useState } from 'react'
import Register from './screens/register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserInfo from './screens/userInfo/UserInfo';
import DashboardScreen from './screens/dashboardScreen/DashboardScreen';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Login from './screens/login/login';
import Setting from './screens/SettingScreen/Setting';
import useUserinfoStore from './useUserinfoStore';



function App() {
  const {projects} = useUserinfoStore()

  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/user-info",
      element: <UserInfo />,
    },
    {
      path: "/Login",
      element: <Login />
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute isProtected={true}>
              <HomeScreen  />
             </ProtectedRoute>
            
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute isProtected={true}>
              <ProfileScreen />
             </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute isProtected={true}>
              <DashboardScreen />
             </ProtectedRoute>
          ),
        },
        {
          path: "/setting",
          element: (
            <ProtectedRoute isProtected={true}>
            <Setting/>
             </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    console.log('projects: ', projects);
    
  }, [projects])
  return (
    <>
      <RouterProvider router={router} />
  </>
  )
}

export default App
