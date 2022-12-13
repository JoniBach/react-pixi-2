/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from "@inlet/react-pixi";
import { Save } from "@styled-icons/material";
import { useEffect, useState } from "react";
import { options } from "../../../mockData/options";
import { Button } from "../../interface/Button";
import { MapGrid } from "../../MapGrid";
import { ClickyGrid } from "../ClickyGrid";
import { ClickyGrid2 } from "./ClickyGrid2";



export function GameBuilder2({
  size,
  initialEnvironment,
  onSave,
  cellQuantity,
  binaryOverlay,
}) {

  const [newCells, setNewCells] = useState([]);

  useEffect(() => {
    if (initialEnvironment) {
      setNewCells(initialEnvironment);
    }
  }, [initialEnvironment]);
  return (
    <>
      <ClickyGrid2  quantity={cellQuantity} size={size} options={options} onSave={onSave} initialGame={initialEnvironment}/>

    </>
  );
}

export default GameBuilder2;
