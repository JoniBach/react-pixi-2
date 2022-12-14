import { useState } from "react";
import { getBounds } from "../utils/getBounds";
import { hasCollided } from "../utils/hasCollided";

export const useScorePoint = ({
  maxGridSize,
  gridSize,
  scorePointScale,
  characterBounds,
  updateScore,
}) => {
  const cellSize = maxGridSize / gridSize;

  const [scorepointCells, setscorepointCells] = useState([]);
  const scorePointBoundries = scorepointCells.map((bounds) =>
    getBounds({ cell: bounds, cellSize, scale: scorePointScale })
  );
  const loadScorePoints = (scorepointCells) =>
    setscorepointCells(scorepointCells);
  const addScorePoint = (scorepointCell) =>
    setscorepointCells({ ...scorepointCells, scorepointCell });
  const clearScorePoints = () => setscorepointCells([]);
  const removeScorePoint = (scorepointCell) =>
    setscorepointCells(
      scorepointCells.filter((cell) => scorepointCell !== cell)
    );

  const updateScorePoints = () => {
    const prvCells = scorepointCells;
    const characterCollision = scorePointBoundries.filter((scorePoint) =>
      hasCollided(scorePoint, characterBounds, cellSize)
    );
    if (characterCollision.length) {
      clearScorePoints();
      setscorepointCells(
        prvCells.filter((cell) => characterCollision[0]?.cell !== cell)
      );
      updateScore(1);
    }
  };

  const scorepoints = {
    // vars
    scorepointCells,
    scorePointBoundries,

    //funcs
    loadScorePoints,
    addScorePoint,
    removeScorePoint,
    updateScorePoints,
  };
  return scorepoints;
};
