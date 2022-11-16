import { Sprite, useTick } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import { useMovement } from "../utils/useMovement";
import { useTouch } from "../utils/useTouch";
import Obstacle from "./Obstacle";

export const Environment = ({ scale, obstacles, setObstacles }) => {

  const [obstacleData, setObstacleData] = useState([])

  const obs = []

  useEffect(() => {
    setObstacles(obs)
  }, [])
  

  
  return (
    <>
      {obstacles.map(({ dimensions, color }) => (
        <Obstacle onRender={(e) => obs.push(e)} color={color} dimmensions={dimensions.map((dim) => dim*scale)} />
      ))}
    </>
  );
};

export default Environment;
