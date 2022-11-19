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

function App() {
  return (
    <div>
      {/* <BasicExample /> */}
      {/* <MovingBunny  /> */}
      {/* <Quiz /> */}

      <div className="game-container">
        {/* <ForestAdventure /> */}
        <MapChaser dimensions={{x: 1000, y:1000}} scale={0.5} />
        {/* <GridGame scale={0.2} size={1000} /> */}
      </div>
    </div>
  );
}

export default App;
