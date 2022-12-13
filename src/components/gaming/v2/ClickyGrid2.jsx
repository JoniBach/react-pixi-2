import {
  CheckBox,
  CheckBoxOutlineBlank,
  Palette,
  Save,
} from "@styled-icons/material";
import { useEffect, useState } from "react";
import { useMouseEvent } from "../../../utils/useMouseEvent";
import { Button } from "../../interface/Button";
import { ClickyCell } from "../ClickyCell";
import { ClickyCell2 } from "./ClickyCell2";

export const ClickyGrid2 = ({
  quantity,
  size,
  options,
  onSave,
  initialGame,
}) => {
  const [newCells, setNewCells] = useState([]);
  const [activeTypeId, setActiveTypeId] = useState(options[0].id);
  const mouseActive = useMouseEvent();
  const templateBase = [...Array(quantity).keys()];

  const template = templateBase.map((e, i) =>
    templateBase.map((ea, ia) => [ia, i])
  );

  const handleRemove = (cell) => {
    const removed = newCells.filter(
      (d, i) => !(d.cell[0] === cell[0] && d.cell[1] === cell[1])
    );
    setNewCells([]);
    return setNewCells(removed);
  };

  const handleAdd = (cell) => {
    setNewCells([...newCells, cell]);
  };

  const checkCellExists = (cell) => {
    const cellExsits = newCells.filter(
      (d, i) => d?.cell[0] === cell[0] && d?.cell[1] === cell[1]
    );

    return cellExsits.length > 0;
  };

  const handleClick = (coords, e) => {
    if (activeTypeId) {
      const cell = { cell: coords, type: activeTypeId };
      const cellExsits = newCells.filter(
        (d, i) => d.cell[0] === coords[0] && d.cell[1] === coords[1]
      );

      if (e.type === "mousedown") {
        if (!cellExsits.length > 0) {
          handleAdd(cell);
        } else {
          handleRemove(coords);
        }
      } else {
        if (!cellExsits.length > 0) {
          if (mouseActive) {
            handleAdd(cell);
          }
        } else {
          if (mouseActive) handleRemove(coords);
        }
      }
    } else {
      alert("no type selected");
    }
  };

  const cellSize = size / quantity; // 100

  const getCellColor = (cell) => {
    const existingCell = newCells.filter(
      (d, i) => d?.cell[0] === cell[0] && d?.cell[1] === cell[1]
    );

    const cellType = existingCell[0]?.type;

    const cellColor = options.filter((e) => e.id === cellType)[0]?.color;

    return cellColor;
  };

  const getDataByType = (type) => newCells.filter((cell) => cell.type === type);

  const handleSave = () => {
    const dataKeys = options.map((option) => option.id);
    const defaultObject = dataKeys.reduce(
      (a, v) => ({ ...a, [v]: getDataByType(v)?.map((d) => ({x: d.cell[0], y: d.cell[1]})) }),
      {}
    );
    onSave(defaultObject);
    return defaultObject;
  };

  const handleGameSetup = () => {
    const dataKeys = options.map((option) => option.id);
    const freshArray = dataKeys.map((key) =>
      initialGame[key].map((e) => ({ type: key, cell: [e.x, e.y] }))
    );
    const formattedData = freshArray.flat();
    setNewCells(formattedData);
  };

  useEffect(() => {
    if (initialGame) {
      handleGameSetup();
    }
  }, []);


  return (
    <div>
      {template.map((row) => (
        <div className="flex">
          {row.map((cell) => (
            <ClickyCell2
              handleClick={handleClick}
              checkCellExists={checkCellExists}
              cell={cell}
              cells={newCells}
              size={cellSize}
              color={getCellColor(cell)}
              options={options}
            />
          ))}
        </div>
      ))}
      {options.map((option) => (
        <Button color={option.color} onClick={() => setActiveTypeId(option.id)}>
          {activeTypeId === option.id ? (
            <CheckBox size={20} />
          ) : (
            <CheckBoxOutlineBlank size={20} />
          )}

          {option.title}

          <Palette size={20} color={option.color} />
        </Button>
      ))}
      <Button onClick={() => handleSave()}>
        <Save size={20} /> Save
      </Button>
    </div>
  );
};
