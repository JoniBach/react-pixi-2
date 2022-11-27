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
import GameBuilder from "../components/gaming/GameBuilder";
import GamePlayer from "../components/gaming/GamePlayer";
import GameSetup from "../components/gaming/GameSetup";
import { Modal } from "../components/interface/Modal";
import { Nav } from "../components/interface/Nav";
import { Wizard } from "../components/interface/Wizard";
import { Input } from "../components/interface/Input";
import { File } from "../components/interface/File";
import { NewGame } from "../components/gaming/NewGame";

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

const handleSave = (e, newCells) => {
  e.preventDefault();
  exportToJson({ obstacleData: newCells });
};

const handleImport = async (e, setNewCells) => {
  const file = e.target.files[0];
  const json = await file.text();
  const data = JSON.parse(json);
  return data.obstacleData;
};

export function GameCreator({ size }) {
  const [obstacles, setObstacles] = useState([]);
  const [newCells, setNewCells] = useState([]);
  const [newCellObjs, setNewCellObjs] = useState([]);
  const [editMode, setEditMode] = useState(true);

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

  const [cellQuantity, setCellQuantity] = useState(40);
  const [overlay, setoverlay] = useState(null);

  const handleOverlay = (e) => {
    setoverlay(e.target.files[0]);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleCellClick);
    // window.addEventListener("mousemove", handleCellClick);

    return () => {
      window.removeEventListener("mousedown", handleCellClick);
      // window.removeEventListener("mousemove", handleCellClick);
    };
  }, [obstacles, newCells]);

  const [first, setfirst] = useState('')

  return (
    <>
    <NewGame />
      {/* <GameBuilder size={size}/> */}
      {/* <GamePlayer size={size}/> */}
      {/* <GameSetup size={size} /> */}
    </>
  );
}

export default GameCreator;
