import { Sprite, useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { queenSquareMap } from "../mockData/queenSquareMap";
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
  // start = 0,
  contolledBy,
  scale = 1,
  toggle,
  size,
  dimensions,
}) => {
  const pace = 1;

  const cellQuantity = 40;
  const cellSize = (size * 2) / cellQuantity;

  const { characterRef, pos, setObstacle, setSpawn } = usePerpetualMovement({
    pace,
  });
  return (
    <>
      <MapGrid
        type="spawn"
        color={0x222222}
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
        invert
        color={0x333333}
        gridItems={cellQuantity}
        scale={1}
        size={size}
        layout={queenSquareMap}
        onRender={(e) => setObstacle(e)}
      />

      {/* <Environment
        obstacles={obstacles}
        scale={scale}
        setObstacles={(e) => setObstacle(e)}
      /> */}
    </>
  );
};

export default PerpetualCharacter;
