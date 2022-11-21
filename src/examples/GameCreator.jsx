/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Sprite, Stage } from "@inlet/react-pixi";
import { JoyStick } from "../components/JoyStick";
import Character from "../components/Character";
import Environment from "../components/Environment";
import PerpetualCharacter from "../components/PerpetualCharacter";
import { MapGrid } from "../components/MapGrid";
import { useCallback, useEffect, useState } from "react";
import { usePerpetualMovement } from "../utils/usePerpetualMovement";
import { exportToJson } from "../utils/exportToJson";

const options = {
  backgroundColor: 0x353734,
};

export function GameCreator({ size }) {
  const [obstacles, setObstacles] = useState([]);
  const [newCells, setNewCells] = useState([]);
  const [newCellObjs, setNewCellObjs] = useState([]);

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

  const handleSave = (e) => {
    e.preventDefault();
    exportToJson({ obstacleData: newCells });
  };

  const handleImport = async (e) => {
    // JSON.parse(e)
    const file = e.target.files[0]

    const json = await file.text()
    
    const data = JSON.parse(json)

    setNewCells(data.obstacleData)
    

    // console.log(e.target.files[0].text().then(e => console.log(e)));
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleCellClick);

    return () => {
      window.removeEventListener("mousedown", handleCellClick);
    };
  }, [obstacles, newCells]);

  return (
    <>
      <Stage width={size} height={size} options={options}>
        <MapGrid
          type="obstacle"
          invert
          color={0x444444}
          gridItems={20}
          scale={0.9}
          size={size}
          layout={[]}
          onRender={(e) => setObstacles(e)}
        />
        <MapGrid
          type="obstacle"
          color={0xffff00}
          gridItems={20}
          scale={0.9}
          size={size}
          layout={newCells}
          onRender={(e) => setNewCellObjs(e)}
        />
      </Stage>
      <button onClick={(e) => handleSave(e)}>export</button>
      <input
        type="file"
        onChange={(e) => handleImport(e)}
      />
   
    </>
  );
}

export default GameCreator;
