import logo from "./logo.svg";
import "./App.css";
import { useReducer, useRef } from "react";
import { Container, Sprite, Stage, useTick } from "@inlet/react-pixi";
import BasicExample from "./examples/BasicExample";
import Quiz from "./examples/Quiz";
import MovingBunny from "./examples/MovingBunny";
import { useController } from "./contexts/ControllerContext";
import { ForestAdventure } from "./examples/ForestAdventure";
import MapChaser from "./examples/MapChaser";
import GridGame from "./examples/GridGame";
import GameCreator from "./examples/GameCreator";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Styles } from "./examples/Styles";
import GameCreatorOld from "./examples/GameCreatorOld";
import { Nav } from "./components/interface/Nav";

function App() {
  const baseSize =
    window.innerHeight > window.innerWidth
      ? window.innerWidth
      : window.innerHeight;
  const size = Math.floor(baseSize / 100) * 100;

  const router = createBrowserRouter([
    {
      path: "/creator",
      element: <GameCreator size={size} />,
    },
    {
      path: "/creator-old",
      element: <GameCreatorOld size={size} />,
    },
    {
      path: "/map-chase",
      element: <MapChaser size={size} />,
    },
    {
      path: "/style",
      element: <Styles/>,
    },
  ]);

  return (
    <div className="game-container">
    <Nav />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
