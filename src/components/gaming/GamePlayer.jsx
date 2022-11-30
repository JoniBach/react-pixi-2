/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import { exportToJson } from "../../utils/exportToJson";
import PerpetualCharacter from "../PerpetualCharacter";

const options = {
  backgroundColor: 0x353734,
};

export function GamePlayer({ size, initialEnvironment, cellQuantity, image }) {
  const [newCells, setNewCells] = useState(initialEnvironment || []);

  // const [overlay, setoverlay] = useState(null);
  useEffect(() => {
    if (initialEnvironment) {
      setNewCells(initialEnvironment);
    }
  }, [initialEnvironment]);

  return (
    <>
      {newCells.length && (
        <Stage width={size} height={size} options={options}>
          <PerpetualCharacter
            image={image}
            size={size}
            obstacleCells={newCells}
            spawnCell={[0, 0]}
            cellQuantity={cellQuantity}
          />
        </Stage>
      )}
      {/* {overlay && (
          <Sprite alpha={1} image={overlay.name} width={size} height={size} />
        )} */}
    </>
  );
}

export default GamePlayer;
