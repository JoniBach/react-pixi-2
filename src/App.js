import "./App.css";
import { useUser } from "./contexts/UserContext";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { openRoutes, protectedRoutes } from "./routes";

function App() {
  const { activeUser } = useUser();
  console.log(activeUser);
  const protectedRoute = activeUser?.username ? "/dash" : "/signin";
  const routes = activeUser?.username ? protectedRoutes : openRoutes;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={protectedRoute} />,
    },
    ...routes,
  ]);

  return <RouterProvider router={router} />;
}

export default App;
