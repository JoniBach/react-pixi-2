export const getBounds = ({ cell, cellSize, scale }) => {
  const x =
    cell.x * cellSize -
    (scale !== 1 ? (cellSize * scale) / 2 : 0) +
    (scale !== 1 ? cellSize / 2 : 0);

  const y =
    cell.y * cellSize -
    (scale !== 1 ? (cellSize * scale) / 2 : 0) +
    (scale !== 1 ? cellSize / 2 : 0);

  const obstacleBoundries = {
    lt: x,
    rt: x + cellSize,
    lb: y,
    rb: y + cellSize,
  };

  const center = {
    x: x + (cellSize /2),
    y: y + (cellSize /2)
  }

  const size = cellSize * scale;

  return { x, y, size, ...obstacleBoundries, center};
};
