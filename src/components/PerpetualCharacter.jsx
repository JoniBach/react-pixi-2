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
import { MapGrid } from "./MapGrid";

export const PerpetualCharacter = ({
  obstacles,
  image,
  layout,
  // start = 0,
  contolledBy,
  scale = 1,
  toggle,
  size,
  dimensions,
  cellQuantity
}) => {
  const pace = 2;

  const cellSize = (size * 2) / cellQuantity;

  const { characterRef, pos, setObstacle, setSpawn } = usePerpetualMovement({
    pace,
  });
  return (
    <>
      <MapGrid
        type="spawn"
        color={0x555555}
        gridItems={cellQuantity}
        scale={1}
        size={size}
        layout={[[0, 0]]}
        onRender={(e) => setSpawn(e)}
      />
      <Sprite
        image={image}
        width={cellSize}
        height={cellSize}
        ref={characterRef}
        {...pos}
      />

      <MapGrid
        type="obstacle"
        color={0x666666}
        gridItems={cellQuantity}
        scale={1}
        size={size}
        layout={layout}
        onRender={(e) => setObstacle(e)}
      />

      
    </>
  );
};

export default PerpetualCharacter;
