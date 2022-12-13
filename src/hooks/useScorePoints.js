import { useState } from "react";

export const useScorePoint = ({ maxGridSize, gridSize }) => {
  const cellSize = maxGridSize / gridSize;

  const [scorepointCells, setscorepointCells] = useState([]);

  const scorepointBoundries = scorepointCells.map(({ x, y }) => ({
    lt: x * cellSize,
    rt: (x + cellSize) * cellSize,
    lb: y * cellSize,
    rb: (y + cellSize) * cellSize,
  }));

  const loadScorePoints = (scorepointCells) => setscorepointCells(scorepointCells);
  const addScorePoint = (scorepointCell) => setscorepointCells({...scorepointCells, scorepointCell});
  const removeScorePoint = (scorepointCell) => setscorepointCells(scorepointCells.filter((cell) => scorepointCell !== cell ));

  const scorepoints = {
    // vars
    scorepointCells,
    scorepointBoundries,

    //funcs
    loadScorePoints,
    addScorePoint,
    removeScorePoint
  };
  return scorepoints;
};
