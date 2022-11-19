/* eslint-disable react-hooks/exhaustive-deps */
import { Stage } from "@inlet/react-pixi";
import { MapGrid } from "../components/MapGrid";

const mapConfig = {
  gridResolution: 10,
  spawn: [[1, 1]],
  playerPath: [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [2, 2],
    [0, 4],
  ],
  score: [[1, 6]],
  consumable: [[2, 2]],
  damage: [[0, 4]],
};

const options = {
  backgroundColor: 0x353734,
};

export function GridGame({ dimensions, scale, size }) {
  const renderSize = scale * size;

  return (
    <div>
      <Stage width={renderSize} height={renderSize} options={options}>
        <MapGrid
          type="obstacle"
          invert
          color={0xdddddd}
          gridItems={mapConfig.gridResolution}
          size={renderSize}
          layout={mapConfig.playerPath}
        />
        <MapGrid
          type="damage"
          color={0xff0000}
          gridItems={mapConfig.gridResolution}
          size={renderSize}
          scale={0.6}
          layout={mapConfig.damage}
        />
        <MapGrid
          type="score"
          color={0x00ffff}
          gridItems={mapConfig.gridResolution}
          size={renderSize}
          scale={0.2}
          layout={mapConfig.score}
        />
        <MapGrid
          type="spawn"
          color={0xff00ff}
          gridItems={mapConfig.gridResolution}
          size={renderSize}
          scale={0.6}
          layout={mapConfig.spawn}
        />
        <MapGrid
          type="consumable"
          color={0x00ff00}
          gridItems={mapConfig.gridResolution}
          size={renderSize}
          scale={0.3}
          layout={mapConfig.consumable}
        />
      </Stage>
    </div>
  );
}

export default GridGame;
