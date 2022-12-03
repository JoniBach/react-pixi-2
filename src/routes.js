import { Nav } from "./components/interface/Nav";
import { GameDash } from "./screens/GameDash";
import { SignIn } from "./examples/SignIn";
import { SignUp } from "./examples/SignUp";
import { NewGame } from "./screens/NewGame";
import { EditGame } from "./screens/EditGame";
import { PlayGame } from "./screens/PlayGame";
import { useEffect } from "react";
import { useUser } from "./contexts/UserContext";

const Navigation = ({ Component, size, dynamicTitle }) => {
  const { setDynamicPageTitle } = useUser();
  useEffect(() => {
    if (dynamicTitle) {
      setDynamicPageTitle(dynamicTitle);
    }
  }, [dynamicTitle]);

  return (
    <div>
      <Nav />
      <Component size={size} />
    </div>
  );
};

export const openRoutes = [
  {
    path: "/signin",
    element: (
      <Navigation
        Component={SignIn}
        dynamicTitle="sign in to see your projects"
      />
    ),
  },
  {
    path: "/signup",
    element: (
      <Navigation
        Component={SignUp}
        dynamicTitle="create an accout to get started"
      />
    ),
  },
];

export const protectedRoutes = [
  {
    path: "/dash",
    element: (
      <Navigation
        Component={GameDash}
        dynamicTitle="welcome to your dashboard $name"
      />
    ),
  },
  {
    path: "/dash/new",
    element: (
      <Navigation Component={NewGame} dynamicTitle="create a new project" />
    ),
  },
  {
    path: "/dash/edit",
    element: <Navigation Component={EditGame} dynamicTitle="grid editor" />,
  },
  {
    path: "/dash/play",
    element: <Navigation Component={PlayGame} dynamicTitle="play game" />,
  },
];
