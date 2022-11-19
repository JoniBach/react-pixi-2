import { Graphics } from "@inlet/react-pixi";
import { useCallback, useRef } from "react";

const Thing = ({ boundries, cellSize, gridSize }) => {
  const ref = useRef();

  const rect = useCallback((g) => {
    g.clear();
    g.beginFill(0xdddddd, 1);
    g.drawRect(
      boundries[0] * cellSize,
      boundries[1] * cellSize,
      cellSize,
      cellSize
    );
    g.endFill();
  }, []);

  return <Graphics ref={ref} draw={rect} />;
};

export const MapGrid = ({ invert, layout, size, gridItems }) => {
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
          e.map((ea, ia) => ea && <Thing boundries={ea} cellSize={cellSize} />)
        )}

      {!invert &&
        layout.map(( boundries, i) => (
          <Thing boundries={boundries} cellSize={cellSize} />
        ))}
    </>
  );
};
