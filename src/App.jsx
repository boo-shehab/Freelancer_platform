import { useState } from 'react'
import Register from './screens/register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserInfo from './screens/userInfo/UserInfo';
import HomeScreen from './screens/HomeScreen/Home';

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
      path: "/",
      element: <HomeScreen />,
    },
    // {
    //   element: <MainLayout />,
    //   children: [
    //     {
    //       path: "/",
    //       element: (
    //         <ProtectedRoute isProtected={true}>
    //           <Home />
    //         </ProtectedRoute>
    //       ),
    //     },
    //     {
    //       path: "/profile",
    //       element: (
    //         <ProtectedRoute isProtected={true}>
    //           <Profile />
    //         </ProtectedRoute>
    //       ),
    //     },
    //     {
    //       path: "/dashboard",
    //       element: (
    //         <ProtectedRoute isProtected={true}>
    //           <Home />
    //         </ProtectedRoute>
    //       ),
    //     },
    //     {
    //       path: "/setting",
    //       element: (
    //         <ProtectedRoute isProtected={true}>
    //           <Home />
    //         </ProtectedRoute>
    //       ),
    //     },
    //   ],
    // },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
