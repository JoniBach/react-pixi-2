import { useRef, useState } from "react";

export const useCharacter = ({ gridSize, maxGridSize }) => {
  const [characterPosition, setCharacterPosition] = useState({
    x: 0,
    y: 0,
  });
  const [characterDirection, setCharacterDirection] = useState("");
  const [characterSpawnCell, setcharacterSpawnCell] = useState({});

  const cellSize = maxGridSize / gridSize;

  const characterRef = useRef(null);

  const loadCharacter = ({ x, y }) => {
    setcharacterSpawnCell({ x, y });
    const startPos = {
      x: x * cellSize,
      y: y * cellSize,
    };
    setCharacterPosition(startPos);
  };

  const respawnCharacter = () => setCharacterPosition(characterSpawnCell);

  const character = {
    // var
    characterPosition,
    characterDirection,
    characterRef,

    // funcs
    respawnCharacter,
    loadCharacter
  };

  return character;
};
