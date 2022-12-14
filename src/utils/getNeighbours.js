export const getNeighbours = ({ cell }) => {

  const up = {x: cell.x, y: cell.y - 1}
  const down = {x: cell.x, y: cell.y + 1}
  const left = {x: cell.x - 1, y: cell.y}
  const right = {x: cell.x + 1, y: cell.y}

  return { cell, up, down, left, right};
};
