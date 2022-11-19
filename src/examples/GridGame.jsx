/* eslint-disable react-hooks/exhaustive-deps */
import { Stage } from "@inlet/react-pixi";
import { MapGrid } from "../components/MapGrid";

const mapConfig = {
  playerPath: [
    [1, 1],
    [1, 2],
    [2, 2],
  ],
};

const options = { 
  backgroundColor: 0x353734,
};

export function GridGame({ dimensions, scale, size }) {
  const renderSize = scale * size
  // const mapSize = {
  //   x: dimensions.x * scale,
  //   y: dimensions.x * scale,
  // };

  return (
    <div>
      <Stage width={renderSize} height={renderSize} options={options}>
        <MapGrid invert gridItems={10} size={renderSize} layout={mapConfig.playerPath} />
      </Stage>
    </div>
  );
}

export default GridGame;
