/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import { exportToJson } from "../../utils/exportToJson";
import PerpetualCharacter from "../PerpetualCharacter";

const options = {
  backgroundColor: 0x353734,
};

export function GamePlayer({ size }) {
  const [newCells, setNewCells] = useState([]);

  const [cellQuantity, setCellQuantity] = useState(40);
  const [overlay, setoverlay] = useState(null);

  return (
    <>
      <Stage width={size} height={size} options={options}>
        <PerpetualCharacter
          image="player.png"
          size={size}
          obstacleCells={newCells}
          spawnCell={[0, 0]}
          cellQuantity={cellQuantity}
        />
        {overlay && (
          <Sprite alpha={1} image={overlay.name} width={size} height={size} />
        )}
      </Stage>
    </>
  );
}

export default GamePlayer;
