import { Sprite, useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { useKeyPress } from "../utils/useKeyPress";
import { useMovement } from "../utils/useMovement";
import {
  useLastKeyDown,
  usePerpetualMovement,
} from "../utils/usePerpetualMovement";
import { useTouch } from "../utils/useTouch";
import Environment from "./Environment";

export const PerpetualCharacter = ({
  obstacles,
  image,
  start = 0,
  contolledBy,
  scale = 1,
  toggle,
}) => {
  const pace = 2;
  const buffer = 5;

  const {characterRef, pos, setObstacle} = usePerpetualMovement({pace, start, buffer})
  
  return (
    <>
      <Sprite
        image={image}
        scale={{ x: scale / 1.2, y: scale / 1.2 }}
        ref={characterRef}
        {...pos}
      />

      <Environment
        obstacles={obstacles}
        scale={scale}
        setObstacles={(e) => setObstacle(e)}
      />
    </>
  );
};

export default PerpetualCharacter;
