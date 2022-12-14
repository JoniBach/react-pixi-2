import { useTick } from "@inlet/react-pixi";
import { useCharacter } from "./useCharacter";
import { useConsumable } from "./useConsumable";
import { useCpu } from "./useCpu";
import { useObstacle } from "./useObstacle";
import { useScorePoint } from "./useScorePoints";
import { useStats } from "./useStats";

export const useGame = ({ maxGridSize, gridSize }) => {
  const cellSize = maxGridSize / gridSize;
  const pace = 1;
  const options = {
    maxGridSize,
    pace,
    gridSize,
  };

  const { obstacleCells, obstacleBoundries, loadObstacles } = useObstacle({
    ...options,
  });


  const {
    characterPosition,
    characterDirection,
    characterRef,
    
    respawnCharacter,
    loadCharacter,
    updateCharacter,
  } = useCharacter({ ...options, obstacleBoundries });

  const {
    consumableCells,
    consumableBoundries,
    loadConsumables,
    addConsumable,
    removeConsumable,
  } = useConsumable({ ...options });

  const {
    scorepointCells,
    scorepointBoundries,
    loadScorePoints,
    addScorePoint,
    removeScorePoint,
  } = useScorePoint({ ...options });

  const { score, lives, time, updateScore, resetScore, looseLife, gainLife } =
    useStats({ ...options });

  const { cpuPosition, cpuDirection, cpuRef, respawnCpu, loadCpu, updateCpu } =
    useCpu({
      ...options,
    });

  useTick((delta) => {
    // updateCpu()
    updateCharacter();
  });

  const game = {
    cellSize,
    characterRef,
    cpuRef,
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
