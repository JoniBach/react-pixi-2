import { useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { getBounds } from "../utils/getBounds";
import { hasCollided, willColide } from "../utils/hasCollided";
import { useKeyPress } from "../utils/useKeyPress";

export const useCharacter = ({
  gridSize,
  maxGridSize,
  pace,
  obstacleBoundries,
}) => {
  const [characterPosition, setCharacterPosition] = useState({
    x: 0,
    y: 0,
  });
  const [characterDirection, setCharacterDirection] = useState("");
  const [characterSpawnCell, setcharacterSpawnCell] = useState({});

  const cellSize = maxGridSize / gridSize;

  const characterRef = useRef(null);
  const characterBody = characterRef?.current;
  const characterBounds = characterBody?.getBounds();

  const up = useKeyPress("w");
  const down = useKeyPress("s");
  const left = useKeyPress("a");
  const right = useKeyPress("d");

  const nextCharacterMove = obstacleBoundries.map((e) =>
    willColide(characterBounds, e)
  );

  const upBlocked = nextCharacterMove.includes("up");
  const downBlocked = nextCharacterMove.includes("down");
  const leftBlocked = nextCharacterMove.includes("left");
  const rightBlocked = nextCharacterMove.includes("right");

  const upIsDeadEnd = characterDirection === "up" && upBlocked;
  const downIsDeadEnd = characterDirection === "down" && downBlocked;
  const leftIsDeadEnd = characterDirection === "left" && leftBlocked;
  const rightIsDeadEnd = characterDirection === "right" && rightBlocked;
  const deadEnd =
    upIsDeadEnd || downIsDeadEnd || leftIsDeadEnd || rightIsDeadEnd;

  const changeDirection = () => {
    if (up) {
      if (!upBlocked) {
        setCharacterDirection("up");
      }
    }

    if (down) {
      if (!downBlocked) {
        setCharacterDirection("down");
      }
    }

    if (right) {
      if (!rightBlocked) {
        setCharacterDirection("right");
      }
    }

    if (left) {
      if (!leftBlocked) {
        setCharacterDirection("left");
      }
    }
  };

  const handleStop = () => {
    if (deadEnd) {
      setCharacterDirection("stop");
    }
  };

  const loadCharacter = ({ x, y }) => {
    setcharacterSpawnCell({ x, y });
    const startPos = {
      x: x * cellSize,
      y: y * cellSize,
    };
    setCharacterPosition(startPos);
  };

  const respawnCharacter = () => setCharacterPosition(characterSpawnCell);

  const movePlayer = () => {
    if (characterDirection === "up") {
      setCharacterPosition({
        x: characterPosition?.x,
        y: characterPosition?.y - pace,
      });
    }

    if (characterDirection === "down") {
      setCharacterPosition({
        x: characterPosition?.x,
        y: characterPosition?.y + pace,
      });
    }

    if (characterDirection === "left") {
      setCharacterPosition({
        x: characterPosition?.x - pace,
        y: characterPosition?.y,
      });
    }

    if (characterDirection === "right") {
      setCharacterPosition({
        x: characterPosition?.x + pace,
        y: characterPosition?.y,
      });
    }
  };

  useEffect(() => {
    changeDirection();
  }, [up, down, left, right]);

  const updateCharacter = (delta) => {
    if (characterDirection !== "stop") {
      handleStop();
    }
    movePlayer();

    if (up || down || left || right) {
      changeDirection();
    }
  };

  const character = {
    // var
    characterPosition,
    characterDirection,
    characterRef,

    // funcs
    respawnCharacter,
    loadCharacter,
    updateCharacter,
  };

  return character;
};
