/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage, Text } from "@inlet/react-pixi";
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
const scorePointScale = 0.2
  const {
    consumableCells,
    scorepointCells,
    obstacleCells,
    characterPosition,
    cpuPosition,
    characterRef,
    cpuRef,
    score,
    loadConsumables,
    loadObstacles,
    loadCharacter,
    loadCpu,
    loadScorePoints,
  } = useGame({ maxGridSize: size, gridSize: cellQuantity, scorePointScale });

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
        scale={scorePointScale}
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
                <Text
            text={`Score: ${score} `}
            x={0}
            y={0}
            style={{
              fontSize: 20,
              fontWeight: 400,
              fill: "#01d27e", // gradient
              dropShadow: true,
              dropShadowBlur: 4,
              dropShadowAngle: Math.PI / 6,
              dropShadowDistance: 6,
            }}
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
