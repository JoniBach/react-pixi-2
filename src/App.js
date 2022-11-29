import "./App.css";
import { useController, UserContextProvider } from "./contexts/UserContext";
import MapChaser from "./examples/MapChaser";
import GridGame from "./examples/GridGame";
import GameCreator from "./examples/GameCreator";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Styles } from "./examples/Styles";
import GameCreatorOld from "./examples/GameCreatorOld";
import { Nav } from "./components/interface/Nav";
import { SignIn } from "./examples/SignIn";
import { SignUp } from "./examples/SignUp";

function App() {
  const baseSize =
    window.innerHeight > window.innerWidth
      ? window.innerWidth
      : window.innerHeight;
  const size = Math.floor(baseSize / 100) * 100;

  const Navigation = ({ Component, size }) => {
    return (
      <UserContextProvider>
        <Nav />
        <Component size={size} />
      </UserContextProvider>
    );
  };

  const Home = () => {
    return (
      <div>
        welcome
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation Component={Home} />,
    },
    {
      path: "/signin",
      element: <Navigation Component={SignIn} />,
    },
    {
      path: "/signup",
      element: <Navigation Component={SignUp} />,
    },
    {
      path: "/creator",
      element: <Navigation Component={GameCreator} size={size} />,
    },
    {
      path: "/creator-old",
      element: <Navigation Component={GameCreatorOld} size={size} />,
    },
    {
      path: "/map-chase",
      element: <Navigation Component={MapChaser} size={size} />,
    },
    {
      path: "/style",
      element: <Navigation Component={Styles} />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
