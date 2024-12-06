import { useState } from 'react'
import Register from './screens/register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserInfo from './screens/userInfo/UserInfo';
import DashboardScreen from './screens/dashboardScreen/DashboardScreen';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomeScreen from './screens/HomeScreen/homeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import Login from './screens/login/login';
function App() {
  
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
            // <ProtectedRoute isProtected={true}>
              <HomeScreen />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            // <ProtectedRoute isProtected={true}>
              <ProfileScreen />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            // <ProtectedRoute isProtected={true}>
              <DashboardScreen />
            // </ProtectedRoute>
          ),
        },
        // {
        //   path: "/setting",
        //   element: (
        //     <ProtectedRoute isProtected={true}>
        //       <Home />
        //     </ProtectedRoute>
        //   ),
        // },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
