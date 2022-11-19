import { Graphics } from "@inlet/react-pixi";
import { useCallback, useRef } from "react";

const Thing = ({ scale, color, boundries, cellSize, gridSize }) => {
  const ref = useRef();

  const rect = useCallback((g) => {
    g.clear();
    g.beginFill(color, 1);
    g.drawRect(
      boundries[0] * cellSize - (scale !== 1 ? ( cellSize * scale) / 2 : 0) + (scale !== 1 ? cellSize / 2 : 0),
      boundries[1] * cellSize - (scale !== 1 ? ( cellSize * scale) / 2 : 0) + (scale !== 1 ? cellSize / 2 : 0),
      cellSize * scale,
      cellSize * scale
    );
    g.endFill();
  }, []);

  return <Graphics ref={ref} draw={rect} />;
};

export const MapGrid = ({ scale = 1, color, invert, layout, size, gridItems }) => {
  const cellSize = size / gridItems; // 100

  const templateBase = [...Array(gridItems).keys()];

  const handleStuff = (e) => {
    if (
      layout.filter(
        (d, i) => d[0] === e[0] && d[1] === e[1]
      ).length === 0
    ) {
      return e;
    }
  };

  const template = templateBase.map((e, i) =>
    templateBase.map((ea, ia) => handleStuff([i, ia]))
  );

  return (
    <>
      {invert &&
        template.map((e, i) =>
          e.map((ea, ia) => ea && <Thing scale={scale} color={color} boundries={ea} cellSize={cellSize} />)
        )}

      {!invert &&
        layout.map(( boundries, i) => (
          <Thing scale={scale} color={color} boundries={boundries} cellSize={cellSize} />
        ))}
    </>
  );
};
