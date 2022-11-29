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
import { GameDash } from "./screens/GameDash";
import { NewGame } from "./screens/NewGame";
import { EditGame } from "./screens/EditGame";
import { PlayGame } from "./screens/PlayGame";

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
    return <div>welcome</div>;
  };

  const router = createBrowserRouter([
    {
      path: "/dash",
      element: <Navigation Component={GameDash} />,
    },
    {
      path: "/dash/new",
      element: <Navigation Component={NewGame} />,
    },
    {
      path: "/dash/edit",
      element: <Navigation Component={EditGame} />,
    },
    {
      path: "/dash/play",
      element: <Navigation Component={PlayGame} />,
    },
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
      path: "/player",
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
      path: "/styles",
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
