import { useState } from "react";

export const useObstacle = ({ maxGridSize, gridSize }) => {
  const cellSize = maxGridSize / gridSize;

  const [obstacleCells, setObstacleCells] = useState([]);

  const obstacleBoundries = obstacleCells.map(({ x, y }) => ({
    lt: x * cellSize,
    rt: (x + cellSize) * cellSize,
    lb: y * cellSize,
    rb: (y + cellSize) * cellSize,
  }));

  const loadObstacles = (obstacleCells) => setObstacleCells(obstacleCells);

  const obstacles = {
    // vars
    obstacleCells,
    obstacleBoundries,

    //funcs
    loadObstacles
  };
  return obstacles;
};
