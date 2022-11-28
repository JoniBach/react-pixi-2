import logo from "./logo.svg";
import "./App.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { Container, Sprite, Stage, useTick } from "@inlet/react-pixi";
import BasicExample from "./examples/BasicExample";
import Quiz from "./examples/Quiz";
import MovingBunny from "./examples/MovingBunny";
import { useController, UserContextProvider } from "./contexts/UserContext";
import { ForestAdventure } from "./examples/ForestAdventure";
import MapChaser from "./examples/MapChaser";
import GridGame from "./examples/GridGame";
import GameCreator from "./examples/GameCreator";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Styles } from "./examples/Styles";
import GameCreatorOld from "./examples/GameCreatorOld";
import { Nav } from "./components/interface/Nav";
import axios from "axios";
import { Auth } from "./examples/Auth";

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation Component={Auth} />,
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
