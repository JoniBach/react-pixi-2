/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from "@inlet/react-pixi";
import { Save } from "@styled-icons/material";
import { useEffect, useState } from "react";
import { Button } from "../interface/Button";
import { MapGrid } from "../MapGrid";
import { ClickyGrid } from "./ClickyGrid";



export function GameBuilder({
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

  const options = [
    {
      id: "environmentData",
      title: "Obstacle",
      color: '#fef08a',
      spawnPoint: false,
      collisions: true,
      consumable: false,
      // total: 'all',
      destructable: false,
      callback: (e) => null,
    },
    {
      id: "consumableData",
      title: "Health Potion",
      color: '#4ade80',
      spawnPoint: false,
      collisions: true,
      consumable: true,
      total: 3,
      destructable: false,
      callback: (e) => console.log(e),
    },
    {
      id: "trapData",
      title: "Spike Trap",
      color: '#fecdd3',
      spawnPoint: false,
      collisions: true,
      consumable: true,
      total: 5,
      destructable: false,
      callback: (e) => console.log(e),
    },
    {
      id: "spawnData",
      title: "Player Spawn",
      color: '#bfdbfe',
      spawnPoint: true,
      collisions: false,
      consumable: false,
      total: 1,
      destructable: false,
      callback: (e) => console.log(e),
    },
    {
      id: "enemySpawnData",
      title: "Enemy Spawn",
      color: '#d8b4fe',
      spawnPoint: true,
      collisions: false,
      consumable: false,
      total: 1,
      destructable: false,
      callback: (e) => console.log(e),
    },
  ];

  return (
    <>
      <ClickyGrid quantity={20} size={size} options={options} onSave={onSave} initialGame={initialEnvironment}/>

    </>
  );
}

export default GameBuilder;
