/* eslint-disable react-hooks/exhaustive-deps */
import { Stage } from "@inlet/react-pixi";
import { useEffect } from "react";
import { useGame } from "../../../hooks/useGame";
import { GridItems } from "./GridItems";

export function GamePlayer2({
  size,
  initialPlayerSpawn,
  initialScorePoints,
  initialEnemySpawn,
  initialConsumables,
  initialEnvironment,
  cellQuantity,
  image,
  options,
  data,
}) {
  const cellSize = size / cellQuantity;

  const {
    consumableCells,
    scorepointCells,
    obstacleCells,
    characterPosition,
    cpuPosition,
    loadConsumables,
    loadObstacles,
    loadCharacter,
    loadCpu,
    loadScorePoints,
  } = useGame({ maxGridSize: size, gridSize: cellQuantity });

  useEffect(() => {
    loadConsumables(initialConsumables);
    loadObstacles(initialEnvironment);
    loadCharacter(initialPlayerSpawn[0]);
    loadCpu(initialEnemySpawn[0]);
    loadScorePoints(initialScorePoints);
  }, []);
  console.log({
    consumableCells,
    scorepointCells,
    obstacleCells,
    characterPosition,
    cpuPosition,
  });

  return (
    <>
      <Stage width={size} height={size}>
        <GridItems
          cells={obstacleCells}
          cellSize={cellSize}
          scale={1}
          color={0x2121de}
        />
        <GridItems
          cells={scorepointCells}
          cellSize={cellSize}
          scale={0.2}
          color={0xdea185}
        />
      </Stage>

      {/* {newCells.length && (
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
      )} */}
      {/* {overlay && (
          <Sprite alpha={1} image={overlay.name} width={size} height={size} />
        )} */}
    </>
  );
}

export default GamePlayer2;
