/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from "@inlet/react-pixi";
import { Save } from "@styled-icons/material";
import { useEffect, useState } from "react";
import { Button } from "../interface/Button";
import { MapGrid } from "../MapGrid";

const options = {
  backgroundColor: 0x353734,
};

const getCell = (a, b) => {
  var ab = a.getBounds();
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

export function GameBuilder({ size, initialEnvironment, onSave }) {
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
    const x = obstacles?.filter((ob) => getCell(ob, click));
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
    console.log(initialEnvironment);
    if (initialEnvironment) {
      setNewCells(initialEnvironment);
    }
  }, [initialEnvironment]);

  const [cellQuantity, setCellQuantity] = useState(40);
  const [overlay, setoverlay] = useState(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleCellClick);
    // window.addEventListener("mousemove", handleCellClick);

    return () => {
      window.removeEventListener("mousedown", handleCellClick);
      // window.removeEventListener("mousemove", handleCellClick);
    };
  }, [obstacles, newCells]);
  console.log(spawn);
  return (
    <>
      <Stage width={size} height={size} options={options}>
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
        <MapGrid
          type="obstacle"
          color={0xffff00}
          gridItems={cellQuantity}
          scale={0.9}
          size={size}
          layout={newCells}
          onRender={(e) => setNewCellObjs(e)}
        />
      </Stage>

      <Button onClick={() => onSave(newCells)}>
        <Save size={20} /> Save
      </Button>
    </>
  );
}

export default GameBuilder;
