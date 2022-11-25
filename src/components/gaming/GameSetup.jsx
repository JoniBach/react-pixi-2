/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { exportToJson } from "../../utils/exportToJson";
import { Button } from "../interface/Button";
import { File } from "../interface/File";
import { Input } from "../interface/Input";
import { Modal } from "../interface/Modal";

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
  const json = await e.text();
  const data = JSON.parse(json);
  return data.obstacleData;
};

export function GameSetup({ size, active }) {
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

  const handleOverlay = async (e) => {
    setoverlay(e);
    return e;
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleCellClick);
    // window.addEventListener("mousemove", handleCellClick);

    return () => {
      window.removeEventListener("mousedown", handleCellClick);
      // window.removeEventListener("mousemove", handleCellClick);
    };
  }, [obstacles, newCells]);
  return (
    <div>
      <Modal title="styles">
        {/* <Button onClick={(e) => setEditMode(!editMode)}>
          {!editMode ? "edit" : "live"}
        </Button> */}
        <Button onClick={(e) => handleSave(e, newCells)}>export</Button>
        <Input
          label="cell quantity"
          onChange={(e) => setCellQuantity(e.target.value)}
        />
        import data
        <File
          onChange={(e) => handleImport(e).then((res) => setNewCells(res))}
        />
        import image overlay
        <File onChange={(e) => handleOverlay(e)} />
      </Modal>
    </div>
  );
}

export default GameSetup;
