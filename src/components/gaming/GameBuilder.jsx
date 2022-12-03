/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from "@inlet/react-pixi";
import { Save } from "@styled-icons/material";
import { useEffect, useState } from "react";
import { Button } from "../interface/Button";
import { MapGrid } from "../MapGrid";

const options = {
  backgroundColor: 0x353734,
};

const getCell = (a, b, init) => {
  const bounds = a.getBounds();
  var ab = { ...bounds, x: bounds.x - init.x, y: bounds.y - init.y };
  var bb = { x: b.x, y: b.y, width: 1, height: 1 };
  if (
    ab.x + ab.width > bb.x &&
    ab.x < bb.x + bb.width &&
    ab.y + ab.height > bb.y &&
    ab.y < bb.y + bb.height
  ) {
    return true;
  }
  return false;
};

export function GameBuilder({
  size,
  initialEnvironment,
  onSave,
  cellQuantity,
  binaryOverlay,
}) {
  const [obstacles, setObstacles] = useState([]);
  const [spawn, setSpawn] = useState([]);
  const [newCells, setNewCells] = useState([]);
  const [newCellObjs, setNewCellObjs] = useState([]);

  const handleRemove = (cell) => {
    const removed = newCells.filter(
      (d, i) => !(d[0] === cell[0] && d[1] === cell[1])
    );
    setNewCells([]);
    return setNewCells(removed);
  };

  const handleAdd = (cell) => {
    setNewCells([...newCells, cell]);
  };

  const handleCellClick = (click) => {
    const init = obstacles[0].getBounds();
    const x = obstacles?.filter((ob) => getCell(ob, click, init));
    if (x.length) {
      const cellString = x[0]?.id;
      const cellArr = cellString.split("-");
      const cell = cellArr.map((e) => parseInt(e));

      const cellExsits = newCells.filter(
        (d, i) => d[0] === cell[0] && d[1] === cell[1]
      );

      if (!cellExsits.length > 0) {
        handleAdd(cell);
      } else {
        handleRemove(cell);
      }
    }
  };

  useEffect(() => {
    if (initialEnvironment) {
      setNewCells(initialEnvironment);
    }
  }, [initialEnvironment]);

  const [overlay, setoverlay] = useState(null);

  const cellSize = size / cellQuantity; // 100
  const obs = [];
  const templateBase = [...Array(cellQuantity).keys()];

  const template = templateBase.map((e, i) =>
    templateBase.map((ea, ia) => [i, ia])
  );

  const checkCellExists = (cell) => {
    const cellExsits = newCells.filter(
      (d, i) => d[0] === cell[0] && d[1] === cell[1]
    );

    return cellExsits.length > 0;
  };
  const [mouseActive, setMouseActive] = useState(false);

  const handleClick = (cell, e) => {
    const cellExsits = newCells.filter(
      (d, i) => d[0] === cell[0] && d[1] === cell[1]
    );

    if (e.type === "mousedown") {
      if (!cellExsits.length > 0) {
        handleAdd(cell);
      } else {
        handleRemove(cell);
      }
    } else {
      if (!cellExsits.length > 0) {
        if (mouseActive) {
          handleAdd(cell);
        }
      } else {
        if (mouseActive) handleRemove(cell);
      }
    }
  };

  const handleDown = () => {
    setMouseActive(true);
  };

  const handleUp = () => {
    setMouseActive(false);
  };
  useEffect(() => {
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [obstacles, newCells]);

  return (
    <>
      {template.map((row) => (
        <div className="flex">
          {row.map((cell) => (
            <div
              className={`bg-gray-700 ${
                checkCellExists(cell) ? "bg-yellow-200" : "bg-grey-700"
              }  border-solid border-2 border-gray-500 `}
              style={{ width: cellSize, height: cellSize }}
              onMouseEnter={(e) => handleClick(cell, e)}
              onMouseDown={(e) => handleClick(cell, e)}
            />
          ))}
        </div>
      ))}

      {/* <Stage width={size} height={size} options={options}>
        <MapGrid
          type="obstacle"
          invert
          color={0x444444}
          gridItems={cellQuantity}
          scale={0.9}
          size={size}
          layout={[]}
          onRender={(e) => setObstacles(e)}
        />
        {overlay && (
          <Sprite alpha={0.5} image={overlay.name} width={size} height={size} />
        )}
        {binaryOverlay && (
          <Sprite
            alpha={0.5}
            image={binaryOverlay}
            width={size}
            height={size}
          />
        )}
        <MapGrid
          type="obstacle"
          color={0xffff00}
          gridItems={cellQuantity}
          scale={0.9}
          size={size}
          layout={newCells}
          onRender={(e) => setNewCellObjs(e)}
        />
      </Stage> */}

      <Button onClick={() => onSave(newCells)}>
        <Save size={20} /> Save
      </Button>
    </>
  );
}

export default GameBuilder;
