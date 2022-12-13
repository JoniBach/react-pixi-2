import { useCharacter } from "./useCharacter";
import { useConsumable } from "./useConsumable";
import { useCpu } from "./useCpu";
import { useObstacle } from "./useObstacle";
import { useScorePoint } from "./useScorePoints";
import { useStats } from "./useStats";

export const useGame = ({ maxGridSize, gridSize }) => {
  const cellSize = maxGridSize / gridSize;

  const {
    consumableCells,
    consumableBoundries,
    loadConsumables,
    addConsumable,
    removeConsumable,
  } = useConsumable({ maxGridSize, gridSize });

  const {
    scorepointCells,
    scorepointBoundries,
    loadScorePoints,
    addScorePoint,
    removeScorePoint,
  } = useScorePoint({ maxGridSize, gridSize });

  const {
    characterPosition,
    characterDirection,
    characterRef,
    respawnCharacter,
    loadCharacter,
  } = useCharacter({ maxGridSize, gridSize });
  const { obstacleCells, obstacleBoundries, loadObstacles } = useObstacle({
    maxGridSize,
    gridSize,
  });
  const { score, lives, time, updateScore, resetScore, looseLife, gainLife } =
    useStats({ maxGridSize, gridSize });

  const { cpuPosition, cpuDirection, cpuRef, respawnCpu, loadCpu } = useCpu({
    maxGridSize,
    gridSize,
  });

  const game = {
    cellSize,
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
  };
  return game;
};
