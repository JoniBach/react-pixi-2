import { Graphics } from "@inlet/react-pixi";
import { useCallback, useEffect, useRef } from "react";
import { getBounds } from "../../../utils/getBounds";

const Thing = ({ scale, color, cellSize, cell }) => {
  const ref = useRef();
  const bounds = getBounds({cell,cellSize, scale})
  const rect = useCallback((g) => {
    g.clear();
    g.beginFill(color, 1);
    g.drawRect(bounds.x, bounds.y, bounds.size, bounds.size);
    g.endFill();
  }, []);

  return (
    <Graphics ref={ref} draw={rect} id={`${cell.x} - ${cell.y}`} />
  );
};

export const GridItems = ({ cells, cellSize, color, scale }) => {
console.log({ cells, cellSize, color, scale })

console.log(getBounds({cell: {x: 1, y: 1},cellSize, scale}))
  return (
    <>
      {cells.map((cell) => (
        <Thing scale={scale} color={color} cellSize={cellSize} cell={cell} />
      ))}
    </>
  );
};
