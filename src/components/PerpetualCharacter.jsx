import { Sprite, Text, useTick } from "@inlet/react-pixi";
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
  scoreCells,
  consumableCells,
  enemySpawnCells,
  spawnCell,
  invert,
  cellQuantity,
}) => {
  const pace = 1;
  const cellSize = (size * 2) / cellQuantity;

  const {
    characterRef,
    pos,
    enemyPos,
    score,
    newScoreCells,
    lives,
    enemyRef,
    scoredPoints,
    scorePoints,
    setObstacle,
    setSpawnCell,
    setScorePoint,
    setEnemySpawnCell,
  } = usePerpetualMovement({
    pace,
    size: cellSize,
  });

  return (
    <>
    {
  lives < 0 ? (
    <Text
    text={`GAME OVER... score: ${score} `}
    x={0}
    y={0}
    style={{
      fontSize: 20,
      fontWeight: 400,
      fill: "#fe6969", // gradient
      stroke: "#01d27e",
      // strokeThickness: 5,
      // letterSpacing: 20,
      dropShadow: true,
      // dropShadowColor: '#ccced2',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      // wordWrap: true,
      // wordWrapWidth: 440,
    }}
  />
  ) : (
    <>
     {spawnCell && obstacleCells && (
        <>
          <MapGrid
            type="spawn"
            color={0x222222}
            gridItems={cellQuantity}
            scale={1}
            size={size}
            layout={[spawnCell]}
            onRender={(e) => setSpawnCell(spawnCell)}
          />
          <MapGrid
            type="spawn"
            color={0x222222}
            gridItems={cellQuantity}
            scale={1}
            size={size}
            layout={enemySpawnCells}
            onRender={(e) => setEnemySpawnCell(enemySpawnCells[0])}
          />

          {obstacleCells && (
            <MapGrid
              type="obstacle"
              invert={invert}
              color={0x2121de}
              gridItems={cellQuantity}
              scale={1}
              size={size}
              layout={obstacleCells}
              onRender={(e) => setObstacle(e)}
            />
          )}
          {scoreCells.length > 0 && (
            <MapGrid
              type="spawnd"
              color={0xdea185}
              gridItems={cellQuantity}
              scale={0.2}
              size={size}
              layout={scoreCells}
              onRender={(e) => setScorePoint(e)}
            />
          )}
          {scoreCells.length > 0 && (
            <MapGrid
              type="spawnd"
              // invert={true}
              color={0x222222}
              gridItems={cellQuantity}
              scale={0.2}
              size={size}
              layout={scoredPoints}
              onRender={(e) => null}
            />
          )}
          {consumableCells && (
            <MapGrid
              type="spawn"
              invert={invert}
              color={0xdea185}
              gridItems={cellQuantity}
              scale={0.5}
              size={size}
              layout={consumableCells}
              onRender={(e) => null}
            />
          )}
          <Sprite
            image={image}
            width={cellSize}
            height={cellSize}
            ref={characterRef}
            {...pos}
          />

          <Sprite
            image={image}
            width={cellSize}
            height={cellSize}
            ref={enemyRef}
            {...enemyPos}
          />

          <Text
            text={`Score: ${score} `}
            x={0}
            y={0}
            style={{
              fontSize: 20,
              fontWeight: 400,
              fill: "#01d27e", // gradient
              stroke: "#01d27e",
              // strokeThickness: 5,
              // letterSpacing: 20,
              dropShadow: true,
              // dropShadowColor: '#ccced2',
              dropShadowBlur: 4,
              dropShadowAngle: Math.PI / 6,
              dropShadowDistance: 6,
              // wordWrap: true,
              // wordWrapWidth: 440,
            }}
          />
          <Text
            text={`Lives remaining: ${lives} `}
            x={150}
            y={0}
            style={{
              fontSize: 20,
              fontWeight: 400,
              fill: "#fe6969", // gradient
              stroke: "#01d27e",
              // strokeThickness: 5,
              // letterSpacing: 20,
              dropShadow: true,
              // dropShadowColor: '#ccced2',
              dropShadowBlur: 4,
              dropShadowAngle: Math.PI / 6,
              dropShadowDistance: 6,
              // wordWrap: true,
              // wordWrapWidth: 440,
            }}
          />
          
 

        </>
      )}</>
  )
 }
     
    </>
  );
};

export default PerpetualCharacter;
