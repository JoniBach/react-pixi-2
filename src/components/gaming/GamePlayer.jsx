/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from "@inlet/react-pixi";
import { useEffect, useState } from "react";
import { exportToJson } from "../../utils/exportToJson";
import PerpetualCharacter from "../PerpetualCharacter";

const stageOptions = {
  backgroundColor: 0x222222,
};

export function GamePlayer({ size,initialScorePoints, initialEnemySpawn,  initialConsumables, initialEnvironment, cellQuantity, image, options, data }) {
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
        <Stage width={size} height={size} options={stageOptions}>
          <PerpetualCharacter
            image={image}
            size={size}
            obstacleCells={newCells}
            scoreCells={initialScorePoints}
            consumableCells={initialConsumables}
            spawnCell={data.spawnData[0]}
            enemySpawnCells={initialEnemySpawn}
            cellQuantity={cellQuantity * 2}
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
