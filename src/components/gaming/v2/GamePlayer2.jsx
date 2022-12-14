/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from "@inlet/react-pixi";
import { useEffect } from "react";
import { useGame } from "../../../hooks/useGame";
import { GridItems } from "./GridItems";

const Content = ({
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
}) => {
  const cellSize = size / cellQuantity;

  const {
    consumableCells,
    scorepointCells,
    obstacleCells,
    characterPosition,
    cpuPosition,
    characterRef,
    cpuRef,
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
  return (
    <>
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

      <Sprite
        image={image}
        width={cellSize}
        height={cellSize}
        ref={characterRef}
        {...characterPosition}
      />

      <Sprite
        image={image}
        width={cellSize}
        height={cellSize}
        ref={cpuRef}
        {...cpuPosition}
      />
    </>
  );
};

export function GamePlayer2(props) {
  return (
    <>
      <Stage width={props.size} height={props.size}>
        <Content {...props} />
      </Stage>
    </>
  );
}

export default GamePlayer2;
