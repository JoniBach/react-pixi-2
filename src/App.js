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

function App() {

 
  

  const baseSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight
  const size = Math.floor(baseSize / 100) * 100
  return (
    <div>
      {/* <BasicExample /> */}
      {/* <MovingBunny  /> */}
      {/* <Quiz /> */}

      <div className="game-container">
        {/* <ForestAdventure /> */}
        {/* <MapChaser size={size }/> */}
        <GameCreator size={size }/>
        {/* <GridGame scale={0.2} size={1000} /> */}
      </div>
    </div>
  );
}

export default App;
