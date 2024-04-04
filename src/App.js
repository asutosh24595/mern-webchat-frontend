import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat";
import UsernameCreation from "./components/UsernameCreation";

export default function App() {
  const router = createBrowserRouter([
    { index: true, element: <LoginForm /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/chat/:username", element: <Chat /> },
    { path: "/create-username", element: <UsernameCreation /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
