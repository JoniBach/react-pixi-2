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
  image,
  size,
  obstacleCells,
  spawnCell,
  invert,
  cellQuantity
}) => {
  const pace = 1;
  const cellSize = (size * 2) / cellQuantity;

  const { characterRef, pos, setObstacle, setSpawn } = usePerpetualMovement({
    pace,
  });
  
  return (
    <>
      {spawnCell && (
        <MapGrid
          type="spawn"
          color={0x222222}
          gridItems={cellQuantity}
          scale={1}
          size={size}
          layout={[spawnCell]}
          onRender={(e) => setSpawn(e)}
        />
      )}
      <Sprite
        image={image}
        width={cellSize}
        height={cellSize}
        ref={characterRef}
        {...pos}
      />

      {obstacleCells && (
        <MapGrid
          type="obstacle"
          invert={invert}
          color={0x333333}
          gridItems={cellQuantity}
          scale={1}
          size={size}
          layout={obstacleCells}
          onRender={(e) => setObstacle(e)}
        />
      )}
    </>
  );
};

export default PerpetualCharacter;
