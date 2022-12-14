import { useTick } from "@inlet/react-pixi";
import { useEffect, useRef, useState } from "react";
import { getBounds } from "../utils/getBounds";
import { hasCollided, willColide } from "../utils/hasCollided";
import { useKeyPress } from "../utils/useKeyPress";

export const useCpu = ({
  gridSize,
  maxGridSize,
  pace,
  obstacleBoundries,
  characterBounds,
  looseLife,
  respawnCharacter,
}) => {
  const [cpuPosition, setCpuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [cpuDirection, setCpuDirection] = useState("");
  const [prvCpuDirection, setPrvCpuDirection] = useState("");
  const [cpuSpawnCell, setcpuSpawnCell] = useState({});

  const cellSize = maxGridSize / gridSize;

  const cpuRef = useRef(null);
  const cpuBody = cpuRef?.current;
  const cpuBounds = cpuBody?.getBounds();


  const nextCpuMove = obstacleBoundries.map((e) => willColide(cpuBounds, e));

  const upBlocked = nextCpuMove.includes("up");
  const downBlocked = nextCpuMove.includes("down");
  const leftBlocked = nextCpuMove.includes("left");
  const rightBlocked = nextCpuMove.includes("right");

  const upIsDeadEnd = cpuDirection === "up" && upBlocked;
  const downIsDeadEnd = cpuDirection === "down" && downBlocked;
  const leftIsDeadEnd = cpuDirection === "left" && leftBlocked;
  const rightIsDeadEnd = cpuDirection === "right" && rightBlocked;
  const deadEnd =
    upIsDeadEnd || downIsDeadEnd || leftIsDeadEnd || rightIsDeadEnd;

  const respawnCpu = () => setCpuPosition(getBounds({cell: cpuSpawnCell, cellSize, scale: 1}));

  const caught = () => {
    if (characterBounds?.x && cpuBounds?.x) {
      const intersect = hasCollided(characterBounds, cpuBounds, cellSize);
      if (intersect) {
        respawnCpu()
        respawnCharacter();
        looseLife(-1);
      }
      return true;
    }
  };
  const getDiff = (objA, objB) => {
    const xDiff = Math.abs(objA.x - objB.x);
    const yDiff = Math.abs(objA.y - objB.y);

    const targetDistance = xDiff + yDiff;
    return targetDistance;
  };

  const canPickUp = !upBlocked && prvCpuDirection !== 'up' && prvCpuDirection !== 'down'
  const canPickDown = !downBlocked && prvCpuDirection !== 'down'&& prvCpuDirection !== 'up'
  const canPickRight = !rightBlocked && prvCpuDirection !== 'right' && prvCpuDirection !== 'left'
  const canPickLeft = !leftBlocked && prvCpuDirection !== 'left' && prvCpuDirection !== 'right'

  
  const chooseDir = () => {
    const diffL = getDiff(
      { x: characterBounds?.x - cellSize, y: characterBounds?.y },
      { x: cpuPosition.x, y: cpuPosition.y }
    );
    const diffR = getDiff(
      { x: characterBounds?.x + cellSize, y: characterBounds?.y },
      { x: cpuPosition.x, y: cpuPosition.y }
    );
    const diffU = getDiff(
      { x: characterBounds?.x, y: characterBounds?.y - cellSize },
      { x: cpuPosition.x, y: cpuPosition.y }
    );
    const diffD = getDiff(
      { x: characterBounds?.x, y: characterBounds?.y + cellSize },
      { x: cpuPosition.x, y: cpuPosition.y }
    );

    const choices = [
      {
        name: "up",
        isBlocked: upBlocked,
        isUsed: prvCpuDirection === "up",
        isNotBack: prvCpuDirection === "down",
        canPick: canPickUp,
        dist: diffU,
      },
      {
        name: "down",
        isBlocked: downBlocked,
        isUsed: prvCpuDirection === "down",
        isNotBack: prvCpuDirection === "up",
        canPick: canPickDown,
        dist: diffD,
      },
      {
        name: "left",
        isBlocked: leftBlocked,
        isUsed: prvCpuDirection === "left",
        isNotBack: prvCpuDirection  === "right",
        canPick: canPickLeft,
        dist: diffL,
      },
      {
        name: "right",
        isBlocked: rightBlocked,
        isUsed: prvCpuDirection === "right",
        isNotBack: prvCpuDirection === "left",
        canPick: canPickRight,
        dist: diffR,
      },
    ];

    // const unblockedRoutes = choices.filter((choice) => !choice.isBlocked);

    // const newRoutes = unblockedRoutes.filter((choice) => !choice.isNotBack);

    const availableRoutes = choices.filter((choice) => choice.canPick);


    // const finalChoices = newRoutes.length === 0 ? unblockedRoutes : newRoutes;
    const closestChoice = availableRoutes.sort((a, b) => b.dist - a.dist);
// console.log(closestChoice)

    return closestChoice[0]?.name;
  };


// console.log({canPickUp, canPickDown,canPickRight,canPickLeft})

  const handleStop = () => {
    if (deadEnd) {
      changeCpuDirection()

    }
  };

  const loadCpu = ({ x, y }) => {
    setcpuSpawnCell({ x, y });
    const startPos = {
      x: x * cellSize,
      y: y * cellSize,
    };
    setCpuPosition(startPos);
  };


  const moveEnemy = () => {
    if (cpuDirection === "up") {
      setCpuPosition({
        x: cpuPosition?.x,
        y: cpuPosition?.y - pace,
      });
    }

    if (cpuDirection === "down") {
      setCpuPosition({
        x: cpuPosition?.x,
        y: cpuPosition?.y + pace,
      });
    }

    if (cpuDirection === "left") {
      setCpuPosition({
        x: cpuPosition?.x - pace,
        y: cpuPosition?.y,
      });
    }

    if (cpuDirection === "right") {
      setCpuPosition({
        x: cpuPosition?.x + pace,
        y: cpuPosition?.y,
      });
    }
  };

  const changeCpuDirection = () => {
    if (chooseDir() === "up") {
      if (!upBlocked) {
        setCpuDirection("up");
        setPrvCpuDirection("up");
      }
    }

    if (chooseDir() === "down") {
      if (!downBlocked) {
        setCpuDirection("down");
        setPrvCpuDirection("down");
      }
    }

    if (chooseDir() === "right") {
      if (!rightBlocked) {
        setCpuDirection("right");
        setPrvCpuDirection("right");
      }
    }

    if (chooseDir() === "left") {
      if (!leftBlocked) {
        setCpuDirection("left");
        setPrvCpuDirection("left");
      }
    }
  };



  const updateCpu = (delta) => {
    caught();
      handleStop();
    moveEnemy();
    chooseDir()

  };

  useEffect(() => {
    changeCpuDirection()

  }, [])
  

  const cpu = {
    // var
    cpuPosition,
    cpuDirection,
    cpuRef,
    cpuBounds,
    // funcs
    respawnCpu,
    loadCpu,
    updateCpu,
  };

  return cpu;
};
