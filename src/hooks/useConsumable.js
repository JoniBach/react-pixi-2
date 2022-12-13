import { useState } from "react";

export const useConsumable = ({ maxGridSize, gridSize }) => {
  const cellSize = maxGridSize / gridSize;

  const [consumableCells, setconsumableCells] = useState([]);

  const consumableBoundries = consumableCells.map(({ x, y }) => ({
    lt: x * cellSize,
    rt: (x + cellSize) * cellSize,
    lb: y * cellSize,
    rb: (y + cellSize) * cellSize,
  }));

  const loadConsumables = (consumableCells) => setconsumableCells(consumableCells);
  const addConsumable = (consumableCell) => setconsumableCells({...consumableCells, consumableCell});
  const removeConsumable = (consumableCell) => setconsumableCells(consumableCells.filter((cell) => consumableCell !== cell ));

  const consumables = {
    // vars
    consumableCells,
    consumableBoundries,

    //funcs
    loadConsumables,
    addConsumable,
    removeConsumable
  };
  return consumables;
};
