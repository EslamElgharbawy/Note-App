import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Layout from "./components/Layout/Layout"
import { Toaster } from "react-hot-toast"
import { RecoilRoot } from "recoil"
import GuestRoute from "./components/GuestRoute/GuestRoute"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProtectedRoute><Home /></ProtectedRoute>,
        },
        { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "login", element: <GuestRoute><Login /></GuestRoute> },
        { path: "signup", element: <GuestRoute><Signup /></GuestRoute> },
      ],
    },
  ]);

  return <>
    <RecoilRoot>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </RecoilRoot>
  </>

}

export default App
