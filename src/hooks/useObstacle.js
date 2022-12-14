import { useState } from "react";
import { getBounds } from "../utils/getBounds";

export const useObstacle = ({ maxGridSize, gridSize }) => {
  const cellSize = maxGridSize / gridSize;

  const [obstacleCells, setObstacleCells] = useState([]);

  const obstacleBoundries = obstacleCells.map((bounds) => getBounds({cell: bounds, cellSize, scale: 1}));

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
