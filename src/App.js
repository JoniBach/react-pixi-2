import logo from "./logo.svg";
import "./App.css";
import { useReducer, useRef } from "react";
import { Container, Sprite, Stage, useTick } from "@inlet/react-pixi";
import BasicExample from "./examples/BasicExample";
import Quiz from "./examples/Quiz";
import MovingBunny from "./examples/MovingBunny";
import { useController } from "./contexts/ControllerContext";

function App() {

  return (
    <div>
      {/* <BasicExample /> */}
      <MovingBunny  />
      {/* <Quiz /> */}
    </div>
  );
}

export default App;
