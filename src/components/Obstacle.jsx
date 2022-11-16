import { Graphics, Sprite, useTick } from "@inlet/react-pixi";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMovement } from "../utils/useMovement";
import { useTouch } from "../utils/useTouch";

export const Obstacle = ({ dimmensions, color, onRender }) => {
  const ref = useRef();

  const rect = useCallback((g) => {
    g.clear();
    g.beginFill(color, 1);
    g.drawRect(dimmensions[0], dimmensions[1], dimmensions[2], dimmensions[3]);
    g.endFill(); 
  }, []);

  useEffect(() => {
    onRender(ref?.current);
  }, [ref]);


  return <Graphics ref={ref} draw={rect} />;
};

export default Obstacle;
